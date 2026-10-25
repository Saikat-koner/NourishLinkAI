import React, { useState } from 'react';
import { DonationHistoryTimeline, INITIAL_RESCUE_OPERATIONS } from './DonationHistoryTimeline.tsx';

export interface DonorProfileData {
  name: string;
  facility: string;
  role: 'Commercial Donor' | 'Shelter Receiver' | 'Field Coordinator';
  fssaiNumber: string;
  gstNumber: string;
  avatar: string;
  points: number;
  tier: 'Bronze' | 'Silver' | 'Gold' | 'Diamond';
  streakDays: number;
  totalDonations: number;
  totalMeals: number;
  totalKg: number;
  moneySavedInr: number;
  landfillCostSavedInr: number;
  co2DivertedKg: number;
  waterSavedLitres: number;
  donationHistory: {
    id: string;
    date: string;
    foodName: string;
    foodType: string;
    portions: number;
    weightKg: number;
    receiver: string;
    savedInr: number;
    pointsEarned: number;
    status: 'Verified & Delivered' | 'En Route';
    haccpTemp: string;
  }[];
}

export const DEFAULT_DONOR_PROFILE: DonorProfileData = {
  name: 'Simranjeet Kaur & Jaswinder Singh',
  facility: 'Haveli Banquets & Grand Caterers (GT Road, Jalandhar)',
  role: 'Commercial Donor',
  fssaiNumber: 'FSSAI-12124001928371',
  gstNumber: '03AAAAA0000A1Z5',
  avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC7O5uriTeAMK72VpNrVzvANsADTDf0lUkOJV9k45f4m6cxe5rLyIkUNxKPQRqtV5vp8glW97G8CazLMm0LA8fgogAGiZNexlKy4hF17H3fj99fJHmX7BoqWkj6H4yPr7Y9JlroMGvSIR7gP2f_UyBuZ5YJ7ClzkppkHcPeI5BIJN-N8RZV4IacXCpj5r2Ovjx4slx0L-KZ_Lk7UbzAtV9jbfMwVU61fyblF2_u5aBWFbe0Dd3uZ7jVtg',
  points: 4850,
  tier: 'Gold',
  streakDays: 14,
  totalDonations: 28,
  totalMeals: 2840,
  totalKg: 980,
  moneySavedInr: 227200, // ₹80/meal average
  landfillCostSavedInr: 29400,
  co2DivertedKg: 7100, // 7.1 Tonnes
  waterSavedLitres: 284000,
  donationHistory: [
    {
      id: 'DON-9081',
      date: 'Today, 21:05 IST',
      foodName: 'Dal Makhani & Basmati Jeera Rice',
      foodType: 'Legume / Wet Curry',
      portions: 180,
      weightKg: 62,
      receiver: 'Shaheed Bhagat Singh Shelter (Node A)',
      savedInr: 14400,
      pointsEarned: 350,
      status: 'Verified & Delivered',
      haccpTemp: '68.5°C Verified',
    },
    {
      id: 'DON-8942',
      date: 'Yesterday, 22:30 IST',
      foodName: 'Paneer Butter Gravy & Tandoori Roti',
      foodType: 'Dairy / Rich Gravy',
      portions: 220,
      weightKg: 78,
      receiver: 'Civil Hospital Night Dormitory',
      savedInr: 17600,
      pointsEarned: 420,
      status: 'Verified & Delivered',
      haccpTemp: '71.2°C Verified',
    },
    {
      id: 'DON-8711',
      date: '23 Oct 2026, 20:45 IST',
      foodName: 'Mixed Dal Khichdi & Aloo Gobhi',
      foodType: 'Legume / Wet Curry',
      portions: 140,
      weightKg: 48,
      receiver: 'Phagwara Labor Colony Guild',
      savedInr: 11200,
      pointsEarned: 290,
      status: 'Verified & Delivered',
      haccpTemp: '69.0°C Verified',
    },
    {
      id: 'DON-8650',
      date: '21 Oct 2026, 23:15 IST',
      foodName: 'Shahi Paneer, Pulao & Sweet Kheer',
      foodType: 'Dairy / Rich Gravy',
      portions: 310,
      weightKg: 105,
      receiver: 'Ludhiana Migrant Transit Camp',
      savedInr: 24800,
      pointsEarned: 600,
      status: 'Verified & Delivered',
      haccpTemp: '70.8°C Verified',
    },
  ],
};

