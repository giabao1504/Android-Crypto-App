import { View, Text, Image, Pressable, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import COLORS from '../constants/colors';
import { Ionicons } from '@expo/vector-icons';
import Checkbox from 'expo-checkbox';
import Button from '../components/Button';
import { signupStyles } from './styles';
import { firebase } from '../config'

const Signup = ({ onClose, onOpen }) => {
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassWord] = useState('');

  const signupUser = async (email, password) => {
    await firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(() => {
        firebase.auth().currentUser.sendEmailVerification({
          handleCodeInApp: true,
          url: 'https://crypto-b9821.firebaseapp.com',
        })
          .then(() => {
            alert('Create account successfully');
            setTimeout(() => {
              onClose();
              onOpen();
            }, 2000);
          }).catch((error) => { alert(error.message) })
          .then(() => {
            firebase.firestore().collection('users')
              .doc(firebase.auth().currentUser.uid)
              .set({ email })
          }).catch((error) => { alert(error.message) })
      }).catch((error) => { alert(error.message) })
  }

  const handleLoginPress = () => {
    onClose();
    onOpen();
  };

  return (
    <SafeAreaView style={signupStyles.container}>
      <View style={signupStyles.innerContainer}>
        <TouchableOpacity onPress={onClose} style={{ marginTop: 15 }}>
          <Ionicons name="arrow-back" size={34} color={COLORS.black} />
        </TouchableOpacity>
        <View style={signupStyles.headerContainer}>
          <Text style={signupStyles.headerText}>Create Account</Text>
        </View>

        <View style={signupStyles.inputContainer}>
          <Text style={signupStyles.inputLabel}>Email address</Text>
          <View style={signupStyles.inputWrapper}>
            <TextInput
              placeholder='Enter your email address'
              placeholderTextColor={COLORS.black}
              keyboardType='email-address'
              style={signupStyles.inputField}
              onChangeText={(email) => setEmail(email)}
              autoCapitalize='none'
              autoCorrect={false}
            />
          </View>
        </View>

        <View style={signupStyles.inputContainer}>
          <Text style={signupStyles.inputLabel}>Password</Text>
          <View style={signupStyles.passwordWrapper}>
            <TextInput
              placeholder='Enter your password'
              placeholderTextColor={COLORS.black}
              secureTextEntry={!isPasswordShown}
              style={signupStyles.passwordInput}
              onChangeText={(password) => setPassWord(password)}
              autoCapitalize='none'
              autoCorrect={false}
            />
            <TouchableOpacity
              onPress={() => setIsPasswordShown(!isPasswordShown)}
              style={signupStyles.togglePassword}
            >
              <Ionicons name={isPasswordShown ? "eye-off" : "eye"} size={24} color={COLORS.black} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={signupStyles.checkboxContainer}>
          <Checkbox
            style={signupStyles.checkbox}
            value={isChecked}
            onValueChange={setIsChecked}
            color={isChecked ? COLORS.primary : undefined}
          />
          <Text>I agree to the terms and conditions</Text>
        </View>

        <Button
          title="Sign Up"
          style={signupStyles.button}
          onPress={() => signupUser(email, password)}
        />

        <View style={signupStyles.dividerContainer}>
          <View style={signupStyles.divider} />
          <Text style={signupStyles.dividerText}>Or Sign up with</Text>
          <View style={signupStyles.divider} />
        </View>

        <View style={signupStyles.socialButtonsContainer}>
          <TouchableOpacity
            onPress={() => console.log("Pressed")}
            style={signupStyles.socialButton}
          >
            <Image
              source={require("../assets/facebook.png")}
              style={signupStyles.socialIcon}
              resizeMode='contain'
            />
            <Text>Facebook</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => console.log("Pressed")}
            style={signupStyles.socialButton}
          >
            <Image
              source={require("../assets/google.png")}
              style={signupStyles.socialIcon}
              resizeMode='contain'
            />
            <Text>Google</Text>
          </TouchableOpacity>
        </View>

        <View style={signupStyles.footer}>
          <Text style={signupStyles.footerText}>Already have an account ? </Text>
          <TouchableOpacity onPress={handleLoginPress}>
            <Text style={signupStyles.loginText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Signup;
