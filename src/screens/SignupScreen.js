import React, { Component } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'

// Components
import { Text, Button,
  Form, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'

// State management
import AuthActionCreators from '../redux/AuthRedux'

class SignupScreen extends Component {

  state = {
    email: '',
    password: ''
  }

  render() {
    const { handleSignup } = this.props;

    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
      }}>
        <View style={{ alignItems: 'center' }}>
          <Text h1>Sign Up</Text>
        </View>
        <View>
          <FormLabel>Email</FormLabel>
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
          <FormLabel>Password</FormLabel>
          <FormInput
            onChangeText={(text) => this.setState({ password: text })}
            value={this.state.password}
            secureTextEntry={true} />
        </View>
        <Button
          large
          raised
          title='Sign Up' 
          onPress={() => handleSignup({
            email: this.state.email, 
            password: this.state.password 
          })} />
      </View>
    ); 
  }
}

const mapStateToProps = (state) => {
  return {
    error: state.auth.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleSignup: (data) => dispatch(AuthActionCreators.signup(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupScreen)
