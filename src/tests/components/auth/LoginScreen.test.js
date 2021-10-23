import configureStore from 'redux-mock-store'; //ES6 modules
import thunk from 'redux-thunk';
import '../../../setupTests';

import { mount } from "enzyme";
import { Provider } from "react-redux";
import { LoginScreen } from "../../../components/auth/LoginScreen"
import { MemoryRouter } from 'react-router';
import { startGoogleLogin, startLoginEmailPasswords } from '../../../actions/auth';

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
store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store = { store }>
        <MemoryRouter>
            <LoginScreen/>
        </MemoryRouter>
    </Provider>
);

describe('Testing <LoginScreen/>', () => {

    beforeEach( () => {
        store = mockStore(initState);
        jest.clearAllMocks();
    } );

    test('should snapshot ', () => {
        expect(wrapper).toMatchSnapshot();
    });
    
    test('should dispatch googleLogin ', () => {
        wrapper.find('.google-btn').prop('onClick')();

        expect(startGoogleLogin).toHaveBeenCalled();
    });

    test('should dispatch startLoginEmailPassword', () => {
        wrapper.find('form').prop('onSubmit')({preventDefault(){}});
        expect(startLoginEmailPasswords).toHaveBeenCalledWith('edwin@example.com', '123456');
    })
});
