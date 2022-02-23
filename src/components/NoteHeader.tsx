import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import Colors from '../global/colors';

const NoteHeader = ({route, navigation}) => {
  const [editable, setEditable] = useState(false);
  const [saveProcessing, setSaveProcessing] = useState(false);

  return (
    <View style={style.header}>
      <Pressable
        style={style.button}
        onPress={() => navigation.goBack()}
        android_ripple={{
          color: Colors.primary,
          borderless: true,
        }}>
        <Ionicons name="chevron-back" size={24} color={Colors.primary} />
      </Pressable>
      <TextInput
        value={route.params.title}
        editable={true}
        placeholder={route.params.placeholder || 'Note'}
        placeholderTextColor={Colors.tertiary}
        style={style.title}
      />
      <Pressable
        style={style.button}
        onPress={() => alert('This is a button!')}
        android_ripple={{
          color: Colors.primary,
          borderless: true,
        }}>
        {saveProcessing ? (
          <ActivityIndicator color={Colors.primary} />
        ) : (
          <Ionicons
            name="ellipsis-horizontal"
            size={24}
            color={Colors.primary}
          />
        )}
      </Pressable>
    </View>
  );
};

const style = StyleSheet.create({
  header: {
    height: 50,
    backgroundColor: Colors.secondary,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: Colors.primarySoft,
  },
  title: {
    flex: 1,
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.primary,
    marginLeft: 5,
  },
  button: {
    fontSize: 20,
    width: 40,
    height: 40,
    textAlign: 'center',
    textAlignVertical: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default NoteHeader;
