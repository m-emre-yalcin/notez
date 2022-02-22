import {
  StyleSheet,
  View,
  TextInput,
  Pressable,
  useColorScheme,
} from 'react-native';

import {Ionicons} from '@expo/vector-icons';
import Colors from '../global/colors';

const SearchBar = () => {
  return (
    <View style={style.searchBar}>
      <TextInput
        style={style.input}
        clearTextOnFocus={false}
        keyboardAppearance={useColorScheme()}
        maxLength={50}
        placeholder="Search"
        placeholderTextColor={Colors.tertiary}
        autoCapitalize="none"
      />
      <Pressable
        style={style.searchBarIcon}
        android_ripple={{
          color: Colors.primary,
          borderless: true,
        }}>
        <Ionicons name="search-outline" size={24} />
      </Pressable>
    </View>
  );
};

const style = StyleSheet.create({
  searchBar: {
    flex: 1,
  },
  input: {
    margin: 10,
    padding: 5,
    height: 45,
    paddingRight: 40,
    paddingLeft: 10,
    fontSize: 20,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: Colors.primarySoft,
    position: 'relative',
  },
  searchBarIcon: {
    position: 'absolute',
    zIndex: 1,
    top: 20,
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
