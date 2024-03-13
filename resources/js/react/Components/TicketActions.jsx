import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DoneIcon from "@mui/icons-material/Done";
import TocIcon from "@mui/icons-material/Toc";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";

export const TicketActions = ({ level, currentAction, setCurrentAction }) => {
    return (
        <BottomNavigation
            showLabels
            value={currentAction}
            onChange={(_, newAction) => {
                setCurrentAction(newAction);
            }}
        >
            <BottomNavigationAction
                value="open"
                label="Open"
                icon={<ImportContactsIcon />}
            />
            <BottomNavigationAction
                value="resolved"
                label="Resolved"
                icon={<DoneIcon />}
            />
            {level === 0 && (
                <BottomNavigationAction
                    value="new"
                    label="New"
                    icon={<AddIcon />}
                />
            )}
            <BottomNavigationAction
                value="all"
                label="All"
                icon={<TocIcon />}
            />
        </BottomNavigation>
    );
};
