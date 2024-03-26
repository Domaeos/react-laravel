import axios from "axios";
import Login from "./Components/Login";
import { useContext, useEffect, useState } from "react";
import { Router, Route, Routes } from "react-router-dom";
import { tokenCheck } from "../api/api";
import { UserContext } from "./Components/UserProvider";
import { Tickets } from "./Components/Tickets";
import { Thread } from "./Components/Thread";
import NavBar from "./Components/Navbar";
import { TicketActions } from "./Components/TicketActions";
import { Paper } from "@mui/material";

function Main() {
    const { user, setUser } = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(true);
    const [currentAction, setCurrentAction] = useState("");

    const [cookieRefresh, setCookieRefresh] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        const token = document.cookie
            .split("; ")
            .find((row) => row.startsWith("user_token="))
            ?.split("=")[1];
        if (token) {
            tokenCheck(token, setLoggedIn)
                .then((x) => {
                    axios.defaults.headers.common["user_token"] = x.token;
                    console.log(x);
                    setUser(() => x);
                })
                .catch((e) => {
                    document.cookie = `user_token=; max-age=0; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/;`;
                })
                .finally(() => {
                    setIsLoading(() => false);
                });
        }
    }, [cookieRefresh]);

    if (isLoading) return <></>;

    return (
        <>
            <NavBar />
            <div className="main-grid">
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
                    {user && (
                        <Route path="/tickets">
                            <Route
                                path="thread/:threadId"
                                element={
                                    (
                                        <Thread
                                            currentAction={currentAction}
                                            setCurrentAction={setCurrentAction}
                                        />
                                    ) && (
                                        <Paper
                                            sx={{
                                                position: "fixed",
                                                bottom: 0,
                                                left: 0,
                                                right: 0,
                                            }}
                                            elevation={3}
                                        >
                                            <TicketActions
                                                level={user.level}
                                                currentAction={currentAction}
                                                setCurrentAction={
                                                    setCurrentAction
                                                }
                                            />
                                        </Paper>
                                    )
                                }
                            />
                            <Route
                                path=""
                                element={
                                    (
                                        <Tickets
                                            currentAction={currentAction}
                                        />
                                    ) && (
                                        <Paper
                                            sx={{
                                                position: "fixed",
                                                bottom: 0,
                                                left: 0,
                                                right: 0,
                                            }}
                                            elevation={3}
                                        >
                                            <TicketActions
                                                level={user.level}
                                                currentAction={currentAction}
                                                setCurrentAction={
                                                    setCurrentAction
                                                }
                                            />
                                        </Paper>
                                    )
                                }
                            />
                        </Route>
                    )}
                </Routes>
            </div>
        </>
    );
}

export default Main;
