import { ThumbsUp, Trash } from 'phosphor-react'
import styles from './Comment.module.css'
import { Avatar } from './Avatar'
import { useState } from 'react'

interface CommentProps{
    content: string;
    onDeleteComment: (comment: string) => void;
}

export function Comment({content, onDeleteComment}:CommentProps){
    const [likeCount, setLikeCount] = useState(0)

    function handleDeleteComment(){
        onDeleteComment(content)
    }

    function handleLikeComment(){
        setLikeCount(likeCount+1)
    }

    return(
        <div className={styles.comment}>
            <Avatar
                hasBorder={false}
                src="https:github.com/pabriciosam.png"
                alt=""
            >
            </Avatar>

            <div className={styles.commentBox}>
                <div className={styles.commentContent}>
                    <header>
                        <div className={styles.authorAndTime}>
                        <strong>Pabrício Samagaio</strong>
                        <time title="20 de janeiro às 18h 35" dateTime="2024-01-20 18:35:00">Cerca de 1 hora</time>
                        </div>

                        <button onClick={handleDeleteComment} title="Deletar comentário">
                            <Trash size={24}></Trash>
                        </button>
                    </header>

                    <p>{content}</p>
                </div>

                <footer>
                    <button onClick={handleLikeComment}><ThumbsUp></ThumbsUp>Aplaudir <span>{likeCount}</span></button>
                </footer>
            </div>
        </div>
    )
}