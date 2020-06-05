import * as firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firebase-firestore'

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APPID,
}

// const config = {
//   apiKey: 'AIzaSyBxkUCpDT2Zcy4BevHLQuqgamxRl2GXGtI',
//   authDomain: 'stepping-stone-db.firebaseapp.com',
//   databaseURL: 'https://stepping-stone-db.firebaseio.com',
//   projectId: 'stepping-stone-db',
//   storageBucket: 'stepping-stone-db.appspot.com',
//   messagingSenderId: '201844952341',
//   appId: '1:201844952341:web:a49cc4aa0d5a5922eded1c',
// }

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
  const inField: any[] = []
  const notInField: any[] = []
  const formEntries: (any | any)[] = []
  const fields = new Map()
  snapshots.forEach((snapshot) => {
    if (snapshot.get('filter').toLowerCase() == 'sim') {
      if (snapshot.get('stillInField').toLowerCase() == 'sim') {
        inField.push(snapshot.data() as any)
      } else {
        notInField.push(snapshot.data() as any)
      }
      formEntries.push(snapshot.data() as any)
    }

    const data = snapshot.data()
    Object.keys(data).forEach((field) => {
      const value = data[field]

      if (!fields.has(field)) {
        fields.set(field, new Map())
      }
      const totalizer = fields.get(field)

      if (!totalizer.has(value)) totalizer.set(value, { name: value, value: 1 })
      else {
        const total = totalizer.get(value)
        total.value += 1
      }
    })
    if (!fields.has('gradPerYear')) {
      fields.set('gradPerYear', new Map())
    }
    const gradPerYear = fields.get('gradPerYear')
    if (!gradPerYear.has(data.gradYear)) {
      gradPerYear.set(data.gradYear, { year: data.gradYear })
    }
    const gradPerYearData = gradPerYear.get(data.gradYear)
    const degreeKey = data.degree.charAt(0)
    if (typeof gradPerYearData[degreeKey] === 'undefined')
      gradPerYearData[degreeKey] = 1
    else gradPerYearData[degreeKey] += 1
  })
  return { totalizers: fields, inField, notInField, formEntries }
}

export default new Firebase()
