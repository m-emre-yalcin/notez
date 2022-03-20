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
  const [note, setNote] = useState({});
  const [saving, setSaving] = useState(false);

  const {id} = props.route.params;
  const q = doc(state.firestore, `notes/${id}`);
  let noteEditorInput: TextInput | null = null;

  useEffect(() => {
    console.log('note oppening:', id);

    if (id) {
      const note = state.notes.find(note => Number(note.id) == Number(id));

      // if note exists set it for this page's state
      if (note) setNote(note);
      // if not, fetch it from firestore
      else
        getDoc(q).then(doc => {
          if (doc.exists) {
            setNote(doc.data());
          } else {
            console.log('note not found');
          }
        });
    }
  }, [id]);

  const handleTitleChanges = async text => {
    setNote({
      ...note,
      title: text,
    });
    updateNote(note);
  };
  const handleContentChanges = async text => {
    setNote({
      ...note,
      content: text,
    });
    updateNote(note);
  };
  const handleDelete = async () => {
    setSaving(true);
    const q = doc(state.firestore, `/notes/${id}`);
    await setDoc(q, {...note, isTrashed: true});
    dispatch({type: 'DELETE_NOTE', payload: {id}});
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
