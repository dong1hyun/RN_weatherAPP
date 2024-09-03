import { useEffect, useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import * as Location from "expo-location"

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const API_KEY = "d905564287c242dce26f0ffcfebf519e";

export default function App() {
  const [city, setCity] = useState("Loading...");
  const [days, setDays] = useState([]);
  const [ok, setOk] = useState(true);
  const getWeather = async () => {
    const { granted } = await Location.requestForegroundPermissionsAsync();
    if (!granted) setOk(false);
    const { coords: { latitude, longitude } } = await Location.getCurrentPositionAsync({ accuracy: 5 });
    const location = await Location.reverseGeocodeAsync(
      { latitude, longitude },
      { useGoogleMaps: false }
    );
    setCity(location[0].region);
    // const response = fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`);
    // const json = await response.json();
    // console.log(json)
    // setDays()
  }
  useEffect(() => {
    const ExWeather = [
      {temp: 27, weather: 'sunny'},
      {temp: 25, weather: 'rain'},
      {temp: 28, weather: 'sunny'},
      {temp: 26, weather: 'clouds'},
      {temp: 27, weather: 'sunny'}
    ]
    getWeather();
    setDays(ExWeather)
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}>{city}</Text>
      </View>
      <ScrollView
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.weather}
      >
        {days.length === 0 ? (
          <View style={styles.day}>
            <ActivityIndicator 
            color="white"
            size="large"
            />
          </View>
          )
          :
          (
            days.map((day, index) => 
              <View key={index} style={styles.day}>
                <Text style={styles.temp}>{day.temp}</Text>
                <Text style={styles.description}>{day.weather}</Text>
              </View>
            )
          )
        }
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, backgroundColor: 'tomato'
  },
  city: {
    flex: 1.2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  cityName: {
    fontSize: 60,
    fontWeight: '500'
  },
  weather: {
  },
  day: {
    // flex: 1,
    width: SCREEN_WIDTH,
    alignItems: 'center',
  },
  temp: {
    marginTop: 50,
    fontSize: 178,
  },
  description: {
    fontSize: 60,
  }
})