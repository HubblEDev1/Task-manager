import React from 'react'
import { NotesAppBar } from './NotesAppBar'

export const NoteScreen = () => {
    return (
        <div
            className="notes__main-content"
        >
            <NotesAppBar />
            <div className="notes__content">
                <input
                    type="text"
                    placeholder="Some awesome title"
                    className="notes__title-input"
                />

                <textarea
                    placeholder="What happend today"
                    className="notes__textarea"
                >
                </textarea>

                <div className="notes__image">
                    <img
                        src="https://i.pinimg.com/originals/d8/cb/3c/d8cb3ce047d28819c65c4c5105fa30b3.jpg"
                        alt="Image"
                    />
                </div>

            </div>
        </div>
    )
}
