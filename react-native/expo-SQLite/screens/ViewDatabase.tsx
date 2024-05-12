import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Platform,
  SafeAreaView,
  View,
  Text,
  ScrollView
} from "react-native";

import * as FileSystem from "expo-file-system";
import * as SQLite from "expo-sqlite/legacy";

import { Asset } from "expo-asset";

let db;

async function openDatabase(
  pathToDatabaseFile: string
): Promise<SQLite.SQLiteDatabase> {
  if (
    !(await FileSystem.getInfoAsync(FileSystem.documentDirectory + "SQLite"))
      .exists
  ) {
    await FileSystem.makeDirectoryAsync(
      FileSystem.documentDirectory + "SQLite"
    );
  }
  const asset = await Asset.fromModule(
    require("../database.db")
  ).downloadAsync();
  await FileSystem.copyAsync({
    from: asset.localUri,
    to: FileSystem.documentDirectory + "SQLite/database.db",
  });
  return SQLite.openDatabase("../database.db");
}

export default function ViewDatabase() {
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      db = await openDatabase("../database.db");
      db.transaction(tx => {
        tx.executeSql(
          "SELECT * FROM ma_table;",
          [],
          (_, { rows: { _array } }) => setData(_array),
          (_, error) => console.log('Erreur lors de la récupération des données : ', error)
        );
      });
    })();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.viewContainer}>
        {data.map((item, index) => (
          <View key={index} style={styles.item}>
            <Text style={styles.text}>Nom : {item.nom}</Text>
            <Text style={styles.text}>Prénom : {item.prenom}</Text>
            <Text style={styles.text}>Email : {item.email}</Text>
            <Text style={styles.text}>Téléphone : {item.telephone}</Text>
          </View>
        ))}
      </ScrollView>
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
    flexGrow: 1,
    width: "80%",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
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
  item: {
    marginBottom: 15,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    backgroundColor: "#F8F8F8",
  },
  text: {
    fontSize: 16,
    color: "#333",
  },
});

