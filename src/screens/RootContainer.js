import React, { Component } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { connect } from 'react-redux'

import ReduxNavigation from '../navigation/ReduxNavigation'

import { Button } from 'react-native-elements'

// import ReactMapboxGl from 'react-native-mapbox-gl'

// import { MAPBOX_ACCESS_KEY } from '../config/PublicAccessKeys'

// import StartupActions from '../Redux/StartupRedux'
// import ReduxPersist from '../Config/ReduxPersist'

// Styles
// import styles from './Styles/RootContainerStyles'

// Also handles initial loading of data
class RootContainer extends Component {
  componentDidMount () {
    // if redux persist is not active fire startup action
    // if (!ReduxPersist.active) {
    //   this.props.startup()
    // }

    // ReactMapboxGl.setAccessToken(MAPBOX_ACCESS_KEY)
    console.log("Root container");
  }

  render () {
    return (
      <View style={styles.container}>
        <ReduxNavigation />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});


// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = (dispatch) => ({
  // startup: () => dispatch(StartupActions.startup())
})

export default connect(null, mapDispatchToProps)(RootContainer)
