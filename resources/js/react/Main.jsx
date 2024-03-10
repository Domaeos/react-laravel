import axios from "axios";
import Login from "./Components/Login";
import { useEffect, useState } from "react";
import { Router, Route } from "react-router-dom";

function Main() {
    const [loading, setLoading] = useState(true);
    const [tickets, setTickets] = useState([]);

    // useEffect(() => {
    //     getAllTickets(setLoading, setTickets);
    // }, []);

    // if (loading) return <>Fetching tickets</>;

    return (
        <>
            <Login />
        </>
    );
}

async function getAllTickets(setLoading, setTickets) {
    try {
        const result = (await axios.get("/api/tickets")).data;
        setTickets(result);
        setLoading(false);
    } catch (e) {
        console.log(e);
    }
}

export default Main;
