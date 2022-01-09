import './PostCreate.css'
import agree_img from '../../media/agree.png'
import React, { useState, useRef } from 'react';


function PostCreate(    ) {
    const [isDisabled, setIsDisabled] = useState(true);
    const inputPostTitle = useRef();
    const inputPostInfo = useRef();
    const inputPostImage = useRef();

    const postAdd = async () => {
        const postTitle = inputPostTitle.current.value;
        const postInfo = inputPostInfo.current.value;
        const postImage = inputPostImage.current.files;
        console.log(postImage);

        if (!postTitle || !postInfo) {
            return;
        }

        let data = new FormData();
        data.append('post_title', postTitle);
        data.append('post_info', postInfo);
        for (let index = 0; index < postImage.length; index++) {
            data.append(`post_files[${index}]`, postImage[index]);
        }

        fetch("http://localhost/api/post/add", {
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
        const postTitle = inputPostTitle.current.value;
        const postInfo = inputPostInfo.current.value;

        if (postTitle.trim().length > 0 && 
        postInfo.trim().length > 0) {
            setIsDisabled(false);
        }
        else {
            setIsDisabled(true);
        }
    }

    return(
        <React.Fragment>
            <div className="create">
                <div className="group">
                    <div className="title">Заголовок</div>
                    <input ref={inputPostTitle} type="text" onChange={() => addDisable()}/>
                </div>
                <div className="group">
                    <div className="title">Описание</div>
                    <input ref={inputPostInfo} type="text" onChange={() => addDisable()}/>
                </div>
                <div className="group">
                    <div className="title">Картинка</div>
                    <input ref={inputPostImage} type="file" multiple="multiple" accept="image/png, image/gif, image/jpeg"/>
                </div>
                <div className="group">
                    <button className="button_accept" onClick={() => postAdd()} disabled={isDisabled}>Добавить</button>
                </div>
            </div>
            
        </React.Fragment>
    );
}

export default PostCreate;