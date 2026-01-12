import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box
} from "@mui/material";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

interface Props {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function ConfirmDeleteMemberTable({
  open,
  onClose,
  onConfirm
}: Props) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>
        <Box display="flex" alignItems="center" gap={1}>
          <WarningAmberIcon color="warning" />
          Confirm Deletion
        </Box>
      </DialogTitle>

      <DialogContent>
        <Typography>
          This action cannot be undone. The family member will be permanently removed.
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button variant="outlined" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="contained" color="error" onClick={onConfirm}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
