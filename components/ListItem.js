import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { AntDesign } from "@expo/vector-icons";

const ListItem = ({ name, symbol, currentPrice, priceChangePercentage24h, logoUrl, marketCapRank, marketCap, onPress }) => {

  const percentageColor =
    priceChangePercentage24h < 0 ? "#ea3943" : "#16c784" || 'white';

  const normalizeMarketCap = (marketCap) => {
    if (marketCap > 1e12) {
      return `${(marketCap / 1e12).toFixed(3)} T`;
    }
    if (marketCap > 1e9) {
      return `${(marketCap / 1e9).toFixed(3)} B`;
    }
    if (marketCap > 1e6) {
      return `${(marketCap / 1e6).toFixed(3)} M`;
    }
    if (marketCap > 1e3) {
      return `${(marketCap / 1e3).toFixed(3)} K`;
    }
    return marketCap;
  };
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.coinContainer}>
        <Image source={{ uri: logoUrl }} style={{
          height: 30,
          width: 30,
          marginRight: 10,
          alignSelf: "center",
        }} />
        <View>
          <Text style={styles.title}>{name}</Text>
          <View style={{ flexDirection: "row" }}>
            <View style={styles.rankContainer}>
              <Text style={styles.rank}>{marketCapRank}</Text>
            </View>
            <Text style={styles.text}>{symbol.toUpperCase()}</Text>
            <AntDesign
              name={priceChangePercentage24h < 0 ? "caretdown" : "caretup"}
              size={12}
              color={percentageColor}
              style={{ alignSelf: "center", marginRight: 5 }}
            />
            <Text style={{ color: percentageColor }}>
              {priceChangePercentage24h?.toFixed(2)}%
            </Text>
          </View>
        </View>
        <View style={{ marginLeft: "auto", alignItems: "flex-end" }}>
          <Text style={styles.title}>${currentPrice}</Text>
          <Text style={{ color: "black" }}>
            MC ${normalizeMarketCap(marketCap)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  title: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 3,
  },
  text: {
    color: "black",
    marginRight: 5,
  },
  coinContainer: {
    flexDirection: "row",
    padding: 15,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#F0F0F0",
  },
  rank: {
    fontWeight: 'bold',
    color: 'white',
  },
  rankContainer: {
    backgroundColor: '#CACACA',
    paddingHorizontal: 5,
    borderRadius: 5,
    marginRight: 6,
  }
});

export default ListItem
