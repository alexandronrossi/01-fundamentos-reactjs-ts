import { useState, FormEvent, ChangeEvent, InvalidEvent } from 'react';
import { format, formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import styles from './Post.module.css';

import { Comment } from './Comment';
import { Avatar } from './Avatar';

interface Author {
    id: number;
    avatarUrl: string;
    name: string;
    role: string;
}

interface Content {
    type: string;
    content: string;
}

export interface PostType {
    id: number;
    author: Author;
    contents: Content[];
    publishedAt: Date;
}

interface PostProps {
    post: PostType;
}

export function Post({ post }: PostProps) {
    const [comments, setComments] = useState(['Muito bom Devon, parabéns!! 👏👏']);
    const [newComentText, setNewComentText] = useState('');

    const publishedAtDateFormatted = format(post.publishedAt, "d 'de' LLLL 'às' HH:mm'h'", { locale: ptBR });
    const publishedRelativeToNow = formatDistanceToNow(post.publishedAt, { locale: ptBR, addSuffix: true });

    function handleCreateNewComment(event: FormEvent) {
        event.preventDefault();

        setComments([...comments, newComentText]);
        setNewComentText('');
    }

    function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
        event.target.setCustomValidity('');
        setNewComentText(event.target.value);
    }

    function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>)
    {
        event.target.setCustomValidity('Esse campo é obrigatório!');
    }

    function deleteComment(commentToDelete: string) {
        const commentsWithoutDeletedOne = comments.filter(comment => {
            return comment !== commentToDelete;
        });

        setComments(commentsWithoutDeletedOne);
    }

    const isNewCommentEmpty = newComentText.length === 0;

    return (
        <article className={styles.post}>
            <header>
                <div className={styles.author}>
                    <Avatar src={post.author.avatarUrl} />

                    <div className={styles.authorInfo}>
                        <strong>{post.author.name}</strong>
                        <span>{post.author.role}</span>
                    </div>
                </div>

                <time title={publishedAtDateFormatted} dateTime={post.publishedAt.toISOString()}>
                    {publishedRelativeToNow}
                </time>
            </header>

            <div className={styles.content}>
                {post.contents.map((line, index) => {
                    switch (line.type) {
                        case 'paragraph': return <p key={line.content + index}>{line.content}</p>
                        case 'link': return (<p key={line.content + index}><a href='javascript:void(0)'>{line.content}</a></p>)
                    }
                })}
            </div>

            <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
                <strong>Deixe seu feedback</strong>

                <textarea
                    name='comment'
                    value={newComentText}
                    placeholder='Deixe um comentário'
                    onChange={handleNewCommentChange}
                    onInvalid={handleNewCommentInvalid}
                    required
                />

                <footer>
                    <button type='submit' disabled={isNewCommentEmpty}>Publicar</button>
                </footer>
            </form>

            <div className={styles.commentList}>
                {comments.map((comment) => {
                    return (
                        <Comment
                            key={comment}
                            content={comment}
                            onDeleteComment={deleteComment}
                        />
                    )
                })}
            </div>

        </article>
    );
}