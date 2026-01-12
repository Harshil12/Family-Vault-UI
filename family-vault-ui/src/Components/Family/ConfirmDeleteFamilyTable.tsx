import { Dialog, DialogTitle, DialogActions, Button } from "@mui/material";

interface Props {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function ConfirmDeleteFamilyTable({
  open, onClose, onConfirm
}: Props) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        Are you sure you want to delete this family?
      </DialogTitle>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button color="error" variant="contained" onClick={onConfirm}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
