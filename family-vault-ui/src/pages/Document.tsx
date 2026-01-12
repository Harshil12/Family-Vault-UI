import { Box, Button, Typography, Paper } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import DocumentsTable from "../Components/Documents/DocumentTable";
import AddEditDocumentTable from "../Components/Documents/AddEditDocumentTable";
import ConfirmDeleteDocumentTable from "../Components/Documents/ConfirmDeleteDocuemtTable";

import type { DocumentDetailsDto } from "../Models/DocumentDetails";
import { DocumentTypes } from "../Models/Enums/DocumentTypes";

export default function Document() {
  const { familyMemberId } = useParams<{ familyMemberId: string }>();
  const navigate = useNavigate();

  const [documents, setDocuments] = useState<DocumentDetailsDto[]>([]);
  const [editDoc, setEditDoc] =
    useState<Partial<DocumentDetailsDto> | null>(null);
  const [deleteDoc, setDeleteDoc] =
    useState<DocumentDetailsDto | null>(null);

  /* ---------------- LOAD ---------------- */

  useEffect(() => {
    // later: api.getDocuments(familyMemberId)
    setDocuments([]);
  }, [familyMemberId]);

  /* ---------------- SAVE (ADD / EDIT) ---------------- */

  const handleSaveDocument = (dto: Partial<DocumentDetailsDto>) => {
    setDocuments(prev => {
      // CREATE
      if (!dto.id) {
        const newDoc: DocumentDetailsDto = {
          id: crypto.randomUUID(),
          familyMemberId: familyMemberId!,
          documentType: dto.documentType!,
          documentNumber: dto.documentNumber!,
          savedLocation: dto.savedLocation!,
          issueDate: dto.issueDate,
          expiryDate: dto.expiryDate,
          createdAt: new Date().toISOString()
        };

        return [...prev, newDoc];
      }

      // UPDATE
      return prev.map(d =>
        d.id === dto.id
          ? { ...d, ...dto, updatedAt: new Date().toISOString() }
          : d
      );
    });

    setEditDoc(null);
  };

  /* ---------------- DELETE ---------------- */

  const handleDeleteDocument = () => {
    setDocuments(prev =>
      prev.filter(d => d.id !== deleteDoc?.id)
    );
    setDeleteDoc(null);
  };

  /* ---------------- UI ---------------- */

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f9fafb", py: 4 }}>
      <Box sx={{ maxWidth: "1100px", mx: "auto", px: 2 }}>
        {/* BACK */}
        <Button size="small" onClick={() => navigate(-1)} sx={{ mb: 2 }}>
          ← Back to Members
        </Button>

        {/* HEADER */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={3}
        >
          <Box>
            <Typography variant="h4" fontWeight={600}>
              Documents
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Documents linked to selected family member
            </Typography>
          </Box>

          <Button
            variant="contained"
            size="large"
            onClick={() =>
              setEditDoc({
                familyMemberId: familyMemberId!,
                documentType: DocumentTypes.Other,
                documentNumber: "",
                savedLocation: ""
              })
            }
          >
            + Add Document
          </Button>
        </Box>

        {/* TABLE */}
        <Paper elevation={2} sx={{ borderRadius: 2 }}>
          <DocumentsTable
            documents={documents}
            onEdit={d => setEditDoc(d)}
            onDelete={setDeleteDoc}
          />
        </Paper>

        {/* ADD / EDIT / VIEW (SAME DIALOG) */}
        <AddEditDocumentTable
          open={!!editDoc}
          document={editDoc}
          onClose={() => setEditDoc(null)}
          onSave={handleSaveDocument}
        />

        {/* DELETE */}
        <ConfirmDeleteDocumentTable
          open={!!deleteDoc}
          onClose={() => setDeleteDoc(null)}
          onConfirm={handleDeleteDocument}
        />
      </Box>
    </Box>
  );
}
