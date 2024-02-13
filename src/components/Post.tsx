import { format, formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale/pt-BR'

import styles from './Post.module.css'

import { Comment } from './Comment'
import { Avatar } from './Avatar'
import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react'

interface Author{
    avatarUrl: string;
    name: string;
    role: string;
}

interface Content{
    type: 'paragraph' | 'link';
    content: string;
}

export interface PostType{
    id: number;
    author: Author;
    publishedAt: Date;
    content: Content[];
}

interface PostProps{
    post: PostType
}

export function Post({ post }:PostProps){
    const [comments, setComments] = useState([
        'Post do useState inicial'
    ])

    const [newCommentText, setNewCommentText] = useState('')

    const publishedAtDateFormatted = format(post.publishedAt, "dd 'de' LLLL 'às' HH:mm'h'", {
        locale: ptBR
    })

    const publishedDateRelativeToNow = formatDistanceToNow(post.publishedAt, {
        locale: ptBR,
        addSuffix: true
    })

    function handleCreateNewComment(event: FormEvent){
        event.preventDefault();

        setComments([...comments, newCommentText]);

        setNewCommentText('');
    }

    function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>){
        event.target.setCustomValidity('')
        setNewCommentText(event.target.value);
    }

    function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>){
        event.target.setCustomValidity('Campo obrigatório!')
    }

    function deleteComment(commentToDelete: string){
        const cmmentsWhithoutDeleteOne = comments.filter(comment =>{
            return comment !== commentToDelete;
        })

        setComments(cmmentsWhithoutDeleteOne)
    }

    const isNewCommentEmpty = newCommentText.length === 0;

    return(
        <article className={styles.post}>
            <header>
                <div className={styles.author}>
                    <Avatar src={post.author.avatarUrl}></Avatar>
                    
                    <div className={styles.authorInfo}>
                        <strong>{post.author.name}</strong>
                        <strong>{post.author.role}</strong>
                    </div>
                </div>

                <time title={publishedAtDateFormatted} 
                    dateTime={post.publishedAt.toISOString()}>{publishedDateRelativeToNow}</time>
            </header>

            <div className={styles.content}>
                {post.content.map(line => {
                    if (line.type === 'paragraph'){
                        return <p key={line.content}>{line.content}</p>;
                    } else if (line.type === 'link')
                        return <p key={line.content}><a href='#'>{line.content}</a></p>;
                })}
            </div>

            <form onSubmit={handleCreateNewComment} className={styles.comentForm}>
                <strong>Deixe seu comentário</strong>
                <textarea
                    name="comment"
                    onChange={handleNewCommentChange}
                    value={newCommentText}
                    placeholder='Deixe seu comentário'
                    onInvalid={handleNewCommentInvalid}
                    required
                />

                <footer>
                    <button type="submit" disabled={isNewCommentEmpty}>
                        Publicar
                    </button>
                </footer>
            </form>

            <div className={styles.commentList}>
                {comments.map(comment =>{
                    return (
                        <Comment 
                            key={comment} 
                            content={comment}
                            onDeleteComment={deleteComment}
                        />)
                })}
            </div>
        </article>
    )  
}