import React, {useState} from 'react';
import {RefreshControl, StyleSheet, View, FlatList} from 'react-native';
import SearchBar from '../components/SearchBar';
import NoteContainer from '../components/NoteContainer';

import Colors from '../global/colors';

declare type note = {
  id: number;
  title: string;
  content: string;
};

const notes = [
  {
    id: 1,
    title: 'Note 1',
    content:
      'This is the first note. It is a long note. Yeah thats right. It is a long note... Test one two three.',
  },
  {
    id: 2,
    title: 'Note 2',
    content: 'This is the second note',
  },
  {
    id: 3,
    title: 'Note 3',
    content: 'This is the third note',
  },
  {
    id: 4,
    title: 'Note 4',
    content: 'This is the fourth note',
  },
  {
    id: 5,
    title: 'Note 5',
    content: 'This is the fifth note',
  },
  {
    id: 6,
    title: 'Note 6',
    content: 'This is the sixth note',
  },
  {
    id: 7,
    title: 'Note 7',
    content: 'This is the seventh note',
  },
  {
    id: 8,
    title: 'Note 8',
    content: 'This is the eighth note',
  },
  {
    id: 9,
    title: 'Note 9',
    content: 'This is the ninth note',
  },
] as note[];

const Home = ({navigation}) => {
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <View>
      <FlatList
        style={style.noteList}
        ListHeaderComponent={<SearchBar />}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        data={notes}
        renderItem={({item}) => (
          <NoteContainer
            item={item}
            onPress={() => navigation.push('Note', {...item})}
          />
        )}
        keyExtractor={(item: note) => item.id}
      />
    </View>
  );
};

const style = StyleSheet.create({
  noteList: {},
});

export default Home;
