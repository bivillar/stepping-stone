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
    name: boolean,
    upload: boolean,
    manageUsers: boolean,
    userEmail: string
  ) {
    if (!this.auth.currentUser) {
      return alert('Not authorized')
    }
    const isAdmin = upload && manageUsers

    return this.db
      .collection('users')
      .doc(userEmail)
      .set({
        isAdmin,
        upload,
        manageUsers,
        name,
      })
      .then(result => console.log(result))
  }

  updateUser(resources: string[], userEmail: string) {
    if (!this.auth.currentUser) {
      return alert('Not authorized')
    }

    return this.db
      .collection('users')
      .doc(userEmail)
      .update({
        resources,
      })
      .then(result => console.log(result))
  }

  updateCurrentUser(user: User) {
    if (!this.auth.currentUser) {
      return alert('Not authorized')
    }

    return this.db
      .collection('users')
      .doc(this.auth.currentUser?.email!)
      .update(user)
      .then(result => console.log(result))
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
    const manageUsers = user.get('manageUsers')
    const upload = user.get('upload')
    return { manageUsers, upload }
  }

  async getCurrentUserPermissions() {
    const currentUserEmail = this.auth.currentUser?.email!
    if (!currentUserEmail) return null
    const user = await this.db
      .collection('users')
      .doc(this.auth.currentUser?.email!)
      .get()
    const manageUsers = user.get('manageUsers')
    const upload = user.get('upload')
    return { manageUsers, upload }
  }

  async getCurrentUser() {
    const currentUserEmail = this.auth.currentUser?.email!
    if (!currentUserEmail) return null
    const user = await this.db
      .collection('users')
      .doc(this.auth.currentUser?.email!)
      .get()
    const isAdmin = user.get('isAdmin')
    const manageUsers = user.get('manageUsers')
    const upload = user.get('upload')
    const name = user.get('name') || this.auth.currentUser?.displayName
    return { isAdmin, manageUsers, upload, name }
  }

  async getAllUsers() {
    const users: User[] = []
    await this.db
      .collection('users')
      .get()
      .then(snapshot => {
        snapshot.forEach(user => {
          console.log(user)
          const isAdmin = user.get('isAdmin')
          const name = user.get('name')
          const manageUsers = user.get('manageUsers')
          const upload = user.get('upload')

          users.push({
            email: user.id,
            isAdmin,
            upload,
            manageUsers,
            name,
          })
        })
      })
    return users
  }
}

export default new Firebase()
