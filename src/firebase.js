import RNFirebase from 'react-native-firebase'
import GeoFire from 'geofire'

const instance = RNFirebase.initializeApp({
  debug: __DEV__ ? '*' : false,
  errorOnMissingPlayServices: false,
  persistence: true
})

export const geoFire = new GeoFire(instance)

export default instance
