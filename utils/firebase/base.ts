import * as firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firebase-firestore'
import { CHART_BLOCKS, ChartType, TEXT_BLOCKS } from '../constants'

const UNDEFINED = 'undefined'

const config = {
  appId: process.env.FIREBASE_APPID,
  messagingSenderId: process.env.FIREBASE_MESSAGINGSENDERID,
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY,
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

  removeYear(year: string) {
    return this.db.collection('gradChart').doc(year).delete()
  }

  async getChartDataTotalizer() {
    let config: GradChartConfig = { showMale: false, showPercentage: false }
    const collection = await this.db.collection('gradChart').get()

    const grads: ChartData[] = []

    collection.forEach((year) => {
      const data = year.data()
      if (year.id === 'config') {
        config = data as GradChartConfig
      } else {
        if (config.showPercentage) {
          grads.push({ year: year.id, percentage: data.percentage })
        } else if (config.showMale) {
          grads.push({ year: year.id, male: data.male, female: data.female })
        } else {
          grads.push({ year: year.id, female: data.female })
        }
      }
    })

    return { grads, config }
  }

  async getGradChartData() {
    let config: GradChartConfig = { showMale: false, showPercentage: false }
    const collection = await this.db.collection('gradChart').get()

    const grads: ChartData[] = []

    collection.forEach((year) => {
      const data = year.data()
      if (year.id === 'config') {
        config = data as GradChartConfig
      } else {
        grads.push({ year: year.id, ...data })
      }
    })

    return { grads, config }
  }

  updateGradCharConfig(showMale: boolean, showPercentage: boolean) {
    return this.db.collection('gradChart').doc('config').set({
      showMale,
      showPercentage,
    })
  }

  addNewGradChartYear(
    year: string,
    female: number,
    male?: number,
    percentage?: number
  ) {
    return this.db
      .collection('gradChart')
      .doc(year)
      .set({
        female,
        ...(male && { male }),
        ...(percentage && { percentage }),
      })
  }

  updateGradChartYear(
    year: string,
    female: number,
    male?: number,
    percentage?: number
  ) {
    return this.db
      .collection('gradChart')
      .doc(year)
      .update({
        female,
        ...(male && { male }),
        ...(percentage && { percentage }),
      })
  }

  saveSelected(field: string, selectedIds: string[], texts: FieldText[]) {
    return this.db.collection('texts').doc(field).set({
      selectedIds,
      texts,
    })
  }

  getSelectedTextsByField() {
    return this.db
      .collection('texts')
      .get()
      .then((snapshot) => {
        const texts: SelectedTexts = {}
        snapshot.forEach((field) => {
          texts[field.id as TextFieldKey] = field.data() as Selected
        })
        return texts as SelectedTexts
      })
  }

  getTexts() {
    return this.db.collection('answers').get().then(getTextTotalizer)
  }

  addUser(
    name: string,
    canConfig: boolean,
    canManageUsers: boolean,
    userEmail: string
  ) {
    const isAdmin = canConfig || canManageUsers

    return this.db.collection('users').doc(userEmail).set({
      isAdmin,
      canConfig,
      canManageUsers,
      name,
    })
  }

  updateUser(userEmail: string, canConfig: boolean, canManageUsers: boolean) {
    const isAdmin = canConfig || canManageUsers
    return this.db.collection('users').doc(userEmail).update({
      canConfig,
      canManageUsers,
      isAdmin,
    })
  }

  async getUser(email: string) {
    if (!email) return null
    const user = await this.db.collection('users').doc(email).get()
    return user.data() as User
  }

  async getCurrentUserPermissions(email: string) {
    if (!email) return null
    const user = await this.db.collection('users').doc(email).get()
    const canManageUsers = user.get('canManageUsers')
    const canConfig = user.get('canConfig')
    return { canManageUsers, canConfig }
  }

  async doesUserExists(email: string) {
    const user = await this.db.collection('users').doc(email).get()
    return user.exists
  }

  async getAllUsers() {
    const users: User[] = []
    await this.db
      .collection('users')
      .get()
      .then((snapshot) => {
        snapshot.forEach((user) => {
          users.push({
            ...(user.data() as User),
            email: user.id,
          })
        })
      })
    return users
  }

  async getData() {
    const fieldsTotalizers = await this.db
      .collection('answers')
      .get()
      .then(getAllTotalizers)
    const textsTotals = await this.getSelectedTextsByField()
    const gradProps = await this.getGradChartData()
    const hiddenTexts: string[] = []
    const textsTotalizers: TextTotals = {}
    TEXT_BLOCKS.forEach((field) => {
      if (
        typeof textsTotals[field] == UNDEFINED ||
        textsTotals[field]?.texts.length == 0
      )
        hiddenTexts.push(field)
      else {
        textsTotalizers[field] = textsTotals[field]?.texts
      }
    })
    const totalizers = { ...fieldsTotalizers, ...textsTotalizers }

    return { gradProps, totalizers, hiddenTexts }
  }
}

function getTextTotalizer(
  snapshots: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>
) {
  const texts: AllTexts = {}
  snapshots.forEach((snapshot) => {
    const data = snapshot.data() as FormEntry
    TEXT_BLOCKS.forEach((field: TextFieldKey) => {
      if (typeof data[field] == UNDEFINED) return
      if (typeof texts[field] == UNDEFINED) {
        texts[field] = []
      }
      texts[field]?.push({ id: snapshot.id, value: data[field] as string })
    })
  })
  return texts as AllTexts
}

export function getAllTotalizers(
  snapshots: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>
) {
  const totalizers: Totalizers = {}

  snapshots.forEach((snapshot) => {
    const data = snapshot.data() as FormEntry

    if (snapshot.get('filter').toLowerCase() == 'não') return

    CHART_BLOCKS.forEach((chartOptions) => {
      const { chartType, name, givenOptions } = chartOptions

      switch (chartType) {
        case ChartType.pie:
          if (typeof data[name as FormEntryKey] == UNDEFINED) return
          updateTotalizersTwo(totalizers, data, name, givenOptions)
          break
        case ChartType.bar:
          updateTotalizersMany(
            totalizers,
            data,
            name,
            chartOptions.x,
            chartOptions.y,
            givenOptions
          )
          break
        case ChartType.cloud:
          if (typeof data[name as FormEntryKey] == UNDEFINED) return
          updateTotalizersTwo(totalizers, data, name, givenOptions, {
            name: 'text',
          })
          break
      }
    })
  })
  return totalizers
}

function updateTotalizersTwo(
  totalizers: Totalizers,
  data: FormEntry,
  name: ChartFieldKey,
  givenOptions?: (string | number)[],
  customFieldNames?: { name?: string; value?: string }
) {
  let option = data[name as FormEntryKey]
  if (!option) return
  if (doesNotHave(totalizers, name)) {
    totalizers[name] = {}
  }
  if (givenOptions && !givenOptions.includes(option)) {
    option = 'Outros'
  }
  const nameField = customFieldNames?.name ?? 'name'
  const valueField = customFieldNames?.value ?? 'value'

  if (doesNotHave(totalizers[name], option)) {
    totalizers[name]![option] = { [nameField]: option, [valueField]: 0 }
  }
  totalizers[name]![option]![valueField] += 1
}

function updateTotalizersMany(
  totalizers: Totalizers,
  data: FormEntry,
  name: ChartFieldKey,
  x?: FormEntryKey,
  y?: FormEntryKey,
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
  return typeof obj[field] === UNDEFINED
}

export default Firebase
