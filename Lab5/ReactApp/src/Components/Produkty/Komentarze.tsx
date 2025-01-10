import { useEffect, useState } from "react";
import Komentarz from "./Komentarz";

interface Comment {
    id: number;
    body: string;
    postId: number;
    likes: number;
    user: {
        id: number;
        username: string;
        fullName: string;
    };
}

function Komentarze() {
    const [comments, setComments] = useState<Comment[]>([]);

    useEffect(() => {
        fetch("https://dummyjson.com/comments")
            .then((response) => response.json())
            .then((data) => {
                setComments(data.comments);
            });
    }, []);

    console.log(comments);

    return (
        <div>
            {comments.map((comment) => (
                <Komentarz
                    key={comment.id}
                    id={comment.id}
                    body={comment.body}
                    postId={comment.postId}
                    likes={comment.likes}
                    user={comment.user}
                ></Komentarz>
            ))}
        </div>
    );
}

export default Komentarze;