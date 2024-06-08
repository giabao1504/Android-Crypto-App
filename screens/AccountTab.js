import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Image, Switch } from 'react-native';
import Signup from './Signup';
import Login from './Login';
import { Ionicons } from '@expo/vector-icons';

const AccountTab = ({ onClose }) => {
  const [isSignupVisible, setIsSignupVisible] = useState(false);
  const [isLoginVisible, setIsLoginVisible] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [expandedOption, setExpandedOption] = useState(null);

  const openSignup = () => setIsSignupVisible(true);
  const openLogin = () => setIsLoginVisible(true);
  const closeSignup = () => setIsSignupVisible(false);
  const closeLogin = () => setIsLoginVisible(false);
  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  const toggleOption = (option) => {
    setExpandedOption((prev) => (prev === option ? null : option));
  };

  return (
    <View style={styles.container}>
      <View style={styles.accountInfo}>
        <Image
          source={{ uri: 'https://www.w3schools.com/w3images/avatar2.png' }}
          style={styles.avatar}
        />
        <View>
          <Text style={styles.greeting}>Hi, ab8sah3zrozg</Text>
          <Text style={styles.email}>example@gmail.com</Text>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.optionRow}>
          <Text style={styles.optionText}>Dark Mode</Text>
          <Switch value={isDarkMode} onValueChange={toggleDarkMode} />
        </View>
        <View style={styles.separator} />
        <TouchableOpacity style={styles.optionRow} onPress={() => toggleOption('language')}>
          <Text style={styles.optionText}>Language</Text>
          <Ionicons name={expandedOption === 'language' ? 'chevron-down' : 'chevron-forward'} size={24} color="gray" />
        </TouchableOpacity>
        {expandedOption === 'language' && (
          <View style={styles.subOptions}>
            <Text>English</Text>
            {/* Thêm các tùy chọn ngôn ngữ khác nếu cần */}
          </View>
        )}
        <View style={styles.separator} />
        <TouchableOpacity style={styles.optionRow} onPress={() => toggleOption('currencies')}>
          <Text style={styles.optionText}>Default Currencies</Text>
          <Ionicons name={expandedOption === 'currencies' ? 'chevron-down' : 'chevron-forward'} size={24} color="gray" />
        </TouchableOpacity>
        {expandedOption === 'currencies' && (
          <View style={styles.subOptions}>
            <Text>USD & BTC</Text>
          </View>
        )}
        <View style={styles.separator} />
        <TouchableOpacity style={styles.optionRow} onPress={() => toggleOption('widgets')}>
          <Text style={styles.optionText}>Widgets</Text>
          <Ionicons name={expandedOption === 'widgets' ? 'chevron-down' : 'chevron-forward'} size={24} color="gray" />
        </TouchableOpacity>
        {expandedOption === 'widgets' && (
          <View style={styles.subOptions}>
            <Text>Widget Options</Text>
          </View>
        )}
      </View>

      <View style={styles.section}>
        <TouchableOpacity style={styles.optionRow} onPress={() => toggleOption('settings')}>
          <Text style={styles.optionText}>Settings</Text>
          <Ionicons name={expandedOption === 'settings' ? 'chevron-down' : 'chevron-forward'} size={24} color="gray" />
        </TouchableOpacity>
        {expandedOption === 'settings' && (
          <View style={styles.subOptions}>
            <Text>Settings Options</Text>
            {/* Thêm các tùy chọn cài đặt khác nếu cần */}
          </View>
        )}
        <View style={styles.separator} />
        <TouchableOpacity style={styles.optionRow} onPress={() => toggleOption('helpCenter')}>
          <Text style={styles.optionText}>Help Center</Text>
          <Ionicons name={expandedOption === 'helpCenter' ? 'chevron-down' : 'chevron-forward'} size={24} color="gray" />
        </TouchableOpacity>
        {expandedOption === 'helpCenter' && (
          <View style={styles.subOptions}>
            <Text>Help Center Options</Text>
            {/* Thêm các tùy chọn trung tâm trợ giúp khác nếu cần */}
          </View>
        )}
      </View>

      <View style={styles.loginRegisterSection}>
        <TouchableOpacity style={styles.loginRegisterButton} onPress={openLogin}>
          <Text style={styles.optionText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginRegisterButton} onPress={openSignup}>
          <Text style={styles.optionText}>Register</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.contactSection}>
        <Text style={styles.contactText}>Contact us</Text>
        <View style={styles.contactIcons}>
          <Ionicons name="globe-outline" size={24} color="#4285F4" />
          <Ionicons name="logo-reddit" size={24} color="#FF4500" />
          <Ionicons name="logo-facebook" size={24} color="#4267B2" />
          <Ionicons name="logo-twitter" size={24} color="#1DA1F2" />
        </View>
        <View style={styles.separator} />
      </View>

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
    padding: 8,
  },
  accountInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  greeting: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 14,
    color: 'gray',
  },
  section: {
    backgroundColor: '#F3F3F3', // Màu nền của mỗi vùng
    padding: 16,
    borderRadius: 8,
    marginBottom: 16, // Khoảng cách giữa các vùng
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  separator: {
    height: 1,
    backgroundColor: '#EAEAEA', // Màu của dấu gạch
    marginVertical: 8,
  },
  optionText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  optionRightText: {
    fontSize: 14,
    color: 'gray',
  },
  subOptions: {
    paddingLeft: 16,
    paddingVertical: 8,
    backgroundColor: '#F3F3F3',
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  loginRegisterSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 12,
  },
  loginRegisterButton: {
    flex: 1,
    backgroundColor: '#F3F3F3',
    alignItems: 'center',
    paddingVertical: 12,
    marginRight: 8,
    borderRadius: 8,
  },
  contactSection: {
    alignItems: 'center',
    marginTop: 30,
  },
  contactText: {
    fontSize: 16,
    marginBottom: 15,
  },
  contactIcons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '60%',
  },
});

export default AccountTab;