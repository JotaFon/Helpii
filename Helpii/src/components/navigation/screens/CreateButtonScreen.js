import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { textStyles } from "../../Fonts";

export default function ButtonScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={textStyles.subtitulo} bottom={50}>
        Juntos podemos mudar vidas
      </Text>
      <Text style={textStyles.subtitulo} bottom={50}>
        Sua doação é o primeiro passo
      </Text>
      <Text style={textStyles.subtituloNeg} bottom={50}>
        Vamos começar!
      </Text>
      <Text></Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Image")}
    >
        <Text style={styles.buttonText}>Doar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0047AB",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "white",
    paddingVertical: 20,
    paddingHorizontal: 60,
    borderRadius: 5,
  },
  buttonText: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
  },
});
