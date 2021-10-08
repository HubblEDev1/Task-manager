import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startLogout } from '../../actions/auth';
import { JournalEntries } from './JournalEntries'

export const Sidebar = () => {

    const dispatch = useDispatch();
    const {name} = useSelector( state => state.auth);

    console.log(name);

    const handleLogout = () => {
        dispatch( startLogout() );
    }


    return (
        <aside className="journal__sidebar">
            <div className="journal__sidebar-navbar">
                <h3>
                    <i className="fa fa-moon" />
                    <span>{name}</span>
                </h3>
                <button
                    className="btn"
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </div>
            <div className="journal__new-entry">
                <i className="fa fa-calendar-plus fa-5x"></i>
                <p className="mt-5">New entry</p>
            </div>
            <JournalEntries/>
        </aside>
    )
}
