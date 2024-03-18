// MainScreen.js
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './MainScreen.style';

const MainScreen = ({ navigation }) => {
  const navigateToHome = () => {
    navigation.navigate('Home');
  };

  const navigateToFavorite = () => {
    navigation.navigate('Favorites');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.card} onPress={navigateToHome}>
        <Text style={styles.cardText}>Go to Home Screen</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.card} onPress={navigateToFavorite}>
        <Text style={styles.cardText}>Go to Favorite Screen</Text>
      </TouchableOpacity>
    </View>
  );
};



export default MainScreen;
