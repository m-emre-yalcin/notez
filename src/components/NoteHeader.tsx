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

const NoteHeader = ({navigation, title, isSaving, onChangeText, onChange}) => {
  return (
    <View style={style.header}>
      <Pressable
        style={style.button}
        onPress={() => {
          if (!isSaving) {
            navigation.goBack();
          } else {
            const interval = setInterval(() => {
              if (!isSaving) {
                clearInterval(interval);
                navigation.goBack();
              }
            }, 100);
          }
        }}
        android_ripple={{
          color: Colors.primary,
          borderless: true,
        }}>
        <Ionicons name="chevron-back" size={24} color={Colors.primary} />
      </Pressable>
      <TextInput
        value={title}
        editable={true}
        placeholder="Note Title"
        placeholderTextColor={Colors.tertiary}
        style={style.title}
        onChangeText={onChangeText}
        onChange={onChange}
      />
      <Pressable
        style={style.button}
        onPress={() => alert('This is a button!')}
        android_ripple={{
          color: Colors.primary,
          borderless: true,
        }}>
        {isSaving ? (
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
