import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ChatView } from "../views/ChatView";

export function RoutesView() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<ChatView />} path="/chat" />
            </Routes>
        </BrowserRouter>
    )
}