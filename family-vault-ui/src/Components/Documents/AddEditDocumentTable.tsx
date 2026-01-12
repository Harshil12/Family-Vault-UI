import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem
} from "@mui/material";
import { useEffect, useState } from "react";

import type { DocumentDetailsDto } from "../../Models/DocumentDetails";
import { DocumentTypes } from "../../Models/Enums/DocumentTypes";

interface Props {
  open: boolean;
  document: Partial<DocumentDetailsDto> | null;
  onClose: () => void;
  onSave: (dto: Partial<DocumentDetailsDto>) => void;
}

export default function AddEditDocumentTable({
  open,
  document,
  onClose,
  onSave
}: Props) {
  const [form, setForm] =
    useState<Partial<DocumentDetailsDto> | null>(document);

  useEffect(() => {
    setForm(document);
  }, [document]);

  if (!form) return null;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        {form.id ? "Edit Document" : "Add Document"}
      </DialogTitle>

      <DialogContent>
        <TextField
          select
          label="Document Type"
          fullWidth
          margin="normal"
          value={form.documentType}
          onChange={e =>
            setForm({ ...form, documentType: Number(e.target.value) })
          }
        >
          {Object.entries(DocumentTypes)
            .filter(([k]) => isNaN(Number(k)))
            .map(([key, val]) => (
              <MenuItem key={key} value={val}>
                {key}
              </MenuItem>
            ))}
        </TextField>

        <TextField
          label="Document Number"
          fullWidth
          margin="normal"
          value={form.documentNumber ?? ""}
          onChange={e =>
            setForm({ ...form, documentNumber: e.target.value })
          }
        />

        <TextField
          label="Saved Location"
          fullWidth
          margin="normal"
          value={form.savedLocation ?? ""}
          onChange={e =>
            setForm({ ...form, savedLocation: e.target.value })
          }
        />

        <TextField
          type="date"
          label="Issue Date"
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
          value={form.issueDate ?? ""}
          onChange={e =>
            setForm({ ...form, issueDate: e.target.value })
          }
        />

        <TextField
          type="date"
          label="Expiry Date"
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
          value={form.expiryDate ?? ""}
          onChange={e =>
            setForm({ ...form, expiryDate: e.target.value })
          }
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={() => onSave(form)}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
