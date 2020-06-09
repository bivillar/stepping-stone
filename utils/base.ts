import * as firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firebase-firestore'
import { charts, ChartType } from './constants'

const config = {
  appId: process.env.FIREBASE_APPID,
  messagingSenderId: process.env.FIREBASE_MESSAGINGSENDERID,
  apiKey: process.env.FIREBASE_APIKEY,
  authDomain: 'stepping-stone-db.firebaseapp.com',
  databaseURL: 'https://stepping-stone-db.firebaseio.com',
  storageBucket: 'stepping-stone-db.appspot.com',
  projectId: 'stepping-stone-db',
}

class Firebase {
  db: firebase.firestore.Firestore

  constructor() {
    const app = !firebase.apps.length
      ? firebase.initializeApp(config)
      : firebase.app()
    this.db = app.firestore()
  }

  getData() {
    return this.db.collection('data').get().then(getAllTotalizers)
  }
}

function getAllTotalizers(
  snapshots: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>
) {
  const inField: FormEntry[] = []
  const notInField: FormEntry[] = []
  const formEntries: FormEntry[] = []
  const totalizers: Totalizers = {
    degree: {},
    gradYear: {},
    degreeLevel: {},
    degreeSuggestion: {},
    motive: {},
    stillInField: {},
    gradPerYear: {},
  }

  snapshots.forEach((snapshot) => {
    const data = snapshot.data() as FormEntry

    if (snapshot.get('filter').toLowerCase() == 'sim') {
      if (snapshot.get('stillInField').toLowerCase() == 'sim') {
        inField.push(data)
      } else {
        notInField.push(data)
      }
      formEntries.push(data)
    }

    charts.forEach((chartOptions) => {
      const { chartType, name, givenOptions } = chartOptions
      switch (chartType) {
        case ChartType.pie:
          updateTotalizersPie(totalizers, data, name as Field, givenOptions)
        case ChartType.bar:
          updateTotalizersBar(
            totalizers,
            data,
            name as Totals,
            chartOptions.x as Field,
            chartOptions.y as Field,
            givenOptions
          )
      }
    })
  })
  return { totalizers, inField, notInField, formEntries }
}

function updateTotalizersPie(
  totalizers: Totalizers,
  data: FormEntry,
  name: Field,
  givenOptions?: (string | number)[]
) {
  let option = data[name]
  if (!option) return
  if (doesNotHave(totalizers, name)) {
    totalizers[name] = {}
  }
  if (givenOptions && !givenOptions.includes(option)) {
    option = 'Outros'
  }
  if (doesNotHave(totalizers[name], option)) {
    totalizers[name]![option] = { name: option, value: 0 }
  }
  totalizers[name]![option]!.value += 1
}

function updateTotalizersBar(
  totalizers: Totalizers,
  data: FormEntry,
  name: Totals,
  x?: Field,
  y?: Field,
  givenOptions?: (string | number)[]
) {
  if (!x || !y) return
  const chartX = data[x]
  let chartY = data[y]
  if (!chartX || !chartY) return
  if (doesNotHave(totalizers, name)) {
    totalizers[name] = {}
  }
  if (doesNotHave(totalizers[name], chartX)) {
    totalizers[name]![chartX] = {}
    totalizers[name]![chartX][x] = chartX
  }
  if (givenOptions && !givenOptions.includes(chartY)) {
    chartY = 'Outros'
  }
  if (doesNotHave(totalizers[name]![chartX], chartY)) {
    totalizers[name]![chartX][chartY] = 0
  }
  totalizers[name]![chartX][chartY] += 1
}

const doesNotHave = (obj: any, field: string | number) => {
  return typeof obj[field] === typeof undefined
}

export default new Firebase()