import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'

import { NavigationActions } from 'react-navigation'

import Mapbox, { MapView } from 'react-native-mapbox-gl'
import { MAPBOX_ACCESS_TOKEN } from '../config/PublicAccessKeys'

Mapbox.setAccessToken(MAPBOX_ACCESS_TOKEN)

class ExploreScreen extends Component {
  static navigationOptions = {
    tabBarLabel: 'Explore',
  };

  constructorDidMount() {
  }

  constructor(props) {
    super(props);

    this.state = {
      error: null,
      map: null
    };
  }

  render() {
    return (
      <View style={{
        flex: 1,
        alignItems: 'stretch'
      }}>
        <MapView
          initialCenterCoordinate={{
            latitude: 40.72052634,
            longitude: -73.97686958312988
          }}
          initialZoomLevel={11}
          style={{
            flex: 1
          }}
          styleURL={Mapbox.mapStyles.dark}/>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const { geolocation } = state
  const position = {
    coords: {
      longitude: 0,
      latitude: 0
    }
  };

  return {
    position,
    region: {
      longitude: position.coords.longitude,
      latitude: position.coords.latitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421
    }
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onFabPress: (navigation) => {} //navigation.dispatch(NavigationActions.navigate('DropUploadScreen'))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ExploreScreen)