const BADGES = [
  {
    id: 'b1',
    name: 'Sovereign Annadata',
    icon: 'military_tech',
    description: 'Donated over 2,500 hot nutritious meals',
    unlocked: true,
    color: 'from-amber-400 to-yellow-600',
  },
  {
    id: 'b2',
    name: 'Thermal Guardian 65°C+',
    icon: 'thermostat',
    description: '100% HACCP temperature compliance at dispatch',
    unlocked: true,
    color: 'from-emerald-400 to-teal-600',
  },
  {
    id: 'b3',
    name: '14-Day Zero-Waste Streak',
    icon: 'local_fire_department',
    description: 'Consecutive surplus redirection without interruption',
    unlocked: true,
    color: 'from-orange-500 to-red-600',
  },
  {
    id: 'b4',
    name: 'Zero Methane Pioneer',
    icon: 'eco',
    description: 'Prevented over 5,000 kg CO2e greenhouse gas',
    unlocked: true,
    color: 'from-green-500 to-emerald-700',
  },
  {
    id: 'b5',
    name: 'Midnight Rescue Hero',
    icon: 'bedtime',
    description: 'Dispatched surplus past 22:00 IST for night shelters',
    unlocked: true,
    color: 'from-indigo-400 to-blue-600',
  },
  {
    id: 'b6',
    name: 'Diamond Civic Benefactor',
    icon: 'diamond',
    description: 'Reach 6,000 points and 3,500 total meals',
    unlocked: false,
    color: 'from-blue-300 to-cyan-500',
  },
];

interface DonorProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profileData?: DonorProfileData;
  onUpdateRole?: (role: DonorProfileData['role']) => void;
}

