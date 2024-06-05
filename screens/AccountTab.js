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
      <TouchableOpacity style={styles.optionButton} onPress={openLogin}>
        <Text style={styles.optionText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.optionButton} onPress={openSignup}>
        <Text style={styles.optionText}>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Ionicons name="close" size={24} color="black" />
      </TouchableOpacity>

      <Modal visible={isSignupVisible} animationType="slide">
        <Signup onClose={closeSignup} />
      </Modal>

      <Modal visible={isLoginVisible} animationType="slide">
        <Login onClose={closeLogin} />
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  optionButton: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  optionText: {
    fontSize: 18,
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
    elevation: 2,
  },
});

export default AccountTab;
