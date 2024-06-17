import { StyleSheet, View, SafeAreaView, PROVIDER_GOOGLE } from "react-native";
import { useState, useEffect, useRef } from "react";
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
  watchPositionAsync,
  LocationAccuracy,
} from "expo-location";
import MapView, { Marker } from "react-native-maps";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function MapsScreen() {
  const [location, setLocation] = useState(null);
  const [marker, setMarker] = useState([]);

  const mapRef = useRef(null);

  async function requestLocationPermsission() {
    const { granted } = await requestForegroundPermissionsAsync();

    if (granted) {
      const currentPosition = await getCurrentPositionAsync();
      setLocation(currentPosition);
      console.log("LOC ATUAL => ", currentPosition);
    }
  }

  const handleNewMarker = (coordinate) => {
    setMarker([...marker, coordinate]);
  }
  console.log("MARKER => ", marker);

  useEffect(() => {
    requestLocationPermsission();
  }, []);

  useEffect(() => {
    watchPositionAsync(
      {
        accuracy: LocationAccuracy.Highest,
        timeInterval: 1000,
        distanceInterval: 1,
      },
      (response) => {
        console.log("LOC NOVA => ", response);
        setLocation(response);
      }
    );
  }, []);

  return (
    <SafeAreaProvider style={styles.safeArea}>
      <View style={styles.container}>
        {location && (
          <MapView
            ref={mapRef}
            style={styles.map}
            onPress={(e) => handleNewMarker(e.nativeEvent.coordinate)}
            showsUserLocation
            zoomEnabled
            provider={PROVIDER_GOOGLE}
            initialRegion={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
            }}
          >
            {marker.length > 0 && (
              marker.map((m) => {
                return(
                  <Marker
                    key={m.latitude}
                    coordinate={{
                      latitude: m.latitude,
                      longitude: m.longitude,
                    }}
                  />)
              })
            )}
          </MapView>
        )}
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  map: {
    flex: 1,
    width: "100%",
  },
  safeArea: {
    flex: 1,
    width: "100%",
  },
});