export const DonorProfileModal: React.FC<DonorProfileModalProps> = ({
  isOpen,
  onClose,
  profileData = DEFAULT_DONOR_PROFILE,
  onUpdateRole,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'gamification' | 'history' | 'certificates'>('overview');
  const [role, setRole] = useState<DonorProfileData['role']>(profileData.role);
  const [downloadNotice, setDownloadNotice] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleRoleChange = (newRole: DonorProfileData['role']) => {
    setRole(newRole);
    if (onUpdateRole) onUpdateRole(newRole);
  };

  const handleDownloadCertificate = (type: string) => {
    setDownloadNotice(`Generating verified ${type} under Digital India & FSSAI Sec 31(C)...`);
    setTimeout(() => {
      setDownloadNotice(`✓ ${type} downloaded successfully! Signed by Punjab Civil Supplies Authority.`);
      setTimeout(() => setDownloadNotice(null), 4000);
    }, 1200);
  };

  // Gamification level calculation
  const nextTierPoints = 6000;
  const progressPercent = Math.min(100, Math.round((profileData.points / nextTierPoints) * 100));

  return (
    <div className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl border border-[#bccac0]/30 overflow-hidden my-auto flex flex-col max-h-[92vh]">
        {/* Modal Top Header with Gamified Badging */}
        <div className="bg-gradient-to-r from-[#004b33] via-[#006948] to-[#00855d] text-white p-5 sm:p-6 relative">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/25 hover:bg-black/40 text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close Profile"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pr-8">
            <div className="flex items-center gap-3.5">
              <div className="relative">
                <img
                  src={profileData.avatar}
                  alt={profileData.name}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover ring-4 ring-[#85f8c4] shadow-lg"
                />
                <span className="absolute -bottom-1 -right-1 px-2 py-0.5 rounded-full bg-[#fe932c] text-[#4a2600] text-[10px] font-extrabold uppercase shadow">
                  Level 4
                </span>
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="font-headline font-extrabold text-lg sm:text-2xl tracking-tight text-white">
                    {profileData.name}
                  </h2>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#85f8c4] text-[#002114] text-[11px] font-bold inline-flex items-center gap-1 shadow-xs">
                    <span className="material-symbols-outlined text-xs">verified</span>
                    FSSAI Verified Annadata
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-emerald-100 mt-0.5">
                  {profileData.facility}
                </p>
                <div className="flex flex-wrap items-center gap-3 mt-1.5 text-[11px] text-white/80 font-mono">
                  <span>Lic: <strong>{profileData.fssaiNumber}</strong></span>
                  <span>•</span>
                  <span>GSTIN: <strong>{profileData.gstNumber}</strong></span>
                </div>
              </div>
            </div>

            {/* Quick Points & Streak Card */}
            <div className="bg-black/30 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/20 flex items-center gap-4 shrink-0">
              <div className="text-center">
                <div className="text-[10px] text-emerald-200 uppercase font-bold tracking-wider">
                  Nourish Karma
                </div>
                <div className="font-headline font-black text-2xl text-amber-300 font-mono">
                  {profileData.points.toLocaleString()}
                </div>
                <div className="text-[9px] text-white/70">Dignity Points</div>
              </div>
              <div className="h-8 w-px bg-white/20"></div>
              <div className="text-center">
                <div className="text-[10px] text-emerald-200 uppercase font-bold tracking-wider">
                  Rescue Streak
                </div>
                <div className="font-headline font-black text-2xl text-orange-400 font-mono flex items-center justify-center gap-0.5">
                  <span>🔥</span> {profileData.streakDays}
                </div>
                <div className="text-[9px] text-white/70">Days Active</div>
              </div>
            </div>
          </div>

          {/* Gamified Tier Progress Bar */}
          <div className="mt-4 pt-3 border-t border-white/15">
            <div className="flex items-center justify-between text-xs text-white/90 mb-1">
              <span className="flex items-center gap-1 font-semibold">
                <span className="material-symbols-outlined text-amber-300 text-sm">stars</span>
                <span>Current Tier: <strong>Gold Sovereign Annadata</strong></span>
              </span>
              <span className="font-mono text-[11px] text-emerald-200">
                {profileData.points} / {nextTierPoints} Pts to Diamond Tier ({progressPercent}%)
              </span>
            </div>
            <div className="w-full bg-black/40 h-2.5 rounded-full overflow-hidden p-0.5 border border-white/20">
              <div
                className="bg-gradient-to-r from-amber-400 to-[#85f8c4] h-full rounded-full transition-all duration-700"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="flex items-center px-4 bg-[#eaedff] border-b border-[#bccac0]/25 overflow-x-auto text-xs font-bold">
          <button
            type="button"
            onClick={() => setActiveTab('overview')}
            className={`py-3 px-4 border-b-2 transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeTab === 'overview'
                ? 'border-[#006948] text-[#006948] bg-white rounded-t-lg'
                : 'border-transparent text-[#3d4a42] hover:text-[#131b2e]'
            }`}
          >
            <span className="material-symbols-outlined text-base">monitoring</span>
            <span>Saved &amp; Donated Impact</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('gamification')}
            className={`py-3 px-4 border-b-2 transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeTab === 'gamification'
                ? 'border-[#006948] text-[#006948] bg-white rounded-t-lg'
                : 'border-transparent text-[#3d4a42] hover:text-[#131b2e]'
            }`}
          >
            <span className="material-symbols-outlined text-base">military_tech</span>
            <span>Gamified Badges &amp; Karma</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('history')}
            className={`py-3 px-4 border-b-2 transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeTab === 'history'
                ? 'border-[#006948] text-[#006948] bg-white rounded-t-lg'
                : 'border-transparent text-[#3d4a42] hover:text-[#131b2e]'
            }`}
          >
            <span className="material-symbols-outlined text-base">timeline</span>
            <span>Donation History Timeline ({INITIAL_RESCUE_OPERATIONS.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('certificates')}
            className={`py-3 px-4 border-b-2 transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeTab === 'certificates'
                ? 'border-[#006948] text-[#006948] bg-white rounded-t-lg'
                : 'border-transparent text-[#3d4a42] hover:text-[#131b2e]'
            }`}
          >
            <span className="material-symbols-outlined text-base">verified_user</span>
            <span>80G Tax Exemption &amp; CSR</span>
          </button>
        </div>

        {/* Modal Body Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1 bg-[#faf8ff]">
          {/* Download Notification Banner */}
          {downloadNotice && (
            <div className="p-3 bg-[#e2f7ec] border border-[#006948]/30 rounded-xl text-xs text-[#006948] font-bold flex items-center gap-2 animate-in fade-in">
              <span className="material-symbols-outlined text-base">download_done</span>
              <span>{downloadNotice}</span>
            </div>
          )}

          {/* TAB 1: SAVED & DONATED IMPACT TRACKER */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Financial & Environmental Savings Bento Grid */}
              <div>
                <h3 className="font-headline font-bold text-base text-[#131b2e] mb-1 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[#006948] text-lg">savings</span>
                  <span>How Much You Have Saved &amp; Donated</span>
                </h3>
                <p className="text-xs text-[#3d4a42] mb-3">
                  Autonomous calculation of commercial meal value saved, municipal dumping avoidance, and ecological offsets.
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
                  {/* Metric 1: Meals Donated */}
                  <div className="bg-white p-4 rounded-xl border border-[#bccac0]/30 shadow-sm flex flex-col justify-between">
                    <div className="flex items-center justify-between text-[#3d4a42]">
                      <span className="text-xs font-semibold">Meals Donated</span>
                      <span className="p-1 rounded-md bg-[#e2f7ec] text-[#006948]">
                        <span className="material-symbols-outlined text-base">soup_kitchen</span>
                      </span>
                    </div>
                    <div className="mt-2 font-headline font-black text-2xl lg:text-3xl text-[#006948] font-mono">
                      {profileData.totalMeals.toLocaleString()}
                    </div>
                    <span className="text-[10px] text-[#3d4a42] mt-0.5">
                      {profileData.totalKg} kg high-nutrition food
                    </span>
                  </div>

                  {/* Metric 2: Commercial Value Saved */}
                  <div className="bg-white p-4 rounded-xl border border-[#bccac0]/30 shadow-sm flex flex-col justify-between">
                    <div className="flex items-center justify-between text-[#3d4a42]">
                      <span className="text-xs font-semibold">Food Value Saved</span>
                      <span className="p-1 rounded-md bg-[#ffdcc3] text-[#904d00]">
                        <span className="material-symbols-outlined text-base">currency_rupee</span>
                      </span>
                    </div>
                    <div className="mt-2 font-headline font-black text-2xl lg:text-3xl text-[#904d00] font-mono">
                      ₹{profileData.moneySavedInr.toLocaleString()}
                    </div>
                    <span className="text-[10px] text-[#3d4a42] mt-0.5">
                      Prevents banquet capital loss
                    </span>
                  </div>

                  {/* Metric 3: Landfill Fee Saved */}
                  <div className="bg-white p-4 rounded-xl border border-[#bccac0]/30 shadow-sm flex flex-col justify-between">
                    <div className="flex items-center justify-between text-[#3d4a42]">
                      <span className="text-xs font-semibold">Municipal Fees Saved</span>
                      <span className="p-1 rounded-md bg-[#eaedff] text-[#006194]">
                        <span className="material-symbols-outlined text-base">delete_sweep</span>
                      </span>
                    </div>
                    <div className="mt-2 font-headline font-black text-2xl lg:text-3xl text-[#006194] font-mono">
                      ₹{profileData.landfillCostSavedInr.toLocaleString()}
                    </div>
                    <span className="text-[10px] text-[#3d4a42] mt-0.5">
                      Commercial dumping surcharge
                    </span>
                  </div>

                  {/* Metric 4: CO2e Diverted */}
                  <div className="bg-white p-4 rounded-xl border border-[#bccac0]/30 shadow-sm flex flex-col justify-between">
                    <div className="flex items-center justify-between text-[#3d4a42]">
                      <span className="text-xs font-semibold">CO2e Offset</span>
                      <span className="p-1 rounded-md bg-[#e2f7ec] text-[#00855d]">
                        <span className="material-symbols-outlined text-base">co2</span>
                      </span>
                    </div>
                    <div className="mt-2 font-headline font-black text-2xl lg:text-3xl text-[#00855d] font-mono">
                      {(profileData.co2DivertedKg / 1000).toFixed(1)} <span className="text-base">Tonnes</span>
                    </div>
                    <span className="text-[10px] text-[#3d4a42] mt-0.5">
                      {profileData.waterSavedLitres.toLocaleString()} L water preserved
                    </span>
                  </div>
                </div>
              </div>

              {/* Persona / Role Selector */}
              <div className="bg-white p-4 sm:p-5 rounded-xl border border-[#bccac0]/30 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-headline font-bold text-sm text-[#131b2e]">
                      Account Role &amp; Entity Classification
                    </h4>
                    <p className="text-xs text-[#3d4a42]">
                      Switch identity context for tailored FSSAI compliance and routing portals.
                    </p>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-[#006948] font-bold text-[10px] uppercase">
                    Active: {role}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <button
                    type="button"
                    onClick={() => handleRoleChange('Commercial Donor')}
                    className={`p-3 rounded-lg border text-left transition-all cursor-pointer flex items-start gap-2.5 ${
                      role === 'Commercial Donor'
                        ? 'border-[#006948] bg-[#e2f7ec]/60 ring-2 ring-[#006948]/30 shadow-xs'
                        : 'border-[#bccac0]/30 bg-[#faf8ff] hover:bg-white'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[#006948] text-xl mt-0.5">store</span>
                    <div>
                      <div className="text-xs font-bold text-[#131b2e]">Commercial Donor</div>
                      <div className="text-[10px] text-[#3d4a42] leading-tight mt-0.5">
                        Banquet halls, hotels, caterers &amp; gurdwaras
                      </div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleRoleChange('Shelter Receiver')}
                    className={`p-3 rounded-lg border text-left transition-all cursor-pointer flex items-start gap-2.5 ${
                      role === 'Shelter Receiver'
                        ? 'border-[#006948] bg-[#e2f7ec]/60 ring-2 ring-[#006948]/30 shadow-xs'
                        : 'border-[#bccac0]/30 bg-[#faf8ff] hover:bg-white'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[#006194] text-xl mt-0.5">night_shelter</span>
                    <div>
                      <div className="text-xs font-bold text-[#131b2e]">Shelter Receiver</div>
                      <div className="text-[10px] text-[#3d4a42] leading-tight mt-0.5">
                        Night shelters, orphanages, elder care &amp; NGO camps
                      </div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleRoleChange('Field Coordinator')}
                    className={`p-3 rounded-lg border text-left transition-all cursor-pointer flex items-start gap-2.5 ${
                      role === 'Field Coordinator'
                        ? 'border-[#006948] bg-[#e2f7ec]/60 ring-2 ring-[#006948]/30 shadow-xs'
                        : 'border-[#bccac0]/30 bg-[#faf8ff] hover:bg-white'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[#904d00] text-xl mt-0.5">badge</span>
                    <div>
                      <div className="text-xs font-bold text-[#131b2e]">Field Authority</div>
                      <div className="text-[10px] text-[#3d4a42] leading-tight mt-0.5">
                        District Food Supplies, FSSAI &amp; rescue scouts
                      </div>
                    </div>
                  </button>
                </div>
              </div>

              {/* FSSAI Good Samaritan Legal Immunity Seal */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-[#eaedff] to-[#e2e7ff] border border-[#bccac0]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-3xl text-[#006948] mt-0.5">gavel</span>
                  <div>
                    <h5 className="font-headline font-bold text-xs sm:text-sm text-[#131b2e]">
                      Statutory Good Samaritan Protection Shield (Sec 31-C)
                    </h5>
                    <p className="text-[11px] text-[#3d4a42] leading-snug mt-0.5">
                      You are fully indemnified against civil &amp; criminal claims under the Food Safety &amp; Standards Authority of India (FSSAI) National Guidelines for Surplus Food Donors.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleDownloadCertificate('FSSAI Legal Immunity Certificate')}
                  className="px-3 py-1.5 rounded-lg bg-[#006948] text-white text-xs font-bold hover:bg-[#00855d] transition-colors shadow-xs shrink-0 cursor-pointer"
                >
                  Download Shield Pass
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: GAMIFICATION, BADGES & KARMA ENGINE */}
          {activeTab === 'gamification' && (
            <div className="space-y-6">
              {/* How points work card */}
              <div className="bg-[#e2f7ec] p-4 rounded-xl border border-[#006948]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <h4 className="font-headline font-bold text-sm text-[#006948] flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-base">stars</span>
                    <span>Nourish Karma &amp; Dignity Points Algorithm</span>
                  </h4>
                  <p className="text-xs text-[#002114] mt-0.5">
                    Earn <strong>+10 points/meal</strong>, <strong>+50 pts</strong> for quick thermal dispatch (&lt;30m), <strong>+100 pts</strong> for perfect 65°C+ HACCP holding, and unlock civic tax credits.
                  </p>
                </div>
                <div className="px-3 py-1 rounded-lg bg-[#006948] text-white text-xs font-mono font-bold shrink-0">
                  Total: {profileData.points} Pts
                </div>
              </div>

              {/* Badges Grid */}
              <div>
                <h4 className="font-headline font-bold text-sm text-[#131b2e] mb-3 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[#fe932c] text-lg">emoji_events</span>
                  <span>Unlocked Sovereign Honours ({BADGES.filter(b => b.unlocked).length}/{BADGES.length})</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
                  {BADGES.map((b) => (
                    <div
                      key={b.id}
                      className={`p-4 rounded-xl border transition-all flex items-start gap-3 ${
                        b.unlocked
                          ? 'bg-white border-[#bccac0]/30 shadow-sm hover:shadow-md'
                          : 'bg-gray-50 border-gray-200 opacity-60'
                      }`}
                    >
                      <div
                        className={`w-11 h-11 rounded-xl bg-gradient-to-br ${b.color} text-white flex items-center justify-center shrink-0 shadow-md`}
                      >
                        <span className="material-symbols-outlined text-2xl">{b.icon}</span>
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1">
                          <span className="text-xs font-bold text-[#131b2e] truncate">
                            {b.name}
                          </span>
                          {b.unlocked && (
                            <span className="text-[10px] text-emerald-600 font-bold">✓</span>
                          )}
                        </div>
                        <p className="text-[11px] text-[#3d4a42] leading-tight mt-0.5">
                          {b.description}
                        </p>
                        <span className="text-[9px] uppercase font-bold tracking-wider text-[#006948] mt-1 block">
                          {b.unlocked ? 'Unlocked & Active' : 'Locked (Next Milestone)'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Punjab State Zero-Waste Donor Leaderboard Preview */}
              <div className="bg-white rounded-xl p-4 sm:p-5 border border-[#bccac0]/30 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-headline font-bold text-sm text-[#131b2e] flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[#904d00] text-base">leaderboard</span>
                    <span>Punjab Regional Donor Leaderboard (GT Road Corridor)</span>
                  </h4>
                  <span className="text-[10px] text-[#006948] font-bold uppercase">
                    Your Rank: #3 (Top 1%)
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#eaedff]/60 text-xs">
                    <div className="flex items-center gap-2.5">
                      <span className="w-5 font-bold font-mono text-[#904d00]">#1</span>
                      <span className="font-bold text-[#131b2e]">Grand Amber Palace (Ludhiana)</span>
                    </div>
                    <div className="font-mono text-[11px] text-[#006948] font-bold">
                      6,420 Meals · 9,200 Pts
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#eaedff]/40 text-xs">
                    <div className="flex items-center gap-2.5">
                      <span className="w-5 font-bold font-mono text-gray-500">#2</span>
                      <span className="font-bold text-[#131b2e]">Lovely Professional Univ. Mega Mess</span>
                    </div>
                    <div className="font-mono text-[11px] text-[#006948] font-bold">
                      4,800 Meals · 7,150 Pts
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#e2f7ec] border border-[#006948]/30 text-xs font-bold">
                    <div className="flex items-center gap-2.5">
                      <span className="w-5 font-bold font-mono text-[#006948]">#3</span>
                      <span className="text-[#006948]">Haveli Banquets (You)</span>
                    </div>
                    <div className="font-mono text-[11px] text-[#006948] font-bold">
                      {profileData.totalMeals} Meals · {profileData.points} Pts
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: COMPLETE DONATION LOG & RECEIPT TRACEABILITY */}
          {activeTab === 'history' && (
            <div className="space-y-4">
              <DonationHistoryTimeline operations={INITIAL_RESCUE_OPERATIONS} />
            </div>
          )}

          {/* TAB 4: 80G TAX EXEMPTION & SOVEREIGN CSR CITATION */}
          {activeTab === 'certificates' && (
            <div className="space-y-4">
              <div>
                <h4 className="font-headline font-bold text-sm text-[#131b2e]">
                  Sovereign 80G Tax Deductions &amp; Corporate CSR Accreditation
                </h4>
                <p className="text-xs text-[#3d4a42]">
                  Under Indian Income Tax Act Sec 80G and Ministry of Corporate Affairs Schedule VII, surplus hot meal rescue qualifies for 100% deduction and CSR compliance.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white p-5 rounded-xl border border-[#bccac0]/30 shadow-sm flex flex-col justify-between space-y-3">
                  <div>
                    <span className="p-2 rounded-lg bg-[#e2f7ec] text-[#006948] inline-flex mb-2">
                      <span className="material-symbols-outlined text-2xl">description</span>
                    </span>
                    <h5 className="font-headline font-bold text-sm text-[#131b2e]">
                      Annual 80G Tax Exemption Certificate
                    </h5>
                    <p className="text-xs text-[#3d4a42] leading-relaxed mt-1">
                      Certified valuation of ₹{profileData.moneySavedInr.toLocaleString()} donated meals for Financial Year 2026-27 tax deduction filing.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDownloadCertificate('80G Tax Deduction Certificate')}
                    className="w-full py-2 bg-[#006948] text-white text-xs font-bold rounded-lg hover:bg-[#00855d] transition-colors shadow-xs cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <span className="material-symbols-outlined text-sm">download</span>
                    <span>Download Official 80G Certificate</span>
                  </button>
                </div>

                <div className="bg-white p-5 rounded-xl border border-[#bccac0]/30 shadow-sm flex flex-col justify-between space-y-3">
                  <div>
                    <span className="p-2 rounded-lg bg-[#eaedff] text-[#006194] inline-flex mb-2">
                      <span className="material-symbols-outlined text-2xl">military_tech</span>
                    </span>
                    <h5 className="font-headline font-bold text-sm text-[#131b2e]">
                      Punjab State Zero-Hunger ESG Citation
                    </h5>
                    <p className="text-xs text-[#3d4a42] leading-relaxed mt-1">
                      Official State citation recognizing Haveli Banquets for {(profileData.co2DivertedKg / 1000).toFixed(1)} Tonnes of carbon offset and SDG 2 zero-hunger alignment.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDownloadCertificate('Punjab State ESG Citation')}
                    className="w-full py-2 bg-[#131b2e] text-white text-xs font-bold rounded-lg hover:bg-[#283044] transition-colors shadow-xs cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <span className="material-symbols-outlined text-sm">verified</span>
                    <span>Download ESG Citation</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-white border-t border-[#bccac0]/25 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-[#3d4a42]">
            <span className="material-symbols-outlined text-[#006948] text-base">shield</span>
            <span>Cryptographically Verified · Punjab Civil Supplies &amp; FSSAI Protocol</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-[#eaedff] hover:bg-[#dae2fd] text-[#131b2e] text-xs font-bold transition-colors cursor-pointer"
          >
            Close Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};
