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
  onDelete: (id: number) => void;
}
const MaterialDataTable = ({
  materialData,
  onDelete,
}: MaterialDataTableProps) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Gatherable</TableCell>
            <TableCell>GatheredFrom</TableCell>
            <TableCell>LifeRequired</TableCell>
            <TableCell>Category</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {materialData.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.type}</TableCell>
              <TableCell>{row.gatherable.toString()}</TableCell>
              <TableCell>{row.gatheredFrom}</TableCell>
              <TableCell>{row.lifeRequired}</TableCell>
              <TableCell>{row.category}</TableCell>
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
