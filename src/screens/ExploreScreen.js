import React, { Component } from 'react'
import { StatusBar, View, Text } from 'react-native'
import { connect } from 'react-redux'

import Mapbox, { MapView } from 'react-native-mapbox-gl'
import { MAPBOX_ACCESS_TOKEN } from '../config/PublicAccessKeys'

import GeolocationActionCreators from '../redux/GeolocationRedux'

// TODO: move this to applications startup
// Set mapbox access token
Mapbox.setAccessToken(MAPBOX_ACCESS_TOKEN)

class ExploreScreen extends Component {
  static navigationOptions = {
    headerTintColor: 'black',
    title: 'Explore',
    tabBarLabel: 'Explore',
    // header: {
    //  visible: false
    // }
  }

  constructor(props) {
    super(props)

    this.props.startup()
  }

  state = {
    error: null,
    map: null
  }

  render() {
    const { position } = this.props;

    const initialPosition = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    };

    return (
      <View style={{
        flex: 1,
        alignItems: 'stretch'
      }}>
        <MapView
          initialZoomLevel={11}
          showsUserLocation
          userTrackingMode={Mapbox.userTrackingMode.followWithCourse}
          style={{
            flex: 1
          }}
          userLocationVerticalAlignment={Mapbox.userLocationVerticalAlignment.center}
          logoIsHidden
          styleURL={Mapbox.mapStyles.dark}/>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const { geolocation } = state

  return {
    position: geolocation.position,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    startup: () => {
      dispatch(GeolocationActionCreators.updateLocationRequest())
    },
    onFabPress: (navigation) => {} //navigation.dispatch(NavigationActions.navigate('DropUploadScreen'))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ExploreScreen)
