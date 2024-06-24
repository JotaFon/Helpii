import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { textStyles } from "../../Fonts";
import { obterUrlBase } from "../../autenticacao/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Info = () => {
  const FotoPerfilURL =
    "https://static.vecteezy.com/system/resources/thumbnails/005/545/335/small/user-sign-icon-person-symbol-human-avatar-isolated-on-white-backogrund-vector.jpg";
  const navigation = useNavigation();
  const [image, setImage] = useState(null);
  const [userData, setUserData] = useState({
    email: "",
    enderecos: [],
    id: 0,
    nome: "",
    telefone: "",
    arquivo: {},
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = await AsyncStorage.getItem("userToken");
        console.log(token);
        const url = `${obterUrlBase()}/autenticacao/authenticated`;
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
        setUserData(data);

        if (data.arquivo && Object.keys(data.arquivo).length > 0) {
          const profileImage = data.arquivo.content;
          setImage(profileImage);
        }
      } catch (error) {
        console.error("Erro ao obter dados do usuário:", error.message);
      }
    };
    fetchUserData();
  }, []);

  const VoltaUser = () => {
    navigation.navigate("User");
  };

  const handleImagePicker = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        aspect: [4, 4],
        allowsEditing: true,
        base64: true,
        quality: 1,
      });

      if (!result.canceled) {
        const selectedImage = result.uri || result.assets[0].uri;
        setImage(selectedImage);

        const token = await AsyncStorage.getItem("userToken");
        const userId = await AsyncStorage.getItem("userId");
        const url = `${obterUrlBase()}/api/user/atualizar-file/${userId}`;

        const formData = new FormData();
        formData.append("file", {
          uri: selectedImage,
          name: "profile.jpg",
          type: "image/jpeg",
        });

        console.log("FormData:", formData);

        const response = await fetch(url, {
          method: "PUT",
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });

        if (!response.ok) {
          const responseBody = await response.text();
          console.error("Erro na solicitação:", response.status, response.statusText);
          console.error("Resposta do servidor:", responseBody);
          throw new Error(
            `Erro na solicitação: ${response.status} - ${response.statusText}`
          );
        }

        const data = await response.json();

        if (data.arquivo && Object.keys(data.arquivo).length > 0) {
          const profileImage = data.arquivo.content;
          setImage(profileImage);
        }

        console.log("Imagem enviada com sucesso.");
        navigation.navigate("User", { selectedImage: profileImage });
      }
    } catch (error) {
      console.error("Erro ao escolher imagem:", error.message);
      Alert.alert("Erro", "Erro ao escolher imagem. Tente novamente.");
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={VoltaUser}>
        <Text style={styles.BotaoVoltar}>{`ᐊ`}</Text>
      </TouchableOpacity>
      <View style={styles.content}>
        {image ? (
          <Image source={{ uri: image }} style={styles.Foto} />
        ) : (
          <Image
            source={{
              uri: FotoPerfilURL,
            }}
            style={styles.Foto}
          />
        )}
        <TouchableOpacity onPress={handleImagePicker}>
          <Text style={styles.BotaoImage}>Escolher Imagem</Text>
        </TouchableOpacity>
        <Text style={[textStyles.titulo, { textAlign: "center" }]}>
          {userData.nome}
        </Text>
      </View>
      <View style={styles.Divisoria} />
      <Text style={textStyles.subtituloNeg}>Usuario: </Text>
      <Text style={textStyles.paragrafoNeg}>{userData.nome}</Text>
      <Text></Text>
      <Text style={textStyles.subtituloNeg}>E-mail: </Text>
      <Text style={textStyles.paragrafoNeg}>{userData.email}</Text>
      <Text></Text>
      <Text style={textStyles.subtituloNeg}>Telefone: </Text>
      <Text style={textStyles.paragrafoNeg}>{userData.telefone}</Text>
      <Text></Text>
      <Text style={textStyles.subtituloNeg}>Endereço:</Text>
      {userData.enderecos.map((endereco, index) => (
        <View key={index}>
          <Text style={textStyles.paragrafoNeg}>{endereco.rua}</Text>
          <Text style={textStyles.paragrafoNeg}>
            {endereco.cidade}
            <Text> / </Text>
            {endereco.uf}
          </Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0047AB",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 60,
  },
  content: {
    marginBottom: 10,
  },
  Foto: {
    marginTop: -8,
    width: 130,
    height: 130,
    borderRadius: 100,
    shadowColor: "black",
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowOpacity: 0.4,
    shadowRadius: 4,
  },
  Divisoria: {
    height: 2,
    backgroundColor: "white",
    width: "80%",
    marginTop: 20,
    marginBottom: 20,
  },
  BotaoVoltar: {
    right: 150,
    fontWeight: "bold",
    color: "white",
    fontSize: 30,
    marginBottom: 10,
  },
  BotaoImage: {
    marginTop: 5,
    marginLeft: 10,
    marginBottom: 15,
    color: "white",
    fontWeight: "bold",
  },
});

export default Info;
