import { ResourcesEnum } from '../constants'
import { User as FirebaseUser } from 'firebase'

declare global {
  interface User {
    email: string
    isAdmin: boolean
    name: string
    canUpload: boolean
    canManageUsers: boolean
  }

  interface FormEntry {
    degree: string
    gradYear: number
    degreeLevel: string
    degreeSuggestion?: string
    motive: string
    stillInField: string
  }

  interface InFieldFormEntry extends FormEntry {
    role: string
    seniorityDegree?: string
    companyType: string
    companyName?: string
    salary: string
    satisfaction: number
    satisfactionReason?: string
    challenge?: string
    advice?: string
    pros?: string
    cons?: string
  }

  interface NotInFieldFormEntry extends FormEntry {
    field?: string
    fieldChangeReason?: string
    otherFieldSalary: string
    otherFieldSatisfaction?: number
    otherFieldSatisfactionReason?: string
  }

  interface ChartData {
    name: string
    value: number
  }
}
