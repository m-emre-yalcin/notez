import React from 'react';
import {View, Pressable, StyleSheet, Vibration} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import Database from '../services/database';
import Colors from '../global/colors';

import type {Note} from '../types';

const PlusButton = ({navigation}) => {
  return (
    <View style={style.plusButton}>
      <Pressable
        onPress={async () => {
          const noteId = await createNewNote();
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

  await Database.create('/notes', note);
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
