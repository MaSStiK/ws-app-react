import './Posts.css'
import React, { useState, useEffect } from 'react'
import Post from '../post/Post'
import add_img from '../../media/add.png'
import update_img from '../../media/update.png'
import cross_img from '../../media/cross.png'
import PostCreate from '../post-create/PostCreate'


function Posts() {
    const [posts, setPosts] = useState(null)
    const [isUpdate, setIsUpdate] = useState(false)
    const [routerComponent, setRouterComponent] = useState('posts');

    useEffect(() => {

        fetch('http://localhost/api/posts')
        .then(res => res.json())
        .then(
            (result) => {
                setPosts(result)
            },
            (error) => {
                console.log(error)
            }
        )

        return () => {
            setPosts(null)
        }
    }, [isUpdate])

    const postUpdate = () => {
        setIsUpdate([isUpdate])
    }

    return (
        <React.Fragment>
            {routerComponent === 'posts' && ( // Главная страница
                <React.Fragment>
                    <header>
                        <button onClick={() => setRouterComponent('postCreate')} className="add">
                            <img className="add_img" src={add_img} alt="add"/>
                        </button>
                        <div className="title">Все посты</div> 
                        <button onClick={() => postUpdate()} className="update">
                            <img className="update_img" src={update_img} alt="update"/>
                        </button>
                    </header>

                    <div className="posts_container">
                        {!!posts && (posts.map((post, index) => (
                            <Post key={"post_" + index} post={post}/>
                        )))}
                    </div>
                </React.Fragment>            
            )}

            {routerComponent === 'postCreate' && ( // Страница создания поста
                <React.Fragment>
                    <header>
                        <button onClick={() => setRouterComponent('posts')} className="cross">
                            <img className="cross_img" src={cross_img} alt="cross"/>
                        </button>
                        <div className="title">Добавить пост</div> 
                        <button onClick={() => postUpdate()} className="update">
                            <img className="update_img" src={update_img} alt="update"/>
                        </button>
                    </header>

                    <PostCreate isCreate={() => setRouterComponent('posts')}/>
                </React.Fragment>
            )}
        </React.Fragment>
    )
}

export default Posts