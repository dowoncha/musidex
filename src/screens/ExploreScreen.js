import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'

import { NavigationActions } from 'react-navigation'

// import ReactMapboxGl from 'react-mapbox-gl'
// import { MAPBOX_ACCESS_KEY } from '../Config/PublicAccessKeys'

class ExploreScreen extends Component {
  static navigationOptions = {
    tabBarLabel: 'Explore',
  };

  constructor(props) {
    super(props);

    this.state = {
      region: {
        latitude: 37.78825,
        longitude: 37.78825,
        longitudeDelta: 0.0922,
        latitudeDelta: 0.0421
      },
      error: null,
      map: null
    };
  }

  render() {
    // const Map = ReactMapboxGl({
    //   acecssToken: MAPBOX_ACCESS_KEY
    // })

    return (
      <View>
        <Text h2>Explore Screen</Text>
        {/*
        <Map
          style="mapbox://styles/mapbox/streets-v9"
          containerStyle={{
            height: "100vh",
            width: "100vw"
          }}>
        </Map>
        */}
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
