import configureStore from 'redux-mock-store'; //ES6 modules
import thunk from 'redux-thunk';
import '../../../setupTests';
import { mount } from "enzyme";

import { Provider } from "react-redux";
import { JournalEntry } from '../../../components/journal/JournalEntry';
import { activeNote } from '../../../actions/notes';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
    notes: {
        active: {
            id: null,
        },
        notes: []
    }
};

let store = mockStore(initState);
store.dispatch = jest.fn();

const nota = {
    id: 10,
    date: 0,
    title: 'Hola', 
    body: 'Mundo',
    url: 'https://holal.com/mifoto.jpg'
}

const wrapper = mount(
    <Provider store = { store }>
        <JournalEntry {...nota}/>
    </Provider>
);

describe('Testing JournalEntry',() => {
    test('should snapshot', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('Active note', () => {
        wrapper.find('.journal__entry').prop('onClick')();
        expect( store.dispatch ).toHaveBeenCalledWith(
            activeNote( nota.id, {...nota})
        );
    })
    
})