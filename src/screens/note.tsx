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
import storage from '../services/async-storage';
import {Note} from '../types';
type Props = {
  navigation: any;
  route: any;
};

const NoteScreen = (props: Props) => {
  let noteEditorInput: TextInput | null = null;
  const [note, setNote] = useState({} as Note);
  const id = props.route.params.id;

  useEffect(() => {
    if (id) {
      storage.getItem('notes').then(notes => {
        const data = notes.find(note => note.id === id);
        if (data !== null) {
          // storage.setItem('notes', notes);
          setNote(data);
        }
      });
    }
  }, [note]);

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
