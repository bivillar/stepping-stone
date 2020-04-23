import { ResourcesEnum } from '../constants'
import { User as FirebaseUser } from 'firebase'

declare global {
  interface User {
    email: string
    resourcers: ResourcesEnum[]
    isAdmin: boolean
    name: string
  }
}
