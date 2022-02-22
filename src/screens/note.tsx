import React from 'react';
import {ScrollView, Text, StyleSheet} from 'react-native';
import Colors from '../global/colors';

const Note = ({route, navigation}) => {
  return (
    <ScrollView style={style.noteView}>
      <Text style={style.noteTitle}>{route.params.title}</Text>
      <Text style={style.noteContent}>{route.params.content}</Text>
    </ScrollView>
  );
};

const style = StyleSheet.create({
  noteView: {
    padding: 10,
    backgroundColor: Colors.secondary,
  },
  noteTitle: {
    fontSize: 18,
    marginBottom: 5,
    color: Colors.primary,
  },
  noteContent: {
    fontSize: 16,
    color: Colors.primary,
  },
});

export default Note;
