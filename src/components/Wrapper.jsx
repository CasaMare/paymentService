import React from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { BottomNavigation, BottomNavigationAction, Grid } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import AccountMenu from './AccountMenu';


const Wrapper = ({logOut, isAuth}) => {


    return(
       <>
            <header>
                <AppBar component="nav">
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            sx={{ mr: 2, display: { sm: 'none' } }}
                        >
                        <MenuIcon />
                        </IconButton>
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                        >
                        <Link to="/" style={{textDecoration:"none",color:"#fff"}}>MUI</Link>  
                        </Typography>
                        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                            <Button key="1" sx={{ color: '#fff' }}>
                                <NavLink className={'nav-btn'} to="services">Services</NavLink>
                            </Button>
                            <Button key="2" sx={{ color: '#fff' }}>
                                <NavLink className={'nav-btn'} to="cabinet">Cabinet</NavLink>
                            </Button>
                            {!isAuth ? 
                                <Button key="3" sx={{ color: '#fff' }}  href="/auth">
                                    <LoginIcon/> Login
                                </Button>
                            :
                            <>
                            <Button key="3" sx={{ color: '#fff' }}  onClick={logOut}>
                                <LogoutIcon/> Logout
                            </Button>
                            <AccountMenu/>
                            </>
                            }
                        </Box>
                    </Toolbar>
                </AppBar>
            </header>   
            <Grid container>
                <Grid item xs={12}  >
                    <Box className="wrapper" component="main" >
                        <Toolbar />
                        <Typography component="div">
                        <Outlet/> 
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} >
                        <footer>
                            2022
                        </footer>
                </Grid>
            </Grid>
            </>
    );
}

export default Wrapper;