import { ResourcesEnum } from '../constants'
import { User as FirebaseUser } from 'firebase'

declare global {
  interface User {
    email: string
    isAdmin: boolean
    name: string
    upload: boolean
    manageUsers: boolean
  }
}
