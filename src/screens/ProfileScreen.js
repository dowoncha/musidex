import React, { Component } from 'react'
import { View, ListView } from 'react-native'
import { connect } from 'react-redux'

import { List, ListItem } from 'react-native-elements'

class ProfileScreen extends Component {
  static navigationOptions = {
    title: 'Profile'
  }

  render () {
    const menuItems = [
      {
        title: 'History'
      },
      {
        title: 'Achievements'
      },
      {
        title: 'Settings'
      },
      {
        title: 'Log Out'
      }
    ]

    return (
      <View>
        <List>
          {menuItems.map((item, i) => (
            <ListItem
              key={i}
              title={item.title} />
          ))}
        </List>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen)
