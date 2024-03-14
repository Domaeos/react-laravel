import { useEffect, useState } from "react";
import { TicketCard } from "./TicketCard";

export function ShowTickets({ action, tickets }) {
    const [uniqueTickets, setUniqueTickets] = useState([]);

    useEffect(() => {
        const currentTickets = [...tickets];
        const uniqueTickets = currentTickets.reduce((unique, current) => {
            if (!unique.find((x) => x.thread_id === current.thread_id))
                unique.push(current);
            return unique;
        }, []);
        setUniqueTickets(() => uniqueTickets);
    }, []);

    return (
        <>
            <div className="ticket-grid">
                {action === "open" &&
                    uniqueTickets?.length &&
                    uniqueTickets
                        .filter((x) => !x.closed || !x.resolved)
                        .map((ticket) => (
                            <TicketCard key={ticket.id} ticket={ticket} />
                        ))}
                {action === "resolved" &&
                    uniqueTickets?.length &&
                    uniqueTickets
                        .filter((x) => x.resolved)
                        .map((ticket) => (
                            <TicketCard key={ticket.id} ticket={ticket} />
                        ))}
                {action === "all" &&
                    uniqueTickets?.length &&
                    uniqueTickets.map((ticket) => (
                        <TicketCard key={ticket.id} ticket={ticket} />
                    ))}
            </div>
        </>
    );
}
