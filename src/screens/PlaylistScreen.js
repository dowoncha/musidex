import React, { Component } from 'react'
import { View, ListView } from 'react-native'
import { connect } from 'react-redux'

// Styles
// import styles from './Styles/PlaylistScreenStyle'

class PlaylistScreen extends Component {
  static navigationOptions = {
    title: 'Playlist'
  }

  state = {
    dataSource: [
      {
        id: 1,
        location: {
          latitude: 37.78825,
          longitude: -122.4324,
        },
        date: new Date(),
        track: {
          uri: 'spotify:track:3n3Ppam7vgaVa1iaRUc9Lp'
        },
        dropper: 5,
        score: 10
      }
    ]
  }

  renderRow(rowData) {
    // TODO: move into component
    return (
      <View></View>
    );
  }

  /* ***********************************************************
  * STEP 4
  * If your datasource is driven by Redux, you'll need to
  * reset it when new data arrives.
  * DO NOT! place `cloneWithRows` inside of render, since render
  * is called very often, and should remain fast!  Just replace
  * state's datasource on newProps.
  *
  * e.g.
    componentWillReceiveProps (newProps) {
      if (newProps.someData) {
        this.setState(prevState => ({
          dataSource: prevState.dataSource.cloneWithRows(newProps.someData)
        }))
      }
    }
  *************************************************************/

  onFabPress() {
    this.props.navigation.navigate('DropUploadScreen');
  }

  render () {
    return (
      <View>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    // drops: getVisibleDrops
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistScreen)
