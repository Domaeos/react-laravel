import { Backdrop } from "@mui/material";
import { CircularProgress } from "@mui/material";
export function Loader({ open }) {
    return (
        <>
            <Backdrop
                sx={{
                    color: "#fff",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
                open={open}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </>
    );
}
