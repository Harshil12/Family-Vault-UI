import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Button
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

import type { FamilyMemberViewModel } from "../../Models/FamilyMemberViewModel";
import { Relationships } from "../../Models/Enums/Relationships";

interface Props {
  members: FamilyMemberViewModel[];
  onEdit: (member: FamilyMemberViewModel) => void;
  onDelete: (member: FamilyMemberViewModel) => void;
  onViewDocuments: (memberId: string) => void; // ✅ NEW
}

export default function MembersTable({
  members,
  onEdit,
  onDelete,
  onViewDocuments
}: Props) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Relationship</TableCell>
          <TableCell>Age</TableCell>
          <TableCell>Documents</TableCell> {/* ✅ NEW COLUMN */}
          <TableCell align="right">Actions</TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {members.map(m => (
          <TableRow key={m.id}>
            <TableCell>{m.fullName}</TableCell>
            <TableCell>{Relationships[m.relationshipType]}</TableCell>
            <TableCell>{m.age ?? "-"}</TableCell>

            {/* DOCUMENT NAVIGATION */}
            <TableCell>
              <Button
                size="small"
                variant="text"
                sx={{ textTransform: "none" }}
                onClick={() => onViewDocuments(m.id)}
              >
                View Documents
              </Button>
            </TableCell>

            <TableCell align="right">
              <IconButton onClick={() => onEdit(m)}>
                <Edit />
              </IconButton>
              <IconButton onClick={() => onDelete(m)}>
                <Delete />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
