import styles from './Sidebar.module.css';
import { PencilLine } from 'phosphor-react'
import { Avatar } from './Avatar';


const capa = 'https://www.opovo.com.br/_midias/jpg/2022/01/28/818x460/1_foto_do_espaco_tirada_pela_nasa-17985129.jpg'


export function Sidebar() {
    return (
        <aside className={styles.sidebar}>
            <img
                className={styles.cover} src={capa} alt=""
            />
            <div
                className={styles.profile}
            >
                <Avatar
                    src='https://avatars.githubusercontent.com/u/93230930?v=4'
                    hasBorder
                />

                <strong>Rodrigo Xavier</strong>
                <span>Web Developer</span>
            </div>

            <footer>
                <a href="#">
                    <PencilLine size={20} />
                    Editar seu perfil
                </a>
            </footer>
        </aside>
    )
}