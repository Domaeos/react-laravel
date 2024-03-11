import { TextField, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { login } from "../../api/api";
import axios from "axios";

export default function Login({ setCookieRefresh, loggedIn }) {
    const csrf = document.getElementById("csrf-meta").content;
    axios.defaults.headers.common["X-CSRF-TOKEN"] = csrf;

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleClick(e) {
        e.preventDefault();
        login(setCookieRefresh, { email, password });
    }

    return (
        <>
            {!loggedIn && (
                <Box
                    component="form"
                    sx={{
                        "& .MuiTextField-root": { m: 1, width: "25ch" },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField
                        id="email"
                        required
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                        variant="standard"
                    />
                    <TextField
                        id="standard-basic"
                        required
                        type="password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                        label="Password"
                        variant="standard"
                    />
                    <Button
                        type="submit"
                        onClick={handleClick}
                        variant="contained"
                    >
                        Login
                    </Button>
                </Box>
            )}
        </>
    );
}
