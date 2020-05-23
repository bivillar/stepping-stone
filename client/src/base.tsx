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
    const isAdmin = user.get('isAdmin')
    const canManageUsers = user.get('canManageUsers')
    const canUpload = user.get('canUpload')
    const name = user.get('name') || this.auth.currentUser?.displayName
    return { isAdmin, canManageUsers, canUpload, name }
  }

  async getAllUsers() {
    const users: User[] = []
    await this.db
      .collection('users')
      .get()
      .then(snapshot => {
        snapshot.forEach(user => {
          const isAdmin = user.get('isAdmin')
          const name = user.get('name')
          const canManageUsers = user.get('canManageUsers')
          const canUpload = user.get('canUpload')

          users.push({
            email: user.id,
            isAdmin,
            canUpload,
            canManageUsers,
            name,
          })
        })
      })
    return users
  }
}

export default new Firebase()
