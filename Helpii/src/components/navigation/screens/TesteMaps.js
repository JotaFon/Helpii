import { StyleSheet, View, SafeAreaView, } from "react-native";
import { useState, useEffect, useRef } from "react";
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
  LocationObject,
  watchPositionAsync,
  LocationAccuracy,
} from "expo-location";
import MapView, { MarkerAnimated } from "react-native-maps";

export default function TesteMaps() {
  const [location, setLocation] = useState(null);

  const mapRef = useRef(null);

  async function requestLocationPermsission() {
    const { granted } = await requestForegroundPermissionsAsync();

    if (granted) {
      const currentPosition = await getCurrentPositionAsync();
      setLocation(currentPosition);
      console.log("LOC ATUAL => ", currentPosition)
    }
  }

  useEffect(() => {
    requestLocationPermsission();
  }, [])

  useEffect(() => {
    watchPositionAsync({
      accuracy: LocationAccuracy.Highest,
      timeInterval: 1000,
      distanceInterval: 1,
    }, (response) => {
      console.log("LOC NOVA => ", response)
      setLocation(response);

      mapRef.current?.animateCamera({
        center: response.coords,
      })
    });
  }, [])

  return (
    <View style={styles.container}>
      {
        location &&
        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
          showsUserLocation
          locationEnabled
          zoomEnabled
        />
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  map: {
    flex: 1,
    width: "100%",
  },
})