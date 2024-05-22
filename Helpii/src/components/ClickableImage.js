import React, { useState, useEffect } from "react";
import { View, Image, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";

const ClickableImage = ({ imageUri, onChangeImage }) => {
  const [image, setImage] = useState(imageUri);

  useEffect(() => {
    setImage(imageUri);
  }, [imageUri]);

  const handleImagePicker = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      aspect: [4, 4],
      allowsEditing: true,
      base64: true,
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
      onChangeImage(result.assets[0].uri);
    }
  };

  return (
    <TouchableOpacity onPress={handleImagePicker}>
      <View>
        <Image
          source={{ uri: image }}
          style={{
            width: 150,
            height: 150,
            marginRight: 10,
          }}
        />
      </View>
    </TouchableOpacity>
  );
};

export default ClickableImage;
