import axios from "axios";

export async function getThread(threadId) {
    try {
        axios;
    } catch (e) {
        console.log(e);
    }
}

export async function submitTicket(description) {
    try {
        console.log("submitting");
        const post = await axios.post("/api/tickets/", { description });
        console.log(post);
    } catch (e) {
        console.log(e);
    }
}

export async function tokenCheck(token, setLoggedIn) {
    const returnData = await axios
        .post("/api/login", {
            user_token: token,
        })
        .then((result) => {
            axios.defaults.headers.common["user_token"] = token;
            setLoggedIn(true);
            return { token, ...result.data.user };
        })
        .catch((e) => {
            // if (e.response.status === 400) {
            //     // Bad token
            // }
        });
    return returnData;
}

export async function getAllTickets(setTickets, setIsLoading) {
    try {
        const results = await axios.get("/api/tickets");
        console.log(results.data);
        return results.data;
    } catch (e) {
    } finally {
        setIsLoading(false);
    }
}

export async function getTicketsBy() {}

export async function login(setCookieRefresh, { email, password }) {
    const user = await axios
        .post("/api/login", {
            email,
            password,
        })
        .then((result) => {
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
            return result;
        })
        .catch((e) => {});
}
