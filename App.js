import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from './src/screens/MainScreen/MainScreen';
import HomeScreen from './src/screens/HomeScreen/HomeScreen';
import FavoriteBooksScreen from './src/screens/FavoriteBooksScreen/FavoriteBooksScreen';
import { RatingProvider } from './src/context/ratingContext';

const Stack = createStackNavigator();

const App = () => {
  return (
    <RatingProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen name="Main" component={MainScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Favorites" component={FavoriteBooksScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    </RatingProvider>
  );
};

export default App;
