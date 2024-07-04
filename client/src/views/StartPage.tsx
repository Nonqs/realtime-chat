import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { Button, IconButton, Tooltip } from '@mui/material';
import DarkModeToggle from '../components/DarkModeSw';

export default function StartPage() {

    const toolTipText = "This chat application works using socket.io, a library that enables real-time, bidirectional communication between clients and the server. When a user opens the chat, they connect to the server via a WebSocket. To see it in action, open the chat page in two browser tabs, log in as user1 in one tab and User2 in the other. Messages sent from one user will instantly appear in the other user's chat window, demonstrating real-time communication."

    return (
        <section className="w-full h-[100vh] flex flex-col justify-center items-center bg-gradient-to-r from-[#ddd6fe]  to-white to-90%">
            <div className='h-1/2 w-full flex flex-col justify-center items-center'>
                <h1 className="text-center uppercase font-extrabold text-transparent text-6xl bg-clip-text bg-gradient-to-r from-[#2563eb] to-pink-600">Welcome to <br />Nest Chat!</h1>
                <article className='flex justify-center items-center'>
                    <span className="text-lg font-thin">How it works</span>
                    <Tooltip title={toolTipText}>
                        <IconButton>
                            <HelpOutlineIcon />
                        </IconButton>
                    </Tooltip>
                </article>
            </div>
            <div className='h-1/2 flex flex-col'>
                <Button
                    component="label"
                    variant="contained"
                    tabIndex={-1}
                    sx={{
                        backgroundColor: "#2563eb",
                        '&:hover': {
                            backgroundColor: '#60a5fa',
                        },
                        color: "white",
                        marginBottom: "2em"
                    }}
                >
                    Usuario 1
                </Button>
                <Button
                    component="label"
                    variant="contained"
                    tabIndex={-1}
                    sx={{
                        backgroundColor: "#db2777",
                        '&:hover': {
                            backgroundColor: '#fb7185',
                        },
                        color: "white"
                    }}
                >
                    Usuario 2
                </Button>
            </div>
        </section>
    )
}