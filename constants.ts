export const COLORS = {
  bg: '#0A192F',
  surface: '#112240',
  textPrimary: '#CCD6F6',
  textSecondary: '#8892B0',
  accentGreen: '#64FFDA',
  accentGold: '#FFD700',
  accentRed: '#EF4444',
  accentBlue: '#57CBCC',
};

// Formatting currency to VND
export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
};

// Formatting numbers
export const formatNumber = (num: number) => {
  return new Intl.NumberFormat('en-US').format(num);
};

export const TIER_INFO = {
  TIER_2: {
    name: "Tier 2: SMART E-SME",
    desc: "Bán tự động",
    tech: "Cloud WMS + PDA Handheld",
    imageType: "human", // conceptual
  },
  TIER_1_5: {
    name: "Tier 1.5: HYBRID",
    desc: "Mô hình lai",
    tech: "WMS + Conveyor (Băng tải)",
    imageType: "hybrid",
  },
  TIER_1: {
    name: "Tier 1: SMART ENTERPRISE",
    desc: "Tự động hóa hoàn toàn",
    tech: "AS/RS + Robot AGV + AI",
    imageType: "robot",
  }
};