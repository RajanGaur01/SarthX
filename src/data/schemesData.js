// 52+ Central & State Schemes Database
export const SCHEMES_DATABASE = [
  {
    "id": "pm-kisan",
    "title": "PM Kisan Samman Nidhi",
    "title_hi": "पीएम किसान सम्मान निधि",
    "category": "agriculture",
    "categoryName": "Agriculture & Rural",
    "badgeClass": "badge-agriculture",
    "level": "Central",
    "state": "All India",
    "brief": "Direct income support of ₹6,000 per year in three equal installments to all landholding farmer families.",
    "detailedDescription": "Pradhan Mantri Kisan Samman Nidhi (PM-KISAN) is a central sector scheme with 100% funding from Government of India. Income support of ₹6,000/- per year is provided to all landholding farmer families in three equal installments of ₹2,000 each every 4 months, directly deposited into Aadhaar-seeded bank accounts.",
    "benefit": "₹6,000 / Year",
    "benefitType": "Direct Cash Benefit",
    "eligibilityCriteria": {
      "minAge": 18,
      "maxAge": 100,
      "gender": "all",
      "occupations": [
        "farmer"
      ],
      "caste": [
        "general",
        "obc",
        "sc",
        "st",
        "ews"
      ],
      "maxIncome": 1000000,
      "ruralUrban": "all",
      "landRequired": true,
      "disabilityRequired": false
    },
    "eligibilitySummary": "All landholding farmer families with cultivable land in their names.",
    "documentsRequired": [
      "Aadhaar Card",
      "Land Ownership Documents (Khasra / Khatauni / RoR)",
      "Active Bank Passbook (Aadhaar linked)",
      "Valid Mobile Number"
    ],
    "applicationProcess": "Apply online at pmkisan.gov.in via 'New Farmer Registration' or visit the nearest Common Service Centre (CSC).",
    "officialUrl": "https://pmkisan.gov.in/",
    "directApplyUrl": "https://pmkisan.gov.in/RegistrationFormNew.aspx",
    "tags": [
      "farmer",
      "agriculture",
      "income support",
      "dbt",
      "kisan"
    ]
  },
  {
    "id": "pmfby",
    "title": "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
    "title_hi": "प्रधानमंत्री फसल बीमा योजना",
    "category": "agriculture",
    "categoryName": "Agriculture & Rural",
    "badgeClass": "badge-agriculture",
    "level": "Central",
    "state": "All India",
    "brief": "Comprehensive, low-premium crop insurance covering non-preventable natural risks from pre-sowing to post-harvest.",
    "detailedDescription": "PMFBY provides comprehensive insurance coverage against failure of the crop, helping stabilize farmer income. Farmers pay only 2% for Kharif crops, 1.5% for Rabi crops, and 5% for commercial/horticultural crops.",
    "benefit": "Full Crop Loss Insurance",
    "benefitType": "Insurance Cover",
    "eligibilityCriteria": {
      "minAge": 18,
      "maxAge": 100,
      "gender": "all",
      "occupations": [
        "farmer"
      ],
      "caste": [
        "general",
        "obc",
        "sc",
        "st",
        "ews"
      ],
      "maxIncome": null,
      "ruralUrban": "rural",
      "landRequired": true,
      "disabilityRequired": false
    },
    "eligibilitySummary": "All farmers growing notified crops in notified areas including sharecroppers and tenant farmers.",
    "documentsRequired": [
      "Aadhaar Card",
      "Land Possession Certificate / Sowing Certificate",
      "Land Revenue Receipt / Land Registry",
      "Bank Account Passbook"
    ],
    "applicationProcess": "Enroll directly on the National Crop Insurance Portal or through your lending bank/CSC center.",
    "officialUrl": "https://pmfby.gov.in/",
    "directApplyUrl": "https://pmfby.gov.in/farmerRegistrationForm",
    "tags": [
      "farmer",
      "crop insurance",
      "agriculture",
      "fasal bima"
    ]
  },
  {
    "id": "kisan-credit-card",
    "title": "Kisan Credit Card (KCC) Scheme",
    "title_hi": "किसान क्रेडिट कार्ड योजना",
    "category": "agriculture",
    "categoryName": "Agriculture & Rural",
    "badgeClass": "badge-agriculture",
    "level": "Central",
    "state": "All India",
    "brief": "Adequate and timely credit support with interest subvention at an effective rate of just 4% for farming and animal husbandry.",
    "detailedDescription": "The Kisan Credit Card scheme provides farmers with single-window access to short-term loans for cultivating crops, post-harvest expenses, and animal husbandry at a subsidized 4% interest rate with prompt repayment.",
    "benefit": "Low-interest Credit up to ₹3 Lakh",
    "benefitType": "Subsidized Loan",
    "loanMetadata": {
      "maxAmount": 300000,
      "baseInterestRate": 7,
      "subsidizedRate": 4,
      "subvention": 3,
      "tenureYears": 5
    },
    "eligibilityCriteria": {
      "minAge": 18,
      "maxAge": 75,
      "gender": "all",
      "occupations": [
        "farmer",
        "self-employed"
      ],
      "caste": [
        "all"
      ],
      "maxIncome": null,
      "ruralUrban": "all",
      "landRequired": true,
      "disabilityRequired": false
    },
    "eligibilitySummary": "Owner cultivators, tenant farmers, oral lessees, sharecroppers, and SHGs of farmers.",
    "documentsRequired": [
      "Application Form",
      "Aadhaar / Voter ID",
      "Land Record (7/12 extract or Land Registry)",
      "Passport Size Photograph"
    ],
    "applicationProcess": "Apply online through JanSamarth portal or submit simplified KCC form at your local bank.",
    "officialUrl": "https://myscheme.gov.in/schemes/kcc",
    "directApplyUrl": "https://www.jansamarth.in/agri-infrastructure-loan-schemes",
    "tags": [
      "farmer",
      "credit",
      "loan",
      "kcc",
      "agriculture"
    ]
  },
  {
    "id": "pmksy",
    "title": "Pradhan Mantri Krishi Sinchayee Yojana (PMKSY)",
    "title_hi": "प्रधानमंत्री कृषि सिंचाई योजना",
    "category": "agriculture",
    "categoryName": "Agriculture & Rural",
    "badgeClass": "badge-agriculture",
    "level": "Central",
    "state": "All India",
    "brief": "'Har Khet Ko Pani' & 'Per Drop More Crop' with subsidies up to 55% on micro-irrigation systems (drip/sprinkler).",
    "detailedDescription": "PMKSY achieves convergence of investments in irrigation, expands cultivable area, and improves on-farm water use efficiency through drip and sprinkler systems.",
    "benefit": "Up to 55% Irrigation Subsidy",
    "benefitType": "Equipment Subsidy",
    "eligibilityCriteria": {
      "minAge": 18,
      "maxAge": 100,
      "gender": "all",
      "occupations": [
        "farmer"
      ],
      "caste": [
        "all"
      ],
      "maxIncome": null,
      "ruralUrban": "rural",
      "landRequired": true,
      "disabilityRequired": false
    },
    "eligibilitySummary": "Farmers of all categories possessing cultivable land and a water source.",
    "documentsRequired": [
      "Aadhaar Card",
      "Land Records (RoR)",
      "Bank Passbook Copy",
      "Irrigation Source Verification"
    ],
    "applicationProcess": "Apply via State Horticulture / Agriculture Department portal or District Agriculture Officer.",
    "officialUrl": "https://pmksy.gov.in/",
    "directApplyUrl": "https://pmksy.gov.in/mis/frmDashboard.aspx",
    "tags": [
      "farmer",
      "irrigation",
      "sinchayee",
      "drip irrigation",
      "water"
    ]
  },
  {
    "id": "soil-health-card",
    "title": "Soil Health Card Scheme",
    "title_hi": "मृदा स्वास्थ्य कार्ड योजना",
    "category": "agriculture",
    "categoryName": "Agriculture & Rural",
    "badgeClass": "badge-agriculture",
    "level": "Central",
    "state": "All India",
    "brief": "Free soil testing and customized nutrient recommendations issued every 3 years to boost crop yield.",
    "detailedDescription": "Soil Health Card provides status of soil across 12 chemical/physical parameters and recommends optimal dosage of fertilizers.",
    "benefit": "Free Soil Testing & Advisory",
    "benefitType": "Diagnostic Advisory",
    "eligibilityCriteria": {
      "minAge": 18,
      "maxAge": 100,
      "gender": "all",
      "occupations": [
        "farmer"
      ],
      "caste": [
        "all"
      ],
      "maxIncome": null,
      "ruralUrban": "rural",
      "landRequired": true,
      "disabilityRequired": false
    },
    "eligibilitySummary": "All farm landholders across India.",
    "documentsRequired": [
      "Aadhaar Card",
      "Land Khata / Khasra details"
    ],
    "applicationProcess": "Submit soil sample to the nearest Soil Testing Lab or District Agriculture Office.",
    "officialUrl": "https://soilhealth.dac.gov.in/",
    "directApplyUrl": "https://soilhealth.dac.gov.in/farmer-registration",
    "tags": [
      "farmer",
      "soil",
      "agriculture",
      "fertilizer"
    ]
  },
  {
    "id": "nsp-scholarship",
    "title": "National Scholarship Portal (NSP)",
    "title_hi": "राष्ट्रीय छात्रवृत्ति पोर्टल (NSP)",
    "category": "students",
    "categoryName": "Education & Learning",
    "badgeClass": "badge-students",
    "level": "Central",
    "state": "All India",
    "brief": "Single-window digital scholarship platform providing direct financial assistance to school and college students.",
    "detailedDescription": "NSP is a one-stop electronic platform for student scholarships under various Ministries. Disburses thousands of crores directly via Aadhaar Payment Bridge.",
    "benefit": "Up to ₹50,000 / Year",
    "benefitType": "Direct Bank Transfer Scholarship",
    "eligibilityCriteria": {
      "minAge": 6,
      "maxAge": 35,
      "gender": "all",
      "occupations": [
        "student"
      ],
      "caste": [
        "minority",
        "sc",
        "st",
        "obc",
        "general",
        "ews"
      ],
      "maxIncome": 250000,
      "ruralUrban": "all",
      "landRequired": false,
      "disabilityRequired": false
    },
    "eligibilitySummary": "Enrolled regular students with at least 50% marks in previous final exam whose annual family income is under ₹2.5 Lakhs.",
    "documentsRequired": [
      "Aadhaar Card or Student Enrolment ID",
      "Previous Year Academic Marksheet",
      "Current Year Fee Receipt / Admission Letter",
      "Family Income Certificate",
      "Bank Passbook in Student's Name",
      "Caste / Minority Community Certificate"
    ],
    "applicationProcess": "Register on scholarships.gov.in, complete OTR (One Time Registration) using Aadhaar, and submit online.",
    "officialUrl": "https://scholarships.gov.in/",
    "directApplyUrl": "https://scholarships.gov.in/fresh/newstdRegfrmInstruction",
    "tags": [
      "student",
      "scholarship",
      "education",
      "nsp",
      "college",
      "school"
    ]
  },
  {
    "id": "pm-usp",
    "title": "PM-USP Central Sector Scholarship",
    "title_hi": "पीएम-यूएसपी केंद्रीय क्षेत्र छात्रवृत्ति योजना",
    "category": "students",
    "categoryName": "Education & Learning",
    "badgeClass": "badge-students",
    "level": "Central",
    "state": "All India",
    "brief": "Financial aid of ₹12,000 to ₹20,000/year for meritorious college and university students.",
    "detailedDescription": "Provides scholarships to meritorious students from low-income families for meeting day-to-day expenses while pursuing graduation or post-graduation.",
    "benefit": "₹12,000 to ₹20,000 / Year",
    "benefitType": "Cash Scholarship",
    "eligibilityCriteria": {
      "minAge": 17,
      "maxAge": 25,
      "gender": "all",
      "occupations": [
        "student"
      ],
      "caste": [
        "general",
        "obc",
        "sc",
        "st",
        "ews"
      ],
      "maxIncome": 450000,
      "ruralUrban": "all",
      "landRequired": false,
      "disabilityRequired": false
    },
    "eligibilitySummary": "Above 80th percentile in relevant stream in Class XII with family income below ₹4.5 Lakh.",
    "documentsRequired": [
      "Class 12th Marksheet",
      "Income Certificate (under ₹4.5 Lakh)",
      "College Bonafide Certificate",
      "Aadhaar Seeded Bank Account"
    ],
    "applicationProcess": "Apply through National Scholarship Portal under Department of Higher Education.",
    "officialUrl": "https://scholarships.gov.in/",
    "directApplyUrl": "https://scholarships.gov.in/fresh/newstdRegfrmInstruction",
    "tags": [
      "student",
      "higher education",
      "college",
      "merit scholarship"
    ]
  },
  {
    "id": "aicte-pragati",
    "title": "AICTE Pragati Scholarship for Girl Students",
    "title_hi": "एआईसीटीई प्रगति बालिका छात्रवृत्ति",
    "category": "students",
    "categoryName": "Education & Learning",
    "badgeClass": "badge-students",
    "level": "Central",
    "state": "All India",
    "brief": "₹50,000 per annum for girl students pursuing Degree or Diploma technical courses in AICTE approved colleges.",
    "detailedDescription": "Assistance for advancement of girls pursuing technical education. Up to two girls per family can avail this scholarship for each year of engineering or diploma studies.",
    "benefit": "₹50,000 / Year",
    "benefitType": "Tuition & Allowance Grant",
    "eligibilityCriteria": {
      "minAge": 16,
      "maxAge": 26,
      "gender": "female",
      "occupations": [
        "student"
      ],
      "caste": [
        "all"
      ],
      "maxIncome": 800000,
      "ruralUrban": "all",
      "landRequired": false,
      "disabilityRequired": false
    },
    "eligibilitySummary": "Female students admitted to 1st year or 2nd year (lateral entry) of technical Degree/Diploma in AICTE approved institutions.",
    "documentsRequired": [
      "10th & 12th / Diploma Marksheet",
      "Admission Allotment Letter",
      "Income Certificate (< ₹8 Lakh/yr)",
      "Aadhaar Card",
      "College Bonafide"
    ],
    "applicationProcess": "Apply online through the National Scholarship Portal under AICTE section.",
    "officialUrl": "https://www.aicte-india.org/schemes/students-development-schemes/Pragati",
    "directApplyUrl": "https://scholarships.gov.in/",
    "tags": [
      "student",
      "girls",
      "women",
      "technical",
      "engineering",
      "diploma"
    ]
  },
  {
    "id": "post-matric-sc-st",
    "title": "Post-Matric Scholarship for SC/ST/OBC Students",
    "title_hi": "अनुसूचित जाति / जनजाति उत्तर-मैट्रिक छात्रवृत्ति",
    "category": "students",
    "categoryName": "Education & Learning",
    "badgeClass": "badge-students",
    "level": "Central",
    "state": "All India",
    "brief": "100% compulsory non-refundable fees reimbursement + monthly maintenance allowance for post-secondary studies.",
    "detailedDescription": "Centrally sponsored flagship scheme providing complete educational financial security to SC, ST, and OBC candidates studying from Class 11th through PhD.",
    "benefit": "Full Tuition Fee + Maintenance Allowance",
    "benefitType": "Fee Waiver & Stipend",
    "eligibilityCriteria": {
      "minAge": 15,
      "maxAge": 35,
      "gender": "all",
      "occupations": [
        "student"
      ],
      "caste": [
        "sc",
        "st",
        "obc"
      ],
      "maxIncome": 250000,
      "ruralUrban": "all",
      "landRequired": false,
      "disabilityRequired": false
    },
    "eligibilitySummary": "SC/ST/OBC students pursuing post-matriculation courses with annual parental income not exceeding ₹2.5 Lakh.",
    "documentsRequired": [
      "Caste Certificate",
      "Income Certificate",
      "Previous Year Academic Marksheet",
      "Fee Receipt of Current Course",
      "Aadhaar Card"
    ],
    "applicationProcess": "Submit application on State Scholarship Portal or NSP under Ministry of Social Justice.",
    "officialUrl": "https://socialjustice.gov.in/",
    "directApplyUrl": "https://scholarships.gov.in/",
    "tags": [
      "student",
      "sc",
      "st",
      "obc",
      "post-matric",
      "scholarship"
    ]
  },
  {
    "id": "pm-vidyalakshmi",
    "title": "PM Vidyalaxmi Education Loan Scheme",
    "title_hi": "पीएम विद्यालक्ष्मी शिक्षा ऋण योजना",
    "category": "students",
    "categoryName": "Education & Learning",
    "badgeClass": "badge-students",
    "level": "Central",
    "state": "All India",
    "brief": "Collateral-free, guarantor-free education loans with 3% interest subvention for higher education in top NIRF institutions.",
    "detailedDescription": "Unified portal for education loans. Students admitted to top 860 quality higher educational institutions in India can obtain collateral-free loans covering full tuition with government-backed credit guarantee and 3% interest subvention.",
    "benefit": "Up to ₹10 Lakh Collateral-free Loan + 3% Interest Subsidy",
    "benefitType": "Education Loan Support",
    "loanMetadata": {
      "maxAmount": 1000000,
      "baseInterestRate": 9.5,
      "subsidizedRate": 6.5,
      "subvention": 3,
      "tenureYears": 10
    },
    "eligibilityCriteria": {
      "minAge": 17,
      "maxAge": 35,
      "gender": "all",
      "occupations": [
        "student"
      ],
      "caste": [
        "all"
      ],
      "maxIncome": 800000,
      "ruralUrban": "all",
      "landRequired": false,
      "disabilityRequired": false
    },
    "eligibilitySummary": "Students admitted to top NIRF-ranked higher educational institutions with family income up to ₹8 Lakh.",
    "documentsRequired": [
      "Admission Confirmation / Fee Schedule",
      "Class 10th & 12th Marksheet",
      "Aadhaar Card / PAN Card",
      "Income Certificate"
    ],
    "applicationProcess": "Apply directly through the PM Vidyalaxmi portal and choose from 40+ empanelled banks.",
    "officialUrl": "https://www.vidyalakshmi.co.in/",
    "directApplyUrl": "https://www.vidyalakshmi.co.in/Students/signup",
    "tags": [
      "student",
      "loan",
      "education",
      "vidyalakshmi",
      "higher education"
    ]
  },
  {
    "id": "pm-mudra",
    "title": "Pradhan Mantri MUDRA Yojana (PMMY)",
    "title_hi": "प्रधानमंत्री मुद्रा योजना",
    "category": "financial",
    "categoryName": "Banking & Financial",
    "badgeClass": "badge-financial",
    "level": "Central",
    "state": "All India",
    "brief": "Collateral-free business loans up to ₹20 Lakhs for micro and small enterprises across Shishu, Kishore, and Tarun tiers.",
    "detailedDescription": "PMMY provides institutional credit to micro and small non-corporate enterprises. Shishu (loans up to ₹50,000), Kishore (loans ₹50,000 to ₹5 Lakh), Tarun (loans ₹5 Lakh to ₹10 Lakh), and Tarun Plus (up to ₹20 Lakhs).",
    "benefit": "Collateral-Free Loan up to ₹20 Lakhs",
    "benefitType": "Institutional Credit",
    "loanMetadata": {
      "maxAmount": 2000000,
      "baseInterestRate": 9,
      "subsidizedRate": 9,
      "subvention": 0,
      "tenureYears": 5
    },
    "eligibilityCriteria": {
      "minAge": 18,
      "maxAge": 65,
      "gender": "all",
      "occupations": [
        "self-employed",
        "unemployed",
        "worker"
      ],
      "caste": [
        "all"
      ],
      "maxIncome": null,
      "ruralUrban": "all",
      "landRequired": false,
      "disabilityRequired": false
    },
    "eligibilitySummary": "Any Indian citizen with a business plan for non-farm income generating activity.",
    "documentsRequired": [
      "Identity Proof (Aadhaar / Voter ID / PAN)",
      "Residence Proof",
      "Business Enterprise Proof / Udyam Registration",
      "Last 6 Months Bank Statement"
    ],
    "applicationProcess": "Apply online at JanSamarth.in or visit any Public/Private Sector Bank branch.",
    "officialUrl": "https://www.mudra.org.in/",
    "directApplyUrl": "https://www.jansamarth.in/business-activity-loans",
    "tags": [
      "financial",
      "business",
      "loan",
      "mudra",
      "entrepreneur",
      "credit"
    ]
  },
  {
    "id": "stand-up-india",
    "title": "Stand-Up India Scheme",
    "title_hi": "स्टैंड-अप इंडिया योजना",
    "category": "financial",
    "categoryName": "Banking & Financial",
    "badgeClass": "badge-financial",
    "level": "Central",
    "state": "All India",
    "brief": "Bank loans between ₹10 Lakhs and ₹1 Crore to SC/ST and Women entrepreneurs for greenfield enterprises.",
    "detailedDescription": "Facilitates bank loans between ₹10 Lakh and ₹1 Crore to at least one SC/ST borrower and at least one woman borrower per bank branch for setting up a greenfield enterprise.",
    "benefit": "₹10 Lakh to ₹1 Crore Loan",
    "benefitType": "Composite Enterprise Loan",
    "loanMetadata": {
      "maxAmount": 10000000,
      "baseInterestRate": 8.5,
      "subsidizedRate": 8.5,
      "subvention": 0,
      "tenureYears": 7
    },
    "eligibilityCriteria": {
      "minAge": 18,
      "maxAge": 70,
      "gender": "female",
      "occupations": [
        "self-employed",
        "unemployed"
      ],
      "caste": [
        "sc",
        "st",
        "all"
      ],
      "maxIncome": null,
      "ruralUrban": "all",
      "landRequired": false,
      "disabilityRequired": false
    },
    "eligibilitySummary": "SC/ST individuals and women entrepreneurs of any caste setting up a new enterprise.",
    "documentsRequired": [
      "Aadhaar Card, PAN Card",
      "Caste Certificate (for SC/ST)",
      "Detailed Project Report (DPR)"
    ],
    "applicationProcess": "Register at standupmitra.in or approach any scheduled commercial bank branch.",
    "officialUrl": "https://www.standupmitra.in/",
    "directApplyUrl": "https://www.standupmitra.in/Login/Register",
    "tags": [
      "financial",
      "women",
      "sc",
      "st",
      "business",
      "stand-up"
    ]
  },
  {
    "id": "pmjjby",
    "title": "PM Jeevan Jyoti Bima Yojana (PMJJBY)",
    "title_hi": "प्रधानमंत्री जीवन ज्योति बीमा योजना",
    "category": "financial",
    "categoryName": "Banking & Financial",
    "badgeClass": "badge-financial",
    "level": "Central",
    "state": "All India",
    "brief": "₹2 Lakh life insurance cover on death due to any cause at an annual premium of just ₹436.",
    "detailedDescription": "One-year life insurance scheme renewable annually offering coverage of ₹2 Lakh for death due to any reason.",
    "benefit": "₹2,00,000 Life Insurance",
    "benefitType": "Insurance Sum Assured",
    "eligibilityCriteria": {
      "minAge": 18,
      "maxAge": 50,
      "gender": "all",
      "occupations": [
        "all"
      ],
      "caste": [
        "all"
      ],
      "maxIncome": null,
      "ruralUrban": "all",
      "landRequired": false,
      "disabilityRequired": false
    },
    "eligibilitySummary": "Any person aged 18 to 50 years holding a savings bank account with auto-debit consent.",
    "documentsRequired": [
      "Aadhaar Card",
      "Savings Bank Passbook",
      "Nominee Details"
    ],
    "applicationProcess": "Enable auto-debit via net banking or submit consent form at your bank branch.",
    "officialUrl": "https://www.jansuraksha.gov.in/",
    "directApplyUrl": "https://www.jansuraksha.gov.in/Forms-PMJJBY.aspx",
    "tags": [
      "financial",
      "life insurance",
      "jansuraksha",
      "insurance",
      "pmjjby"
    ]
  },
  {
    "id": "pmsby",
    "title": "PM Suraksha Bima Yojana (PMSBY)",
    "title_hi": "प्रधानमंत्री सुरक्षा बीमा योजना",
    "category": "financial",
    "categoryName": "Banking & Financial",
    "badgeClass": "badge-financial",
    "level": "Central",
    "state": "All India",
    "brief": "₹2 Lakh accidental death and disability cover at an ultra-low premium of just ₹20 per year.",
    "detailedDescription": "Accident insurance scheme offering accidental death and disability cover of ₹2 Lakhs for an annual premium of just ₹20.",
    "benefit": "₹2,00,000 Accidental Cover",
    "benefitType": "Accident Insurance",
    "eligibilityCriteria": {
      "minAge": 18,
      "maxAge": 70,
      "gender": "all",
      "occupations": [
        "all"
      ],
      "caste": [
        "all"
      ],
      "maxIncome": null,
      "ruralUrban": "all",
      "landRequired": false,
      "disabilityRequired": false
    },
    "eligibilitySummary": "All bank account holders aged 18 to 70 years.",
    "documentsRequired": [
      "Aadhaar Card",
      "Savings Bank Passbook",
      "Nominee Details"
    ],
    "applicationProcess": "Enrol through mobile banking, internet banking, or visit your savings bank branch.",
    "officialUrl": "https://www.jansuraksha.gov.in/",
    "directApplyUrl": "https://www.jansuraksha.gov.in/Forms-PMSBY.aspx",
    "tags": [
      "financial",
      "accident insurance",
      "jansuraksha",
      "pmsby"
    ]
  },
  {
    "id": "atal-pension",
    "title": "Atal Pension Yojana (APY)",
    "title_hi": "अटल पेंशन योजना",
    "category": "financial",
    "categoryName": "Banking & Financial",
    "badgeClass": "badge-financial",
    "level": "Central",
    "state": "All India",
    "brief": "Government guaranteed lifelong monthly pension of ₹1,000 to ₹5,000 from age 60 for unorganized workers.",
    "detailedDescription": "Focuses on unorganized sector workers to help build retirement corpus with guaranteed monthly pension.",
    "benefit": "₹1,00,00 to ₹5,000 Monthly Pension",
    "benefitType": "Guaranteed Pension",
    "eligibilityCriteria": {
      "minAge": 18,
      "maxAge": 40,
      "gender": "all",
      "occupations": [
        "worker",
        "self-employed",
        "farmer",
        "unemployed"
      ],
      "caste": [
        "all"
      ],
      "maxIncome": null,
      "ruralUrban": "all",
      "landRequired": false,
      "disabilityRequired": false
    },
    "eligibilitySummary": "Citizens aged 18 to 40 years holding a savings bank account (non-taxpayers).",
    "documentsRequired": [
      "Aadhaar Card",
      "Savings Bank Account",
      "Mobile Number"
    ],
    "applicationProcess": "Apply online through bank net banking or visit bank branch / post office.",
    "officialUrl": "https://www.npscra.nsdl.co.in/",
    "directApplyUrl": "https://enps.nsdl.com/eNPS/ApySubRegistration.html",
    "tags": [
      "financial",
      "pension",
      "unorganized worker",
      "retirement",
      "apy"
    ]
  },
  {
    "id": "pmjay",
    "title": "Ayushman Bharat PM-JAY",
    "title_hi": "आयुष्मान भारत प्रधानमंत्री जन आरोग्य योजना",
    "category": "health",
    "categoryName": "Health & Wellness",
    "badgeClass": "badge-health",
    "level": "Central",
    "state": "All India",
    "brief": "Free cashless health insurance coverage of ₹5 Lakhs per family per year across 28,000+ empaneled hospitals.",
    "detailedDescription": "World's largest health assurance scheme. Cashless secondary and tertiary hospitalization coverage of ₹5,00,000 per family per year. Expanded to include all senior citizens aged 70+.",
    "benefit": "₹5,00,000 / Year Cashless Treatment",
    "benefitType": "Cashless Hospitalization",
    "eligibilityCriteria": {
      "minAge": 0,
      "maxAge": 120,
      "gender": "all",
      "occupations": [
        "all"
      ],
      "caste": [
        "all"
      ],
      "maxIncome": 250000,
      "ruralUrban": "all",
      "landRequired": false,
      "disabilityRequired": false
    },
    "eligibilitySummary": "SECC 2011 families, NFSA Ration Card holders, and all citizens aged 70+.",
    "documentsRequired": [
      "Aadhaar Card",
      "Ration Card / Family ID",
      "Mobile Number"
    ],
    "applicationProcess": "Check eligibility and generate Ayushman Card instantly online at beneficiary.nha.gov.in.",
    "officialUrl": "https://pmjay.gov.in/",
    "directApplyUrl": "https://beneficiary.nha.gov.in/",
    "tags": [
      "health",
      "ayushman",
      "insurance",
      "hospital",
      "cashless",
      "senior citizen",
      "pmjay"
    ]
  },
  {
    "id": "jan-aushadhi",
    "title": "PM Bhartiya Janaushadhi Pariyojana",
    "title_hi": "प्रधानमंत्री भारतीय जनऔषधि परियोजना",
    "category": "health",
    "categoryName": "Health & Wellness",
    "badgeClass": "badge-health",
    "level": "Central",
    "state": "All India",
    "brief": "Quality generic medicines at 50% to 90% cheaper prices through 10,000+ Jan Aushadhi Kendras nationwide.",
    "detailedDescription": "Provides quality generic medicines, surgical items, and nutraceuticals at affordable prices.",
    "benefit": "50% to 90% Savings on Medicines",
    "benefitType": "Subsidized Generic Healthcare",
    "eligibilityCriteria": {
      "minAge": 0,
      "maxAge": 120,
      "gender": "all",
      "occupations": [
        "all"
      ],
      "caste": [
        "all"
      ],
      "maxIncome": null,
      "ruralUrban": "all",
      "landRequired": false,
      "disabilityRequired": false
    },
    "eligibilitySummary": "Open to all Indian citizens without restriction.",
    "documentsRequired": [
      "Doctor's Prescription"
    ],
    "applicationProcess": "Locate and walk in to any nearby Pradhan Mantri Bhartiya Jan Aushadhi Kendra.",
    "officialUrl": "https://janaushadhi.gov.in/",
    "directApplyUrl": "https://janaushadhi.gov.in/KendraDetails.aspx",
    "tags": [
      "health",
      "medicine",
      "jan aushadhi",
      "pharmacy",
      "generic drugs"
    ]
  },
  {
    "id": "indradhanush",
    "title": "Mission Indradhanush (IMI 5.0)",
    "title_hi": "मिशन इंद्रधनुष",
    "category": "health",
    "categoryName": "Health & Wellness",
    "badgeClass": "badge-health",
    "level": "Central",
    "state": "All India",
    "brief": "Complete free immunization coverage for all children under 5 years and pregnant women against 12 diseases.",
    "detailedDescription": "Ensures full immunization coverage for unvaccinated children and pregnant mothers.",
    "benefit": "100% Free Lifesaving Vaccines",
    "benefitType": "Free Healthcare & Vaccination",
    "eligibilityCriteria": {
      "minAge": 0,
      "maxAge": 5,
      "gender": "all",
      "occupations": [
        "all"
      ],
      "caste": [
        "all"
      ],
      "maxIncome": null,
      "ruralUrban": "all",
      "landRequired": false,
      "disabilityRequired": false
    },
    "eligibilitySummary": "All pregnant women and infants/children up to 5 years of age.",
    "documentsRequired": [
      "Mother-Child Protection (MCP) Card",
      "Parent Aadhaar"
    ],
    "applicationProcess": "Visit any Anganwadi center, Primary Health Centre, or Community Health Centre.",
    "officialUrl": "https://www.mohfw.gov.in/",
    "directApplyUrl": "https://uwin.mohfw.gov.in/",
    "tags": [
      "health",
      "vaccination",
      "children",
      "pregnant women",
      "infant"
    ]
  },
  {
    "id": "nikshay-poshan",
    "title": "Nikshay Poshan Yojana for TB Patients",
    "title_hi": "निक्षय पोषण योजना",
    "category": "health",
    "categoryName": "Health & Wellness",
    "badgeClass": "badge-health",
    "level": "Central",
    "state": "All India",
    "brief": "Direct nutritional financial support of ₹1,000 per month for every TB patient throughout treatment duration.",
    "detailedDescription": "Direct nutritional cash support to each registered TB patient to cover dietary requirements during treatment.",
    "benefit": "₹1,000 / Month DBT Support",
    "benefitType": "Nutritional Cash Benefit",
    "eligibilityCriteria": {
      "minAge": 0,
      "maxAge": 100,
      "gender": "all",
      "occupations": [
        "all"
      ],
      "caste": [
        "all"
      ],
      "maxIncome": null,
      "ruralUrban": "all",
      "landRequired": false,
      "disabilityRequired": false
    },
    "eligibilitySummary": "All diagnosed tuberculosis patients registered on the Ni-kshay portal.",
    "documentsRequired": [
      "TB Diagnostic Report",
      "Aadhaar Card",
      "Bank Account Details"
    ],
    "applicationProcess": "Enrolled directly through the treating hospital or the Ni-kshay portal.",
    "officialUrl": "https://www.nikshay.in/",
    "directApplyUrl": "https://www.nikshay.in/",
    "tags": [
      "health",
      "tb",
      "tuberculosis",
      "nutrition",
      "dbt",
      "nikshay"
    ]
  },
  {
    "id": "pmay-urban",
    "title": "PM Awas Yojana - Urban 2.0 (PMAY-U)",
    "title_hi": "प्रधानमंत्री आवास योजना - शहरी 2.0",
    "category": "housing",
    "categoryName": "Housing & Shelter",
    "badgeClass": "badge-housing",
    "level": "Central",
    "state": "All India",
    "brief": "Interest subsidy of up to ₹1.80 Lakhs and direct financial assistance for pucca house construction/purchase in urban areas.",
    "detailedDescription": "Under PMAY-U 2.0, 1 crore urban poor and middle-class families receive interest subvention of up to 4% on home loans up to ₹25 Lakhs for houses valued up to ₹35 Lakhs.",
    "benefit": "Up to ₹2.67 Lakhs Interest Subsidy",
    "benefitType": "Home Loan Subsidy",
    "loanMetadata": {
      "maxAmount": 2500000,
      "baseInterestRate": 8.5,
      "subsidizedRate": 4.5,
      "subvention": 4,
      "tenureYears": 20
    },
    "eligibilityCriteria": {
      "minAge": 21,
      "maxAge": 70,
      "gender": "all",
      "occupations": [
        "all"
      ],
      "caste": [
        "all"
      ],
      "maxIncome": 900000,
      "ruralUrban": "urban",
      "landRequired": false,
      "disabilityRequired": false
    },
    "eligibilitySummary": "Beneficiary family must not own a pucca house anywhere in India. Female co-ownership mandatory.",
    "documentsRequired": [
      "Aadhaar Cards of all family members",
      "Income Proof / Salary Slips / ITR",
      "Property papers / Builder agreement"
    ],
    "applicationProcess": "Apply online on pmaymis.gov.in or through banks/housing finance corporations.",
    "officialUrl": "https://pmaymis.gov.in/",
    "directApplyUrl": "https://pmaymis.gov.in/Open/Check_Aadhar_Existence.aspx",
    "tags": [
      "housing",
      "pmay",
      "pucca house",
      "urban",
      "home loan",
      "subsidy"
    ]
  },
  {
    "id": "pmay-gramin",
    "title": "PM Awas Yojana - Gramin (PMAY-G)",
    "title_hi": "प्रधानमंत्री आवास योजना - ग्रामीण",
    "category": "housing",
    "categoryName": "Housing & Shelter",
    "badgeClass": "badge-housing",
    "level": "Central",
    "state": "All India",
    "brief": "Direct grant of ₹1.20 Lakhs (plains) to ₹1.30 Lakhs (hilly areas) + 90 days MGNREGA wages for building a rural pucca house.",
    "detailedDescription": "Provides direct financial grant to houseless villagers and those living in kutcha houses.",
    "benefit": "₹1,20,000 to ₹1,30,000 Cash Grant",
    "benefitType": "Direct Construction Grant",
    "eligibilityCriteria": {
      "minAge": 18,
      "maxAge": 100,
      "gender": "all",
      "occupations": [
        "worker",
        "farmer",
        "unemployed"
      ],
      "caste": [
        "sc",
        "st",
        "minority",
        "obc",
        "general"
      ],
      "maxIncome": 150000,
      "ruralUrban": "rural",
      "landRequired": false,
      "disabilityRequired": false
    },
    "eligibilitySummary": "Deprived rural households identified through SECC list and validated by Gram Sabha.",
    "documentsRequired": [
      "Aadhaar Card",
      "Bank Passbook",
      "MGNREGA Job Card"
    ],
    "applicationProcess": "List finalized by Gram Panchayat. Check status on AwaasSoft portal.",
    "officialUrl": "https://pmayg.nic.in/",
    "directApplyUrl": "https://awaassoft.nic.in/netiay/benificiary.aspx",
    "tags": [
      "housing",
      "rural",
      "pmay-g",
      "gramin",
      "pucca house",
      "grant"
    ]
  },
  {
    "id": "sukanya-samriddhi",
    "title": "Sukanya Samriddhi Yojana (SSY)",
    "title_hi": "सुकन्या समृद्धि योजना",
    "category": "women",
    "categoryName": "Women & Child",
    "badgeClass": "badge-women",
    "level": "Central",
    "state": "All India",
    "brief": "Highest government guaranteed interest rate (8.2% p.a.) with complete triple tax exemption (EEE) for a girl child's future.",
    "detailedDescription": "Savings scheme under Beti Bachao Beti Padhao. Parents can open an account for daughters under 10 years of age with ₹250 to ₹1.5 Lakh/year.",
    "benefit": "8.2% Compound Interest + Tax Exemption",
    "benefitType": "High-yield Small Savings",
    "eligibilityCriteria": {
      "minAge": 0,
      "maxAge": 10,
      "gender": "female",
      "occupations": [
        "all"
      ],
      "caste": [
        "all"
      ],
      "maxIncome": null,
      "ruralUrban": "all",
      "landRequired": false,
      "disabilityRequired": false
    },
    "eligibilitySummary": "Girl child under 10 years of age at the time of account opening.",
    "documentsRequired": [
      "Birth Certificate of Girl Child",
      "Identity and Address Proof of Parent"
    ],
    "applicationProcess": "Open an SSY account at any Post Office or nationalized bank branch.",
    "officialUrl": "https://www.nsiindia.gov.in/",
    "directApplyUrl": "https://www.indiapost.gov.in/Financial/Pages/Content/Sukanya-Samriddhi-Account.aspx",
    "tags": [
      "women",
      "girl child",
      "savings",
      "tax free",
      "education",
      "sukanya"
    ]
  },
  {
    "id": "pmmvy",
    "title": "Pradhan Mantri Matru Vandana Yojana (PMMVY)",
    "title_hi": "प्रधानमंत्री मातृ वंदना योजना",
    "category": "women",
    "categoryName": "Women & Child",
    "badgeClass": "badge-women",
    "level": "Central",
    "state": "All India",
    "brief": "Maternity benefit of ₹5,000 for first child and ₹6,000 for second child (if girl) to compensate wage loss and ensure nutrition.",
    "detailedDescription": "Cash incentives through DBT to pregnant women and lactating mothers for wage compensation and nutrition.",
    "benefit": "₹5,000 to ₹6,000 Cash Support",
    "benefitType": "Maternity Benefit DBT",
    "eligibilityCriteria": {
      "minAge": 19,
      "maxAge": 45,
      "gender": "female",
      "occupations": [
        "all"
      ],
      "caste": [
        "all"
      ],
      "maxIncome": 800000,
      "ruralUrban": "all",
      "landRequired": false,
      "disabilityRequired": false
    },
    "eligibilitySummary": "Pregnant women and lactating mothers (except government employees receiving paid maternity leave).",
    "documentsRequired": [
      "Mother-Child Protection Card",
      "Aadhaar Card",
      "Bank Account Passbook"
    ],
    "applicationProcess": "Register online on pmmvy.wcd.gov.in or visit local Anganwadi/ASHA worker.",
    "officialUrl": "https://pmmvy.wcd.gov.in/",
    "directApplyUrl": "https://pmmvy.wcd.gov.in/citizen-login",
    "tags": [
      "women",
      "maternity",
      "pregnant",
      "mother",
      "child",
      "pmmvy"
    ]
  },
  {
    "id": "mahila-samman",
    "title": "Mahila Samman Savings Certificate (MSSC)",
    "title_hi": "महिला सम्मान बचत प्रमाण पत्र",
    "category": "women",
    "categoryName": "Women & Child",
    "badgeClass": "badge-women",
    "level": "Central",
    "state": "All India",
    "brief": "Attractive 7.5% fixed annual interest rate on 2-year deposits up to ₹2 Lakhs exclusively for women and girls.",
    "detailedDescription": "Government-backed 2-year tenure small savings scheme designed to promote financial independence among women.",
    "benefit": "7.5% Fixed Annual Return",
    "benefitType": "Guaranteed Return Investment",
    "eligibilityCriteria": {
      "minAge": 0,
      "maxAge": 100,
      "gender": "female",
      "occupations": [
        "all"
      ],
      "caste": [
        "all"
      ],
      "maxIncome": null,
      "ruralUrban": "all",
      "landRequired": false,
      "disabilityRequired": false
    },
    "eligibilitySummary": "Any woman for herself or guardian on behalf of a minor girl.",
    "documentsRequired": [
      "Aadhaar Card",
      "PAN Card",
      "Account Opening Form"
    ],
    "applicationProcess": "Visit any Post Office or designated nationalized bank branch.",
    "officialUrl": "https://www.indiapost.gov.in/",
    "directApplyUrl": "https://www.indiapost.gov.in/Financial/Pages/Content/Mahila-Samman-Savings-Certificate.aspx",
    "tags": [
      "women",
      "savings",
      "investment",
      "mssc",
      "fixed deposit"
    ]
  },
  {
    "id": "pm-ujjwala",
    "title": "Pradhan Mantri Ujjwala Yojana 2.0",
    "title_hi": "प्रधानमंत्री उज्ज्वला योजना 2.0",
    "category": "women",
    "categoryName": "Women & Child",
    "badgeClass": "badge-women",
    "level": "Central",
    "state": "All India",
    "brief": "Deposit-free LPG cylinder connection + free first refill and hotplate (stove) to adult women from poor households.",
    "detailedDescription": "Ujjwala 2.0 provides clean cooking fuel to deprived rural and urban households without security deposit.",
    "benefit": "Free LPG Connection + Stove + First Refill",
    "benefitType": "Clean Energy Infrastructure",
    "eligibilityCriteria": {
      "minAge": 18,
      "maxAge": 90,
      "gender": "female",
      "occupations": [
        "all"
      ],
      "caste": [
        "sc",
        "st",
        "obc",
        "general",
        "ews"
      ],
      "maxIncome": 200000,
      "ruralUrban": "all",
      "landRequired": false,
      "disabilityRequired": false
    },
    "eligibilitySummary": "Adult woman belonging to an eligible poor household having no active LPG connection.",
    "documentsRequired": [
      "Aadhaar Card",
      "Ration Card",
      "Bank Account Passbook"
    ],
    "applicationProcess": "Apply online at pmuy.gov.in or submit form at nearest LPG distributor.",
    "officialUrl": "https://www.pmuy.gov.in/",
    "directApplyUrl": "https://www.pmuy.gov.in/ujjwala2.html",
    "tags": [
      "women",
      "gas",
      "lpg",
      "ujjwala",
      "clean fuel",
      "bpl"
    ]
  },
  {
    "id": "pmkvy",
    "title": "PM Kaushal Vikas Yojana 4.0 (PMKVY)",
    "title_hi": "प्रधानमंत्री कौशल विकास योजना 4.0",
    "category": "skills",
    "categoryName": "Skills & Employment",
    "badgeClass": "badge-skills",
    "level": "Central",
    "state": "All India",
    "brief": "Free industry-aligned skill training, government certification, toolkit stipend, and placement assistance.",
    "detailedDescription": "Emphasizes on-job training, Industry 4.0 courses (AI, Robotics, Drones, IoT), soft skills, and entrepreneurship.",
    "benefit": "100% Free Certified Training + ₹8,000 Stipend",
    "benefitType": "Skill Training & Certification",
    "eligibilityCriteria": {
      "minAge": 15,
      "maxAge": 45,
      "gender": "all",
      "occupations": [
        "student",
        "unemployed",
        "worker"
      ],
      "caste": [
        "all"
      ],
      "maxIncome": null,
      "ruralUrban": "all",
      "landRequired": false,
      "disabilityRequired": false
    },
    "eligibilitySummary": "Indian youth looking to acquire market-relevant skills.",
    "documentsRequired": [
      "Aadhaar Card",
      "Educational Marksheet",
      "Bank Account"
    ],
    "applicationProcess": "Register on Skill India Digital portal and choose your preferred training center and trade.",
    "officialUrl": "https://www.pmkvyofficial.org/",
    "directApplyUrl": "https://www.skillindiadigital.gov.in/home",
    "tags": [
      "skills",
      "youth",
      "job",
      "training",
      "pmkvy",
      "nsdc",
      "student"
    ]
  },
  {
    "id": "pm-vishwakarma",
    "title": "PM Vishwakarma Scheme",
    "title_hi": "पीएम विश्वकर्मा योजना",
    "category": "skills",
    "categoryName": "Skills & Employment",
    "badgeClass": "badge-skills",
    "level": "Central",
    "state": "All India",
    "brief": "Holistic support for 18 traditional artisan trades: PM Vishwakarma Certificate, ₹15,000 toolkit incentive, and collateral-free loans up to ₹3 Lakh at 5% interest.",
    "detailedDescription": "Empowers traditional artisans and craftspeople. Benefits include 5-7 days basic training with ₹500/day stipend, ₹15,000 digital voucher for modern toolkits, and collateral-free enterprise credit at 5% interest.",
    "benefit": "₹15,000 Toolkit Grant + ₹3 Lakh Loan at 5%",
    "benefitType": "Artisan Welfare & Credit",
    "loanMetadata": {
      "maxAmount": 300000,
      "baseInterestRate": 8,
      "subsidizedRate": 5,
      "subvention": 3,
      "tenureYears": 3
    },
    "eligibilityCriteria": {
      "minAge": 18,
      "maxAge": 80,
      "gender": "all",
      "occupations": [
        "worker",
        "self-employed"
      ],
      "caste": [
        "all"
      ],
      "maxIncome": null,
      "ruralUrban": "all",
      "landRequired": false,
      "disabilityRequired": false
    },
    "eligibilitySummary": "Artisans or craftspeople engaged in one of the 18 specified traditional trades.",
    "documentsRequired": [
      "Aadhaar Card",
      "Bank Passbook",
      "Ration Card",
      "Trade Verification"
    ],
    "applicationProcess": "Apply online at pmvishwakarma.gov.in through CSC with biometric authentication.",
    "officialUrl": "https://pmvishwakarma.gov.in/",
    "directApplyUrl": "https://pmvishwakarma.gov.in/Home/HowToRegister",
    "tags": [
      "skills",
      "artisan",
      "vishwakarma",
      "craftsman",
      "loan",
      "toolkit",
      "financial"
    ]
  },
  {
    "id": "pm-svanidhi",
    "title": "PM Street Vendor's AtmaNirbhar Nidhi (PM SVANidhi)",
    "title_hi": "पीएम स्वनिधि योजना",
    "category": "skills",
    "categoryName": "Skills & Employment",
    "badgeClass": "badge-skills",
    "level": "Central",
    "state": "All India",
    "brief": "Working capital micro-credit for urban street vendors starting with ₹10,000, scaling to ₹20,000 and ₹50,000 with 7% interest subsidy.",
    "detailedDescription": "Affordable working capital loans to urban street vendors and hawkers. Repayment on time qualifies for higher credit and 7% interest subsidy directly credited into bank accounts.",
    "benefit": "Up to ₹50,000 Working Capital Loan",
    "benefitType": "Subsidized Micro-Credit",
    "loanMetadata": {
      "maxAmount": 50000,
      "baseInterestRate": 10,
      "subsidizedRate": 3,
      "subvention": 7,
      "tenureYears": 1
    },
    "eligibilityCriteria": {
      "minAge": 18,
      "maxAge": 70,
      "gender": "all",
      "occupations": [
        "worker",
        "self-employed"
      ],
      "caste": [
        "all"
      ],
      "maxIncome": null,
      "ruralUrban": "urban",
      "landRequired": false,
      "disabilityRequired": false
    },
    "eligibilitySummary": "Street vendors vending in urban areas possessing Certificate of Vending or Letter of Recommendation.",
    "documentsRequired": [
      "Aadhaar Card",
      "Certificate of Vending / LOR",
      "Bank Account Details"
    ],
    "applicationProcess": "Apply directly online on pmsvanidhi.mohua.gov.in or through nearest CSC.",
    "officialUrl": "https://pmsvanidhi.mohua.gov.in/",
    "directApplyUrl": "https://pmsvanidhi.mohua.gov.in/Home/PreApplication",
    "tags": [
      "skills",
      "vendor",
      "street vendor",
      "loan",
      "svanidhi",
      "micro credit"
    ]
  },
  {
    "id": "eshram",
    "title": "e-Shram Social Security Card",
    "title_hi": "ई-श्रम सामाजिक सुरक्षा कार्ड",
    "category": "skills",
    "categoryName": "Skills & Employment",
    "badgeClass": "badge-skills",
    "level": "Central",
    "state": "All India",
    "brief": "Universal 12-digit UAN Card for 30+ crore unorganized workers with ₹2 Lakh accidental insurance and linked social security.",
    "detailedDescription": "National Database of Unorganized Workers. Registered workers receive UAN card linking them with accidental insurance and emergency social assistance.",
    "benefit": "Universal UAN Card + ₹2 Lakh Insurance",
    "benefitType": "Social Security Identity",
    "eligibilityCriteria": {
      "minAge": 16,
      "maxAge": 59,
      "gender": "all",
      "occupations": [
        "worker",
        "farmer",
        "self-employed"
      ],
      "caste": [
        "all"
      ],
      "maxIncome": null,
      "ruralUrban": "all",
      "landRequired": false,
      "disabilityRequired": false
    },
    "eligibilitySummary": "Unorganized workers (construction workers, gig workers, agricultural laborers, domestic helpers).",
    "documentsRequired": [
      "Aadhaar Card",
      "Aadhaar-linked Mobile Number",
      "Bank Account Number"
    ],
    "applicationProcess": "Self-register for free on eshram.gov.in.",
    "officialUrl": "https://eshram.gov.in/",
    "directApplyUrl": "https://register.eshram.gov.in/#/user/self",
    "tags": [
      "skills",
      "labor",
      "worker",
      "eshram",
      "uan",
      "unorganized",
      "insurance"
    ]
  },
  {
    "id": "nsap-pension",
    "title": "National Social Assistance Programme (NSAP)",
    "title_hi": "राष्ट्रीय सामाजिक सहायता कार्यक्रम (पेंशन)",
    "category": "social",
    "categoryName": "Social Welfare",
    "badgeClass": "badge-social",
    "level": "Central",
    "state": "All India",
    "brief": "Monthly social security pensions for elderly citizens, widows, and persons with severe disabilities living below poverty line.",
    "detailedDescription": "Comprises Old Age Pension (IGNOAPS), Widow Pension (IGNWPS), and Disability Pension (IGNDPS) for BPL households.",
    "benefit": "₹1,000 to ₹3,000 Monthly Pension",
    "benefitType": "Direct Monthly Welfare Pension",
    "eligibilityCriteria": {
      "minAge": 60,
      "maxAge": 120,
      "gender": "all",
      "occupations": [
        "all"
      ],
      "caste": [
        "all"
      ],
      "maxIncome": 100000,
      "ruralUrban": "all",
      "landRequired": false,
      "disabilityRequired": false
    },
    "eligibilitySummary": "Persons aged 60+ belonging to households living below poverty line (BPL).",
    "documentsRequired": [
      "Aadhaar Card",
      "BPL Card / Ration Card",
      "Age Certificate",
      "Bank Passbook"
    ],
    "applicationProcess": "Submit application at Block Development Office (BDO) or State Social Welfare Portal.",
    "officialUrl": "https://nsap.nic.in/",
    "directApplyUrl": "https://nsap.nic.in/applyonline.do",
    "tags": [
      "social",
      "pension",
      "old age",
      "widow",
      "disability",
      "bpl",
      "nsap"
    ]
  },
  {
    "id": "adip-divyangjan",
    "title": "ADIP Scheme (Assistance to Disabled Persons)",
    "title_hi": "दिव्यांगजनों हेतु एडिप योजना",
    "category": "social",
    "categoryName": "Social Welfare",
    "badgeClass": "badge-social",
    "level": "Central",
    "state": "All India",
    "brief": "Free motorized tricycles, wheelchairs, hearing aids, artificial limbs, and smart canes for persons with disabilities.",
    "detailedDescription": "Assistance to Disabled Persons for Purchase/Fitting of Aids and Appliances to promote physical and social empowerment.",
    "benefit": "100% Free Aids, Appliances & Motorized Trikes",
    "benefitType": "Assistive Device Grant",
    "eligibilityCriteria": {
      "minAge": 0,
      "maxAge": 100,
      "gender": "all",
      "occupations": [
        "all"
      ],
      "caste": [
        "all"
      ],
      "maxIncome": 360000,
      "ruralUrban": "all",
      "landRequired": false,
      "disabilityRequired": true
    },
    "eligibilitySummary": "Indian citizen having 40% or more certified benchmark disability.",
    "documentsRequired": [
      "Disability Certificate (UDID Card)",
      "Aadhaar Card",
      "Income Certificate"
    ],
    "applicationProcess": "Apply on ALIMCO portal or attend district ADIP distribution camps.",
    "officialUrl": "https://disabilityaffairs.gov.in/",
    "directApplyUrl": "https://www.alimco.in/OnlineRegistration.aspx",
    "tags": [
      "social",
      "disability",
      "divyang",
      "wheelchair",
      "udid",
      "adip"
    ]
  },
  {
    "id": "pm-daksh",
    "title": "PM-DAKSH (Pradhan Mantri Dakshta Aur Kushalta Sampann Hitgrahi)",
    "title_hi": "पीएम-दक्ष योजना",
    "category": "social",
    "categoryName": "Social Welfare",
    "badgeClass": "badge-social",
    "level": "Central",
    "state": "All India",
    "brief": "Free skill training, upskilling, and ₹1,500/month stipend for SC, OBC, EBC, DNT, and Sanitation workers.",
    "detailedDescription": "Offers free high-quality vocational and technical training to socially disadvantaged groups with monthly stipend.",
    "benefit": "Free Skill Course + ₹1,500 Monthly Stipend",
    "benefitType": "Empowerment & Stipend",
    "eligibilityCriteria": {
      "minAge": 18,
      "maxAge": 45,
      "gender": "all",
      "occupations": [
        "unemployed",
        "worker",
        "student"
      ],
      "caste": [
        "sc",
        "obc",
        "ews"
      ],
      "maxIncome": 300000,
      "ruralUrban": "all",
      "landRequired": false,
      "disabilityRequired": false
    },
    "eligibilitySummary": "SC, OBC (income < ₹3 Lakh), Economically Backward Classes (EBC), and sanitation workers.",
    "documentsRequired": [
      "Aadhaar Card",
      "Caste Certificate",
      "Income Certificate"
    ],
    "applicationProcess": "Register on the PM-DAKSH portal or mobile app.",
    "officialUrl": "https://pmdaksh.dosje.gov.in/",
    "directApplyUrl": "https://pmdaksh.dosje.gov.in/student",
    "tags": [
      "social",
      "sc",
      "obc",
      "skill",
      "stipend",
      "pm daksh"
    ]
  },
  {
    "id": "pmegp",
    "title": "Prime Minister's Employment Generation Programme (PMEGP)",
    "title_hi": "प्रधानमंत्री रोजगार सृजन कार्यक्रम (PMEGP)",
    "category": "business",
    "categoryName": "Business & MSME",
    "badgeClass": "badge-business",
    "level": "Central",
    "state": "All India",
    "brief": "Bank-financed subsidy scheme providing up to 35% government capital subsidy on project costs up to ₹50 Lakhs.",
    "detailedDescription": "Provides financial assistance for setting up new micro-enterprises in manufacturing (up to ₹50 Lakhs) and service sectors (up to ₹20 Lakhs) with 15-35% subsidy.",
    "benefit": "Up to 35% Capital Subsidy on ₹50L Project",
    "benefitType": "Capital Investment Subsidy",
    "loanMetadata": {
      "maxAmount": 5000000,
      "baseInterestRate": 8.5,
      "subsidizedRate": 8.5,
      "subvention": 0,
      "subsidyPercent": 35,
      "tenureYears": 7
    },
    "eligibilityCriteria": {
      "minAge": 18,
      "maxAge": 65,
      "gender": "all",
      "occupations": [
        "self-employed",
        "unemployed"
      ],
      "caste": [
        "all"
      ],
      "maxIncome": null,
      "ruralUrban": "all",
      "landRequired": false,
      "disabilityRequired": false
    },
    "eligibilitySummary": "Any individual above 18 years. Minimum 8th class pass for projects above ₹10 Lakh in manufacturing.",
    "documentsRequired": [
      "Aadhaar Card, PAN Card",
      "Detailed Project Report (DPR)",
      "Category Certificate"
    ],
    "applicationProcess": "Apply online at kviconline.gov.in/pmegpeportal with your project report.",
    "officialUrl": "https://www.kviconline.gov.in/pmegpeportal/",
    "directApplyUrl": "https://www.kviconline.gov.in/pmegpeportal/jsp/pmegponline.jsp",
    "tags": [
      "business",
      "startup",
      "msme",
      "subsidy",
      "pmegp",
      "manufacturing"
    ]
  },
  {
    "id": "startup-india-seed",
    "title": "Startup India Seed Fund Scheme (SISFS)",
    "title_hi": "स्टार्टअप इंडिया सीड फंड योजना",
    "category": "business",
    "categoryName": "Business & MSME",
    "badgeClass": "badge-business",
    "level": "Central",
    "state": "All India",
    "brief": "Financial assistance up to ₹20 Lakhs as grant for proof of concept and up to ₹50 Lakhs via convertible debentures.",
    "detailedDescription": "Financial assistance to early-stage DPIIT-recognized startups for proof of concept, prototype development, and market entry through approved incubators.",
    "benefit": "Up to ₹50 Lakhs Seed Funding",
    "benefitType": "Equity / Grant Seed Capital",
    "eligibilityCriteria": {
      "minAge": 18,
      "maxAge": 65,
      "gender": "all",
      "occupations": [
        "self-employed"
      ],
      "caste": [
        "all"
      ],
      "maxIncome": null,
      "ruralUrban": "all",
      "landRequired": false,
      "disabilityRequired": false
    },
    "eligibilitySummary": "DPIIT-recognized startups incorporated not more than 2 years ago.",
    "documentsRequired": [
      "DPIIT Startup Recognition Certificate",
      "Certificate of Incorporation",
      "Pitch Deck"
    ],
    "applicationProcess": "Apply online on the Startup India Seed Fund portal.",
    "officialUrl": "https://seedfund.startupindia.gov.in/",
    "directApplyUrl": "https://seedfund.startupindia.gov.in/apply",
    "tags": [
      "business",
      "startup",
      "seed fund",
      "dpiit",
      "grant",
      "venture"
    ]
  },
  {
    "id": "up-kanya-sumangala",
    "title": "UP Mukhyamantri Kanya Sumangala Yojana",
    "title_hi": "???? ??????????? ????? ??????? ?????",
    "category": "women",
    "categoryName": "Women & Child",
    "badgeClass": "badge-women",
    "level": "State",
    "state": "Uttar Pradesh",
    "brief": "Conditional cash transfers up to Rs 25,000 across 6 stages from girl child birth to higher education.",
    "detailedDescription": "Provides financial security to girl children in Uttar Pradesh, curbing female feticide and promoting education through milestone grants from birth up to graduation.",
    "benefit": "Up to ?25,000 Grant",
    "benefitType": "Direct Cash Benefit",
    "eligibilityCriteria": {
      "minAge": 0,
      "maxAge": 25,
      "gender": "female",
      "occupations": [
        "all",
        "student"
      ],
      "caste": [
        "all"
      ],
      "maxIncome": 300000,
      "ruralUrban": "all",
      "landRequired": false,
      "disabilityRequired": false
    },
    "eligibilitySummary": "Permanent resident of UP with annual family income below Rs 3 Lakh and max 2 daughters.",
    "documentsRequired": [
      "Aadhaar Card of Parents & Child",
      "UP Domicile Certificate",
      "Income Certificate (< ?3 Lakh)",
      "Bank Passbook",
      "Birth Certificate"
    ],
    "applicationProcess": "Register online at mksy.up.gov.in with child birth or school admission proofs.",
    "officialUrl": "https://mksy.up.gov.in/",
    "directApplyUrl": "https://mksy.up.gov.in/women_welfare/citizen/citizen_registration.php",
    "tags": [
      "uttar pradesh",
      "kanya sumangala",
      "girl child",
      "women",
      "education"
    ]
  },
  {
    "id": "up-shadi-anudan",
    "title": "UP Shadi Anudan Yojana",
    "title_hi": "???? ???? ?????? ?????",
    "category": "social",
    "categoryName": "Social Welfare",
    "badgeClass": "badge-social",
    "level": "State",
    "state": "Uttar Pradesh",
    "brief": "Financial grant of Rs 20,000 for the marriage of daughters belonging to BPL and low-income families.",
    "detailedDescription": "The Uttar Pradesh Government provides direct financial assistance of Rs 20,000 to economically weaker families (SC, ST, OBC, Minority, General BPL) for their daughters marriage.",
    "benefit": "?20,000 Grant",
    "benefitType": "One-Time Cash Grant",
    "eligibilityCriteria": {
      "minAge": 18,
      "maxAge": 50,
      "gender": "female",
      "occupations": [
        "all"
      ],
      "caste": [
        "all"
      ],
      "maxIncome": 56460,
      "ruralUrban": "all",
      "landRequired": false,
      "disabilityRequired": false
    },
    "eligibilitySummary": "UP resident BPL families whose annual income is within Rs 46,080 (rural) or Rs 56,460 (urban).",
    "documentsRequired": [
      "Aadhaar Card",
      "UP Residence Certificate",
      "Income Certificate",
      "Daughter Age Proof (18+)",
      "Marriage Invitation Card"
    ],
    "applicationProcess": "Apply online on the UP Shadi Anudan portal within 90 days before or after marriage.",
    "officialUrl": "http://shadianudan.upsdc.gov.in/",
    "directApplyUrl": "http://shadianudan.upsdc.gov.in/GeneralRegistration.aspx",
    "tags": [
      "uttar pradesh",
      "marriage subsidy",
      "bpl",
      "shadi anudan"
    ]
  },
  {
    "id": "mp-ladli-behna",
    "title": "MP Mukhyamantri Ladli Behna Yojana",
    "title_hi": "??????????? ?????? ???? ????? (?.???.)",
    "category": "women",
    "categoryName": "Women & Child",
    "badgeClass": "badge-women",
    "level": "State",
    "state": "Madhya Pradesh",
    "brief": "Direct monthly cash assistance of Rs 1,250 to married, widowed, and separated women in Madhya Pradesh.",
    "detailedDescription": "A flagship empowerment scheme by the Government of Madhya Pradesh providing direct monthly DBT of Rs 1,250 to women aged 21-60 to enhance financial independence and nutrition.",
    "benefit": "?1,250 / Month (?15,000/yr)",
    "benefitType": "Direct Monthly DBT",
    "eligibilityCriteria": {
      "minAge": 21,
      "maxAge": 60,
      "gender": "female",
      "occupations": [
        "all"
      ],
      "caste": [
        "all"
      ],
      "maxIncome": 250000,
      "ruralUrban": "all",
      "landRequired": false,
      "disabilityRequired": false
    },
    "eligibilitySummary": "Madhya Pradesh resident women aged 21-60 whose family annual income is below Rs 2.5 Lakhs.",
    "documentsRequired": [
      "Samagra Family ID",
      "Aadhaar Card (e-KYC enabled)",
      "Aadhaar-linked Bank Account",
      "Mobile Number"
    ],
    "applicationProcess": "Apply through local Gram Panchayat / Ward camps or online on the Ladli Behna portal.",
    "officialUrl": "https://cmladlibahna.mp.gov.in/",
    "directApplyUrl": "https://cmladlibahna.mp.gov.in/ApplicationStatus.aspx",
    "tags": [
      "madhya pradesh",
      "women",
      "ladli behna",
      "dbt",
      "monthly stipend"
    ]
  },
  {
    "id": "mp-sambhal",
    "title": "MP Mukhyamantri Jan Kalyan (Sambhal 2.0)",
    "title_hi": "??????????? ???????? ???? 2.0 ?????",
    "category": "social",
    "categoryName": "Social Welfare",
    "badgeClass": "badge-social",
    "level": "State",
    "state": "Madhya Pradesh",
    "brief": "Social security package covering maternity aid, accidental insurance up to Rs 4 Lakh, and electricity concessions.",
    "detailedDescription": "Provides comprehensive social protection for unorganized workers in MP including Rs 4 Lakh accident relief, Rs 2 Lakh natural death grant, and Rs 16,000 maternity assistance.",
    "benefit": "Up to ?4 Lakh Coverage",
    "benefitType": "Social Security Package",
    "eligibilityCriteria": {
      "minAge": 18,
      "maxAge": 60,
      "gender": "all",
      "occupations": [
        "worker",
        "farmer"
      ],
      "caste": [
        "all"
      ],
      "maxIncome": 200000,
      "ruralUrban": "all",
      "landRequired": false,
      "disabilityRequired": false
    },
    "eligibilitySummary": "Registered unorganized workers residing in MP aged 18 to 60.",
    "documentsRequired": [
      "Samagra ID",
      "Aadhaar Card",
      "Unorganized Worker Self-Declaration",
      "Bank Details"
    ],
    "applicationProcess": "Apply online on Sambhal 2.0 portal with mobile OTP verification.",
    "officialUrl": "https://sambhal.mp.gov.in/",
    "directApplyUrl": "https://sambhal.mp.gov.in/Citizen/Registration/Registration.aspx",
    "tags": [
      "madhya pradesh",
      "sambhal",
      "unorganized worker",
      "accident insurance"
    ]
  },
  {
    "id": "mh-ladki-bahin",
    "title": "Maharashtra Majhi Ladki Bahin Yojana",
    "title_hi": "??????????? ???? ????? ???? ?????",
    "category": "women",
    "categoryName": "Women & Child",
    "badgeClass": "badge-women",
    "level": "State",
    "state": "Maharashtra",
    "brief": "Monthly financial assistance of Rs 1,500 directly deposited to eligible women aged 21 to 65.",
    "detailedDescription": "Maharashtra government welfare scheme offering direct cash transfers of Rs 1,500 monthly to low-income women for health, self-reliance, and family welfare.",
    "benefit": "?1,500 / Month (?18,000/yr)",
    "benefitType": "Direct Cash Transfer",
    "eligibilityCriteria": {
      "minAge": 21,
      "maxAge": 65,
      "gender": "female",
      "occupations": [
        "all"
      ],
      "caste": [
        "all"
      ],
      "maxIncome": 250000,
      "ruralUrban": "all",
      "landRequired": false,
      "disabilityRequired": false
    },
    "eligibilitySummary": "Resident of Maharashtra, family income under Rs 2.5 Lakh per annum, yellow/orange ration card holders.",
    "documentsRequired": [
      "Aadhaar Card",
      "Maharashtra Domicile Certificate",
      "Ration Card (Yellow/Orange)",
      "Income Certificate",
      "Bank Account Passbook"
    ],
    "applicationProcess": "Apply via the Nari Shakti Doot Mobile App or MahaDBT portal.",
    "officialUrl": "https://ladakibahin.maharashtra.gov.in/",
    "directApplyUrl": "https://ladakibahin.maharashtra.gov.in/applicant-registration",
    "tags": [
      "maharashtra",
      "women",
      "ladki bahin",
      "dbt",
      "nari shakti"
    ]
  },
  {
    "id": "mh-punjabrao-deshmukh",
    "title": "Dr. Panjabrao Deshmukh Hostel Allowance Scheme",
    "title_hi": "??. ???????? ?????? ??????? ??????? ????? ?????",
    "category": "students",
    "categoryName": "Education & Learning",
    "badgeClass": "badge-students",
    "level": "State",
    "state": "Maharashtra",
    "brief": "Hostel maintenance allowance up to Rs 30,000 per year for children of marginal farmers and registered workers.",
    "detailedDescription": "Financial allowance for students admitted to professional and technical degree courses residing in registered hostels whose parents are small/marginal farmers.",
    "benefit": "Up to ?30,000 / Year",
    "benefitType": "Hostel Subsidy",
    "eligibilityCriteria": {
      "minAge": 17,
      "maxAge": 30,
      "gender": "all",
      "occupations": [
        "student"
      ],
      "caste": [
        "all"
      ],
      "maxIncome": 800000,
      "ruralUrban": "all",
      "landRequired": false,
      "disabilityRequired": false
    },
    "eligibilitySummary": "Children of registered alpabhudharak (small/marginal) farmers or registered laborers pursuing higher education in MH.",
    "documentsRequired": [
      "College Admission Receipt",
      "Hostel Certificate",
      "Small/Marginal Farmer Certificate",
      "Aadhaar Card",
      "MahaDBT Registration"
    ],
    "applicationProcess": "Apply through MahaDBT portal under Directorate of Technical Education.",
    "officialUrl": "https://mahadbt.maharashtra.gov.in/",
    "directApplyUrl": "https://mahadbt.maharashtra.gov.in/SchemeData/SchemeData?str=E9DDFA3703C3A38DEB3EB1A4700C3BE8",
    "tags": [
      "maharashtra",
      "scholarship",
      "hostel allowance",
      "farmers child",
      "education"
    ]
  },
  {
    "id": "bihar-student-credit-card",
    "title": "Bihar Student Credit Card Scheme (MNSSBY)",
    "title_hi": "????? ???????? ??????? ????? ?????",
    "category": "students",
    "categoryName": "Education & Learning",
    "badgeClass": "badge-students",
    "level": "State",
    "state": "Bihar",
    "brief": "Education loan up to Rs 4 Lakh at 1% interest rate for girls/disabled and 4% for boys for higher education.",
    "detailedDescription": "A flagship program under Saat Nischay providing education loans up to Rs 4 Lakh for technical, polytechnic, and undergraduate courses with low interest and simple repayment.",
    "benefit": "?4 Lakh Education Credit",
    "benefitType": "Subsidized Student Loan",
    "loanMetadata": {
      "maxAmount": 400000,
      "baseInterestRate": 4,
      "subsidizedRate": 1,
      "subvention": 3,
      "tenureYears": 7
    },
    "eligibilityCriteria": {
      "minAge": 17,
      "maxAge": 25,
      "gender": "all",
      "occupations": [
        "student"
      ],
      "caste": [
        "all"
      ],
      "maxIncome": null,
      "ruralUrban": "all",
      "landRequired": false,
      "disabilityRequired": false
    },
    "eligibilitySummary": "Bihar resident passed 12th standard, enrolled in recognized degree/diploma program.",
    "documentsRequired": [
      "10th & 12th Marksheets",
      "College Admission Offer Letter",
      "Aadhaar Card of Student & Co-Applicant",
      "Bihar Domicile Certificate"
    ],
    "applicationProcess": "Register online at 7nischay-yuvaupmission.bihar.gov.in and submit dossier at District Registration Centre (DRCC).",
    "officialUrl": "https://www.7nischay-yuvaupmission.bihar.gov.in/",
    "directApplyUrl": "https://www.7nischay-yuvaupmission.bihar.gov.in/newCustReg",
    "tags": [
      "bihar",
      "student loan",
      "higher education",
      "saat nischay",
      "credit card"
    ]
  },
  {
    "id": "bihar-udyami",
    "title": "Bihar Mukhyamantri Udyami Yojana",
    "title_hi": "????? ??????????? ?????? ?????",
    "category": "business",
    "categoryName": "Business & MSME",
    "badgeClass": "badge-business",
    "level": "State",
    "state": "Bihar",
    "brief": "Financial grant & interest-free loan up to Rs 10 Lakh (50% subsidy + 50% soft loan) for new businesses.",
    "detailedDescription": "Provides Rs 10 Lakh total assistance for setting up industrial or service enterprises (Rs 5 Lakh direct grant + Rs 5 Lakh interest-free loan repayable in 84 installments).",
    "benefit": "?5 Lakh Grant + ?5 Lakh 0% Loan",
    "benefitType": "Capital Subsidy & Soft Loan",
    "eligibilityCriteria": {
      "minAge": 18,
      "maxAge": 50,
      "gender": "all",
      "occupations": [
        "self-employed",
        "unemployed"
      ],
      "caste": [
        "sc",
        "st",
        "ews",
        "obc",
        "general"
      ],
      "maxIncome": null,
      "ruralUrban": "all",
      "landRequired": false,
      "disabilityRequired": false
    },
    "eligibilitySummary": "Permanent resident of Bihar, minimum 10+2/ITI/Polytechnic qualification.",
    "documentsRequired": [
      "Bihar Domicile Certificate",
      "10+2 / ITI / Diploma Certificate",
      "Caste Certificate",
      "PAN Card",
      "Current Bank Account Statement"
    ],
    "applicationProcess": "Apply online on Bihar Udyami portal during open application rounds.",
    "officialUrl": "https://udyami.bihar.gov.in/",
    "directApplyUrl": "https://udyami.bihar.gov.in/register",
    "tags": [
      "bihar",
      "startup",
      "udyami",
      "grant",
      "business loan"
    ]
  },
  {
    "id": "ka-yuva-nidhi",
    "title": "Karnataka Yuva Nidhi Scheme",
    "title_hi": "??????? ??? ???? ????? (Karnataka Yuva Nidhi)",
    "category": "skills",
    "categoryName": "Skills & Employment",
    "badgeClass": "badge-skills",
    "level": "State",
    "state": "Karnataka",
    "brief": "Monthly unemployment allowance of Rs 3,000 for degree holders and Rs 1,500 for diploma holders for up to 2 years.",
    "detailedDescription": "One of the five guarantee schemes by the Government of Karnataka offering financial support and skill training assistance to recently graduated unemployed youth.",
    "benefit": "?3,000 / Month (Degree), ?1,500 (Diploma)",
    "benefitType": "Unemployment Assistance",
    "eligibilityCriteria": {
      "minAge": 20,
      "maxAge": 28,
      "gender": "all",
      "occupations": [
        "unemployed",
        "student"
      ],
      "caste": [
        "all"
      ],
      "maxIncome": null,
      "ruralUrban": "all",
      "landRequired": false,
      "disabilityRequired": false
    },
    "eligibilitySummary": "Karnataka resident graduates/diploma holders who graduated in 2023 or later and remain unemployed after 6 months.",
    "documentsRequired": [
      "Degree / Diploma Certificate",
      "Marksheets",
      "Karnataka Domicile Certificate",
      "Aadhaar Card",
      "Bank Passbook (Seva Sindhu linked)"
    ],
    "applicationProcess": "Apply online via Seva Sindhu portal or Karnataka One centres.",
    "officialUrl": "https://sevasindhugs.karnataka.gov.in/",
    "directApplyUrl": "https://sevasindhugs.karnataka.gov.in/yuvanidhi/",
    "tags": [
      "karnataka",
      "yuva nidhi",
      "unemployment allowance",
      "graduates",
      "seva sindhu"
    ]
  },
  {
    "id": "ka-gruha-lakshmi",
    "title": "Karnataka Gruha Lakshmi Scheme",
    "title_hi": "??????? ??? ??????? ????? (Gruha Lakshmi)",
    "category": "women",
    "categoryName": "Women & Child",
    "badgeClass": "badge-women",
    "level": "State",
    "state": "Karnataka",
    "brief": "Monthly financial assistance of Rs 2,000 directly transferred to the female head of each household.",
    "detailedDescription": "Universal basic income scheme for women in Karnataka transferring Rs 2,000 every month directly to the female head of family listed on Antyodaya/BPL/APL cards.",
    "benefit": "?2,000 / Month (?24,000/yr)",
    "benefitType": "Direct Benefit Transfer",
    "eligibilityCriteria": {
      "minAge": 18,
      "maxAge": 90,
      "gender": "female",
      "occupations": [
        "all"
      ],
      "caste": [
        "all"
      ],
      "maxIncome": 250000,
      "ruralUrban": "all",
      "landRequired": false,
      "disabilityRequired": false
    },
    "eligibilitySummary": "Woman recognized as female head on ration card, family members not paying GST or Income Tax.",
    "documentsRequired": [
      "Ration Card (BPL/Antyodaya/APL)",
      "Aadhaar Card of Woman & Husband",
      "Bank Account Passbook (Aadhaar seeded)"
    ],
    "applicationProcess": "Register at Grama One, Karnataka One, or Bangalore One centres.",
    "officialUrl": "https://sevasindhugs.karnataka.gov.in/",
    "directApplyUrl": "https://sevasindhugs.karnataka.gov.in/glakshmi/",
    "tags": [
      "karnataka",
      "gruha lakshmi",
      "women empowerment",
      "dbt",
      "monthly grant"
    ]
  },
  {
    "id": "tn-pudhumai-penn",
    "title": "Tamil Nadu Pudhumai Penn Scheme",
    "title_hi": "???????? ???? ??????? (TN Pudhumai Penn)",
    "category": "students",
    "categoryName": "Education & Learning",
    "badgeClass": "badge-students",
    "level": "State",
    "state": "Tamil Nadu",
    "brief": "Monthly incentive of Rs 1,000 for female students who studied in government schools from classes 6 to 12.",
    "detailedDescription": "Moovalur Ramamirtham Ammaiyar Higher Education Assurance Scheme provides Rs 1,000 every month directly to girl students pursuing undergraduate degrees, diplomas, or ITI.",
    "benefit": "?1,000 / Month during Degree",
    "benefitType": "Monthly Higher Ed Stipend",
    "eligibilityCriteria": {
      "minAge": 17,
      "maxAge": 25,
      "gender": "female",
      "occupations": [
        "student"
      ],
      "caste": [
        "all"
      ],
      "maxIncome": null,
      "ruralUrban": "all",
      "landRequired": false,
      "disabilityRequired": false
    },
    "eligibilitySummary": "Female students who completed 6th to 12th standard in Tamil Nadu government schools and enrolled in higher education.",
    "documentsRequired": [
      "School Study Certificates (Class 6-12 Government School)",
      "College ID / Admission Card",
      "Aadhaar Card",
      "Bank Account Details"
    ],
    "applicationProcess": "Colleges verify and upload student profiles directly on the Pudhumai Penn portal (pudhumaipenn.tn.gov.in).",
    "officialUrl": "https://www.pudhumaipenn.tn.gov.in/",
    "directApplyUrl": "https://www.pudhumaipenn.tn.gov.in/login",
    "tags": [
      "tamil nadu",
      "pudhumai penn",
      "girl student",
      "higher education",
      "scholarship"
    ]
  },
  {
    "id": "tn-magalir-urimai",
    "title": "TN Kalaignar Magalir Urimai Thittam",
    "title_hi": "?????? ?????? ??????? ??????? (Kalaignar Magalir Urimai)",
    "category": "women",
    "categoryName": "Women & Child",
    "badgeClass": "badge-women",
    "level": "State",
    "state": "Tamil Nadu",
    "brief": "Monthly financial rights allowance of Rs 1,000 credited directly to female heads of eligible families.",
    "detailedDescription": "Recognizes the unpaid domestic work of homemakers and provides economic dignity to over 1 crore women across Tamil Nadu.",
    "benefit": "?1,000 / Month (?12,000/yr)",
    "benefitType": "Direct Benefit Transfer",
    "eligibilityCriteria": {
      "minAge": 21,
      "maxAge": 70,
      "gender": "female",
      "occupations": [
        "all"
      ],
      "caste": [
        "all"
      ],
      "maxIncome": 250000,
      "ruralUrban": "all",
      "landRequired": false,
      "disabilityRequired": false
    },
    "eligibilitySummary": "Female family head in TN with annual family income under Rs 2.5 Lakh and domestic electricity consumption under 3,600 units/yr.",
    "documentsRequired": [
      "Smart Ration Card",
      "Aadhaar Card",
      "Electricity Bill Consumer Number",
      "Bank Passbook"
    ],
    "applicationProcess": "Apply at camp sites or via Tamil Nadu e-Sevai centres.",
    "officialUrl": "https://kmut.tn.gov.in/",
    "directApplyUrl": "https://kmut.tn.gov.in/",
    "tags": [
      "tamil nadu",
      "magalir urimai",
      "women rights",
      "dbt",
      "basic income"
    ]
  },
  {
    "id": "wb-kanyashree",
    "title": "West Bengal Kanyashree Prakalpa",
    "title_hi": "????????? ??????? (WB Kanyashree)",
    "category": "students",
    "categoryName": "Education & Learning",
    "badgeClass": "badge-students",
    "level": "State",
    "state": "West Bengal",
    "brief": "Annual scholarship of Rs 1,000 (K1) and one-time grant of Rs 25,000 (K2) at age 18 to promote girls education.",
    "detailedDescription": "UN-award-winning scheme by West Bengal Government preventing child marriage and encouraging adolescent girls to complete schooling and college.",
    "benefit": "?1,000/yr (K1) + ?25,000 (K2)",
    "benefitType": "Direct Cash Transfer",
    "eligibilityCriteria": {
      "minAge": 13,
      "maxAge": 19,
      "gender": "female",
      "occupations": [
        "student"
      ],
      "caste": [
        "all"
      ],
      "maxIncome": null,
      "ruralUrban": "all",
      "landRequired": false,
      "disabilityRequired": false
    },
    "eligibilitySummary": "Unmarried girl students in West Bengal enrolled in government-recognized schools or colleges.",
    "documentsRequired": [
      "School / College Enrollment Proof",
      "Unmarried Status Declaration",
      "Aadhaar Card",
      "Bank Passbook"
    ],
    "applicationProcess": "Forms distributed and processed directly through schools and colleges on the Kanyashree Online portal.",
    "officialUrl": "https://wbkanyashree.gov.in/",
    "directApplyUrl": "https://wbkanyashree.gov.in/kp_4.0/index.php",
    "tags": [
      "west bengal",
      "kanyashree",
      "girl child",
      "education",
      "scholarship"
    ]
  },
  {
    "id": "wb-krishak-bandhu",
    "title": "West Bengal Krishak Bandhu Scheme",
    "title_hi": "???? ????? ??????? (Krishak Bandhu)",
    "category": "agriculture",
    "categoryName": "Agriculture & Rural",
    "badgeClass": "badge-agriculture",
    "level": "State",
    "state": "West Bengal",
    "brief": "Crop assistance up to Rs 10,000/year (Rs 4,000 min) plus Rs 2 Lakh death insurance for farmer families.",
    "detailedDescription": "Provides financial assistance in two installments for Kharif and Rabi seasons to all farmers including recorded bargadars (sharecroppers), plus free death insurance.",
    "benefit": "Up to ?10,000/yr + ?2L Insurance",
    "benefitType": "Income & Life Cover",
    "eligibilityCriteria": {
      "minAge": 18,
      "maxAge": 60,
      "gender": "all",
      "occupations": [
        "farmer"
      ],
      "caste": [
        "all"
      ],
      "maxIncome": null,
      "ruralUrban": "rural",
      "landRequired": true,
      "disabilityRequired": false
    },
    "eligibilitySummary": "All farmland holders and recorded sharecroppers (Bargadars) in West Bengal.",
    "documentsRequired": [
      "Land RoR (Parcha)",
      "Voter ID",
      "Aadhaar Card",
      "Bank Passbook"
    ],
    "applicationProcess": "Apply at BDO / Assistant Director of Agriculture office or Duare Sarkar camps.",
    "officialUrl": "https://krishakbandhu.wb.gov.in/",
    "directApplyUrl": "https://krishakbandhu.wb.gov.in/",
    "tags": [
      "west bengal",
      "krishak bandhu",
      "farmer",
      "agriculture",
      "insurance"
    ]
  },
  {
    "id": "gj-kisan-sahay",
    "title": "Gujarat Mukhyamantri Kisan Sahay Yojana (MMKSY)",
    "title_hi": "??????????? ????? ???? ????? (Gujarat MMKSY)",
    "category": "agriculture",
    "categoryName": "Agriculture & Rural",
    "badgeClass": "badge-agriculture",
    "level": "State",
    "state": "Gujarat",
    "brief": "0% premium crop loss compensation up to Rs 25,000/hectare for drought, excessive rain, or unseasonal rainfall.",
    "detailedDescription": "Comprehensive disaster relief scheme replacing conventional crop insurance, providing direct DBT compensation without charging any insurance premium from farmers.",
    "benefit": "?20,000 - ?25,000 / Hectare",
    "benefitType": "Direct Compensation",
    "eligibilityCriteria": {
      "minAge": 18,
      "maxAge": 90,
      "gender": "all",
      "occupations": [
        "farmer"
      ],
      "caste": [
        "all"
      ],
      "maxIncome": null,
      "ruralUrban": "rural",
      "landRequired": true,
      "disabilityRequired": false
    },
    "eligibilitySummary": "All landholding farmers and Forest Rights Act title holders in Gujarat affected by natural calamity (>33% loss).",
    "documentsRequired": [
      "Land Record (8-A / 7-12)",
      "Talati Sowing Certificate",
      "Aadhaar Card",
      "Bank Passbook"
    ],
    "applicationProcess": "Apply through E-Gram centers or i-Khedut portal when disaster notification is declared.",
    "officialUrl": "https://ikhedut.gujarat.gov.in/",
    "directApplyUrl": "https://ikhedut.gujarat.gov.in/",
    "tags": [
      "gujarat",
      "farmer",
      "kisan sahay",
      "crop loss",
      "ikhedut"
    ]
  },
  {
    "id": "gj-vhali-dikri",
    "title": "Gujarat Vhali Dikri Yojana",
    "title_hi": "?????? ????? ????? (Vhali Dikri)",
    "category": "women",
    "categoryName": "Women & Child",
    "badgeClass": "badge-women",
    "level": "State",
    "state": "Gujarat",
    "brief": "Financial grants of Rs 4,000 in Class 1, Rs 6,000 in Class 9, and Rs 1 Lakh at age 18 for female children.",
    "detailedDescription": "Improves sex ratio and prevents dropouts in Gujarat by offering phased educational incentives and a Rs 1,00,000 milestone grant when the girl child turns 18.",
    "benefit": "Total ?1,10,000 Phased Grants",
    "benefitType": "Milestone Cash Grants",
    "eligibilityCriteria": {
      "minAge": 0,
      "maxAge": 20,
      "gender": "female",
      "occupations": [
        "all"
      ],
      "caste": [
        "all"
      ],
      "maxIncome": 200000,
      "ruralUrban": "all",
      "landRequired": false,
      "disabilityRequired": false
    },
    "eligibilitySummary": "First two daughters of couples residing in Gujarat with annual income up to Rs 2,00,000.",
    "documentsRequired": [
      "Birth Certificate of Child",
      "Parents Aadhaar Card",
      "Income Certificate (< ?2 Lakh)",
      "Domicile Certificate"
    ],
    "applicationProcess": "Apply through Anganwadi workers or CDPO office within 1 year of child birth.",
    "officialUrl": "https://wcd.gujarat.gov.in/",
    "directApplyUrl": "https://digitalgujarat.gov.in/",
    "tags": [
      "gujarat",
      "vhali dikri",
      "girl child",
      "grant",
      "education"
    ]
  },
  {
    "id": "delhi-vidyarthi-pratibha",
    "title": "Delhi Mukhyamantri Vidyarthi Pratibha Yojana",
    "title_hi": "??????????? ?????????? ??????? ????? (Delhi)",
    "category": "students",
    "categoryName": "Education & Learning",
    "badgeClass": "badge-students",
    "level": "State",
    "state": "Delhi",
    "brief": "Merit scholarship of Rs 5,000 to Rs 10,000 per year for SC/ST/OBC/Minority students scoring 50%+ marks.",
    "detailedDescription": "Encourages academic excellence for marginalized students in classes 9 to 12 studying in government/aided schools in Delhi.",
    "benefit": "?5,000 - ?10,000 / Year",
    "benefitType": "Direct Cash Scholarship",
    "eligibilityCriteria": {
      "minAge": 13,
      "maxAge": 20,
      "gender": "all",
      "occupations": [
        "student"
      ],
      "caste": [
        "sc",
        "st",
        "obc",
        "minority",
        "ews"
      ],
      "maxIncome": 200000,
      "ruralUrban": "urban",
      "landRequired": false,
      "disabilityRequired": false
    },
    "eligibilitySummary": "Resident of Delhi studying in Class 9-12 with 50%+ marks in previous exams and family income under Rs 2 Lakh.",
    "documentsRequired": [
      "Previous Year Marksheet",
      "Caste Certificate",
      "Income Certificate / BPL Ration Card",
      "Delhi Residence Proof",
      "Bank Passbook"
    ],
    "applicationProcess": "Apply online on Delhi e-District portal under Department for the Welfare of SC/ST/OBC.",
    "officialUrl": "https://edistrict.delhigovt.nic.in/",
    "directApplyUrl": "https://edistrict.delhigovt.nic.in/ineligible.html",
    "tags": [
      "delhi",
      "scholarship",
      "merit",
      "students",
      "edistrict"
    ]
  },
  {
    "id": "raj-chiranjeevi",
    "title": "Rajasthan Mukhyamantri Ayushman Arogya (Chiranjeevi)",
    "title_hi": "??????????? ???????? ?????? ????? (????????)",
    "category": "health",
    "categoryName": "Healthcare & Wellness",
    "badgeClass": "badge-health",
    "level": "State",
    "state": "Rajasthan",
    "brief": "Cashless health insurance coverage up to Rs 25 Lakh per family per year in empanelled hospitals.",
    "detailedDescription": "Universal health insurance coverage providing up to Rs 25 Lakh per family annually for secondary and tertiary care, covering 1,800+ medical packages.",
    "benefit": "Up to ?25 Lakh Cashless Cover",
    "benefitType": "Health Insurance",
    "eligibilityCriteria": {
      "minAge": 0,
      "maxAge": 100,
      "gender": "all",
      "occupations": [
        "all"
      ],
      "caste": [
        "all"
      ],
      "maxIncome": null,
      "ruralUrban": "all",
      "landRequired": false,
      "disabilityRequired": false
    },
    "eligibilitySummary": "All families registered under Rajasthan Jan Aadhaar platform.",
    "documentsRequired": [
      "Jan Aadhaar Card",
      "Aadhaar Card",
      "Ration Card"
    ],
    "applicationProcess": "Enroll via Jan Aadhaar Portal or local e-Mitra kiosk.",
    "officialUrl": "https://chiranjeevi.rajasthan.gov.in/",
    "directApplyUrl": "https://chiranjeevi.rajasthan.gov.in/",
    "tags": [
      "rajasthan",
      "health insurance",
      "chiranjeevi",
      "cashless hospital",
      "ayushman"
    ]
  }
];

