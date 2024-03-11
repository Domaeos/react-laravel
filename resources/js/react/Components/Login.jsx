import { TextField, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import axios from "axios";

export default function Login() {
    const csrf = document.getElementById("csrf-meta").content;
    axios.defaults.headers.common["X-CSRF-TOKEN"] = csrf;

    const [email, setEmail] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);
    const [password, setPassword] = useState("");
    const [cookieRefresh, setCookieRefresh] = useState(false);

    useEffect(() => {
        const token = document.cookie
            .split("; ")
            .find((row) => row.startsWith("user_token="))
            ?.split("=")[1];
        if (token) {
            axios
                .post("/api/login", {
                    user_token: token,
                })
                .then((result) => {
                    setLoggedIn(true);
                })
                .catch((e) => {
                    console.log(e);
                });
        }
    }, [cookieRefresh]);

    function handleClick(e) {
        e.preventDefault();
        axios
            .post("/api/login", {
                email,
                password,
            })
            .then((result) => {
                // console.log(result.data.user_token);
                if (result.data.user_token) {
                    document.cookie = `user_token=${
                        result.data.user_token
                    }; max-age=${60 * 60 * 24 * 365}; path=/;`;
                } else {
                    document.cookie = `user_token=${
                        result.data.authorization.token
                    }; max-age=${60 * 60 * 24 * 365}; path=/;`;
                }
                setCookieRefresh((x) => !x);
            })
            .catch((e) => {
                console.log(e);
            });
    }

    return (
        <>
            {loggedIn && <h1>Logged in</h1>}
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
