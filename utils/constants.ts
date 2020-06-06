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

const PieConfig = {
  type: ChartType.pie,
}

export const charts = [
  { name: 'degreeLevel', chartType: ChartType.pie },
  { name: 'degree', chartType: ChartType.pie, givenOptions: DEGREES },
  { name: 'gradPerYear', chartType: ChartType.bar, x: 'gradYear', y: 'degree' },
  { name: 'stillInField', chartType: ChartType.pie },
  { name: 'motive', chartType: ChartType.pie },
  { name: 'degreeSuggestion', chartType: ChartType.pie },
]
