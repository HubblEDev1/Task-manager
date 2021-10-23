import { authReducer } from "../../reducers/authReducer"
import { types } from "../../types/types"

describe('Testing authReducer', () => {
    const user = {
        uid: 'edwin1234',
        name: 'Edwin'
    }

    test('Authenticate and set username', () => {
        const state = authReducer({}, {
            type: types.login,
            payload: {
                uid: 'edwin1234',
                displayName: 'Edwin'
            }
        })
        //console.log(state);

        expect(state).toEqual({
            uid: 'edwin1234',
            name: 'Edwin'
        });
    })

    test(' logout', () => {
        const state = authReducer({}, {
            type: types.logout,
        })

        expect(state).toEqual({});
    })
})