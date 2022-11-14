import styles from "./Post.module.css"
import { Coment } from "./Coment.jsx"
import { Avatar } from "./Avatar"
import { ChangeEvent, FormEvent, InvalidEvent, useState } from "react";

interface Author {
    name: string,
    role: string,
    avatarUrl: string,
}

interface Content {
    type: 'paragraph' | 'link',
    content: string,
}

interface PostProps {
    author: Author,
    publishedAt: Date,
    content: Content[],
}

export function Post({ author, publishedAt, content }: PostProps) {

    const [comments, setComments] = useState([
        'post muito bacana!!'
    ])

    const publishedDateFormatted = new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: 'long',
        hour: '2-digit',
        minute: '2-digit',
    }).format(publishedAt);

    const [newCommentText, setNewCommentText] = useState('')

    function handleCreateNewComment(event: FormEvent) {
        event.preventDefault()

        setComments([...comments, newCommentText]);
        setNewCommentText('');
    }

    function handleNewComentChange(event: ChangeEvent<HTMLTextAreaElement>) {
        event.target.setCustomValidity('');
        setNewCommentText(event.target.value);
    }

    function deleteComment(commentToDelete: string) {
        const commentsWithoutDeletedOne = comments.filter(comment => {
            return comment !== commentToDelete;
        })

        setComments(commentsWithoutDeletedOne);
    }

    function handleNewComentInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
        event.target.setCustomValidity('Esse campo é obrigatório')
    }

    const isNewCommentEmpty = newCommentText.length === 0;

    return (
        <article className={styles.post}>
            <header>
                <div className={styles.author}>
                    <Avatar
                        src={author.avatarUrl}
                        hasBorder
                    />

                    <div className={styles.authorInfo}>
                        <strong>{author.name}</strong>
                        <span>{author.role}</span>
                    </div>
                </div>

                <time title="11 de Maio às 08:13h" dateTime={publishedAt.toISOString()} >{publishedDateFormatted}</time>

            </header>

            <div className={styles.content}>
                {content.map(line => {
                    if (line.type === 'paragraph') {
                        return <p key={line.content}> {line.content}</p>
                    } else if (line.type === 'link') {
                        return <p key={line.content}><a href="#">{line.content}</a></p>
                    }
                })}

            </div>

            <form onSubmit={handleCreateNewComment} className={styles.comentForm}>
                <strong>Deixe seu feedback</strong>
                <textarea
                    name="coment"
                    placeholder="Deixe um comentário"
                    value={newCommentText}
                    onChange={handleNewComentChange}
                    onInvalid={handleNewComentInvalid}
                    required
                />

                <footer>
                    <button type="submit" disabled={isNewCommentEmpty}>
                        Publicar
                    </button>
                </footer>

            </form>

            <div className={styles.comentList}>
                {comments.map(comment => {
                    return (
                        <Coment
                            key={comment}
                            content={comment}
                            onDeleteComment={deleteComment}
                        />
                    )
                })}

            </div>
        </article  >
    )
}