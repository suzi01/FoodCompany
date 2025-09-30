import { IBranch } from "../../branches/branch.model";
import { BranchDto } from "../../branches/dtos/branch.dto";

export const toBranchesResponseDTO = (branch: IBranch): BranchDto => {
    return {
        id: branch._id.toString(),
        branchName: branch.branchName,
        mainContactName: branch.mainContactName ?? '',
        mainContactPhoneNumber: branch.mainContactPhoneNumber ?? '',
        mainContactEmail: branch.mainContactEmail ?? '',
        branchEmail: branch.branchEmail,
        phoneNumber: branch.phoneNumber ?? '',
        address: branch.address ?? '',
        yearsActive: branch.yearsActive,
        suppliers: branch.suppliers.map(supplier => supplier.toString()),
        createdAt: branch.createdAt.toISOString(),
        updatedAt: branch.updatedAt.toISOString()
    };
};
