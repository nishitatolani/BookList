import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BookListItem from '../../components/BookListItem';
import { useIsFocused } from '@react-navigation/native';
import { useRating } from '../../context/ratingContext';
import { updateRatingStorage } from '../../lib/helper';
import { styles } from './FavoriteBooksScreen.style';
import Loader from '../../components/loader';

const FavoriteBooksScreen = ({ navigation }) => {
  const [favoriteBooks, setFavoriteBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const isFocused = useIsFocused();

  const { ratings } = useRating();

  useEffect(() => {
    const fetchFavoriteBooks = async () => {
      try {
        setLoading(true);
        const favoritesString = await AsyncStorage.getItem('favoriteBooks');
        if (favoritesString) {
          const favorites = JSON.parse(favoritesString);
          setFavoriteBooks(favorites);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching favorite books:', error);
        setLoading(false);
      }
    };

    fetchFavoriteBooks();
  }, [isFocused]);

  const toggleFavorite = async (book) => {
    const updatedFavorites = favoriteBooks.map(item => {
      if (item.key === book.key) {
        const updatedBook = { ...item, isFavorite: !item.isFavorite };
        return updatedBook;
      }
      return item;
    });

    setFavoriteBooks(updatedFavorites);

    // New: Update rating in AsyncStorage
    updateRatingStorage(book.key, book.rating);
  };

  return (
    <View style={styles.container}>
      {loading ? (
       <Loader/>
      ) : favoriteBooks.length === 0 ? (
        <Text>No favorite books found</Text>
      ) : (
        <FlatList
          data={favoriteBooks}
          renderItem={({ item }) => (
            <BookListItem 
              book={item} 
              onFavoritePress={() => toggleFavorite(item)} 
              rating={ratings[item.key]} // Pass the rating from the context
            />
          )}
          keyExtractor={(item) => item.key}
          contentContainerStyle={styles.contentContainer}
        />
      )}
    </View>
  );
};

export default FavoriteBooksScreen;
