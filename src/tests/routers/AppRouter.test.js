import configureStore from 'redux-mock-store'; //ES6 modules
import thunk from 'redux-thunk';
import '../../setupTests';

import { mount } from "enzyme";
import { Provider } from "react-redux";

import { MemoryRouter } from 'react-router';
import { login } from '../../actions/auth';
import { act } from '@testing-library/react';
import Swal from 'sweetalert2';
import { getAuth, signInWithEmailAndPassword } from '@firebase/auth';
import { AppRouter } from '../../routers/AppRouter';

jest.mock('sweetalert2', () => ({
    fire: jest.fn(),
}));

jest.mock('../../actions/auth', () => ({
    login: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
    auth: {},
    ui: {
        loading: false,
        msgError: null
    },
    notes: {
        active: {
            id: 'ABC',
        },
        notes: []
    }
};

let store = mockStore(initState);
store.dispatch = jest.fn();

describe('Testin AppRouter', () => {
    test('It should dispatch login', async () => {
        let user;
        //An update to AppRouter inside a test was not wrapped in act
        await act(async () => {
            const auth = getAuth();
            const userCred = await signInWithEmailAndPassword(auth, 'test@test.com', '123456'); 
            user = userCred.user;

            const wrapper = mount(
                <Provider store = { store }>
                    <MemoryRouter>
                        <AppRouter/>
                    </MemoryRouter>
                </Provider>
            );
        })

        expect( login ).toHaveBeenCalled();
    })
    
})
