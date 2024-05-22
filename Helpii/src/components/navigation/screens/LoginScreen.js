import React, { useContext } from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  TextInput,
  ScrollView
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { textStyles } from "../../Fonts";
import { AuthContext, obterUrlBase } from "../../autenticacao/AuthContext";

const Stack = createStackNavigator();

const LoginScreen = ({ navigation }) => {
  const userAuth = useContext(AuthContext);

  const goToRegister = () => {
    navigation.navigate("Register");
  };

  const [email, onChangeEmail] = React.useState("");
  const [senha, onChangePassword] = React.useState("");

  const logar = async () => {
    try {
      const url = `${obterUrlBase()}/autenticacao/login?email=${encodeURIComponent(email)}&senha=${encodeURIComponent(senha)}`;
      const response = await fetch(url, {
        method: "POST",
      });

      if (response.ok) {
        const data = await response.json();
        const { token, user } = data;

        console.log(token);
        await AsyncStorage.setItem("userToken", token);
        await AsyncStorage.setItem("userId", user.id.toString());
        navigation.navigate("Home");
      } else {
        console.error("Credenciais inválidas. Status:", response.status);
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
    <ScrollView>
      <Image
        source={require("../../../../assets/helpii_logo.png")}
        style={styles.logoImage}
      />
      <Text style={styles.titulo}>Login</Text>
      <Text style={styles.text}>Email</Text>
      <TextInput
        style={styles.textInput}
        editable
        multiline
        numberOfLines={1}
        maxLength={40}
        onChangeText={(email) => onChangeEmail(email)}
        placeholder="Email"
        value={email}
      />
      <Text style={styles.text}>Senha</Text>
      <TextInput
        style={styles.textInput}
        editable
        multiline
        numberOfLines={1}
        maxLength={40}
        onChangeText={(senha) => onChangePassword(senha)}
        placeholder="Senha"
        value={senha}
      />
      <TouchableOpacity style={styles.loginButton} onPress={logar}>
        <Text style={textStyles.paragrafoNeg}>Logar</Text>
      </TouchableOpacity>
      <Text style={styles.registerButton} onPress={goToRegister}>
        Cadastrar
      </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  logoImage: {
    width: 200,
    height: 180,
    borderRadius: 100,
    alignSelf: "center",
    marginTop: 50,
  },
  titulo: {
    marginHorizontal: 10,
    color: "#FFFFFF",
    fontSize: 25,
    fontWeight: "bold",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 15,
  },
  container: {
    flex: 1,
    backgroundColor: "#0047AB",
    padding: 20,
  },
  loginButton: {
    backgroundColor: "#6a99f7",
    marginHorizontal: 50,
    padding: 20,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 25,
  },
  text: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 15,
    marginTop: 15,
    marginLeft: 30,
  },
  textInput: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    height: 50,
    padding: 10,
    borderRadius: 10,
    marginTop: 15,
  },
  registerButton: {
    color: "white",
    backgroundColor: "#A9A9A9",
    marginHorizontal: 80,
    borderRadius: 5,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
    textAlign: "center",
    fontSize: 15,
  },
});

export default LoginScreen;
