import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography
} from "@mui/material";

interface Props {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function ConfirmDeleteDocumentTable({
  open,
  onClose,
  onConfirm
}: Props) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Delete Document</DialogTitle>

      <DialogContent>
        <Typography>
          Are you sure you want to delete this document?
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button color="error" variant="contained" onClick={onConfirm}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
