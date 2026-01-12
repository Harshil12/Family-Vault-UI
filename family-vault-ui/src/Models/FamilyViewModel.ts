import type { FamilyDto } from "./FamilyDto";

/**
 * UI-only model for Families screen
 * Extends API DTO with derived fields
 */
export interface FamilyViewModel extends FamilyDto {
  membersCount: number; // derived, not stored in DB
}
