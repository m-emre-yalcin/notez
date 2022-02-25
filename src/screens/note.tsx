import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  StyleSheet,
  Platform,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import NoteHeader from '../components/NoteHeader';
import Colors from '../global/colors';
import Database from '../services/database';

import type {Note} from '../types';
type Props = {
  navigation: any;
  route: any;
};

const NoteScreen = (props: Props) => {
  let noteEditorInput: TextInput | null = null;
  const [note, setNote] = useState({} as any);
  const id = props.route.params.id;

  useEffect(() => {
    console.log('id', id);
    if (id && typeof id === 'number') {
      Database.get(`/notes/${id}`).then(data => {
        setNote(data);
      });
    }
  }, [id]);

  return (
    <SafeAreaView>
      <NoteHeader route={props.route} navigation={props.navigation} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <Pressable onPress={() => noteEditorInput.focus()}>
          <ScrollView style={style.noteView}>
            <TextInput
              ref={input => {
                noteEditorInput = input;
              }}
              style={style.noteContent}
              value={note.content}
              onBlur={() => {
                console.log('note:', note);
                if (note.content) {
                  Database.update(`/notes/${id}`, note).then(data => {
                    console.log(data);
                  });
                }
              }}
              placeholder="Type here..."
              placeholderTextColor={Colors.tertiary}
              multiline={true}
            />
          </ScrollView>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  noteView: {
    backgroundColor: Colors.secondary,
    height: '100%',
  },
  noteContent: {
    fontSize: 18,
    lineHeight: 30,
    paddingTop: 5,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    color: Colors.primary,
    textAlignVertical: 'top',
  },
});

export default NoteScreen;
