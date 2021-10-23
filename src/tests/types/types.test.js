import '../../setupTests';
import { shallow } from 'enzyme';
import { types } from '../../types/types';


describe('Testing types', () => {

    const myTypes = {
        login: '[Auth] login',
        logout: '[Auth] logout',
    
        uiSetError: '[UI] Set Error',
        uiRemoveError: '[UI] Remove Error',
    
        uiStartLoading: '[UI] Start loading',
        uiFinishLoading: '[UI] Finish loading',
    
        notesAddNew: '[Notes] New note',
        notesActive: '[Notes] Set active note',
        notesLoad: '[Notes] Load notes',
        notesUpdated: '[Notes] Updated note',
        notesFileUrl: '[Notes] Updated image url',
        notesDelete: '[Notes] Delete note',
        notesLogoutCleaning: '[Notes] Logout Cleaning',
    }

    test('Asure types', () => {
        expect(types).toEqual(myTypes); 
    })
})