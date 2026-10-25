import React, { useState, useEffect } from 'react';
import { DonorReceiverSubTab, FoodCategory, InboundConsignment } from '../types.ts';
import { LocationSelector } from './LocationSelector.tsx';
import { calculateDecayWindow, calculateEmissionsDiverted } from '../utils/rescueMath.ts';
import { DEFAULT_DONOR_PROFILE } from './DonorProfileModal.tsx';
import { DonationHistoryTimeline, INITIAL_RESCUE_OPERATIONS } from './DonationHistoryTimeline.tsx';

interface DonorReceiverPortalProps {
  initialSubTab?: DonorReceiverSubTab;
  onDispatchToFleet?: (data: any) => void;
}

export const DonorReceiverPortal: React.FC<DonorReceiverPortalProps> = ({
  initialSubTab = 'donate',
  onDispatchToFleet,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<DonorReceiverSubTab>(initialSubTab);

  // Sync sub-tab if prop changes
  useEffect(() => {
    setActiveSubTab(initialSubTab);
  }, [initialSubTab]);

  // Food Categories - ONLY displaying the TYPE/CATEGORY as requested by user
  const foodCategories: FoodCategory[] = [
    {
      id: 'legume-gravy',
      name: 'Legume / Wet Curry',
      description: 'Lentils, Dal, Chana, Sambar',
      icon: 'soup_kitchen',
      defaultTemp: 71.8,
      baseSafeMinutes: 208,
    },
    {
      id: 'dairy-rich',
      name: 'Dairy / Rich Gravy',
      description: 'Paneer, Cream, Makhani, Kofta',
      icon: 'restaurant',
      defaultTemp: 72.0,
      baseSafeMinutes: 180,
    },
    {
      id: 'baked-grain',
      name: 'Baked Grain / Breads',
      description: 'Roti, Naan, Paratha, Kulcha',
      icon: 'bakery_dining',
      defaultTemp: 68.0,
      baseSafeMinutes: 245,
    },
    {
      id: 'steamed-rice',
      name: 'Steamed Rice & Pulses',
      description: 'Basmati Rice, Pulao, Khichdi',
      icon: 'rice_bowl',
      defaultTemp: 76.2,
      baseSafeMinutes: 210,
    },
    {
      id: 'sweets-dessert',
      name: 'Sweets & Desserts',
      description: 'Kheer, Halwa, Gulab Jamun',
      icon: 'cake',
      defaultTemp: 65.0,
      baseSafeMinutes: 195,
    },
    {
      id: 'dry-sabzi',
      name: 'Dry Sabzi / Mixed Veg',
      description: 'Aloo Gobhi, Bhindi, Mix Veg',
      icon: 'nutrition',
      defaultTemp: 70.0,
      baseSafeMinutes: 220,
    },
  ];

  // Donor form state
  const [selectedCategory, setSelectedCategory] = useState<FoodCategory>(foodCategories[0]);
  const [typedFoodName, setTypedFoodName] = useState('Dal Makhani & Jeera Rice');
  const [portions, setPortions] = useState(120);
  const [cookingTime, setCookingTime] = useState('21:15');
  const [dietary, setDietary] = useState<'veg' | 'jain' | 'halal'>('veg');
  const [donorKitchenName, setDonorKitchenName] = useState('Haveli Banquets & Heritage Kitchen');
  const [dispatchMode, setDispatchMode] = useState<'ngo-fleet' | 'self-deliver'>('ngo-fleet');

  // Location for Donor Pickup
  const [donorLocation, setDonorLocation] = useState({
    lat: 31.3260,
    lng: 75.5762,
    address: 'GT Road, Jalandhar Bypass, Punjab',
    method: 'map' as 'gps' | 'map',
  });

  // Vision scanner state
  const [isScanning, setIsScanning] = useState(false);
  const [thermalTemp, setThermalTemp] = useState(71.8);
  const [steamVapor, setSteamVapor] = useState(97.4);
  const [freshnessGrade, setFreshnessGrade] = useState(98);
  const [modelConfidence, setModelConfidence] = useState(99.4);

  // Inbound Consignments for Receivers
  const [inboundDeliveries, setInboundDeliveries] = useState<InboundConsignment[]>([
    {
      id: 'in-1',
      dispatchId: 'NL-JAL-8841',
      foodName: 'Dal Makhani & Basmati Pulao',
      foodType: 'Legume / Wet Curry',
      portions: 180,
      donorName: 'Phagwara Palace Resort',
      driverName: 'Gurpreet Singh',
      driverPhone: '+91 98765-43210',
      etaMinutes: 11,
      status: 'En Route',
      tempReading: '69.4°C Hot Hold',
      haccpSafe: true,
      tamperSealCode: 'SEAL-8921-PB',
    },
    {
      id: 'in-2',
      dispatchId: 'NL-LD-9902',
      foodName: 'Kheer & Sweetened Rice Cups',
      foodType: 'Sweets & Desserts',
      portions: 140,
      donorName: 'Haveli Heritage Kitchen',
      driverName: 'Manjit Kaur (E-Rickshaw)',
      driverPhone: '+91 98140-55214',
      etaMinutes: 8,
      status: 'En Route',
      tempReading: '3.8°C Chilled Safe',
      haccpSafe: true,
      tamperSealCode: 'SEAL-4401-ER',
    },
  ]);

  // Request Food Aid form state
  const [reqShelterName, setReqShelterName] = useState('');
  const [reqHeadcount, setReqHeadcount] = useState(75);
  const [reqMealType, setReqMealType] = useState('Hot Cooked Dinner (Khichdi or Curry-Rice)');
  const [reqUrgency, setReqUrgency] = useState('Within 45 Mins');
  const [reqLocation, setReqLocation] = useState({
    lat: 31.3260,
    lng: 75.5762,
    address: 'GT Road Sector, Punjab',
    method: 'map' as 'gps' | 'map',
  });

  const [toast, setToast] = useState<{ title: string; message: string } | null>(null);

  // Countdown timer
  const [countdownSeconds, setCountdownSeconds] = useState(3 * 3600 + 28 * 60 + 44);
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdownSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatCountdown = (sec: number) => {
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = sec % 60;
    return `0${h}:${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const showToast = (title: string, message: string) => {
    setToast(null);
    setTimeout(() => {
      setToast({ title, message });
    }, 50);
    setTimeout(() => {
      setToast(null);
    }, 4500);
  };

  const handleRunScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      const newTemp = parseFloat((70.5 + Math.random() * 3.5).toFixed(1));
      const newSteam = parseFloat((96.0 + Math.random() * 3.5).toFixed(1));
      const newGrade = 98 + Math.floor(Math.random() * 2);
      const newConf = parseFloat((99.1 + Math.random() * 0.8).toFixed(1));

      setThermalTemp(newTemp);
      setSteamVapor(newSteam);
      setFreshnessGrade(newGrade);
      setModelConfidence(newConf);
      setIsScanning(false);

      showToast(
        'Vision AI Verification Complete',
        `Food: "${typedFoodName}" | Category: ${selectedCategory.name} | Thermal: ${newTemp}°C | Grade ${newGrade}/100 FSSAI Compliant`
      );
    }, 1200);
  };

  const handleBroadcastRescue = () => {
    showToast(
      'Rescue Consignment Dispatched!',
      `Logged ${portions} portions of "${typedFoodName}" (${selectedCategory.name}) from ${donorKitchenName}. Location: ${donorLocation.address}. FSSAI legal immunity anchored.`
    );
    if (onDispatchToFleet) {
      onDispatchToFleet({
        foodName: typedFoodName,
        category: selectedCategory.name,
        portions,
        donorName: donorKitchenName,
        location: donorLocation,
      });
    }
  };

  const handleReceiverVerifyHandover = (id: string) => {
    setInboundDeliveries((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: 'Verified Handover' } : item))
    );
    showToast(
      'Consignment Handover Confirmed!',
      'Tamper-seal verified intact. Beneficiary dignity tokens signed and logged.'
    );
  };

  const handleRequestAidSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showToast(
      'Emergency Aid Request Transmitted!',
      `Request for ${reqHeadcount} meals at "${reqShelterName}" broadcasted to GT Road autonomous fleet dispatchers.`
    );
    setReqShelterName('');
  };

  const weightKg = Math.round(portions * 0.35);
  const emissions = calculateEmissionsDiverted(portions);
  const decayPhysics = calculateDecayWindow(selectedCategory.name);

  return (
    <div className="flex flex-col w-full pb-12">
      {/* Top Portal Banner with Sub-Nav Switcher */}
      <div className="w-full bg-[#f2f3ff] px-4 md:px-6 py-4 border-b border-[#bccac0]/30 shadow-xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#85f8c4] text-[#002114] text-xs font-bold uppercase tracking-wider">
                Community Portal
              </span>
              <span className="text-xs text-[#3d4a42] font-semibold">Donors, Receivers &amp; Shelters</span>
            </div>
            <h1 className="font-headline font-extrabold text-2xl lg:text-3xl text-[#006948] tracking-tight mt-0.5">
              Donor &amp; Receiver Community Portal
            </h1>
            <p className="text-xs text-[#3d4a42] max-w-2xl mt-0.5">
              Log commercial surplus, track inbound delivery vans to unhoused shelters, and request
              free emergency hot meals under FSSAI Section 31(C) Good Samaritan protection.
            </p>
          </div>

          {/* Sub-Tab Navigation */}
          <div className="flex items-center p-1 bg-[#eaedff] rounded-xl border border-[#bccac0]/30 gap-1">
            <button
              onClick={() => setActiveSubTab('donate')}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeSubTab === 'donate'
                  ? 'bg-[#006948] text-white shadow-sm'
                  : 'text-[#3d4a42] hover:bg-white hover:text-[#131b2e]'
              }`}
            >
              <span className="material-symbols-outlined text-base">soup_kitchen</span>
              <span>1. Donate Food Surplus</span>
            </button>

            <button
              onClick={() => setActiveSubTab('receive')}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeSubTab === 'receive'
                  ? 'bg-[#006948] text-white shadow-sm'
                  : 'text-[#3d4a42] hover:bg-white hover:text-[#131b2e]'
              }`}
            >
              <span className="material-symbols-outlined text-base">night_shelter</span>
              <span>2. Receiver / Shelter Hub</span>
            </button>

            <button
              onClick={() => setActiveSubTab('request-aid')}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeSubTab === 'request-aid'
                  ? 'bg-[#006948] text-white shadow-sm'
                  : 'text-[#3d4a42] hover:bg-white hover:text-[#131b2e]'
              }`}
            >
              <span className="material-symbols-outlined text-base">emergency_share</span>
              <span>3. Request Food Aid</span>
            </button>

            <button
              onClick={() => setActiveSubTab('rewards')}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeSubTab === 'rewards'
                  ? 'bg-[#006948] text-white shadow-sm'
                  : 'text-[#3d4a42] hover:bg-white hover:text-[#131b2e]'
              }`}
            >
              <span className="material-symbols-outlined text-base">military_tech</span>
              <span>4. Gamified Impact &amp; Rewards</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Sub-Tab Views */}
      <div className="max-w-7xl mx-auto w-full px-4 md:px-6 py-6">
        {/* SUB-TAB 1: DONATE FOOD SURPLUS */}
        {activeSubTab === 'donate' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column (7 cols): Food Type Selector, Typing Dish Name, Volume, Location */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-[#bccac0]/30 space-y-5">
                <div className="flex items-center justify-between pb-3 -mx-6 -mt-6 p-4 bg-[#f2f3ff] rounded-t-xl border-b border-[#bccac0]/20">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#006948] text-xl">fastfood</span>
                    <h2 className="font-headline font-bold text-base text-[#131b2e]">
                      Surplus Food Intake (Category &amp; Dish Details)
                    </h2>
                  </div>
                  <span className="text-xs px-2 py-0.5 rounded bg-[#e2e7ff] text-[#3d4a42] font-semibold">
                    Step 1 of 3
                  </span>
                </div>

                {/* Donor Kitchen Name */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#131b2e] uppercase tracking-wider block">
                    Donor Kitchen / Commercial Facility Name
                  </label>
                  <input
                    type="text"
                    required
                    value={donorKitchenName}
                    onChange={(e) => setDonorKitchenName(e.target.value)}
                    className="w-full px-3 py-2 bg-[#f2f3ff] text-xs font-bold text-[#131b2e] rounded-lg border border-[#bccac0]/30 focus:outline-none focus:ring-1 focus:ring-[#006948]"
                  />
                </div>

                {/* Cooked Food Type (Showing ONLY the Category/Type of Food as Requested!) */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-[#131b2e] uppercase tracking-wider block">
                      Cooked Food Type (Select Primary Category)
                    </label>
                    <span className="text-[11px] text-[#006948] font-bold">
                      Selected: {selectedCategory.name}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {foodCategories.map((cat) => {
                      const isSelected = selectedCategory.id === cat.id;
                      return (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => {
                            setSelectedCategory(cat);
                            setThermalTemp(cat.defaultTemp);
                          }}
                          className={`flex flex-col items-center justify-center p-3 rounded-xl transition-all text-center cursor-pointer border ${
                            isSelected
                              ? 'bg-[#00855d] text-[#f5fff7] shadow-sm border-[#006948]'
                              : 'bg-[#eaedff] text-[#131b2e] hover:bg-[#e2e7ff] border-transparent'
                          }`}
                        >
                          <span className="material-symbols-outlined text-2xl mb-1">{cat.icon}</span>
                          {/* Showing ONLY the Type/Category name here! */}
                          <span className="text-xs font-bold leading-tight">{cat.name}</span>
                          <span className={`text-[10px] mt-0.5 ${isSelected ? 'text-[#f5fff7]/85' : 'text-[#3d4a42]'}`}>
                            {cat.description}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Text Input for Typing Specific Food Name (As explicitly requested by the user!) */}
                <div className="space-y-1.5 bg-[#eaedff]/60 p-4 rounded-xl border border-[#006948]/20">
                  <label className="text-xs font-bold text-[#131b2e] flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-base text-[#006948]">edit_note</span>
                      Type Specific Food / Dish Name
                    </span>
                    <span className="text-[10px] text-[#3d4a42] font-semibold">Enter recipe details</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Kadhai Paneer &amp; Butter Tandoori Roti, Dal Tadka with Jeera Rice..."
                    value={typedFoodName}
                    onChange={(e) => setTypedFoodName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white text-sm font-semibold text-[#131b2e] rounded-lg border border-[#bccac0]/40 focus:outline-none focus:ring-2 focus:ring-[#006948]"
                  />
                  <div className="flex flex-wrap items-center gap-1.5 pt-1 text-[11px] text-[#3d4a42]">
                    <span className="font-semibold">Quick Suggestions:</span>
                    {['Dal Makhani & Basmati Rice', 'Paneer Butter Masala', 'Tandoori Roti & Mixed Veg', 'Khichdi & Mixed Lentils'].map((sug) => (
                      <button
                        key={sug}
                        type="button"
                        onClick={() => setTypedFoodName(sug)}
                        className="px-2 py-0.5 bg-white rounded border border-[#bccac0]/30 hover:bg-[#eaedff] text-[#006948] font-medium cursor-pointer"
                      >
                        {sug}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity Slider */}
                <div className="bg-[#f2f3ff] p-4 rounded-xl border border-[#bccac0]/20 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#131b2e]">Surplus Volume / Estimated Yield</span>
                    <div className="flex items-baseline gap-1">
                      <span className="font-headline font-bold text-xl text-[#006948] font-mono">{portions}</span>
                      <span className="text-xs text-[#3d4a42]">Meals (~{weightKg} kg)</span>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="600"
                    step="10"
                    value={portions}
                    onChange={(e) => setPortions(parseInt(e.target.value, 10))}
                    className="w-full accent-[#006948] h-2 bg-[#dae2fd] rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-[#3d4a42] font-medium">
                    <span>Small Banquet (20)</span>
                    <span>Medium Hall (250)</span>
                    <span>Mega Gala (600+)</span>
                  </div>
                </div>

                {/* Cooking Time & Dietary Profile */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#131b2e]">Cooking Completion Time</label>
                    <div className="flex items-center gap-2 bg-[#eaedff] p-2.5 rounded-lg border border-[#bccac0]/20">
                      <span className="material-symbols-outlined text-[#006948] text-xl">schedule</span>
                      <input
                        type="time"
                        value={cookingTime}
                        onChange={(e) => setCookingTime(e.target.value)}
                        className="bg-transparent text-sm font-bold text-[#131b2e] focus:outline-none w-full"
                      />
                      <span className="text-[11px] text-[#3d4a42] whitespace-nowrap">IST (Tonight)</span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#131b2e]">Dietary &amp; Sanctity Profile</label>
                    <div className="flex items-center gap-1 bg-[#eaedff] p-1 rounded-lg border border-[#bccac0]/20">
                      {[
                        { id: 'veg', label: 'Pure Veg' },
                        { id: 'jain', label: 'Jain Safe' },
                        { id: 'halal', label: 'Halal/NV' },
                      ].map((d) => (
                        <button
                          key={d.id}
                          type="button"
                          onClick={() => {
                            setDietary(d.id as any);
                            showToast('Dietary Flag Updated', `Sanctity protocol set to: ${d.label.toUpperCase()}`);
                          }}
                          className={`flex-1 py-1.5 px-2 rounded-md text-xs font-bold transition-all cursor-pointer ${
                            dietary === d.id
                              ? 'bg-[#006948] text-white shadow-sm'
                              : 'text-[#131b2e] hover:bg-[#e2e7ff]'
                          }`}
                        >
                          {d.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Location Marking with 2 Options (GPS & Map Click) as requested! */}
                <LocationSelector
                  initialLat={donorLocation.lat}
                  initialLng={donorLocation.lng}
                  initialAddress={donorLocation.address}
                  onLocationChange={(loc) => setDonorLocation(loc)}
                />
              </div>

              {/* Arrhenius Microbial Decay Physics Card */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-[#bccac0]/30 space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-[#bccac0]/20">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#904d00] text-xl">thermostat</span>
                    <h3 className="font-headline font-bold text-sm text-[#131b2e]">
                      Predictive Thermal Shelf-Life Window
                    </h3>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-[#ffdcc3] text-[#2f1500] text-xs font-bold">
                    Arrhenius Calculation
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-[#f2f3ff] p-4 rounded-xl border border-[#bccac0]/20 space-y-1">
                    <span className="text-[10px] text-[#3d4a42] uppercase font-bold">Safe Consumption Window</span>
                    <div className="font-headline font-extrabold text-2xl text-[#006948] font-mono">
                      {formatCountdown(countdownSeconds)}
                    </div>
                    <span className="text-[11px] text-[#3d4a42] block">
                      Category "{selectedCategory.name}" safe holding window: ~{decayPhysics.safeMinutes} mins
                    </span>
                  </div>

                  <div className="bg-[#f2f3ff] p-4 rounded-xl border border-[#bccac0]/20 space-y-1">
                    <span className="text-[10px] text-[#3d4a42] uppercase font-bold">Good Samaritan Safe Harbor</span>
                    <div className="text-xs font-bold text-[#006948] flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">verified_user</span>
                      Section 31(C) Statutory Indemnity
                    </div>
                    <span className="text-[11px] text-[#3d4a42] block">
                      Protected against donor liability upon verified transfer.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column (5 cols): AI Vision Scanner & Manifest */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              {/* Edge AI Vision Scanner */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-[#bccac0]/30 space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-[#bccac0]/20">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#006948] text-xl">photo_camera</span>
                    <h3 className="font-headline font-bold text-base text-[#131b2e]">
                      Snap-to-Verify Vision AI
                    </h3>
                  </div>
                  <span className="text-xs px-2 py-0.5 rounded bg-[#85f8c4] text-[#002114] font-bold">
                    Edge ML ResNet-50
                  </span>
                </div>

                {/* Camera Viewport */}
                <div className="relative w-full aspect-video bg-[#131b2e] rounded-xl overflow-hidden shadow-inner flex flex-col justify-between p-3">
                  <img
                    alt="Thermal culinary tray view"
                    className="absolute inset-0 w-full h-full object-cover opacity-85 pointer-events-none"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAItXNOgQhhNPkGpWe-TyJqy4rLt_K6aYtxiZCTGT4ylRnfcASaYZ1DhkYdcjXRAbz76Ot754YOXPSSFkOXBF89ATiHzr0k-PtvzbDHjBGDPxH4X8NccdwZu9FZCxOIpkMOgJXiZfIMPBOj-Bgj0sO_M3TwxgKurPjBAjhiz53ma8_UJXboGf1JbN0K2OZINb0JYZqtGZ8dKoN9g-MsSbpIpMaI1PJTO7URVvYNGsKxSDfO6xmHuTijbw"
                  />

                  <div className="relative z-10 flex items-center justify-between font-mono font-bold text-[10px] text-white bg-black/60 backdrop-blur-md px-2 py-1 rounded">
                    <span className="flex items-center gap-1 text-[#ba1a1a]">
                      <span className="w-2 h-2 rounded-full bg-[#ba1a1a] animate-ping"></span>
                      LIVE SENSOR FEED
                    </span>
                    <span className="text-[#85f8c4]">CONFIDENCE: {modelConfidence}%</span>
                  </div>

                  {/* Bounding Box Annotated with Typed Food Name */}
                  <div className="relative z-10 my-auto w-full px-2">
                    <div
                      className={`w-4/5 mx-auto p-2 rounded bg-[#006948]/20 border-2 border-[#85f8c4] transition-all duration-500 ${
                        isScanning ? 'scale-95 opacity-60' : ''
                      }`}
                    >
                      <div className="flex justify-between items-start font-mono font-bold text-[10px]">
                        <span className="bg-[#006948] text-white px-1.5 py-0.5 rounded truncate max-w-[170px]">
                          {typedFoodName.toUpperCase()}
                        </span>
                        <span className="bg-black/80 text-[#85f8c4] px-1.5 py-0.5 rounded">
                          TYPE: {selectedCategory.name.toUpperCase()}
                        </span>
                      </div>
                      <div className="h-12 flex items-center justify-center">
                        <span className={`material-symbols-outlined text-2xl text-[#85f8c4] ${isScanning ? 'animate-spin' : ''}`}>
                          data_saver_on
                        </span>
                      </div>
                      <div className="flex justify-between items-end font-mono text-[10px] text-white bg-black/80 p-1 rounded">
                        <span className="text-[#ffdcc3]">TEMP_IR: {thermalTemp}°C</span>
                        <span className="text-[#85f8c4]">FSSAI GRADE: A+</span>
                      </div>
                    </div>
                  </div>

                  <div className="relative z-10 flex items-center justify-between text-[11px] text-white bg-black/60 backdrop-blur-md px-2.5 py-1 rounded">
                    <span>Vapor: {steamVapor}% Peak</span>
                    <span className="text-[#85f8c4] font-bold">Hot Holding Safe</span>
                  </div>
                </div>

                {/* Scan Button */}
                <button
                  type="button"
                  disabled={isScanning}
                  onClick={handleRunScan}
                  className="w-full py-2.5 bg-[#006948] text-white text-xs font-bold rounded-lg shadow-sm hover:bg-[#00855d] transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-75"
                >
                  <span className={`material-symbols-outlined text-base ${isScanning ? 'animate-spin' : ''}`}>
                    {isScanning ? 'refresh' : 'auto_fix_high'}
                  </span>
                  <span>{isScanning ? 'Evaluating Sensory Array...' : 'Re-Scan Trays with Sensory AI'}</span>
                </button>
              </div>

              {/* Legal Manifest & Final Dispatch */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-[#bccac0]/30 space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-[#bccac0]/20">
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[#006948] text-xl">verified_user</span>
                    <h3 className="font-headline font-bold text-base text-[#131b2e]">
                      FSSAI Digital Rescue Manifest
                    </h3>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-[#006948] text-white font-bold">
                    Sec. 31(C)
                  </span>
                </div>

                <div className="bg-[#f2f3ff] p-4 rounded-xl space-y-2 border border-[#bccac0]/20 text-xs">
                  <div className="flex justify-between font-mono pb-1 border-b border-[#bccac0]/20">
                    <span className="text-[#3d4a42]">Token:</span>
                    <span className="font-bold text-[#131b2e]">NL-JAL-2025-0892</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#3d4a42]">Donor:</span>
                    <span className="font-bold text-[#131b2e]">{donorKitchenName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#3d4a42]">Dish Name:</span>
                    <span className="font-bold text-[#006948]">{typedFoodName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#3d4a42]">Food Type:</span>
                    <span className="font-semibold text-[#131b2e]">{selectedCategory.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#3d4a42]">Portions:</span>
                    <span className="font-bold text-[#131b2e]">{portions} (~{weightKg} kg)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#3d4a42]">Pickup GPS:</span>
                    <span className="font-mono text-[11px] text-[#006194]">
                      {donorLocation.lat}°, {donorLocation.lng}°
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleBroadcastRescue}
                  className="w-full py-3 bg-[#006948] text-white font-headline font-bold text-sm rounded-xl shadow-md hover:bg-[#00855d] transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                >
                  <span className="material-symbols-outlined text-xl">send</span>
                  <span>Broadcast Rescue &amp; Lock Manifest</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* SUB-TAB 2: RECEIVER / SHELTER HUB */}
        {activeSubTab === 'receive' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-[#bccac0]/30 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#bccac0]/20">
                <div>
                  <h2 className="font-headline font-bold text-lg text-[#131b2e]">
                    Shelter Inbound Food Delivery Radar
                  </h2>
                  <p className="text-xs text-[#3d4a42]">
                    Active deliveries heading to verified rain baseras, orphanages, and migrant feeding hubs.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded bg-[#eaedff] text-[#006948] text-xs font-bold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#006948] animate-pulse"></span>
                    2 Active Consignments
                  </span>
                </div>
              </div>

              {/* Delivery Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {inboundDeliveries.map((item) => (
                  <div
                    key={item.id}
                    className="p-5 rounded-xl bg-[#f2f3ff] border border-[#bccac0]/30 space-y-3 shadow-xs hover:border-[#006948] transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#85f8c4] text-[#002114] text-[11px] font-bold">
                        {item.status}
                      </span>
                      <span className="font-mono text-xs font-bold text-[#006194]">
                        ETA: {item.etaMinutes} mins
                      </span>
                    </div>

                    <div>
                      <h4 className="font-headline font-bold text-base text-[#131b2e]">
                        {item.foodName}
                      </h4>
                      <div className="text-xs text-[#3d4a42] mt-0.5">
                        Category: <strong className="text-[#131b2e]">{item.foodType}</strong> • {item.portions} Portions
                      </div>
                    </div>

                    <div className="p-2.5 bg-white rounded-lg text-xs space-y-1 text-[#3d4a42] border border-[#bccac0]/20">
                      <div className="flex justify-between">
                        <span>Donor:</span>
                        <strong className="text-[#131b2e]">{item.donorName}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span>Driver:</span>
                        <strong className="text-[#131b2e]">{item.driverName} ({item.driverPhone})</strong>
                      </div>
                      <div className="flex justify-between">
                        <span>Telemetry:</span>
                        <strong className="text-[#006948]">{item.tempReading}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span>Tamper Seal:</span>
                        <span className="font-mono font-bold text-[#131b2e]">{item.tamperSealCode}</span>
                      </div>
                    </div>

                    <div className="pt-1">
                      {item.status === 'Verified Handover' ? (
                        <div className="w-full py-2 bg-[#85f8c4] text-[#002114] text-xs font-bold rounded-lg text-center flex items-center justify-center gap-1.5">
                          <span className="material-symbols-outlined text-sm">check_circle</span>
                          <span>Handover Complete &amp; Digitally Signed</span>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleReceiverVerifyHandover(item.id)}
                          className="w-full py-2.5 bg-[#006948] text-white text-xs font-bold rounded-lg shadow-sm hover:bg-[#00855d] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-base">verified</span>
                          <span>Verify Tamper Seal &amp; Confirm Handover</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Dignity Card Balance Overview */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-[#bccac0]/30 space-y-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#006948] text-xl">contactless</span>
                <h3 className="font-headline font-bold text-base text-[#131b2e]">
                  Offline Dignity Token Card Inventory
                </h3>
              </div>
              <p className="text-xs text-[#3d4a42] leading-relaxed">
                Shelters issue pre-printed Khalsa Aid NFC / QR cards to unhoused individuals. Every meal
                tap is recorded without biometric surveillance or Aadhaar mandate, protecting migrant safety.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
                <div className="bg-[#f2f3ff] p-3 rounded-lg border border-[#bccac0]/20">
                  <span className="text-[10px] text-[#3d4a42] uppercase font-bold block">Issued Cards</span>
                  <span className="font-headline font-bold text-xl text-[#006948] font-mono">1,390</span>
                </div>
                <div className="bg-[#f2f3ff] p-3 rounded-lg border border-[#bccac0]/20">
                  <span className="text-[10px] text-[#3d4a42] uppercase font-bold block">Meals Served Today</span>
                  <span className="font-headline font-bold text-xl text-[#904d00] font-mono">840</span>
                </div>
                <div className="bg-[#f2f3ff] p-3 rounded-lg border border-[#bccac0]/20">
                  <span className="text-[10px] text-[#3d4a42] uppercase font-bold block">Dignity Integrity</span>
                  <span className="font-headline font-bold text-xl text-[#006194] font-mono">100% Free</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SUB-TAB 3: REQUEST EMERGENCY FOOD AID */}
        {activeSubTab === 'request-aid' && (
          <div className="max-w-2xl mx-auto bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-[#bccac0]/30 space-y-5">
            <div className="pb-3 border-b border-[#bccac0]/20 space-y-1">
              <div className="flex items-center gap-2 text-[#904d00]">
                <span className="material-symbols-outlined text-2xl">emergency_share</span>
                <h2 className="font-headline font-bold text-lg text-[#131b2e]">
                  Request Emergency Food Aid
                </h2>
              </div>
              <p className="text-xs text-[#3d4a42]">
                Are you running a shelter, labor camp, or community center in need of warm meals? Submit
                your need to be queued in the CVRPTW dynamic dispatch matrix.
              </p>
            </div>

            <form onSubmit={handleRequestAidSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#131b2e]">Facility / Community Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Shaheed Bhagat Singh Night Shelter"
                  value={reqShelterName}
                  onChange={(e) => setReqShelterName(e.target.value)}
                  className="w-full px-3 py-2 bg-[#f2f3ff] text-xs font-semibold text-[#131b2e] rounded-lg border border-[#bccac0]/30 focus:outline-none focus:ring-1 focus:ring-[#006948]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#131b2e]">Number of Beneficiaries Needed</label>
                  <input
                    type="number"
                    min="10"
                    max="800"
                    required
                    value={reqHeadcount}
                    onChange={(e) => setReqHeadcount(parseInt(e.target.value, 10))}
                    className="w-full px-3 py-2 bg-[#f2f3ff] text-xs font-bold text-[#131b2e] font-mono rounded-lg border border-[#bccac0]/30"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#131b2e]">Required Urgency Window</label>
                  <select
                    value={reqUrgency}
                    onChange={(e) => setReqUrgency(e.target.value)}
                    className="w-full px-3 py-2 bg-[#f2f3ff] text-xs font-bold text-[#131b2e] rounded-lg border border-[#bccac0]/30"
                  >
                    <option value="Immediate (<30 Mins)">Immediate (&lt;30 Mins)</option>
                    <option value="Within 45 Mins">Within 45 Mins</option>
                    <option value="Evening Dinner (7-9 PM)">Evening Dinner (7-9 PM)</option>
                    <option value="Morning Breakfast">Morning Breakfast (7-9 AM)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#131b2e]">Preferred Food Preparation</label>
                <input
                  type="text"
                  value={reqMealType}
                  onChange={(e) => setReqMealType(e.target.value)}
                  className="w-full px-3 py-2 bg-[#f2f3ff] text-xs text-[#131b2e] rounded-lg border border-[#bccac0]/30"
                />
              </div>

              {/* Location Marking via GPS or Map Click */}
              <LocationSelector
                initialLat={reqLocation.lat}
                initialLng={reqLocation.lng}
                initialAddress={reqLocation.address}
                onLocationChange={(loc) => setReqLocation(loc)}
              />

              <button
                type="submit"
                className="w-full py-3 bg-[#006948] text-white font-headline font-bold text-sm rounded-xl shadow-md hover:bg-[#00855d] transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              >
                <span className="material-symbols-outlined text-xl">send</span>
                <span>Submit Emergency Meal Request</span>
              </button>
            </form>
          </div>
        )}

        {/* SUB-TAB 4: GAMIFIED IMPACT & REWARDS HUB */}
        {activeSubTab === 'rewards' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* Top Gamification Hero Card */}
            <div className="bg-gradient-to-r from-[#004b33] via-[#006948] to-[#00855d] text-white p-6 rounded-2xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-2 max-w-xl">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#85f8c4] text-[#002114] text-xs font-bold uppercase tracking-wider">
                    Donor Gamification Engine
                  </span>
                  <span className="text-emerald-200 text-xs font-medium">FSSAI Certified Annadata</span>
                </div>
                <h2 className="font-headline font-extrabold text-2xl lg:text-3xl text-white tracking-tight">
                  Your Sovereign Food Rescue Scorecard
                </h2>
                <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
                  Every gram of hot meal saved earns you <strong>Nourish Karma Points</strong>, civic tax offsets under IT Act Sec 80G, and state recognition.
                </p>
              </div>

              {/* Live Points, Level & Streak Deck */}
              <div className="flex items-center gap-3 bg-black/35 backdrop-blur-md p-4 rounded-xl border border-white/20 shrink-0">
                <div className="text-center px-2">
                  <div className="text-[10px] text-emerald-200 uppercase font-bold tracking-wider">
                    Total Karma
                  </div>
                  <div className="font-headline font-black text-3xl text-amber-300 font-mono">
                    {DEFAULT_DONOR_PROFILE.points.toLocaleString()}
                  </div>
                  <div className="text-[10px] text-white/80">Dignity Points</div>
                </div>

                <div className="h-10 w-px bg-white/20"></div>

                <div className="text-center px-2">
                  <div className="text-[10px] text-emerald-200 uppercase font-bold tracking-wider">
                    Current Tier
                  </div>
                  <div className="font-headline font-black text-2xl text-emerald-300">
                    Gold
                  </div>
                  <div className="text-[10px] text-white/80">Level 4 Annadata</div>
                </div>

                <div className="h-10 w-px bg-white/20"></div>

                <div className="text-center px-2">
                  <div className="text-[10px] text-emerald-200 uppercase font-bold tracking-wider">
                    Active Streak
                  </div>
                  <div className="font-headline font-black text-2xl text-orange-400 font-mono flex items-center justify-center gap-0.5">
                    <span>🔥</span> {DEFAULT_DONOR_PROFILE.streakDays}
                  </div>
                  <div className="text-[10px] text-white/80">Days Active</div>
                </div>
              </div>
            </div>

            {/* How Much You Have Saved & Donated (Bento Grid) */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-headline font-bold text-lg text-[#131b2e] flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[#006948] text-xl">savings</span>
                    <span>How Much You Have Saved &amp; Donated</span>
                  </h3>
                  <p className="text-xs text-[#3d4a42]">
                    Verified tracking of meal volume, economic value saved, and ecological offset metrics.
                  </p>
                </div>
                <span className="text-xs font-mono font-bold text-[#006948] bg-emerald-100 px-2.5 py-1 rounded-md">
                  Audit Hash: 0x8F4A..71E
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-xl border border-[#bccac0]/30 shadow-sm flex flex-col justify-between">
                  <div className="flex items-center justify-between text-[#3d4a42]">
                    <span className="text-xs font-bold uppercase tracking-wider">Total Donated</span>
                    <span className="p-1.5 rounded-lg bg-[#e2f7ec] text-[#006948]">
                      <span className="material-symbols-outlined text-lg">soup_kitchen</span>
                    </span>
                  </div>
                  <div className="mt-3 font-headline font-black text-3xl lg:text-4xl text-[#006948] font-mono">
                    {DEFAULT_DONOR_PROFILE.totalMeals.toLocaleString()}
                  </div>
                  <div className="text-xs text-[#3d4a42] mt-1">
                    <strong>{DEFAULT_DONOR_PROFILE.totalKg} kg</strong> nutritious food distributed
                  </div>
                </div>

                <div className="bg-white p-5 rounded-xl border border-[#bccac0]/30 shadow-sm flex flex-col justify-between">
                  <div className="flex items-center justify-between text-[#3d4a42]">
                    <span className="text-xs font-bold uppercase tracking-wider">Food Value Saved</span>
                    <span className="p-1.5 rounded-lg bg-[#ffdcc3] text-[#904d00]">
                      <span className="material-symbols-outlined text-lg">currency_rupee</span>
                    </span>
                  </div>
                  <div className="mt-3 font-headline font-black text-3xl lg:text-4xl text-[#904d00] font-mono">
                    ₹{DEFAULT_DONOR_PROFILE.moneySavedInr.toLocaleString()}
                  </div>
                  <div className="text-xs text-[#3d4a42] mt-1">
                    Banquet production capital protected
                  </div>
                </div>

                <div className="bg-white p-5 rounded-xl border border-[#bccac0]/30 shadow-sm flex flex-col justify-between">
                  <div className="flex items-center justify-between text-[#3d4a42]">
                    <span className="text-xs font-bold uppercase tracking-wider">Municipal Waste Saved</span>
                    <span className="p-1.5 rounded-lg bg-[#eaedff] text-[#006194]">
                      <span className="material-symbols-outlined text-lg">delete_sweep</span>
                    </span>
                  </div>
                  <div className="mt-3 font-headline font-black text-3xl lg:text-4xl text-[#006194] font-mono">
                    ₹{DEFAULT_DONOR_PROFILE.landfillCostSavedInr.toLocaleString()}
                  </div>
                  <div className="text-xs text-[#3d4a42] mt-1">
                    Commercial dumping surcharge avoided
                  </div>
                </div>

                <div className="bg-white p-5 rounded-xl border border-[#bccac0]/30 shadow-sm flex flex-col justify-between">
                  <div className="flex items-center justify-between text-[#3d4a42]">
                    <span className="text-xs font-bold uppercase tracking-wider">Carbon Offset</span>
                    <span className="p-1.5 rounded-lg bg-[#e2f7ec] text-[#00855d]">
                      <span className="material-symbols-outlined text-lg">co2</span>
                    </span>
                  </div>
                  <div className="mt-3 font-headline font-black text-3xl lg:text-4xl text-[#00855d] font-mono">
                    {(DEFAULT_DONOR_PROFILE.co2DivertedKg / 1000).toFixed(1)} <span className="text-lg">T</span>
                  </div>
                  <div className="text-xs text-[#3d4a42] mt-1">
                    {DEFAULT_DONOR_PROFILE.waterSavedLitres.toLocaleString()} L water preserved
                  </div>
                </div>
              </div>
            </div>

            {/* Unlocked Badges & Honours Strip */}
            <div className="bg-white p-5 rounded-2xl border border-[#bccac0]/30 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-headline font-bold text-base text-[#131b2e] flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-amber-500 text-xl">military_tech</span>
                    <span>Donor Badges &amp; Civic Honours</span>
                  </h4>
                  <p className="text-xs text-[#3d4a42]">
                    Gamified milestones achieved across banquet hygiene, rapid cold-chain handover, and zero spoilage.
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full bg-amber-100 text-[#904d00] font-bold text-xs">
                  5 of 6 Unlocked
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-xl bg-[#faf8ff] border border-[#bccac0]/30 flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-yellow-600 text-white flex items-center justify-center shrink-0 shadow">
                    <span className="material-symbols-outlined text-xl">military_tech</span>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#131b2e] flex items-center gap-1">
                      <span>Sovereign Annadata</span>
                      <span className="text-emerald-600 font-bold">✓</span>
                    </div>
                    <p className="text-[11px] text-[#3d4a42] mt-0.5">Donated over 2,500 hot nutritious meals</p>
                    <span className="text-[9px] uppercase font-bold text-[#006948] mt-1 block">+500 Bonus Pts</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#faf8ff] border border-[#bccac0]/30 flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 text-white flex items-center justify-center shrink-0 shadow">
                    <span className="material-symbols-outlined text-xl">thermostat</span>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#131b2e] flex items-center gap-1">
                      <span>Thermal Guardian 65°C+</span>
                      <span className="text-emerald-600 font-bold">✓</span>
                    </div>
                    <p className="text-[11px] text-[#3d4a42] mt-0.5">100% HACCP temperature compliance</p>
                    <span className="text-[9px] uppercase font-bold text-[#006948] mt-1 block">+300 Bonus Pts</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#faf8ff] border border-[#bccac0]/30 flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 text-white flex items-center justify-center shrink-0 shadow">
                    <span className="material-symbols-outlined text-xl">local_fire_department</span>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#131b2e] flex items-center gap-1">
                      <span>14-Day Zero-Waste Streak</span>
                      <span className="text-emerald-600 font-bold">✓</span>
                    </div>
                    <p className="text-[11px] text-[#3d4a42] mt-0.5">Consecutive daily surplus logging</p>
                    <span className="text-[9px] uppercase font-bold text-[#006948] mt-1 block">+400 Bonus Pts</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#faf8ff] border border-[#bccac0]/30 flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-700 text-white flex items-center justify-center shrink-0 shadow">
                    <span className="material-symbols-outlined text-xl">eco</span>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#131b2e] flex items-center gap-1">
                      <span>Zero Methane Pioneer</span>
                      <span className="text-emerald-600 font-bold">✓</span>
                    </div>
                    <p className="text-[11px] text-[#3d4a42] mt-0.5">Offset over 5,000 kg CO2e emissions</p>
                    <span className="text-[9px] uppercase font-bold text-[#006948] mt-1 block">+250 Bonus Pts</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#faf8ff] border border-[#bccac0]/30 flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-400 to-blue-600 text-white flex items-center justify-center shrink-0 shadow">
                    <span className="material-symbols-outlined text-xl">bedtime</span>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#131b2e] flex items-center gap-1">
                      <span>Midnight Rescue Hero</span>
                      <span className="text-emerald-600 font-bold">✓</span>
                    </div>
                    <p className="text-[11px] text-[#3d4a42] mt-0.5">Night surplus dispatched after 22:00</p>
                    <span className="text-[9px] uppercase font-bold text-[#006948] mt-1 block">+350 Bonus Pts</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200 opacity-60 flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-300 to-cyan-500 text-white flex items-center justify-center shrink-0 shadow">
                    <span className="material-symbols-outlined text-xl">diamond</span>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-gray-700">Diamond Civic Benefactor</div>
                    <p className="text-[11px] text-gray-500 mt-0.5">Reach 6,000 points &amp; 3,500 meals</p>
                    <span className="text-[9px] uppercase font-bold text-gray-400 mt-1 block">Locked (Next Tier)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Donation History with Points & Savings Log */}
            <div className="bg-white p-5 rounded-2xl border border-[#bccac0]/30 shadow-sm space-y-3">
              <DonationHistoryTimeline operations={INITIAL_RESCUE_OPERATIONS} />
            </div>
          </div>
        )}
      </div>

      {/* Floating Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 max-w-md bg-[#131b2e] text-white p-4 rounded-xl shadow-2xl z-50 flex items-start gap-3 border border-[#bccac0]/40 animate-in slide-in-from-bottom duration-300">
          <span className="material-symbols-outlined text-[#85f8c4] text-2xl mt-0.5">check_circle</span>
          <div className="flex flex-col">
            <span className="text-xs font-bold">{toast.title}</span>
            <span className="text-[11px] text-gray-300">{toast.message}</span>
          </div>
        </div>
      )}
    </div>
  );
};
