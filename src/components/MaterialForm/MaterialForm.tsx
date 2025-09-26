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
import { useState } from "react";

const materialSchema = z.object({
  name: z.string(),
  crafted: z.boolean(),
  gatheredFrom: z.string(),
  lifeRequired: z.string(),
  category: z.string(),
});
type MaterialFormData = z.infer<typeof materialSchema>;

interface MaterialFormProps {
  onSubmit: (data: MaterialFormData) => void;
}
const MaterialForm = ({ onSubmit }: MaterialFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<MaterialFormData>({
    resolver: zodResolver(materialSchema),
  });

  const [crafted, setGatherable] = useState(false);
  const [lifeRequired, setLifeRequired] = useState("");
  const [category, setCategory] = useState("");

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
      <form
        id="materialForm"
        className="material-form"
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
          defaultValue=""
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
