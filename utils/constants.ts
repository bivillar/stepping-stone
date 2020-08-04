export const MAX_TEXTS = 6

export enum ResourcesEnum {
  AddUser = 'adduser',
  Upload = 'upload',
}
export enum ChartType {
  pie = 'pie',
  bar = 'bar',
  cloud = 'cloud',
}

export const USERS_URL = '/admin/users'
export const CONFIGS_URL = '/admin/configs'
export const LOGIN_URL = '/admin/login'
export const SIGNUP_URL = '/admin/signup'
export const CHART_URL = '/admin/chart'

export const COLORS = [
  '#5204BF',
  '#6D0AB8',
  '#8710B2',
  '#A216AB',
  '#BD1BA4',
  '#D7219E',
  '#F22797',
]

export const BLACK = '#0d0d0d'

export const ON = 1
export const OFF = 0.2

export const DEGREES = [
  'Engenharia da Computação',
  'Ciência da Computação',
  'Sistemas de Informação',
  'Informática',
  'Tecnólogo',
]

export const CHART_BLOCKS: ChartOptions[] = [
  { name: 'degreeLevel', chartType: ChartType.pie, components: ['Formação'] },
  {
    name: 'degree',
    chartType: ChartType.pie,
    givenOptions: DEGREES,
    components: ['Formação'],
  },
  {
    name: 'gradPerYear',
    chartType: ChartType.bar,
    x: 'gradYear',
    y: 'degree',
    givenOptions: DEGREES,
    components: ['Formação'],
  },
  { name: 'motive', chartType: ChartType.pie, components: ['Motivos'] },
  // { name: 'gradYear', chartType: ChartType.pie, components: [''] },
  { name: 'role', chartType: ChartType.pie, components: ['Cargo'] },
  { name: 'seniorityDegree', chartType: ChartType.pie, components: ['Cargo'] },
  { name: 'companyType', chartType: ChartType.pie, components: ['Empresas'] },
  // { name: 'companyName', chartType: ChartType.cloud, components: [] },
  {
    name: 'satisfaction',
    chartType: ChartType.pie,
    components: ['Satisfação'],
  },
  { name: 'salary', chartType: ChartType.pie, components: ['Faixa salarial'] },
]

export const TEXT_BLOCKS: TextFieldKey[] = [
  'degreeSuggestion',
  'challenge',
  'advice',
  'pros',
  'cons',
]
