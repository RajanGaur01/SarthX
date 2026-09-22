/**
 * Welfare Loan & Government Subsidy EMI Amortization Engine
 */

export const SCHEME_PRESETS = {
  'mudra-kishore': {
    id: 'mudra-kishore',
    name: 'PM Mudra (Kishore)',
    amount: 300000,
    rate: 9.5,
    subvention: 0.0,
    tenure: 60,
    applyUrl: 'https://www.jansamarth.in/business-activity-loans',
    note: 'Collateral-free enterprise credit between ?50,000 and ?5 Lakhs for MSMEs and shops.'
  },
  'mudra-shishu': {
    id: 'mudra-shishu',
    name: 'PM Mudra (Shishu)',
    amount: 50000,
    rate: 8.5,
    subvention: 0.0,
    tenure: 36,
    applyUrl: 'https://www.jansamarth.in/business-activity-loans',
    note: 'Micro loans up to ?50,000 for roadside vendors and micro-businesses.'
  },
  'svanidhi': {
    id: 'svanidhi',
    name: 'PM SVANidhi',
    amount: 20000,
    rate: 10.0,
    subvention: 7.0,
    tenure: 12,
    applyUrl: 'https://pmsvanidhi.mohua.gov.in/Home/PreApplication',
    note: 'Street vendor loan with 7% government interest subsidy credited directly into your bank.'
  },
  'vidyalaxmi': {
    id: 'vidyalaxmi',
    name: 'PM Vidyalaxmi',
    amount: 750000,
    rate: 9.5,
    subvention: 3.0,
    tenure: 84,
    applyUrl: 'https://www.vidyalakshmi.co.in/Students/signup',
    note: 'Collateral-free higher education loan with 3% interest subvention for top institutions.'
  },
  'pmay': {
    id: 'pmay',
    name: 'PMAY-U 2.0 Home Loan',
    amount: 2000000,
    rate: 8.5,
    subvention: 4.0,
    tenure: 240,
    applyUrl: 'https://pmaymis.gov.in/Open/Check_Aadhar_Existence.aspx',
    note: 'Interest subvention of 4% on urban home loans up to ?25 Lakhs for EWS/LIG/MIG.'
  },
  'kcc': {
    id: 'kcc',
    name: 'Kisan Credit Card (KCC)',
    amount: 200000,
    rate: 7.0,
    subvention: 3.0,
    tenure: 36,
    applyUrl: 'https://www.jansamarth.in/agri-infrastructure-loan-schemes',
    note: 'Subsidized crop credit at an effective 4% interest rate upon prompt repayment.'
  },
  'standup': {
    id: 'standup',
    name: 'Stand-Up India',
    amount: 2500000,
    rate: 8.5,
    subvention: 0.0,
    tenure: 84,
    applyUrl: 'https://www.standupmitra.in/Login/Register',
    note: 'Loans between ?10 Lakh and ?1 Crore to SC/ST and Women entrepreneurs.'
  },
  'custom': {
    id: 'custom',
    name: 'Custom Loan',
    amount: 500000,
    rate: 10.0,
    subvention: 0.0,
    tenure: 60,
    applyUrl: 'https://www.jansamarth.in/',
    note: 'Customize loan amount, rate, and tenure.'
  }
};

export function calculateLoanEMI({ principal, baseRate, subvention, tenureMonths }) {
  const P = parseFloat(principal);
  const baseR = parseFloat(baseRate);
  const sub = parseFloat(subvention);
  const n = parseInt(tenureMonths, 10);

  // Effective interest rate (minimum 0.1%)
  const effectiveRate = Math.max(0.1, baseR - sub);
  const r = (effectiveRate / 12) / 100;
  const rBase = (baseR / 12) / 100;

  // EMI = P * r * (1+r)^n / ((1+r)^n - 1)
  const emi = Math.round((P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1));
  const totalPayment = Math.round(emi * n);
  const totalInterest = Math.max(0, totalPayment - P);

  // Baseline without subsidy for savings display
  const baseEmi = Math.round((P * rBase * Math.pow(1 + rBase, n)) / (Math.pow(1 + rBase, n) - 1));
  const baseTotalPayment = Math.round(baseEmi * n);
  const subsidySavings = Math.max(0, baseTotalPayment - totalPayment);

  const principalPercent = Math.round((P / totalPayment) * 100);
  const interestPercent = 100 - principalPercent;

  return {
    emi,
    totalPayment,
    totalInterest,
    subsidySavings,
    effectiveRate,
    principalPercent,
    interestPercent
  };
}
