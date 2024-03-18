// src/services/OpenLibraryAPI.js
const searchBooks = async (title) => {
    try {
      const response = await fetch(`https://openlibrary.org/search.json?title=${encodeURIComponent(title)}`);
      const data = await response.json();
      return data.docs;
    } catch (error) {
      throw new Error('Error searching books:', error);
    }
  };
  
  const fetchBooks = async () => {
    try {
      const response = await fetch('https://openlibrary.org/subjects/sci-fi.json?details=true');
      const data = await response.json();
      // Extract relevant book information from the response
      const books = data.works.map(work => ({
        key: work.key,
        title: work.title,
        authors: work.authors ? work.authors.map(author => author.name) : ['Unknown'],
        coverUrl: work.cover_id ? `https://covers.openlibrary.org/b/id/${work.cover_id}-L.jpg` : null,
        genre: work.subjects ? work.subjects.join(', ') : 'N/A',
        publicationYear: work.first_publish_year ? work.first_publish_year : 'N/A',
        description: work.description ? work.description.value : 'N/A',
      }));
      return books;
    } catch (error) {
      throw new Error('Error fetching books:', error);
    }
  };
  
  export { searchBooks, fetchBooks };
  