type PartialRecord<K extends keyof any, T> = {
  [P in K]?: T
}

interface KeyValue<type> {
  [key: string]: type
}

interface ChartData {
  [key: string]: any
}

interface FieldText {
  id: string
  value: string
}

interface Selected {
  selectedIds: string[]
  texts: FieldText[]
}

interface User {
  email: string
  isAdmin: boolean
  name: string
  canConfig: boolean
  canManageUsers: boolean
}

interface BlocksOptions {
  Block?: FC<{ totalizers: Totalizers }>
  title?: string
  menu: string
  showMobile: boolean
  textField?: string
}

interface ChartOptions {
  name: ChartFieldKey
  components: string[]
  chartType: ChartKeys
  givenOptions?: string[]
  x?: FormEntryKey
  y?: FormEntryKey
}

type FieldKey =
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
type TextFieldKey =
  | 'degreeSuggestion'
  | 'challenge'
  | 'advice'
  | 'pros'
  | 'cons'
type FormEntryKey = TextFieldKey | FieldKey
type ChartFieldKey = FieldKey | 'gradPerYear'
type TotalizerKey = ChartFieldKey | TextFieldKey
type ChartKey = 'pie' | 'bar' | 'cloud'

type TextTotals = PartialRecord<TextFieldKey, FieldText[]>
type ChartTotals = PartialRecord<ChartFieldKey, KeyValue<ChartData>>
type Totalizers = TextTotals & ChartTotals
type FormEntry = PartialRecord<FormEntryKey, string | number>
type SelectedTexts = PartialRecord<TextFieldKey, Selected>
type AllTexts = PartialRecord<TextFieldKey, FieldText[]>
