import React, { Component } from 'react'
import { View } from 'react-native'

// State management
import { connect } from 'react-redux'

// import { NavigationActions } from 'react-navigation'

// --- Components
import { colors, Text, Button, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'

/**
 * Login screen
 * Display if user is not authenticated (logged out)
 */
class LoginScreen extends Component {
  state = {
    loading: false,
    email: '',
    password: ''
  }

  render () {
    const { handleLogin } = this.props;

    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
      }}>
        <View style={{
          alignItems: 'center'
        }}>
          <Text h1>Musidex</Text>
        </View>
        <View>
          <FormLabel>Username or Email</FormLabel>
          <FormInput
            onChangeText={(text) => this.setState({ email: text })}
            value={this.state.email} />
          <FormValidationMessage>
            {'TODO: display auth error message'}
          </FormValidationMessage>
        </View>
        <View>
          <FormLabel>Password</FormLabel>
          <FormInput
            onChangeText={(text) => this.setState({ password: text })}
            value={this.state.password}
            secureTextEntry={true} />
        </View>
        <Button
          large
          raised
          backgroundColor={colors.primary2}
          title='Log In'
          onPress={() => handleLogin(this.state.email, this.state.password)} />
        <Button
          large
          raised
          title='Sign Up' />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    // loading: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleLogin: (email, pwd) => { }
    // onLogin: (email, password) => dispatch(Creators.loginRequest(email, password))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
