import { useEffect, useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import * as Location from "expo-location"
import Fontisto from '@expo/vector-icons/Fontisto';

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const API_KEY = "d905564287c242dce26f0ffcfebf519e";

export default function App() {
  const [city, setCity] = useState("Loading...");
  const [days, setDays] = useState([]);
  const [ok, setOk] = useState(true);
  const icons = {
    Sunny: "sun",
    Clouds: 'cloudy',
    Rain: 'rain'
  }
  console.log(icons["clouds"])
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
      {temp: 27.3, weather: 'Sunny'},
      {temp: 25.8, weather: 'Rain'},
      {temp: 28.1, weather: 'Sunny'},
      {temp: 26.4, weather: 'Clouds'},
      {temp: 27.3, weather: 'Sunny'}
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
                <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between', width:'100%', }}>
                  <Text style={styles.temp}>{day.temp}</Text>
                  <Fontisto name={icons[day.weather]} size={100} color="white" />
                </View>
                <Text style={styles.description}>{day.weather}</Text>
                <Text style={styles.tinyText}>overcast{day.weather}</Text>
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
    alignItems: 'center',
  },
  cityName: {
    fontSize: 60,
    fontWeight: '500',
    color: 'white'
  },
  weather: {
  },
  day: {
    width: SCREEN_WIDTH,
    alignItems: 'flex-start',
    color: 'white',
    paddingHorizontal: 40
  },
  temp: {
    marginTop: 50,
    fontSize: 178,
    color: 'white'
  },
  description: {
    marginTop: -10,
    fontSize: 30,
    color: "white",
    fontWeight: "500",
  },
  tinyText: {
    marginTop: -5,
    fontSize: 25,
    color: "white",
    fontWeight: "500",
  },
})