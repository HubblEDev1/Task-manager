import configureStore from 'redux-mock-store'; //ES6 modules
import thunk from 'redux-thunk';
import '../../../setupTests';

import { mount } from "enzyme";
import { Provider } from "react-redux";

import {NoteScreen} from '../../../components/notes/NoteScreen';
import { activeNote, startNewNote } from '../../../actions/notes';

jest.mock('../../../actions/notes', () => ({
    activeNote: jest.fn(),
}));

jest.mock('../../../actions/auth', () => ({
    startLogout: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
    auth: {
        uid: '1', 
        name: 'Ed'
    },
    ui: {
        loading: false,
        msgError: null
    },
    notes: {
        active: {
            id: 1234,
            title: 'Hola',
            body: 'mundo', 
            date: 0
        },
        notes: []
    }
};

let store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store = { store }>
        <NoteScreen/>
    </Provider>
);

describe('Pruebas en NoteScreen', () => {
    test('should ', () => {
        expect( wrapper ).toMatchSnapshot();
    });

    test('should dispatch active note', () => {
        wrapper.find('input[name="title"]').simulate('change', {
            target: {
                name: 'title',
                value: 'Hi again'
            }
        });

        expect( activeNote ).toHaveBeenCalledWith(
            1234,
            {
                body: 'mund',
                title: 'Hi again',
                id: 1234,
                date: 0
            }
        );
        /*
        expect( activeNote ).toHaveBeenCalledWith(
            1234,
            {
                body: 'mundo',
                title: 'Hi again',
                id: 1234,
                date: 0
            }
        );*/
    })
    
})
