import React, {useState, useEffect, useCallback} from 'react';
import {
  ScrollView,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  StyleSheet,
  Platform,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {debounce} from 'lodash';
import NoteHeader from '../components/NoteHeader';
import Colors from '../global/colors';
import firebaseApp from '../services/firebase';
import {
  getFirestore,
  query,
  where,
  startAt,
  limit,
  getDoc,
  updateDoc,
  doc,
} from 'firebase/firestore';

const db = getFirestore(firebaseApp);

import type {Note} from '../types';
type Props = {
  navigation: any;
  route: any;
};

const NoteScreen = (props: Props) => {
  let noteEditorInput: TextInput | null = null;
  const [note, setNote] = useState({} as any);
  const [saving, setSaving] = useState(false);
  const id = props.route.params.id;
  const q = doc(db, `/notes/${id}`);

  useEffect(() => {
    console.log('id', id);
    if (id && typeof id === 'number') {
      // set note that comes from parameters
      setNote({...props.route.params});
    }
  }, [id]);

  const handleTitleChanges = text => {
    const newNote = {...note};
    newNote.title = text;
    setNote(newNote);
  };
  const handleContentChanges = text => {
    const newNote = {...note};
    newNote.content = text;
    setNote(newNote);
  };

  // memoize the function or debounce won't work
  const updateNote = useCallback(
    debounce(() => {
      setSaving(true);
      updateDoc(q, note)
        .then(() => {
          setSaving(false);
          console.log('note updated');
        })
        .catch(error => {
          setSaving(false);
          console.log('error when note updated:', error);
        });
    }, 500),
    [],
  );

  return (
    <SafeAreaView>
      <NoteHeader
        navigation={props.navigation}
        title={note.title}
        onChangeText={handleTitleChanges}
        onChange={updateNote}
        isSaving={saving}
      />
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
              onChangeText={handleContentChanges}
              onChange={updateNote}
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
