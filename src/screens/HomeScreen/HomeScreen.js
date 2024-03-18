import React, { useState, useEffect } from "react";
import { View, FlatList, ActivityIndicator, TextInput } from "react-native";
import { fetchBooks } from "../../services/OpenLibraryAPI";
import BookListItem from "../../components/BookListItem";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import { useRating } from "../../context/ratingContext";
import { updateFavoriteStorage, updateRatingStorage } from "../../lib/helper";
import { styles } from "./HomeScreen.style";
import Loader from "../../components/loader";

const HomeScreen = ({ navigation }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const isFocused = useIsFocused();

  const { ratings } = useRating();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await fetchBooks();
        const favoriteBooks =
          JSON.parse(await AsyncStorage.getItem("favoriteBooks")) || [];
        const ratings =
          JSON.parse(await AsyncStorage.getItem("bookRatings")) || {};
        const updatedData = data.map((book) => ({
          ...book,
          isFavorite: favoriteBooks.some(
            (favoriteBook) => favoriteBook.key === book.key
          ),
          rating: ratings[book.key] || 0,
        }));
        setBooks(updatedData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching books:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [isFocused]);

  const toggleFavorite = async (book) => {
    const updatedBooks = books.map((item) => {
      if (item.key === book.key) {
        const updatedBook = { ...item, isFavorite: !item.isFavorite };
        updateFavoriteStorage(updatedBook);
        return updatedBook;
      }
      return item;
    });

    setBooks(updatedBooks);

    // New: Update rating in AsyncStorage
    updateRatingStorage(book.key, book.rating);
  };

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search books by title"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      {loading ? (
        <Loader/>
      ) : (
        <FlatList
          data={filteredBooks}
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

export default HomeScreen;
