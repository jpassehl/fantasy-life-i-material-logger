import {
  Button,
  Container,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useForm, type FieldValues } from "react-hook-form";
import {
  gatheringLives,
  materialCategories,
  materialTypes,
} from "../../constants";
import "./MaterialForm.css";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";

const schema = z.object({
  name: z.string(),
  type: z.string(),
  gatherable: z.string(),
  gatheredFrom: z.string(),
  lifeRequired: z.string(),
  category: z.string(),
});
type MaterialFormData = z.infer<typeof schema>;

interface MaterialFormProps {
  onSubmit: (data: MaterialFormData) => void;
}
const MaterialForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MaterialFormData>({
    resolver: zodResolver(schema),
  });

  function onSubmit(data) {
    console.log(data);
  }

  return (
    <Container
      sx={{
        bgcolor: "white",
        height: "100%",
        width: "40%",
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
      }}
    >
      <form
        id="materialForm"
        className="material-form"
        onSubmit={handleSubmit(onSubmit)}
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
        <FormControl margin="dense" variant="standard" sx={{ width: "100%" }}>
          <InputLabel id="typeLabel">Type</InputLabel>
          <Select
            labelId="typeLabel"
            id="type"
            defaultValue={"Other"}
            {...register("type")}
            name="type"
            label="Type"
          >
            {materialTypes.map((type: string) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
            <MenuItem value="Other">Other</MenuItem>
          </Select>
          {errors.type && (
            <Typography color="error">{errors.type.message}</Typography>
          )}
        </FormControl>
        <FormControl>
          <RadioGroup
            defaultValue={true}
            {...register("gatherable")}
            id="gatherable"
            name="gatherable"
            row
          >
            <FormControlLabel
              value="true"
              label="Gatherable"
              control={<Radio />}
            />
            <FormControlLabel
              value="false"
              label="Craftable"
              control={<Radio />}
            />
          </RadioGroup>
          {errors.gatherable && (
            <Typography color="error">{errors.gatherable.message}</Typography>
          )}
        </FormControl>
        <TextField
          defaultValue=""
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
            defaultValue={""}
            {...register("lifeRequired")}
            name="lifeRequired"
            label="lifeRequired"
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
            defaultValue={"Other"}
            {...register("category")}
            name="category"
            label="category"
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
