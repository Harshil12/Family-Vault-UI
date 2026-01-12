import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack,
  MenuItem
} from "@mui/material";
import { useEffect, useState } from "react";

import type { FamilyMemberDto } from "../../Models/FamilyMemberDto";
import { Relationships } from "../../Models/Enums/Relationships";
import { BloodGroups } from "../../Models/Enums/BloodGroups";

interface Props {
  open: boolean;
  member: FamilyMemberDto | null;
  onClose: () => void;
  onSave: (dto: FamilyMemberDto) => void;
}

export default function AddEditMemberTable({
  open,
  member,
  onClose,
  onSave
}: Props) {
  const [form, setForm] = useState<FamilyMemberDto | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    setForm(member);
    setError("");
  }, [member]);

  if (!form) return null;

  const handleSave = () => {
    if (!form.firstName.trim()) {
      setError("First name is required");
      return;
    }

    onSave({
      ...form,
      firstName: form.firstName.trim()
    });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        {form.id ? "Edit Family Member" : "Add Family Member"}
      </DialogTitle>

      <DialogContent>
        <Stack spacing={2} mt={1}>
          <TextField
            label="First Name"
            value={form.firstName}
            required
            error={!!error}
            helperText={error}
            onChange={e =>
              setForm({ ...form, firstName: e.target.value })
            }
          />

          <TextField
            label="Last Name"
            value={form.lastName ?? ""}
            onChange={e =>
              setForm({ ...form, lastName: e.target.value })
            }
          />

          <TextField
            select
            label="Relationship"
            required
            value={form.relationshipType}
            onChange={e =>
              setForm({
                ...form,
                relationshipType: Number(e.target.value) as Relationships
              })
            }
          >
            {Object.values(Relationships)
              .filter(v => typeof v === "number")
              .map(v => (
                <MenuItem key={v} value={v}>
                  {Relationships[v]}
                </MenuItem>
              ))}
          </TextField>

          <TextField
            label="Country Code"
            value={form.countryCode ?? ""}
            onChange={e =>
              setForm({ ...form, countryCode: e.target.value })
            }
          />

          <TextField
            label="Mobile"
            type="number"
            value={form.mobile ?? ""}
            onChange={e =>
              setForm({
                ...form,
                mobile: e.target.value ? Number(e.target.value) : undefined
              })
            }
          />

          <TextField
            label="Email"
            type="email"
            value={form.email ?? ""}
            onChange={e =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <TextField
            label="Date of Birth"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={form.dateOfBirth ?? ""}
            onChange={e =>
              setForm({ ...form, dateOfBirth: e.target.value })
            }
          />

          <TextField
            select
            label="Blood Group"
            value={form.bloodGroup ?? ""}
            onChange={e =>
              setForm({
                ...form,
                bloodGroup: e.target.value
                  ? (Number(e.target.value) as BloodGroups)
                  : undefined
              })
            }
          >
            <MenuItem value="">None</MenuItem>
            {Object.values(BloodGroups)
              .filter(v => typeof v === "number")
              .map(v => (
                <MenuItem key={v} value={v}>
                  {BloodGroups[v]}
                </MenuItem>
              ))}
          </TextField>
        </Stack>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button variant="outlined" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="contained" onClick={handleSave}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
