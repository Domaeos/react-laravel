import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { trimDate } from "../../utils/utils";

export function ThreadCard({ thread }) {
    return (
        <div className="thread-card-grid">
            <Card className={`thread-card ${thread.written_by}`}>
                <CardContent>
                    <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        className="thread-card-header"
                    >
                        <div className="thread-card-date">
                            {trimDate(thread.created_at)}
                        </div>
                        <div className="thread-card-author"></div>
                    </Typography>

                    <Typography
                        variant="body2"
                        className="thread-card-body"
                        color="text.secondary"
                    >
                        {thread.description}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
}
