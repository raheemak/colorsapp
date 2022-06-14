import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import APIContext from '../store/APIContext';

export default function ByColorResults(props) {
  const [data, setData] = React.useState([])
  const apiContext = React.useContext(APIContext)

  React.useEffect(() => {

    const requestOptions = {
      headers: {
        'Content-Type': 'application/json'
//        'Authorization': apiContext.authorization
      },
    };

    fetch(`${apiContext.api_url}/api/v1/color/${props.colorProp}`, requestOptions)
      .then((res) => res.json())
      .then((res) => { setData(res.groups) });
  }, [props.colorProp]);

  return (
    <TableContainer component={Paper} sx={{ width: "75%", boxShadow: `0px 2px 1px -1px rgb(0 0 0 / 20%), 1px 1px 1px 1px ${props.colorProp}, 1px 1px 3px 1px rgb(0 0 0 / 12%)` }}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Group Name</TableCell>
            <TableCell align="right">User Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>

          {Object.keys(data).map(group => <TableRow
            key={group}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          ><TableCell component="th" scope="row">
              {group}
            </TableCell>
            <TableCell align="right">
              <Table sx={{ minWidth: 500 }} aria-label="simple table">
                {data[group].map(person => {
                  return (
                    <TableRow >
                      <TableCell align="right" sx={{ padding: "2px 10px", borderBottom: "none" }}>
                        {person}
                      </TableCell>
                    </TableRow>)
                })}
              </Table>
            </TableCell>
          </TableRow>)}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
