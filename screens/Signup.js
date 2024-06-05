// Signup.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Signup = ({ onClose }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Signup</Text>
      {/* Thêm các thành phần cho giao diện đăng ký tại đây */}
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Text style={styles.closeText}>Close</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  closeButton: {
    marginTop: 20,
    paddingVertical: 10,
    backgroundColor: '#ccc',
    alignItems: 'center',
  },
  closeText: {
    fontSize: 18,
    color: 'black',
  },
});

export default Signup;
