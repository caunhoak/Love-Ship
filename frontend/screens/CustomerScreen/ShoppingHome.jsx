import React, { useState, useEffect, useContext } from "react";
import { CartContext } from "../../api/CartContext";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState("");
  const urlLocalHost = process.env.EXPO_PUBLIC_LOCALHOST;
  const { userId } = useContext(CartContext);
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(false); // State to indicate loading

  useEffect(() => {
    fetchStores();
  }, []);

  const fetchStores = async () => {
    setLoading(true); // Set loading to true when fetching data
    try {
      const response = await axios.get(`${urlLocalHost}/api/stores`);
      setStores(response.data);
    } catch (error) {
      console.error("Error fetching stores:", error);
    } finally {
      setLoading(false); // Set loading to false when data fetching is complete
    }
  };

  const renderStoreItem = ({ item }) => (
    <TouchableOpacity
      style={styles.storeContainer}
      onPress={() => handleStore(item._id)}
    >
      <Text style={styles.storeName}>{item.name}</Text>
      {item.logo_data && (
        <Image
          source={{
            uri: `${urlLocalHost}/api/stores/${item._id}/image`,
          }}
          style={styles.logo}
        />
      )}
      <Text style={styles.storeInfo}>{item.address}</Text>
      <Text style={styles.storeInfo}>{item.phone}</Text>
      <View style={styles.buttonContainer}>
        <Text style={styles.buttonText}>Xem cửa hàng</Text>
      </View>
    </TouchableOpacity>
  );

  const handleStore = async (storeId) => {
    try {
      if (userId) {
        navigation.navigate("ProductList", { storeId, userId });
      } else {
        console.error("No userId found in AsyncStorage");
        // Handle no userId found
      }
    } catch (error) {
      console.error("Error getting userId from AsyncStorage:", error);
      // Handle error getting userId
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Tìm kiếm cửa hàng"
            onChangeText={(text) => setSearchText(text)}
            value={searchText}
          />
          <MaterialIcons name="search" size={24} color="black" />
        </View>
      </View>
      {loading ? ( // Display loading indicator if loading is true
        <ActivityIndicator size="large" color="#1e90ff" />
      ) : (
        <FlatList
          data={stores.filter((store) =>
            store.name.toLowerCase().includes(searchText.toLowerCase())
          )}
          renderItem={renderStoreItem}
          keyExtractor={(item) => item._id.toString()}
          contentContainerStyle={styles.storeList}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  searchInput: {
    flex: 1,
    padding: 10,
  },
  storeList: {
    paddingBottom: 10,
  },
  storeContainer: {
    marginBottom: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    padding: 10,
  },
  storeName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
  },
  logo: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
  storeInfo: {
    marginBottom: 5,
    textAlign: "center",
  },
  buttonContainer: {
    backgroundColor: "#0069d9",
    padding: 10,
    borderRadius: 10,
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
  },
});

export default HomeScreen;
