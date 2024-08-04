import { Avatar } from './Avatar';
import styles from './Sidebar.module.css';
import { PencilLine } from 'phosphor-react';

export function Sidebar() {
    return (
        <aside className={styles.sidebar}>
            <img 
                className={styles.cover} 
                src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=500&auto=format&fit=crop&q=50&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDN8fGRldiUyMGNvdmVyfGVufDB8fDB8fHww"
            />

            <div className={styles.profile}>
                <Avatar src="https://github.com/alexandronrossi.png" />

                <strong>Alexandro N. Rossi</strong>
                <span>Fullstack Developer</span>
            </div>

            <footer>
                <a href="javascript:void(0)">
                    <PencilLine size={20} />
                    Editar perfil
                </a>
            </footer>
        </aside>
    );
}