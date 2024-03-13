import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { trimDate } from "../../utils/utils";

export function TicketCard({ ticket }) {
    function handleClick(e) {
        console.log(e);
    }

    return (
        <Card className="ticket-card">
            <CardActionArea
                component={Link}
                to={`/tickets/thread/${ticket.thread_id}`}
            >
                <CardContent>
                    <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        className="ticket-card-header"
                    >
                        <div className="ticket-card-date">
                            {trimDate(ticket.created_at)}
                        </div>
                        <div className="ticket-card-author"></div>
                    </Typography>

                    <Typography
                        variant="body2"
                        className="ticket-card-body"
                        color="text.secondary"
                    >
                        {ticket.description}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
