/**
 * @jest-environment node
 */
import { deleteDoc, doc, getDoc } from '@firebase/firestore';
import { flushSync } from 'react-dom';
import configureStore from 'redux-mock-store' //ES6 modules
import thunk from 'redux-thunk'
import { startLoadingNotes, startNewNote, startSaveNote, startUploading } from '../../actions/notes';
import { db } from '../../firebase/firebase-config';
//import { fileUpload } from '../../helpers/fileUpload';
import { types } from '../../types/types';
import * as fs from 'fs';
import { fileUpload } from '../../helpers/fileUpload';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
    auth: { 
        uid: 'TESTING'
    },
    notes: {
        active: {
            id: 'yMTsMeDbDN5Dujzy3LON',
            title: 'titulo',
            body: 'body'
        }
    }
}


let store = mockStore(initState);

jest.mock('../../helpers/fileUpload', () => ({
    fileUpload: jest.fn()
}));

describe('Testing notes [actions]', () => {

    beforeEach( () => {
        store = mockStore(initState);
    } );

    test('should create a new note', async () => {
        await store.dispatch(startNewNote());

        const actions = store.getActions();
        console.log(actions);

        expect(actions[0]).toEqual({
            type: types.notesActive,
            payload: {
                id: expect.any(String),
                title: '', 
                body: '', 
                date: expect.any(Number)
            }
        });

        expect(actions[1]).toEqual({
            type: types.notesAddNew,
            payload: {
                id: expect.any(String),
                title: '', 
                body: '', 
                date: expect.any(Number)
            }
        });

        const { uid } = store.getState().auth;
        const docId = actions[0].payload.id;
        const noteRef = doc(db, `${uid}/journal/notes/${docId}`);
        await deleteDoc(noteRef);
    });

    test('startLoadingNotes should charge the notes', async () => {

        await store.dispatch(startLoadingNotes('TESTING'));

        const actions = store.getActions();

        expect(actions[0]).toEqual({
            type: types.notesLoad,
            payload: expect.any(Array)
        });

        const expected = {
            id: expect.any(String),
            title: expect.any(String),
            body: expect.any(String),
            date: expect.any(Number)
        }

        expect(actions[0].payload[0]).toMatchObject( expected );
        
    });
    
    test('should update notes', async () => {

        const note = {
            id: 'yMTsMeDbDN5Dujzy3LON',
            title: 'titulo',
            body: 'body'
        }
        await store.dispatch(startSaveNote(note));

        const actions = store.getActions();
        expect(actions[0].type).toBe(types.notesUpdated);
        const noteRef = doc(db, `TESTING/journal/notes/${note.id}`);
        const docRef = await getDoc(noteRef);

        expect(docRef.data().title).toBe(note.title);
    });

    test('startUploading should update the url', async () => {
        fileUpload.mockReturnValue('https://hola-mundo.com');
        fs.writeFileSync('foto.jpg', '');

        const file = fs.readFileSync('foto.jpg');
        await store.dispatch(startUploading(file));

        const noteRef = doc(db, `/TESTING/journal/notes/yMTsMeDbDN5Dujzy3LON`);
        const docRef = await getDoc(noteRef);

        expect(docRef.data().url).toBe('https://hola-mundo.com');
    })
       
});
