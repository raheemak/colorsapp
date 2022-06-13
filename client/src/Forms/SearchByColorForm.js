import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import * as React from 'react';
import ByColorResults from "../ResultsTable/ByColorResults"
import AllUsersResults from "../ResultsTable/AllUsersResults"
import Stack from '@mui/material/Stack';

export default function SearchByColorForm() {
  const [color, setColor] = React.useState('');
  const [colors, setColors] = React.useState([])
  const [showTable, setShowTable] = React.useState(false)

  const handleChange = (event) => {
    setColor(event.target.value);
  };

  React.useEffect(() => {

    const requestOptions = {
      headers: { 'Content-Type': 'application/json',
      'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjZ3TTZRV2w5dHVLM3pLcGFWLWNXNiJ9.eyJpc3MiOiJodHRwczovL2Rldi1uemU1dmZ4eS51cy5hdXRoMC5jb20vIiwic3ViIjoiTGJDTmJ3cGZ1VEtOdlVPT09UUlhOZEYzUk1SejZIZjNAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vY29sb3JzYXBwcmFoZWVtYS5oZXJva3VhcHAuY29tLyIsImlhdCI6MTY1NTA4MDE1MSwiZXhwIjoxNjU1MTY2NTUxLCJhenAiOiJMYkNOYndwZnVUS052VU9PT1RSWE5kRjNSTVJ6NkhmMyIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyJ9.SQyWdRhREVBr3TH33ikIKghXE81xGf9bDPmS7Bd4m9LiSWUCR9TI2N1i6Xq3JL6jdTcoQn0gEq092N7PRMqJXQutg5KZrsOVobXv49qMoW-_7lHPEWQnTZHgtHvHzXy2eUKmm5WhtbyAGZep_ic3DwVk_slXXC_2nFa4J7NZitGJ-8VItGwbICEjMnYaDe6qzicnpinduX8kn6UznajMWoOsnOUm8b7VIUBB4mTVWPQIfU3YnS8qQ5-tDFwb0jdIUHyeE_2H1Y1U3YH_Yr7Kwd-747nOSUOoeThv1ZNwYi8t330NUUKHLall8rhPuvKZgmRSwxmNwwS2l73DuT4T3w' },
    };

    fetch("/api/v1/colors", requestOptions)
      .then((res) => res.json())
      .then((data) => { setColors(data.colors) });
  }, []);


  return (
    <div>
      <FormControl size="small" color="success" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-helper-label">Color</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          sx={{ color: { color }, fontSize: ".75rem" }}
          value={color}
          label="Color"
          onChange={handleChange} >
          <MenuItem value="" sx={{ fontSize: ".75rem" }}>
            <em>None</em>
          </MenuItem>
          {colors && colors.map(color =>
            <MenuItem value={color} sx={{ color: { color }, fontSize: ".75rem" }}>
              {color}
            </MenuItem>)}
        </Select>
        <FormHelperText>
          Select a color. Select none to view all users.
        </FormHelperText>
      </FormControl>
      <Stack direction="row" spacing={2} alignItems="center" justifyContent="center">
        {(color != "") && <ByColorResults colorProp={color} />}
        {(color === "") && <AllUsersResults colorProp={color} />}
      </Stack>
    </div>
  );
}