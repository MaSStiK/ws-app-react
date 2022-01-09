import './Comment.css'
import React, { useState } from 'react';

function Comment(props) {
    const [comment, SetComment] = useState(props.comment)

    return (
        <React.Fragment>
            <div className="comment">
                <div className="comment_text">{comment.comment_text}</div>
            </div>
        </React.Fragment>
    )
}

export default Comment