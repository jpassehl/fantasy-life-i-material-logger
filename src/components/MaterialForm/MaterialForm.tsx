import {
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  ListItemIcon,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";
import {
  gatheringLives,
  materialCategories,
  materialTypes,
} from "../../constants";

const MaterialForm = () => {
  const { register, handleSubmit } = useForm();

  return (
    <Container sx={{ bgcolor: "white", height: "100%", width: 2 / 3 }}>
      <form onSubmit={handleSubmit((data) => console.log(data))}>
        <TextField
          label="Name"
          variant="standard"
          margin="dense"
          sx={{ width: "60%" }}
        />
        <FormControl margin="dense" variant="standard" sx={{ width: "60%" }}>
          <InputLabel>Type</InputLabel>
          <Select label="Type">
            {Object.entries(materialTypes).map(([key, value]) => (
              <MenuItem key={key} value={value}>
                {value}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormGroup>
          <FormControlLabel control={<Checkbox />} label="Gatherable" />
        </FormGroup>
        <TextField
          id="outlined-textarea"
          label="Gathered From"
          variant="standard"
          margin="dense"
          multiline
          sx={{ width: "60%" }}
        />

        <FormControl margin="dense" variant="standard" sx={{ width: "60%" }}>
          <InputLabel>Life Required</InputLabel>
          <Select label="Life Required">
            <MenuItem key="ANY" value="Any">
              Any
            </MenuItem>
            {Object.entries(gatheringLives).map(([key, value]) => (
              <MenuItem key={key} value={value}>
                {value}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl margin="dense" variant="standard" sx={{ width: "60%" }}>
          <InputLabel>Category</InputLabel>
          <Select label="Category">
            {Object.entries(materialCategories).map(([key, value]) => (
              <MenuItem key={key} value={value}>
                {value}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </form>
    </Container>
  );
};

export default MaterialForm;
