import axios from "axios";

export async function tokenCheck(token, setLoggedIn) {
    axios
        .post("/api/login", {
            user_token: token,
        })
        .then((result) => {
            setLoggedIn(true);
        })
        .catch((e) => {
            console.log(e.response.status);
            if (e.response.status === 400) {
                console.log("Bad token");
            } else {
                console.log(e);
            }
        });
}

export async function getAllTickets(setLoading, setTickets) {
    try {
        const result = (await axios.get("/api/tickets")).data;
        setTickets(result);
        setLoading(false);
    } catch (e) {
        console.log(e);
    }
}

export async function login(setCookieRefresh, { email, password }) {
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
