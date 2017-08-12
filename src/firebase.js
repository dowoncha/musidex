import RNFirebase from 'react-native-firebase'
const GeoFire = require('geofire')

const instance = RNFirebase.initializeApp({
  debug: __DEV__ ? '*' : false,
  errorOnMissingPlayServices: false,
  persistence: true
})

const geoFire = new GeoFire()

export default instance
