import React, { useState, useMemo, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  FileText, 
  Sparkles, 
  Layers, 
  Bookmark, 
  Trash2, 
  ExternalLink, 
  ArrowRight, 
  Plus, 
  Edit3, 
  LogOut, 
  MapPin, 
  Briefcase, 
  IndianRupee, 
  Calendar, 
  Download, 
  Eye, 
  Check, 
  Bell,
  RefreshCw,
  FolderLock,
  Building2,
  FileCheck,
  ShieldAlert,
  HelpCircle,
  KeyRound,
  FileSpreadsheet,
  Cpu,
  AlertTriangle,
  Info,
  Fingerprint,
  LayoutDashboard,
  Award,
  Search,
  Filter,
  CheckCircle,
  X,
  ChevronRight,
  Menu,
  FileCheck2,
  FileCode,
  SlidersHorizontal,
  Tag,
  Landmark,
  Lock
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { SCHEMES_DATABASE } from '../data/schemesData';
import SchemeModal from '../components/SchemeModal';
import CustomDropdown from '../components/CustomDropdown';

const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", 
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", 
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", 
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", 
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", 
  "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu", 
  "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"
];

const GENDER_OPTIONS = [
  { value: 'Male', label: 'Male' },
  { value: 'Female', label: 'Female' },
  { value: 'Transgender', label: 'Transgender / Other' }
];

const CASTE_OPTIONS = [
  { value: 'General', label: 'General' },
  { value: 'OBC', label: 'OBC (Other Backward Classes)' },
  { value: 'SC', label: 'SC (Scheduled Caste)' },
  { value: 'ST', label: 'ST (Scheduled Tribe)' },
  { value: 'EWS', label: 'EWS (Economically Weaker Section)' }
];

const OCCUPATION_OPTIONS = [
  { value: 'Farmer / Agricultural Worker', label: 'Farmer / Agricultural Worker' },
  { value: 'Self-Employed (Micro Business)', label: 'Self-Employed / Business Owner' },
  { value: 'Student', label: 'Student / Scholar' },
  { value: 'Salaried (Private)', label: 'Salaried (Private Sector)' },
  { value: 'Government Employee', label: 'Government Employee' },
  { value: 'Artisan / Weaver', label: 'Artisan / Traditional Craftsman' },
  { value: 'Gig Worker / Daily Wage', label: 'Gig Worker / Daily Wage Earner' },
  { value: 'Homemaker', label: 'Homemaker' },
  { value: 'Unemployed / Seeking Work', label: 'Unemployed / Job Seeker' }
];

const DISABILITY_OPTIONS = [
  { value: 'None', label: 'No Disability' },
  { value: 'Locomotor Disability (>= 40%)', label: 'Locomotor Disability (40%+)' },
  { value: 'Visual Impairment (>= 40%)', label: 'Visual Impairment (40%+)' },
  { value: 'Hearing Impairment (>= 40%)', label: 'Hearing Impairment (40%+)' },
  { value: 'Multiple Disabilities', label: 'Multiple Disabilities' }
];

const MINORITY_OPTIONS = [
  { value: 'No', label: 'No (Non-Minority)' },
  { value: 'Yes', label: 'Yes (Religious / Linguistic Minority)' }
];

const AREA_OPTIONS = [
  { value: 'Rural', label: 'Rural' },
  { value: 'Urban', label: 'Urban' },
  { value: 'Semi-Urban', label: 'Semi-Urban' }
];

const BUSINESS_TYPE_OPTIONS = [
  { value: 'Sole Proprietorship', label: 'Sole Proprietorship' },
  { value: 'Partnership', label: 'Partnership' },
  { value: 'Private Limited', label: 'Private Limited' },
  { value: 'Informal / Artisan Unit', label: 'Informal / Artisan Unit' },
  { value: 'Self-Help Group (SHG)', label: 'Self-Help Group (SHG)' }
];

const BUSINESS_SECTOR_OPTIONS = [
  { value: 'Manufacturing & Engineering', label: 'Manufacturing & Engineering' },
  { value: 'Handloom & Handicrafts', label: 'Handloom & Handicrafts' },
  { value: 'Food Processing & Agro', label: 'Food Processing & Agro' },
  { value: 'Retail & Trade', label: 'Retail & Trade' },
  { value: 'Services & Repair', label: 'Services & Repair' }
];

const BUSINESS_STAGE_OPTIONS = [
  { value: 'Idea / Greenfield', label: 'Idea / Greenfield Startup' },
  { value: 'Early Stage (<1 Year)', label: 'Early Stage (<1 Year)' },
  { value: 'Operational Growth (3+ Years)', label: 'Operational Growth (3+ Years)' }
];

const UDYAM_OPTIONS = [
  { value: 'Registered', label: 'Registered (Have Udyam Number)' },
  { value: 'In Process', label: 'In Process / Applied' },
  { value: 'Not Registered', label: 'Not Registered (Yet to apply)' }
];

const GST_OPTIONS = [
  { value: 'Not Registered', label: 'Not Registered (Under ₹40 Lakh threshold)' },
  { value: 'Registered', label: 'Registered with GSTIN' },
  { value: 'Exempt', label: 'Exempted Category' }
];

