import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { loginName } from "../TabNavigator";
import { textStyles } from "../../Fonts";
import { obterUrlBase } from "../../autenticacao/AuthContext";

const Stack = createStackNavigator(); 

const RegisterScreen = ({ navigation }) => {
  const [nome, onChangeName] = useState("");
  const [telefone, onChangeCellphone] = useState("");
  const [email, onChangeEmail] = useState("");
  const [senha, onChangePassword] = useState("");
  const [confirmaSenha, onChangeConfirmPassword] = useState("");
  const [file, setFile] = useState("https://static.vecteezy.com/system/resources/thumbnails/005/545/335/small/user-sign-icon-person-symbol-human-avatar-isolated-on-white-backogrund-vector.jpg");

  const cadastrarUsuario = async () => {
    try {
      if (senha !== confirmaSenha) {
        console.error("As senhas não coincidem.");
        return;
      }

      const userData = {
        nome,
        email,
        senha,
        telefone,
        file,
      };

      console.log(userData);

      const url = `${obterUrlBase()}/api/user`
      const response = await fetch(url,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );

      if (response.ok) {
        console.log("Usuário cadastrado com sucesso!");
        navigation.navigate(loginName);
      } else {
        console.error("Falha ao cadastrar usuário. Status:", response.status);
      }
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
    <ScrollView>
      <Image
        source={require("../../../../assets/helpii_logo.png")}
        style={styles.logoImage}
      />
      <Text style={styles.titulo}>Cadastro</Text>
      <Text style={styles.text}>Nome</Text>
      <TextInput
        style={styles.textInput}
        editable
        multiline
        numberOfLines={1}
        maxLength={40}
        onChangeText={(nome) => onChangeName(nome)}
        placeholder="Nome"
        value={nome}
      />
      {!nome && (
        <Text style={{ color: "red" }}>O campo nome é obrigatório.</Text>
      )}
      <Text style={styles.text}>Telefone</Text>
      <TextInput
        style={styles.textInput}
        editable
        multiline
        inputMode="tel"
        numberOfLines={1}
        maxLength={40}
        onChangeText={(telefone) => onChangeCellphone(telefone)}
        placeholder="Telefone"
        value={telefone}
      />
      {!telefone && (
        <Text style={{ color: "red" }}>O telefone é obrigatório.</Text>
      )}
      <Text style={styles.text}>Email</Text>
      <TextInput
        style={styles.textInput}
        editable
        multiline
        inputMode="email"
        numberOfLines={1}
        maxLength={40}
        onChangeText={(email) => onChangeEmail(email)}
        placeholder="Email"
        require
        value={email}
      />
      {!email && (
        <Text style={{ color: "red" }}>O campo email é obrigatório.</Text>
      )}
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
      {!senha && (
        <Text style={{ color: "red" }}>O campo senha é obrigatório.</Text>
      )}
      <Text style={styles.text}>Confirmar senha</Text>
      <TextInput
        style={styles.textInput}
        editable
        multiline
        numberOfLines={1}
        maxLength={40}
        onChangeText={(confirmaSenha) => onChangeConfirmPassword(confirmaSenha)}
        placeholder="Confirmar senha"
        value={confirmaSenha}
      />
      {!confirmaSenha && (
        <Text style={{ color: "red" }}>
          O campo confirmar senha é obrigatório.
        </Text>
      )}
      <TouchableOpacity
  style={styles.registerButton}
  onPress={cadastrarUsuario}
>
  <Text style={styles.buttonText}>Cadastrar</Text>
</TouchableOpacity>
</ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0047AB",
    padding: 20,
  },
  logoImage: {
    width: 150,
    height: 150,
    borderRadius: 100,
    alignSelf: "center",
    marginTop: 15,
  },
  titulo: {
    color: "#FFFFFF",
    fontSize: 25,
    fontWeight: "bold",
  },
  text: {
    color: "#FFFFFF",
    fontSize: 15,
    marginTop: 15,
    marginLeft: 5,
  },
  textInput: {
    backgroundColor: "#FFFFFF",
    height: 50,
    padding: 10,
    borderRadius: 10,
    marginTop: 15,
    fontSize: 15,
  },
  registerButton: {
    backgroundColor: "#89CFF0",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 25,
  },
  buttonText: {
    color: "#FFFFFF",
  },
});

export default RegisterScreen;