import React, { Component } from 'react'
import { View } from 'react-native'

// State management
import { connect } from 'react-redux'

import { NavigationActions } from 'react-navigation'
import AuthActionCreators from '../redux/AuthRedux'

import db from '../firebase'

// --- Components
import { colors, Text, Button, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'

import AppColors from '../styles/colors'

/**
 * Login screen
 * Display if user is not authenticated (logged out)
 */
export class LoginScreen extends Component {
  static navigationOptions = {
    header: null
  }

  state = {
    loading: false,
    email: '',
    password: ''
  }

  componentDidMount() {
    this.unsuscribe = db.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log("User: ", user)
      } else {
        console.log("No user")
      }
    })
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe()
    }
  }

  render () {
    const { handleLogin } = this.props;

    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        backgroundColor: AppColors.primary
      }}>
        <View style={{
          alignItems: 'center'
        }}>
          <Text h1 style={{ color: 'black' }}>Musidex</Text>
        </View>
        <View>
          <FormLabel labelStyle={{ color: 'black' }}>Username or Email</FormLabel>
          <FormInput
            onChangeText={(text) => this.setState({ email: text })}
            value={this.state.email} />
          {this.props.error && this.props.error.message &&  
            <FormValidationMessage>
              {this.props.error.message}
            </FormValidationMessage>
          }
        </View>
        <View>
          <FormLabel labelStyle={{ color: 'black' }}>Password</FormLabel>
          <FormInput
            onChangeText={(text) => this.setState({ password: text })}
            value={this.state.password}
            secureTextEntry={true} />
        </View>
        <View style={{
        }}>
        <Button
          large
          raised
          backgroundColor={AppColors.primaryLight}
          title='Log In'
          onPress={() => handleLogin(this.state.email, this.state.password)} />
        <Button
          large
          raised
          title='Sign Up'
          backgroundColor={AppColors.secondaryLight}
          onPress={() => this.props.navigation.navigate('Signup')} />
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    error: state.auth.error,
    getScreenDetails: (scene) => {
      const details = ownProps.getScreenDetails(scene);
      return {
        ...details,
        options: {
          headerStyle: { color: '#f00' },
          ...details.options
        }
      }
    }
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // Dispatch login request to redux
    handleLogin: (email, password) => dispatch(AuthActionCreators.loginRequest(email, password))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
