import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';

const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const ResponsiveAppBar = () => {
  

    return (
        <AppBar position="static" sx={{backgroundColor: "white"}}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                                  <div className="container">
                            <span style={{color:"#FF0000"}}>C</span>
                            <span style={{color:"#66CC66"}}>O</span>
                            <span style={{color:"#FF9966"}}>L</span>
                            <span style={{color:"#FFCCCC"}}>O</span>
                            <span style={{color:"#FF0066"}}>R</span>
                            <span style={{color:"#FFCCCC"}}>S</span>
                            <span style={{color:"#FF0000"}}>A</span>
                            <span style={{color:"#66CC66"}}>P</span>
                            <span style={{color:"#FF9966"}}>P</span>
                        </div>
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>


                    </Box>
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                                  <div className="container">
                            <span style={{color:"#FF0000"}}>C</span>
                            <span style={{color:"#66CC66"}}>O</span>
                            <span style={{color:"#FF9966"}}>L</span>
                            <span style={{color:"#FFCCCC"}}>O</span>
                            <span style={{color:"#FF0066"}}>R</span>
                            <span style={{color:"#FFCCCC"}}>S</span>
                            <span style={{color:"#FF0000"}}>A</span>
                            <span style={{color:"#66CC66"}}>P</span>
                            <span style={{color:"#FF9966"}}>P</span>
                        </div>
                    </Typography>


                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default ResponsiveAppBar;
