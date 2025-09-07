// interfaces/work-asset.interface.ts

export type WorkAssetStatus = 'active' | 'needs_service' | 'replaced' | 'retired';

export interface WorkAsset {
  _id: string;

  name: string;

  itemType: string;

  description?: string;

  startDate: string;

  insuranceExpiryDate?: string;

  lastMaintenanceDate?: string;

  nextMaintenanceDate?: string;

  responsibleEmployee?: string;

  status: WorkAssetStatus;
  createdAt?: Date;
  updatedAt?: Date;
}
