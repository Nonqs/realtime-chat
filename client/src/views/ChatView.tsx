import { Chat } from "../components/Chat";
import ChatsDrawer from "../components/ChatsDrawer";


export function ChatView() {

    return (
        <section className="flex h-[100vh]">
            <ChatsDrawer />
            <Chat />
        </section>
    )
}