export const SCHEMES_METADATA = {
  totalSchemes: SCHEMES_DATABASE.length,
  categories: [
    { id: "all", name: "All Schemes", count: SCHEMES_DATABASE.length, icon: "Layers" },
    { id: "agriculture", name: "Agriculture & Rural", count: SCHEMES_DATABASE.filter(s => s.category === "agriculture").length, icon: "Tractor" },
    { id: "students", name: "Education & Learning", count: SCHEMES_DATABASE.filter(s => s.category === "students").length, icon: "GraduationCap" },
    { id: "financial", name: "Banking & Financial", count: SCHEMES_DATABASE.filter(s => s.category === "financial").length, icon: "Landmark" },
    { id: "health", name: "Health & Wellness", count: SCHEMES_DATABASE.filter(s => s.category === "health").length, icon: "HeartPulse" },
    { id: "housing", name: "Housing & Shelter", count: SCHEMES_DATABASE.filter(s => s.category === "housing").length, icon: "Home" },
    { id: "women", name: "Women & Child", count: SCHEMES_DATABASE.filter(s => s.category === "women").length, icon: "UserCheck" },
    { id: "skills", name: "Skills & Employment", count: SCHEMES_DATABASE.filter(s => s.category === "skills").length, icon: "Briefcase" },
    { id: "social", name: "Social Welfare", count: SCHEMES_DATABASE.filter(s => s.category === "social").length, icon: "ShieldAlert" },
    { id: "business", name: "Business & MSME", count: SCHEMES_DATABASE.filter(s => s.category === "business").length, icon: "TrendingUp" }
  ]
};
