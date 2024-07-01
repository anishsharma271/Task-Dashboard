import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';


export default function Header() {
    const token = localStorage.getItem("token")
    const navigate = useNavigate()
    return (
        <Box sx={{ flexGrow: 1, backgroundColor: "#00183f" }}>
            <AppBar position="static" >
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
                        Task
                    </Typography>
                    {token && <button className='btn btn-danger' onClick={() => (navigate("/"), localStorage.clear())}>Logout</button>}

                </Toolbar>
            </AppBar>
        </Box>
    );
}
