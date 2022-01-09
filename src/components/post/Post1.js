import './Post.css';
import React, { useState, useEffect } from 'react';

function Post(props) {
    const [post, setPost] = useState(props.post);

    useEffect(() => {
        setPost(props.post);
        
        return () => {
            setPost(null);
        }
    }, [props]);

    return(
        <React.Fragment>
                <div className='Post' onClick={props.isClick}>
                    <div>{post.post_title}</div>
                    <div>{post.post_info}</div>

                    
                    <div>{post.files && (
                        post.files.map((file, index) => (
                            <img key={'file_' + index} src={'http://localhost/api/file/' + file.key} height={50}/>
                        ))
                    )}</div>
                </div>
        </React.Fragment>
    );
}

export default Post;