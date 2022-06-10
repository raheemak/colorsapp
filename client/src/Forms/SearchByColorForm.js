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
    setShowTable (true)
  };

  React.useEffect(() => {
    fetch("/api/v1/colors")
      .then((res) => res.json())
      .then((data) => { console.log(data); setColors(data.colors) });
  }, []);




  return (
    <div>
      <FormControl size="small" color="success" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-helper-label">Color</InputLabel>
        <Select 
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          sx={{color: {color}, fontSize:".75rem"}}
          value={color}
          label="Color"
          onChange={handleChange}
          
        >
          <MenuItem value="" sx={{fontSize:".75rem"}}
>
            <em>None</em>
          </MenuItem>

          {colors && colors.map(color => <MenuItem value={color} sx={{color: {color}, fontSize:".75rem"}}>{color}</MenuItem>)}
        </Select>
        <FormHelperText>Select a color. Select none to view all users.</FormHelperText>
      </FormControl>
      <Stack direction="row" spacing={2} alignItems="center" justifyContent="center">
        {(color != "" &&showTable) && <ByColorResults colorProp={color} />}
        {(color === ""&&showTable) && <AllUsersResults colorProp={color} />}
      </Stack>
    </div>
  );
}