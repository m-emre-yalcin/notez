import React from 'react';
import {View, Pressable, StyleSheet, Vibration} from 'react-native';
import storage from '../services/async-storage';
import {Ionicons} from '@expo/vector-icons';

import Colors from '../global/colors';

import type {Note} from '../types';

const PlusButton = ({navigation}) => {
  return (
    <View style={style.plusButton}>
      <Pressable
        onPress={() => {
          const noteId = createNewNote();
          Vibration.vibrate(50);
          navigation.navigate('Note', {
            placeholder: 'Create note',
            id: noteId,
          });
        }}
        android_ripple={{
          borderless: true,
          color: Colors.secondary,
        }}>
        <Ionicons name="ios-add" size={36} color={Colors.secondary} />
      </Pressable>
    </View>
  );
};

const createNewNote = async () => {
  let notes = (await storage.getItem('notes')) as Note[];
  if (!Array.isArray(notes)) {
    notes = [];
  }

  const note = {
    id: Date.now(),
    title: '',
    content: '',
    color: '#fff',
    created_at: Date.now(),
    updated_at: Date.now(),
    isArchived: false,
    isPinned: false,
    isTrashed: false,
  } as Note;

  notes.unshift(note);
  await storage.setItem('notes', notes);

  console.log('New note created');
  return note.id;
};

const style = StyleSheet.create({
  plusButton: {
    position: 'absolute',
    zIndex: 10,
    bottom: 20,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
  },
});

export default PlusButton;
