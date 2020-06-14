interface Texts<T> {
  degreeSuggestion?: T
  satisfactionReason?: T
  challenge?: T
  advice?: T
  pros?: T
  cons?: T
}
interface FieldText {
  id: string
  value: string
}

interface Selected {
  selectedIds: string[]
  texts: FieldText[]
}

type SelectedTexts = Texts<Selected>
type AllTexts = Texts<FieldText[]>

interface User {
  email: string
  isAdmin: boolean
  name: string
  canConfig: boolean
  canManageUsers: boolean
}

interface FormEntry {
  degree: string
  gradYear: number
  degreeLevel: string
  degreeSuggestion: string
  motive: string
  stillInField: string
  gradPerYear: any
  field?: string
  fieldChangeReason?: string
  otherFieldSalary?: string
  otherFieldSatisfaction?: number
  otherFieldSatisfactionReason?: string
  role?: string
  seniorityDegree?: string
  companyType?: string
  companyName?: string
  salary?: string
  satisfaction?: number
  satisfactionReason?: string
  challenge?: string
  advice?: string
  pros?: string
  cons?: string
}

interface KeyValue<type> {
  [key: string]: type
}

interface ChartData {
  [key: string]: any
}

type Totalizers = {
  degree: KeyValue<ChartData>
  gradYear: KeyValue<ChartData>
  degreeLevel: KeyValue<ChartData>
  degreeSuggestion?: FieldText[]
  motive: KeyValue<ChartData>
  stillInField: KeyValue<ChartData>
  gradPerYear: KeyValue<ChartData>
  role?: KeyValue<ChartData>
  seniorityDegree?: KeyValue<ChartData>
  companyType?: KeyValue<ChartData>
  companyName?: KeyValue<ChartData>
  salary?: KeyValue<ChartData>
  satisfaction?: KeyValue<ChartData>
  satisfactionReason?: FieldText[]
  challenge?: FieldText[]
  advice?: FieldText[]
  pros?: FieldText[]
  cons?: FieldText[]
  field?: KeyValue<ChartData>
  fieldChangeReason?: KeyValue<ChartData>
  otherFieldSalary?: KeyValue<ChartData>
  otherFieldSatisfaction?: KeyValue<ChartData>
  otherFieldSatisfactionReason?: KeyValue<ChartData>
  gradPerYear?: KeyValue<ChartData>
}

type Field =
  | 'degree'
  | 'gradYear'
  | 'degreeLevel'
  | 'motive'
  | 'stillInField'
  | 'role'
  | 'seniorityDegree'
  | 'companyType'
  | 'companyName'
  | 'salary'
  | 'satisfaction'
  | 'field'
  | 'fieldChangeReason'
  | 'otherFieldSalary'
  | 'otherFieldSatisfaction'
  | 'otherFieldSatisfactionReason'

type Totals = Field | 'gradPerYear'

interface BlocksOptions {
  Block?: FC<{ totalizers: Totalizers }>
  title?: string
  menu: string
  showMobile: boolean
  textField?: string
}
