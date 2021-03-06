import GeolocationCreators from '../GeolocationRedux'
import { channel } from 'redux-saga'
import { take, put } from 'redux-saga/effects'

export const locationChannel = channel()

export function * watchLocationChannel() {
  while (true) {
    const action = yield take(locationChannel)
    yield put(action)
  }
}

export function * getCurrentPosition(options) {
  locationChannel.put(GeolocationCreators.updateLocationRequest());

  navigator.geolocation.getCurrentPosition(
    position => {
      console.log("loc suc", position)
      locationChannel.put(GeolocationCreators.updateLocationSuccess(position));
    },
    (error) => {
      console.warn('loc error', error)
      // locationChannel.put(GeolocationCreators.updateLocationFailure(error));
    },
    options
  );
}

function watchCurrentPosition(options) {
  locationChannel.put(GeolocationCreators.updateLocationRequest());

  navigator.geolocation.watchPosition(
    position => {
      locationChannel.put(GeolocationCreators.updateLocationSuccess(position));
    },
    (error) => {
      locationChannel.put(GeolocationCreators.updateLocationFailure(error));
    },
    options
  );
}
