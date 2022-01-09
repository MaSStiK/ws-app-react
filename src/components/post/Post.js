import './Post.css'
import React, { useState, useRef } from 'react';
import cross_img from '../../media/cross.png'
import edit_img from '../../media/edit.png'
import Comment from '../comments/Comment';


function Post(props) {
    const [post, setPosts] = useState(props.post)
    let isClosed = false

    const [isDisabled, setIsDisabled] = useState(true);
    const commentInput = useRef();

    const watchFull = (post_id) => {
        if (!isClosed) { // Открытие блока
            document.getElementById("object_" + post_id).style.boxShadow = "0 0 100px 40px"
            document.getElementById("object_" + post_id).style.position = "fixed"
            document.getElementById("object_" + post_id).style.top = "2%"
            document.getElementById("object_" + post_id).style.left = "1%"
            document.getElementById("object_" + post_id).style.zIndex  = "99"
            document.getElementById("object_" + post_id).style.width = "95vw"
            document.getElementById("post_" + post_id).style.width = "40vw"
            document.getElementById("post_" + post_id).style.height = "75vh"
            document.getElementById("comments_container" + post_id).style.display = "flex"
            
            isClosed = !isClosed
        } 
        
        else { // Закрытие блока
            document.getElementById("object_" + post_id).style.boxShadow = "none"
            document.getElementById("object_" + post_id).style.position = "static"
            document.getElementById("object_" + post_id).style.zIndex  = "1"
            document.getElementById("object_" + post_id).style.width = "20vw"
            document.getElementById("post_" + post_id).style.width = "20vw"
            document.getElementById("post_" + post_id).style.height = "50vh"
            document.getElementById("comments_container" + post_id).style.display = "none"

            isClosed = !isClosed
        }
    }

    const deletePost = async (post_id) => {
    
        fetch("http://localhost/api/post/" + post_id + "/delete", {
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
    }

    const commentAdd = async (post_id) => {
        
        const commentValue = commentInput.current.value;
        console.log(commentValue)

        if (!commentValue) {
            return;
        }

        let data = new FormData();
        data.append('comment_text', commentValue);

        fetch("http://localhost/api/post/" + post_id + "/comment/add", {
            method: 'POST',
            body: data
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
    }

    const addDisable = () => {
        const commentInputValue = commentInput.current.value;

        if (commentInputValue.trim().length > 0) {
            setIsDisabled(false);
            console.log(1)
        }
        else {
            setIsDisabled(true);
        }
    }

    return (
        <React.Fragment>
            <div onClick={() => watchFull(post.id)} id={"object_" + post.id} className="object">
                <div className="post_title"><center>{post.post_title}</center></div>
                <div className="post_block">
                    <div id={"post_" + post.id} className="post">
                        <div className="post_info">{post.post_info}</div>
                        <div>{post.files && (post.files.map((file, indexx) => (
                            <center>
                                <img className="post_image" key={'file_' + indexx} src={'http://localhost/api/file/' + file.key}/>
                            </center>
                            )))}
                        </div>
                    </div>
                    <div id={"comments_container" + post.id} className="comments_container">
                        <div className="comment_add">
                            <input ref={commentInput} type="text" onChange={() => addDisable()}/>
                            <button className="comment_accept" onClick={() => commentAdd(post.id)} disabled={isDisabled}>Добавить</button>
                        </div>

                        {!!post.comments && (post.comments.map((comment, index) => (
                            <Comment key={"comment_" + index} comment={comment}/>
                        )))}
                    </div>
                </div>
                <div className="post_buttons">
                    <button onClick={() => deletePost(post.id)} id={"delete_" + post.id} className="post_delete">
                        <img className="post_delete_img" src={cross_img} alt="cross"/>
                    </button>
                    <button  id={"edit_" + post.id} className="post_edit">
                        <img className="post_edit_img" src={edit_img} alt="edit"/>
                    </button>
                </div>
            </div>            
        </React.Fragment>
    )
}

export default Post