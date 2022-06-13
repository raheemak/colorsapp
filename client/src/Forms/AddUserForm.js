import * as React from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';

export default function AddUserForm() {

  const [username, setUsername] = React.useState("")
  const [group, setGroup] = React.useState("")
  const [color, setColor] = React.useState("")
  const [response, setResponse] = React.useState({ username: "", color: "", group: "" })
  const [submitted, setSubmitted] = React.useState(false)
  const [showError, setShowError] = React.useState(false)
  const submitHandler =  () => {
    
    //make sure none of the fields are empty 
    if (group === "" || color === "" || username === "") {
      setShowError(true)
      setSubmitted(false)
      return;
    }
    setSubmitted(true);
    setShowError(false)


    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json',
      'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjZ3TTZRV2w5dHVLM3pLcGFWLWNXNiJ9.eyJpc3MiOiJodHRwczovL2Rldi1uemU1dmZ4eS51cy5hdXRoMC5jb20vIiwic3ViIjoiTGJDTmJ3cGZ1VEtOdlVPT09UUlhOZEYzUk1SejZIZjNAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vY29sb3JzYXBwcmFoZWVtYS5oZXJva3VhcHAuY29tLyIsImlhdCI6MTY1NTA4MDE1MSwiZXhwIjoxNjU1MTY2NTUxLCJhenAiOiJMYkNOYndwZnVUS052VU9PT1RSWE5kRjNSTVJ6NkhmMyIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyJ9.SQyWdRhREVBr3TH33ikIKghXE81xGf9bDPmS7Bd4m9LiSWUCR9TI2N1i6Xq3JL6jdTcoQn0gEq092N7PRMqJXQutg5KZrsOVobXv49qMoW-_7lHPEWQnTZHgtHvHzXy2eUKmm5WhtbyAGZep_ic3DwVk_slXXC_2nFa4J7NZitGJ-8VItGwbICEjMnYaDe6qzicnpinduX8kn6UznajMWoOsnOUm8b7VIUBB4mTVWPQIfU3YnS8qQ5-tDFwb0jdIUHyeE_2H1Y1U3YH_Yr7Kwd-747nOSUOoeThv1ZNwYi8t330NUUKHLall8rhPuvKZgmRSwxmNwwS2l73DuT4T3w' },
    };
     fetch(`/api/v1/user?username=${username}&color=${color}&group=${group}`, requestOptions)
      .then(response => response.json())
      .then(data => { setResponse(data)  });

     

  }

  const usernameHandler = (event) => {
    let usernameString = event.target.value.trim()
    //remove special characters and numbers
    usernameString = usernameString.replace(/[^a-zA-Z ]/g, "")
    //capitalize first letter only 
    usernameString = usernameString.charAt(0).toUpperCase() + usernameString.slice(1).toLowerCase()
    setUsername(usernameString)
    if (username === "")
      setShowError(true)

  }

  const groupHandler = (event) => {
    let groupString = event.target.value.trim()
    //remove special characters
    groupString = groupString.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
    //capitalize first letter only 
    groupString = groupString.charAt(0).toUpperCase() + groupString.slice(1).toLowerCase()
    setGroup(groupString)
    setSubmitted(false)
    if (group === "")
      setShowError(true)

  }

  const colorHandler = (event) => {
    let colorString = event.target.value.trim().toLowerCase()
    //remove special characters and numbers
    colorString = colorString.replace(/[^a-zA-Z ]/g, "")
    setColor(colorString)
    setSubmitted(false)
    if (color === "")
      setShowError(true)
  }

  const description = () => {
    if (showError) {
      return <Alert variant="outlined" severity="error">
        Please enter required fields.
      </Alert>
    }
    else if (submitted) {
      return <Alert variant="outlined" severity="success">
        User added!
      </Alert>

    } else {
      return <p>Enter information below to get started.</p>
    }
  }
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <div style={{ paddingBottom: "10px" }}>
          {description()}
        </div>
      </Grid>
      <Grid item xs={12}>
        <form>
          <Stack direction="row" spacing={2} alignItems="center" justifyContent="center">

            <TextField label="User Name" variant="filled" color={(showError && username === "") ? "error" : "success"} focused onChange={usernameHandler} />
            <TextField label="Group" variant="filled" color={(showError && group === "") ? "error" : "success"} focused onChange={groupHandler} />
            <TextField label="Color" variant="filled" color={(showError && color === "") ? "error" : "success"} focused onChange={colorHandler} />
          </Stack>
          <div style={{ paddingTop: "5px" }}>
            <Button variant="contained" onClick={submitHandler} style={{ backgroundColor: "#65cc66" }}>Submit</Button>
          </div>

        </form>

      </Grid>
      {(submitted && !showError) && <Grid item xs={12} >
        <Card sx={{ minWidth: 500, boxShadow: `0px 2px 1px -1px rgb(0 0 0 / 20%), 1px 1px 1px 1px ${color}, 1px 1px 3px 1px rgb(0 0 0 / 12%)` }}>
          <CardContent>

            <Typography variant="h5" component="div" sx={{ color: color }}>
              Added User Information
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              Username: {response.username}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              Group: {response.group}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              Color: {response.color}
            </Typography>

          </CardContent>

        </Card>
      </Grid>
      }
    </Grid >
  )
}
