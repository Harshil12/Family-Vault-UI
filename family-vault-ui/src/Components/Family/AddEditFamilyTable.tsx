import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack
} from "@mui/material";
import { useEffect, useState } from "react";
import type { FamilyDto } from "../../Models/FamilyDto";

interface Props {
  open: boolean;
  family?: FamilyDto | null;
  onClose: () => void;
  onSave: (f: FamilyDto) => void;
}

export default function AddEditFamilyTable({
  open,
  family,
  onClose,
  onSave
}: Props) {
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setName(family?.name ?? "");
    setError("");
  }, [family]);

  const handleSave = () => {
    if (!name.trim()) {
      setError("Family name is required");
      return;
    }

    onSave({
      id: family?.id ?? "",
      name: name.trim()
    });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        {family?.id ? "Edit Family" : "Add Family"}
      </DialogTitle>

      <DialogContent>
        <Stack spacing={2} mt={1}>
          <TextField
            label="Family Name"
            value={name}
            onChange={e => {
              setName(e.target.value);
              if (error) setError("");
            }}
            required
            error={!!error}
            helperText={error}
            autoFocus
            fullWidth
          />
        </Stack>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} variant="outlined">
          Cancel
        </Button>
        <Button variant="contained" onClick={handleSave}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
