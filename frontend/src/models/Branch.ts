export interface Branch {
  id: string;
  branchName: string;
  mainContactName: string;
  mainContactPhoneNumber?: string;
  mainContactEmail?: string;
  branchEmail: string;
  phoneNumber?: string;
  address?: string;
  yearsActive: number;
  suppliers: string[];
  createdAt: string;
  updatedAt: string;
}

export interface GetBranchesResponse {
  success: boolean;
  data: Branch[];
}
