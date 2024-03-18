import AsyncStorage from '@react-native-async-storage/async-storage';

export const updateFavoriteStorage = async (book) => {
  try {
    let favoriteBooks = JSON.parse(await AsyncStorage.getItem('favoriteBooks')) || [];
    const index = favoriteBooks.findIndex(item => item.key === book.key);
    if (index !== -1) {
      favoriteBooks.splice(index, 1); // Remove the book from favorites
    } else {
      favoriteBooks.push(book);
    }
    await AsyncStorage.setItem('favoriteBooks', JSON.stringify(favoriteBooks));
  } catch (error) {
    console.error('Error updating favorite books:', error);
  }
};

export const updateRatingStorage = async (bookKey, newRating) => {
  try {
    let ratings = JSON.parse(await AsyncStorage.getItem('bookRatings')) || {};
    ratings[bookKey] = newRating;
    await AsyncStorage.setItem('bookRatings', JSON.stringify(ratings));
  } catch (error) {
    console.error('Error updating book ratings:', error);
  }
};
