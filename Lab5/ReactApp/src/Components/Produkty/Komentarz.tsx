import { useEffect, useState } from "react";

interface CommentProps {
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

function Komentarz(props: CommentProps) {
    const [likesCount, setLikesCount] = useState<number>(props.likes);
    const [likeButtonBackgroundColor, setLikeButtonBackgroundColor] =
        useState<string>("white");
    const [dislikeButtonBackgroundColor, setDislikeButtonBackgroundColor] =
        useState<string>("white");
    const [netLikeValue, setNetLikeValue] = useState<number>(0);

    const updateButtons = () => {
        if (netLikeValue == 0) {
            setLikeButtonBackgroundColor("white");
            setDislikeButtonBackgroundColor("white");
            return;
        }
        if (netLikeValue == 1) {
            setLikeButtonBackgroundColor("green");
            setDislikeButtonBackgroundColor("white");
            return;
        }
        setLikeButtonBackgroundColor("white");
        setDislikeButtonBackgroundColor("red");
        return;
    };
    useEffect(updateButtons, [netLikeValue]);

    return (
        <div>
            <p>
                User: <b>{props.user.username}</b> writes: {props.body}
            </p>
            <p>Likes: {likesCount + netLikeValue}</p>
            <button
                onClick={() => {
                    if (netLikeValue == 0 || netLikeValue == -1) {
                        setNetLikeValue(1);
                        return;
                    }
                    setNetLikeValue(0);
                }}
                style={{ backgroundColor: likeButtonBackgroundColor }}
            >
                &#128077;
            </button>
            <button
                onClick={() => {
                    if (netLikeValue == 0 || netLikeValue == 1) {
                        setNetLikeValue(-1);
                        return;
                    }
                    setNetLikeValue(0);
                }}
                style={{ backgroundColor: dislikeButtonBackgroundColor }}
            >
                &#128078;
            </button>
        </div>
    );
}

export default Komentarz;