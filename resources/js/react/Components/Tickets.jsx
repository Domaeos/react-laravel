import { useEffect, useState } from "react";
import { getAllTickets } from "../../api/api";
import { Loader } from "./Loader";
import { TicketActions } from "./TicketActions";
import { NewTicket } from "./NewTicket";
import { Paper } from "@mui/material";
import { useContext } from "react";
import { UserContext } from "./UserProvider";

export function Tickets() {
    const { user, setUser } = useContext(UserContext);
    console.log(user);
    const [tickets, setTickets] = useState([]);
    const [currentAction, setCurrentAction] = useState("");

    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        getAllTickets(setTickets, setIsLoading);
    }, []);

    if (isLoading) return <Loader open={isLoading} />;
    console.log(currentAction);

    return (
        <>
            {currentAction === "" && (
                <h1>Choose an action from bottom of page</h1>
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
