import { useEffect } from "react";
import { TicketCard } from "./TicketCard";

export function ShowTickets({ action, tickets }) {
    const gridStyle = {
        display: "grid",
        width: "80vw",
    };
    return (
        <>
            <div className="ticket-grid" style={gridStyle}>
                {tickets.length &&
                    tickets.map((ticket) => (
                        <TicketCard key={ticket.id} ticket={ticket} />
                    ))}
            </div>
        </>
    );
}
