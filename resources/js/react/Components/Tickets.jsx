import { useEffect, useState } from "react";
import { getAllTickets } from "../../api/api";
import { Loader } from "./Loader";

export function Tickets() {
    const [tickets, setTickets] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        getAllTickets(setTickets, setIsLoading);
    }, []);

    if (isLoading) return <Loader open={isLoading} />;

    return (
        <div className="ticket-container">
            <ul>
                {tickets.map((ticket) => {
                    return <li key={ticket.id}>{ticket.description}</li>;
                })}
            </ul>
        </div>
    );
}
