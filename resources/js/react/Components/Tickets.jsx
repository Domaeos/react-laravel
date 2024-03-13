import { useEffect, useState } from "react";
import { getAllTickets } from "../../api/api";
import { Loader } from "./Loader";
import { TicketActions } from "./TicketActions";
import { NewTicket } from "./NewTicket";
import { Paper } from "@mui/material";
import { useContext } from "react";
import { UserContext } from "./UserProvider";
import { ShowTickets } from "./ShowTickets";

export function Tickets() {
    const { user, setUser } = useContext(UserContext);

    const [tickets, setTickets] = useState([]);
    const [ticketRefresh, setTicketRefresh] = useState(false);
    const [currentAction, setCurrentAction] = useState("");

    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        user &&
            getAllTickets(setTickets, setIsLoading).then((x) => {
                setTickets(() => x);
            });
    }, [ticketRefresh]);

    if (isLoading) return <Loader open={isLoading} />;

    return (
        <>
            {currentAction === "" && (
                <>
                    <h1>Choose an action from bottom of page</h1>
                </>
            )}
            {(currentAction === "open" ||
                currentAction === "all" ||
                currentAction === "resolved") && (
                <ShowTickets action={currentAction} tickets={tickets} />
            )}
            {currentAction === "new" && <NewTicket />}
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
