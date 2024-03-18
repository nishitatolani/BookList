import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useRating } from '../context/ratingContext';

const BookListItem = ({ book, onFavoritePress, rating }) => {
  const { updateRating } = useRating();

  const handleStarPress = (selectedRating) => {
    // Toggle the rating between 0 and the selected rating
    updateRating(book.key, selectedRating);
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      const starIcon = rating >= i ? require('../assets/filled_star.png') : require('../assets/star.png');
      stars.push(
        <TouchableOpacity key={i} onPress={() => handleStarPress(i)}>
          <Image source={starIcon} style={styles.starIcon} />
        </TouchableOpacity>
      );
    }
    return stars;
  };

  return (
    <TouchableOpacity style={styles.container}>
      <Image source={{ uri: book.coverUrl }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{book.title}</Text>
        <Text style={styles.author}>{book.author || 'Unknown'}</Text>
        <Text style={styles.author}>{book.publicationYear || 'Unknown'}</Text>
        <View style={styles.ratingContainer}>
          {renderStars()}
        </View>
      </View>
      <TouchableOpacity onPress={onFavoritePress}>
        <Image 
          source={book.isFavorite ? require('../assets/favorite.png') : require('../assets/not_favorite.png')} 
          style={styles.favoriteIcon} 
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  image: {
    width: 50,
    height: 70,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  author: {
    fontSize: 14,
    color: '#555',
  },
  ratingContainer: {
    flexDirection: 'row',
    marginTop: 5,
  },
  starIcon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  favoriteIcon: {
    width: 32,
    height: 32,
  },
});

export default BookListItem;
