import { useState } from "react";
import { Chat } from "../components/Chat";
import ChatsDrawer from "../components/ChatsDrawer";
import { SelectChat } from "../components/SelectChat";

export function ChatView() {
  const [chat, setChat] = useState("");

  const handleChangeChat = (username: string) => {
    setChat(username);
  };

  return (
    <section className="flex h-[100vh]">
      <ChatsDrawer handleChangeChat={handleChangeChat} />
      {chat !== "" ? <Chat chat={chat} /> : <SelectChat />}
    </section>
  );
}
