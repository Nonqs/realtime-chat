export default function HowItWorks() {
  const toolTipText =
    "This chat application works using socket.io, a library that enables real-time, bidirectional communication between clients and the server. When a user opens the chat, they connect to the server via a WebSocket. To see it in action, open the chat page in two browser tabs, log in as user1 in one tab and User2 in the other. Messages sent from one user will instantly appear in the other user's chat window, demonstrating real-time communication.";

  return (
    <div className="flex flex-col w-full backdrop-filter backdrop-blur-2xl bg-white bg-opacity-30 p-4 drop-shadow-2xl rounded-xl border border-white">
      <h2 className="text-center font-semibold ">How it works</h2>
      <p >{toolTipText}</p>
    </div>
  );
}
