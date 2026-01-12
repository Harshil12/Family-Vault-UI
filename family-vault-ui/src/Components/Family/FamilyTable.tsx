import {
  Table, TableHead, TableRow, TableCell, TableBody,
  IconButton, Menu, MenuItem, Link
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { FamilyViewModel } from "../../Models/FamilyViewModel";

interface Props {
  families: FamilyViewModel[];
  onEdit: (f: FamilyViewModel) => void;
  onDelete: (f: FamilyViewModel) => void;
}

export default function FamilyTable({ families, onEdit, onDelete }: Props) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selected, setSelected] = useState<FamilyViewModel | null>(null);
  const navigate = useNavigate();

 const openMenu = (
  e: React.MouseEvent<HTMLElement>,
  f: FamilyViewModel
) => {
  setAnchorEl(e.currentTarget as HTMLElement);
  setSelected(f);
};

  const closeMenu = () => {
    setAnchorEl(null);
    setSelected(null);
  };

  return (
    <>
      <Table>
        <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
          <TableRow>
            <TableCell>Family Name</TableCell>
            <TableCell>Members</TableCell>
            <TableCell>Created On</TableCell>
            <TableCell>Updated On</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {families.map(f => (
            <TableRow key={f.id} hover>
              <TableCell>{f.name}</TableCell>

              <TableCell>
                <Link
                  component="button"
                  underline="hover"
                  onClick={() => navigate(`/families/${f.id}/members`)}
                >
                  {f.membersCount}
                </Link>
              </TableCell>

              <TableCell>{f.createdAt ?? "-"}</TableCell>
              <TableCell>{f.updatedAt ?? "-"}</TableCell>

              <TableCell align="right">
                <IconButton onClick={(e) => openMenu(e, f)}>
                  <MoreVertIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Menu anchorEl={anchorEl} open={!!anchorEl} onClose={closeMenu}>
        <MenuItem onClick={() => { onEdit(selected!); closeMenu(); }}>
          Edit
        </MenuItem>
        <MenuItem onClick={() => { onDelete(selected!); closeMenu(); }}>
          Delete
        </MenuItem>
      </Menu>
    </>
  );
}
