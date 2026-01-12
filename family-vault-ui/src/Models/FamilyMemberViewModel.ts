import type { FamilyMemberDto } from "./FamilyMemberDto";

export interface FamilyMemberViewModel extends FamilyMemberDto {
  fullName: string;
  age?: number;
}
