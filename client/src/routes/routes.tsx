import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ChatView } from "../views/ChatView";
import StartPage from "../views/StartPage";
import { Auth } from "../views/Auth";

export function RoutesView() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Auth />} path="/auth/:method" />
                <Route element={<ChatView />} path="/chat" />
                <Route element={<StartPage />} path="/" />
            </Routes>
        </BrowserRouter>
    )
}