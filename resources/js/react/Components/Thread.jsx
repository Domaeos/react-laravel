import { useEffect, useState, useContext } from "react";
import { getThread } from "../../api/api";
import { useParams } from "react-router-dom";
import { Loader } from "./SpinLoader";
import { UserContext } from "./UserProvider";
import { ThreadCard } from "./ThreadCard";
import { ThreadReply } from "./ThreadReply";
import { TicketActions } from "./TicketActions";
import {
    Box,
    SpeedDial,
    SpeedDialIcon,
    SpeedDialAction,
    Paper,
} from "@mui/material";

export function Thread({ currentAction, setCurrentAction }) {
    const { user } = useContext(UserContext);

    const { threadId } = useParams();
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
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
    }, [threads]);

    if (isLoading) return <Loader open={isLoading} />;

    return (
        <>
            {threads.length && (
                <div className="thread-grid">
                    {threads.length &&
                        threads.map((thread) => (
                            <ThreadCard key={thread.id} thread={thread} />
                        ))}
                    <ThreadReply setThreads={setThreads} threadId={threadId} />
                </div>
            )}
            <SpeedDial
                ariaLabel="SpeedDial controlled open example"
                className="thread-dial"
                icon={<SpeedDialIcon />}
                onClose={handleClose}
                onOpen={handleOpen}
                open={open}
            >
                <SpeedDialAction
                    key="hello"
                    icon={<SpeedDialIcon />}
                    tooltipTitle="test"
                    onClick={handleClose}
                />
            </SpeedDial>
            <Paper
                sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
                elevation={3}
            >
                <TicketActions
                    level={user.level}
                    currentAction={currentAction}
                    setCurrentAction={setCurrentAction}
                />
            </Paper>
        </>
    );
}
