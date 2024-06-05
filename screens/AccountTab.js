import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import Signup from './Signup';
import Login from './Login';
import { Ionicons } from '@expo/vector-icons';

const AccountTab = ({ onClose }) => {
  const [isSignupVisible, setIsSignupVisible] = useState(false);
  const [isLoginVisible, setIsLoginVisible] = useState(false);

  const openSignup = () => setIsSignupVisible(true);
  const openLogin = () => setIsLoginVisible(true);
  const closeSignup = () => setIsSignupVisible(false);
  const closeLogin = () => setIsLoginVisible(false);

  return (
    <View style={styles.container}>
      <Text style={styles.tabTitle}>Account</Text>
      <TouchableOpacity style={[styles.optionButton, {
        borderBottomWidth: 1,
        borderBottomColor: '#F3F3F3',
      }]} onPress={openLogin}>
        <Ionicons name="log-in-outline" size={24} color="black" />
        <Text style={styles.optionText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.optionButton} onPress={openSignup}>
        <Ionicons name="person-add-outline" size={24} color="black" />
        <Text style={styles.optionText}>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Ionicons name="close" size={24} color="black" />
      </TouchableOpacity>

      <Modal visible={isSignupVisible} animationType="slide">
        <Signup onClose={closeSignup} onOpen={openLogin} />
      </Modal>

      <Modal visible={isLoginVisible} animationType="slide">
        <Login onClose={closeLogin} onOpen={openSignup} />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
  },
  tabTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  optionText: {
    fontSize: 18,
    marginLeft: 10,
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
});

export default AccountTab;
