import { Box, Grid } from "@mui/material";
import NavBar from "./components/NavBar.tsx/NavBar";

function App() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container>
        <Grid bgcolor={"coral"} size={12}>
          {/* Header, size=12 */}
          <NavBar></NavBar>
        </Grid>
        <Grid bgcolor={"yellow"} size={6}>
          Sidebar, size=6
        </Grid>
        <Grid bgcolor={"blue"} size={6}>
          Main Content, size=6
        </Grid>
      </Grid>
    </Box>
  );
}

export default App;
