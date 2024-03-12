import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

export function TicketCard({ ticket }) {
    const ticketStyle = {
        width: "100%",
        margin: "20px",
    };
    return (
        <Card style={ticketStyle}>
            <CardActionArea>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {ticket.created_at}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                        {ticket.description}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
