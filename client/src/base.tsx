import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/firebase-firestore'

const config = {
  apiKey: 'AIzaSyBxkUCpDT2Zcy4BevHLQuqgamxRl2GXGtI',
  authDomain: 'stepping-stone-db.firebaseapp.com',
  databaseURL: 'https://stepping-stone-db.firebaseio.com',
  projectId: 'stepping-stone-db',
  storageBucket: 'stepping-stone-db.appspot.com',
  messagingSenderId: '201844952341',
  appId: '1:201844952341:web:a49cc4aa0d5a5922eded1c',
}

class Firebase {
  auth: app.auth.Auth
  db: app.firestore.Firestore
  constructor() {
    app.initializeApp(config)
    this.auth = app.auth()
    this.db = app.firestore()
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

    return this.db
      .collection('users')
      .doc(userEmail)
      .set({
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
    return this.db
      .collection('users')
      .doc(userEmail)
      .update({
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
    const user = await this.db
      .collection('users')
      .doc(email)
      .get()
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
      name: user.get('name') || this.auth.currentUser?.displayName,
      ...(user.data() as User),
    }
  }

  async getAllUsers() {
    const users: User[] = []
    await this.db
      .collection('users')
      .get()
      .then(snapshot => {
        snapshot.forEach(user => {
          users.push({
            email: user.id,
            ...(user.data() as User),
          })
        })
      })
    return users
  }

  getData() {
    return this.db
      .collection('data')
      .get()
      .then(getAllTotalizers)
  }
}

function getAllTotalizers(
  snapshots: app.firestore.QuerySnapshot<app.firestore.DocumentData>
) {
  const inField: InFieldFormEntry[] = []
  const notInField: NotInFieldFormEntry[] = []
  const formEntries: (NotInFieldFormEntry | InFieldFormEntry)[] = []
  const fields = new Map()
  snapshots.forEach(snapshot => {
    if (snapshot.get('filter').toLowerCase() == 'sim') {
      if (snapshot.get('stillInField').toLowerCase() == 'sim') {
        inField.push(snapshot.data() as InFieldFormEntry)
      } else {
        notInField.push(snapshot.data() as NotInFieldFormEntry)
      }
      formEntries.push(snapshot.data() as any)
    }

    const data = snapshot.data()
    Object.keys(data).forEach(field => {
      const value = data[field]

      if (!fields.has(field)) {
        fields.set(field, new Map())
      }
      const totalizer = fields.get(field)

      if (!totalizer.has(value)) totalizer.set(value, 1)
      else {
        const total = totalizer.get(value)
        totalizer.set(data[field], total + 1)
      }
    })
    if (!fields.has('gradPerYear')) {
      fields.set('gradPerYear', new Map())
    }
    const gradPerYear = fields.get('gradPerYear')
    if (!gradPerYear.has(data.gradYear)) {
      gradPerYear.set(data.gradYear, new Map())
    }
    const gradYearDegreeMap = gradPerYear.get(data.gradYear)
    const degreeKey = data.degree.charAt(0)
    if (!gradYearDegreeMap.has(degreeKey)) gradYearDegreeMap.set(degreeKey, 1)
    else {
      const total = gradYearDegreeMap.get(degreeKey)
      gradYearDegreeMap.get(degreeKey, total + 1)
    }
  })
  console.log(fields)
  return { totalizers: fields, inField, notInField, formEntries }
}

export default new Firebase()
