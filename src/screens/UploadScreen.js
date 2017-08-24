import React, { Component } from 'react'
import { View, Animated, ScrollView, KeyboardAvoidingView, Alert } from 'react-native'
import { connect } from 'react-redux'

import { GOOGLE_API_KEY } from '../config/PublicAccessKeys'

import { Header, SearchBar, Icon, List, ListItem, Text } from 'react-native-elements'

import YouTube from 'react-native-youtube'

import DropsActionCreator from '../redux/EntitiesRedux'

class UploadScreen extends Component { 
  static navigationOptions = ({ navigation }) => {
    title: 'Upload'
    // header: ({ state }) => ({
    //   right: <Icon name='send' onPress={() => state.params.handleSend} />
    // })
  }

  state = {
    selectedTrack: null,
    currentlyDisplayed: this.props.searchedTracks,
    creating: false,                   // Fetch status
    fadeAnim: new Animated.Value(0)    // For fade intro animation
  }


  componentDidMount() {
    // Handle animation timing for 1 second
    Animated.timing(
      this.state.fadeAnim,
      {
        toValue: 1,
        duration: 1000
      }
    ).start();
    
    // Send handler for navigation
    // this.props.navigation.setParams({ handleSend: this.handleSend })
  }

  handleSend() {
    alert('Drop track')
  }

  handleOnTrackSubmit(id, track) {
    Alert.alert(
      'Drop',
      `Do you want to drop: ${track.title}`,
      [
        { text: 'Cancel', style: 'cancel'},
        { text: 'Drop', onPress: () => this.props.handleUpload(id) }
      ]
    )
  }

  renderSearchedTracks() {
    const list = Object.entries(this.props.searchedTracks)
      .map(([key, track]) => {
        console.log(key)

        return (
          <ListItem 
            key={key}
            title={track.title} 
            onPress={() => this.handleOnTrackSubmit(key, track)}/>
        )
      })

    return (
      <List>
        <Text>List Start</Text>
        {list}
        <Text>ListEnd</Text>
      </List>
    )
  }

  render () {
    return (
      <View style={{ flex: 1 }}>
        <SearchBar 
          onChangeText={(text) => this.props.handleSearch(text)}
          placeholder="Search for Track" />
        <View >
          {this.renderSearchedTracks()}
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    selectedTrack: 'vk0F8dHo3wU',
    searchedTracks: state.entities.tracks.byId,
    position: state.geolocation.lastPosition
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleUpload: (trackId) => { dispatch(DropsActionCreator.createDrop(trackId)) },
    handleSearch: (text) => { dispatch(DropsActionCreator.searchTracks(text)) }
    // onCreateDrop: (drop) => dispatch(DropCreators.createDropRequest(drop)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UploadScreen)
