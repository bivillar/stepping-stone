export enum ResourcesEnum {
  AddUser = 'adduser',
  Upload = 'upload',
}

export enum AdminPagesEnum {
  Login = '/admin/login',
  SignUp = '/admin/signup',
  Upload = '/admin/upload',
  List = '/admin/list',
}

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

export enum ChartType {
  pie = 'pie',
  bar = 'bar',
}

export const charts = [
  { name: 'degreeLevel', chartType: ChartType.pie },
  { name: 'degree', chartType: ChartType.pie, givenOptions: DEGREES },
  {
    name: 'gradPerYear',
    chartType: ChartType.bar,
    x: 'gradYear',
    y: 'degree',
    givenOptions: DEGREES,
  },
  { name: 'stillInField', chartType: ChartType.pie },
  { name: 'motive', chartType: ChartType.pie },
  { name: 'degreeSuggestion', chartType: ChartType.pie },
  { name: 'gradYear', chartType: ChartType.pie },
  { name: 'role', chartType: ChartType.pie },
  { name: 'seniorityDegree', chartType: ChartType.pie },
  { name: 'companyType', chartType: ChartType.pie },
  { name: 'companyName', chartType: ChartType.pie },
]
