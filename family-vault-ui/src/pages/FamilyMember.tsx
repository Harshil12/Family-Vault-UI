import { Box, Button, Typography, Paper } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import MembersTable from "../Components/FamilyMembers/MembersTable";
import AddEditMemberTable from "../Components/FamilyMembers/AddEditMemberTable";
import ConfirmDeleteMemberTable from "../Components/FamilyMembers/ConfirmDeleteMemberTable";

import type { FamilyMemberDto } from "../Models/FamilyMemberDto";
import type { FamilyMemberViewModel } from "../Models/FamilyMemberViewModel";
import { Relationships } from "../Models/Enums/Relationships";

/* ---------------- TEMP DATA ---------------- */

const mockMembers: FamilyMemberViewModel[] = [];

/* ---------------- COMPONENT ---------------- */

export default function FamilyMember() {
  const { familyId } = useParams<{ familyId: string }>();
  const navigate = useNavigate();

  const [members, setMembers] = useState<FamilyMemberViewModel[]>([]);
  const [editMember, setEditMember] = useState<FamilyMemberDto | null>(null);
  const [deleteMember, setDeleteMember] =
    useState<FamilyMemberViewModel | null>(null);

  /* ---------------- LOAD ---------------- */

  useEffect(() => {
    // later: api.getFamilyMembers(familyId)
    setMembers(mockMembers);
  }, [familyId]);

  /* ---------------- SAVE (ADD / EDIT) ---------------- */

  const handleSaveMember = (dto: FamilyMemberDto) => {
    setMembers(prev => {
      // CREATE
      if (!dto.id) {
        const dob = dto.dateOfBirth
          ? new Date(dto.dateOfBirth)
          : undefined;

        const newMember: FamilyMemberViewModel = {
          ...dto,
          id: crypto.randomUUID(),
          familyId: familyId!,
          fullName: `${dto.firstName} ${dto.lastName ?? ""}`.trim(),
          age: dob
            ? Math.floor(
                (Date.now() - dob.getTime()) /
                  (1000 * 60 * 60 * 24 * 365.25)
              )
            : undefined,
          createdAt: new Date().toISOString()
        };

        return [...prev, newMember];
      }

      // UPDATE
      return prev.map(m =>
        m.id === dto.id
          ? {
              ...m,
              ...dto,
              fullName: `${dto.firstName} ${dto.lastName ?? ""}`.trim(),
              updatedAt: new Date().toISOString()
            }
          : m
      );
    });

    setEditMember(null);
  };

  /* ---------------- DELETE ---------------- */

  const handleDeleteMember = () => {
    setMembers(prev =>
      prev.filter(m => m.id !== deleteMember?.id)
    );
    setDeleteMember(null);
  };

  /* ---------------- DOCUMENT NAVIGATION ---------------- */

  const handleViewDocuments = (memberId: string) => {
    navigate(`/family-members/${memberId}/documents`);
  };

  /* ---------------- UI ---------------- */

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f9fafb", py: 4 }}>
      <Box sx={{ maxWidth: "1100px", mx: "auto", px: 2 }}>
        {/* BACK */}
        <Button
          size="small"
          onClick={() => navigate("/families")}
          sx={{ mb: 2 }}
        >
          ← Back to Families
        </Button>

        {/* HEADER + ADD */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={3}
        >
          <Box>
            <Typography variant="h4" fontWeight={600}>
              Family Members
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Manage members of the selected family
            </Typography>
          </Box>

          <Button
            variant="contained"
            size="large"
            onClick={() =>
              setEditMember({
                id: "",
                familyId: familyId!,
                firstName: "",
                relationshipType: Relationships.Other
              })
            }
          >
            + Add Member
          </Button>
        </Box>

        {/* TABLE / EMPTY STATE */}
        <Paper elevation={2} sx={{ borderRadius: 2, overflow: "hidden" }}>
            <MembersTable
              members={members}
              onEdit={m => setEditMember(m)}
              onDelete={setDeleteMember}
              onViewDocuments={handleViewDocuments} // ✅ DOCUMENT COLUMN ACTION
            />
        </Paper>

        {/* ADD / EDIT MODAL */}
        <AddEditMemberTable
          open={!!editMember}
          member={editMember}
          onClose={() => setEditMember(null)}
          onSave={handleSaveMember}
        />

        {/* DELETE MODAL */}
        <ConfirmDeleteMemberTable
          open={!!deleteMember}
          onClose={() => setDeleteMember(null)}
          onConfirm={handleDeleteMember}
        />
      </Box>
    </Box>
  );
}
