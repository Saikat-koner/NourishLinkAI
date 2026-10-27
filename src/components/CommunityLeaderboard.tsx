import React, { useState, useMemo } from 'react';

export type DonorTier = 'diamond' | 'gold' | 'silver' | 'bronze' | 'pioneer';

export interface LeaderboardDonor {
  id: string;
  rank: number;
  name: string;
  type: 'Banquet Hall' | 'Hotel & Restaurant' | 'Langar / Religious Trust' | 'Sweet Shop & Halwai' | 'Corporate Cafeteria';
  location: string;
  avatar: string;
  impactPoints: number;
  foodSavedKg: number;
  mealsRescued: number;
  co2eAvoidedKg: number;
  streakDays: number;
  tier: DonorTier;
  isCurrentUser?: boolean;
  fssaiNumber: string;
  haccpPassRate: number; // e.g. 99.4%
  primaryDishType: string;
  weeklyGrowthKg: number;
  monthPoints: number;
  weekPoints: number;
  monthKg: number;
  weekKg: number;
}

export const TIER_CONFIG: Record<
  DonorTier,
  {
    label: string;
    icon: string;
    badgeBg: string;
    badgeText: string;
    border: string;
    minPoints: number;
    minKg: number;
    perk: string;
    description: string;
  }
> = {
  diamond: {
    label: 'Diamond Sovereign Annadata',
    icon: 'diamond',
    badgeBg: 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white',
    badgeText: 'text-cyan-700',
    border: 'border-cyan-400',
    minPoints: 6000,
    minKg: 2000,
    perk: 'MCA CSR Accreditation & Priority Cold-Chain EV Routing',
    description: 'Sovereign patrons with >6,000 points and over 2,000 kg rescued. Eligible for 100% 80G tax deductions and zero-carbon dispatch priority.',
  },
  gold: {
    label: 'Gold Sovereign Annadata',
    icon: 'military_tech',
    badgeBg: 'bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-900',
    badgeText: 'text-amber-800',
    border: 'border-amber-400',
    minPoints: 4000,
    minKg: 1200,
    perk: 'FSSAI Safe Harbor Gold Shield & Monthly Municipal Commendation',
    description: 'Advanced donors with 4,000–5,999 points. Guaranteed instant thermal handover and zero-spill safe harbor indemnity.',
  },
  silver: {
    label: 'Silver Samaritan',
    icon: 'workspace_premium',
    badgeBg: 'bg-gradient-to-r from-slate-200 to-slate-400 text-slate-900',
    badgeText: 'text-slate-700',
    border: 'border-slate-300',
    minPoints: 2500,
    minKg: 700,
    perk: 'Verified Safe Kitchen Citation & Automated 80G Certificates',
    description: 'Committed commercial donors with 2,500–3,999 points actively rescuing daily excess meals.',
  },
  bronze: {
    label: 'Bronze Guardian',
    icon: 'shield',
    badgeBg: 'bg-gradient-to-r from-amber-700 to-amber-900 text-amber-100',
    badgeText: 'text-amber-900',
    border: 'border-amber-700',
    minPoints: 1000,
    minKg: 300,
    perk: 'Thermal Sensor Pairing & Standard Dispatch SLA',
    description: 'Active civic kitchen guardians with 1,000–2,499 points preventing food spoilage across Punjab corridors.',
  },
  pioneer: {
    label: 'Pioneer Donor',
    icon: 'eco',
    badgeBg: 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white',
    badgeText: 'text-emerald-700',
    border: 'border-emerald-300',
    minPoints: 0,
    minKg: 0,
    perk: 'Verified Onboarding Badge & Dignity Ledger ID',
    description: 'New community food donors stepping up into sovereign zero-waste logistics.',
  },
};