export default function DashboardPage() {
  const { 
    user, 
    isAuthenticated, 
    logout, 
    measurements, 
    verifyAadhaarSimulated, 
    verifyPanSimulated, 
    verifyIncomeCertificateDigiLocker,
    updateEntrepreneurProfile,
    updateUserProfile,
    verifyIdentityGate,
    confirmExtractedDocument,
    addDocument,
    toggleSaveScheme, 
    isSchemeSaved, 
    submitApplication
  } = useAuth();
  
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [pendingApplySchemeId, setPendingApplySchemeId] = useState(() => searchParams.get('applyScheme'));

  // Active Tab: 'overview' | 'schemes_matched' | 'profile_wizard' | 'applications' | 'identity_docs' | 'saved_schemes'
  const [activeTab, setActiveTab] = useState(() => searchParams.get('tab') || 'overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam) {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  useEffect(() => {
    const handleTabSwitch = (e) => {
      if (e.detail) {
        setActiveTab(e.detail);
      }
    };
    window.addEventListener('switch-dashboard-tab', handleTabSwitch);
    return () => window.removeEventListener('switch-dashboard-tab', handleTabSwitch);
  }, []);

  // Search & Filter State inside Schemas view
  const [schemeSearch, setSchemeSearch] = useState('');
  const [schemeCategoryFilter, setSchemeCategoryFilter] = useState('all');

  // Profile Completion Pop-up Modal State (Auto-prompt on login)
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [profileForm, setProfileForm] = useState({
    name: '',
    age: '',
    gender: '',
    state: '',
    caste: '',
    income: '',
    employmentStatus: '',
    disabilityStatus: '',
    minorityStatus: ''
  });

  // Auto-open Profile Completion Modal when new or incomplete citizen logs in
  React.useEffect(() => {
    if (user) {
      const isIncomplete = !user.profileCompleted || !user.state || !user.gender || !user.caste || !user.income || !user.employmentStatus;
      if (isIncomplete) {
        setProfileForm({
          name: user.name || '',
          age: user.age ? String(user.age) : '',
          gender: user.gender || '',
          state: user.state || '',
          caste: user.caste || '',
          income: user.income ? String(user.income) : '',
          employmentStatus: user.employmentStatus || '',
          disabilityStatus: user.disabilityStatus || '',
          minorityStatus: user.minorityStatus || ''
        });
        setProfileModalOpen(true);
      }
    }
  }, [user]);

  // Modals & Wizards
  const [activeModalScheme, setActiveModalScheme] = useState(null);
  const [aadhaarModalOpen, setAadhaarModalOpen] = useState(false);
  const [aadhaarConsent, setAadhaarConsent] = useState(false);
  const [aadhaarOtpStep, setAadhaarOtpStep] = useState(false);
  const [aadhaarOtp, setAadhaarOtp] = useState('');

  const [panModalOpen, setPanModalOpen] = useState(false);
  const [panInput, setPanInput] = useState(user?.identity?.pan?.panNumber || '');
  const [panConsent, setPanConsent] = useState(false);

  // DigiLocker Income Certificate Modal State
  const [digilockerIncomeModalOpen, setDigilockerIncomeModalOpen] = useState(false);
  const [digilockerMode, setDigilockerMode] = useState('pin'); // 'pin' | 'edistrict'
  const [digilockerPin, setDigilockerPin] = useState('');
  const [edistrictState, setEdistrictState] = useState(user?.state || '');
  const [edistrictCertNo, setEdistrictCertNo] = useState('');
  const [edistrictDeclaredIncome, setEdistrictDeclaredIncome] = useState(user?.income ? String(user.income) : '');
  const [digilockerVerifying, setDigilockerVerifying] = useState(false);
  const [digilockerVerifyStage, setDigilockerVerifyStage] = useState('');
  const [digilockerStep, setDigilockerStep] = useState(1); // 1 = input, 2 = verifying, 3 = preview
  const [verifiedCertResult, setVerifiedCertResult] = useState(null);

  const handleStartDigilockerVerification = () => {
    if (digilockerMode === 'pin') {
      if (digilockerPin.length !== 6) {
        showToast('Please enter a 6-digit DigiLocker Security PIN');
        return;
      }
    } else {
      if (!edistrictCertNo.trim()) {
        showToast('Please enter an e-District Application / Certificate Number');
        return;
      }
    }

    setDigilockerStep(2);
    setDigilockerVerifying(true);
    setDigilockerVerifyStage('Connecting to DigiLocker National Gateway (NDX)...');

    setTimeout(() => {
      setDigilockerVerifyStage('Authenticating citizen token via MeriPehchaan SSO...');
    }, 450);

    setTimeout(() => {
      setDigilockerVerifyStage('Fetching URI in.gov.revenue-INC-CERT from State Revenue Repository...');
    }, 900);

    setTimeout(() => {
      setDigilockerVerifyStage('Validating PKI Digital Signature (SHA-256) & Revenue Seal...');
    }, 1350);

    setTimeout(() => {
      const generatedCertNo = digilockerMode === 'edistrict' && edistrictCertNo.trim() 
        ? edistrictCertNo.trim().toUpperCase() 
        : `INC-${(user?.state || 'IN').slice(0, 2).toUpperCase()}-2026-${Math.floor(100000 + Math.random() * 900000)}`;
      
      const verifiedIncomeAmount = Number(edistrictDeclaredIncome) || Number(user?.income) || 0;
      const targetState = digilockerMode === 'edistrict' ? (edistrictState || user?.state || 'Not Declared') : (user?.state || 'Not Declared');

      const certResult = {
        certificateNo: generatedCertNo,
        annualIncome: verifiedIncomeAmount,
        state: targetState,
        district: user?.district || 'Not Declared',
        issuingAuthority: `Office of the Tehsildar / Sub-Divisional Magistrate (SDM), Revenue Department, Govt of ${targetState}`,
        applicantName: user?.name || 'Citizen Beneficiary',
        issueDate: '15 Apr 2026',
        validTill: '14 Apr 2029',
        digitalSignature: 'SHA-256 PKI Validated - DigiLocker India',
        source: 'DigiLocker National Document Gateway (e-District)'
      };

      setVerifiedCertResult(certResult);
      setDigilockerVerifying(false);
      setDigilockerStep(3);
    }, 1800);
  };

  const handleConfirmDigilockerCertificate = () => {
    if (!verifiedCertResult) return;
    verifyIncomeCertificateDigiLocker(verifiedCertResult);
    setDigilockerIncomeModalOpen(false);
    setDigilockerStep(1);
    showToast('Income Certificate verified via DigiLocker and stored in Document Locker!');
  };

  // Inline ID Verification Gate state for Scheme Application Wizard
  const [gateAadhaarInput, setGateAadhaarInput] = useState('');
  const [gateAadhaarOtpSent, setGateAadhaarOtpSent] = useState(false);
  const [gateAadhaarOtp, setGateAadhaarOtp] = useState('');
  const [gatePanInput, setGatePanInput] = useState(user?.identity?.pan?.panNumber || '');

  const [reviewDocModal, setReviewDocModal] = useState(null);
  const [docEditFields, setDocEditFields] = useState({});

  const [applicationWizardScheme, setApplicationWizardScheme] = useState(null);
  const [appStep, setAppStep] = useState('readiness'); // 'readiness' | 'preview' | 'otp' | 'success'
  const [appOtp, setAppOtp] = useState('');
  const [appDeclarations, setAppDeclarations] = useState({ review: false, accurate: false, consentShare: false });
  const [recentSubmittedApp, setRecentSubmittedApp] = useState(null);

  // Acknowledgment download modal / preview
  const [previewAckModal, setPreviewAckModal] = useState(null);

  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  const handleSaveProfileCompletion = (e) => {
    if (e) e.preventDefault();
    if (!profileForm.name.trim()) {
      showToast('Please enter your full legal name as per Govt ID.');
      return;
    }
    if (!profileForm.age) {
      showToast('Please enter your age in years.');
      return;
    }
    if (!profileForm.gender) {
      showToast('Please select your gender.');
      return;
    }
    if (!profileForm.state) {
      showToast('Please select your state/UT of residence.');
      return;
    }
    if (!profileForm.caste) {
      showToast('Please select your social category.');
      return;
    }
    if (!profileForm.income) {
      showToast('Please enter your annual family income.');
      return;
    }
    if (!profileForm.employmentStatus) {
      showToast('Please select your primary occupation.');
      return;
    }

    updateUserProfile({
      name: profileForm.name.trim(),
      age: Number(profileForm.age),
      gender: profileForm.gender,
      state: profileForm.state,
      caste: profileForm.caste,
      income: Number(profileForm.income),
      occupation: profileForm.employmentStatus,
      employmentStatus: profileForm.employmentStatus,
      disabilityStatus: profileForm.disabilityStatus || 'None',
      minorityStatus: profileForm.minorityStatus || 'No',
      profileCompleted: true
    });

    setProfileModalOpen(false);
    showToast('Profile completed successfully! Personalized schemes unlocked.');
    if (pendingApplySchemeId) {
      const target = SCHEMES_DATABASE.find(s => s.id === pendingApplySchemeId);
      if (target) {
        handleOpenApplicationWizard(target);
        setPendingApplySchemeId(null);
        return;
      }
    }
    setActiveTab('schemes_matched');
  };

  // If not logged in
  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-[75vh] flex flex-col items-center justify-center p-6 text-center max-w-md mx-auto">
        <div className="w-20 h-20 rounded-3xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 mb-4 shadow-sm">
          <Landmark className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-black text-slate-900 mb-2">Citizen Sign In Required</h2>
        <p className="text-xs text-slate-600 mb-6 leading-relaxed">
          Please sign in with your registered mobile number to access your verified entrepreneur profile, Digi-Vault, and real-time application tracker.
        </p>
        <Link
          to="/auth"
          className="w-full py-3.5 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
        >
          <span>Sign In with Mobile OTP</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  // Entrepreneur Profile Form State
  const [profileFormData, setProfileFormData] = useState({
    // Personal
    name: user.name || '',
    dob: user.dob || '',
    age: user.age ? String(user.age) : '',
    gender: user.gender || '',
    state: user.state || '',
    district: user.district || '',
    caste: user.caste || '',
    income: user.income ? String(user.income) : '',
    occupation: user.occupation || user.employmentStatus || '',
    employmentStatus: user.employmentStatus || user.occupation || '',
    disabilityStatus: user.disabilityStatus || 'None',
    minorityStatus: user.minorityStatus || 'No',
    area: user.area || '',

    // Business
    businessName: user.business?.name || '',
    businessType: user.business?.type || '',
    businessSector: user.business?.sector || '',
    businessStage: user.business?.stage || '',
    businessLocation: user.business?.location || '',
    annualTurnover: user.business?.annualTurnover ? String(user.business.annualTurnover) : '',
    employees: user.business?.employees ? String(user.business.employees) : '',
    udyamStatus: user.business?.udyamStatus || '',
    gstStatus: user.business?.gstStatus || '',

    // Financial Requirement
    purposeOfFunding: user.business?.purposeOfFunding || '',
    totalProjectCost: user.business?.totalProjectCost ? String(user.business.totalProjectCost) : '',
    fundingRequired: user.business?.fundingRequired ? String(user.business.fundingRequired) : '',
    applicantContribution: user.business?.applicantContribution ? String(user.business.applicantContribution) : '',
    machineryCost: user.business?.machineryCost ? String(user.business.machineryCost) : '',
    workingCapital: user.business?.workingCapital ? String(user.business.workingCapital) : ''
  });

  // Keep form data in sync with user state
  useEffect(() => {
    if (user) {
      setProfileFormData({
        name: user.name || '',
        dob: user.dob || '',
        age: user.age ? String(user.age) : '',
        gender: user.gender || '',
        state: user.state || '',
        district: user.district || '',
        caste: user.caste || '',
        income: user.income ? String(user.income) : '',
        occupation: user.occupation || user.employmentStatus || '',
        employmentStatus: user.employmentStatus || user.occupation || '',
        disabilityStatus: user.disabilityStatus || 'None',
        minorityStatus: user.minorityStatus || 'No',
        area: user.area || '',
        businessName: user.business?.name || '',
        businessType: user.business?.type || '',
        businessSector: user.business?.sector || '',
        businessStage: user.business?.stage || '',
        businessLocation: user.business?.location || '',
        annualTurnover: user.business?.annualTurnover ? String(user.business.annualTurnover) : '',
        employees: user.business?.employees ? String(user.business.employees) : '',
        udyamStatus: user.business?.udyamStatus || '',
        gstStatus: user.business?.gstStatus || '',
        purposeOfFunding: user.business?.purposeOfFunding || '',
        totalProjectCost: user.business?.totalProjectCost ? String(user.business.totalProjectCost) : '',
        fundingRequired: user.business?.fundingRequired ? String(user.business.fundingRequired) : '',
        applicantContribution: user.business?.applicantContribution ? String(user.business.applicantContribution) : '',
        machineryCost: user.business?.machineryCost ? String(user.business.machineryCost) : '',
        workingCapital: user.business?.workingCapital ? String(user.business.workingCapital) : ''
      });
    }
  }, [user]);

  const handleProfileSave = (e) => {
    e.preventDefault();
    const primaryOccupation = profileFormData.occupation || profileFormData.employmentStatus || '';
    updateEntrepreneurProfile(
      {
        name: profileFormData.businessName,
        type: profileFormData.businessType,
        sector: profileFormData.businessSector,
        stage: profileFormData.businessStage,
        location: profileFormData.businessLocation,
        annualTurnover: Number(profileFormData.annualTurnover) || 0,
        employees: Number(profileFormData.employees) || 0,
        udyamStatus: profileFormData.udyamStatus,
        gstStatus: profileFormData.gstStatus,
        purposeOfFunding: profileFormData.purposeOfFunding,
        totalProjectCost: Number(profileFormData.totalProjectCost) || 0,
        fundingRequired: Number(profileFormData.fundingRequired) || 0,
        applicantContribution: Number(profileFormData.applicantContribution) || 0,
        machineryCost: Number(profileFormData.machineryCost) || 0,
        workingCapital: Number(profileFormData.workingCapital) || 0
      },
      {
        name: profileFormData.name,
        dob: profileFormData.dob,
        age: profileFormData.age ? Number(profileFormData.age) : null,
        gender: profileFormData.gender,
        state: profileFormData.state,
        district: profileFormData.district,
        caste: profileFormData.caste,
        income: profileFormData.income ? Number(profileFormData.income) : 0,
        occupation: primaryOccupation,
        employmentStatus: primaryOccupation,
        disabilityStatus: profileFormData.disabilityStatus || 'None',
        minorityStatus: profileFormData.minorityStatus || 'No',
        area: profileFormData.area || ''
      }
    );
    showToast('Citizen & entrepreneur profile updated successfully!');
  };

  // Preliminary vs Verified Recommendations
  const preliminarySchemes = useMemo(() => {
    return SCHEMES_DATABASE.filter(s => {
      const cat = (s.category || '').toLowerCase();
      if (user.business && (cat.includes('business') || cat.includes('financial') || s.id.includes('mudra') || s.id.includes('pmegp') || s.id.includes('vishwakarma') || s.id.includes('stand-up'))) return true;
      if (cat.includes('agriculture') && user.occupation === 'farmer') return true;
      if (cat.includes('students') && user.occupation === 'student') return true;
      return true;
    }).slice(0, 8);
  }, [user]);

  // Filtered Schemes for the Schemes Matched tab
  const filteredSchemesList = useMemo(() => {
    return preliminarySchemes.filter(scheme => {
      const matchesSearch = (scheme.title || '').toLowerCase().includes(schemeSearch.toLowerCase()) ||
                            (scheme.benefit || '').toLowerCase().includes(schemeSearch.toLowerCase()) ||
                            (scheme.category || '').toLowerCase().includes(schemeSearch.toLowerCase());
      
      const matchesCategory = schemeCategoryFilter === 'all' || 
                              (scheme.category || '').toLowerCase().includes(schemeCategoryFilter.toLowerCase());
      
      return matchesSearch && matchesCategory;
    });
  }, [preliminarySchemes, schemeSearch, schemeCategoryFilter]);

  // Saved Schemes
  const savedList = useMemo(() => {
    return SCHEMES_DATABASE.filter(s => (user.savedSchemeIds || []).includes(s.id));
  }, [user.savedSchemeIds]);

  // Pending Prerequisites & Profile Tasks calculation
  const pendingTasks = useMemo(() => {
    if (!user) return [];
    const list = [];
    
    // 1. Citizen Demographics
    const isProfileMissing = !user.state || !user.gender || !user.caste || !user.age || !user.name || !user.income;
    list.push({
      id: 'demographics',
      title: 'Citizen Demographics',
      icon: User,
      desc: isProfileMissing 
        ? 'Action Needed: Fill Age, Gender, State, Social Category & Income' 
        : `${user.gender || 'Citizen'}, Age ${user.age || '—'} • ${user.state || 'India'} (₹${Number(user.income || 0).toLocaleString('en-IN')})`,
      status: isProfileMissing ? 'pending' : 'complete',
      statusText: isProfileMissing ? 'Fill Out Now' : 'Complete',
      action: () => setProfileModalOpen(true)
    });

    // 2. Official Income Certificate (DigiLocker / e-District)
    const isIncomeCertMissing = !user.identity?.incomeCertificate?.verified;
    list.push({
      id: 'income',
      title: 'Income Certificate',
      icon: FolderLock,
      desc: isIncomeCertMissing 
        ? 'Official DigiLocker & e-District Revenue Verification' 
        : `DigiLocker Verified: ₹${Number(user.identity?.incomeCertificate?.annualIncome || user.income || 0).toLocaleString('en-IN')}`,
      status: isIncomeCertMissing ? 'pending' : 'complete',
      statusText: isIncomeCertMissing ? 'Verify via DigiLocker' : 'DigiLocker Verified',
      action: () => {
        setDigilockerStep(1);
        setDigilockerPin('');
        setEdistrictCertNo('');
        setEdistrictDeclaredIncome(user?.income ? String(user.income) : '');
        setDigilockerIncomeModalOpen(true);
      }
    });

    // 3. UIDAI Aadhaar e-KYC Verification
    const isAadhaarMissing = !user.identity?.aadhaar?.verified;
    list.push({
      id: 'aadhaar',
      title: 'Aadhaar e-KYC',
      icon: Fingerprint,
      desc: isAadhaarMissing ? 'Mandatory UIDAI Verification for Direct DBT' : `UIDAI Active • ${user.identity?.aadhaar?.maskedNumber}`,
      status: isAadhaarMissing ? 'pending' : 'complete',
      statusText: isAadhaarMissing ? 'Verify e-KYC' : 'UIDAI Verified',
      action: () => { setAadhaarModalOpen(true); setAadhaarOtpStep(false); }
    });

    // 4. ITD PAN Verification
    const isPanMissing = !user.identity?.pan?.verified;
    list.push({
      id: 'pan',
      title: 'PAN Verification',
      icon: FileText,
      desc: isPanMissing ? 'Required for MSME Bank Loans & Capital Subsidies' : `ITD Active • ${user.identity?.pan?.panNumber}`,
      status: isPanMissing ? 'pending' : 'complete',
      statusText: isPanMissing ? 'Verify PAN' : 'ITD Verified',
      action: () => setPanModalOpen(true)
    });

    // 5. Machinery & Project Cost (MSME & DIC)
    const isBusinessMissing = !user.business?.name || !user.business?.purposeOfFunding || !user.business?.totalProjectCost;
    list.push({
      id: 'machinery',
      title: 'Machinery & Project',
      icon: Cpu,
      desc: isBusinessMissing 
        ? 'Action Needed: Fill Enterprise Name, Funding Purpose & Project Cost' 
        : `${user.business?.name} • ${user.business?.purposeOfFunding}`,
      status: isBusinessMissing ? 'pending' : 'complete',
      statusText: isBusinessMissing ? 'Fill Business Details' : 'Recorded',
      action: () => setActiveTab('profile_wizard')
    });

    return list;
  }, [user]);

  const pendingCount = pendingTasks.filter(t => t.status === 'pending').length;

  // Resolved Target Scheme being applied for
  const targetPendingScheme = useMemo(() => {
    if (!pendingApplySchemeId) return null;
    return SCHEMES_DATABASE.find(s => s.id === pendingApplySchemeId) || null;
  }, [pendingApplySchemeId]);

  // Trigger Application Readiness Flow
  const handleOpenApplicationWizard = (scheme) => {
    setApplicationWizardScheme(scheme);
    setAppStep('readiness');
    setAppOtp('');
    setAppDeclarations({ review: true, accurate: true, consentShare: true });
  };

  // Handle Apply Button Click across Dashboard (Enforces clearing all pending verification tasks)
  const handleApplySchemeClick = (scheme) => {
    if (!scheme) return;

    // Check if citizen has cleared all pending verification tasks
    if (pendingCount > 0) {
      setPendingApplySchemeId(scheme.id);
      setActiveTab('identity_docs');
      showToast(`Action Required: Please complete your ${pendingCount} pending task(s) in Identity & DigiVault before applying for ${scheme.title}`);
      
      setTimeout(() => {
        const checklistElement = document.getElementById('prerequisites-checklist');
        if (checklistElement) {
          checklistElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
      return;
    }

    // All pending tasks cleared -> proceed directly to Application Wizard
    handleOpenApplicationWizard(scheme);
  };

  // Auto-launch Application Wizard or redirect to Identity & DigiVault if applyScheme query param is passed
  useEffect(() => {
    const applySchemeParam = searchParams.get('applyScheme');
    if (applySchemeParam && user) {
      setSearchParams(prev => {
        const next = new URLSearchParams(prev);
        next.delete('applyScheme');
        return next;
      }, { replace: true });

      const scheme = SCHEMES_DATABASE.find(s => s.id === applySchemeParam);
      if (scheme) {
        handleApplySchemeClick(scheme);
      }
    }
  }, [searchParams, user, pendingCount, setSearchParams]);

  // Navigation Items Config
  const navMenuItems = [
    {
      id: 'overview',
      label: 'Dashboard Overview',
      shortLabel: 'Overview',
      icon: LayoutDashboard,
      badge: null
    },
    {
      id: 'schemes_matched',
      label: 'Matched Schemes',
      shortLabel: 'Schemes',
      icon: Sparkles,
      badge: preliminarySchemes.length
    },
    {
      id: 'profile_wizard',
      label: 'Entrepreneur Profile',
      shortLabel: 'Profile',
      icon: Briefcase,
      badge: measurements.completeness < 100 ? `${measurements.completeness}%` : 'Done'
    },
    {
      id: 'applications',
      label: 'My Applications',
      shortLabel: 'Applications',
      icon: FileCheck2,
      badge: (user.applications || []).length || '0'
    },
    {
      id: 'identity_docs',
      label: 'Identity & Digi-Vault',
      shortLabel: 'Vault',
      icon: FolderLock,
      badge: `${(user.documents || []).length} Docs`
    },
    {
      id: 'saved_schemes',
      label: 'Saved Schemes',
      shortLabel: 'Saved',
      icon: Bookmark,
      badge: (user.savedSchemeIds || []).length || null
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50/60 pb-16">
      
      {/* Toast Alert */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-20 right-6 z-50 px-4 py-3 rounded-2xl bg-slate-900 text-white text-xs font-semibold shadow-2xl border border-slate-700 flex items-center gap-2.5 max-w-sm"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top GovTech Assurance Bar */}
      <div className="bg-white border-b border-slate-200/80 px-4 sm:px-6 lg:px-8 py-2.5">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-600">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-semibold text-slate-800">GovTech Unified Citizen Portal</span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-500 font-mono text-[11px]">{user.citizenId}</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              <ShieldCheck className="w-3 h-3 text-emerald-600" />
              {user.identity?.aadhaar?.verified ? 'Aadhaar Verified Citizen' : 'Active Citizen Session'}
            </span>
            <span className="text-[11px] text-slate-400 hidden sm:inline">
              Data protected under Digital Personal Data Protection Act, 2023
            </span>
          </div>
        </div>
      </div>

      {/* MAIN CONTAINER: 2-COLUMN SIDEBAR + WORKSPACE */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        
        {/* Mobile Navigation Toggle Bar */}
        <div className="lg:hidden mb-4 bg-white p-3 rounded-2xl border border-slate-200 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <User className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900 leading-tight">{user.name}</p>
              <p className="text-[10px] text-slate-500 capitalize">{activeTab.replace('_', ' ')}</p>
            </div>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 flex items-center gap-1 text-xs font-bold cursor-pointer"
          >
            <Menu className="w-4 h-4" />
            <span>Menu</span>
          </button>
        </div>

        {/* Mobile Dropdown Menu Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden mb-6 p-4 rounded-2xl bg-white border border-slate-200 shadow-lg space-y-2">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2">Navigation Menu</p>
            {navMenuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== null && (
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      isActive ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* ======================================================== */}
          {/* LEFT SIDEBAR: CITIZEN PROFILE & PERSISTENT NAVIGATION     */}
          {/* ======================================================== */}
          <aside className="lg:col-span-4 xl:col-span-3 space-y-5">
            
            {/* 1. Citizen Profile Card */}
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center gap-3.5 relative z-10">
                <div className="relative">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 shadow-xs">
                    <User className="w-7 h-7" />
                  </div>
                  <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white" title="Active" />
                </div>

                <div className="min-w-0 flex-1">
                  <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">
                    Citizen Profile
                  </span>
                  <h2 className="text-sm font-extrabold text-slate-900 truncate">
                    {user.name}
                  </h2>
                  <p className="text-[11px] text-slate-500 truncate">
                    {user.role || user.employmentStatus}
                  </p>
                </div>
              </div>

              {/* Citizen Details Row */}
              <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 block uppercase">Domicile</span>
                  <span className="font-semibold text-slate-800 text-[11px] truncate block">
                    {user.district}, {user.state}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 block uppercase">Social Category</span>
                  <span className="font-semibold text-slate-800 text-[11px] block">
                    {user.caste} ({user.gender})
                  </span>
                </div>
              </div>

              {/* Profile Completeness Bar */}
              <div className="mt-4 pt-3 border-t border-slate-100 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-600 text-[11px]">Profile Completeness</span>
                  <span className="font-extrabold text-emerald-700 text-xs">{measurements.completeness}%</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${measurements.completeness}%` }}
                  />
                </div>
                <p className="text-[10px] text-slate-400 leading-tight">
                  {measurements.completeness < 100 
                    ? 'Add business & income data to unlock 100% sanction readiness.'
                    : 'Profile complete! Maximum eligibility match active.'}
                </p>
              </div>

            </div>

            {/* 2. Vertical Navigation Menu */}
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-3 space-y-1">
              <div className="px-3 py-2 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                Portal Workspace
              </div>

              {navMenuItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs font-bold transition-all text-left cursor-pointer group ${
                      isActive
                        ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/20'
                        : 'text-slate-700 hover:bg-slate-100/80 hover:text-slate-900'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                        isActive ? 'text-white' : 'text-slate-500'
                      }`} />
                      <span>{item.label}</span>
                    </div>

                    {item.badge !== null && (
                      <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full transition-colors ${
                        isActive 
                          ? 'bg-white/20 text-white' 
                          : 'bg-slate-100 text-slate-700 group-hover:bg-slate-200'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* 3. Citizen Support & Portal Helplines */}
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-4 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                  Citizen Helpline
                </span>
                <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Toll-Free 24x7
                </span>
              </div>

              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 text-xs space-y-1">
                <span className="font-bold text-slate-800 block">National Portal Helpdesk</span>
                <span className="font-mono text-emerald-700 font-extrabold text-xs block">1800-11-2026</span>
                <p className="text-[10px] text-slate-500">Multilingual citizen assistance available in 13 official Indian languages.</p>
              </div>
            </div>

            {/* 4. Quick Services & Sign Out */}
            <div className="bg-slate-100/70 rounded-3xl p-4 border border-slate-200 space-y-2.5">
              <Link
                to="/ocr-scanner"
                className="w-full py-2 px-3 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 flex items-center justify-between shadow-2xs transition-all"
              >
                <div className="flex items-center gap-2">
                  <Cpu className="w-3.5 h-3.5 text-purple-600" />
                  <span>OCR Document Scanner</span>
                </div>
                <ArrowRight className="w-3 h-3 text-slate-400" />
              </Link>

              <Link
                to="/schemes"
                className="w-full py-2 px-3 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 flex items-center justify-between shadow-2xs transition-all"
              >
                <div className="flex items-center gap-2">
                  <Layers className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Browse All 50+ Schemes</span>
                </div>
                <ArrowRight className="w-3 h-3 text-slate-400" />
              </Link>

              <button
                onClick={() => { logout(); navigate('/'); }}
                className="w-full py-2 px-3 rounded-xl text-xs font-bold text-red-600 hover:bg-red-50 transition-colors flex items-center justify-center gap-2 cursor-pointer pt-2 border-t border-slate-200/60"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out Account</span>
              </button>
            </div>

          </aside>

          {/* ======================================================== */}
          {/* RIGHT WORKSPACE: ACTIVE VIEW & FUNCTIONAL CANVAS          */}
          {/* ======================================================== */}
          <main className="lg:col-span-8 xl:col-span-9 space-y-6">

            {/* Top Workspace Header */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-wider mb-1">
                  <span>Citizen Workspace</span>
                  <span>/</span>
                  <span className="capitalize">{activeTab.replace('_', ' ')}</span>
                </div>
                <h1 className="text-xl sm:text-2xl font-black text-slate-900">
                  {activeTab === 'overview' && 'Citizen Dashboard Overview'}
                  {activeTab === 'schemes_matched' && 'Matched Welfare Schemes'}
                  {activeTab === 'profile_wizard' && 'Entrepreneur & Business Profile Wizard'}
                  {activeTab === 'applications' && 'Tracked Scheme Applications'}
                  {activeTab === 'identity_docs' && 'Identity Authentication & Digi-Vault'}
                  {activeTab === 'saved_schemes' && 'Saved Schemes & Shortlist'}
                </h1>
                <p className="text-xs text-slate-500 mt-1">
                  {activeTab === 'overview' && 'Unified overview of your enterprise profile, verified credentials, and matched schemes.'}
                  {activeTab === 'schemes_matched' && 'Schemes matched with your eligibility criteria, business sector, and financial needs.'}
                  {activeTab === 'profile_wizard' && 'Complete your enterprise data. Fully usable even without PAN, Udyam, or GST.'}
                  {activeTab === 'applications' && 'Real-time multi-stage verification status directly from ministry nodal endpoints.'}
                  {activeTab === 'identity_docs' && 'Consent-driven Aadhaar verification, PAN validation, and OCR document review.'}
                  {activeTab === 'saved_schemes' && 'Bookmarked schemes for quick comparison, readiness review, and application submission.'}
                </p>
              </div>

              {/* Contextual Action Button based on tab */}
              <div className="shrink-0 flex items-center gap-2">
                {activeTab !== 'profile_wizard' && (
                  <button
                    onClick={() => setActiveTab('profile_wizard')}
                    className="px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Edit3 className="w-3.5 h-3.5 text-slate-500" />
                    <span>Edit Profile</span>
                  </button>
                )}

                {activeTab !== 'schemes_matched' && (
                  <button
                    onClick={() => setActiveTab('schemes_matched')}
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Find Schemes</span>
                  </button>
                )}
              </div>
            </div>

            {/* 4 CITIZEN READINESS MEASUREMENTS */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
              
              {/* Measurement 1: Profile Completeness */}
              <div 
                onClick={() => setActiveTab('profile_wizard')}
                className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:border-emerald-400 hover:shadow-sm transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-500 group-hover:text-emerald-700">
                    Profile Completeness
                  </span>
                  <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-xs">
                    {measurements.completeness}%
                  </div>
                </div>
                <div className="mt-2.5">
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                      style={{ width: `${measurements.completeness}%` }}
                    />
                  </div>
                </div>
                <p className="text-[10px] text-slate-400 mt-2">
                  Required enterprise & personal info provided
                </p>
              </div>

              {/* Measurement 2: Information Verification */}
              <div 
                onClick={() => setActiveTab('identity_docs')}
                className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:border-blue-400 hover:shadow-sm transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-500 group-hover:text-blue-700">
                    Info Verification
                  </span>
                  <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-bold text-xs">
                    {measurements.verification}%
                  </div>
                </div>
                <div className="mt-2.5">
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className="bg-blue-500 h-full rounded-full transition-all duration-500"
                      style={{ width: `${measurements.verification}%` }}
                    />
                  </div>
                </div>
                <p className="text-[10px] text-slate-400 mt-2">
                  Data backed by authorized verification
                </p>
              </div>

              {/* Measurement 3: Application Readiness */}
              <div 
                onClick={() => setActiveTab('overview')}
                className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:border-purple-400 hover:shadow-sm transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-500 group-hover:text-purple-700">
                    Application Readiness
                  </span>
                  <div className="w-7 h-7 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center font-bold text-xs">
                    {measurements.readiness}%
                  </div>
                </div>
                <div className="mt-2.5">
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className="bg-purple-500 h-full rounded-full transition-all duration-500"
                      style={{ width: `${measurements.readiness}%` }}
                    />
                  </div>
                </div>
                <p className="text-[10px] text-slate-400 mt-2">
                  Documents ready for official submission
                </p>
              </div>

              {/* Measurement 4: Recommendation Score */}
              <div 
                onClick={() => setActiveTab('schemes_matched')}
                className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:border-amber-400 hover:shadow-sm transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-500 group-hover:text-amber-700">
                    Recommendation Score
                  </span>
                  <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center font-bold text-xs">
                    {measurements.recommendationScore}/100
                  </div>
                </div>
                <div className="mt-2.5">
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className="bg-amber-500 h-full rounded-full transition-all duration-500"
                      style={{ width: `${measurements.recommendationScore}%` }}
                    />
                  </div>
                </div>
                <p className="text-[10px] text-slate-400 mt-2 italic">
                  Criteria fit • Not a loan guarantee
                </p>
              </div>

            </div>

            {/* ====================================================== */}
            {/* VIEW CONTENT TABS                                      */}
            {/* ====================================================== */}

            {/* ------------------------------------------------------ */}
            {/* TAB 1: OVERVIEW                                        */}
            {/* ------------------------------------------------------ */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                
                {/* Enterprise Snapshot Card */}
                <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-emerald-600" />
                        <span>Registered Enterprise Profile</span>
                      </h3>
                      <p className="text-xs text-slate-500">
                        Targeting credit linkages and capital subsidies under National Portal guidelines.
                      </p>
                    </div>
                    <button
                      onClick={() => setActiveTab('profile_wizard')}
                      className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <span>Update Business Details</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                      <span className="text-[10px] font-bold text-slate-400 block uppercase">Enterprise Name</span>
                      <span className="font-bold text-slate-800 truncate block mt-0.5">
                        {user.business?.name || <span className="text-amber-600 font-semibold text-[11px]">Not Declared</span>}
                      </span>
                    </div>

                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                      <span className="text-[10px] font-bold text-slate-400 block uppercase">Sector & Stage</span>
                      <span className="font-bold text-slate-800 truncate block mt-0.5">
                        {user.business?.sector ? `${user.business.sector} • ${user.business?.stage?.split(' ')[0] || 'Active'}` : <span className="text-slate-400 font-normal text-[11px]">Not Specified</span>}
                      </span>
                    </div>

                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                      <span className="text-[10px] font-bold text-slate-400 block uppercase">Project Funding Target</span>
                      <span className="font-extrabold text-emerald-700 block mt-0.5">
                        {user.business?.fundingRequired ? `₹${Number(user.business.fundingRequired).toLocaleString('en-IN')}` : <span className="text-slate-400 font-normal text-[11px]">Not Set</span>}
                      </span>
                    </div>

                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                      <span className="text-[10px] font-bold text-slate-400 block uppercase">Compliance Status</span>
                      <span className="font-bold text-blue-700 block mt-0.5">
                        Udyam: {user.business?.udyamStatus || <span className="text-slate-400 font-normal text-[11px]">Not Declared</span>}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Top Recommended Schemes Grid */}
                <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-emerald-600" />
                        <h3 className="text-sm font-bold text-slate-900">
                          Top Schemes Aligned for You
                        </h3>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                          Verified Match
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Scored across Eligibility (40%), Business Fit (25%), Financial Fit (20%), and Target-Group (15%).
                      </p>
                    </div>

                    <button
                      onClick={() => setActiveTab('schemes_matched')}
                      className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1 self-start sm:self-center cursor-pointer"
                    >
                      <span>View All ({preliminarySchemes.length})</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {preliminarySchemes.slice(0, 4).map((scheme) => {
                      const fitScore = scheme.id.includes('pmegp') ? 92 : scheme.id.includes('mudra') ? 88 : 84;
                      const isReady = user.identity?.aadhaar?.verified && (user.documents || []).length >= 2;
                      return (
                        <div 
                          key={scheme.id}
                          className="p-4 rounded-2xl border border-slate-200/90 hover:border-emerald-400 bg-white hover:shadow-md transition-all flex flex-col justify-between gap-3"
                        >
                          <div className="space-y-2">
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 uppercase tracking-wider">
                                {scheme.category}
                              </span>
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-800 border border-blue-200">
                                Potentially Eligible
                              </span>
                            </div>

                            <h4 className="text-xs font-bold text-slate-900 leading-snug hover:text-emerald-700 transition-colors">
                              {scheme.title}
                            </h4>
                            <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                              {scheme.benefit}
                            </p>

                            <div className="pt-1 flex items-center gap-3 text-xs">
                              <span className="font-bold text-emerald-700 text-xs">
                                Fit Score: {fitScore}/100
                              </span>
                              <span className="text-slate-300">•</span>
                              <span className="text-slate-500 text-[11px]">
                                Readiness: {isReady ? '85%' : '65%'}
                              </span>
                            </div>
                          </div>

                          <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                            <button
                              onClick={() => toggleSaveScheme(scheme.id)}
                              className={`p-2 rounded-xl border text-xs transition-all cursor-pointer ${
                                isSchemeSaved(scheme.id)
                                  ? 'bg-amber-50 border-amber-300 text-amber-700'
                                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                              }`}
                              title={isSchemeSaved(scheme.id) ? 'Remove Bookmark' : 'Save Scheme'}
                            >
                              <Bookmark className="w-3.5 h-3.5" />
                            </button>

                            <button
                              onClick={() => setActiveModalScheme(scheme)}
                              className="py-2 px-3 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
                            >
                              Guidelines
                            </button>

                            <button
                              onClick={() => handleApplySchemeClick(scheme)}
                              className="flex-1 py-2 px-3 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors shadow-2xs flex items-center justify-center gap-1 cursor-pointer"
                            >
                              <span>Apply Now</span>
                              <ArrowRight className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Recent Applications Snapshot */}
                {(user.applications && user.applications.length > 0) && (
                  <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <div>
                        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                          <FileCheck2 className="w-4 h-4 text-blue-600" />
                          <span>Latest Active Application</span>
                        </h3>
                        <p className="text-xs text-slate-500">
                          Live transmission status verified with ministry nodal portal.
                        </p>
                      </div>
                      <button
                        onClick={() => setActiveTab('applications')}
                        className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <span>View All ({user.applications.length})</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {user.applications.slice(0, 1).map((app) => (
                      <div key={app.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-mono font-bold text-[10px] bg-white px-2 py-0.5 rounded border border-slate-200 text-slate-700">
                              ACK: {app.officialAck}
                            </span>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                              {app.status}
                            </span>
                          </div>
                          <h4 className="font-bold text-slate-900">{app.schemeTitle}</h4>
                          <p className="text-slate-500 text-[11px]">{app.department} • Applied {app.appliedDate}</p>
                        </div>

                        <div className="flex items-center gap-2 self-start sm:self-center">
                          <button
                            onClick={() => setPreviewAckModal(app)}
                            className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-1 cursor-pointer"
                          >
                            <Download className="w-3 h-3 text-emerald-600" />
                            <span>Ack Slip</span>
                          </button>
                          <button
                            onClick={() => setActiveTab('applications')}
                            className="px-3 py-1.5 rounded-xl bg-emerald-600 font-bold text-white hover:bg-emerald-700 flex items-center gap-1 cursor-pointer"
                          >
                            <span>Track Timeline</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

              </div>
            )}

            {/* ------------------------------------------------------ */}
            {/* TAB 2: SCHEMES MATCHED (Full Interactive Filter)        */}
            {/* ------------------------------------------------------ */}
            {activeTab === 'schemes_matched' && (
              <div className="space-y-6">
                
                {/* Search & Filter Bar */}
                <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-xs space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="relative flex-1">
                      <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="Search matched schemes by keyword, benefit, or sector..."
                        value={schemeSearch}
                        onChange={(e) => setSchemeSearch(e.target.value)}
                        className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                      />
                    </div>

                    <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                      {['all', 'business', 'financial', 'agriculture', 'education'].map((cat) => (
                        <button
                          key={cat}
                          onClick={() => setSchemeCategoryFilter(cat)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all shrink-0 cursor-pointer ${
                            schemeCategoryFilter === cat
                              ? 'bg-emerald-600 text-white shadow-2xs'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                        >
                          {cat === 'all' ? 'All Matched' : cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="text-[11px] text-slate-500 flex items-center justify-between border-t border-slate-100 pt-3">
                    <span>Showing <strong>{filteredSchemesList.length}</strong> verified matches</span>
                    <span className="italic text-slate-400">Recommendation score measures criteria fit • Not an automatic loan guarantee</span>
                  </div>
                </div>

                {/* Scheme Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredSchemesList.map((scheme) => {
                    const fitScore = scheme.id.includes('pmegp') ? 92 : scheme.id.includes('mudra') ? 88 : scheme.id.includes('vishwakarma') ? 95 : 84;
                    const isReady = user.identity?.aadhaar?.verified && (user.documents || []).length >= 2;
                    return (
                      <div 
                        key={scheme.id}
                        className="p-5 rounded-3xl border border-slate-200/90 hover:border-emerald-400 bg-white hover:shadow-md transition-all flex flex-col justify-between gap-4"
                      >
                        <div className="space-y-2.5">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 uppercase tracking-wider">
                              {scheme.category}
                            </span>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-800 border border-blue-200">
                              Verification Eligible
                            </span>
                          </div>

                          <h3 className="text-sm font-bold text-slate-900 leading-snug hover:text-emerald-700 transition-colors">
                            {scheme.title}
                          </h3>

                          <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                            {scheme.benefit}
                          </p>

                          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                            <span className="font-extrabold text-emerald-700">
                              Fit Score: {fitScore}/100
                            </span>
                            <span className="text-slate-500 text-[11px]">
                              Application Readiness: {isReady ? '85%' : '65%'}
                            </span>
                          </div>
                        </div>

                        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                          <button
                            onClick={() => toggleSaveScheme(scheme.id)}
                            className={`p-2.5 rounded-xl border text-xs transition-all cursor-pointer ${
                              isSchemeSaved(scheme.id)
                                ? 'bg-amber-50 border-amber-300 text-amber-700'
                                : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                            }`}
                            title="Bookmark Scheme"
                          >
                            <Bookmark className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => setActiveModalScheme(scheme)}
                            className="py-2.5 px-3.5 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
                          >
                            Details
                          </button>

                          <button
                            onClick={() => handleApplySchemeClick(scheme)}
                            className="flex-1 py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors shadow-2xs flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            <span>Check Readiness & Apply</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

              </div>
            )}

            {/* ------------------------------------------------------ */}
            {/* TAB 3: ENTREPRENEUR PROFILE WIZARD                     */}
            {/* ------------------------------------------------------ */}
            {activeTab === 'profile_wizard' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-6">
                <div className="border-b border-slate-100 pb-4">
                  <h2 className="text-base font-bold text-slate-900">
                    Comprehensive Entrepreneur & Financial Profile
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Fill your enterprise details to unlock customized MSME loans and capital subsidies. Fully accessible even if you do not possess PAN, Udyam, or GST.
                  </p>
                </div>

                <form onSubmit={handleProfileSave} className="space-y-6">
                  
                  {/* Part 1: Personal Demographics */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-emerald-600" />
                        <span>1. Personal, Demographic & Occupation Information</span>
                      </h3>
                      <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                        Editable Citizen Profile
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">Full Legal Name</label>
                        <input
                          type="text"
                          required
                          value={profileFormData.name}
                          onChange={(e) => setProfileFormData({ ...profileFormData, name: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">Date of Birth</label>
                        <input
                          type="date"
                          value={profileFormData.dob}
                          onChange={(e) => setProfileFormData({ ...profileFormData, dob: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">Age (Years)</label>
                        <input
                          type="number"
                          min="1"
                          max="120"
                          placeholder="e.g. 28"
                          value={profileFormData.age}
                          onChange={(e) => setProfileFormData({ ...profileFormData, age: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">Gender</label>
                        <CustomDropdown
                          options={GENDER_OPTIONS}
                          value={profileFormData.gender}
                          onChange={(val) => setProfileFormData({ ...profileFormData, gender: val })}
                          placeholder="Select Gender"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">State / UT of Domicile</label>
                        <CustomDropdown
                          options={INDIAN_STATES.map(s => ({ value: s, label: s }))}
                          value={profileFormData.state}
                          onChange={(val) => setProfileFormData({ ...profileFormData, state: val })}
                          placeholder="Select State / UT"
                          searchable={true}
                          icon={MapPin}
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">District</label>
                        <input
                          type="text"
                          placeholder="e.g. Pune, Jaipur, Varanasi"
                          value={profileFormData.district}
                          onChange={(e) => setProfileFormData({ ...profileFormData, district: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">Social Category (Caste)</label>
                        <CustomDropdown
                          options={CASTE_OPTIONS}
                          value={profileFormData.caste}
                          onChange={(val) => setProfileFormData({ ...profileFormData, caste: val })}
                          placeholder="Select Social Category"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">
                          Primary Occupation <span className="text-emerald-600 font-semibold">*</span>
                        </label>
                        <CustomDropdown
                          options={OCCUPATION_OPTIONS}
                          value={profileFormData.occupation || profileFormData.employmentStatus}
                          onChange={(val) => setProfileFormData({ ...profileFormData, occupation: val, employmentStatus: val })}
                          placeholder="Select Primary Occupation"
                          icon={Briefcase}
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">Annual Family Income (₹)</label>
                        <div className="relative">
                          <IndianRupee className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                          <input
                            type="number"
                            step="10000"
                            placeholder="e.g. 250000"
                            value={profileFormData.income}
                            onChange={(e) => setProfileFormData({ ...profileFormData, income: e.target.value })}
                            className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">Divyang / Disability Status</label>
                        <CustomDropdown
                          options={DISABILITY_OPTIONS}
                          value={profileFormData.disabilityStatus}
                          onChange={(val) => setProfileFormData({ ...profileFormData, disabilityStatus: val })}
                          placeholder="Select Disability Status"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">Minority Community Status</label>
                        <CustomDropdown
                          options={MINORITY_OPTIONS}
                          value={profileFormData.minorityStatus}
                          onChange={(val) => setProfileFormData({ ...profileFormData, minorityStatus: val })}
                          placeholder="Select Minority Status"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">Residential Area</label>
                        <CustomDropdown
                          options={AREA_OPTIONS}
                          value={profileFormData.area}
                          onChange={(val) => setProfileFormData({ ...profileFormData, area: val })}
                          placeholder="Select Area (Rural / Urban)"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Part 2: Business & Enterprise Information */}
                  <div className="space-y-3 pt-4 border-t border-slate-100">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>2. Business Information (No Exclusion Policy)</span>
                      </h3>
                      <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        Usable without PAN, Udyam, or GST
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">Business Name</label>
                        <input
                          type="text"
                          placeholder="Enter business / enterprise name"
                          value={profileFormData.businessName}
                          onChange={(e) => setProfileFormData({ ...profileFormData, businessName: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">Business Type</label>
                        <CustomDropdown
                          options={BUSINESS_TYPE_OPTIONS}
                          value={profileFormData.businessType}
                          onChange={(val) => setProfileFormData({ ...profileFormData, businessType: val })}
                          placeholder="Select Business Type"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">Business Sector</label>
                        <CustomDropdown
                          options={BUSINESS_SECTOR_OPTIONS}
                          value={profileFormData.businessSector}
                          onChange={(val) => setProfileFormData({ ...profileFormData, businessSector: val })}
                          placeholder="Select Business Sector"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">Business Stage</label>
                        <CustomDropdown
                          options={BUSINESS_STAGE_OPTIONS}
                          value={profileFormData.businessStage}
                          onChange={(val) => setProfileFormData({ ...profileFormData, businessStage: val })}
                          placeholder="Select Business Stage"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">Udyam Registration</label>
                        <CustomDropdown
                          options={UDYAM_OPTIONS}
                          value={profileFormData.udyamStatus}
                          onChange={(val) => setProfileFormData({ ...profileFormData, udyamStatus: val })}
                          placeholder="Select Udyam Status"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">GST Registration</label>
                        <CustomDropdown
                          options={GST_OPTIONS}
                          value={profileFormData.gstStatus}
                          onChange={(val) => setProfileFormData({ ...profileFormData, gstStatus: val })}
                          placeholder="Select GST Status"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Part 3: Financial Requirement for Target Scheme */}
                  <div className="space-y-3 pt-4 border-t border-slate-100">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                      <IndianRupee className="w-3.5 h-3.5 text-emerald-600" />
                      <span>3. Financial Requirement & Project Cost Details</span>
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="sm:col-span-3">
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">Purpose of Funding</label>
                        <input
                          type="text"
                          value={profileFormData.purposeOfFunding}
                          onChange={(e) => setProfileFormData({ ...profileFormData, purposeOfFunding: e.target.value })}
                          placeholder="e.g. Machinery Purchase (CNC Plasma Cutter & TIG Welding Set)"
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">Total Project Cost (₹)</label>
                        <input
                          type="number"
                          value={profileFormData.totalProjectCost}
                          onChange={(e) => setProfileFormData({ ...profileFormData, totalProjectCost: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">Loan / Funding Required (₹)</label>
                        <input
                          type="number"
                          value={profileFormData.fundingRequired}
                          onChange={(e) => setProfileFormData({ ...profileFormData, fundingRequired: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">Applicant Margin Contribution (₹)</label>
                        <input
                          type="number"
                          value={profileFormData.applicantContribution}
                          onChange={(e) => setProfileFormData({ ...profileFormData, applicantContribution: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Form Submission Button */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors shadow-sm cursor-pointer flex items-center gap-1.5"
                    >
                      <Check className="w-4 h-4" />
                      <span>Save & Verify Entrepreneur Profile</span>
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* ------------------------------------------------------ */}
            {/* TAB 4: MY APPLICATIONS                                 */}
            {/* ------------------------------------------------------ */}
            {activeTab === 'applications' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                  <div>
                    <h2 className="text-base font-bold text-slate-900">
                      Tracked Scheme Applications
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Real-time status updates with source attribution from official agency endpoints.
                    </p>
                  </div>

                  <button
                    onClick={() => setActiveTab('schemes_matched')}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700 self-start sm:self-center cursor-pointer shadow-2xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Apply for New Scheme</span>
                  </button>
                </div>

                {(!user.applications || user.applications.length === 0) ? (
                  <div className="text-center py-12 space-y-3">
                    <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                      <FileText className="w-6 h-6 text-slate-400" />
                    </div>
                    <h3 className="text-sm font-bold text-slate-800">No Applications Submitted Yet</h3>
                    <p className="text-xs text-slate-500 max-w-sm mx-auto">
                      Explore your matched schemes and complete application readiness to transmit your proposal directly to the implementing ministry.
                    </p>
                    <button
                      onClick={() => setActiveTab('schemes_matched')}
                      className="mt-2 px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs cursor-pointer"
                    >
                      Find Eligible Schemes
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {user.applications.map((app) => (
                      <div
                        key={app.id}
                        className="p-5 sm:p-6 rounded-2xl border border-slate-200/90 bg-white hover:border-emerald-300 hover:shadow-md transition-all space-y-4"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                                App ID: {app.id}
                              </span>
                              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                                Official Ack: {app.officialAck}
                              </span>
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                                {app.status}
                              </span>
                            </div>

                            <h3 className="text-sm sm:text-base font-bold text-slate-900 mt-1">
                              {app.schemeTitle}
                            </h3>
                            <p className="text-xs text-slate-500">
                              {app.department} • Applied {app.appliedDate}
                            </p>
                          </div>

                          <div className="text-left sm:text-right shrink-0">
                            <span className="text-[10px] font-semibold text-slate-500 uppercase block">
                              Sanction Requested
                            </span>
                            <span className="text-xs sm:text-sm font-extrabold text-emerald-700">
                              {app.loanSanctionRequested}
                            </span>
                            <span className="text-[10px] text-slate-400 block mt-0.5">
                              Source: {app.statusSource}
                            </span>
                          </div>
                        </div>

                        {/* 8-Stage Detailed Timeline */}
                        <div className="py-2 border-t border-b border-slate-100 my-2">
                          <h4 className="text-[11px] font-bold text-slate-600 mb-3 uppercase tracking-wider">
                            Official Multi-Stage Verification Timeline
                          </h4>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                            {(app.timeline || []).map((step, idx) => (
                              <div key={idx} className="space-y-1 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                                <div className="flex items-center justify-between">
                                  <span className="text-[10px] font-bold text-slate-400">Step {idx + 1}</span>
                                  {step.done ? (
                                    <span className="inline-flex items-center gap-1 text-[9px] font-bold text-emerald-700 bg-emerald-100/60 px-1.5 py-0.2 rounded">
                                      <Check className="w-2.5 h-2.5" /> Done
                                    </span>
                                  ) : (
                                    <span className="text-[9px] font-semibold text-amber-700 bg-amber-50 px-1.5 py-0.2 rounded">
                                      Pending
                                    </span>
                                  )}
                                </div>
                                <p className="text-xs font-bold text-slate-900 leading-tight">
                                  {step.stage}
                                </p>
                                <span className="text-[10px] text-slate-400 block">
                                  Source: {step.source}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-xs text-slate-500">
                          <span>Status verified with official ministry endpoints</span>
                          <button
                            onClick={() => setPreviewAckModal(app)}
                            className="font-semibold text-emerald-700 hover:underline flex items-center gap-1 cursor-pointer"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>Download Acknowledgment Slip</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* ------------------------------------------------------ */}
            {/* TAB 5: IDENTITY & DIGI-VAULT                           */}
            {/* ------------------------------------------------------ */}
            {activeTab === 'identity_docs' && (
              <div className="space-y-6">
                
                {/* Dynamic Target Scheme Application Gate Banner */}
                {targetPendingScheme && (
                  <div className={`p-5 rounded-3xl border transition-all ${
                    pendingCount > 0 
                      ? 'bg-gradient-to-r from-amber-50 via-rose-50/50 to-amber-50 border-amber-300/90 shadow-sm' 
                      : 'bg-gradient-to-r from-emerald-50 via-teal-50/60 to-emerald-50 border-emerald-300/90 shadow-sm'
                  }`}>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-start gap-3.5">
                        <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 shadow-xs ${
                          pendingCount > 0 ? 'bg-amber-500 text-white' : 'bg-emerald-600 text-white'
                        }`}>
                          {pendingCount > 0 ? <AlertTriangle className="w-5 h-5" /> : <CheckCircle2 className="w-5 h-5" />}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md border ${
                              pendingCount > 0 
                                ? 'bg-amber-100 text-amber-900 border-amber-200' 
                                : 'bg-emerald-100 text-emerald-900 border-emerald-200'
                            }`}>
                              {pendingCount > 0 ? 'Application Verification Gate' : 'Prerequisites Cleared'}
                            </span>
                            <span className="text-xs font-black text-slate-900">
                              Applying for: {targetPendingScheme.title} ({targetPendingScheme.benefit})
                            </span>
                          </div>
                          <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                            {pendingCount > 0
                              ? `You have ${pendingCount} pending task(s) below. Please complete all 5 verification checklist items to unlock direct application transmission.`
                              : `All statutory prerequisites verified! Your profile and credentials meet 100% compliance for ${targetPendingScheme.title}.`}
                          </p>
                        </div>
                      </div>

                      <div className="shrink-0 self-start sm:self-center flex items-center gap-2">
                        {pendingCount === 0 ? (
                          <button
                            type="button"
                            onClick={() => {
                              handleOpenApplicationWizard(targetPendingScheme);
                              setPendingApplySchemeId(null);
                            }}
                            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/20 flex items-center gap-1.5 cursor-pointer animate-pulse"
                          >
                            <span>Proceed to Application</span>
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        ) : (
                          <span className="px-3 py-1.5 rounded-xl bg-white text-amber-800 font-bold text-xs border border-amber-200 shadow-2xs">
                            {pendingCount} Pending to Clear
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* 1. Prerequisites & Verification Checklist Section */}
                <div id="prerequisites-checklist" className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="w-5 h-5 text-emerald-600" />
                        <h2 className="text-base sm:text-lg font-black text-slate-900">
                          1. Prerequisites & Verification Checklist
                        </h2>
                        {pendingCount > 0 ? (
                          <span className="px-2.5 py-0.5 rounded-full bg-red-100 text-red-700 text-xs font-bold border border-red-200">
                            {pendingCount} Needs Attention
                          </span>
                        ) : (
                          <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200">
                            All 5 Verified
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 mt-1">
                        Review and complete all required citizen verifications below. Click any card needing attention to complete its instant verification.
                      </p>
                    </div>
                  </div>

                  {/* 5 Verification Cards Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {pendingTasks.map((task) => {
                      const isPending = task.status === 'pending';
                      const TaskIcon = task.icon || ShieldCheck;
                      return (
                        <div
                          key={task.id}
                          onClick={task.action}
                          className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between shadow-2xs group relative overflow-hidden ${
                            isPending
                              ? 'bg-gradient-to-br from-white via-rose-50/20 to-red-50/40 border-red-200 hover:border-red-400 hover:shadow-md'
                              : 'bg-gradient-to-br from-emerald-50/40 to-teal-50/20 border-emerald-200 hover:border-emerald-400 hover:shadow-md'
                          }`}
                        >
                          <div className="space-y-2.5">
                            <div className="flex items-center justify-between gap-2">
                              <div className="flex items-center gap-2">
                                <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                                  isPending ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'
                                }`}>
                                  <TaskIcon className="w-4 h-4" />
                                </div>
                                <span className="text-xs font-bold text-slate-900 truncate">
                                  {task.title}
                                </span>
                              </div>
                              <span
                                className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider shrink-0 ${
                                  isPending
                                    ? 'bg-red-100 text-red-700 border border-red-200'
                                    : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                                }`}
                              >
                                {isPending ? 'Needs Attention' : 'Verified'}
                              </span>
                            </div>

                            <p className="text-xs text-slate-600 leading-relaxed font-medium">
                              {task.desc}
                            </p>
                          </div>

                          <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between">
                            <span className={`text-[11px] font-bold ${
                              isPending ? 'text-red-600' : 'text-emerald-700'
                            }`}>
                              {task.statusText}
                            </span>
                            <div className={`p-1 rounded-lg ${
                              isPending ? 'bg-red-50 text-red-600 group-hover:bg-red-600 group-hover:text-white' : 'bg-emerald-50 text-emerald-700 group-hover:bg-emerald-600 group-hover:text-white'
                            } transition-colors`}>
                              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Identity Verification Section */}
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-4">
                  <div className="border-b border-slate-100 pb-3">
                    <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                      <Fingerprint className="w-4 h-4 text-emerald-600" />
                      <span>2. Citizen Identity Authentication</span>
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Identity authentication confirms your citizen credentials. Full numbers are never stored in plain text.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    
                    {/* Aadhaar Card */}
                    <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/60 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-800">Aadhaar Authentication</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          user.identity?.aadhaar?.verified
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}>
                          {user.identity?.aadhaar?.verified ? 'Verified (Masked)' : 'Not Linked'}
                        </span>
                      </div>

                      <div className="bg-white p-3 rounded-xl border border-slate-200 font-mono text-xs text-slate-800 flex items-center justify-between">
                        <span>{user.identity?.aadhaar?.maskedNumber || 'XXXX XXXX XXXX'}</span>
                        <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      </div>

                      <p className="text-[10px] text-slate-500">
                        Consent-based. Full Aadhaar is never stored or displayed on SarthX.
                      </p>

                      {!user.identity?.aadhaar?.verified && (
                        <button
                          onClick={() => { setAadhaarModalOpen(true); setAadhaarConsent(false); setAadhaarOtpStep(false); }}
                          className="w-full py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors shadow-2xs cursor-pointer"
                        >
                          Verify Aadhaar (Consent Flow)
                        </button>
                      )}
                    </div>

                    {/* PAN Verification Card */}
                    <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/60 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-800">Income Tax PAN</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          user.identity?.pan?.verified
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-slate-200 text-slate-600'
                        }`}>
                          {user.identity?.pan?.verified ? 'Active & Valid' : 'Optional'}
                        </span>
                      </div>

                      <div className="bg-white p-3 rounded-xl border border-slate-200 font-mono text-xs text-slate-800 flex items-center justify-between">
                        <span>{user.identity?.pan?.panNumber || 'ABCPS1234K (Unverified)'}</span>
                        <span className="text-[10px] text-emerald-700 font-bold font-sans">
                          {user.identity?.pan?.status || 'Active'}
                        </span>
                      </div>

                      <p className="text-[10px] text-slate-500">
                        {user.identity?.pan?.nameMatch || 'Name & DOB consistency checked with authorized records.'}
                      </p>

                      {!user.identity?.pan?.verified && (
                        <button
                          onClick={() => { setPanModalOpen(true); setPanConsent(false); }}
                          className="w-full py-2 rounded-xl text-xs font-bold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 transition-colors shadow-2xs cursor-pointer"
                        >
                          Verify PAN (Optional)
                        </button>
                      )}
                    </div>

                    {/* Mobile Verification Card */}
                    <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/60 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-800">Registered Mobile</span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                          OTP Verified
                        </span>
                      </div>

                      <div className="bg-white p-3 rounded-xl border border-slate-200 font-mono text-xs text-slate-800 flex items-center justify-between">
                        <span>+91 {user.phone}</span>
                        <Check className="w-4 h-4 text-emerald-600" />
                      </div>

                      <p className="text-[10px] text-slate-500">
                        Primary citizen communication identifier verified via OTP gateway.
                      </p>
                    </div>

                  </div>
                </div>

                {/* 3. Socioeconomic & Business Documents */}
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                    <div>
                      <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                        <FolderLock className="w-4 h-4 text-purple-600" />
                        <span>3. Digi-Vault Documents</span>
                      </h2>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Clear document statuses: Not Provided • Uploaded • Extracted • User Confirmed.
                      </p>
                    </div>

                    <Link
                      to="/ocr-scanner"
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-purple-50 hover:bg-purple-100 text-purple-800 border border-purple-200 transition-all self-start sm:self-center"
                    >
                      <Cpu className="w-3.5 h-3.5 text-purple-600" />
                      <span>Scan New Document via OCR</span>
                    </Link>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {(user.documents || []).map((doc) => (
                      <div
                        key={doc.id}
                        className="p-4 rounded-2xl border border-slate-200 bg-white hover:border-emerald-300 hover:shadow-sm transition-all space-y-3 flex flex-col justify-between"
                      >
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700 uppercase">
                              {doc.type}
                            </span>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                              {doc.status}
                            </span>
                          </div>

                          <h3 className="text-xs font-bold text-slate-900">
                            {doc.name}
                          </h3>
                          <p className="text-[11px] font-mono text-slate-600">
                            Ref: {doc.number}
                          </p>
                          <p className="text-[10px] text-slate-400">
                            Source: {doc.source}
                          </p>
                        </div>

                        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                          <button
                            onClick={() => {
                              setReviewDocModal(doc);
                              setDocEditFields(doc.extractedFields || {});
                            }}
                            className="text-emerald-700 font-semibold hover:underline cursor-pointer"
                          >
                            Review Extracted Data
                          </button>
                          <span className="text-[10px] text-slate-400">100% Client-Side</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3. Name & Identity Cross-Matching Consistency Check */}
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                    <FileCheck className="w-4 h-4 text-emerald-600" />
                    <span>3. Identity & Demographic Cross-Matching Consistency</span>
                  </h3>
                  <p className="text-xs text-slate-600">
                    SarthX performs multi-document demographic verification to flag administrative discrepancies without rigid character exclusions:
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                      <span className="text-[10px] font-bold text-slate-400 uppercase">Registered Account Name</span>
                      <span className="block font-bold text-slate-800 mt-1">{user.name}</span>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                      <span className="text-[10px] font-bold text-slate-400 uppercase">PAN Authorized Name</span>
                      <span className="block font-bold text-slate-800 mt-1">
                        {user.identity?.pan?.panNumber ? `${user.name} Sharma` : 'Pending Verification'}
                      </span>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                      <span className="text-[10px] font-bold text-slate-400 uppercase">Income Certificate Name</span>
                      <span className="block font-bold text-slate-800 mt-1">Rakesh Kumar Sharma</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-2xl bg-emerald-100/60 border border-emerald-200 text-xs text-emerald-900 flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span>
                      <strong>Demographic Verdict: Exact Semantic Match</strong> across all uploaded credentials. No administrative spelling discrepancies detected.
                    </span>
                  </div>
                </div>

              </div>
            )}

            {/* ------------------------------------------------------ */}
            {/* TAB 6: SAVED SCHEMES                                   */}
            {/* ------------------------------------------------------ */}
            {activeTab === 'saved_schemes' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-6">
                <div className="border-b border-slate-100 pb-4 flex items-center justify-between">
                  <div>
                    <h2 className="text-base font-bold text-slate-900">
                      Saved Schemes ({savedList.length})
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Your bookmarked schemes shortlist for easy comparison and direct application.
                    </p>
                  </div>

                  <button
                    onClick={() => setActiveTab('schemes_matched')}
                    className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>Browse More Schemes</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {savedList.length === 0 ? (
                  <div className="text-center py-12 space-y-3">
                    <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto text-2xl">
                      ⭐
                    </div>
                    <h3 className="text-sm font-bold text-slate-800">No Saved Schemes Yet</h3>
                    <p className="text-xs text-slate-500 max-w-sm mx-auto">
                      Click the bookmark icon on any scheme in the Matched Schemes view to save it to your dashboard shortlist.
                    </p>
                    <button
                      onClick={() => setActiveTab('schemes_matched')}
                      className="mt-2 px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs cursor-pointer"
                    >
                      Find Eligible Schemes
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {savedList.map((scheme) => (
                      <div
                        key={scheme.id}
                        className="p-5 rounded-2xl border border-slate-200 bg-white hover:border-emerald-300 hover:shadow-sm transition-all flex flex-col justify-between gap-4"
                      >
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 uppercase">
                              {scheme.category}
                            </span>
                            <span className="text-[10px] font-bold text-emerald-700">
                              Bookmarked
                            </span>
                          </div>

                          <h3 className="text-sm font-bold text-slate-900 leading-snug">
                            {scheme.title}
                          </h3>
                          <p className="text-xs text-slate-600 line-clamp-2">
                            {scheme.benefit}
                          </p>
                        </div>

                        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                          <button
                            onClick={() => toggleSaveScheme(scheme.id)}
                            className="p-2 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 text-xs transition-colors cursor-pointer"
                            title="Remove Bookmark"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => setActiveModalScheme(scheme)}
                            className="py-2 px-3 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 cursor-pointer"
                          >
                            Details
                          </button>

                          <button
                            onClick={() => handleApplySchemeClick(scheme)}
                            className="flex-1 py-2 px-3 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-2xs flex items-center justify-center gap-1 cursor-pointer"
                          >
                            <span>Check Readiness & Apply</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

          </main>

        </div>
      </div>

      {/* ======================================================== */}
      {/* MODALS & APPLICATION WIZARDS                             */}
      {/* ======================================================== */}

      {/* POPUP MODAL: CITIZEN PROFILE COMPLETION (AUTO-OPENS ON FIRST LOGIN) */}
      {profileModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full border border-slate-200 shadow-2xl space-y-5 my-8 max-h-[90vh] overflow-y-auto">
            
            {/* Header */}
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    Complete Your Citizen Profile
                  </h3>
                  <p className="text-xs text-slate-500">
                    Provide basic demographic information once to instantly match eligible government schemes.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setProfileModalOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                title="Dismiss (complete later)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Profile Form */}
            <form onSubmit={handleSaveProfileCompletion} className="space-y-4">
              
              {/* Full Legal Name */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Full Legal Name (as per Govt ID) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={profileForm.name}
                    onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                    placeholder="e.g. Ramesh Kumar Sharma"
                    className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:bg-white focus:border-emerald-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Age & Gender Row */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Age (Years) <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="number"
                      min="18"
                      max="100"
                      required
                      placeholder="e.g. 28"
                      value={profileForm.age}
                      onChange={(e) => setProfileForm({ ...profileForm, age: e.target.value })}
                      className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:bg-white focus:border-emerald-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Gender <span className="text-red-500">*</span>
                  </label>
                  <CustomDropdown
                    options={GENDER_OPTIONS}
                    value={profileForm.gender}
                    onChange={(val) => setProfileForm({ ...profileForm, gender: val })}
                    placeholder="Select Gender"
                  />
                </div>
              </div>

              {/* State & Social Category (Caste) Row */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    State / UT of Domicile <span className="text-red-500">*</span>
                  </label>
                  <CustomDropdown
                    options={INDIAN_STATES.map((s) => ({ value: s, label: s }))}
                    value={profileForm.state}
                    onChange={(val) => setProfileForm({ ...profileForm, state: val })}
                    placeholder="Select State / UT"
                    searchable={true}
                    icon={MapPin}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Social Category <span className="text-red-500">*</span>
                  </label>
                  <CustomDropdown
                    options={CASTE_OPTIONS}
                    value={profileForm.caste}
                    onChange={(val) => setProfileForm({ ...profileForm, caste: val })}
                    placeholder="Select Social Category"
                  />
                </div>
              </div>

              {/* Annual Family Income & Primary Occupation Row */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Annual Family Income (₹) <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <IndianRupee className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="number"
                      step="10000"
                      min="0"
                      required
                      placeholder="e.g. 250000"
                      value={profileForm.income}
                      onChange={(e) => setProfileForm({ ...profileForm, income: e.target.value })}
                      className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:bg-white focus:border-emerald-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Primary Occupation <span className="text-red-500">*</span>
                  </label>
                  <CustomDropdown
                    options={OCCUPATION_OPTIONS}
                    value={profileForm.employmentStatus}
                    onChange={(val) => setProfileForm({ ...profileForm, employmentStatus: val })}
                    placeholder="Select Primary Occupation"
                    icon={Briefcase}
                  />
                </div>
              </div>

              {/* Disability & Minority Row */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Divyang / PwD Status
                  </label>
                  <CustomDropdown
                    options={DISABILITY_OPTIONS}
                    value={profileForm.disabilityStatus}
                    onChange={(val) => setProfileForm({ ...profileForm, disabilityStatus: val })}
                    placeholder="Select Disability / PwD Status"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Minority Community Status
                  </label>
                  <CustomDropdown
                    options={MINORITY_OPTIONS}
                    value={profileForm.minorityStatus}
                    onChange={(val) => setProfileForm({ ...profileForm, minorityStatus: val })}
                    placeholder="Select Minority Status"
                  />
                </div>
              </div>

              {/* Security / Privacy notice */}
              <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-2xl flex items-center gap-2.5 text-xs text-emerald-800">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Your profile data stays encrypted and is matched against 180+ Central & State scheme guidelines without third-party tracking.</span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between gap-3 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setProfileModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  Skip for Now
                </button>

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-all shadow-md shadow-emerald-600/20 flex items-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Save & Recommend Schemes</span>
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* MODAL 1: SIMULATED AADHAAR VERIFICATION */}
      {aadhaarModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3.5 sm:p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-3xl p-5 sm:p-8 max-w-md w-full border border-slate-200 shadow-2xl space-y-4 my-auto max-h-[90vh] overflow-y-auto">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Verify Your Identity (Aadhaar)</h3>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 leading-relaxed">
              Aadhaar verification confirms your identity for this application. It does not automatically determine loan approval.
            </div>

            {!aadhaarOtpStep ? (
              <div className="space-y-4 pt-1">
                <div className="space-y-2">
                  <label className="flex items-start gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={aadhaarConsent}
                      onChange={(e) => setAadhaarConsent(e.target.checked)}
                      className="mt-0.5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                    />
                    <span className="text-xs text-slate-700">
                      I understand the purpose of this verification and give voluntary consent for Aadhaar e-KYC authentication.
                    </span>
                  </label>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-600 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>UIDAI Gateway: Citizen authentication is processed under Aadhaar e-KYC Regulations 2016. Only masked UID is stored.</span>
                </div>

                <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-2 pt-2">
                  <button
                    onClick={() => setAadhaarModalOpen(false)}
                    className="w-full sm:w-auto px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    disabled={!aadhaarConsent}
                    onClick={() => {
                      setAadhaarOtpStep(true);
                      setAadhaarOtp('');
                    }}
                    className="w-full sm:w-auto justify-center px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors cursor-pointer"
                  >
                    Send Aadhaar OTP
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4 pt-1">
                <p className="text-xs text-slate-600">
                  Enter the 6-digit OTP sent to your Aadhaar-linked mobile:
                </p>
                <input
                  type="text"
                  maxLength={6}
                  placeholder="Enter 6-digit OTP"
                  value={aadhaarOtp}
                  onChange={(e) => setAadhaarOtp(e.target.value)}
                  className="w-full text-center text-lg font-mono font-bold tracking-widest py-2 bg-slate-50 border border-slate-200 rounded-xl focus:border-emerald-500 focus:bg-white transition-colors"
                />
                <p className="text-[11px] text-slate-500">
                  Enter the 6-digit OTP received via SMS (or enter 123456 for instant gateway verification).
                </p>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    onClick={() => {
                      verifyAadhaarSimulated(true);
                      setAadhaarModalOpen(false);
                      showToast('Aadhaar identity verified! Masked number saved.');
                    }}
                    className="w-full py-2.5 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors cursor-pointer"
                  >
                    Verify and Mask Number
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* MODAL 2: SIMULATED PAN VERIFICATION */}
      {panModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3.5 sm:p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-3xl p-5 sm:p-8 max-w-md w-full border border-slate-200 shadow-2xl space-y-4 my-auto max-h-[90vh] overflow-y-auto">
            <h3 className="text-base font-bold text-slate-900">Verify Income Tax PAN (Optional)</h3>
            <p className="text-xs text-slate-500">
              PAN verification is optional. You can still explore and apply for micro schemes without a registered PAN.
            </p>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">10-Digit PAN Number</label>
                <input
                  type="text"
                  maxLength={10}
                  value={panInput}
                  onChange={(e) => setPanInput(e.target.value.toUpperCase())}
                  placeholder="ABCPS1234K"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono text-xs font-bold text-slate-900"
                />
              </div>

              <label className="flex items-start gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={panConsent}
                  onChange={(e) => setPanConsent(e.target.checked)}
                  className="mt-0.5 rounded border-slate-300 text-emerald-600 w-4 h-4"
                />
                <span className="text-[11px] text-slate-700">
                  I give consent to verify PAN status against authorized Income Tax database records.
                </span>
              </label>

              <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-2 pt-2">
                <button
                  onClick={() => setPanModalOpen(false)}
                  className="w-full sm:w-auto px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  disabled={!panConsent || panInput.length !== 10}
                  onClick={() => {
                    verifyPanSimulated(panInput, user.name, user.dob, true);
                    setPanModalOpen(false);
                    showToast('PAN status verified as Active!');
                  }}
                  className="w-full sm:w-auto justify-center px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 cursor-pointer"
                >
                  Confirm PAN Verification
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2B: OFFICIAL DIGILOCKER INCOME CERTIFICATE VERIFICATION GATEWAY */}
      {digilockerIncomeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3.5 sm:p-4 bg-slate-950/75 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full border border-sky-200 shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col">
            
            {/* DigiLocker Official Header */}
            <div className="bg-gradient-to-r from-sky-950 via-sky-900 to-blue-900 text-white p-4 sm:p-6 relative shrink-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-sky-300 border border-white/20 shadow-xs shrink-0">
                    <FolderLock className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[9.5px] sm:text-[10px] font-extrabold uppercase tracking-widest text-sky-300 bg-sky-800/60 px-2 py-0.5 rounded border border-sky-600/40">
                        MeriPehchaan SSO • MeitY
                      </span>
                      <span className="text-[9.5px] sm:text-[10px] font-bold text-sky-200/80">
                        Govt of India
                      </span>
                    </div>
                    <h3 className="text-sm sm:text-lg font-black tracking-tight text-white mt-0.5">
                      DigiLocker Income Verification Gateway
                    </h3>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setDigilockerIncomeModalOpen(false)}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs text-sky-100/80 mt-2 leading-relaxed">
                Connect directly with the Revenue Department / State e-District repository to fetch and authenticate your digitally signed Income Certificate (Aay Praman Patra).
              </p>
            </div>

            {/* Modal Body */}
            <div className="p-4 sm:p-6 space-y-5 overflow-y-auto flex-1">
              
              {/* STAGE 1: CREDENTIALS / CERTIFICATE LOOKUP */}
              {digilockerStep === 1 && (
                <div className="space-y-4">
                  {/* Mode Selector */}
                  <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-2xl">
                    <button
                      type="button"
                      onClick={() => setDigilockerMode('pin')}
                      className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        digilockerMode === 'pin'
                          ? 'bg-white text-sky-900 shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      DigiLocker PIN / OTP
                    </button>
                    <button
                      type="button"
                      onClick={() => setDigilockerMode('edistrict')}
                      className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        digilockerMode === 'edistrict'
                          ? 'bg-white text-sky-900 shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      State e-District Certificate ID
                    </button>
                  </div>

                  {digilockerMode === 'pin' ? (
                    <div className="space-y-3.5 pt-1">
                      <div className="p-3 bg-sky-50 border border-sky-200 rounded-2xl text-xs text-sky-900 flex items-start gap-2.5">
                        <ShieldCheck className="w-4 h-4 text-sky-700 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold block">Instant Digital Fetch</span>
                          <span className="text-[11px] text-sky-800/90 leading-relaxed">
                            Pulls your official Income Certificate linked with Mobile: <strong>+91 {user?.phone || '98765 00000'}</strong> from the Land Revenue National Database.
                          </span>
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <label className="block text-xs font-bold text-slate-700">
                            DigiLocker 6-Digit Security PIN
                          </label>
                          <button
                            type="button"
                            onClick={() => setDigilockerPin('123456')}
                            className="text-[11px] font-bold text-sky-700 hover:underline cursor-pointer"
                          >
                            Use Demo PIN (123456)
                          </button>
                        </div>
                        <input
                          type="password"
                          maxLength={6}
                          value={digilockerPin}
                          onChange={(e) => setDigilockerPin(e.target.value.replace(/\D/g, ''))}
                          placeholder="••••••"
                          className="w-full py-3 px-4 text-center tracking-widest font-mono text-xl font-black bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3 pt-1">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Annual Family Income (₹)
                          </label>
                          <div className="relative">
                            <IndianRupee className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                            <input
                              type="number"
                              value={edistrictDeclaredIncome}
                              onChange={(e) => setEdistrictDeclaredIncome(e.target.value)}
                              placeholder="e.g. 250000"
                              className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Issuing State
                          </label>
                          <input
                            type="text"
                            readOnly
                            value={user?.state || 'Not Declared'}
                            className="w-full px-3 py-2 bg-slate-100 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 cursor-not-allowed"
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3.5 pt-1">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Issuing State / UT
                          </label>
                          <select
                            value={edistrictState}
                            onChange={(e) => setEdistrictState(e.target.value)}
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                          >
                            {INDIAN_STATES.map(s => (
                              <option key={s} value={s}>{s}</option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Certificate Reference No
                          </label>
                          <input
                            type="text"
                            value={edistrictCertNo}
                            onChange={(e) => setEdistrictCertNo(e.target.value)}
                            placeholder="e.g. ED/INC/2025/782910"
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Declared Annual Family Income (₹)
                        </label>
                        <div className="relative">
                          <IndianRupee className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                          <input
                            type="number"
                            value={edistrictDeclaredIncome}
                            onChange={(e) => setEdistrictDeclaredIncome(e.target.value)}
                            placeholder="e.g. 240000"
                            className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-[11px] text-slate-600 space-y-1">
                    <div className="flex items-center gap-1.5 font-bold text-slate-800">
                      <Lock className="w-3.5 h-3.5 text-emerald-600" />
                      <span>IT Act 2000 & DigiLocker Security Protocol</span>
                    </div>
                    <p className="leading-relaxed">
                      By proceeding, you authorize SarthX to query DigiLocker & State Revenue portals on your behalf. Authenticated digital records carry equal legal status to physical documents.
                    </p>
                  </div>

                  <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-2.5 pt-2">
                    <button
                      type="button"
                      onClick={() => setDigilockerIncomeModalOpen(false)}
                      className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer text-center"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleStartDigilockerVerification}
                      className="w-full sm:w-auto justify-center px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-sky-900 hover:bg-sky-950 transition-all shadow-md shadow-sky-900/20 flex items-center gap-2 cursor-pointer"
                    >
                      <FolderLock className="w-4 h-4 text-sky-300" />
                      <span>Fetch Digitally Signed Certificate</span>
                    </button>
                  </div>
                </div>
              )}

              {/* STAGE 2: REAL-TIME VERIFICATION ANIMATION */}
              {digilockerStep === 2 && (
                <div className="py-8 text-center space-y-4">
                  <div className="relative mx-auto w-16 h-16 flex items-center justify-center">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75" />
                    <div className="relative w-14 h-14 rounded-2xl bg-sky-900 text-white flex items-center justify-center shadow-lg">
                      <RefreshCw className="w-6 h-6 animate-spin text-sky-300" />
                    </div>
                  </div>

                  <div>
                    <h4 className="text-base font-bold text-slate-900">
                      DigiLocker National Gateway Handshake
                    </h4>
                    <p className="text-xs font-mono font-semibold text-sky-800 mt-1 min-h-6">
                      {digilockerVerifyStage}
                    </p>
                  </div>

                  <div className="max-w-xs mx-auto w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-sky-600 h-full rounded-full animate-pulse w-3/4" />
                  </div>

                  <p className="text-[11px] text-slate-400">
                    Encrypted via 256-bit SSL • Official Government Certificate Vault
                  </p>
                </div>
              )}

              {/* STAGE 3: OFFICIAL DIGITALLY SIGNED CERTIFICATE PREVIEW */}
              {digilockerStep === 3 && verifiedCertResult && (
                <div className="space-y-4">
                  <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-2xl text-xs text-emerald-900 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="font-bold">DigiLocker Verified: Valid Digital Signature Found (SHA-256 PKI)</span>
                  </div>

                  {/* Authenticated Certificate Card */}
                  <div className="p-5 rounded-2xl border-2 border-emerald-300 bg-gradient-to-br from-emerald-50/50 via-white to-sky-50/40 relative overflow-hidden shadow-sm space-y-4">
                    <div className="flex items-start justify-between border-b border-slate-200 pb-3">
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                          Govt of {verifiedCertResult.state} • Land Revenue Department
                        </span>
                        <h4 className="text-sm font-black text-slate-900">
                          INCOME CERTIFICATE / आय प्रमाण पत्र
                        </h4>
                      </div>
                      <span className="px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800 text-[10px] font-extrabold border border-emerald-300 uppercase tracking-wider flex items-center gap-1">
                        <Check className="w-3 h-3 text-emerald-700" />
                        <span>DigiLocker Verified</span>
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 block uppercase">Certificate No</span>
                        <span className="font-mono font-bold text-slate-800 text-xs">
                          {verifiedCertResult.certificateNo}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 block uppercase">Beneficiary Name</span>
                        <span className="font-bold text-slate-800 text-xs">
                          {verifiedCertResult.applicantName}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 block uppercase">Verified Annual Income</span>
                        <span className="font-mono font-extrabold text-emerald-700 text-sm">
                          ₹{verifiedCertResult.annualIncome.toLocaleString('en-IN')}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 block uppercase">Validity Period</span>
                        <span className="font-bold text-slate-800 text-xs">
                          {verifiedCertResult.validTill}
                        </span>
                      </div>
                      <div className="col-span-2">
                        <span className="text-[10px] font-bold text-slate-400 block uppercase">Issuing Authority</span>
                        <span className="font-semibold text-slate-700 text-[11px] block">
                          {verifiedCertResult.issuingAuthority}
                        </span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
                      <div className="flex items-center gap-1.5 font-mono text-emerald-800 font-bold">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span>PKI Digital Signature Validated</span>
                      </div>
                      <span>Issued: {verifiedCertResult.issueDate}</span>
                    </div>
                  </div>

                  <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setDigilockerStep(1)}
                      className="w-full sm:w-auto px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer text-center"
                    >
                      Change Details
                    </button>
                    <button
                      type="button"
                      onClick={handleConfirmDigilockerCertificate}
                      className="w-full sm:w-auto justify-center px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-all shadow-md shadow-emerald-600/20 flex items-center gap-2 cursor-pointer"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Confirm & Save to Document Locker</span>
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: DOCUMENT EXTRACTION & REVIEW */}
      {reviewDocModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3.5 sm:p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-3xl p-5 sm:p-8 max-w-lg w-full border border-slate-200 shadow-2xl space-y-4 my-auto max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900">
                Extracted Information Review ({reviewDocModal.name})
              </h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                OCR Extracted
              </span>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed">
              Review and confirm the values extracted by the OCR engine. Each value will be clearly source-attributed.
            </p>

            <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs">
              {Object.entries(docEditFields).map(([key, val]) => (
                <div key={key} className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-3">
                  <span className="font-bold text-slate-600 capitalize">
                    {key.replace(/([A-Z])/g, ' $1')}:
                  </span>
                  <input
                    type="text"
                    value={val}
                    onChange={(e) => setDocEditFields({ ...docEditFields, [key]: e.target.value })}
                    className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-900 text-left sm:text-right"
                  />
                </div>
              ))}
            </div>

            <div className="text-[11px] text-slate-500">
              Source: <strong>{reviewDocModal.source}</strong> • Status: <strong>User Confirmed</strong>
            </div>

            <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setReviewDocModal(null)}
                className="w-full sm:w-auto px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer text-center"
              >
                Close
              </button>
              <button
                onClick={() => {
                  confirmExtractedDocument(reviewDocModal.id, docEditFields);
                  setReviewDocModal(null);
                  showToast('Document data reviewed and confirmed!');
                }}
                className="w-full sm:w-auto justify-center px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 cursor-pointer"
              >
                Confirm Information
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 4: APPLICATION READINESS & USER-CONTROLLED OTP SUBMISSION WIZARD */}
      {applicationWizardScheme && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3.5 sm:p-4 bg-slate-900/70 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-3xl p-5 sm:p-8 max-w-xl w-full border border-slate-200 shadow-2xl space-y-5 my-auto max-h-[90vh] overflow-y-auto">
            
            {/* STEP A: MANDATORY ID & DOCUMENT VERIFICATION GATE */}
            {appStep === 'readiness' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                      <ShieldCheck className="w-5 h-5 text-emerald-600" />
                      <span>Step 1 of 3: Identity & Document Verification Gate</span>
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Government guidelines require verified citizen credentials before transmitting scheme proposals.
                    </p>
                  </div>
                  <span className="text-xs font-extrabold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-200">
                    {user.identity?.aadhaar?.verified ? 'Gate Passed: Ready' : 'Verification Required'}
                  </span>
                </div>

                <div className="space-y-3">
                  {/* ID 1: UIDAI AADHAAR E-KYC (MANDATORY) */}
                  <div className={`p-4 rounded-2xl border transition-all ${
                    user.identity?.aadhaar?.verified 
                      ? 'bg-emerald-50/70 border-emerald-300' 
                      : 'bg-amber-50/70 border-amber-300'
                  }`}>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs ${
                          user.identity?.aadhaar?.verified ? 'bg-emerald-600 text-white' : 'bg-amber-500 text-white'
                        }`}>
                          <ShieldCheck className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-slate-900">Aadhaar e-KYC Verification</span>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md uppercase bg-white border border-slate-200 text-slate-700">
                              Mandatory
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-600">
                            {user.identity?.aadhaar?.verified 
                              ? `Verified via UIDAI: ${user.identity.aadhaar.maskedNumber}`
                              : 'Verify your 12-digit Aadhaar to authenticate citizen identity for direct benefit transfer.'
                            }
                          </p>
                        </div>
                      </div>

                      {user.identity?.aadhaar?.verified ? (
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-white px-2.5 py-1 rounded-lg border border-emerald-200 shadow-2xs">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Verified</span>
                        </span>
                      ) : (
                        <span className="text-[11px] font-bold text-amber-700 bg-amber-100 px-2.5 py-1 rounded-lg">
                          Pending
                        </span>
                      )}
                    </div>

                    {/* Inline Aadhaar Verification if Not Verified */}
                    {!user.identity?.aadhaar?.verified && (
                      <div className="mt-3 pt-3 border-t border-amber-200/80 space-y-2.5">
                        {!gateAadhaarOtpSent ? (
                          <div className="flex items-center gap-2">
                            <input
                              type="text"
                              maxLength={12}
                              value={gateAadhaarInput}
                              onChange={(e) => setGateAadhaarInput(e.target.value.replace(/\D/g, ''))}
                              placeholder="Enter 12-digit Aadhaar Number"
                              className="flex-1 px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs font-mono font-bold text-slate-900 tracking-wider focus:outline-none focus:border-emerald-500"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                if (gateAadhaarInput.length !== 12) {
                                  showToast('Please enter a valid 12-digit Aadhaar number');
                                  return;
                                }
                                setGateAadhaarOtpSent(true);
                                setGateAadhaarOtp('123456');
                                showToast('Aadhaar OTP sent to linked mobile!');
                              }}
                              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs cursor-pointer"
                            >
                              Send OTP
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <input
                              type="text"
                              maxLength={6}
                              value={gateAadhaarOtp}
                              onChange={(e) => setGateAadhaarOtp(e.target.value)}
                              placeholder="Enter 6-digit OTP (123456)"
                              className="flex-1 px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs font-mono font-bold text-slate-900 tracking-widest text-center focus:outline-none focus:border-emerald-500"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                verifyIdentityGate({ type: 'aadhaar', data: { aadhaarNumber: gateAadhaarInput } });
                                setGateAadhaarOtpSent(false);
                                showToast('Aadhaar e-KYC Verified successfully!');
                              }}
                              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs cursor-pointer"
                            >
                              Verify & Mask UID
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* ID 2: INCOME TAX DEPARTMENT PAN (BUSINESS & LOANS) */}
                  <div className={`p-4 rounded-2xl border transition-all ${
                    user.identity?.pan?.verified 
                      ? 'bg-slate-50 border-emerald-300' 
                      : 'bg-slate-50 border-slate-200'
                  }`}>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">
                          <FileText className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-slate-900">Income Tax Department PAN</span>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md uppercase bg-slate-100 text-slate-600">
                              For Subsidies & Loans
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-600">
                            {user.identity?.pan?.verified 
                              ? `Active PAN: ${user.identity.pan.panNumber} (Income Tax Department e-Filing)`
                              : 'Optional for micro schemes, recommended for MSME & capital subsidy approvals.'
                            }
                          </p>
                        </div>
                      </div>

                      {user.identity?.pan?.verified ? (
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-white px-2.5 py-1 rounded-lg border border-emerald-200 shadow-2xs">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Active</span>
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => {
                            verifyIdentityGate({ type: 'pan', data: { panNumber: gatePanInput } });
                            showToast('PAN card verified with ITD portal!');
                          }}
                          className="text-xs font-bold text-emerald-700 hover:text-emerald-800 bg-white border border-slate-200 px-3 py-1 rounded-lg hover:bg-emerald-50 cursor-pointer"
                        >
                          Verify PAN
                        </button>
                      )}
                    </div>
                  </div>

                  {/* ID 3: SOCIOECONOMIC & DOMICILE CREDENTIALS */}
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-xs">
                        <Tag className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-bold text-slate-900">Socioeconomic & Domicile Attestation</p>
                        <p className="text-[11px] text-slate-500">
                          State: <strong>{user.state || 'Rajasthan'}</strong> • Category: <strong>{user.caste || 'General'}</strong> • Income: <strong>₹{user.income ? Number(user.income).toLocaleString('en-IN') : '2,50,000'}</strong>
                        </p>
                      </div>
                    </div>
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-white px-2.5 py-1 rounded-lg border border-emerald-200">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Attested</span>
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-2 pt-3 border-t border-slate-100">
                  <button
                    onClick={() => setApplicationWizardScheme(null)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer"
                  >
                    Cancel
                  </button>

                  <button
                    disabled={!user.identity?.aadhaar?.verified}
                    onClick={() => setAppStep('preview')}
                    className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 disabled:cursor-not-allowed flex items-center gap-1.5 cursor-pointer shadow-md shadow-emerald-600/20"
                  >
                    <span>{user.identity?.aadhaar?.verified ? 'Proceed to Application Preview' : 'Verify Aadhaar to Unlock'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP B: APPLICATION PREVIEW & DECLARATION */}
            {appStep === 'preview' && (
              <div className="space-y-4">
                <div className="border-b border-slate-100 pb-3">
                  <h3 className="text-base font-bold text-slate-900">
                    Final Application Review
                  </h3>
                  <p className="text-xs text-slate-500">
                    Review all data being transmitted to the official implementing agency.
                  </p>
                </div>

                <div className="max-h-60 overflow-y-auto space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Applicant Details</span>
                    <p className="font-bold text-slate-800">{user.name} • Age {user.age} • {user.caste} • {user.state}</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Enterprise & Project</span>
                    <p className="font-bold text-slate-800">{user.business?.name || 'Metal Fabrication'} ({user.business?.type})</p>
                    <p className="text-slate-600 text-[11px]">{user.business?.purposeOfFunding}</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Financial Requirement</span>
                    <p className="font-bold text-emerald-700">Project Cost: ₹6,00,000 • Funding Requested: ₹4,50,000</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Information Recipient</span>
                    <p className="text-slate-700">Ministry of MSME / Implementing Agency Nodal Portal (.gov.in)</p>
                  </div>
                </div>

                <div className="space-y-2 pt-1 text-xs">
                  <label className="flex items-start gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={appDeclarations.review}
                      onChange={(e) => setAppDeclarations({ ...appDeclarations, review: e.target.checked })}
                      className="mt-0.5 rounded border-slate-300 text-emerald-600"
                    />
                    <span>I have reviewed the displayed application information.</span>
                  </label>
                  <label className="flex items-start gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={appDeclarations.accurate}
                      onChange={(e) => setAppDeclarations({ ...appDeclarations, accurate: e.target.checked })}
                      className="mt-0.5 rounded border-slate-300 text-emerald-600"
                    />
                    <span>I confirm that it is correct to the best of my knowledge.</span>
                  </label>
                  <label className="flex items-start gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={appDeclarations.consentShare}
                      onChange={(e) => setAppDeclarations({ ...appDeclarations, consentShare: e.target.checked })}
                      className="mt-0.5 rounded border-slate-300 text-emerald-600"
                    />
                    <span>I authorize SarthX to securely share this information with the implementing agency. I understand that the agency makes the final decision.</span>
                  </label>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                  <button
                    onClick={() => setAppStep('readiness')}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    disabled={!appDeclarations.review || !appDeclarations.accurate || !appDeclarations.consentShare}
                    onClick={() => setAppStep('otp')}
                    className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Authorize with OTP</span>
                    <KeyRound className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP C: USER-CONTROLLED OTP SUBMISSION */}
            {appStep === 'otp' && (
              <div className="space-y-4">
                <div className="border-b border-slate-100 pb-3">
                  <h3 className="text-base font-bold text-slate-900">
                    User-Controlled OTP Authorization
                  </h3>
                  <p className="text-xs text-slate-500">
                    The official server triggered a one-time verification code to +91 {user.phone}. SarthX never bypasses or auto-fills real citizen OTPs.
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-700">Enter OTP Code</label>
                  <input
                    type="text"
                    maxLength={6}
                    placeholder="Enter 6-digit OTP"
                    value={appOtp}
                    onChange={(e) => setAppOtp(e.target.value)}
                    className="w-full text-center text-lg font-mono font-bold tracking-widest py-2 bg-slate-50 border border-slate-200 rounded-xl focus:border-emerald-500 focus:bg-white transition-colors"
                  />
                  <p className="text-[11px] text-slate-500 text-center">
                    Enter the 6-digit verification code sent to your registered mobile (or enter 123456).
                  </p>
                </div>

                <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                  <button
                    onClick={() => setAppStep('preview')}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => {
                      const res = submitApplication(applicationWizardScheme, {
                        loanAmount: '₹4,50,000 (Machinery Term Loan)',
                        subsidy: '35% Margin Money Subsidy'
                      });
                      setRecentSubmittedApp(res);
                      setAppStep('success');
                    }}
                    className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 cursor-pointer"
                  >
                    Authorize and Submit Application
                  </button>
                </div>
              </div>
            )}

            {/* STEP D: APPLICATION ACCEPTED & ACKNOWLEDGEMENT */}
            {appStep === 'success' && recentSubmittedApp && (
              <div className="space-y-4 text-center py-3">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                  Application Successfully Transmitted!
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Your application has been received by the implementing agency. You can monitor progress in real time.
                </p>

                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 font-mono text-xs text-slate-800 space-y-1">
                  <div>Application ID: <strong>{recentSubmittedApp.id}</strong></div>
                  <div>Official Acknowledgement: <strong className="text-emerald-700">{recentSubmittedApp.officialAck}</strong></div>
                  <div>Current Status: <strong>{recentSubmittedApp.status}</strong></div>
                  <div>Source: <strong>{recentSubmittedApp.statusSource}</strong></div>
                </div>

                <div className="pt-3">
                  <button
                    onClick={() => {
                      setApplicationWizardScheme(null);
                      setActiveTab('applications');
                    }}
                    className="w-full py-2.5 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 cursor-pointer"
                  >
                    Go to My Applications Tracker
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

      {/* MODAL 5: OFFICIAL ACKNOWLEDGMENT SLIP MODAL */}
      {previewAckModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3.5 sm:p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-3xl p-5 sm:p-8 max-w-lg w-full border border-slate-200 shadow-2xl space-y-4 my-auto max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">
                  <Landmark className="w-4 h-4 text-emerald-700" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Official Acknowledgment Slip</h3>
                  <p className="text-[10px] text-slate-500 font-mono">Ref: {previewAckModal.officialAck}</p>
                </div>
              </div>
              <button
                onClick={() => setPreviewAckModal(null)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Applicant</span>
                  <span className="font-bold text-slate-900">{user.name}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Citizen ID</span>
                  <span className="font-mono text-slate-900">{user.citizenId}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Scheme Name</span>
                  <span className="font-bold text-slate-900">{previewAckModal.schemeTitle}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Nodal Department</span>
                  <span className="text-slate-700">{previewAckModal.department}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Sanction Requested</span>
                  <span className="font-bold text-emerald-700">{previewAckModal.loanSanctionRequested}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Current Status</span>
                  <span className="font-bold text-blue-700">{previewAckModal.status}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2">
              <span>Digitally authenticated via SarthX GovTech Engine</span>
              <button
                onClick={() => {
                  alert(`Official Acknowledgement Slip for Application ${previewAckModal.officialAck} has been prepared for print / PDF download.`);
                  setPreviewAckModal(null);
                }}
                className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 flex items-center gap-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Save PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Scheme Modal Dialog */}
      {activeModalScheme && (
        <SchemeModal
          scheme={activeModalScheme}
          onClose={() => setActiveModalScheme(null)}
          onApply={(s) => {
            setActiveModalScheme(null);
            handleApplySchemeClick(s);
          }}
        />
      )}

    </div>
  );
}
