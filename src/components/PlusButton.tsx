import React from 'react';
import {View, Pressable, StyleSheet, Vibration} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import Colors from '../global/colors';

import type {Note} from '../types';

const PlusButton = ({navigation, onPress}) => {
  return (
    <View style={style.plusButton}>
      <Pressable
        onPress={async () => {
          onPress().then((note: Note) => {
            // sucsessfully added a new note
            Vibration.vibrate(50);
            navigation.push('Note', {id: note.id});

            console.log('added a new note');
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
