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

  addUser(resources: string[], userEmail: string) {
    if (!this.auth.currentUser) {
      return alert('Not authorized')
    }

    return this.db
      .collection('users')
      .doc(userEmail)
      .set({
        resources,
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

  updateCurrentUser(resources: string[]) {
    if (!this.auth.currentUser) {
      return alert('Not authorized')
    }

    return this.db
      .collection('users')
      .doc(this.auth.currentUser?.email!)
      .update({
        resources,
      })
      .then(result => console.log(result))
  }

  isInitialized() {
    return new Promise(resolve => {
      this.auth.onAuthStateChanged(resolve)
    })
  }

  getCurrentUsername() {
    return this.auth.currentUser && this.auth.currentUser.displayName
  }

  async getUserPermissions(email: string) {
    const user = await this.db
      .collection('users')
      .doc(email)
      .get()
    return user.get('resources')
  }

  async getCurrentUserPermissions() {
    const currentUserEmail = this.auth.currentUser?.email!
    if (!currentUserEmail) return null
    const user = await this.db
      .collection('users')
      .doc(this.auth.currentUser?.email!)
      .get()
    return user.get('resources')
  }

  async getCurrentUser() {
    const currentUserEmail = this.auth.currentUser?.email!
    if (!currentUserEmail) return null
    const user = await this.db
      .collection('users')
      .doc(this.auth.currentUser?.email!)
      .get()
    const isAdmin = user.get('isAdmin')
    const resources = user.get('resources')
    return { isAdmin, resources }
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
          const resourcers = user.get('resources')
          const name = user.get('name')

          users.push({
            email: user.id,
            isAdmin,
            resourcers,
            name,
          })
        })
      })
    return users
  }
}

export default new Firebase()
