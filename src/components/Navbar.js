import React, { Component } from 'react'

import { Header } from 'react-native'
import { connect } from 'react-redux'

const Navbar = props => <Header {...props} />

const mapStateToProps = (state, ownProps) => ({
  getScreenDetails: (scene) => {
    const details = ownProps.getScreenDetails(scene);
    return {
      ...details,
      options: {
        headerStyle: { backgroundColor: 'yellow'},
        headerTitleStyle: { color: '#f00' },
        ...details.options
      }
    }
  }
})

export default connect(mapStateToProps)(Navbar)
