import logo from './logo.svg';
import './App.css';
import React from "react";
import ResponsiveAppBar from "./Layout/Header"
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import AddUserForm from "./Forms/AddUserForm"
import SearchByColorForm from './Forms/SearchByColorForm';
import APIProvider from './store/APIProvider';

function App() {
  const [data, setData] = React.useState();
  const [showUserForm, setShowUserForm] =React.useState (false)
  const [showSearchForm, setShowSearchForm] = React.useState (false)
  
  React.useEffect(() => {
    console.log (process.env.NODE_ENV)
  }, []);

  const showEnterUserFormHandler = ()=>{
    setShowSearchForm(false)
    setShowUserForm (true)
  }

  const showSearchFormHandler = ()=>{
    setShowUserForm (false)
    setShowSearchForm(true)

  }

  return (
    <APIProvider>
    <div className="App">
      <ResponsiveAppBar />
      <Box sx={{ flexGrow: 1 }} style={{padding: "18px 36px"}}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Stack direction="row" spacing={2}   alignItems="center" justifyContent="center">
              <Button variant="contained" onClick = {showEnterUserFormHandler} style={{backgroundColor: "#65cc66"}}>Add User</Button>
              <Button variant="contained" onClick = {showSearchFormHandler} style={{backgroundColor: "#65cc66"}}>Search by Color</Button>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            {showUserForm  && <AddUserForm/>}
            {showSearchForm && <SearchByColorForm/>}
          </Grid>
        </Grid>
      </Box>
    </div>
    </APIProvider>
  );
}

export default App;