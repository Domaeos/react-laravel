import { useEffect } from "react";
import { getThread } from "../../api/api";
import { useParams } from "react-router-dom";

export function Thread() {
    const { threadId } = useParams();
    useEffect(() => {
        getThread(threadId);
    }, []);
    return <h1>{threadId}</h1>;
}
