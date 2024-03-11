import axios from "axios";
import Login from "./Components/Login";
import { useContext, useEffect, useState } from "react";
import { Router, Route, Routes } from "react-router-dom";
import { tokenCheck } from "../api/api";
import { UserContext } from "./Components/UserProvider";
import { Tickets } from "./Components/Tickets";
import NavBar from "./Components/Navbar";

function Main() {
    const { user, setUser } = useContext(UserContext);
    const [loading, setLoading] = useState(false);

    const [cookieRefresh, setCookieRefresh] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        const token = document.cookie
            .split("; ")
            .find((row) => row.startsWith("user_token="))
            ?.split("=")[1];
        if (token) {
            tokenCheck(token, setLoggedIn).then((x) => {
                console.log(x);
                axios.defaults.headers.common["user_token"] = x.token;
                setUser(x);
                console.log(user);
            });
        }
    }, [cookieRefresh]);

    return (
        <>
            <NavBar />
            <Routes>
                <Route path="/" element={<h1>Home</h1>} />
                <Route
                    path="/login"
                    element={
                        <Login
                            setCookieRefresh={setCookieRefresh}
                            loggedIn={loggedIn}
                        />
                    }
                />
                <Route path="/users" element={<h1>Users</h1>} />
                <Route path="/users" element={<h1>Users</h1>} />
                <Route path="/tickets" element={user && <Tickets />} />
            </Routes>
        </>
    );
}

export default Main;
