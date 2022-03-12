import React, {useEffect, useState, useCallback, useRef} from 'react';
import {
  RefreshControl,
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  FlatList,
} from 'react-native';
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
  startAfter,
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
  const [loading, setLoading] = useState(false);
  const [newStart, setNewStart] = useState<any>(); // starting point of the query
  const [isMax, setMax] = useState(false);
  const flatList = useRef(null);

  useEffect(() => {
    getNotes();
  }, []);

  const onRefresh = useCallback(() => {
    // reset get states
    setMax(false);
    setNewStart(false);
    setNotes([]);

    setRefreshing(true);
    getNotes().then(() => {
      setRefreshing(false);
    });
  }, []);

  const getNotes = async () => {
    const maxLimit = 8;

    if (!isMax) {
      setLoading(true);
      let q;

      if (newStart)
        q = query(
          collection(db, 'notes/'),
          where('isTrashed', '==', false),
          orderBy('created_at', 'desc'),
          limit(maxLimit),
          startAfter(newStart),
        );
      else
        q = query(
          collection(db, 'notes/'),
          where('isTrashed', '==', false),
          orderBy('created_at', 'desc'),
          limit(maxLimit),
        );
      const querySnapshot = await getDocs(q);

      const data = [...notes];
      querySnapshot.forEach(doc => {
        data.push(doc.data());
        setNewStart(doc);
      });
      setNotes(data);
      if (querySnapshot.docs.length < maxLimit) setMax(true);
      else setMax(false);

      console.log(querySnapshot.docs.length, 'notes fetched', 'ismax:', isMax);
      setLoading(false);
    } else console.log('max');
    return loading;
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
      user: null,
    } as Note;
    const q = doc(db, `/notes/${note.id}`);
    await setDoc(q, note).then(() => {
      console.log('note added:', note.id);
    });
    return note;
  };

  return (
    <SafeAreaView>
      <FlatList
        ref={flatList}
        style={style.noteList}
        ListHeaderComponent={<SearchBar />}
        ListEmptyComponent={
          notes.length === 0 &&
          !loading && (
            <View>
              <Text style={{color: Colors.tertiary, padding: 10}}>
                Add some notes...
              </Text>
            </View>
          )
        }
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListFooterComponent={
          <View
            style={{
              height: loading ? 50 : 5,
              display: 'flex',
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {loading && (
              <ActivityIndicator size="large" color={Colors.primary} />
            )}
          </View>
        }
        onEndReached={() => getNotes()}
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
