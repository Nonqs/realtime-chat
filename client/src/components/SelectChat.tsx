import { Box, Typography, Paper } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';

export function SelectChat() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      width="100%"
      bgcolor="#f0f0f0"
    >
      <Paper elevation={3} className="p-10 w-full h-full flex flex-col items-center justify-center text-center">
        <ChatIcon sx={{ fontSize: 80 }} />
        <Typography variant="h4" className="mt-4">
          NestChat
        </Typography>
        <Typography variant="body1" className="mt-2">
          Send and receive messages without keeping always online.
        </Typography>
        <Typography variant="body2" className="mt-4 text-gray-500">
        </Typography>
      </Paper>
    </Box>
  );
}
