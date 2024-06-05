import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, TextInput, FlatList, Image } from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';

const Header = ({ sortData, resetData, data }) => {
  const [activeTab, setActiveTab] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleTabPress = (key) => {
    if (activeTab === key) {
      setActiveTab(null);
      resetData();
    } else {
      setActiveTab(key);
      sortData(key);
    }
  };

  const handleSearch = (text) => {
    setSearchQuery(text);
    const results = data.filter((item) =>
      item.name.toLowerCase().includes(text.toLowerCase())
    );
    setSearchResults(results);
  };

  const renderSearchResults = ({ item }) => (
    <TouchableOpacity style={styles.searchResult}>
      <View style={styles.searchResultLeft}>
        <Image source={{ uri: item.image }} style={styles.searchResultImage} />
        <Text style={styles.searchResultName}>{item.symbol.toUpperCase()}</Text>
      </View>
      <Text style={[styles.searchResultPrice, item.price_change_percentage_24h >= 0 ? styles.greenText : styles.redText]}>
        ${item.current_price}
      </Text>
    </TouchableOpacity>
  );

  return (<>
    <View style={styles.headerWrapper}>
      <Text style={styles.largeTitle}>Markets</Text>
      <View style={styles.iconContainer}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="black" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search..."
            value={searchQuery}
            onChangeText={handleSearch}
          />
        </View>
        <TouchableOpacity style={styles.icon}>
          <Ionicons name="person-circle-outline" size={28} color="black" />
        </TouchableOpacity>
      </View>
    </View>
    <View style={styles.divider} />

    {searchQuery !== '' && (
      <FlatList
        data={searchResults}
        renderItem={renderSearchResults}
        keyExtractor={(item) => item.id.toString()}
        style={styles.searchResultsList}
      />
    )}

    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabView}>
      <TouchableOpacity style={[styles.tab, activeTab === 'market_cap_rank' && styles.activeTab]} onPress={() => handleTabPress('market_cap_rank')}>
        <Text style={styles.tabText}>Market Cap</Text>
        <AntDesign name={activeTab === 'market_cap_rank' ? "caretup" : "caretdown"} size={12} color="black" style={styles.sortIcon} />
      </TouchableOpacity>

      <TouchableOpacity style={[styles.tab, activeTab === 'price_change_percentage_24h' && styles.activeTab]} onPress={() => handleTabPress('price_change_percentage_24h')}>
        <Text style={styles.tabText}>24h %</Text>
        <AntDesign name={activeTab === 'price_change_percentage_24h' ? "caretup" : "caretdown"} size={12} color="black" style={styles.sortIcon} />
      </TouchableOpacity>

      <TouchableOpacity style={[styles.tab, activeTab === 'current_price' && styles.activeTab]} onPress={() => handleTabPress('current_price')}>
        <Text style={styles.tabText}>Price</Text>
        <AntDesign name={activeTab === 'current_price' ? "caretup" : "caretdown"} size={12} color="black" style={styles.sortIcon} />
      </TouchableOpacity>
    </ScrollView>
  </>
  );
};

const styles = StyleSheet.create({
  headerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 50,
    paddingHorizontal: 16,
  },
  largeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#A9ABB1',
    marginHorizontal: 16,
    marginTop: 16,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  searchInput: {
    marginLeft: 5,
    height: 30,
    width: 130,
    fontSize: 14,
  },
  searchIcon: {
    marginLeft: 5,
  },
  icon: {
    marginLeft: 16,
  },
  tabView: {
    marginTop: 10,
  },
  tab: {
    marginLeft: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  tabText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  sortIcon: {
    marginLeft: 5,
  },
  activeTab: {
    backgroundColor: '#CCCC',
  },
  searchResultsList: {
    position: 'absolute',
    top: '11%',
    left: 100,
    right: 20,
    backgroundColor: 'white',
    elevation: 2,
    zIndex: 999,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 16,
    maxHeight: 200,
  },
  searchResult: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  searchResultLeft: {
    flexDirection: 'row',
  },
  searchResultImage: {
    width: 25,
    height: 25,
    marginRight: 10,
    marginBottom: 10
  },
  searchResultName: {
    fontSize: 18,
    marginRight: 8,
    color: 'black',
  },
  searchResultPrice: {
    fontSize: 16,
    marginLeft: 'auto',
  },
  greenText: {
    color: 'green',
  },
  redText: {
    color: 'red',
  },
});

export default Header;
