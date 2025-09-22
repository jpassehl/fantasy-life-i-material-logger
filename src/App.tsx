import { Box, Grid, ThemeProvider } from "@mui/material";
import NavBar from "./components/NavBar/NavBar";
import { theme } from "./Theme";
import MaterialForm from "./components/MaterialForm/MaterialForm";
import MaterialDataTable from "./components/MaterialDataTable/MaterialDataTable";
import materialService, { type Material } from "./services/MaterialService";
import { CanceledError } from "./services/api-cilent";
import { useEffect, useState } from "react";

function App() {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  function handleSubmit(newMaterial: {
    name: string;
    type: string;
    gatherable: boolean;
    gatheredFrom: string;
    lifeRequired: string;
    category: string;
  }) {
    console.log(newMaterial);
  }

  function handleDelete(id: number): void {
    console.log(id);
  }

  useEffect(() => {
    setLoading(true);
    const { request, cancel } = materialService.getAll<Material>();
    request
      .then((res) => {
        setMaterials(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setLoading(false);
      });
    return () => {
      cancel();
    };
  }, []);

  return (
    <>
      <ThemeProvider theme={theme}>
        <Box bgcolor="ochre.light" sx={{ flexGrow: 1 }}>
          <Grid container>
            <Grid className="app-header" size={12}>
              <NavBar></NavBar>
            </Grid>
            <Grid justifyContent="center" className="app-body" size={12}>
              <Box sx={{ mt: "24px", mb: "24px" }}>
                <MaterialForm
                  onSubmit={(newMaterial) => handleSubmit(newMaterial)}
                ></MaterialForm>
              </Box>
              <MaterialDataTable
                materialData={materials}
                onDelete={(id) => handleDelete(id)}
              ></MaterialDataTable>
            </Grid>
          </Grid>
        </Box>
      </ThemeProvider>
    </>
  );
}

export default App;
