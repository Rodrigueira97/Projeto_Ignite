import styles from './Coment.module.css'
import { ThumbsUp, Trash } from "phosphor-react"
import { Avatar } from "./Avatar"
import { useState } from 'react'


interface props {
    content: string;
    onDeleteComment: (comment: string) => void;
}

export function Coment(props: props) {

    const [countLike, setCountLike] = useState(0);

    function handleLikeComment() {
        setCountLike(countLike + 1);
    }

    function handleDelete() {
        props.onDeleteComment(props.content)
    }

    return (
        <div className={styles.coment}>

            <Avatar hasBorder={false} src="https://avatars.githubusercontent.com/u/93230930?v=4" />

            <div className={styles.comentBox}>
                <div className={styles.comentContent}>
                    <header>
                        <div className={styles.authorAndTime}>
                            <strong>Rodrigo Xavier</strong>
                            <time title='11 de maio as 8:13h' dateTime='2022-05-11 08:13:30'>cerca de 1h atrás</time>
                        </div>

                        <button onClick={handleDelete} title="Deletar comentário">
                            <Trash size={24} />
                        </button>
                    </header>
                    <p>{props.content}</p>
                </div>

                <footer>
                    <button onClick={handleLikeComment}>
                        <ThumbsUp />
                        Aplaudir <span>{countLike}</span>
                    </button>
                </footer>

            </div>
        </div>
    )
}