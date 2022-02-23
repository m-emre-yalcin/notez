import React, {useEffect, useState} from 'react';
import {RefreshControl, StyleSheet, View, Text, FlatList} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import SearchBar from '../components/SearchBar';
import NoteContainer from '../components/NoteContainer';
import PlusButton from '../components/PlusButton';

import Colors from '../global/colors';
import storage from '../services/async-storage';

import type {Note} from '../types';

const getNotes = async setNotes => {
  const data = await storage.getItem('notes');

  if (data !== null) {
    setNotes(data);
  }
};

const Home = ({navigation}) => {
  const [notes, setNotes] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {
    getNotes(setNotes);
  }, [notes]);

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
