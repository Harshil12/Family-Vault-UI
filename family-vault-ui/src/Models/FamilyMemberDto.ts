import type { BaseDto } from "./BaseDto";
import type { Relationships } from "./Enums/Relationships";
import type { BloodGroups } from "./Enums/BloodGroups";

export interface FamilyMemberDto extends BaseDto {
  familyId: string;
  firstName: string;
  lastName?: string;
  countryCode?: string;
  mobile?: number;
  relationshipType: Relationships;
  dateOfBirth?: string;
  bloodGroup?: BloodGroups;
  email?: string;
  pan?: number;
  aadhar?: number;
}
