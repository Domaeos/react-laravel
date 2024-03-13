import { useEffect, useState } from "react";
import { getThread } from "../../api/api";
import { useParams } from "react-router-dom";
import { Loader } from "./Loader";
import { ThreadCard } from "./ThreadCard";
import { ThreadReply } from "./ThreadReply";

export function Thread() {
    const { threadId } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [threads, setThreads] = useState(null);

    useEffect(() => {
        getThread(threadId)
            .then((threads) => {
                const threadArray = [];
                for (const index in threads) {
                    threadArray.push(threads[index]); // Eloquent seems to return an object with relational where?
                }
                setThreads(() => threadArray);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    if (isLoading) return <Loader />;

    return (
        <>
            {threads.length && (
                <div className="thread-grid">
                    {threads.length &&
                        threads.map((thread) => <ThreadCard thread={thread} />)}
                    <ThreadReply threadId={threadId} />
                </div>
            )}
        </>
    );
}