export const INITIAL_LEADERBOARD_DONORS: LeaderboardDonor[] = [
  {
    id: 'donor-1',
    rank: 1,
    name: 'Golden Temple Sri Guru Ramdas Langar Kitchen',
    type: 'Langar / Religious Trust',
    location: 'Amritsar GT Corridor',
    avatar: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=200&q=80',
    impactPoints: 18950,
    foodSavedKg: 14200,
    mealsRescued: 42600,
    co2eAvoidedKg: 35500,
    streakDays: 84,
    tier: 'diamond',
    fssaiNumber: 'FSSAI-10014022002911',
    haccpPassRate: 100,
    primaryDishType: 'Dal Makhani & Roti',
    weeklyGrowthKg: 420,
    monthPoints: 3400,
    weekPoints: 850,
    monthKg: 2800,
    weekKg: 620,
  },
  {
    id: 'donor-2',
    rank: 2,
    name: 'Radisson Blu & Grand Convention Center',
    type: 'Hotel & Restaurant',
    location: 'Ludhiana Bypass',
    avatar: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=200&q=80',
    impactPoints: 9820,
    foodSavedKg: 4850,
    mealsRescued: 14550,
    co2eAvoidedKg: 12125,
    streakDays: 42,
    tier: 'diamond',
    fssaiNumber: 'FSSAI-10319011000452',
    haccpPassRate: 99.8,
    primaryDishType: 'Rich Gravy & Desserts',
    weeklyGrowthKg: 210,
    monthPoints: 1980,
    weekPoints: 490,
    monthKg: 1100,
    weekKg: 270,
  },
  {
    id: 'donor-3',
    rank: 3,
    name: 'Phagwara Palace Resort & Caterers',
    type: 'Banquet Hall',
    location: 'Phagwara Central Corridor',
    avatar: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=200&q=80',
    impactPoints: 6450,
    foodSavedKg: 2120,
    mealsRescued: 6360,
    co2eAvoidedKg: 5300,
    streakDays: 28,
    tier: 'diamond',
    fssaiNumber: 'FSSAI-12120019000318',
    haccpPassRate: 99.1,
    primaryDishType: 'Paneer Makhani & Naan',
    weeklyGrowthKg: 140,
    monthPoints: 1420,
    weekPoints: 360,
    monthKg: 680,
    weekKg: 180,
  },
  {
    id: 'donor-4',
    rank: 4,
    name: 'Haveli Banquets & Heritage Kitchen (You)',
    type: 'Banquet Hall',
    location: 'GT Road, Jalandhar Bypass',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC7O5uriTeAMK72VpNrVzvANsADTDf0lUkOJV9k45f4m6cxe5rLyIkUNxKPQRqtV5vp8glW97G8CazLMm0LA8fgogAGiZNexlKy4hF17H3fj99fJHmX7BoqWkj6H4yPr7Y9JlroMGvSIR7gP2f_UyBuZ5YJ7ClzkppkHcPeI5BIJN-N8RZV4IacXCpj5r2Ovjx4slx0L-KZ_Lk7UbzAtV9jbfMwVU61fyblF2_u5aBWFbe0Dd3uZ7jVtg',
    impactPoints: 4850,
    foodSavedKg: 1480,
    mealsRescued: 4440,
    co2eAvoidedKg: 3700,
    streakDays: 14,
    tier: 'gold',
    isCurrentUser: true,
    fssaiNumber: 'FSSAI-12124001928371',
    haccpPassRate: 99.6,
    primaryDishType: 'Dal Makhani & Pulao',
    weeklyGrowthKg: 165,
    monthPoints: 1250,
    weekPoints: 380,
    monthKg: 510,
    weekKg: 150,
  },
  {
    id: 'donor-5',
    rank: 5,
    name: 'Mohan Sweet Confectioneries & Halwai',
    type: 'Sweet Shop & Halwai',
    location: 'Goraya Town Square',
    avatar: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=200&q=80',
    impactPoints: 3820,
    foodSavedKg: 1040,
    mealsRescued: 3120,
    co2eAvoidedKg: 2600,
    streakDays: 19,
    tier: 'silver',
    fssaiNumber: 'FSSAI-12121004000109',
    haccpPassRate: 98.9,
    primaryDishType: 'Gulab Jamun & Khoya Sweets',
    weeklyGrowthKg: 85,
    monthPoints: 890,
    weekPoints: 210,
    monthKg: 340,
    weekKg: 95,
  },
  {
    id: 'donor-6',
    rank: 6,
    name: 'Lovely Sweets & Grand Banquet Hall',
    type: 'Banquet Hall',
    location: 'Jalandhar Cantt',
    avatar: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=200&q=80',
    impactPoints: 3240,
    foodSavedKg: 890,
    mealsRescued: 2670,
    co2eAvoidedKg: 2225,
    streakDays: 11,
    tier: 'silver',
    fssaiNumber: 'FSSAI-12122002000845',
    haccpPassRate: 99.2,
    primaryDishType: 'Mixed Veg & Breads',
    weeklyGrowthKg: 90,
    monthPoints: 760,
    weekPoints: 180,
    monthKg: 290,
    weekKg: 80,
  },
  {
    id: 'donor-7',
    rank: 7,
    name: 'Shaheed Bhagat Singh Memorial Community Mess',
    type: 'Langar / Religious Trust',
    location: 'Phillaur Sutlej Link',
    avatar: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=200&q=80',
    impactPoints: 2180,
    foodSavedKg: 620,
    mealsRescued: 1860,
    co2eAvoidedKg: 1550,
    streakDays: 9,
    tier: 'bronze',
    fssaiNumber: 'FSSAI-12123005001190',
    haccpPassRate: 98.5,
    primaryDishType: 'Kadhi Pakora & Steamed Rice',
    weeklyGrowthKg: 60,
    monthPoints: 520,
    weekPoints: 130,
    monthKg: 190,
    weekKg: 55,
  },
  {
    id: 'donor-8',
    rank: 8,
    name: 'Sutlej View River Lawn & Resort',
    type: 'Hotel & Restaurant',
    location: 'Phillaur Riverside',
    avatar: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=200&q=80',
    impactPoints: 1640,
    foodSavedKg: 490,
    mealsRescued: 1470,
    co2eAvoidedKg: 1225,
    streakDays: 7,
    tier: 'bronze',
    fssaiNumber: 'FSSAI-12121008000412',
    haccpPassRate: 97.8,
    primaryDishType: 'Continental & Indian Gravy',
    weeklyGrowthKg: 45,
    monthPoints: 410,
    weekPoints: 95,
    monthKg: 140,
    weekKg: 40,
  },
  {
    id: 'donor-9',
    rank: 9,
    name: 'Saffron Royal Banquet & Dining',
    type: 'Banquet Hall',
    location: 'Chaheru GT Road',
    avatar: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=200&q=80',
    impactPoints: 980,
    foodSavedKg: 290,
    mealsRescued: 870,
    co2eAvoidedKg: 725,
    streakDays: 5,
    tier: 'pioneer',
    fssaiNumber: 'FSSAI-12124009000213',
    haccpPassRate: 98.1,
    primaryDishType: 'Tandoori Roti & Dal Tadka',
    weeklyGrowthKg: 30,
    monthPoints: 310,
    weekPoints: 75,
    monthKg: 95,
    weekKg: 30,
  },
  {
    id: 'donor-10',
    rank: 10,
    name: 'Majha Highway Dhabas Cooperative',
    type: 'Hotel & Restaurant',
    location: 'Kartarpur Link Road',
    avatar: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=200&q=80',
    impactPoints: 760,
    foodSavedKg: 220,
    mealsRescued: 660,
    co2eAvoidedKg: 550,
    streakDays: 4,
    tier: 'pioneer',
    fssaiNumber: 'FSSAI-12124007000881',
    haccpPassRate: 97.4,
    primaryDishType: 'Chana Masala & Parathas',
    weeklyGrowthKg: 25,
    monthPoints: 240,
    weekPoints: 60,
    monthKg: 80,
    weekKg: 25,
  },
];

