import React, { useState, useEffect } from 'react';
import { RescueItem } from '../types.ts';
import { CorridorSpatialMap } from './CorridorSpatialMap.tsx';

interface LiveOperationsHubProps {
  onTriggerIntercept: () => void;
  onNavigateToTab: (tab: any) => void;
}

export const LiveOperationsHub: React.FC<LiveOperationsHubProps> = ({
  onTriggerIntercept,
  onNavigateToTab,
}) => {
  // Urgent countdown state (starts around 41:38)
  const [urgentSeconds, setUrgentSeconds] = useState(41 * 60 + 38);
  const [activeTabFilter, setActiveTabFilter] = useState<'all' | 'urgent' | 'transit'>('all');
  const [activeRescuesCount, setActiveRescuesCount] = useState(14);
  const [totalMealsRescued, setTotalMealsRescued] = useState(528450);
  const [smsTransmitted, setSmsTransmitted] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [mapViewMode, setMapViewMode] = useState<'real-slippy' | 'schematic'>('real-slippy');

  // Active rescue stream items
  const [rescues, setRescues] = useState<RescueItem[]>([
    {
      id: 'res-1',
      type: 'urgent',
      title: 'Grand Heritage Banquet → Civil Hospital Shelter',
      source: 'Grand Heritage Banquet',
      destination: 'Civil Hospital Shelter',
      details: '90 Vegetarian Meals (Paneer Gravy & Roti)',
      driver: 'Gurpreet Singh',
      vehicle: 'EV Van PB-08-EV-4412',
      etaMins: 14,
      remainingTime: '14:12 Remaining',
      tempStatus: 'Hot Hold: 69°C Verified',
      tempVerified: '69°C',
      statusBadge: 'URGENT EXPIRY',
      statusColor: 'bg-[#ffdad6] text-[#93000a]',
      tagInfo: 'Hot Hold: 69°C Verified',
    },
    {
      id: 'res-2',
      type: 'transit',
      title: 'Haveli Highway Kitchen → Phagwara Labor Colony',
      source: 'Haveli Highway Kitchen',
      destination: 'Phagwara Labor Colony',
      details: '140 Portion Khichdi & Mixed Lentils',
      driver: 'Harjit Randhawa',
      vehicle: 'EV Van PB-10-EV-1904',
      etaMins: 21,
      remainingTime: '52:00 Remaining',
      tempStatus: 'Hot Hold: 72°C Verified',
      tempVerified: '72°C',
      statusBadge: 'IN TRANSIT',
      statusColor: 'bg-[#85f8c4] text-[#002114]',
      tagInfo: 'Auto-matched beneficiary',
    },
    {
      id: 'res-3',
      type: 'transit',
      title: 'Lovely Professional Univ. Mess 3 → Ludhiana Night Haven',
      source: 'Lovely Professional Univ. Mess 3',
      destination: 'Ludhiana Night Haven',
      details: '220 Steam Rice, Rajma & Roasted Bread',
      driver: 'Mandeep Gill',
      vehicle: 'Cargo Trike PB-08-CT-02',
      etaMins: 29,
      remainingTime: '1h 10m Remaining',
      tempStatus: 'Insulated Seal #IN-9082',
      tempVerified: '71°C',
      statusBadge: 'PACKAGING VERIFIED',
      statusColor: 'bg-[#cce5ff] text-[#001d31]',
      tagInfo: 'Volunteers Mobilized (4)',
    },
  ]);

  // Timer ticker
  useEffect(() => {
    const timer = setInterval(() => {
      setUrgentSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  // Action 1: Simulate Midnight Banquet Surplus
  const handleSimulateSurplus = () => {
    const newRescue: RescueItem = {
      id: `sim-${Date.now()}`,
      type: 'urgent',
      title: 'Jalandhar Gymkhana Club → Phagwara Red Cross Dormitory',
      source: 'Jalandhar Gymkhana Club',
      destination: 'Phagwara Red Cross Dormitory',
      details: '150 Portions (Shahi Paneer, Jeera Rice & Rotis)',
      driver: 'Ravinder Singh (Trike-02)',
      vehicle: 'Trike-02',
      etaMins: 19,
      remainingTime: '59:59 Remaining',
      tempStatus: 'Hot Hold: 70°C Logged',
      tempVerified: '70°C',
      statusBadge: 'LIVE SIMULATION',
      statusColor: 'bg-[#85f8c4] text-[#002114]',
      tagInfo: 'Fresh Hot Intake',
    };

    setRescues([newRescue, ...rescues]);
    setActiveRescuesCount((prev) => prev + 1);
    setTotalMealsRescued((prev) => prev + 150);
    showToast('Simulation Live: 150 surplus meals matched with Phagwara Red Cross Dormitory!');
  };

  // Action 2: Volunteer SMS Broadcast
  const handleBroadcastSMS = () => {
    setSmsTransmitted(true);
    showToast('Urgent notification dispatched via SMS gateway to 42 verified youth scouts in Phagwara corridor.');
  };

  // Action 3: Bio-Gas Spoilage Safe-Reroute
  const handleBiogasReroute = () => {
    showToast('Bio-Safety Protocol Activated: Compromised batch diverted away from human chain to Jalandhar Bio-Methanation Plant #2.');
  };

  // Handover confirmation
  const handleConfirmHandover = (id: string) => {
    setRescues((prev) =>
      prev.map((item) => (item.id === id ? { ...item, completed: true } : item))
    );
    showToast('Handover logged: Digital receipt and beneficiary token verified.');
  };

  const filteredRescues = rescues.filter((item) => {
    if (activeTabFilter === 'all') return true;
    if (activeTabFilter === 'urgent') return item.type === 'urgent';
    if (activeTabFilter === 'transit') return item.type === 'transit';
    return true;
  });

  return (
    <div className="flex flex-col w-full pb-10">
      {/* Urgent SOS Priority Banner */}
      <div className="w-full bg-[#fe932c] text-[#663500] px-4 md:px-6 py-2 shadow-sm relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="p-1 rounded-full bg-white text-[#904d00] flex items-center justify-center animate-bounce shadow-sm">
              <span className="material-symbols-outlined text-lg">crisis_alert</span>
            </span>
            <div className="flex flex-col sm:flex-row sm:items-center gap-x-2 text-sm">
              <span className="font-bold font-headline tracking-tight">CRITICAL SURPLUS ALERT:</span>
              <span className="font-medium">180 freshly prepared hot meals at Phagwara Palace Resort</span>
              <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-white/80 font-mono font-bold text-[#663500] mt-1 sm:mt-0">
                <span className="material-symbols-outlined text-xs">timer</span>
                <span>{formatTimer(urgentSeconds)}</span> REMAINING
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto justify-end">
            <span className="text-xs hidden lg:inline font-semibold">
              Auto-dispatching EV Van #PB-08-EV-4102
            </span>
            <button
              onClick={onTriggerIntercept}
              className="px-3 py-1.5 rounded-lg bg-white text-[#904d00] text-xs shadow-sm hover:bg-[#faf8ff] transition-all flex items-center gap-1 font-bold active:scale-95 cursor-pointer"
            >
              <span className="material-symbols-outlined text-base">local_shipping</span>
              <span>Intercept &amp; Reroute</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 w-full py-6 flex flex-col gap-6">
        {/* Mission Control Tactical Header & Grid Overview */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-full bg-[#85f8c4] text-[#002114] text-xs uppercase font-bold tracking-wider flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#006948] animate-ping"></span>
                Telemetry Stream Synced
              </span>
              <span className="px-2 py-0.5 rounded-full bg-[#e2e7ff] text-[#3d4a42] text-xs font-mono font-semibold">
                GT-ROAD CORRIDOR V3.8
              </span>
            </div>
            <h1 className="font-headline font-extrabold text-3xl lg:text-5xl text-[#006948] tracking-tight">
              Punjab GT Road Corridor
            </h1>
            <p className="text-sm lg:text-base text-[#3d4a42] max-w-3xl leading-relaxed">
              High-velocity food rescue command linking Jalandhar, Phagwara, and Ludhiana. Autonomous
              CVRPTW cold-chain monitoring with real-time HACCP safety validation.
            </p>
          </div>

          {/* Live Status Indicators */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="bg-white p-2.5 rounded-xl shadow-sm border border-[#bccac0]/30 flex items-center gap-2.5">
              <div className="w-3 h-3 rounded-full bg-[#006948] animate-pulse"></div>
              <div>
                <div className="text-[11px] text-[#3d4a42]">Active Operations</div>
                <div className="text-sm font-bold text-[#131b2e] font-headline">
                  {activeRescuesCount} In Transit
                </div>
              </div>
            </div>
            <div className="bg-white p-2.5 rounded-xl shadow-sm border border-[#bccac0]/30 flex items-center gap-2.5">
              <span className="material-symbols-outlined text-[#006948] text-xl">thermostat</span>
              <div>
                <div className="text-[11px] text-[#3d4a42]">Cold Chains</div>
                <div className="text-sm font-bold text-[#006948] font-headline">
                  All Nominal (68°C Hot / 4°C Cold)
                </div>
              </div>
            </div>
            <div className="bg-white p-2.5 rounded-xl shadow-sm border border-[#bccac0]/30 flex items-center gap-2.5">
              <span className="material-symbols-outlined text-[#006194] text-xl">verified_user</span>
              <div>
                <div className="text-[11px] text-[#3d4a42]">FSSAI Compliance</div>
                <div className="text-sm font-bold text-[#006194] font-headline">
                  100% Certified Safe
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Humanitarian Performance Metrics Band */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Card 1: Meals Rescued */}
          <div className="bg-white p-4 rounded-xl shadow-sm border border-[#bccac0]/30 relative overflow-hidden flex flex-col justify-between">
            <div className="flex items-center justify-between text-[#3d4a42] mb-2">
              <span className="text-xs uppercase font-bold tracking-wider">Meals Rescued</span>
              <span className="material-symbols-outlined text-[#006948] text-xl">rice_bowl</span>
            </div>
            <div>
              <div className="text-2xl lg:text-4xl text-[#131b2e] font-extrabold tracking-tight font-mono">
                {totalMealsRescued.toLocaleString()}
              </div>
              <div className="text-xs text-[#006948] font-semibold flex items-center gap-1 mt-1">
                <span className="material-symbols-outlined text-sm">trending_up</span> +1,240 meals logged today
              </div>
            </div>
            <div className="w-full bg-[#eaedff] h-1.5 mt-3 rounded-full overflow-hidden">
              <div className="bg-[#006948] h-full rounded-full transition-all duration-500" style={{ width: '78%' }}></div>
            </div>
          </div>

          {/* Card 2: CO2e Diverted */}
          <div className="bg-white p-4 rounded-xl shadow-sm border border-[#bccac0]/30 relative overflow-hidden flex flex-col justify-between">
            <div className="flex items-center justify-between text-[#3d4a42] mb-2">
              <span className="text-xs uppercase font-bold tracking-wider">Landfill CO2e Diverted</span>
              <span className="material-symbols-outlined text-[#006948] text-xl">co2</span>
            </div>
            <div>
              <div className="text-2xl lg:text-4xl text-[#131b2e] font-extrabold tracking-tight font-mono">
                1,321 T
              </div>
              <div className="text-xs text-[#006948] font-semibold flex items-center gap-1 mt-1">
                <span className="material-symbols-outlined text-sm">eco</span> 98.4% biological diversion
              </div>
            </div>
            <div className="w-full bg-[#eaedff] h-1.5 mt-3 rounded-full overflow-hidden">
              <div className="bg-[#006948] h-full rounded-full" style={{ width: '89%' }}></div>
            </div>
          </div>

          {/* Card 3: Surplus-to-Table SLA */}
          <div className="bg-white p-4 rounded-xl shadow-sm border border-[#bccac0]/30 relative overflow-hidden flex flex-col justify-between">
            <div className="flex items-center justify-between text-[#3d4a42] mb-2">
              <span className="text-xs uppercase font-bold tracking-wider">Surplus-to-Table SLA</span>
              <span className="material-symbols-outlined text-[#006194] text-xl">speed</span>
            </div>
            <div>
              <div className="text-2xl lg:text-4xl text-[#006194] font-extrabold tracking-tight font-mono">
                31.4 min
              </div>
              <div className="text-xs text-[#3d4a42] flex items-center gap-1 mt-1">
                <span className="material-symbols-outlined text-sm">schedule</span> Target: &lt;45 min perishable window
              </div>
            </div>
            <div className="w-full bg-[#eaedff] h-1.5 mt-3 rounded-full overflow-hidden">
              <div className="bg-[#006194] h-full rounded-full" style={{ width: '70%' }}></div>
            </div>
          </div>

          {/* Card 4: Beneficiary Access */}
          <div className="bg-white p-4 rounded-xl shadow-sm border border-[#bccac0]/30 relative overflow-hidden flex flex-col justify-between">
            <div className="flex items-center justify-between text-[#3d4a42] mb-2">
              <span className="text-xs uppercase font-bold tracking-wider">Beneficiary Access</span>
              <span className="material-symbols-outlined text-[#904d00] text-xl">volunteer_activism</span>
            </div>
            <div>
              <div className="text-2xl lg:text-4xl text-[#904d00] font-extrabold tracking-tight font-mono">
                Rs. 0.00
              </div>
              <div className="text-xs text-[#3d4a42] flex items-center gap-1 mt-1">
                <span className="material-symbols-outlined text-sm">handshake</span> 100% Free Sovereign Food Right
              </div>
            </div>
            <div className="w-full bg-[#eaedff] h-1.5 mt-3 rounded-full overflow-hidden">
              <div className="bg-[#fe932c] h-full rounded-full" style={{ width: '100%' }}></div>
            </div>
          </div>
        </div>

        {/* Main Tactical Workspace: Map & Dispatch Operations Feed */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Interactive Punjab GT Road Operations Map Pane (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="bg-white rounded-xl shadow-sm border border-[#bccac0]/30 p-4 flex flex-col">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#bccac0]/20">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#006948] text-xl">satellite_alt</span>
                    <h2 className="font-headline font-bold text-lg text-[#131b2e]">
                      GT Road Real-Time Dispatch Grid
                    </h2>
                  </div>
                  <p className="text-xs text-[#3d4a42]">
                    Moveable interactive spatial tracking across Jalandhar, Phagwara &amp; Ludhiana
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {/* View Mode Toggle */}
                  <div className="flex items-center p-0.5 bg-[#eaedff] rounded-lg border border-[#bccac0]/30">
                    <button
                      type="button"
                      onClick={() => setMapViewMode('real-slippy')}
                      className={`px-2.5 py-1 text-xs rounded-md font-bold transition-all cursor-pointer flex items-center gap-1 ${
                        mapViewMode === 'real-slippy'
                          ? 'bg-[#006948] text-white shadow-xs'
                          : 'text-[#3d4a42] hover:text-[#131b2e]'
                      }`}
                    >
                      <span className="material-symbols-outlined text-sm">satellite</span>
                      <span>Moveable Corridor</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setMapViewMode('schematic')}
                      className={`px-2.5 py-1 text-xs rounded-md font-bold transition-all cursor-pointer flex items-center gap-1 ${
                        mapViewMode === 'schematic'
                          ? 'bg-[#006948] text-white shadow-xs'
                          : 'text-[#3d4a42] hover:text-[#131b2e]'
                      }`}
                    >
                      <span className="material-symbols-outlined text-sm">hub</span>
                      <span>Schematic</span>
                    </button>
                  </div>
                </div>
              </div>

              {mapViewMode === 'real-slippy' ? (
                <div className="mt-3">
                  <CorridorSpatialMap />
                </div>
              ) : (
              <div className="relative w-full h-[460px] rounded-xl overflow-hidden bg-[#e2e7ff] shadow-inner mt-3">
                {/* Background Map Graphic */}
                <div
                  className="w-full h-full bg-cover bg-center transition-transform duration-1000"
                  style={{
                    backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDty-iUlAmhXGonknn5FjVxAdmy5JYrFASzt5KKKRgRAjPeWUSFns7r6ZKn8rZPCuXDiYbTVyd2aMK2u6673uVF3_K5LBqRYr6McCmCpGUcTJqm5hotTxtaEPrWaSTlT5Mzpmpae8I7A0xfDGdYtwUFb9Nb3-w-zvC6mHP-1RCk8SGktrTiLGQ6V-ICxZl3z2UKtHaxWQfyzaK77gFECSxaUn8uAnrj34Fz_eXFlbSw80uCUYq1db8vhw')`,
                  }}
                ></div>

                {/* Map HUD Overlay Gradient */}
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/50 via-transparent to-black/20"></div>

                {/* Node 1: Jalandhar Civil Shelter */}
                <div className="absolute top-10 left-8 p-2.5 rounded-lg bg-[#faf8ff]/95 backdrop-blur-md shadow-md max-w-xs transition-transform hover:scale-105 pointer-events-auto border border-[#bccac0]/40">
                  <div className="flex items-start gap-2">
                    <span className="p-1 rounded-md bg-[#00855d] text-[#f5fff7]">
                      <span className="material-symbols-outlined text-base">night_shelter</span>
                    </span>
                    <div>
                      <div className="text-xs font-bold text-[#131b2e]">Jalandhar Civil Shelter Hub</div>
                      <div className="text-[11px] text-[#3d4a42]">Capacity: 160 / 200 Meals</div>
                      <div className="text-[10px] text-[#006948] font-bold flex items-center gap-1 mt-0.5">
                        <span className="material-symbols-outlined text-xs">check_circle</span> Drop completed 12m ago
                      </div>
                    </div>
                  </div>
                </div>

                {/* Node 2: Phagwara Active Node */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-3 rounded-lg bg-[#faf8ff]/95 backdrop-blur-md shadow-xl max-w-sm pointer-events-auto ring-2 ring-[#fe932c] border border-amber-300">
                  <div className="flex items-start gap-2">
                    <span className="p-1 rounded-md bg-[#fe932c] text-[#663500] animate-pulse">
                      <span className="material-symbols-outlined text-base">emergency_home</span>
                    </span>
                    <div className="space-y-0.5">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-bold text-[#131b2e]">Phagwara Palace Banquet</span>
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#ffdad6] text-[#93000a] font-mono font-bold">
                          {formatTimer(urgentSeconds)} Window
                        </span>
                      </div>
                      <div className="text-xs text-[#131b2e]">180 Dal Makhani &amp; Basmati Pulao Tins</div>
                      <div className="flex items-center gap-2 text-[10px] text-[#3d4a42] pt-1">
                        <span className="flex items-center gap-0.5 text-[#006948] font-bold">
                          <span className="material-symbols-outlined text-xs">thermostat</span> 71°C Insulated
                        </span>
                        <span>•</span>
                        <span className="text-[#006194] font-bold">EV-04 en route (2.3 km away)</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Node 3: Ludhiana Railway Cluster */}
                <div className="absolute bottom-10 right-8 p-2.5 rounded-lg bg-[#faf8ff]/95 backdrop-blur-md shadow-md max-w-xs transition-transform hover:scale-105 pointer-events-auto border border-[#bccac0]/40">
                  <div className="flex items-start gap-2">
                    <span className="p-1 rounded-md bg-[#007bb9] text-[#fdfcff]">
                      <span className="material-symbols-outlined text-base">train</span>
                    </span>
                    <div>
                      <div className="text-xs font-bold text-[#131b2e]">Ludhiana Railway Migrant Guild</div>
                      <div className="text-[11px] text-[#3d4a42]">Scheduled Demand: 240 Beneficiaries</div>
                      <div className="text-[10px] text-[#006194] font-bold flex items-center gap-1 mt-0.5">
                        <span className="material-symbols-outlined text-xs">schedule</span> Inbound Dispatch #NL-884
                      </div>
                    </div>
                  </div>
                </div>

                {/* Moving Fleet Indicators on GT-Road */}
                <div className="absolute top-[38%] left-[32%] pointer-events-auto cursor-pointer group">
                  <div className="relative flex items-center justify-center">
                    <span className="absolute w-8 h-8 rounded-full bg-[#006948]/40 animate-ping"></span>
                    <div className="w-8 h-8 rounded-full bg-[#006948] text-white flex items-center justify-center shadow-lg group-hover:scale-125 transition-transform">
                      <span className="material-symbols-outlined text-base">electric_rickshaw</span>
                    </div>
                  </div>
                  <div className="hidden group-hover:block absolute bottom-9 left-1/2 -translate-x-1/2 bg-[#faf8ff] text-[#131b2e] p-1.5 rounded shadow-lg text-[10px] font-mono whitespace-nowrap z-20 border border-[#bccac0]/40">
                    PB-08-EV-4102 | Speed: 42 km/h
                  </div>
                </div>

                <div className="absolute top-[65%] left-[62%] pointer-events-auto cursor-pointer group">
                  <div className="relative flex items-center justify-center">
                    <span className="absolute w-8 h-8 rounded-full bg-[#006194]/40 animate-ping"></span>
                    <div className="w-8 h-8 rounded-full bg-[#006194] text-white flex items-center justify-center shadow-lg group-hover:scale-125 transition-transform">
                      <span className="material-symbols-outlined text-base">local_shipping</span>
                    </div>
                  </div>
                  <div className="hidden group-hover:block absolute bottom-9 left-1/2 -translate-x-1/2 bg-[#faf8ff] text-[#131b2e] p-1.5 rounded shadow-lg text-[10px] font-mono whitespace-nowrap z-20 border border-[#bccac0]/40">
                    PB-10-EV-1904 | Temp: 68°C Nominal
                  </div>
                </div>

                {/* Legend Overlay */}
                <div className="absolute bottom-3 left-3 bg-[#faf8ff]/90 backdrop-blur-md p-1.5 px-3 rounded-lg flex items-center gap-3 shadow-sm border border-[#bccac0]/30 text-xs">
                  <span className="text-[#3d4a42] font-bold">GT Road Telemetry:</span>
                  <span className="flex items-center gap-1 text-[#006948] font-bold">
                    <span className="w-2 h-2 rounded-full bg-[#006948]"></span> Pickups
                  </span>
                  <span className="flex items-center gap-1 text-[#006194] font-bold">
                    <span className="w-2 h-2 rounded-full bg-[#006194]"></span> Drop Shelters
                  </span>
                  <span className="flex items-center gap-1 text-[#904d00] font-bold">
                    <span className="w-2 h-2 rounded-full bg-[#904d00]"></span> Urgent &lt;45m
                  </span>
                </div>
              </div>
              )}

              {/* Bottom Telemetry Mini-Bar */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-3">
                <div className="p-2.5 bg-[#eaedff] rounded-lg flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#006948] text-xl">sensors</span>
                  <div>
                    <div className="text-[11px] text-[#3d4a42]">IoT Thermal Probes</div>
                    <div className="text-xs font-bold text-[#131b2e]">24/24 Sensors Online</div>
                  </div>
                </div>
                <div className="p-2.5 bg-[#eaedff] rounded-lg flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#006194] text-xl">route</span>
                  <div>
                    <div className="text-[11px] text-[#3d4a42]">Corridor Congestion</div>
                    <div className="text-xs font-bold text-[#131b2e]">Optimal (+1.2 min delay)</div>
                  </div>
                </div>
                <div className="p-2.5 bg-[#eaedff] rounded-lg flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#904d00] text-xl">
                    format_image_left
                  </span>
                  <div>
                    <div className="text-[11px] text-[#3d4a42]">HACCP Chain of Custody</div>
                    <div className="text-xs font-bold text-[#131b2e]">100% Traceable Hash</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Dignity & Community Trust Barometer */}
            <div className="bg-white rounded-xl shadow-sm border border-[#bccac0]/30 p-4 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#85f8c4] text-[#002114] flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-3xl">sentiment_satisfied</span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-headline font-bold text-base text-[#131b2e]">
                      4.92 / 5.0 Community Dignity Score
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-[#85f8c4] text-[#002114] text-[10px] font-bold uppercase">
                      Audited
                    </span>
                  </div>
                  <p className="text-xs text-[#3d4a42] leading-snug mt-0.5">
                    Zero-stigma distribution policy: anonymous pickup tokens, dignified warm
                    stainless steel chafers, and direct recipient safety surveys.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <div className="text-right">
                  <div className="text-[10px] text-[#3d4a42]">Civic Trust Index</div>
                  <div className="text-sm font-bold text-[#006948]">99.4% Positive Verification</div>
                </div>
                <svg className="w-12 h-12" viewBox="0 0 36 36">
                  <path
                    className="text-[#eaedff]"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3.5"
                  />
                  <path
                    className="text-[#006948]"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeDasharray="99.4, 100"
                    strokeLinecap="round"
                    strokeWidth="3.5"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Tactical Operations Feed & Quick Actions (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {/* Live Stream Feed Container */}
            <div className="bg-white rounded-xl shadow-sm border border-[#bccac0]/30 p-4 flex flex-col">
              <div className="flex items-center justify-between pb-2 border-b border-[#bccac0]/20">
                <div>
                  <h2 className="font-headline font-bold text-base text-[#131b2e]">Active Rescue Stream</h2>
                  <span className="text-xs text-[#3d4a42]">Continuous CVRPTW queue</span>
                </div>
                {/* Category Tabs */}
                <div className="flex items-center p-0.5 bg-[#eaedff] rounded-lg gap-0.5">
                  <button
                    onClick={() => setActiveTabFilter('all')}
                    className={`px-2.5 py-1 text-xs rounded-md font-semibold transition-all ${
                      activeTabFilter === 'all'
                        ? 'bg-white text-[#006948] font-bold shadow-sm'
                        : 'text-[#3d4a42] hover:text-[#131b2e]'
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setActiveTabFilter('urgent')}
                    className={`px-2.5 py-1 text-xs rounded-md font-semibold transition-all ${
                      activeTabFilter === 'urgent'
                        ? 'bg-white text-[#006948] font-bold shadow-sm'
                        : 'text-[#3d4a42] hover:text-[#131b2e]'
                    }`}
                  >
                    Urgent
                  </button>
                  <button
                    onClick={() => setActiveTabFilter('transit')}
                    className={`px-2.5 py-1 text-xs rounded-md font-semibold transition-all ${
                      activeTabFilter === 'transit'
                        ? 'bg-white text-[#006948] font-bold shadow-sm'
                        : 'text-[#3d4a42] hover:text-[#131b2e]'
                    }`}
                  >
                    In Transit
                  </button>
                </div>
              </div>

              {/* Rescue Cards Stream */}
              <div className="space-y-3 mt-3 max-h-[480px] overflow-y-auto pr-1">
                {filteredRescues.map((item) => (
                  <div
                    key={item.id}
                    className={`p-3.5 rounded-xl bg-[#f2f3ff] hover:bg-[#eaedff] transition-all shadow-sm space-y-2 border-l-4 ${
                      item.type === 'urgent' ? 'border-[#ba1a1a]' : 'border-[#006948]'
                    } ${item.completed ? 'opacity-50' : ''}`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 ${item.statusColor}`}>
                        <span className="material-symbols-outlined text-xs">
                          {item.type === 'urgent' ? 'bolt' : 'local_shipping'}
                        </span>
                        {item.statusBadge}
                      </span>
                      <span className="text-xs font-mono font-bold text-[#904d00]">
                        {item.remainingTime}
                      </span>
                    </div>

                    <div>
                      <div className="text-sm font-bold text-[#131b2e] leading-snug">{item.title}</div>
                      <div className="text-xs text-[#3d4a42]">{item.details}</div>
                    </div>

                    <div className="flex items-center justify-between pt-1 text-xs text-[#3d4a42]">
                      <div className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm text-[#006948]">person</span>
                        <span>Driver: {item.driver}</span>
                      </div>
                      <div className="flex items-center gap-1 font-semibold text-[#006948]">
                        <span className="material-symbols-outlined text-sm">directions_car</span>
                        <span>ETA: {item.etaMins} mins</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs pt-1 border-t border-[#bccac0]/20">
                      <span className="px-2 py-0.5 rounded bg-[#85f8c4] text-[#002114] text-[11px] font-semibold">
                        {item.tempStatus}
                      </span>
                      {item.completed ? (
                        <span className="text-[#006948] font-bold flex items-center gap-1">
                          <span className="material-symbols-outlined text-sm">check_circle</span> Delivered
                        </span>
                      ) : (
                        <button
                          onClick={() => handleConfirmHandover(item.id)}
                          className="text-[#006948] hover:text-[#00855d] font-bold flex items-center gap-0.5 cursor-pointer"
                        >
                          Confirm Handover <span className="material-symbols-outlined text-sm">arrow_forward</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Intervention & Dispatch Simulation Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-[#bccac0]/30 p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-headline font-bold text-sm text-[#131b2e]">
                  Emergency Command Actions
                </h3>
                <span className="material-symbols-outlined text-[#3d4a42] text-lg">tune</span>
              </div>

              <div className="space-y-2">
                {/* Simulate Banquet Surplus */}
                <button
                  onClick={handleSimulateSurplus}
                  className="w-full text-left p-2.5 rounded-lg bg-[#eaedff] hover:bg-[#e2e7ff] transition-colors flex items-center justify-between group cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-8 h-8 rounded-lg bg-[#00855d] text-[#f5fff7] flex items-center justify-center flex-shrink-0">
                      <span className="material-symbols-outlined text-base">add_circle</span>
                    </span>
                    <div>
                      <div className="text-xs font-bold text-[#131b2e] group-hover:text-[#006948] transition-colors">
                        Simulate Midnight Banquet Surplus
                      </div>
                      <div className="text-[11px] text-[#3d4a42]">
                        Inject 150 meals from Jalandhar Club into dispatch
                      </div>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-[#3d4a42] text-sm group-hover:translate-x-1 transition-transform">
                    chevron_right
                  </span>
                </button>

                {/* Volunteer Broadcast */}
                <button
                  onClick={handleBroadcastSMS}
                  className="w-full text-left p-2.5 rounded-lg bg-[#eaedff] hover:bg-[#e2e7ff] transition-colors flex items-center justify-between group cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-8 h-8 rounded-lg bg-[#007bb9] text-[#fdfcff] flex items-center justify-center flex-shrink-0">
                      <span className="material-symbols-outlined text-base">sms</span>
                    </span>
                    <div>
                      <div className="text-xs font-bold text-[#131b2e] group-hover:text-[#006194] transition-colors">
                        Broadcast SMS to 42 Scout Volunteers
                      </div>
                      <div className="text-[11px] text-[#3d4a42]">
                        Mobilize GT Road rapid-response bike fleet
                      </div>
                    </div>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                      smsTransmitted
                        ? 'bg-[#85f8c4] text-[#002114]'
                        : 'bg-[#dae2fd] text-[#3d4a42]'
                    }`}
                  >
                    {smsTransmitted ? 'Transmitted (42/42)' : 'Ready'}
                  </span>
                </button>

                {/* Bio-Gas Spoilage Safe-Reroute */}
                <button
                  onClick={handleBiogasReroute}
                  className="w-full text-left p-2.5 rounded-lg bg-[#eaedff] hover:bg-[#e2e7ff] transition-colors flex items-center justify-between group cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-8 h-8 rounded-lg bg-[#904d00] text-white flex items-center justify-center flex-shrink-0">
                      <span className="material-symbols-outlined text-base">recycling</span>
                    </span>
                    <div>
                      <div className="text-xs font-bold text-[#131b2e] group-hover:text-[#904d00] transition-colors">
                        Trigger Bio-Gas Spoilage Safe-Reroute
                      </div>
                      <div className="text-[11px] text-[#3d4a42]">
                        Prevent consumption; convert compromised food to clean energy
                      </div>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-[#3d4a42] text-sm group-hover:translate-x-1 transition-transform">
                    chevron_right
                  </span>
                </button>
              </div>

              {/* Toast */}
              {toastMessage && (
                <div className="p-2.5 rounded-lg bg-[#85f8c4] text-[#002114] text-xs font-semibold flex items-center gap-2 animate-in fade-in duration-200">
                  <span className="material-symbols-outlined text-base">check_circle</span>
                  <span>{toastMessage}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Operations Insights and Cold-Chain Fleet Status Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* FSSAI Statutory Indemnity Box */}
          <div className="bg-white p-4 rounded-xl shadow-sm border border-[#bccac0]/30 flex flex-col justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-[#006948]">
                <span className="material-symbols-outlined text-lg">gavel</span>
                <span className="text-sm font-bold">Good Samaritan Safe Harbor</span>
              </div>
              <p className="text-xs text-[#3d4a42] leading-relaxed">
                Section 31(C) National Food Standards compliance automatically logs digital chain of
                custody, indemnifying commercial donors against liability upon verified transfer.
              </p>
            </div>
            <div className="pt-3 flex items-center justify-between text-xs border-t border-[#bccac0]/20 mt-3">
              <span className="text-[#3d4a42] font-mono text-[11px]">HASH: 0x8F91...2D10</span>
              <span className="text-[#006948] font-bold flex items-center gap-0.5">
                <span className="material-symbols-outlined text-xs">verified</span> Audited Legal Vault
              </span>
            </div>
          </div>

          {/* Rapid EV Fleet Efficiency */}
          <div className="bg-white p-4 rounded-xl shadow-sm border border-[#bccac0]/30 flex flex-col justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-[#006194]">
                <span className="material-symbols-outlined text-lg">electric_meter</span>
                <span className="text-sm font-bold">Fleet Electrification &amp; Range</span>
              </div>
              <p className="text-xs text-[#3d4a42] leading-relaxed">
                All 14 active GT Road rescue units operate on clean electric powertrains equipped
                with dual active PID temperature-controlled food holds.
              </p>
            </div>
            <div className="pt-3 flex items-center justify-between text-xs border-t border-[#bccac0]/20 mt-3">
              <span className="text-[#3d4a42]">Avg Battery SOC: 84%</span>
              <span className="text-[#006194] font-bold">Zero Direct Tailpipe CO₂</span>
            </div>
          </div>

          {/* Autonomous Routing Engine CVRPTW */}
          <div className="bg-white p-4 rounded-xl shadow-sm border border-[#bccac0]/30 flex flex-col justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-[#904d00]">
                <span className="material-symbols-outlined text-lg">alt_route</span>
                <span className="text-sm font-bold">Predictive Decay Dynamic Routing</span>
              </div>
              <p className="text-xs text-[#3d4a42] leading-relaxed">
                Capacitated Vehicle Routing with Time Windows (CVRPTW) prioritizes drops based on
                ambient temperature, humidity, and calculated micro-spoilage curves.
              </p>
            </div>
            <div className="pt-3 flex items-center justify-between text-xs border-t border-[#bccac0]/20 mt-3">
              <span className="text-[#3d4a42]">Calculations: 340 paths/sec</span>
              <span className="text-[#904d00] font-bold">Latency: 140ms</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
