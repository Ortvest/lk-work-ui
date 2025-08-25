export const WorkAssetStatuses = {
  ACTIVE: 'active',
  NEEDS_SERVICE: 'needs_service',
  REPLACED: 'replaced',
  RETIRED: 'retired',
};

export const WorkAssetTypes = {
  EQUIPMENT: 'equipment',
  TOOL: 'tool',
  FURNITURE: 'furniture',
  OTHER: 'other',
};

export type WorkAssetType = (typeof WorkAssetTypes)[keyof typeof WorkAssetTypes];
export type WorkAssetStatus = (typeof WorkAssetStatuses)[keyof typeof WorkAssetStatuses];
