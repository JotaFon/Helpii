import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ClickableImage from "../../ClickableImage.js";
import { textStyles } from "../../Fonts.js";

export default function ImageScreen({ navigation }) {
  const [image1, setImage1] = useState("https://i.postimg.cc/ZRDBd4z2/Upload.png");
  const [image2, setImage2] = useState("https://i.postimg.cc/ZRDBd4z2/Upload.png");
  const [image3, setImage3] = useState("https://i.postimg.cc/ZRDBd4z2/Upload.png");
  const [image4, setImage4] = useState("https://i.postimg.cc/ZRDBd4z2/Upload.png");

  const handleImageChange = (index, uri) => {
    switch (index) {
      case 1:
        setImage1(uri);
        break;
      case 2:
        setImage2(uri);
        break;
      case 3:
        setImage3(uri);
        break;
      case 4:
        setImage4(uri);
        break;
      default:
        break;
    }
  };

  const VoltaButton = () => {
    navigation.navigate("Create");
  };

  const isButtonDisabled = [image1].includes("https://i.postimg.cc/ZRDBd4z2/Upload.png");

  return (
    <View style={styles.view}>
      <TouchableOpacity style={styles.voltaButtonContainer} onPress={VoltaButton}>
        <Text style={styles.BotaoVoltar}>{`ᐊ`}</Text>
      </TouchableOpacity>
      <View style={styles.container}>
        <GestureHandlerRootView>
          <View style={styles.imageContainer}>
            <Text></Text>
            <Text style={textStyles.subtituloNeg} bottom={30}>Escolha uma foto do seu produto.</Text>
            <Text style={textStyles.subtituloNeg} bottom={20}>Clique sobre os quadrados</Text>
            <Text></Text>
            <View style={styles.grid}>
              <ClickableImage
                imageUri={image1}
                onChangeImage={(uri) => handleImageChange(1, uri)}
              />
              <ClickableImage
                imageUri={image2}
                onChangeImage={(uri) => handleImageChange(2, uri)}
              />
            </View>
            <View style={styles.grid}>
              <ClickableImage
                imageUri={image3}
                onChangeImage={(uri) => handleImageChange(3, uri)}
              />
              <ClickableImage
                imageUri={image4}
                onChangeImage={(uri) => handleImageChange(4, uri)}
              />
            </View>
            <TouchableOpacity
              style={styles.button}
              disabled={isButtonDisabled}
              onPress={() => navigation.navigate("Desc")}
            >
              <Text style={styles.buttonText}>Proximo</Text>
            </TouchableOpacity>
          </View>
        </GestureHandlerRootView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    backgroundColor: "#0047AB",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    marginTop: 120,
    alignItems: "center",
  },
  voltaButtonContainer: {
    position: "absolute",
    top: 50,
    left: 20,
  },
  imageContainer: {
    shadowColor: "#000",
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    flexDirection: "column",
    alignItems: "center",
  },
  grid: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    width: "80%",
  },
  button: {
    marginTop: 20,
    backgroundColor: 'white',
    paddingVertical: 20,
    paddingHorizontal: 60,
    borderRadius: 5,
  },
  buttonText: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
  BotaoVoltar: {
    marginLeft: 10,
    marginTop: 5,
    color: "white",
    fontSize: 30,
  },
});
