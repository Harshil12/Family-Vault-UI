import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

import type { DocumentDetailsDto } from "../../Models/DocumentDetails";
import { DocumentTypes } from "../../Models/Enums/DocumentTypes";

interface Props {
  documents: DocumentDetailsDto[];
  onEdit: (d: DocumentDetailsDto) => void;
  onDelete: (d: DocumentDetailsDto) => void;
}

export default function DocumentsTable({
  documents,
  onEdit,
  onDelete
}: Props) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Type</TableCell>
          <TableCell>Number</TableCell>
          <TableCell>Issue Date</TableCell>
          <TableCell>Expiry Date</TableCell>
          <TableCell>Location</TableCell>
          <TableCell align="right">Actions</TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {documents.map(d => (
          <TableRow key={d.id}>
            <TableCell>{DocumentTypes[d.documentType]}</TableCell>
            <TableCell>{d.documentNumber}</TableCell>
            <TableCell>{d.issueDate || "-"}</TableCell>
            <TableCell>{d.expiryDate || "-"}</TableCell>
            <TableCell>{d.savedLocation}</TableCell>

            <TableCell align="right">
              <IconButton onClick={() => onEdit(d)}>
                <Edit />
              </IconButton>
              <IconButton onClick={() => onDelete(d)}>
                <Delete />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