type SortMetric = 'points' | 'kg' | 'meals';
type TimeFrame = 'all' | 'month' | 'week';

interface CommunityLeaderboardProps {
  onOpenDonate?: () => void;
  onOpenProfile?: () => void;
}

export const CommunityLeaderboard: React.FC<CommunityLeaderboardProps> = ({
  onOpenDonate,
  onOpenProfile,
}) => {
  const [sortMetric, setSortMetric] = useState<SortMetric>('points');
  const [timeFrame, setTimeFrame] = useState<TimeFrame>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDonorForModal, setSelectedDonorForModal] = useState<LeaderboardDonor | null>(null);
  const [showTierGuide, setShowTierGuide] = useState<boolean>(false);

  // Compute values based on timeframe and sort metric
  const filteredAndSortedDonors = useMemo(() => {
    let list = [...INITIAL_LEADERBOARD_DONORS];

    // Filter by Category
    if (categoryFilter !== 'all') {
      list = list.filter((d) => d.type === categoryFilter);
    }

    // Filter by Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (d) =>
          d.name.toLowerCase().includes(q) ||
          d.location.toLowerCase().includes(q) ||
          d.type.toLowerCase().includes(q) ||
          d.primaryDishType.toLowerCase().includes(q)
      );
    }

    // Sort Metric Calculation
    list.sort((a, b) => {
      let valA = 0;
      let valB = 0;

      if (sortMetric === 'points') {
        valA = timeFrame === 'all' ? a.impactPoints : timeFrame === 'month' ? a.monthPoints : a.weekPoints;
        valB = timeFrame === 'all' ? b.impactPoints : timeFrame === 'month' ? b.monthPoints : b.weekPoints;
      } else if (sortMetric === 'kg') {
        valA = timeFrame === 'all' ? a.foodSavedKg : timeFrame === 'month' ? a.monthKg : a.weekKg;
        valB = timeFrame === 'all' ? b.foodSavedKg : timeFrame === 'month' ? b.monthKg : b.weekKg;
      } else {
        // Meals
        const kgA = timeFrame === 'all' ? a.foodSavedKg : timeFrame === 'month' ? a.monthKg : a.weekKg;
        const kgB = timeFrame === 'all' ? b.foodSavedKg : timeFrame === 'month' ? b.monthKg : b.weekKg;
        valA = kgA * 3;
        valB = kgB * 3;
      }

      return valB - valA;
    });

    return list.map((d, index) => ({
      ...d,
      computedRank: index + 1,
    }));
  }, [sortMetric, timeFrame, categoryFilter, searchQuery]);

  const currentUser = useMemo(() => {
    return (
      filteredAndSortedDonors.find((d) => d.isCurrentUser) ||
      INITIAL_LEADERBOARD_DONORS.find((d) => d.isCurrentUser)!
    );
  }, [filteredAndSortedDonors]);

  // Overall totals across the network
  const networkTotals = useMemo(() => {
    const totalPoints = INITIAL_LEADERBOARD_DONORS.reduce((sum, d) => sum + d.impactPoints, 0);
    const totalKg = INITIAL_LEADERBOARD_DONORS.reduce((sum, d) => sum + d.foodSavedKg, 0);
    const totalMeals = INITIAL_LEADERBOARD_DONORS.reduce((sum, d) => sum + d.mealsRescued, 0);
    const totalCo2 = INITIAL_LEADERBOARD_DONORS.reduce((sum, d) => sum + d.co2eAvoidedKg, 0);
    return { totalPoints, totalKg, totalMeals, totalCo2 };
  }, []);

  // Top 3 Podium Donors
  const podium = useMemo(() => {
    return {
      first: filteredAndSortedDonors[0],
      second: filteredAndSortedDonors[1],
      third: filteredAndSortedDonors[2],
    };
  }, [filteredAndSortedDonors]);

  const handleScrollToMe = () => {
    const el = document.getElementById(`donor-card-${currentUser.id}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      el.classList.add('ring-4', 'ring-[#006948]');
      setTimeout(() => {
        el.classList.remove('ring-4', 'ring-[#006948]');
      }, 2500);
    }
  };

  return (
    <div className="space-y-6">
      {/* Hero Header & Gamified Status */}
      <div className="bg-gradient-to-r from-[#006948] via-[#004d34] to-[#131b2e] rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden border border-[#85f8c4]/20">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-[#85f8c4]/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/3 -mb-20 w-80 h-80 bg-amber-400/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-emerald-200">
              <span className="material-symbols-outlined text-sm text-amber-300">emoji_events</span>
              <span>Punjab Civic Food Rescue Sovereign Leaderboard</span>
              <span className="text-white/40">•</span>
              <span className="text-amber-300">Live Oct 2026</span>
            </div>

            <h2 className="font-headline font-black text-2xl sm:text-3xl lg:text-4xl tracking-tight leading-tight">
              Community Donor Champions &amp; Tier Ranks
            </h2>
            <p className="text-sm text-emerald-100/90 leading-relaxed">
              Every surplus portion logged prevents landfill methane and feeds unhoused families across the GT Road Corridor. Earn Nourish Karma points, climb civic tiers, and unlock 80G tax commendations.
            </p>
          </div>

          {/* Quick Action Badges */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setShowTierGuide(true)}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs backdrop-blur-md border border-white/20 flex items-center gap-2 transition-all cursor-pointer shadow-sm active:scale-95"
            >
              <span className="material-symbols-outlined text-base text-amber-300">workspace_premium</span>
              <span>Tier Badge Rules &amp; Perks</span>
            </button>

            {onOpenDonate && (
              <button
                type="button"
                onClick={onOpenDonate}
                className="px-4 py-2.5 rounded-xl bg-[#fe932c] hover:bg-[#ffdcc3] text-[#4a2600] font-headline font-bold text-xs flex items-center gap-2 shadow-lg transition-all cursor-pointer active:scale-95"
              >
                <span className="material-symbols-outlined text-base">volunteer_activism</span>
                <span>Log Surplus to Climb Rank</span>
              </button>
            )}
          </div>
        </div>

        {/* Network Grand Totals Banner */}
        <div className="mt-6 pt-6 border-t border-white/15 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-black/25 backdrop-blur-md p-3.5 rounded-2xl border border-white/10">
            <div className="text-[11px] text-emerald-200/90 font-medium flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm text-amber-300">toll</span>
              <span>Total Impact Points</span>
            </div>
            <div className="font-headline font-black text-xl sm:text-2xl text-amber-300 mt-1 font-mono">
              {networkTotals.totalPoints.toLocaleString()} <span className="text-xs font-normal text-white/70">Pts</span>
            </div>
          </div>

          <div className="bg-black/25 backdrop-blur-md p-3.5 rounded-2xl border border-white/10">
            <div className="text-[11px] text-emerald-200/90 font-medium flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm text-emerald-400">scale</span>
              <span>Food Rescued (kg)</span>
            </div>
            <div className="font-headline font-black text-xl sm:text-2xl text-white mt-1 font-mono">
              {networkTotals.totalKg.toLocaleString()} <span className="text-xs font-normal text-white/70">kg</span>
            </div>
          </div>

          <div className="bg-black/25 backdrop-blur-md p-3.5 rounded-2xl border border-white/10">
            <div className="text-[11px] text-emerald-200/90 font-medium flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm text-cyan-300">soup_kitchen</span>
              <span>Hot Meals Delivered</span>
            </div>
            <div className="font-headline font-black text-xl sm:text-2xl text-[#85f8c4] mt-1 font-mono">
              {networkTotals.totalMeals.toLocaleString()} <span className="text-xs font-normal text-white/70">Meals</span>
            </div>
          </div>

          <div className="bg-black/25 backdrop-blur-md p-3.5 rounded-2xl border border-white/10">
            <div className="text-[11px] text-emerald-200/90 font-medium flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm text-emerald-300">eco</span>
              <span>CO2e Diverted</span>
            </div>
            <div className="font-headline font-black text-xl sm:text-2xl text-white mt-1 font-mono">
              {(networkTotals.totalCo2 / 1000).toFixed(1)} <span className="text-xs font-normal text-white/70">Tonnes</span>
            </div>
          </div>
        </div>
      </div>

      {/* Current Donor "You" Pin Bar */}
      {currentUser && (
        <div className="p-4 sm:p-5 rounded-2xl bg-[#e2f7ec] border-2 border-[#006948] shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative shrink-0">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-13 h-13 rounded-full object-cover ring-2 ring-[#006948] shadow-sm"
              />
              <span className="absolute -top-1 -left-1 px-1.5 py-0.2 rounded-full bg-[#006948] text-white font-mono font-black text-[10px]">
                #{currentUser.rank}
              </span>
            </div>

            <div className="space-y-0.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-headline font-extrabold text-sm text-[#131b2e]">
                  {currentUser.name}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#006948] text-white text-[10px] font-bold">
                  YOUR KITCHEN
                </span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${TIER_CONFIG[currentUser.tier].badgeBg}`}>
                  {TIER_CONFIG[currentUser.tier].label}
                </span>
              </div>
              <p className="text-xs text-[#3d4a42]">
                {currentUser.location} • FSSAI: <span className="font-mono">{currentUser.fssaiNumber}</span>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between md:justify-end gap-4 w-full md:w-auto border-t md:border-t-0 pt-3 md:pt-0 border-[#bccac0]/40">
            <div className="text-left md:text-right">
              <div className="text-[10px] text-[#3d4a42] font-semibold uppercase tracking-wider">
                Current Impact Score
              </div>
              <div className="font-headline font-black text-lg text-[#006948] font-mono">
                {currentUser.impactPoints.toLocaleString()} Pts · {currentUser.foodSavedKg.toLocaleString()} kg saved
              </div>
              <div className="text-[10px] text-amber-800 font-medium">
                1,150 Pts to reach Diamond Sovereign Tier!
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleScrollToMe}
                className="px-3 py-1.5 rounded-lg bg-white border border-[#006948] text-[#006948] font-bold text-xs hover:bg-[#006948] hover:text-white transition-all cursor-pointer shadow-2xs"
              >
                Highlight My Card
              </button>
              {onOpenProfile && (
                <button
                  type="button"
                  onClick={onOpenProfile}
                  className="px-3 py-1.5 rounded-lg bg-[#006948] text-white font-bold text-xs hover:bg-[#005238] transition-all cursor-pointer shadow-xs"
                >
                  View Profile &amp; 80G
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Top 3 Champion Podium */}
      {podium.first && podium.second && podium.third && (
        <div className="bg-white p-6 rounded-3xl border border-[#bccac0]/30 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-amber-500 text-xl">military_tech</span>
              <h3 className="font-headline font-bold text-base text-[#131b2e]">
                Punjab Corridor Champions Podium
              </h3>
            </div>
            <span className="text-xs text-[#3d4a42] font-medium hidden sm:inline">
              Leading the state in zero-food-waste logistics
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            {/* 2nd Place */}
            <div className="order-2 md:order-1 p-4 rounded-2xl bg-[#faf8ff] border-2 border-slate-300 flex flex-col justify-between space-y-3 relative overflow-hidden shadow-xs hover:shadow-md transition-shadow">
              <div className="absolute top-2 right-2 text-2xl font-black text-slate-300 font-mono">#2</div>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src={podium.second.avatar}
                    alt={podium.second.name}
                    className="w-12 h-12 rounded-xl object-cover ring-2 ring-slate-400"
                  />
                  <span className="absolute -bottom-1 -right-1 text-base">🥈</span>
                </div>
                <div>
                  <h4 className="font-bold text-xs text-[#131b2e] line-clamp-1">{podium.second.name}</h4>
                  <span className="text-[10px] text-[#3d4a42] block">{podium.second.location}</span>
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-slate-200 text-slate-800 inline-block mt-0.5">
                    {TIER_CONFIG[podium.second.tier].label}
                  </span>
                </div>
              </div>

              <div className="pt-2 border-t border-[#bccac0]/25 grid grid-cols-2 gap-2 text-center font-mono">
                <div className="bg-white p-2 rounded-lg border border-[#bccac0]/20">
                  <span className="text-[9px] text-[#3d4a42] block uppercase">Impact Pts</span>
                  <span className="text-xs font-black text-[#006948]">{podium.second.impactPoints.toLocaleString()}</span>
                </div>
                <div className="bg-white p-2 rounded-lg border border-[#bccac0]/20">
                  <span className="text-[9px] text-[#3d4a42] block uppercase">Rescued</span>
                  <span className="text-xs font-black text-amber-700">{podium.second.foodSavedKg.toLocaleString()} kg</span>
                </div>
              </div>
            </div>

            {/* 1st Place - Center Golden Spotlight */}
            <div className="order-1 md:order-2 p-5 rounded-2xl bg-gradient-to-b from-amber-50 to-[#fff8ee] border-2 border-amber-400 flex flex-col justify-between space-y-3 relative overflow-hidden shadow-md transform md:-translate-y-2">
              <div className="absolute top-2 right-2 flex items-center gap-1">
                <span className="text-2xl">👑</span>
                <span className="text-3xl font-black text-amber-400 font-mono">#1</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src={podium.first.avatar}
                    alt={podium.first.name}
                    className="w-14 h-14 rounded-2xl object-cover ring-4 ring-amber-400 shadow-md"
                  />
                  <span className="absolute -bottom-1.5 -right-1 text-lg">🥇</span>
                </div>
                <div>
                  <h4 className="font-headline font-black text-sm text-[#131b2e] leading-snug">
                    {podium.first.name}
                  </h4>
                  <span className="text-[11px] text-[#3d4a42] block">{podium.first.location}</span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-400 text-amber-950 inline-flex items-center gap-1 mt-1 shadow-2xs">
                    <span className="material-symbols-outlined text-xs">stars</span>
                    {TIER_CONFIG[podium.first.tier].label}
                  </span>
                </div>
              </div>

              <div className="pt-2 border-t border-amber-200 grid grid-cols-3 gap-2 text-center font-mono">
                <div className="bg-white p-2 rounded-xl border border-amber-200">
                  <span className="text-[9px] text-[#3d4a42] block uppercase font-bold">Impact Pts</span>
                  <span className="text-sm font-black text-[#006948]">{podium.first.impactPoints.toLocaleString()}</span>
                </div>
                <div className="bg-white p-2 rounded-xl border border-amber-200">
                  <span className="text-[9px] text-[#3d4a42] block uppercase font-bold">Saved Kg</span>
                  <span className="text-sm font-black text-amber-800">{podium.first.foodSavedKg.toLocaleString()} kg</span>
                </div>
                <div className="bg-white p-2 rounded-xl border border-amber-200">
                  <span className="text-[9px] text-[#3d4a42] block uppercase font-bold">Meals</span>
                  <span className="text-sm font-black text-[#131b2e]">{podium.first.mealsRescued.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* 3rd Place */}
            <div className="order-3 p-4 rounded-2xl bg-[#faf8ff] border-2 border-amber-700/40 flex flex-col justify-between space-y-3 relative overflow-hidden shadow-xs hover:shadow-md transition-shadow">
              <div className="absolute top-2 right-2 text-2xl font-black text-amber-700/30 font-mono">#3</div>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src={podium.third.avatar}
                    alt={podium.third.name}
                    className="w-12 h-12 rounded-xl object-cover ring-2 ring-amber-600/70"
                  />
                  <span className="absolute -bottom-1 -right-1 text-base">🥉</span>
                </div>
                <div>
                  <h4 className="font-bold text-xs text-[#131b2e] line-clamp-1">{podium.third.name}</h4>
                  <span className="text-[10px] text-[#3d4a42] block">{podium.third.location}</span>
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-amber-100 text-amber-900 inline-block mt-0.5">
                    {TIER_CONFIG[podium.third.tier].label}
                  </span>
                </div>
              </div>

              <div className="pt-2 border-t border-[#bccac0]/25 grid grid-cols-2 gap-2 text-center font-mono">
                <div className="bg-white p-2 rounded-lg border border-[#bccac0]/20">
                  <span className="text-[9px] text-[#3d4a42] block uppercase">Impact Pts</span>
                  <span className="text-xs font-black text-[#006948]">{podium.third.impactPoints.toLocaleString()}</span>
                </div>
                <div className="bg-white p-2 rounded-lg border border-[#bccac0]/20">
                  <span className="text-[9px] text-[#3d4a42] block uppercase">Rescued</span>
                  <span className="text-xs font-black text-amber-700">{podium.third.foodSavedKg.toLocaleString()} kg</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filter and Control Toolbar */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#bccac0]/30 shadow-xs space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Sort Metrics Selector */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-[#131b2e] mr-1 flex items-center gap-1">
              <span className="material-symbols-outlined text-sm text-[#006948]">sort</span>
              Rank By:
            </span>

            <div className="inline-flex rounded-xl p-1 bg-[#eaedff] border border-[#bccac0]/30 text-xs font-bold">
              <button
                type="button"
                onClick={() => setSortMetric('points')}
                className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                  sortMetric === 'points'
                    ? 'bg-[#006948] text-white shadow-xs'
                    : 'text-[#3d4a42] hover:text-[#131b2e]'
                }`}
              >
                <span className="material-symbols-outlined text-sm">stars</span>
                <span>Impact Points (Pts)</span>
              </button>

              <button
                type="button"
                onClick={() => setSortMetric('kg')}
                className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                  sortMetric === 'kg'
                    ? 'bg-[#006948] text-white shadow-xs'
                    : 'text-[#3d4a42] hover:text-[#131b2e]'
                }`}
              >
                <span className="material-symbols-outlined text-sm">scale</span>
                <span>Food Saved (kg)</span>
              </button>

              <button
                type="button"
                onClick={() => setSortMetric('meals')}
                className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                  sortMetric === 'meals'
                    ? 'bg-[#006948] text-white shadow-xs'
                    : 'text-[#3d4a42] hover:text-[#131b2e]'
                }`}
              >
                <span className="material-symbols-outlined text-sm">soup_kitchen</span>
                <span>Hot Meals Rescued</span>
              </button>
            </div>
          </div>

          {/* Time Window Tabs */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#131b2e] mr-1 hidden sm:inline">Timeframe:</span>
            <div className="inline-flex rounded-xl p-1 bg-[#f2f3ff] border border-[#bccac0]/30 text-xs font-bold">
              <button
                type="button"
                onClick={() => setTimeFrame('all')}
                className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                  timeFrame === 'all'
                    ? 'bg-white text-[#006948] shadow-xs'
                    : 'text-[#3d4a42] hover:text-[#131b2e]'
                }`}
              >
                All-Time
              </button>
              <button
                type="button"
                onClick={() => setTimeFrame('month')}
                className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                  timeFrame === 'month'
                    ? 'bg-white text-[#006948] shadow-xs'
                    : 'text-[#3d4a42] hover:text-[#131b2e]'
                }`}
              >
                This Month
              </button>
              <button
                type="button"
                onClick={() => setTimeFrame('week')}
                className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                  timeFrame === 'week'
                    ? 'bg-white text-[#006948] shadow-xs'
                    : 'text-[#3d4a42] hover:text-[#131b2e]'
                }`}
              >
                This Week
              </button>
            </div>
          </div>
        </div>

        {/* Search & Category Filter */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2 border-t border-[#bccac0]/20">
          <div className="relative flex-1">
            <span className="material-symbols-outlined absolute left-3 top-2.5 text-lg text-[#3d4a42]">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search donor kitchen, banquet hall, or corridor city..."
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-[#faf8ff] border border-[#bccac0]/40 focus:border-[#006948] focus:ring-1 focus:ring-[#006948] outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-2.5 text-xs text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 overflow-x-auto text-xs pb-1 sm:pb-0">
            <span className="text-[11px] font-bold text-[#3d4a42] shrink-0">Type:</span>
            {[
              { id: 'all', label: 'All Kitchens' },
              { id: 'Banquet Hall', label: 'Banquets' },
              { id: 'Hotel & Restaurant', label: 'Hotels' },
              { id: 'Langar / Religious Trust', label: 'Langars' },
              { id: 'Sweet Shop & Halwai', label: 'Halwais' },
            ].map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setCategoryFilter(cat.id)}
                className={`px-2.5 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors cursor-pointer ${
                  categoryFilter === cat.id
                    ? 'bg-[#006948] text-white font-bold'
                    : 'bg-[#faf8ff] text-[#3d4a42] hover:bg-[#eaedff] border border-[#bccac0]/30'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Leaderboard Table / Cards */}
      <div className="space-y-3">
        {filteredAndSortedDonors.length === 0 ? (
          <div className="bg-white p-12 text-center rounded-2xl border border-[#bccac0]/30 space-y-3">
            <span className="material-symbols-outlined text-4xl text-[#3d4a42]">search_off</span>
            <div className="font-bold text-sm text-[#131b2e]">No matching donors found</div>
            <p className="text-xs text-[#3d4a42]">Try broadening your search term or selecting &apos;All Kitchens&apos;.</p>
          </div>
        ) : (
          filteredAndSortedDonors.map((donor) => {
            const isTop3 = donor.computedRank <= 3;
            const tierMeta = TIER_CONFIG[donor.tier];

            const currentMetricValue =
              sortMetric === 'points'
                ? (timeFrame === 'all'
                    ? donor.impactPoints
                    : timeFrame === 'month'
                    ? donor.monthPoints
                    : donor.weekPoints
                  ).toLocaleString() + ' Pts'
                : sortMetric === 'kg'
                ? (timeFrame === 'all'
                    ? donor.foodSavedKg
                    : timeFrame === 'month'
                    ? donor.monthKg
                    : donor.weekKg
                  ).toLocaleString() + ' kg'
                : (
                    (timeFrame === 'all'
                      ? donor.foodSavedKg
                      : timeFrame === 'month'
                      ? donor.monthKg
                      : donor.weekKg) * 3
                  ).toLocaleString() + ' Meals';

            return (
              <div
                key={donor.id}
                id={`donor-card-${donor.id}`}
                className={`p-4 sm:p-5 rounded-2xl transition-all duration-300 border flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                  donor.isCurrentUser
                    ? 'bg-emerald-50/70 border-2 border-[#006948] shadow-md ring-2 ring-[#006948]/20'
                    : isTop3
                    ? 'bg-white border-[#bccac0]/40 shadow-xs hover:border-[#006948]/60 hover:shadow-sm'
                    : 'bg-white border-[#bccac0]/30 shadow-2xs hover:border-[#bccac0]'
                }`}
              >
                {/* Left: Rank, Avatar & Donor Details */}
                <div className="flex items-center gap-3 sm:gap-4">
                  {/* Rank Badge */}
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 font-headline font-black text-sm">
                    {donor.computedRank === 1 ? (
                      <span className="w-9 h-9 rounded-xl bg-amber-400 text-amber-950 flex items-center justify-center shadow-xs">
                        1
                      </span>
                    ) : donor.computedRank === 2 ? (
                      <span className="w-9 h-9 rounded-xl bg-slate-300 text-slate-800 flex items-center justify-center shadow-xs">
                        2
                      </span>
                    ) : donor.computedRank === 3 ? (
                      <span className="w-9 h-9 rounded-xl bg-amber-700 text-amber-100 flex items-center justify-center shadow-xs">
                        3
                      </span>
                    ) : (
                      <span className="text-[#3d4a42] font-mono text-sm">
                        #{donor.computedRank}
                      </span>
                    )}
                  </div>

                  {/* Avatar */}
                  <div className="relative shrink-0">
                    <img
                      src={donor.avatar}
                      alt={donor.name}
                      className="w-12 h-12 rounded-xl object-cover ring-2 ring-[#bccac0]/30"
                    />
                    <span className="absolute -bottom-1 -right-1 text-xs">
                      {donor.tier === 'diamond' ? '💎' : donor.tier === 'gold' ? '🥇' : donor.tier === 'silver' ? '🥈' : '🥉'}
                    </span>
                  </div>

                  {/* Info */}
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="font-headline font-bold text-xs sm:text-sm text-[#131b2e]">
                        {donor.name}
                      </h4>
                      {donor.isCurrentUser && (
                        <span className="px-2 py-0.5 rounded-full bg-[#006948] text-white text-[10px] font-bold">
                          YOU
                        </span>
                      )}
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${tierMeta.badgeBg}`}>
                        {tierMeta.label}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 text-xs text-[#3d4a42]">
                      <span className="font-medium">{donor.type}</span>
                      <span>•</span>
                      <span>{donor.location}</span>
                      <span>•</span>
                      <span className="text-orange-600 font-bold flex items-center gap-0.5 font-mono">
                        <span>🔥</span> {donor.streakDays}d streak
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-[11px] text-[#3d4a42]/80 font-mono">
                      <span>FSSAI: <strong>{donor.fssaiNumber}</strong></span>
                      <span>HACCP Pass: <strong className="text-[#006948]">{donor.haccpPassRate}%</strong></span>
                      <span className="hidden sm:inline">Specialty: <strong>{donor.primaryDishType}</strong></span>
                    </div>
                  </div>
                </div>

                {/* Right: Key Metric Figures & Action */}
                <div className="flex items-center justify-between md:justify-end gap-4 sm:gap-6 pt-3 md:pt-0 border-t md:border-t-0 border-[#bccac0]/25 shrink-0">
                  <div className="text-left md:text-right">
                    <div className="text-[10px] text-[#3d4a42] font-semibold uppercase tracking-wider">
                      {sortMetric === 'points' ? 'Impact Points' : sortMetric === 'kg' ? 'Food Saved' : 'Meals Rescued'}
                    </div>
                    <div className="font-headline font-black text-base sm:text-lg text-[#006948] font-mono">
                      {currentMetricValue}
                    </div>
                    <div className="text-[10px] text-[#3d4a42] font-mono">
                      {donor.foodSavedKg.toLocaleString()} kg · {donor.mealsRescued.toLocaleString()} meals
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedDonorForModal(donor)}
                    className="px-3 py-1.5 rounded-lg bg-[#faf8ff] hover:bg-[#eaedff] border border-[#bccac0]/40 text-[#131b2e] font-bold text-xs flex items-center gap-1 transition-colors cursor-pointer shadow-2xs"
                  >
                    <span>View Audit</span>
                    <span className="material-symbols-outlined text-sm">visibility</span>
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Tier Explanation Modal */}
      {showTierGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#bccac0]/30 p-6 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#bccac0]/20">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#006948] text-2xl">workspace_premium</span>
                <h3 className="font-headline font-bold text-lg text-[#131b2e]">
                  Tiered Badge System &amp; Sovereign Perks
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowTierGuide(false)}
                className="p-1 rounded-full text-gray-500 hover:bg-gray-100"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="space-y-4">
              {(Object.keys(TIER_CONFIG) as DonorTier[]).map((tierKey) => {
                const conf = TIER_CONFIG[tierKey];
                return (
                  <div key={tierKey} className="p-4 rounded-2xl bg-[#faf8ff] border border-[#bccac0]/30 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${conf.badgeBg}`}>
                          {conf.label}
                        </span>
                      </div>
                      <span className="text-xs font-mono font-bold text-[#006948]">
                        &gt;{conf.minPoints.toLocaleString()} Pts / {conf.minKg.toLocaleString()} kg
                      </span>
                    </div>

                    <p className="text-xs text-[#3d4a42] leading-relaxed">
                      {conf.description}
                    </p>

                    <div className="text-[11px] bg-white p-2.5 rounded-xl border border-[#bccac0]/20 text-[#006948] font-semibold flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-sm text-amber-500">verified</span>
                      <span>Perk: {conf.perk}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => setShowTierGuide(false)}
              className="w-full py-2.5 rounded-xl bg-[#006948] text-white font-bold text-xs hover:bg-[#005238] transition-colors"
            >
              Got it, close guide
            </button>
          </div>
        </div>
      )}

      {/* Selected Donor Audit Drawer / Modal */}
      {selectedDonorForModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#bccac0]/30 p-6 space-y-5">
            <div className="flex items-start justify-between pb-3 border-b border-[#bccac0]/20">
              <div className="flex items-center gap-3">
                <img
                  src={selectedDonorForModal.avatar}
                  alt={selectedDonorForModal.name}
                  className="w-14 h-14 rounded-2xl object-cover ring-2 ring-[#006948]"
                />
                <div>
                  <h4 className="font-headline font-bold text-sm text-[#131b2e]">
                    {selectedDonorForModal.name}
                  </h4>
                  <div className="text-xs text-[#3d4a42]">{selectedDonorForModal.location}</div>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${TIER_CONFIG[selectedDonorForModal.tier].badgeBg} inline-block mt-1`}>
                    {TIER_CONFIG[selectedDonorForModal.tier].label}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedDonorForModal(null)}
                className="p-1 rounded-full text-gray-500 hover:bg-gray-100"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {/* Audit Numbers */}
            <div className="grid grid-cols-2 gap-3 font-mono text-center">
              <div className="bg-[#faf8ff] p-3 rounded-xl border border-[#bccac0]/30">
                <span className="text-[10px] text-[#3d4a42] block uppercase font-sans font-bold">Total Rescued</span>
                <span className="text-base font-black text-[#006948]">{selectedDonorForModal.foodSavedKg.toLocaleString()} kg</span>
              </div>
              <div className="bg-[#faf8ff] p-3 rounded-xl border border-[#bccac0]/30">
                <span className="text-[10px] text-[#3d4a42] block uppercase font-sans font-bold">Impact Karma</span>
                <span className="text-base font-black text-amber-800">{selectedDonorForModal.impactPoints.toLocaleString()} Pts</span>
              </div>
              <div className="bg-[#faf8ff] p-3 rounded-xl border border-[#bccac0]/30">
                <span className="text-[10px] text-[#3d4a42] block uppercase font-sans font-bold">Hot Meals Served</span>
                <span className="text-base font-black text-[#131b2e]">{selectedDonorForModal.mealsRescued.toLocaleString()}</span>
              </div>
              <div className="bg-[#faf8ff] p-3 rounded-xl border border-[#bccac0]/30">
                <span className="text-[10px] text-[#3d4a42] block uppercase font-sans font-bold">Emissions Avoided</span>
                <span className="text-base font-black text-emerald-600">{(selectedDonorForModal.co2eAvoidedKg / 1000).toFixed(1)} T</span>
              </div>
            </div>

            {/* Compliance details */}
            <div className="p-3.5 rounded-xl bg-[#e2f7ec] border border-[#006948]/30 space-y-1 text-xs">
              <div className="font-bold text-[#006948] flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">verified_user</span>
                <span>FSSAI Sec 31-C Good Samaritan Immunity Verified</span>
              </div>
              <div className="text-[11px] text-[#3d4a42]">
                License: <strong>{selectedDonorForModal.fssaiNumber}</strong> · HACCP Compliance: <strong>{selectedDonorForModal.haccpPassRate}%</strong>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setSelectedDonorForModal(null)}
              className="w-full py-2.5 rounded-xl bg-[#006948] text-white font-bold text-xs hover:bg-[#005238] transition-colors"
            >
              Close Audit Card
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
