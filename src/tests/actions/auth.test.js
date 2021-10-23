import { login, logout, startLoginEmailPasswords, startLogout } from "../../actions/auth";
import { types } from "../../types/types";

import '../../setupTests';
import configureStore from 'redux-mock-store'; //ES6 modules
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};

let store = mockStore(initState);

describe('testing auth', () => {

    beforeEach( () => {
        store = mockStore(initState);
    } );

    test('login and logout should create the action', () => {
        const action = logout();
        expect(action).toEqual({
            type: types.logout
        })
    });
    
    test('login and logout should create the action', () => {
        const action = login('TESTING', 'Edwin');

        expect(action).toEqual({
            type: types.login,
            payload: {
                uid: 'TESTING',
                displayName: 'Edwin'
            }
        })
    });

    test('should succed startLogout', async() => {
        await store.dispatch( startLogout() );

        const actions = store.getActions();
        //console.log(actions);

        expect(actions[0]).toEqual({
            type: types.logout
        });

        expect(actions[1]).toEqual({
            type: types.notesLogoutCleaning
        });
    })

    test('should start the startLoginEmailPassword', async () => {
        await store.dispatch( startLoginEmailPasswords('testing@test.com', '123456') );

        const actions = store.getActions();
        console.log(actions);

        expect( actions[2] ).toEqual({
            type: types.login,
            payload: {
                uid: 'AmXVO4e4g5ZZEdYIDq4ZKZpceAg1',
                displayName: null
            }
        })
    })
    
    
})
