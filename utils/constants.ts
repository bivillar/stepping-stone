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
// TODO: ADICIONAR PAGINA PRA MUDAR FORMANDAS POR ANO NO ADMIN
export const CHART_BLOCKS: ChartOptions[] = [
  { name: 'degreeLevel', chartType: ChartType.pie, components: ['Degree'] },
  {
    name: 'degree',
    chartType: ChartType.pie,
    givenOptions: DEGREES,
    components: ['Degree'],
  },
  {
    name: 'gradPerYear',
    chartType: ChartType.bar,
    x: 'gradYear',
    y: 'degree',
    givenOptions: DEGREES,
    components: ['Degree'],
  },
  { name: 'motive', chartType: ChartType.pie, components: ['Motive'] },
  // { name: 'gradYear', chartType: ChartType.pie, components: [''] },
  { name: 'role', chartType: ChartType.pie, components: ['Role'] },
  { name: 'seniorityDegree', chartType: ChartType.pie, components: ['Role'] },
  { name: 'companyType', chartType: ChartType.pie, components: ['Company'] },
  // { name: 'companyName', chartType: ChartType.cloud, components: [] },
  {
    name: 'satisfaction',
    chartType: ChartType.pie,
    components: ['Satisfaction'],
  },
  { name: 'salary', chartType: ChartType.pie, components: ['Salary'] },
]

export const TEXT_BLOCKS: TextFieldKey[] = [
  'degreeSuggestion',
  'challenge',
  'advice',
  'pros',
  'cons',
]
