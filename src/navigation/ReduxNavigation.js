import React from 'react'
import { connect } from 'react-redux'
import { addNavigationHelpers } from 'react-navigation'

import AppNavigation from './AppNavigation'

// here is our redux-aware our smart component
function ReduxNavigation ({ dispatch, nav }) {
  const navigation = addNavigationHelpers({
    dispatch,
    state: nav
  })

  return <AppNavigation navigation={navigation} />
}

const mapStateToProps = state => ({ nav: state.nav })
export default connect(mapStateToProps)(ReduxNavigation)
