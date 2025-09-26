import { type Material } from "../../services/MaterialService";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

interface MaterialDataTableProps {
  materialData: Material[];
  onEdit: (material: Material) => void;
  onDelete: (id: number) => void;
}
const MaterialDataTable = ({
  materialData,
  onEdit,
  onDelete,
}: MaterialDataTableProps) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Crafted</TableCell>
            <TableCell>GatheredFrom</TableCell>
            <TableCell>LifeRequired</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>{/*Edit Button*/}</TableCell>
            <TableCell>{/*Delete Button*/}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {materialData.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.crafted.toString()}</TableCell>
              <TableCell>{row.gatheredFrom}</TableCell>
              <TableCell>{row.lifeRequired}</TableCell>
              <TableCell>{row.category}</TableCell>
              <TableCell>
                <Button variant="outlined" onClick={() => onEdit(row)}>
                  Edit
                </Button>
              </TableCell>
              <TableCell>
                <Button variant="contained" onClick={() => onDelete(row.id)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MaterialDataTable;
