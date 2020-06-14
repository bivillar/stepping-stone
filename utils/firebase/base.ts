import * as firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firebase-firestore'
import { charts, ChartType, TEXT_BLOCKS } from '../constants'

const config = {
  appId: process.env.FIREBASE_APPID,
  messagingSenderId: process.env.FIREBASE_MESSAGINGSENDERID,
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY,
  authDomain: 'stepping-stone-db.firebaseapp.com',
  databaseURL: 'https://stepping-stone-db.firebaseio.com',
  storageBucket: 'stepping-stone-db.appspot.com',
  projectId: 'stepping-stone-db',
}

class Firebase {
  db: firebase.firestore.Firestore

  constructor() {
    const app = !firebase.apps.length
      ? firebase.initializeApp(config)
      : firebase.app()
    this.db = app.firestore()
  }

  saveSelected(field: string, selectedIds: string[]) {
    return this.db.collection('texts').doc(field).set({
      selectedIds,
    })
  }

  getSelectedIdsByField() {
    return this.db
      .collection('texts')
      .get()
      .then((snapshot) => {
        const texts: SelectedIds = {}
        snapshot.forEach((field) => {
          // @ts-ignore
          texts[field.id] = field.get('selectedIds')
        })
        return texts as SelectedIds
      })
  }

  getTexts() {
    return this.db.collection('data').get().then(getTextTotalizer)
  }

  addUser(
    name: string,
    canConfig: boolean,
    canManageUsers: boolean,
    userEmail: string
  ) {
    const isAdmin = canConfig || canManageUsers

    return this.db.collection('users').doc(userEmail).set({
      isAdmin,
      canConfig,
      canManageUsers,
      name,
    })
  }

  updateUser(userEmail: string, canConfig: boolean, canManageUsers: boolean) {
    const isAdmin = canConfig || canManageUsers
    return this.db.collection('users').doc(userEmail).update({
      canConfig,
      canManageUsers,
      isAdmin,
    })
  }

  async getUser(email: string) {
    if (!email) return null
    const user = await this.db.collection('users').doc(email).get()
    return user.data() as User
  }

  async getCurrentUserPermissions(email: string) {
    if (!email) return null
    const user = await this.db.collection('users').doc(email).get()
    const canManageUsers = user.get('canManageUsers')
    const canConfig = user.get('canConfig')
    return { canManageUsers, canConfig }
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

function getTextTotalizer(
  snapshots: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>
) {
  const texts: AllTexts = {}
  snapshots.forEach((snapshot) => {
    const data = snapshot.data() as FormEntry
    TEXT_BLOCKS.forEach((field) => {
      if (doesNotHave(data, field)) return
      if (doesNotHave(texts, field)) {
        // @ts-ignore
        texts[field] = []
      }
      // @ts-ignore
      texts[field].push({ id: snapshot.id, value: data[field] })
    })
  })
  return texts as AllTexts
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
