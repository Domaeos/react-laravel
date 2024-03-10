import { TextField, Button } from "@mui/material";
import { useState } from "react";
import { Box } from "@mui/material";
import axios from "axios";

export default function Login() {
    const csrf = document.getElementById("csrf-meta").content;
    axios.defaults.headers.common["X-CSRF-TOKEN"] = csrf;

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleClick(e) {
        e.preventDefault();
        axios
            .post("/api/login", {
                email,
                password,
            })
            .then((e) => {
                console.log(e);
            })
            .catch((e) => {
                console.log(e);
            });
    }

    return (
        <>
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
                <Button type="submit" onClick={handleClick} variant="contained">
                    Login
                </Button>
            </Box>
        </>
    );
}
