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
import {debounce} from 'lodash';
import {AppContext, Note} from '../components/context';
import SearchBar from '../components/SearchBar';
import NoteContainer from '../components/NoteContainer';
import PlusButton from '../components/PlusButton';
import Colors from '../global/colors';

const Home = ({navigation}) => {
  const ctx = useContext(AppContext);
  const {state, dispatch, actions} = ctx;
  const [refreshing, setRefreshing] = useState(false);
  const flatListRef = useRef(null);

  useEffect(() => {
    actions.getNotes(ctx);
  }, []);

  const handleSearchNotes = useCallback(
    debounce(text => {
      actions.searchNotes(ctx, text);
    }, 500),
    [],
  );
  const onRefresh = useCallback(() => {
    // reset get states
    dispatch({type: 'RESET'});

    // fetch notes
    setRefreshing(true);
    actions.getNotes(ctx);
    setRefreshing(false);
  }, []);

  return (
    <SafeAreaView>
      <FlatList
        ref={flatListRef}
        style={style.noteList}
        ListHeaderComponent={<SearchBar onChangeText={handleSearchNotes} />}
        ListEmptyComponent={
          state.notes.length === 0 &&
          !state.loading && (
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
              height: state.loading ? 50 : 5,
              display: 'flex',
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {state.loading && (
              <ActivityIndicator size="large" color={Colors.primary} />
            )}
          </View>
        }
        onEndReached={() => actions.getNotes(ctx)}
        data={state.notes}
        renderItem={({item}) => (
          <NoteContainer
            item={item}
            onPress={() => navigation.push('Note', item)}
          />
        )}
        keyExtractor={(item: Note) => item.id}
      />

      <PlusButton
        onPress={() => actions.addNote(ctx)}
        navigation={navigation}
      />
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
