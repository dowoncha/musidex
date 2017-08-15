import React, { Component } from 'react'
import { View, Animated, ScrollView, Text, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'

// import { NavigationActions } from 'react-navigation';

// import SearchBar from '../Components/SearchBar'

class UploadScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      track: null,
      drop: {                            // Drop data
        track: null
      },
      creating: false,                   // Fetch status
      fadeAnim: new Animated.Value(0)    // For fade intro animation
    }
  }

  componentDidMount() {
    Animated.timing(
      this.state.fadeAnim,
      {
        toValue: 1,
        duration: 1000
      }
    ).start();
  }

  render () {
    return (
      <View>
        <Text>Upload</Text>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    // position: state.geolocation.lastPosition
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // onCreateDrop: (drop) => dispatch(DropCreators.createDropRequest(drop)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UploadScreen)
