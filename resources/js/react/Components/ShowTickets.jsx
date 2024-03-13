import { useEffect } from "react";
import { TicketCard } from "./TicketCard";

export function ShowTickets({ action, tickets }) {
    return (
        <>
            <div className="ticket-grid">
                {action === "open" &&
                    tickets?.length &&
                    tickets
                        .filter((x) => !x.closed)
                        .map((ticket) => (
                            <TicketCard key={ticket.id} ticket={ticket} />
                        ))}
                {action === "resolved" &&
                    tickets?.length &&
                    tickets
                        .filter((x) => x.resolved)
                        .map((ticket) => (
                            <TicketCard key={ticket.id} ticket={ticket} />
                        ))}
                {action === "all" &&
                    tickets?.length &&
                    tickets.map((ticket) => (
                        <TicketCard key={ticket.id} ticket={ticket} />
                    ))}
            </div>
        </>
    );
}
