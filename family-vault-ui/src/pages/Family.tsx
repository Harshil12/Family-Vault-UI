import { Box, Button, Typography, Paper } from "@mui/material";
import { useEffect, useState } from "react";

import FamilyTable from "../Components/Family/FamilyTable";
import AddEditFamilyTable from "../Components/Family/AddEditFamilyTable";
import ConfirmDeleteFamilyTable from "../Components/Family/ConfirmDeleteFamilyTable";

import type { FamilyDto } from "../Models/FamilyDto";
import type { FamilyViewModel } from "../Models/FamilyViewModel";

/**
 * Temporary mock data
 * Later replace with API + mapper
 */
const mockFamilies: FamilyViewModel[] = [
  {
    id: "1a2b",
    name: "Smith Family",
    membersCount: 4,
    createdAt: "2026-01-12",
    updatedAt: "2026-01-15"
  },
  {
    id: "2b3c",
    name: "Kumar Family",
    membersCount: 3,
    createdAt: "2026-01-18"
  }
];

export default function Family() {
  const [families, setFamilies] = useState<FamilyViewModel[]>([]);
  const [editFamily, setEditFamily] = useState<FamilyDto | null>(null);
  const [deleteFamily, setDeleteFamily] = useState<FamilyViewModel | null>(null);

  useEffect(() => {
    setFamilies(mockFamilies);
  }, []);

  /* ---------------- CRUD HANDLERS ---------------- */

  const handleSaveFamily = (dto: FamilyDto) => {
    setFamilies(prev => {
      // CREATE
      if (!dto.id) {
        const newFamily: FamilyViewModel = {
          id: crypto.randomUUID(),
          name: dto.name,
          membersCount: 0,
          createdAt: new Date().toISOString()
        };
        return [...prev, newFamily];
      }

      // UPDATE
      return prev.map(f =>
        f.id === dto.id
          ? {
              ...f,
              name: dto.name,
              updatedOn: new Date().toISOString()
            }
          : f
      );
    });

    setEditFamily(null);
  };

  const handleDeleteFamily = () => {
    setFamilies(prev =>
      prev.filter(f => f.id !== deleteFamily?.id)
    );
    setDeleteFamily(null);
  };

  /* ---------------- UI ---------------- */

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f9fafb",
        py: 4
      }}
    >
      {/* PAGE CONTAINER */}
      <Box
        sx={{
          maxWidth: "1100px",
          mx: "auto",
          px: 2
        }}
      >
        {/* HEADER */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={3}
        >
          <Box>
            <Typography variant="h4" fontWeight={600}>
              Families
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Manage families and view their members
            </Typography>
          </Box>

          <Button
            variant="contained"
            size="large"
            onClick={() => setEditFamily({ id: "", name: "" })}
          >
            + Add Family
          </Button>
        </Box>

        {/* TABLE / EMPTY STATE */}
        <Paper
          elevation={2}
          sx={{
            borderRadius: 2,
            overflow: "hidden"
          }}
        >
          {families.length === 0 ? (
            <Box p={5} textAlign="center">
              <Typography variant="h6" gutterBottom>
                No families found
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                mb={2}
              >
                Get started by creating your first family.
              </Typography>
              <Button
                variant="contained"
                onClick={() => setEditFamily({ id: "", name: "" })}
              >
                + Add Family
              </Button>
            </Box>
          ) : (
            <FamilyTable
              families={families}
              onEdit={f => setEditFamily({ id: f.id, name: f.name })}
              onDelete={setDeleteFamily}
            />
          )}
        </Paper>

        {/* ADD / EDIT MODAL */}
        <AddEditFamilyTable
          open={!!editFamily}
          family={editFamily}
          onClose={() => setEditFamily(null)}
          onSave={handleSaveFamily}
        />

        {/* DELETE CONFIRM MODAL */}
        <ConfirmDeleteFamilyTable
          open={!!deleteFamily}
          onClose={() => setDeleteFamily(null)}
          onConfirm={handleDeleteFamily}
        />
      </Box>
    </Box>
  );
}
