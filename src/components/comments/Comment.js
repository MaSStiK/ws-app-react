import './Comment.css'
import React, { useState } from 'react';
import cross_img from '../../media/cross.png'

function Comment(props) {
    const [comment, SetComment] = useState(props.comment)

    const deleteComment = async (com_id) => {
    
        fetch("http://localhost/api/comment/" + com_id + "/delete", {
            method: 'DELETE'
            })
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
                },
                (error) => {
                console.log(error);
            }
        );
        let commentDel = document.querySelector("#comment_" + com_id).style.display = "none"
    }

    return (
        <React.Fragment>
            <div id={"comment_" + comment.id} className="comment">
                <div className="comment_text">{comment.comment_text}</div>
                <input onClick={() => deleteComment(comment.id)} type="image" src={cross_img} id={"delete_" + comment.id} className="delete_com" alt="delete"/>
            </div>
        </React.Fragment>
    )
}

export default Comment