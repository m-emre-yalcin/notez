import {StyleSheet, View, TextInput, useColorScheme} from 'react-native';

import {Ionicons} from '@expo/vector-icons';
import Colors from '../global/colors';

const SearchBar = () => {
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
      <Ionicons name="search-outline" style={style.SearchBarIcon} />
    </View>
  );
};

const style = StyleSheet.create({
  SearchBar: {
    margin: 10,
    padding: 5,
    paddingRight: 40,
    paddingLeft: 10,
    fontSize: 20,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: Colors.primary,
    position: 'relative',
  },
  SearchBarIcon: {
    position: 'absolute',
    zIndex: 1,
    top: 15,
    right: 15,
    fontSize: 20,
    width: 30,
    height: 30,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: Colors.primary,
  },
});

export default SearchBar;
