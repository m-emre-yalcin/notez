import React, {useState, useContext, useEffect, useCallback} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  ScrollView,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  StyleSheet,
  Platform,
} from 'react-native';
import NoteHeader from '../components/NoteHeader';
import Colors from '../global/colors';
import {debounce} from 'lodash';
import {AppContext} from '../components/context';
import {doc, getDoc, setDoc, updateDoc} from 'firebase/firestore';

type Props = {
  navigation: any;
  route: any;
};

const NoteScreen = (props: Props) => {
  const ctx = useContext(AppContext);
  const {state, dispatch, actions} = ctx;
  const [note, setNote] = useState({} as any);
  const [saving, setSaving] = useState(false);

  let noteEditorInput: TextInput | null = null;
  const id = props.route.params.id;
  const q = doc(state.firestore, `notes/${id}`);

  useEffect(() => {
    console.log('note oppening:', id);

    if (id && typeof id === 'number') {
      if (props.route.params.content) {
        // set note that comes from parameters
        setNote({...props.route.params});
      } else {
        // get fresh note from firebase
        getDoc(q).then(doc => {
          if (doc.exists) {
            setNote(doc.data());
          } else {
            console.log('note not found');
          }
        });
      }
    }
  }, [id]);

  const handleTitleChanges = async text => {
    const newNote = {...note};
    newNote.title = text;
    setNote(newNote);
    updateNote(newNote);
  };
  const handleContentChanges = async text => {
    const newNote = {...note};
    newNote.content = text;
    setNote(newNote);
    updateNote(newNote);
  };
  const handleDelete = async () => {
    setSaving(true);
    const q = doc(state.firestore, `/notes/${id}`);
    await setDoc(q, {...note, isTrashed: true});
    setSaving(false);
  };

  // memoize the function or debounce won't work
  const updateNote = useCallback(
    debounce(note => {
      setSaving(true);
      updateDoc(q, note)
        .then(() => {
          setSaving(false);
          dispatch({type: 'UPDATE_NOTE', payload: note});
          console.log('note updated:', id);
        })
        .catch(error => {
          setSaving(false);
          console.log('error when note updated:', error);
        });
    }, 1000),
    [],
  );

  return (
    <SafeAreaView>
      <NoteHeader
        navigation={props.navigation}
        title={note.title}
        onChangeText={handleTitleChanges}
        onDelete={handleDelete}
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
