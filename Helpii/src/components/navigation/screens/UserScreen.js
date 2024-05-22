import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { obterUrlBase } from "../../autenticacao/AuthContext";
import { textStyles } from "../../Fonts";
import coracao from "../../../../assets/Coracao.png";
import rosto from "../../../../assets/Rosto.png";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UserScreen = ({ route }) => {
  const navigation = useNavigation();
  const [image, setImage] = useState(null);
  const [userData, setUserData] = useState({
    email: "",
    enderecos: [],
    id: 0,
    nome: "",
    telefone: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        console.log(token)
        const url = `${obterUrlBase()}/autenticacao/authenticated`
        const response = await fetch(
          url, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json;charset=UTF-8",
            "Authorization": `Bearer ${token}`
          },
        }
        );
        if (!response.ok) {
          throw new Error(
            `Erro na solicitação: ${response.status} - ${response.statusText}`
          );
        }
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error("Erro ao obter dados do usuário:", error.message);
      }
    };
    fetchUserData();
  }, []); 

  useEffect(() => {
    getImageFromParams();
  }, [route]);

  const getImageFromParams = () => {
    const { selectedImage } = route.params || {};
    if (selectedImage) {
      setImage(selectedImage);
    }
  };

  const irParaInfo = () => {
    navigation.navigate("Info", {
      defaultImage: image || "https://static.vecteezy.com/system/resources/thumbnails/005/545/335/small/user-sign-icon-person-symbol-human-avatar-isolated-on-white-backogrund-vector.jpg",
    });
  };

  const irParaDonate = () => {
    navigation.navigate("Donate");
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("userToken");
      navigation.navigate("Login");
    } catch (error) {
      console.error("Erro ao deslogar:", error.message);
    }
  };

  const deleteUser = async () => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      const token = await AsyncStorage.getItem("userToken");
      const url = `${obterUrlBase()}/api/user/${userId}`;
      
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.ok) {
        await AsyncStorage.removeItem("userToken");
        navigation.navigate("Login");
      } else {
        const responseBody = await response.text();
        console.error("Falha ao deletar usuário. Status:", response.status);
        console.error("Detalhes da resposta:", responseBody);
        Alert.alert("Erro", "Falha ao deletar usuário. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro ao deletar usuário:", error.message);
      Alert.alert("Erro", "Erro ao deletar usuário. Tente novamente.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        {image ? (
          <Image source={{ uri: `data:image/png;base64,${image}` }} style={styles.avatarFoto} />
        ) : (
          <Image
            source={{
              uri:
                "https://static.vecteezy.com/system/resources/thumbnails/005/545/335/small/user-sign-icon-person-symbol-human-avatar-isolated-on-white-backogrund-vector.jpg",
            }}
            style={styles.avatarFoto}
          />
        )}
      </View>
      {userData && (
        <>
          <Text style={textStyles.titulo}>{userData.nome}</Text>
        </>
      )}
      <View style={styles.Divisoria} />
      <View style={styles.containerInf}>
        <Image source={rosto} style={styles.image} />
        <TouchableOpacity onPress={irParaInfo}>
          <Text style={textStyles.subtituloNeg}>Informações pessoais</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.Divisoria} />
      <View style={styles.containerDoa}>
        <Image source={coracao} style={styles.image} />
        <TouchableOpacity onPress={irParaDonate}>
          <Text style={textStyles.subtituloNeg}>Minhas doações</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.Divisoria} />

      <TouchableOpacity style={styles.button} onPress={logout}>
        <Text style={textStyles.subtituloNeg}>Deslogar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={deleteUser}>
        <Text style={textStyles.subtituloNeg}>Deletar Usuário</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0047AB",
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: -20,
  },
  avatarFoto: {
    width: 130,
    height: 130,
    borderRadius: 100,
  },
  Divisoria: {
    height: 2,
    backgroundColor: "white",
    width: "80%",
    marginTop: 20,
    marginBottom: 20,
  },
  containerInf: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  containerDoa: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  image: {
    width: 40,
    height: 40,
    marginRight: 16,
  },
  button: {
    height: 40,
    borderRadius: 10,
    marginTop: 15,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default UserScreen;