import { Box, Container, Grid, ThemeProvider } from "@mui/material";
import NavBar from "./components/NavBar/NavBar";
import { theme } from "./Theme";
import MaterialForm from "./components/MaterialForm/MaterialForm";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Box bgcolor="ochre.light" sx={{ flexGrow: 1 }}>
        <Grid container>
          <Grid className="app-header" size={12}>
            <NavBar></NavBar>
          </Grid>
          <Grid className="app-body" size={12}>
            <Container maxWidth="sm">
              <Box sx={{ height: "100vh", mt: "24px" }}>
                <MaterialForm></MaterialForm>
              </Box>
            </Container>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}

export default App;
