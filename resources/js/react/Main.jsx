import axios from "axios";
import Login from "./Components/Login";
import { useEffect, useState } from "react";
import { Router, Route, Routes } from "react-router-dom";
import { tokenCheck } from "../api/api";

function Main() {
    const [loading, setLoading] = useState(true);

    const [cookieRefresh, setCookieRefresh] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        const token = document.cookie
            .split("; ")
            .find((row) => row.startsWith("user_token="))
            ?.split("=")[1];
        if (token) {
            tokenCheck(token, setLoggedIn);
        }
    }, [cookieRefresh]);

    return (
        <>
            <Login setCookieRefresh={setCookieRefresh} loggedIn={loggedIn} />
            <Routes>
                <Route path="/" element={<h1>Home</h1>} />
                <Route path="/login" element={<h1>Home</h1>} />
                <Route path="/users" element={<h1>Users</h1>} />
                <Route path="/tickets" element={<h1>Tickets</h1>} />
            </Routes>
        </>
    );
    <App />;
}

export default Main;
