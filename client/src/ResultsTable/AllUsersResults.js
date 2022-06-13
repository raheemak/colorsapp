import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


export default function AllUsersResults(props) {

  const [data, setData] = React.useState([])

  const requestOptions = {
    headers: { 'Content-Type': 'application/json',
    'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjZ3TTZRV2w5dHVLM3pLcGFWLWNXNiJ9.eyJpc3MiOiJodHRwczovL2Rldi1uemU1dmZ4eS51cy5hdXRoMC5jb20vIiwic3ViIjoiTGJDTmJ3cGZ1VEtOdlVPT09UUlhOZEYzUk1SejZIZjNAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vY29sb3JzYXBwcmFoZWVtYS5oZXJva3VhcHAuY29tLyIsImlhdCI6MTY1NTA4MDE1MSwiZXhwIjoxNjU1MTY2NTUxLCJhenAiOiJMYkNOYndwZnVUS052VU9PT1RSWE5kRjNSTVJ6NkhmMyIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyJ9.SQyWdRhREVBr3TH33ikIKghXE81xGf9bDPmS7Bd4m9LiSWUCR9TI2N1i6Xq3JL6jdTcoQn0gEq092N7PRMqJXQutg5KZrsOVobXv49qMoW-_7lHPEWQnTZHgtHvHzXy2eUKmm5WhtbyAGZep_ic3DwVk_slXXC_2nFa4J7NZitGJ-8VItGwbICEjMnYaDe6qzicnpinduX8kn6UznajMWoOsnOUm8b7VIUBB4mTVWPQIfU3YnS8qQ5-tDFwb0jdIUHyeE_2H1Y1U3YH_Yr7Kwd-747nOSUOoeThv1ZNwYi8t330NUUKHLall8rhPuvKZgmRSwxmNwwS2l73DuT4T3w' },
  };  React.useEffect(() => {
    fetch(`/api/v1/color/${props.colorProp}`, requestOptions)
      .then((res) => res.json())
      .then((data) => {  setData(data.result); });
  }, []);

  return (
    <TableContainer component={Paper} sx={{ width: "75%", boxShadow: `0px 2px 1px -1px rgb(0 0 0 / 20%), 1px 1px 1px 1px ${props.colorProp}, 1px 1px 3px 1px rgb(0 0 0 / 12%)` }}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Color</TableCell>
            <TableCell align="right">User Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>


          {Object.keys(data).map(color => <TableRow
            key={color}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          ><TableCell component="th" scope="row" sx={{ color: color, fontSize: ".75rem" }}>
              {color}
            </TableCell>
            <TableCell align="right">
              <Table sx={{ minWidth: 500 }} aria-label="simple table">
                {data[color].map(group => {
                  return <TableRow sx={{ padding: "2px 10px", borderBottom: "1px solid rgba(224, 224, 224, 1)" }}> 
                  <TableCell align="left" sx={{ padding: "2px 10px", borderBottom: "none", fontSize: ".75rem" }}>
                    {Object.keys(group)}
                  </TableCell>
                    {Object.keys(group).map(user => {
                      return <TableCell align="right" sx={{ padding: "2px 10px", borderBottom: "none" }}>
                        {group[user].map(user =>
                        <Table>
                          <TableRow>
                            <TableCell align="right" sx={{ padding: "2px 10px", borderBottom: "none", fontSize: ".75rem" }}>
                              {user}
                            </TableCell>
                          </TableRow>
                        </Table>)}
                      </TableCell>
                    })}
                  </TableRow>
                })}
              </Table>
            </TableCell>
          </TableRow>)}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
