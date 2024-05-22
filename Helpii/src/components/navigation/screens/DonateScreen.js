import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { textStyles } from "../../Fonts";
import { obterUrlBase } from "../../autenticacao/AuthContext";

const Stack = createStackNavigator();
const locations = [
  {
    title: "Jaqueta doação",
    image: require("../../../../assets/Jaqueta.jpg"),
  },
];

const LocationCard = ({ location, navigation }) => {
  return (
    <View style={styles.card}>
      <TouchableOpacity
        onPress={() => navigation.navigate("Details", { location })}
      >
        <Text style={styles.locationText}>{location.title}</Text>
      </TouchableOpacity>
      {location.image && (
        <Image source={location.image} style={styles.locationImage} />
      )}
      <Text style={styles.locationDescription}>{location.description}</Text>
    </View>
  );
};

export const DonateScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate("User")}
      >
        <View style={styles.headerTextContainer}>
          <Text style={styles.backButtonText}>ᐊ </Text>
        </View>
      </TouchableOpacity>
      <Text></Text>
      {locations.map((location, index) => (
        <LocationCard key={index} location={location} navigation={navigation} />
      ))}
    </View>
  );
};

export const DetailsScreen = ({ route }) => {
  const [userData, setUserData] = useState(null);
  const [enderecos, setEnderecos] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = await AsyncStorage.getItem("userToken");
        const userId = await AsyncStorage.getItem("userId");
        const url = `${obterUrlBase()}/api/doacao/doacoes-usuario${userId}`;
        const response = await fetch(url, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json;charset=UTF-8",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error(
            `Erro na solicitação: ${response.status} - ${response.statusText}`
          );
        }
        const data = await response.json();
        console.log("UserData:", data);
        setUserData(data);
      } catch (error) {
        console.error("Erro ao obter dados do usuário:", error.message);
      }
    };
    fetchUserData();
  }, []);
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{route.params.location.title}</Text>
      {route.params.location.image && (
        <Image
          source={route.params.location.image}
          style={styles.locationImage}
        />
      )}
      <Text></Text>

      {userData && (
        <View>
          <Text style={styles.productInfo}>
            Nome do Produto: {userData.nome}
          </Text>
          <Text style={styles.productInfo}>
            Categoria: {userData.categoria}
          </Text>
          <Text style={styles.productInfo}>
            Quantidade: {userData.quantidade}
          </Text>
          <Text style={styles.productInfo}>
            Descrição: {userData.descricao}
          </Text>
          <Text style={styles.productInfo}>Endereço:</Text>
          {userData &&
            userData.enderecos &&
            userData.enderecos.map((endereco, index) => (
              <View key={index}>
                <Text style={styles.addressInfo}>{endereco.rua}</Text>
                <Text style={styles.addressInfo}>
                  {endereco.cidade} / {endereco.uf}
                </Text>
              </View>
            ))}
        </View>
      )}
    </View>
  );
};

const App = ({ navigation }) => (
  <Stack.Navigator
    initialRouteName="Donate"
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen
      name="Minhas doações"
      component={DonateScreen}
      navigation={navigation}
    />
    <Stack.Screen
      name="Details"
      component={DetailsScreen}
      navigation={navigation}
    />
  </Stack.Navigator>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0047AB",
    padding: 30,
  },
  headerTextContainer: {
    marginTop: 30,
    flexDirection: "row",
    alignItems: "center",
  },
  card: {
    backgroundColor: "white",
    padding: 20,
    marginBottom: 20,
  },
  locationText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "purple",
    marginBottom: 10,
    textAlign: "center",
  },
  locationImage: {
    marginTop: 20,
    marginLeft: 10,
    width: 300,
    height: 300,
    borderRadius: 0,
  },
  locationDescription: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "purple",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 5,
  },
  buttonText: {
    fontSize: 16,
    color: "white",
  },
  backButton: {
    alignSelf: "flex-start",
  },
  backButtonText: {
    marginLeft: 10,
    fontSize: 30,
    color: "white",
    fontWeight: "bold",
  },
  locationTitle: {
    fontSize: 18,
    color: "ss",
    fontWeight: "bold",
    marginBottom: 10,
  },
  locationDescription: {
    fontSize: 16,
    color: "black",
    marginBottom: 10,
  },
  locationDescriptionWhite: {
    fontSize: 16,
    color: "white",
    marginBottom: 10,
  },

  productInfo: {
    fontSize: 18,
    color: "white",
    marginBottom: 10,
  },

  addressInfo: {
    fontSize: 16,
    color: "white",
    marginBottom: 10,
  },
});

export default App;