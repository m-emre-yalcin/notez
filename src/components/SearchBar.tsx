import {useState} from 'react';
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
  const [focused, setFocused] = useState(false);
  return (
    <View style={style.searchBar}>
      <TextInput
        style={[style.input, focused && style.inputFocus]}
        clearTextOnFocus={false}
        keyboardAppearance={useColorScheme()}
        maxLength={50}
        placeholder="Search"
        placeholderTextColor={Colors.tertiary}
        autoCapitalize="none"
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
      <Pressable
        style={style.searchBarIcon}
        android_ripple={{
          color: Colors.primary,
          borderless: true,
        }}>
        <Ionicons name="search-outline" size={24} color={Colors.primary} />
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
    fontSize: 18,
    borderWidth: 1,
    borderRadius: 4,
    color: Colors.primary,
    borderColor: Colors.primarySoft,
    shadowColor: Colors.primary,
    position: 'relative',
    opacity: 0.7,
    elevation: 1,
  },
  inputFocus: {
    elevation: 20,
    opacity: 1,
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
  },
});

export default SearchBar;
