import * as firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firebase-firestore'
import { charts, ChartType } from './constants'

const config = {
  appId: process.env.FIREBASE_APPID,
  messagingSenderId: process.env.FIREBASE_MESSAGINGSENDERID,
  apiKey: process.env.FIREBASE_APIKEY,
  authDomain: 'stepping-stone-db.firebaseapp.com',
  databaseURL: 'https://stepping-stone-db.firebaseio.com',
  storageBucket: 'stepping-stone-db.appspot.com',
  projectId: 'stepping-stone-db',
}

class Firebase {
  db: firebase.firestore.Firestore
  auth: firebase.auth.Auth

  constructor() {
    const app = !firebase.apps.length
      ? firebase.initializeApp(config)
      : firebase.app()
    this.db = app.firestore()
    this.auth = app.auth()
  }

  login(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password)
  }

  logout() {
    this.auth.signOut().then(() => window.location.reload())
  }

  async register(name: string, email: string, password: string) {
    const permissions = await this.getUserPermissions(email)
    if (!permissions) throw new Error('Sem autorização')

    await this.auth.createUserWithEmailAndPassword(email, password)
    return this.auth.currentUser?.updateProfile({
      displayName: name,
    })
  }

  deleteAccount() {
    return this.auth.currentUser?.delete()
  }

  addUser(
    name: string,
    canUpload: boolean,
    canManageUsers: boolean,
    userEmail: string
  ) {
    if (!this.auth.currentUser) {
      return new Promise((_, reject) => reject('Not authorized'))
    }
    const isAdmin = canUpload || canManageUsers

    return this.db.collection('users').doc(userEmail).set({
      isAdmin,
      canUpload,
      canManageUsers,
      name,
    })
  }

  updateUser(userEmail: string, canUpload: boolean, canManageUsers: boolean) {
    if (!this.auth.currentUser) {
      return new Promise((_, reject) => reject('Not authorized'))
    }

    const isAdmin = canUpload || canManageUsers
    return this.db.collection('users').doc(userEmail).update({
      canUpload,
      canManageUsers,
      isAdmin,
    })
  }

  updateCurrentUser(user: User) {
    if (!this.auth.currentUser) {
      return alert('Not authorized')
    }

    return this.db
      .collection('users')
      .doc(this.auth.currentUser?.email!)
      .update(user)
  }

  isInitialized() {
    return new Promise(this.auth.onAuthStateChanged)
  }

  getCurrentUsername() {
    return this.auth.currentUser?.displayName
  }

  async getUserPermissions(email: string) {
    const user = await this.db.collection('users').doc(email).get()
    const canManageUsers = user.get('canManageUsers')
    const canUpload = user.get('canUpload')
    return { canManageUsers, canUpload }
  }

  async getCurrentUserPermissions() {
    const currentUserEmail = this.auth.currentUser?.email!
    if (!currentUserEmail) return null
    const user = await this.db
      .collection('users')
      .doc(this.auth.currentUser?.email!)
      .get()
    const canManageUsers = user.get('canManageUsers')
    const canUpload = user.get('canUpload')
    return { canManageUsers, canUpload }
  }

  async getCurrentUser() {
    const currentUserEmail = this.auth.currentUser?.email!
    if (!currentUserEmail) return null
    const user = await this.db
      .collection('users')
      .doc(this.auth.currentUser?.email!)
      .get()
    return {
      // @ts-ignore
      name: user.get('name') || this.auth.currentUser?.displayName,
      ...(user.data() as User),
    }
  }

  async getAllUsers() {
    const users: User[] = []
    await this.db
      .collection('users')
      .get()
      .then((snapshot) => {
        snapshot.forEach((user) => {
          users.push({
            // @ts-ignore
            email: user.id,
            ...(user.data() as User),
          })
        })
      })
    return users
  }

  getData() {
    return this.db.collection('data').get().then(getAllTotalizers)
  }
}

export function getAllTotalizers(
  snapshots: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>
) {
  const inField: FormEntry[] = []
  const notInField: FormEntry[] = []
  const formEntries: FormEntry[] = []
  const totalizers: Totalizers = {
    degree: {},
    gradYear: {},
    degreeLevel: {},
    degreeSuggestion: {},
    motive: {},
    stillInField: {},
    gradPerYear: {},
  }

  snapshots.forEach((snapshot) => {
    const data = snapshot.data() as FormEntry

    if (snapshot.get('filter').toLowerCase() == 'sim') {
      if (snapshot.get('stillInField').toLowerCase() == 'sim') {
        inField.push(data)
      } else {
        notInField.push(data)
      }
      formEntries.push(data)
    }

    charts.forEach((chartOptions) => {
      const { chartType, name, givenOptions } = chartOptions
      switch (chartType) {
        case ChartType.pie:
          updateTotalizersTwo(totalizers, data, name as Field, givenOptions)
        case ChartType.bar:
          updateTotalizersMany(
            totalizers,
            data,
            name as Totals,
            chartOptions.x as Field,
            chartOptions.y as Field,
            givenOptions
          )
        case ChartType.cloud:
          updateTotalizersTwo(totalizers, data, name as Field, givenOptions, {
            name: 'text',
          })
      }
    })
  })
  return { totalizers, inField, notInField, formEntries }
}

function updateTotalizersTwo(
  totalizers: Totalizers,
  data: FormEntry,
  name: Field,
  givenOptions?: (string | number)[],
  customFieldNames?: { name?: string; value?: string }
) {
  let option = data[name]
  if (!option) return
  if (doesNotHave(totalizers, name)) {
    totalizers[name] = {}
  }
  if (givenOptions && !givenOptions.includes(option)) {
    option = 'Outros'
  }
  const nameField = customFieldNames?.name ?? 'name'
  const valueField = customFieldNames?.value ?? 'value'

  if (doesNotHave(totalizers[name], option)) {
    totalizers[name]![option] = { [nameField]: option, [valueField]: 0 }
  }
  totalizers[name]![option]![valueField] += 1
}

function updateTotalizersMany(
  totalizers: Totalizers,
  data: FormEntry,
  name: Totals,
  x?: Field,
  y?: Field,
  givenOptions?: (string | number)[]
) {
  if (!x || !y) return
  const chartX = data[x]
  let chartY = data[y]
  if (!chartX || !chartY) return
  if (doesNotHave(totalizers, name)) {
    totalizers[name] = {}
  }
  if (doesNotHave(totalizers[name], chartX)) {
    totalizers[name]![chartX] = {}
    totalizers[name]![chartX][x] = chartX
  }
  if (givenOptions && !givenOptions.includes(chartY)) {
    chartY = 'Outros'
  }
  if (doesNotHave(totalizers[name]![chartX], chartY)) {
    totalizers[name]![chartX][chartY] = 0
  }
  totalizers[name]![chartX][chartY] += 1
}

const doesNotHave = (obj: any, field: string | number) => {
  return typeof obj[field] === typeof undefined
}

export default Firebase
