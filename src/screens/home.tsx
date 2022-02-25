import React, {useEffect, useState} from 'react';
import {RefreshControl, StyleSheet, View, Text, FlatList} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import SearchBar from '../components/SearchBar';
import NoteContainer from '../components/NoteContainer';
import PlusButton from '../components/PlusButton';
import Database from '../services/database';
import Colors from '../global/colors';

import type {Note} from '../types';

const createNotesTable = () => {
  const x = Database.db.transaction(tx => {
    tx.executeSql('select * from notes', null, (tx, result) => {
      console.log('create table success', result);
    });
  });
  console.log('x', x);
  Database.createTable(
    'notes',
    `id INTEGER PRIMARY KEY NOT NULL,
    title VARCHAR(255), content TEXT,
    color VARCHAR(20),
    isPinned BOOLEAN,
    isArchived BOOLEAN,
    created_at DATETIME,
    updated_at DATETIME`,
  ).then(res => {
    console.log('create notes table');
  });
};
const getNotes = async setNotes => {
  Database.get('notes').then(data => {
    console.log(data);
    if (data !== null && Array.isArray(data)) {
      let notes = data.filter(note => note !== undefined);
      setNotes(notes);
      console.log('getNotes', notes);
    }
  });
};

const Home = ({navigation}) => {
  const [notes, setNotes] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {
    createNotesTable();
    getNotes(setNotes);
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getNotes(setNotes);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
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
          <RefreshControl refreshing={refreshing} onRefresh={() => onRefresh} />
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

      <PlusButton navigation={navigation} />
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
