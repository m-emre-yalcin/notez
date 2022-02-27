import React, {useEffect, useState, useCallback} from 'react';
import {RefreshControl, StyleSheet, View, Text, FlatList} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import SearchBar from '../components/SearchBar';
import NoteContainer from '../components/NoteContainer';
import PlusButton from '../components/PlusButton';
import Colors from '../global/colors';
import firebaseApp from '../services/firebase';
import {
  getFirestore,
  collection,
  query,
  where,
  startAt,
  limit,
  onSnapshot,
  getDocs,
  setDoc,
  doc,
} from 'firebase/firestore';

import type {Note} from '../types';

// Firestore database
const db = getFirestore(firebaseApp);

const Home = ({navigation}) => {
  const [notes, setNotes] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const getNotes = async () => {
    const q = collection(db, '/notes');
    const unsub = onSnapshot(q, doc => {
      const data = [...notes];
      doc.forEach(doc => {
        data.unshift(doc.data());
        setNotes(data);
      });
    });
  };
  const addNote = async () => {
    const note = {
      id: Date.now(),
      title: '',
      content: '',
      color: '#fff',
      created_at: Date.now(),
      updated_at: Date.now(),
      isArchived: false,
      isPinned: false,
      isTrashed: false,
    } as Note;
    const q = doc(db, `/notes/${note.id}`);
    await setDoc(q, note).then(() => {
      setNotes([note, ...notes]);
      console.log('note added');
    });
    return note;
  };
  useEffect(() => {
    getNotes();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getNotes().then(() => {
      setRefreshing(false);
    });
  }, []);

  return (
    <SafeAreaView>
      <FlatList
        style={style.noteList}
        ListHeaderComponent={<SearchBar />}
        ListEmptyComponent={
          <View>
            <Text style={{color: Colors.tertiary, padding: 10}}>
              Add some notes...
            </Text>
          </View>
        }
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListFooterComponent={
          <View
            style={{
              height: 5,
            }}
          />
        }
        data={notes}
        renderItem={({item}) => (
          <NoteContainer
            item={item}
            onPress={() =>
              navigation.push('Note', {id: item.id, title: item.title})
            }
          />
        )}
        keyExtractor={(item: Note) => item.id}
      />

      <PlusButton onPress={() => addNote()} navigation={navigation} />
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  noteList: {
    backgroundColor: Colors.secondary,
    height: '100%',
  },
});

export default Home;
