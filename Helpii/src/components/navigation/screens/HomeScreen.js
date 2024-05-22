import React, { useEffect, useContext, useState } from "react";
import { StyleSheet, Text, View, SafeAreaView, Image, FlatList } from "react-native";
import { AuthContext } from "../../autenticacao/AuthContext";
import { loginName } from "../TabNavigator";
import { obterUrlBase } from "../../autenticacao/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HomeScreen({ navigation }) {
  const userAuth = useContext(AuthContext);

  const [doacaoData, setDoacaoData] = useState({
    id: 0,
    nome: "",
    descricao: "",
    situacao: "",
    file: "",
    categoria: "",
    categoriaId: 0,
    quantidade: 0,
    vendedorId: 0,
    vendedorNome: "",
    userFile: "",
    endereco: []
  });

  useEffect(() => {

    if (!userAuth.userToken) {
      navigation.navigate(loginName);
    }
  }, []);

  useEffect(() => {
    const fetchDoacoes = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        const url = `${obterUrlBase()}/api/doacao`
        const response = await fetch(url, {
          method: "GET",
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
          "Authorization": `Bearer ${token}`
        });

        if (!response.ok) {
          throw new Error(
            `Erro na solicitação: ${response.status} - ${response.statusText}`
          );
        }

        const data = await response.json();
        console.log(data)
        setDoacaoData(data);
      } catch {
        console.error("Erro ao obter as doações:", error.message);
      }
    };
    
    fetchDoacoes();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        keyExtractor={(item) => item.id}
        data={doacaoData}
        renderItem={({ item }) => (
          <View style={styles.homeDonation}>
            <View style={styles.homeDonationName}>
              <Image
                source={{uri: item.userFile}}
                style={styles.logoImage}
              />
              <Text style={styles.text}>{item.vendedorNome}</Text>
            </View>
            <View style={styles.homeDonationImage}>
              <Image
                source={{uri : item.file}}
                style={styles.homeDonationImage}
              />
            </View>
            <View style={styles.homeDonationDescription}>
              <Text style={styles.donationDescriptionTitle}>
                {item.nome}
              </Text>
              <Text style={styles.donationDescription}>
                {item.descricao}
              </Text>
              <Text style={styles.donationDescription}>
                Quantidade disponível: {item.quantidade}
              </Text>
              <Text style={styles.donationDescription}>
                {item.categoria}
              </Text>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0047AB",
  },
  homeDonation: {
    backgroundColor: "#0047AB",
    marginTop: 20,
  },
  homeDonationName: {
    marginTop: 10,
    padding: 20,
    flexDirection: "row",
  },
  logoImage: {
    width: 75,
    height: 75,
    borderRadius: 100,
    marginTop: 10,
  },
  text: {
    color: "white",
    fontSize: 20,
    marginTop: 30,
    marginLeft: 30,
  },
  homeDonationImage: {
    width: 425,
    height: 425,
    marginTop: 10,
    backgroundColor: "white",
  },
  homeDonationDescription: {
    marginTop: 10,
    padding: 10,
  },
  donationDescriptionTitle: {
    color: "white",
    fontWeight: "bold",
  },
  donationDescription: {
    color: "white",
  },
});