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
  orderBy,
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
  const ref = collection(db, '/notes');
  const q = query(ref, orderBy('created_at', 'desc'), limit(10));

  const getNotes = useEffect(() => {
    const unsub = onSnapshot(q, doc => {
      const data = [];
      doc.forEach(doc => {
        data.push(doc.data());
      });
      setNotes(data);
    });
    return () => {
      console.log('unsubscribe notes/stop listening the notes');
      unsub();
    };
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getNotes;
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

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
      console.log('note added');
    });
    return note;
  };

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
            onPress={() => navigation.push('Note', item)}
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
