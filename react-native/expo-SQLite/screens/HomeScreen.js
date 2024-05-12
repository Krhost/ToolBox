import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, SafeAreaView, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";

import Button from "../components/Button";

export default function HomeScreen() {
  const navigation = useNavigation();

  const dataCenter = () => {
    navigation.navigate("ViewDatabase");
  };

  const dataInput = () => {
    navigation.navigate("InsertDatabase");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewContainer}>
        <Button
          style={styles.button}
          onPress={dataCenter}
          title="View of Database"
        />
        <Button
          style={styles.button}
          onPress={dataInput}
          title="Insert in Database"
        />
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#F8F8F8",
    alignItems: "center",
    justifyContent: "center",
  },
  viewContainer: {
    height: "50%",
    width: "80%",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-around",
    padding: 20,
    borderRadius: 15,
    ...Platform.select({
      ios: {
        shadowColor: "rgba(0, 0, 0, 0.1)",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  button: {
    width: "100%",
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
  },
});
