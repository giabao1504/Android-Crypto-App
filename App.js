import React, { useRef, useState, useMemo, useEffect, useCallback } from 'react';
import { FlatList, StyleSheet, View, Text, SafeAreaView, TouchableOpacity, RefreshControl, Alert } from 'react-native';
import Header from './components/Header'; // Import Header
import ListItem from './components/ListItem';
import Chart from './components/Chart';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import { getMarketData } from './services/cryptoService';

export default function App() {
  const [data, setData] = useState([]);
  const [displayedData, setDisplayedData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [selectedCoinData, setSelectedCoinData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [refreshing, setRefreshing] = useState(false);

  const fetchMarketData = async () => {
    try {
      const marketData = await getMarketData();
      if (marketData) {
        setData(marketData);
        setOriginalData(marketData);
        setDisplayedData(marketData.slice(0, 50));
        setTotalPages(Math.ceil(marketData.length / 50));
      }
    } catch (error) {
      if (error.response && error.response.status === 429) {
        Alert.alert('Too Many Requests', 'You have made too many requests in a short period. Please try again later.');
      } else {
        Alert.alert('Error', 'An error occurred while fetching data.');
      }
    }
  };

  useEffect(() => {
    fetchMarketData();

    const interval = setInterval(() => {
      fetchMarketData();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const bottomSheetModalRef = useRef(null);

  const snapPoints = useMemo(() => ['50%'], []);

  const openModal = (item) => {
    setSelectedCoinData(item);
    bottomSheetModalRef.current?.present();
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setDisplayedData(data.slice((page - 1) * 50, page * 50));
  };

  const sortData = useCallback((key) => {
    const sortedData = [...data].sort((a, b) => b[key] - a[key]);
    setData(sortedData);
    setDisplayedData(sortedData.slice((currentPage - 1) * 50, currentPage * 50));
  }, [data, currentPage]);

  const resetData = useCallback(() => {
    setData(originalData);
    setDisplayedData(originalData.slice((currentPage - 1) * 50, currentPage * 50));
  }, [originalData, currentPage]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchMarketData();
    setRefreshing(false);
  }, []);

  return (
    <BottomSheetModalProvider>
      <SafeAreaView style={styles.container}>
        <Header sortData={sortData} resetData={resetData} data={data} />
        <FlatList
          keyExtractor={(item) => item.id}
          data={displayedData}
          renderItem={({ item }) => (
            <ListItem
              marketCapRank={item.market_cap_rank}
              logoUrl={item.image}
              name={item.name}
              symbol={item.symbol}
              marketCap={item.market_cap}
              currentPrice={item.current_price}
              priceChangePercentage24h={item.price_change_percentage_24h}
              onPress={() => openModal(item)}
            />
          )}
          ListFooterComponent={
            <View style={styles.pagination}>
              {[...Array(totalPages)].map((_, index) => (
                <TouchableOpacity
                  key={index + 1}
                  style={[
                    styles.pageButton,
                    currentPage === index + 1 && styles.activePageButton
                  ]}
                  onPress={() => handlePageChange(index + 1)}
                >
                  <Text style={[
                    styles.pageButtonText,
                    currentPage === index + 1 && styles.activePageButtonText
                  ]}>
                    {index + 1}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          }
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </SafeAreaView>

      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        style={styles.bottomSheet}
      >
        {selectedCoinData ? (
          <Chart
            currentPrice={selectedCoinData.current_price}
            logoUrl={selectedCoinData.image}
            name={selectedCoinData.name}
            symbol={selectedCoinData.symbol}
            priceChangePercentage7d={selectedCoinData.price_change_percentage_7d_in_currency}
            sparkline={selectedCoinData?.sparkline_in_7d.price}
          />
        ) : null}
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  bottomSheet: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  pageButton: {
    marginHorizontal: 5,
    paddingHorizontal: 8,
    paddingVertical: 5,
    backgroundColor: '#E0E0E0',
    borderRadius: 5,
  },
  pageButtonText: {
    fontSize: 16,
    color: 'black',
  },
  activePageButton: {
    backgroundColor: '#1e90ff',
  },
  activePageButtonText: {
    color: '#fff',
  },
});

