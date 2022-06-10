import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';


const ResponsiveAppBar = () => {

    return (
        <AppBar position="static" sx={{backgroundColor: "white"}}>
            <Container >
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
                            minHeight: '30px'
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
