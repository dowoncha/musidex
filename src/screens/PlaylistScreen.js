import React, { Component } from 'react'
import { View, ScrollView, ListView, Text } from 'react-native'
import { connect } from 'react-redux'

// Components
import { Header, List, ListItem } from 'react-native-elements'

import dropsData from '../fixtures/drops_mock_data'

class PlaylistScreen extends Component {
  // static navigationOptions = {
  //   title: 'Playlist'
  // }

  state = {
    dataSource: dropsData
  }

  renderRow(rowData) {
    // TODO: move into component
    return (
      <ListItem
        key={rowData.id}
        title={rowData.track}
        subtitle={`Score: ${rowData.score}, dropped at ${rowData.date}`}
        />
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
        <Header
          statusBarProps={{ barStyle: 'light-content' }}
          centerComponent={{ text: 'Playlist', style: { color: '#fff' }}}
          rightComponent={{ icon: 'sort', color: '#fff' }} />
        <ScrollView>
          <List>
            {this.state.dataSource.slice(0, 30)
                .map((el, i) => this.renderRow(el))
            }
          </List>
        </ScrollView>
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
