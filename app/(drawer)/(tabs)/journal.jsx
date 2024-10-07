import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function JournalApp() {
  const [journalEntries, setJournalEntries] = useState([]);
  const [newEntry, setNewEntry] = useState('');

  // Load saved journal entries on component mount
  useEffect(() => {
    loadJournalEntries();
  }, []);

  // Save journal entry
  const saveJournalEntry = async () => {
    if (newEntry.trim()) {
      const updatedEntries = [...journalEntries, { id: Date.now(), text: newEntry }];
      setJournalEntries(updatedEntries);
      setNewEntry('');
      await AsyncStorage.setItem('journalEntries', JSON.stringify(updatedEntries));
    }
  };

  // Load journal entries from AsyncStorage
  const loadJournalEntries = async () => {
    const storedEntries = await AsyncStorage.getItem('journalEntries');
    if (storedEntries) {
      setJournalEntries(JSON.parse(storedEntries));
    }
  };

  // Delete a journal entry
  const deleteJournalEntry = async (id) => {
    const updatedEntries = journalEntries.filter((entry) => entry.id !== id);
    setJournalEntries(updatedEntries);
    await AsyncStorage.setItem('journalEntries', JSON.stringify(updatedEntries));
  };

  const renderItem = ({ item }) => (
    <View style={styles.entryContainer}>
      <Text style={styles.entryText}>{item.text}</Text>
      <TouchableOpacity onPress={() => deleteJournalEntry(item.id)} style={styles.deleteButton}>
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>My Journal</Text>

      <TextInput
        style={styles.input}
        placeholder="Write a new journal entry..."
        value={newEntry}
        onChangeText={setNewEntry}
        multiline
      />

      <Button title="Save Entry" onPress={saveJournalEntry} />

      <FlatList
        data={journalEntries}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        style={styles.entryList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    height: 100,
    textAlignVertical: 'top',
  },
  entryList: {
    marginTop: 20,
  },
  entryContainer: {
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  entryText: {
    fontSize: 16,
  },
  deleteButton: {
    marginTop: 10,
    backgroundColor: 'red',
    padding: 5,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
});
