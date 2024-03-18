import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    contentContainer: {
      flexGrow: 1,
    },
    searchInput: {
      paddingHorizontal: 15,
      paddingVertical: 10,
      backgroundColor: '#fff',
      borderRadius: 8,
      marginHorizontal: 20,
      marginTop: 20,
      marginBottom: 10,
      borderColor: 'black',
      borderWidth: 1
    },
    loaderContainer: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
      },
  });