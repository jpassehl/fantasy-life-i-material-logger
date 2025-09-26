import {
  Button,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { gatheringLives, materialCategories } from "../../constants";
import "./MaterialForm.css";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import type { Material } from "../../services/MaterialService";

const MaterialSchema = z
  .object({
    id: z.number().or(z.undefined()),
    name: z.string(),
    crafted: z.boolean(),
    gatheredFrom: z.string().or(z.undefined()),
    lifeRequired: z.string().or(z.undefined()),
    category: z.string(),
  })
  .transform((material) => ({
    ...material,
    gatheredFrom: material.gatheredFrom?.replace("\\n", " "),
  }));
type MaterialFormData = z.infer<typeof MaterialSchema>;

interface MaterialFormProps {
  material?: Material;
  onSubmit: (data: MaterialFormData) => void;
}
const MaterialForm = ({ material, onSubmit }: MaterialFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<MaterialFormData>({
    resolver: zodResolver(MaterialSchema),
  });

  const [crafted, setGatherable] = useState(false);
  const [lifeRequired, setLifeRequired] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    if (material) {
      MaterialSchema.parse({
        ...material,
        gatheredFrom: material.gatheredFrom?.join("\r\n"),
      });

      reset({
        id: material.id,
        name: material.name,
        crafted: material.crafted,
        gatheredFrom: material.gatheredFrom?.join("\r\n"),
        lifeRequired: material.lifeRequired,
        category: material.category,
      });

      /*       setValue("id", material.id);
      setValue("name", material.name);
      setValue("crafted", material.crafted);
      setValue("gatheredFrom", material.gatheredFrom?.join("\r\n"));
      setValue("lifeRequired", material.lifeRequired);
      setValue("category", material.name); */
    }
  }, [material, reset]);

  return (
    <Container
      sx={{
        bgcolor: "white",
        height: "40%",
        width: "40%",
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        borderRadius: 2,
        border: 1,
      }}
    >
      <div className="form-header">
        <Typography variant="h6">
          {material ? "Edit Material Form" : "New Material Form"}
        </Typography>
      </div>
      <form
        id="materialForm"
        onSubmit={handleSubmit((data) => {
          onSubmit(data);
          reset();
          setGatherable(false);
          setLifeRequired("");
          setCategory("Other");
        })}
      >
        <TextField
          id="name"
          label="Name"
          variant="standard"
          margin="dense"
          {...register("name")}
          sx={{ width: "100%" }}
        />

        {errors.name && (
          <Typography color="error">{errors.name.message}</Typography>
        )}
        <FormControl>
          <FormControlLabel
            label="Crafted"
            control={
              <Checkbox
                {...register("crafted")}
                id="crafted"
                name="crafted"
                checked={crafted}
                onChange={(e) => setGatherable(e.target.checked)}
              />
            }
          />
          {errors.crafted && (
            <Typography color="error">{errors.crafted.message}</Typography>
          )}
        </FormControl>
        <TextField
          {...register("gatheredFrom")}
          id="gatheredFrom"
          name="gatheredFrom"
          label="Gathered From"
          variant="standard"
          margin="dense"
          multiline
          sx={{ width: "100%" }}
        />
        {errors.gatheredFrom && (
          <Typography color="error">{errors.gatheredFrom.message}</Typography>
        )}
        <FormControl margin="dense" variant="standard" sx={{ width: "100%" }}>
          <InputLabel id="lifeRequiredLabel">Life Required</InputLabel>
          <Select
            labelId="lifeRequiredLabel"
            id="lifeRequired"
            defaultValue=""
            {...register("lifeRequired")}
            name="lifeRequired"
            label="lifeRequired"
            value={lifeRequired}
            onChange={(e) => setLifeRequired(e.target.value)}
          >
            {gatheringLives.map((life: string) => (
              <MenuItem key={life} value={life}>
                {life}
              </MenuItem>
            ))}
          </Select>
          {errors.lifeRequired && (
            <Typography color="error">{errors.lifeRequired.message}</Typography>
          )}
        </FormControl>
        <FormControl margin="dense" variant="standard" sx={{ width: "100%" }}>
          <InputLabel id="categoryLabel">Category</InputLabel>
          <Select
            labelId="categoryLabel"
            id="category"
            defaultValue="Other"
            {...register("category")}
            name="category"
            label="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {materialCategories.map((category: string) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
          {errors.category && (
            <Typography color="error">{errors.category.message}</Typography>
          )}
        </FormControl>
        <div className="button-container">
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Container>
  );
};

export default MaterialForm;
