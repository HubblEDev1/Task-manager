import configureStore from 'redux-mock-store'; //ES6 modules
import thunk from 'redux-thunk';
import '../../../setupTests';

import { mount } from "enzyme";
import { Provider } from "react-redux";
import { LoginScreen } from "../../../components/auth/LoginScreen"
import { MemoryRouter } from 'react-router';
import { startGoogleLogin, startLoginEmailPasswords } from '../../../actions/auth';
import { RegisterScreen } from '../../../components/auth/RegisterScreen';
import { types } from '../../../types/types';

jest.mock('../../../actions/auth', () => ({
    startGoogleLogin: jest.fn(),
    startLoginEmailPasswords: jest.fn(),
}))

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
    auth: {},
    ui: {
        loading: false,
        msgError: null
    }
};

let store = mockStore(initState);
//store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store = { store }>
        <MemoryRouter>
            <RegisterScreen/>
        </MemoryRouter>
    </Provider>
);

describe('Testing RegisterScreen/>', () => {
    /*
    beforeEach( () => {
        store = mockStore(initState);
        jest.clearAllMocks();
    } );*/

    test('should snapshot ', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('should dispatch of the action', () => {
        const emailField = wrapper.find('input[name="email"]');
        //console.log(emailField.exists());
        emailField.simulate('change', {
            target: {
                value: '',
                name: 'email'
            }
        });

        wrapper.find('form').simulate('submit', {
            preventDefault(){}
        });

        const actions = store.getActions();
        console.log(actions);
        expect(actions[0]).toEqual({
            type: types.uiSetError,
            payload: 'Name is required'
        })
    });

    test('should show message', () => {
        const initState = {
            auth: {},
            ui: {
                loading: false,
                msgError: 'Email is not correct'
            }
        };
        
        const store = mockStore(initState);
        //store.dispatch = jest.fn();
        const wrapper = mount(
            <Provider store = { store }>
                <MemoryRouter>
                    <RegisterScreen/>
                </MemoryRouter>
            </Provider>
        );

        expect(wrapper.find('.auth__alert-error').exists()).toBe(true);
        expect(wrapper.find('.auth__alert-error').text().trim()).toBe( initState.ui.msgError );
        
    })
    


    
    /*
    test('should dispatch googleLogin ', () => {
        wrapper.find('.google-btn').prop('onClick')();

        expect(startGoogleLogin).toHaveBeenCalled();
    });

    test('should dispatch startLoginEmailPassword', () => {
        wrapper.find('form').prop('onSubmit')({preventDefault(){}});
        expect(startLoginEmailPasswords).toHaveBeenCalledWith('edwin@example.com', '123456');
    })*/
});
