import React, {useState} from 'react';
import type {Node} from 'react';
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
  useColorScheme,
} from 'react-native';

import Colors from '../global/colors';

import SearchIcon from '../../assets/icons/search.svg';

const SearchBar = (): Node => {
  return (
    <View
      style={{
        flex: 1,
      }}>
      <TextInput
        style={style.SearchBar}
        clearTextOnFocus={false}
        keyboardAppearance={useColorScheme()}
        maxLength={50}
        placeholder="Search"
        placeholderTextColor={Colors.tertiary}
      />
      <SearchIcon />
    </View>
  );
};

const Home = ({navigation}): Node => {
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <SearchBar></SearchBar>
    </ScrollView>
  );
};

const style = StyleSheet.create({
  SearchBar: {
    borderWidth: 1,
    margin: 10,
    padding: 5,
    fontSize: 20,
    borderRadius: 4,
    position: 'relative',
  },
  SearchBarIcon: {
    width: 20,
    height: 20,
    position: 'absolute',
    zIndex: 1,
    right: 10,
  },
});

export default Home;
