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
  suppliers: string[] | SupplierDetails[];
  createdAt: string;
  updatedAt: string;
}

export interface SupplierDetails {
  id: string;
  companyName: string;
  status: string;
}

export interface GetBranchesResponse {
  success: boolean;
  data: Branch[];
}
