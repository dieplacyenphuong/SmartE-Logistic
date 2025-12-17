export interface CostInput {
  staffCount: number;
  avgSalary: number;
  warehouseArea: number;
  damageRate: number; // Percentage
}

export interface CalculationResult {
  oldCost: {
    labor: number;
    hidden: number;
    rent: number;
    total: number;
  };
  newCost: {
    labor: number;
    hidden: number;
    rent: number;
    softwareFee: number;
    total: number;
  };
  savings: number;
  roiMonth: number;
  tier: 'TIER_1' | 'TIER_1_5' | 'TIER_2';
}

export enum Tab {
  DASHBOARD = 'DASHBOARD',
  GREEN = 'GREEN',
  COST = 'COST',
  INVENTORY = 'INVENTORY',
  SETTINGS = 'SETTINGS'
}

export interface InventoryItem {
  sku: string;
  name: string;
  location: string;
  quantity: number;
  expiryDate: string;
  status: 'SAFE' | 'WARNING' | 'DANGER';
}
