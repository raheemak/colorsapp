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

  const [username, setUsername] = React.useState()
  const [group, setGroup] = React.useState()
  const [color, setColor] = React.useState()
  const [response, setResponse] = React.useState({ result: { username: "", color: "", group: "" } })
  const [submitted, setSubmitted] = React.useState(false)
  const [showError, setShowError] = React.useState(false)
  const submitHandler = () => {
    setSubmitted(true)

    //make sure none of the fields are empty 
    if (group === "" || color == null || username == null) {
      setShowError(true)
      return;
    }
    setShowError(false)
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    };
    fetch(`/api/v1/user?username=${username}&color=${color}&group=${group}`, requestOptions)
      .then(response => response.json())
      .then(data => setResponse(data));

  }

  const usernameHandler = (event) => {
    setUsername(event.target.value.trim())
    setSubmitted(false)

  }

  const groupHandler = (event) => {
    setGroup(event.target.value.trim())
    setSubmitted(false)


  }

  const colorHandler = (event) => {
    setColor(event.target.value.trim())
    setSubmitted(false)

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

        <form>
          <div style={{ paddingBottom: "10px" }}>
            {description()}
          </div>

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
        <Card sx={{ minWidth: 500 ,boxShadow: `0px 2px 1px -1px rgb(0 0 0 / 20%), 1px 1px 1px 1px ${color}, 1px 1px 3px 1px rgb(0 0 0 / 12%)`}}>
          <CardContent>

            <Typography variant="h5" component="div" sx={{color: color}}>
              User information
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              <p>Username:    {response.username}</p>
              <p>Group: {response.group}</p>
              <p>Color: {response.color}</p>

            </Typography>

          </CardContent>

        </Card>
      </Grid>
      }
    </Grid >
  )
}
