import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import COLORS from '../constants/colors';
import Checkbox from 'expo-checkbox';
import Button from '../components/Button';
import { firebase } from '../config';
import { loginStyles } from './styles';

const Login = ({ onClose, onOpen }) => {
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const loginUser = async () => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      onClose();
    } catch (error) {
      setErrorMessage('Wrong email or password');
    }
  };

  const handleSignupPress = () => {
    onClose();
    onOpen();
  };

  return (
    <SafeAreaView style={loginStyles.container}>
      <View style={loginStyles.innerContainer}>
        <TouchableOpacity onPress={onClose} style={{ marginTop: 15 }}>
          <Ionicons name="arrow-back" size={34} color={COLORS.black} />
        </TouchableOpacity>
        <View>
          <Text style={loginStyles.headerText}>Login</Text>
        </View>

        <View style={loginStyles.inputContainer}>
          <Text style={loginStyles.inputLabel}>Email address</Text>
          <View style={loginStyles.inputWrapper}>
            <TextInput
              placeholder='Enter your email address'
              placeholderTextColor={COLORS.black}
              keyboardType='email-address'
              style={loginStyles.inputField}
              onChangeText={setEmail}
              autoCapitalize='none'
              autoCorrect={false}
            />
          </View>
        </View>

        <View style={loginStyles.inputContainer}>
          <Text style={loginStyles.inputLabel}>Password</Text>
          <View style={loginStyles.passwordWrapper}>
            <TextInput
              placeholder='Enter your password'
              placeholderTextColor={COLORS.black}
              secureTextEntry={!isPasswordShown}
              style={loginStyles.passwordInput}
              onChangeText={setPassword}
              autoCapitalize='none'
              autoCorrect={false}
            />
            <TouchableOpacity
              onPress={() => setIsPasswordShown(!isPasswordShown)}
              style={loginStyles.togglePassword}
            >
              <Ionicons name={isPasswordShown ? 'eye-off' : 'eye'} size={24} color={COLORS.black} />
            </TouchableOpacity>
          </View>
        </View>

        {errorMessage ? <Text style={{ color: 'red', paddingVertical: 5, fontSize: 16 }}>{errorMessage}</Text> : null}

        <View style={loginStyles.checkboxContainer}>
          <Checkbox
            style={loginStyles.checkbox}
            value={isChecked}
            onValueChange={setIsChecked}
            color={isChecked ? COLORS.primary : undefined}
          />
          <Text>Remember Me</Text>
        </View>

        <Button
          title='Login'
          style={loginStyles.button}
          onPress={loginUser}
        />

        <View style={loginStyles.dividerContainer}>
          <View style={loginStyles.divider} />
          <Text style={loginStyles.dividerText}>Or Login with</Text>
          <View style={loginStyles.divider} />
        </View>

        <View style={loginStyles.socialButtonsContainer}>
          <TouchableOpacity
            onPress={() => console.log('Pressed')}
            style={loginStyles.socialButton}
          >
            <Image
              source={require("../assets/facebook.png")}
              style={loginStyles.socialIcon}
              resizeMode='contain'
            />
            <Text>Facebook</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => console.log('Pressed')}
            style={loginStyles.socialButton}
          >
            <Image
              source={require("../assets/google.png")}
              style={loginStyles.socialIcon}
              resizeMode='contain'
            />
            <Text>Google</Text>
          </TouchableOpacity>
        </View>

        <View style={loginStyles.footer}>
          <Text style={loginStyles.footerText}>Don't have an account?</Text>
          <TouchableOpacity onPress={handleSignupPress}>
            <Text style={loginStyles.registerText}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;
