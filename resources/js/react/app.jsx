import ReactDOM from "react-dom/client";
import Main from "./Main";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./Components/UserProvider.jsx";
import "../../css/app.css";

ReactDOM.createRoot(document.getElementById("app")).render(
    <BrowserRouter>
        <UserProvider>
            <Main />
        </UserProvider>
    </BrowserRouter>
);
