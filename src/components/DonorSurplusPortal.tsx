import React, { useState, useEffect } from 'react';
import { calculateDecayWindow, calculateEmissionsDiverted } from '../utils/rescueMath.ts';

export const DonorSurplusPortal: React.FC = () => {
  // Food selection state
  const [selectedFood, setSelectedFood] = useState<'Dal Makhani' | 'Shahi Paneer' | 'Tandoori Roti' | 'Jeera Basmati Rice'>('Dal Makhani');
  const [portions, setPortions] = useState(120);
  const [cookingTime, setCookingTime] = useState('21:15');
  const [dietary, setDietary] = useState<'veg' | 'jain' | 'halal'>('veg');
  const [dispatchMode, setDispatchMode] = useState<'ngo-fleet' | 'self-deliver'>('ngo-fleet');

  // Vision scanner simulation state
  const [isScanning, setIsScanning] = useState(false);
  const [thermalTemp, setThermalTemp] = useState(71.8);
  const [steamVapor, setSteamVapor] = useState(97.4);
  const [freshnessGrade, setFreshnessGrade] = useState(98);
  const [modelConfidence, setModelConfidence] = useState(99.4);

  // Toast state
  const [toast, setToast] = useState<{ title: string; message: string } | null>(null);

  // Live Arrhenius ticking countdown
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

  // Re-scan with Edge AI
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
        'Vision Inference Verified',
        `Thermal: ${newTemp}°C | Steam: ${newSteam}% | Grade ${newGrade}/100 FSSAI Compliant`
      );
    }, 1300);
  };

  const handleBroadcastManifest = () => {
    showToast(
      'Rescue Broadcast Activated!',
      `Manifest locked. ${portions} meals dispatched to Pingalwara Shelter. Legal shield indemnity applied.`
    );
  };

  const handlePrint = () => {
    showToast('Print Spooler Initiated', 'Sending Manifest #NL-JAL-2025-0892 to Bluetooth Thermal Printer...');
    window.print();
  };

  const handleDownloadPdf = () => {
    showToast('PDF Vault Compiled', 'Downloading statutory FSSAI Good Samaritan Certificate with Cryptographic Seal.');
  };

  const weightKg = Math.round(portions * 0.35);
  const emissions = calculateEmissionsDiverted(portions);

  return (
    <div className="flex flex-col w-full pb-10">
      {/* Top Operational Banner & Donor Context */}
      <div className="w-full bg-[#f2f3ff] px-4 md:px-6 py-4 border-b border-[#bccac0]/30">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#006948] text-white flex items-center justify-center shadow-md">
              <span className="material-symbols-outlined text-2xl">verified</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-headline font-bold text-lg text-[#131b2e]">
                  Haveli Banquets &amp; Heritage Kitchen
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#85f8c4] text-[#002114] text-xs font-semibold">
                  FSSAI ID: 12119001000428
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#3d4a42] mt-0.5">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm text-[#006948]">location_on</span>
                  GT Road, Jalandhar Bypass
                </span>
                <span>•</span>
                <span className="text-[#006194] font-semibold">Tier-1 Commercial Kitchen Partner</span>
              </div>
            </div>
          </div>

          {/* Live Incentive & ESG Ledger Micro-Bar */}
          <div className="flex items-center gap-4 bg-[#dae2fd]/60 p-2.5 rounded-xl border border-[#bccac0]/20">
            <div className="flex flex-col text-right">
              <span className="text-[10px] text-[#3d4a42] uppercase tracking-wider font-semibold">
                Accumulated 80G Tax Credits
              </span>
              <span className="font-headline font-bold text-base text-[#006948]">
                Rs. 1,42,850 <span className="text-[11px] text-[#3d4a42] font-normal">FY24-25</span>
              </span>
            </div>
            <div className="h-8 w-px bg-[#bccac0]/50"></div>
            <div className="flex items-center gap-2 bg-[#904d00] text-white px-3 py-1.5 rounded-lg shadow-sm">
              <span className="material-symbols-outlined text-xl">award_star</span>
              <div className="flex flex-col leading-tight">
                <span className="text-xs font-bold">Zero Waste Certified</span>
                <span className="text-[10px] opacity-90">Swiggy • Zomato Seal</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Asymmetric Workspace */}
      <div className="max-w-7xl mx-auto w-full px-4 md:px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT COLUMN: 3-Tap Rapid Surplus Entry & Expiry Physics (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* Section 1: The 3-Tap Donor Entry Pane */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-[#bccac0]/30">
              <div className="flex items-center justify-between pb-3 mb-4 bg-[#f2f3ff] -mx-6 -mt-6 p-4 rounded-t-xl border-b border-[#bccac0]/20">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#006948] text-xl">fastfood</span>
                  <h2 className="font-headline font-bold text-base text-[#131b2e]">
                    1. Rapid Surplus Intake
                  </h2>
                </div>
                <span className="text-xs px-2 py-0.5 rounded bg-[#e2e7ff] text-[#3d4a42] font-semibold">
                  Step 1 of 3
                </span>
              </div>

              {/* Food Category Selector */}
              <div className="space-y-2 mb-5">
                <label className="text-xs font-bold text-[#131b2e] block uppercase tracking-wider">
                  Cooked Food Type (Select primary preparation)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'Dal Makhani', label: 'Dal Makhani', subtitle: 'Legume/Gravy', icon: 'soup_kitchen', defaultPortion: 120, temp: 71.8 },
                    { id: 'Shahi Paneer', label: 'Shahi Paneer', subtitle: 'Dairy/Rich', icon: 'restaurant', defaultPortion: 60, temp: 72.0 },
                    { id: 'Tandoori Roti', label: 'Roti / Naan', subtitle: 'Baked Grain', icon: 'bakery_dining', defaultPortion: 140, temp: 68.0 },
                    { id: 'Jeera Basmati Rice', label: 'Basmati Rice', subtitle: 'Steamed Grains', icon: 'rice_bowl', defaultPortion: 110, temp: 76.2 },
                  ].map((item) => {
                    const isSelected = selectedFood === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => {
                          setSelectedFood(item.id as any);
                          setPortions(item.defaultPortion);
                          setThermalTemp(item.temp);
                        }}
                        className={`flex flex-col items-center justify-center p-3 rounded-lg transition-all text-center cursor-pointer border ${
                          isSelected
                            ? 'bg-[#00855d] text-[#f5fff7] shadow-sm border-[#006948]'
                            : 'bg-[#eaedff] text-[#131b2e] hover:bg-[#e2e7ff] border-transparent'
                        }`}
                      >
                        <span className="material-symbols-outlined text-xl mb-1">{item.icon}</span>
                        <span className="text-xs font-bold">{item.label}</span>
                        <span className={`text-[10px] ${isSelected ? 'text-[#f5fff7]/90' : 'text-[#3d4a42]'}`}>
                          {item.subtitle}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Quantity Slider */}
              <div className="bg-[#f2f3ff] p-4 rounded-xl mb-5 border border-[#bccac0]/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-[#131b2e]">Surplus Volume / Estimated Yield</span>
                  <div className="flex items-baseline gap-1">
                    <span className="font-headline font-bold text-xl text-[#006948]">{portions}</span>
                    <span className="text-xs text-[#3d4a42]">Full Meal Portions (~{weightKg} kg)</span>
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
                <div className="flex justify-between text-[11px] text-[#3d4a42] mt-1.5 font-medium">
                  <span>Small Banquet (20 meals)</span>
                  <span>Medium Hall (250)</span>
                  <span>Mega Wedding Gala (600+)</span>
                </div>
              </div>

              {/* Cooking Completion Time & Dietary Profile */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#131b2e] block">Cooking Completion Time</label>
                  <div className="flex items-center gap-2 bg-[#eaedff] p-2.5 rounded-lg border border-[#bccac0]/20">
                    <span className="material-symbols-outlined text-[#006948] text-xl">schedule</span>
                    <input
                      type="time"
                      value={cookingTime}
                      onChange={(e) => setCookingTime(e.target.value)}
                      className="bg-transparent text-sm font-bold text-[#131b2e] focus:outline-none w-full"
                    />
                    <span className="text-[11px] text-[#3d4a42] whitespace-nowrap font-medium">IST (Tonight)</span>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#131b2e] block">Dietary &amp; Sanctity Profile</label>
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

              {/* Packaging Safeguard Badges */}
              <div className="p-3 bg-[#dae2fd]/40 rounded-lg flex flex-wrap items-center justify-between gap-2 text-xs text-[#3d4a42] border border-[#bccac0]/20">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[#006948] text-base">soup_kitchen</span>
                  <span>Stainless Steel Insulated Chafers</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[#006948] text-base">check_circle</span>
                  <span>Direct Kitchen Staff Handover</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[#006194] text-base">lock</span>
                  <span>Sealed Tamper-Resistant Containers</span>
                </div>
              </div>
            </div>

            {/* Section 2: Dynamic Microbial Decay Physics */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-[#bccac0]/30">
              <div className="flex items-center justify-between pb-3 mb-4 bg-[#f2f3ff] -mx-6 -mt-6 p-4 rounded-t-xl border-b border-[#bccac0]/20">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#904d00] text-xl">thermostat</span>
                  <h2 className="font-headline font-bold text-base text-[#131b2e]">
                    2. Predictive Microbial Decay Physics
                  </h2>
                </div>
                <div className="flex items-center gap-1.5 bg-[#ffdcc3] text-[#2f1500] px-2 py-0.5 rounded text-xs font-bold">
                  <span className="w-2 h-2 rounded-full bg-[#904d00] animate-pulse"></span>
                  Live Arrhenius Curve
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                {/* Ambient Weather */}
                <div className="bg-[#eaedff] p-4 rounded-xl flex flex-col justify-between border border-[#bccac0]/20">
                  <div className="flex items-center justify-between text-xs text-[#3d4a42] uppercase font-bold">
                    <span>Jalandhar Ambient</span>
                    <span className="material-symbols-outlined text-[#006948] text-lg">wb_cloudy</span>
                  </div>
                  <div className="my-2">
                    <div className="font-headline font-extrabold text-3xl text-[#131b2e] leading-none">
                      24.2°C
                    </div>
                    <span className="text-[11px] text-[#3d4a42] block mt-1">Humidity: 58% • Night Inversion</span>
                  </div>
                  <div className="text-[11px] text-[#006948] font-bold flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">ac_unit</span>
                    Safe zone for hot holding &gt;65°C
                  </div>
                </div>

                {/* Expiry Window */}
                <div className="bg-[#e2e7ff] md:col-span-2 p-4 rounded-xl flex flex-col justify-between border border-[#bccac0]/20">
                  <div className="flex items-center justify-between text-xs text-[#3d4a42] uppercase font-bold">
                    <span>Critical Safe Consumption Window</span>
                    <span className="px-2 py-0.5 bg-[#006948] text-white rounded text-[11px] font-bold">
                      HACCP Class A
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2 my-2">
                    <span className="font-mono font-extrabold text-3xl text-[#006948] tracking-tight">
                      {formatCountdown(countdownSeconds)}
                    </span>
                    <span className="text-xs text-[#3d4a42]">
                      Remaining before pathogen multiplication risk
                    </span>
                  </div>
                  {/* Linear decay bar */}
                  <div className="space-y-1">
                    <div className="w-full bg-[#d2d9f4] h-2 rounded-full overflow-hidden flex">
                      <div className="bg-[#006948] h-full w-[78%] transition-all duration-500"></div>
                      <div className="bg-[#fe932c] h-full w-[14%]"></div>
                      <div className="bg-[#ba1a1a] h-full w-[8%]"></div>
                    </div>
                    <div className="flex justify-between text-[11px] text-[#3d4a42] font-semibold">
                      <span className="text-[#006948]">Current: Optimal Hot Handoff</span>
                      <span>Cooling Phase: +2h</span>
                      <span className="text-[#ba1a1a]">Bio-Waste Reroute</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Micro-Physics Telemetry Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
                <div className="p-2 bg-[#f2f3ff] rounded-lg border border-[#bccac0]/20">
                  <span className="block text-[11px] text-[#3d4a42]">Bacterial Doubling Time</span>
                  <span className="text-sm font-bold text-[#131b2e]">&gt; 114 Mins</span>
                </div>
                <div className="p-2 bg-[#f2f3ff] rounded-lg border border-[#bccac0]/20">
                  <span className="block text-[11px] text-[#3d4a42]">Thermal Inertia (Chafer)</span>
                  <span className="text-sm font-bold text-[#131b2e]">-0.18°C / min</span>
                </div>
                <div className="p-2 bg-[#f2f3ff] rounded-lg border border-[#bccac0]/20">
                  <span className="block text-[11px] text-[#3d4a42]">Moisture Retention (aw)</span>
                  <span className="text-sm font-bold text-[#131b2e]">0.94 aw (Standard)</span>
                </div>
                <div className="p-2 bg-[#f2f3ff] rounded-lg border border-[#bccac0]/20">
                  <span className="block text-[11px] text-[#3d4a42]">Spoilage Probability</span>
                  <span className="text-sm font-bold text-[#006948]">&lt; 0.02%</span>
                </div>
              </div>
            </div>

            {/* Section 3: Dispatch & Cold-Chain Handover */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-[#bccac0]/30">
              <div className="flex items-center justify-between pb-3 mb-4 bg-[#f2f3ff] -mx-6 -mt-6 p-4 rounded-t-xl border-b border-[#bccac0]/20">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#006194] text-xl">local_shipping</span>
                  <h2 className="font-headline font-bold text-base text-[#131b2e]">
                    3. Dispatch &amp; Cold-Chain Handover
                  </h2>
                </div>
                <span className="text-xs text-[#3d4a42] font-semibold">SLA &lt;14 Mins Metro</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                {/* Fleet Request Option */}
                <label
                  onClick={() => {
                    setDispatchMode('ngo-fleet');
                    showToast('NourishLink Fleet Engaged', 'Nearby NGO Van notified for <14m pickup SLA');
                  }}
                  className={`relative flex flex-col p-4 rounded-xl cursor-pointer transition-all border ${
                    dispatchMode === 'ngo-fleet'
                      ? 'bg-[#85f8c4]/20 border-[#006948] shadow-sm'
                      : 'bg-[#eaedff] border-transparent hover:bg-[#e2e7ff]'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[#006948] text-2xl">
                        electric_moped
                      </span>
                      <span className="font-headline font-bold text-sm text-[#131b2e]">
                        Request NourishLink Fleet
                      </span>
                    </div>
                    <span
                      className={`w-4 h-4 rounded-full flex items-center justify-center border ${
                        dispatchMode === 'ngo-fleet' ? 'border-[#006948] bg-[#006948]' : 'border-gray-400 bg-white'
                      }`}
                    >
                      {dispatchMode === 'ngo-fleet' && (
                        <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                      )}
                    </span>
                  </div>
                  <p className="text-xs text-[#3d4a42] mb-3 leading-relaxed">
                    Autonomous dispatch triggers nearest insulated van or e-cargo bike. Driver
                    arrives with certified digital seal.
                  </p>
                  <div className="mt-auto flex items-center justify-between text-xs text-[#006948] font-bold">
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-[#006948] animate-pulse"></span>
                      2 Vans in 1.4 km radius
                    </span>
                    <span>ETA: ~11 mins</span>
                  </div>
                </label>

                {/* Self Deliver Option */}
                <label
                  onClick={() => {
                    setDispatchMode('self-deliver');
                    showToast('Self-Delivery Activated', 'Route generated to Pingalwara Hub with cold-chain lock');
                  }}
                  className={`relative flex flex-col p-4 rounded-xl cursor-pointer transition-all border ${
                    dispatchMode === 'self-deliver'
                      ? 'bg-[#85f8c4]/20 border-[#006948] shadow-sm'
                      : 'bg-[#eaedff] border-transparent hover:bg-[#e2e7ff]'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[#3d4a42] text-2xl">commute</span>
                      <span className="font-headline font-bold text-sm text-[#131b2e]">
                        Hotel Self-Deliver Van
                      </span>
                    </div>
                    <span
                      className={`w-4 h-4 rounded-full flex items-center justify-center border ${
                        dispatchMode === 'self-deliver' ? 'border-[#006948] bg-[#006948]' : 'border-gray-400 bg-white'
                      }`}
                    >
                      {dispatchMode === 'self-deliver' && (
                        <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                      )}
                    </span>
                  </div>
                  <p className="text-xs text-[#3d4a42] mb-3 leading-relaxed">
                    Haveli internal hospitality vehicle transports trays directly to verified
                    recipient shelter or night kitchen.
                  </p>
                  <div className="mt-auto flex items-center justify-between text-xs text-[#3d4a42] font-semibold">
                    <span>Direct Navigation GPS Packet</span>
                    <span className="text-[#006194] font-bold">+150 Bonus GFC</span>
                  </div>
                </label>
              </div>

              {/* Destination Match Preview */}
              <div className="bg-[#f2f3ff] p-4 rounded-xl flex items-center justify-between gap-4 border border-[#bccac0]/20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#cce5ff] text-[#001d31] flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-xl">night_shelter</span>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#131b2e] block">
                      Pre-Matched Recipient: Pingalwara Slum Feeding Hub
                    </span>
                    <span className="text-[11px] text-[#3d4a42]">
                      Model predicts 110 children &amp; elderly meal requirement verified 8 mins ago
                    </span>
                  </div>
                </div>
                <span className="text-xs bg-[#006948] text-white px-2.5 py-1 rounded font-bold whitespace-nowrap">
                  Distance: 3.8 km
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Computer Vision Edge Scanner & FSSAI Manifest Vault (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Edge AI Camera Simulator Module */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-[#bccac0]/30">
              <div className="flex items-center justify-between pb-3 mb-4 bg-[#f2f3ff] -mx-6 -mt-6 p-4 rounded-t-xl border-b border-[#bccac0]/20">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#006948] text-xl">photo_camera</span>
                  <h3 className="font-headline font-bold text-base text-[#131b2e]">
                    Snap-to-Verify Vision AI
                  </h3>
                </div>
                <span className="text-xs px-2 py-0.5 rounded bg-[#85f8c4] text-[#002114] font-bold">
                  Edge ML v4.1
                </span>
              </div>

              {/* Camera Viewport Surface */}
              <div className="relative w-full aspect-video bg-[#131b2e] rounded-xl overflow-hidden shadow-inner flex flex-col justify-between p-3">
                {/* Background Video Simulation Frame */}
                <img
                  alt="Overhead culinary view of Indian food in buffet chafers"
                  className="absolute inset-0 w-full h-full object-cover opacity-85 pointer-events-none"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAItXNOgQhhNPkGpWe-TyJqy4rLt_K6aYtxiZCTGT4ylRnfcASaYZ1DhkYdcjXRAbz76Ot754YOXPSSFkOXBF89ATiHzr0k-PtvzbDHjBGDPxH4X8NccdwZu9FZCxOIpkMOgJXiZfIMPBOj-Bgj0sO_M3TwxgKurPjBAjhiz53ma8_UJXboGf1JbN0K2OZINb0JYZqtGZ8dKoN9g-MsSbpIpMaI1PJTO7URVvYNGsKxSDfO6xmHuTijbw"
                />

                {/* Top HUD Overlay */}
                <div className="relative z-10 flex items-center justify-between font-mono font-bold text-[11px] text-white bg-black/60 backdrop-blur-md px-2.5 py-1 rounded">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ba1a1a] animate-ping"></span>
                    <span>REC // CAM-02-LENS</span>
                  </div>
                  <span className="text-[#85f8c4] font-bold">
                    MODEL RESNET-50: {modelConfidence}% CONF
                  </span>
                  <span className="text-gray-300">720p @ 60FPS</span>
                </div>

                {/* Bounding Box Overlay */}
                <div className="relative z-10 my-auto w-full px-2">
                  <div
                    className={`w-4/5 mx-auto p-2 rounded bg-[#006948]/20 border-2 border-[#85f8c4] transition-all duration-500 ${
                      isScanning ? 'scale-95 opacity-60' : ''
                    }`}
                  >
                    <div className="flex justify-between items-start font-mono font-bold text-[10px]">
                      <span className="bg-[#006948] text-white px-1.5 py-0.5 rounded">
                        TRAY_01: {selectedFood.toUpperCase().replace(/\s+/g, '_')}
                      </span>
                      <span className="bg-black/80 text-[#85f8c4] px-1.5 py-0.5 rounded">
                        STEAM: {steamVapor}%
                      </span>
                    </div>

                    <div className="h-16 flex items-center justify-center">
                      <div className="w-9 h-9 rounded-full flex items-center justify-center text-[#85f8c4]">
                        <span className={`material-symbols-outlined text-2xl ${isScanning ? 'animate-spin' : ''}`}>
                          data_saver_on
                        </span>
                      </div>
                    </div>

                    <div className="flex justify-between items-end font-mono text-[10px] text-white bg-black/80 p-1 rounded backdrop-blur-sm">
                      <span className="text-[#ffdcc3]">TEMP_IR: {thermalTemp}°C</span>
                      <span className="text-[#85f8c4]">SAFETY GRADE: A+</span>
                    </div>
                  </div>
                </div>

                {/* Bottom HUD Sensor Reading */}
                <div className="relative z-10 flex items-center justify-between text-xs text-white bg-black/60 backdrop-blur-md px-3 py-1.5 rounded">
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[#fe932c] text-sm">dew_point</span>
                    <span>
                      Vapor Density: <strong>{steamVapor}% Peak</strong>
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[#85f8c4] text-sm">check_circle</span>
                    <span>FSSAI Hot Holding Safe</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-4 flex flex-col gap-2">
                <button
                  type="button"
                  disabled={isScanning}
                  onClick={handleRunScan}
                  className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#006948] text-white text-sm font-bold rounded-lg shadow-sm hover:bg-[#00855d] transition-all active:scale-[0.98] cursor-pointer disabled:opacity-75"
                >
                  <span className={`material-symbols-outlined text-lg ${isScanning ? 'animate-spin' : ''}`}>
                    {isScanning ? 'refresh' : 'auto_fix_high'}
                  </span>
                  <span>
                    {isScanning
                      ? 'Processing Thermal & Edge Tensor Model...'
                      : 'Re-Scan Trays with Sensory Vision Engine'}
                  </span>
                </button>
                <div className="flex items-center justify-between text-xs text-[#3d4a42] px-1 font-medium">
                  <span>Sensor: Flir One Thermal + Micro-CMOS</span>
                  <span className="text-[#006948] font-bold">Zero-Latency On-Device Inferencing</span>
                </div>
              </div>

              {/* Quality Metric Summary Row */}
              <div className="grid grid-cols-3 gap-2 mt-4 pt-3 bg-[#f2f3ff] rounded-xl p-3 text-center border border-[#bccac0]/20">
                <div>
                  <span className="block text-[11px] text-[#3d4a42]">Thermal IR</span>
                  <span className="font-headline font-bold text-base text-[#131b2e] font-mono">
                    {thermalTemp}°C
                  </span>
                  <span className="text-[10px] text-[#006948] block font-semibold">&gt;65°C Mandatory</span>
                </div>
                <div>
                  <span className="block text-[11px] text-[#3d4a42]">Steam Vapor</span>
                  <span className="font-headline font-bold text-base text-[#131b2e] font-mono">
                    {steamVapor}%
                  </span>
                  <span className="text-[10px] text-[#006194] block font-semibold">High Moisture</span>
                </div>
                <div>
                  <span className="block text-[11px] text-[#3d4a42]">Freshness Index</span>
                  <span className="font-headline font-bold text-base text-[#006948] font-mono">
                    {freshnessGrade} / 100
                  </span>
                  <span className="text-[10px] text-[#006948] block font-semibold">Grade A Validated</span>
                </div>
              </div>
            </div>

            {/* Section 4: FSSAI Digital Manifest Generator & Legal Shield */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-[#bccac0]/30">
              <div className="flex items-center justify-between pb-3 mb-4 bg-[#f2f3ff] -mx-6 -mt-6 p-4 rounded-t-xl border-b border-[#bccac0]/20">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#006948] text-xl">verified_user</span>
                  <h3 className="font-headline font-bold text-base text-[#131b2e]">
                    Legal Shield &amp; FSSAI Manifest
                  </h3>
                </div>
                <span className="text-xs px-2 py-0.5 rounded bg-[#006948] text-white font-bold">
                  Good Samaritan Sec. 31(C)
                </span>
              </div>

              {/* Manifest Live Document Card */}
              <div className="bg-[#f2f3ff] p-4 rounded-xl space-y-3 border border-[#bccac0]/20">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[10px] text-[#3d4a42] uppercase tracking-wider block font-bold">
                      Cryptographic Handover Token
                    </span>
                    <span className="font-mono text-xs font-bold text-[#131b2e]">
                      NL-JAL-2025-0892-FSSAI
                    </span>
                  </div>
                  <div className="w-14 h-14 bg-white rounded-lg p-1 shadow-sm flex items-center justify-center border border-[#bccac0]/30">
                    {/* SVG QR Code */}
                    <svg className="w-full h-full text-[#131b2e]" fill="currentColor" viewBox="0 0 100 100">
                      <path d="M0,0 h30 v30 h-30 z M10,10 h10 v10 h-10 z M70,0 h30 v30 h-30 z M80,10 h10 v10 h-10 z M0,70 h30 v30 h-30 z M10,80 h10 v10 h-10 z M40,10 h10 v10 h-10 z M50,20 h10 v20 h-10 z M10,40 h20 v10 h-20 z M40,40 h20 v20 h-20 z M70,40 h10 v10 h-10 z M90,50 h10 v10 h-10 z M30,70 h20 v10 h-20 z M60,70 h20 v10 h-20 z M40,80 h20 v20 h-20 z M70,80 h30 v10 h-30 z M80,90 h20 v10 h-20 z"></path>
                    </svg>
                  </div>
                </div>

                <div className="space-y-1 text-xs text-[#3d4a42] pt-1 border-t border-[#bccac0]/20">
                  <div className="flex justify-between">
                    <span>Donor Kitchen:</span>
                    <span className="text-[#131b2e] font-bold">Haveli Banquets, Jalandhar</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Declared Food:</span>
                    <span className="text-[#131b2e] font-bold">
                      {selectedFood} ({portions} Servings)
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Microbial Telemetry:</span>
                    <span className="text-[#006948] font-bold">{thermalTemp}°C Hot Hold • Grade A</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Immunity Status:</span>
                    <span className="text-[#006948] font-bold flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs">shield</span> Fully Indemnified (Govt of India)
                    </span>
                  </div>
                </div>

                {/* Digital Signature */}
                <div className="pt-2 bg-[#eaedff] rounded-lg p-2 flex items-center justify-between text-[10px] text-[#3d4a42] font-mono">
                  <span className="truncate max-w-[200px]">SHA256: e8b9412cf30a91f...</span>
                  <span className="text-[#006948] font-sans font-bold">DIGITALLY SIGNED</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2 mt-4">
                <button
                  type="button"
                  onClick={handlePrint}
                  className="flex items-center justify-center gap-1.5 py-2 px-3 bg-[#eaedff] hover:bg-[#e2e7ff] text-[#131b2e] text-xs font-bold rounded-lg transition-all cursor-pointer"
                >
                  <span className="material-symbols-outlined text-base">print</span>
                  <span>Print Manifest</span>
                </button>
                <button
                  type="button"
                  onClick={handleDownloadPdf}
                  className="flex items-center justify-center gap-1.5 py-2 px-3 bg-[#007bb9] text-white text-xs font-bold rounded-lg transition-all hover:bg-[#006194] shadow-sm cursor-pointer"
                >
                  <span className="material-symbols-outlined text-base">download</span>
                  <span>Get Signed PDF</span>
                </button>
              </div>

              {/* Confirm & Broadcast */}
              <button
                type="button"
                onClick={handleBroadcastManifest}
                className="mt-3 w-full flex items-center justify-center gap-2 py-3 px-4 bg-[#006948] text-white font-headline font-bold text-sm rounded-xl shadow-lg hover:bg-[#00855d] transition-all active:scale-[0.98] cursor-pointer"
              >
                <span className="material-symbols-outlined text-xl">send</span>
                <span>Broadcast Rescue &amp; Lock Manifest</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Institutional Strip */}
        <div className="mt-8 bg-[#eaedff] p-5 rounded-xl border border-[#bccac0]/30 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#006948] text-xl">eco</span>
                <span className="font-headline font-bold text-base text-[#131b2e]">
                  Green Food Credits (GFC) • Haveli Enterprise Wallet
                </span>
              </div>
              <p className="text-xs text-[#3d4a42] max-w-2xl leading-relaxed">
                Every validated surplus rescue directly reduces municipal landfill methane, yields 80G
                tax write-offs, and automates Swiggy/Zomato sustainability ranking boosts.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex flex-col">
                <span className="text-[10px] text-[#3d4a42] uppercase font-semibold">CO2e Diverted Today</span>
                <span className="font-headline font-bold text-xl text-[#006948]">{emissions.co2eKg} kg</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-[#3d4a42] uppercase font-semibold">GFC Balance</span>
                <span className="font-headline font-bold text-xl text-[#904d00]">4,890 Pts</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-[#3d4a42] uppercase font-semibold">Local Beneficiaries</span>
                <span className="font-headline font-bold text-xl text-[#006194]">1,240 Souls</span>
              </div>
            </div>
          </div>
        </div>
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
