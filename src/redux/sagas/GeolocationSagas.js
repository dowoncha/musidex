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
      locationChannel.put(GeolocationCreators.updateLocationSuccess(position));
    },
    (error) => {
      locationChannel.put(GeolocationCreators.updateLocationFailure(error));
    },
    options
  );
}

function * watchCurrentPosition(options) {
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
