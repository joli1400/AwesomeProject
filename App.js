import * as React from 'react';
import { useState, useEffect } from 'react';
import { Platform, StyleSheet, Text, View, Dimensions } from 'react-native';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

function SettingsScreen() {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }

        let location = await Location.watchPositionAsync({ accuracy: Location.Accuracy.Lowest,  distanceInterval: 2000 }, loc => setLocation(JSON.parse(JSON.stringify(loc.coords))));;
        setLocation(location);
      })();
    }, []);

    let text = 'Waiting..';
    let pos_lat = "test";
    let pos_lon = "test";
    if (errorMsg) {
      text = errorMsg;
    } else if (location) {
      text = JSON.stringify(location);
      pos_lat = location.latitude;
      pos_lon = location.longitude;
    }
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>{pos_lat}!</Text>
    </View>
  );
}

function MapScreen() {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }

        let location = await Location.watchPositionAsync({ accuracy: Location.Accuracy.Lowest,  distanceInterval: 2000 }, loc => setLocation(JSON.parse(JSON.stringify(loc.coords))));;
        setLocation(location);
      })();
    }, []);

    let text = 'Waiting..';
    let pos_lat = 0;
    let pos_lon = 0;
    if (errorMsg) {
      text = errorMsg;
    } else if (location) {
      text = JSON.stringify(location);
      pos_lat = location.latitude;
      pos_lon = location.longitude;
    }
  return (
      <View style={styles.container}>
        <MapView
            style={styles.map}
            initialRegion={{
              latitude: 62.390716,
              longitude: 17.307545,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
        >
            <Marker
              coordinate={{ latitude : 62.3907296, longitude : 17.3098381 }}
            />
            <Marker
              coordinate={{ latitude : pos_lat, longitude : pos_lon }}
            />
        </MapView>
      </View>
  );
}

function ProfileScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Profile!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Settings') {
              iconName = focused
                ? 'ios-information-circle'
                : 'ios-information-circle-outline';
            } else if (route.name === 'Map') {
              iconName = focused ? 'globe' : 'globe';
              size = 40
            } else if (route.name === 'Profile') {
              iconName = focused ? 'person' : 'person';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#3A5743',
          tabBarInactiveTintColor: '#AABA9E',
          tabBarShowLabel: false,
          //headerstuff
          headerShown: route.name === 'Map' ? false : true,
          headerTitleAlign: 'center',
          headerTintColor: '#3A5743',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        })}
      >
        <Tab.Screen name="Settings" component={SettingsScreen} />
        <Tab.Screen name="Map" component={MapScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
