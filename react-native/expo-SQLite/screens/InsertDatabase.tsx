import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Platform,
  SafeAreaView,
  TextInput,
  View,
} from "react-native";
import Button from "../components/Button";

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

export default function InsertDatabase() {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");

  useEffect(() => {
    (async () => {
      db = await openDatabase("../database.db");
      db.transaction(tx => {
        tx.executeSql(
          "CREATE TABLE IF NOT EXISTS ma_table (id INTEGER PRIMARY KEY AUTOINCREMENT, nom TEXT, prenom TEXT, email TEXT, telephone TEXT);",
          [],
          () => console.log('Table créée avec succès'),
          (_, error) => console.log('Erreur lors de la création de la table : ', error)
        );
      });
    })();
  }, []);
  

  const handleSubmit = () => {
    db.transaction(tx => {
      tx.executeSql(
        "INSERT INTO ma_table (nom, prenom, email, telephone) values (?, ?, ?, ?)",
        [nom, prenom, email, telephone],
        (_, resultSet) => console.log('ID de la ligne insérée : ', resultSet.insertId),
        (_, error) => console.log('Erreur d\'insertion : ', error)
      );
    });
  };
  

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nom"
          value={nom}
          onChangeText={setNom}
        />
        <TextInput
          style={styles.input}
          placeholder="Prénom"
          value={prenom}
          onChangeText={setPrenom}
        />
        <TextInput
          style={styles.input}
          placeholder="Adresse e-mail"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Numéro de téléphone"
          value={telephone}
          onChangeText={setTelephone}
          keyboardType="phone-pad"
        />
        <Button title="Soumettre" onPress={handleSubmit} />
      </View>
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
    height: "auto",
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
  input: {
    width: "100%",
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
  },
});
