import { Box, Grid, ThemeProvider } from "@mui/material";
import NavBar from "./components/NavBar/NavBar";
import { theme } from "./Theme";
import MaterialForm from "./components/MaterialForm/MaterialForm";
import MaterialDataTable from "./components/MaterialDataTable/MaterialDataTable";
import materialService, {
  type Material,
  type MaterialFormWrapper,
} from "./services/MaterialService";
import { CanceledError } from "./services/api-cilent";
import { useEffect, useState } from "react";

function App() {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [material, setMaterial] = useState<Material>();
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  function handleSubmit(newMaterialData: MaterialFormWrapper) {
    const originalMaterials = [...materials];

    const newMaterialObject = {
      name: newMaterialData.name,
      crafted: newMaterialData.crafted,
      gatheredFrom: newMaterialData.gatheredFrom
        ? newMaterialData.gatheredFrom.split(/\r?\n/)
        : null,
      lifeRequired: newMaterialData.lifeRequired,
      category: newMaterialData.category,
    };

    materialService
      .create(newMaterialObject)
      //savedMaterial is just an alias we are assigning to this property.
      .then(({ data: savedMaterial }) => {
        setMaterials([savedMaterial, ...materials]);
        reloadTable();
      })
      .catch((err) => {
        //show user an error
        setError(err.message);
        //restory list back to original state
        setMaterials(originalMaterials);
      });
  }

  function handleDelete(id: number): void {
    const originalMaterials = [...materials];
    materialService
      .delete(id)
      .then(() => {
        //on sucessful delete, reload table
        reloadTable();
      })
      .catch((err) => {
        setError(err.message);
        //restore UI back to original state
        setMaterials(originalMaterials);
      });
  }

  //Renter Table For the First Time
  useEffect(() => {
    reloadTable();
  }, []);

  function reloadTable() {
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
  }

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
                  material={material}
                  onSubmit={(newMaterial) => handleSubmit(newMaterial)}
                ></MaterialForm>
              </Box>
              <MaterialDataTable
                materialData={materials}
                onEdit={(material) => setMaterial(material)}
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
