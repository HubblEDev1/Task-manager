import React from 'react'

export const JournalEntry = () => {
    return (
        <div className="journal__entry">
            <div
                className="journal__entry-picture"
                style={{ 
                    backgroundSize: 'cover',
                    backgroundImage: 'url(https://i.pinimg.com/originals/98/40/4c/98404c70b9177d19259bbcbc2056fa61.jpg)'
                }}
            >
                
            </div>
            <div
                className="journal__entry-body"
            >
                <p
                    className="journal__entry-title"
                >
                    New day
                </p>
                <p className="journal__entry-content">
                    lorem ipsum dolor sit am
                </p>

            </div>
            <div className="journal__entry-date-box">
                <span>Monday</span>
                <h4>28</h4>
            </div>
        </div>
    )
}
