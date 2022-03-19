import {useContext, useEffect, useState, useCallback, useRef} from 'react';
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

import type {Note} from '../components/context/index.d';
import {AppContext} from '../components/context';

const Home = ({navigation}) => {
  const {state, dispatch} = useContext(AppContext);
  const flatList = useRef(null);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    state.getNotes();
  }, []);

  const onRefresh = useCallback(() => {
    // reset get states
    dispatch({type: 'RESET'});

    // fetch notes
    setRefreshing(true);
    state.getNotes();
    setRefreshing(false);
  }, []);

  return (
    <SafeAreaView>
      <FlatList
        ref={flatList}
        style={style.noteList}
        ListHeaderComponent={<SearchBar />}
        ListEmptyComponent={
          context.notes.length === 0 &&
          !context.loading && (
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
              height: context.loading ? 50 : 5,
              display: 'flex',
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {context.loading && (
              <ActivityIndicator size="large" color={Colors.primary} />
            )}
          </View>
        }
        onEndReached={() => context.getNotes()}
        data={context.notes}
        renderItem={({item}) => (
          <NoteContainer
            item={item}
            onPress={() => navigation.push('Note', item)}
          />
        )}
        keyExtractor={(item: Note) => item.id}
      />

      <PlusButton onPress={() => context.addNote()} navigation={navigation} />
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
