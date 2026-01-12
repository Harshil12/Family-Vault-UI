import type { BaseDto } from "./BaseDto";
import { DocumentTypes } from "../Models/Enums/DocumentTypes"

export interface DocumentDetailsDto extends BaseDto {
  documentType: DocumentTypes;
  documentNumber: string;
  savedLocation: string;
  issueDate?: string;
  expiryDate?: string;
  familyMemberId: string;
}
