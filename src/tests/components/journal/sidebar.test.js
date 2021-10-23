import configureStore from 'redux-mock-store'; //ES6 modules
import thunk from 'redux-thunk';
import '../../../setupTests';

import { mount } from "enzyme";
import { Provider } from "react-redux";

import { MemoryRouter } from 'react-router';
import { Sidebar } from '../../../components/journal/Sidebar';
import { startLogout } from '../../../actions/auth';
import { act } from '@testing-library/react';
import { getAuth, signInWithEmailAndPassword } from '@firebase/auth';
import { startNewNote } from '../../../actions/notes';

jest.mock('../../../actions/notes', () => ({
    startNewNote: jest.fn(),
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
            id: null,
        },
        notes: []
    }
};

let store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store = { store }>
        <Sidebar/>
    </Provider>
);

describe('Testing sidebar', () => {

    beforeEach( () => {
        store = mockStore(initState);
        jest.clearAllMocks();
    } );
 
    test('should show correctly', () => {
        expect(wrapper).toMatchSnapshot();        
    });

    test('should call startLogout', async () => {
        wrapper.find('button').prop('onClick')();
        expect( startLogout ).toHaveBeenCalled();
    });

    test('should call startNewNote', async() => {
        wrapper.find('.journal__new-entry').prop('onClick')();
        expect( startNewNote ).toHaveBeenCalled();
    });
    
})
