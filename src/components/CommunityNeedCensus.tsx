import React, { useState } from 'react';
import { CensusNode, ScoutSMS } from '../types.ts';
import { calculateBatchSlices } from '../utils/rescueMath.ts';
import { AddCensusNodeModal } from './AddCensusNodeModal.tsx';

export const CommunityNeedCensus: React.FC = () => {
  // Batch Slicer state
  const [batchSize, setBatchSize] = useState(150);
  const [nutritionalFilter, setNutritionalFilter] = useState<'protein' | 'roti'>('protein');
  const [selectedNodeKey, setSelectedNodeKey] = useState<string>('hospital');
  const [totalVerifiedHeadcount, setTotalVerifiedHeadcount] = useState(1842);
  const [manifestModalOpen, setManifestModalOpen] = useState(false);
  const [addNodeModalOpen, setAddNodeModalOpen] = useState(false);
  const [scoutInputText, setScoutInputText] = useState('');
  const [toastText, setToastText] = useState<string | null>(null);

  // SMS Telemetry Feed
  const [smsStream, setSmsStream] = useState<ScoutSMS[]>([
    {
      id: 'sms-1',
      sender: 'Scout Balwant (Phagwara)',
      phone: '+91 98140-77219',
      timeAgo: '12m ago',
      rawText: 'NODE PH-1109: +14 MIGRANT WORKERS ARRIVED FROM AMBALA TRAIN. NEED EXTRA ROTI QUOTA.',
      parsedSummary: 'Verified: +14 Headcount increment applied to Railway Flyover Camp.',
      verified: true,
    },
    {
      id: 'sms-2',
      sender: 'Sister Sunita (Jalandhar)',
      phone: '+91 98722-10492',
      timeAgo: '28m ago',
      rawText: 'JL-2401: 22 INFANTS & MOTHERS CONFIRMED. PROTEIN DAL KHICHDI ESSENTIAL FOR NIGHT CYCLE.',
      parsedSummary: 'Parsed: Infant cohort priority locked. High-protein tag enabled.',
      verified: true,
    },
    {
      id: 'sms-3',
      sender: 'Gurjit Gill (Ludhiana)',
      phone: '+91 94178-55310',
      timeAgo: '42m ago',
      rawText: 'LD-9904: NIGHT SHIFT WORKERS RETURNING AT 21:00 HRS. 110 MEALS REQUIRED AT KILN SECTOR.',
      parsedSummary: 'Verified: Ludhiana West kiln colony scheduled for Batch 2 handoff.',
      verified: true,
    },
  ]);

  // Census Nodes data (Stateful so new nodes can be registered!)
  const [censusNodes, setCensusNodes] = useState<Record<string, CensusNode>>({
    hospital: {
      id: 'hospital',
      code: 'NODE JL-2401',
      name: 'Civil Hospital Shelter',
      category: 'Shelter',
      location: 'Jalandhar City',
      headcount: 65,
      children: 22,
      elderly: 19,
      urgency: 'Critical Need (Infant Cohort)',
      coordinator: 'Sister Sunita Rani (Verified Red Cross Field Scout)',
      coordinates: 'Lat 31.3260, Lon 75.5762',
      lat: 31.3260,
      lng: 75.5762,
    },
    flyover: {
      id: 'flyover',
      code: 'NODE PH-1109',
      name: 'Railway Flyover Camp',
      category: 'Railway Camp',
      location: 'Phagwara Rd',
      headcount: 85,
      children: 14,
      elderly: 8,
      urgency: 'High Fluctuating (Migrant Daily Handoff)',
      coordinator: 'Balwant Singh (Phagwara Grassroots Scout)',
      coordinates: 'Lat 31.2180, Lon 75.7725',
      lat: 31.2180,
      lng: 75.7725,
    },
    kiln: {
      id: 'kiln',
      code: 'NODE LD-9904',
      name: 'Brick Kiln Worker Colony',
      category: 'Brick Kiln',
      location: 'Ludhiana West',
      headcount: 110,
      children: 38,
      elderly: 12,
      urgency: 'Medium Window (Shift Workers)',
      coordinator: 'Gurjit Gill (Labour Union Volunteer)',
      coordinates: 'Lat 30.9010, Lon 75.8573',
      lat: 30.9010,
      lng: 75.8573,
    },
  });

  const showToast = (msg: string) => {
    setToastText(msg);
    setTimeout(() => {
      setToastText(null);
    }, 4500);
  };

  const handleAddNewNode = (newNode: CensusNode) => {
    setCensusNodes((prev) => ({
      ...prev,
      [newNode.id]: newNode,
    }));
    setSelectedNodeKey(newNode.id);
    setTotalVerifiedHeadcount((prev) => prev + newNode.headcount);
    showToast(`New census node registered: "${newNode.name}" (+${newNode.headcount} hungry souls).`);
  };

  // Convert censusNodes record to array for slicing
  const nodesForSlicing = Object.values(censusNodes).map((node) => ({
    id: node.id,
    name: node.name,
    capacity: node.headcount,
  }));
  const sliceResults = calculateBatchSlices(batchSize, nodesForSlicing);

  const activeNode = censusNodes[selectedNodeKey] || censusNodes['hospital'];

  const handleScoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!scoutInputText.trim()) return;

    const newSMS: ScoutSMS = {
      id: `sms-${Date.now()}`,
      sender: 'Simulated Scout',
      phone: '+91 98140-SIMUL',
      timeAgo: 'Just Now',
      rawText: scoutInputText.trim().toUpperCase(),
      parsedSummary: 'Parsed: Real-time headcount calibrated',
      verified: true,
    };

    setSmsStream([newSMS, ...smsStream]);
    setScoutInputText('');
    setTotalVerifiedHeadcount((prev) => prev + 12);
    showToast('SMS Telemetry digested: Headcount verified without internet.');
  };

  const handleSyncScouts = () => {
    showToast('Synchronizing with 14 offline mesh nodes across GT Road...');
  };

  return (
    <div className="flex flex-col w-full pb-10">
      {/* Top Command Ribbon */}
      <div className="w-full bg-[#e2e7ff] px-4 md:px-6 py-2 shadow-sm border-b border-[#bccac0]/30">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-2">
          <div className="flex items-center gap-2 flex-wrap text-xs">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#85f8c4] text-[#002114] font-bold tracking-wide uppercase">
              <span className="w-2 h-2 rounded-full bg-[#006948] animate-ping"></span>
              Telemetry Live: Punjab Grand Trunk Corridor
            </span>
            <span className="text-[#3d4a42] flex items-center gap-1 font-medium">
              <span className="material-symbols-outlined text-sm text-[#006948]">pin_drop</span>
              Jalandhar • Phagwara • Ludhiana Industrial Belt
            </span>
            <span className="px-2 py-0.5 rounded bg-[#eaedff] text-[#131b2e] font-semibold">
              Active Census Nodes: 28 Verified
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-[#3d4a42]">Last Geo-Audit: 4 mins ago via Field Mesh</span>
            <button
              onClick={handleSyncScouts}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-white text-[#006948] text-xs font-bold hover:bg-[#006948] hover:text-white transition-colors shadow-sm cursor-pointer border border-[#bccac0]/30"
              type="button"
            >
              <span className="material-symbols-outlined text-sm">sync</span>
              Sync Scouts
            </button>
          </div>
        </div>
      </div>

      {/* Operational Header Block */}
      <div className="w-full max-w-7xl mx-auto px-4 md:px-6 pt-6 pb-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-end mb-6">
          <div className="lg:col-span-8 space-y-1">
            <div className="flex items-center gap-1.5 text-[#006948] text-xs font-bold tracking-wider uppercase">
              <span className="material-symbols-outlined text-base">diversity_1</span>
              Autonomous Humanitarian Distribution Engine
            </div>
            <h1 className="font-headline font-extrabold text-2xl lg:text-4xl text-[#131b2e] tracking-tight">
              Hyperlocal Headcount Census &amp; Community Need Slicer
            </h1>
            <p className="text-xs lg:text-sm text-[#3d4a42] max-w-3xl leading-relaxed">
              Zero food dumped. Zero civic shelters omitted. Combining real-time ground-scout SMS
              telemetry, algorithmic batch decomposition, and low-friction Dignity Cards to route
              perishable hot meals with mathematical accuracy.
            </p>
          </div>
          <div className="lg:col-span-4 flex flex-row lg:flex-col items-start lg:items-end justify-between gap-1 bg-[#f2f3ff] p-4 rounded-xl shadow-sm border border-[#bccac0]/30">
            <div className="text-[11px] text-[#3d4a42] uppercase tracking-wider font-semibold">
              Total Verified Hungry in Current Sector
            </div>
            <div className="font-headline font-extrabold text-3xl lg:text-5xl text-[#006948] leading-none tracking-tight font-mono">
              {totalVerifiedHeadcount.toLocaleString()}
            </div>
            <div className="flex items-center gap-1 text-xs text-[#904d00] font-semibold">
              <span className="material-symbols-outlined text-sm">schedule</span>
              Optimal Redistribution Window: &lt;58 Mins
            </div>
          </div>
        </div>

        {/* Live Telemetry KPI Tickers */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-xl shadow-sm border border-[#bccac0]/30 space-y-1">
            <div className="flex items-center justify-between text-[#3d4a42] text-xs font-semibold">
              <span>Priority Infants &amp; Elders</span>
              <span className="material-symbols-outlined text-base text-[#904d00]">elderly</span>
            </div>
            <div className="font-headline font-bold text-2xl text-[#131b2e]">
              428 <span className="text-xs text-[#3d4a42] font-normal">souls</span>
            </div>
            <div className="text-xs text-[#006948] font-semibold flex items-center gap-1">
              <span className="material-symbols-outlined text-xs">arrow_upward</span>
              +14% Protein Quota Flag
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-sm border border-[#bccac0]/30 space-y-1">
            <div className="flex items-center justify-between text-[#3d4a42] text-xs font-semibold">
              <span>Active Dignity Cards</span>
              <span className="material-symbols-outlined text-base text-[#006194]">contactless</span>
            </div>
            <div className="font-headline font-bold text-2xl text-[#131b2e]">
              1,390 <span className="text-xs text-[#3d4a42] font-normal">cards</span>
            </div>
            <div className="text-xs text-[#006194] font-semibold">Zero-surveillance / 100% Offline</div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-sm border border-[#bccac0]/30 space-y-1">
            <div className="flex items-center justify-between text-[#3d4a42] text-xs font-semibold">
              <span>Ground Scout Relay</span>
              <span className="material-symbols-outlined text-base text-[#006948]">cell_tower</span>
            </div>
            <div className="font-headline font-bold text-2xl text-[#131b2e]">
              19 <span className="text-xs text-[#3d4a42] font-normal">SMS Influx/hr</span>
            </div>
            <div className="text-xs text-[#006948] font-semibold">Unstructured Hindi/Punjabi NLP Active</div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-sm border border-[#bccac0]/30 space-y-1">
            <div className="flex items-center justify-between text-[#3d4a42] text-xs font-semibold">
              <span>Prevented Waste Ratio</span>
              <span className="material-symbols-outlined text-base text-[#006948]">eco</span>
            </div>
            <div className="font-headline font-bold text-2xl text-[#006948]">99.8%</div>
            <div className="text-xs text-[#3d4a42]">SLA: 0 kg to municipal landfill</div>
          </div>
        </div>

        {/* Bento Row 1: Dynamic Batch Slicer & Census Nodes Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start mb-8">
          {/* Slicer Tool (Col 5) */}
          <div className="lg:col-span-5 bg-white p-6 rounded-xl shadow-sm border border-[#bccac0]/30 space-y-4">
            <div className="flex items-center justify-between pb-1 border-b border-[#bccac0]/20">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#006948] text-xl">pie_chart</span>
                <h2 className="font-headline font-bold text-base text-[#131b2e]">
                  Dynamic Batch Slicer
                </h2>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-[#ffdcc3] text-[#2f1500] text-xs font-bold">
                Live Math Kernel
              </span>
            </div>
            <p className="text-xs text-[#3d4a42] leading-relaxed">
              Simulate inbound catering, wedding hall, or temple surplus. The algorithmic slicer
              decomposes batches across registered shelters in real-time, matching headcount
              constraints without manual guesswork.
            </p>

            {/* Slider Input */}
            <div className="bg-[#f2f3ff] p-4 rounded-xl space-y-2 border border-[#bccac0]/20">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-[#131b2e]">Inbound Surplus Batch Size:</label>
                <div className="flex items-center gap-1 bg-white px-2.5 py-1 rounded shadow-sm border border-[#bccac0]/30">
                  <span className="font-headline font-bold text-lg text-[#006948] font-mono">
                    {batchSize}
                  </span>
                  <span className="text-xs text-[#3d4a42]">meals</span>
                </div>
              </div>
              <input
                type="range"
                min="40"
                max="450"
                step="5"
                value={batchSize}
                onChange={(e) => setBatchSize(parseInt(e.target.value, 10))}
                className="w-full accent-[#006948] h-2 bg-[#dae2fd] rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-[#3d4a42] pt-1">
                <span>40 meals (Min Van)</span>
                <span>150 (Default Load)</span>
                <span>450 (Heavy Carrier)</span>
              </div>
            </div>

            {/* Nutritional Filter */}
            <div className="space-y-1.5">
              <label className="text-[11px] text-[#3d4a42] uppercase font-bold tracking-wide">
                Surplus Composition &amp; Vulnerability Matrix
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setNutritionalFilter('protein');
                    showToast('Filter Applied: High-Protein items locked to nursing mother clusters.');
                  }}
                  className={`p-2 px-3 rounded-lg text-xs font-semibold text-left flex items-center justify-between transition-colors border cursor-pointer ${
                    nutritionalFilter === 'protein'
                      ? 'bg-[#85f8c4] text-[#002114] border-[#006948] shadow-sm'
                      : 'bg-[#eaedff] text-[#3d4a42] border-transparent'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-sm">egg_alt</span>
                    High-Protein / Dal Khichdi
                  </span>
                  <span className="material-symbols-outlined text-sm">
                    {nutritionalFilter === 'protein' ? 'check_circle' : 'radio_button_unchecked'}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setNutritionalFilter('roti');
                    showToast('Filter Applied: Roti-Sabzi volume matched across heavy laborer settlements.');
                  }}
                  className={`p-2 px-3 rounded-lg text-xs font-semibold text-left flex items-center justify-between transition-colors border cursor-pointer ${
                    nutritionalFilter === 'roti'
                      ? 'bg-[#85f8c4] text-[#002114] border-[#006948] shadow-sm'
                      : 'bg-[#eaedff] text-[#3d4a42] border-transparent'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-sm">bakery_dining</span>
                    Mixed Roti &amp; Sabzi
                  </span>
                  <span className="material-symbols-outlined text-sm">
                    {nutritionalFilter === 'roti' ? 'check_circle' : 'radio_button_unchecked'}
                  </span>
                </button>
              </div>
            </div>

            {/* Real-time Allocation Breakdown */}
            <div className="space-y-2 pt-1">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span>Instant Allocation Strategy</span>
                <span
                  className={`font-bold ${
                    sliceResults.coverageStatus === 'buffer'
                      ? 'text-[#904d00]'
                      : 'text-[#006948]'
                  }`}
                >
                  {sliceResults.coverageStatusText}
                </span>
              </div>

              {/* Dynamic Sliced Allocations */}
              <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                {sliceResults.allocations.map((alloc, idx) => {
                  const node = censusNodes[alloc.nodeId];
                  const colorList = ['#006948', '#904d00', '#006194', '#b3261e', '#6750a4'];
                  const dotColor = colorList[idx % colorList.length];
                  const capacity = node ? node.headcount : 0;
                  return (
                    <div
                      key={alloc.nodeId}
                      className="bg-[#eaedff] p-2.5 rounded-lg flex items-center justify-between gap-2 border border-[#bccac0]/20"
                    >
                      <div className="space-y-0.5 min-w-0">
                        <div className="text-xs font-bold text-[#131b2e] flex items-center gap-1.5 truncate">
                          <span
                            className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                            style={{ backgroundColor: dotColor }}
                          ></span>
                          Node #{idx + 1}: {alloc.nodeName}
                        </div>
                        <div className="text-[11px] text-[#3d4a42]">
                          Capacity: {capacity} • {node ? node.location : 'Sector Corridor'}
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div
                          className="font-headline font-bold text-base font-mono"
                          style={{ color: dotColor }}
                        >
                          {alloc.allocated}
                        </div>
                        <div className="text-[10px] text-[#3d4a42]">
                          {alloc.allocated > 0
                            ? alloc.remainingNeeded === 0
                              ? 'Full Quota'
                              : `Partial (-${alloc.remainingNeeded})`
                            : 'Queued Next'}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* CTA */}
            <button
              type="button"
              onClick={() => setManifestModalOpen(true)}
              className="w-full py-2.5 px-4 rounded-lg bg-[#006948] text-white font-headline font-bold text-xs hover:bg-[#00855d] transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer active:scale-95"
            >
              <span className="material-symbols-outlined text-base">local_shipping</span>
              <span>Generate Sliced Handoff Manifest</span>
            </button>
          </div>

          {/* Map & Node Inspector Pane (Col 7) */}
          <div className="lg:col-span-7 bg-white p-6 rounded-xl shadow-sm border border-[#bccac0]/30 space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2 pb-1 border-b border-[#bccac0]/20">
              <div>
                <h2 className="font-headline font-bold text-base text-[#131b2e]">
                  Hyperlocal Census Nodes
                </h2>
                <p className="text-xs text-[#3d4a42]">
                  Verified ground nodes with micro-demographic telemetry
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-[#eaedff] text-[#131b2e] text-xs font-semibold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span> {Object.keys(censusNodes).length} Verified Nodes
                </span>
                <button
                  type="button"
                  onClick={() => setAddNodeModalOpen(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#006948] text-white text-xs font-bold hover:bg-[#00855d] transition-all shadow-sm cursor-pointer active:scale-95"
                >
                  <span className="material-symbols-outlined text-sm">add_location_alt</span>
                  + Register Node
                </button>
              </div>
            </div>

            {/* Static Map Integration with Dynamic GPS/Manual Pins */}
            <div className="relative rounded-xl overflow-hidden shadow-sm border border-[#bccac0]/30">
              <div
                className="w-full h-80 bg-cover bg-center"
                style={{
                  backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDty-iUlAmhXGonknn5FjVxAdmy5JYrFASzt5KKKRgRAjPeWUSFns7r6ZKn8rZPCuXDiYbTVyd2aMK2u6673uVF3_K5LBqRYr6McCmCpGUcTJqm5hotTxtaEPrWaSTlT5Mzpmpae8I7A0xfDGdYtwUFb9Nb3-w-zvC6mHP-1RCk8SGktrTiLGQ6V-ICxZl3z2UKtHaxWQfyzaK77gFECSxaUn8uAnrj34Fz_eXFlbSw80uCUYq1db8vhw')`,
                }}
              ></div>

              {/* Map Overlay Badge */}
              <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-md shadow-sm text-xs font-semibold text-[#131b2e] flex items-center gap-1.5 border border-[#bccac0]/40">
                <span className="material-symbols-outlined text-xs text-[#006948]">satellite_alt</span>
                GT Road Real-Time Census Network
              </div>

              {/* Dynamic Map Pins */}
              {Object.values(censusNodes).map((node, idx) => {
                const isSelected = selectedNodeKey === node.id;
                // Bounding GT corridor approx: Lat 30.85 - 31.40, Lng 75.45 - 75.95
                const topPct = Math.max(8, Math.min(65, ((31.40 - node.lat) / (31.40 - 30.85)) * 60 + 10));
                const leftPct = Math.max(8, Math.min(88, ((node.lng - 75.45) / (75.95 - 75.45)) * 75 + 10));
                return (
                  <button
                    key={`pin-${node.id}`}
                    type="button"
                    onClick={() => setSelectedNodeKey(node.id)}
                    style={{ top: `${topPct}%`, left: `${leftPct}%` }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 flex items-center gap-1 px-2.5 py-1 rounded-full shadow-lg text-[10px] font-bold cursor-pointer transition-all transform hover:scale-110 ${
                      isSelected
                        ? 'bg-[#006948] text-white ring-2 ring-white z-20 scale-105 shadow-emerald-900/30'
                        : 'bg-white/95 text-[#131b2e] border border-[#bccac0]/60 z-10 hover:bg-[#85f8c4]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-xs">
                      {node.category === 'Shelter' ? 'night_shelter' : node.category === 'Railway Camp' ? 'train' : 'foundation'}
                    </span>
                    <span className="truncate max-w-[90px]">{node.name.split(' ')[0]}</span>
                    <span className="px-1.5 py-0.2 bg-black/20 rounded font-mono text-[9px]">{node.headcount}</span>
                  </button>
                );
              })}

              {/* Interactive Node Selector Buttons over Map */}
              <div className="absolute bottom-2 left-2 right-2 bg-white/95 backdrop-blur-md p-1.5 rounded-lg shadow-md flex items-center gap-1.5 border border-[#bccac0]/40 overflow-x-auto">
                {Object.values(censusNodes).map((node, idx) => (
                  <button
                    key={`tab-${node.id}`}
                    type="button"
                    onClick={() => setSelectedNodeKey(node.id)}
                    className={`min-w-[130px] flex-1 text-left px-2.5 py-1 rounded transition-colors cursor-pointer ${
                      selectedNodeKey === node.id ? 'bg-[#eaedff] ring-1 ring-[#006948]' : 'hover:bg-[#f2f3ff]'
                    }`}
                  >
                    <div className="text-xs font-bold flex items-center gap-1 text-[#131b2e] truncate">
                      <span className="w-2 h-2 rounded-full bg-[#006948] flex-shrink-0"></span> #{idx + 1} {node.name}
                    </div>
                    <div className="text-[11px] text-[#3d4a42] truncate">
                      {node.category} • {node.headcount} souls
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Node Deep Inspector Details */}
            <div className="bg-[#f2f3ff] p-4 rounded-xl space-y-3 border border-[#bccac0]/20">
              <div className="flex items-center justify-between pb-1">
                <div>
                  <span className="text-[10px] text-[#006948] uppercase font-bold tracking-wider">
                    {activeNode.code}
                  </span>
                  <h3 className="font-headline font-bold text-base text-[#131b2e]">{activeNode.name}</h3>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-[#85f8c4] text-[#002114] text-xs font-bold">
                  {activeNode.urgency}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="bg-white p-2 rounded-lg border border-[#bccac0]/20 shadow-sm">
                  <div className="text-[10px] text-[#3d4a42] uppercase font-semibold">Verified Total</div>
                  <div className="font-headline font-bold text-lg text-[#131b2e] font-mono">
                    {activeNode.headcount}
                  </div>
                </div>
                <div className="bg-white p-2 rounded-lg border border-[#bccac0]/20 shadow-sm">
                  <div className="text-[10px] text-[#3d4a42] uppercase font-semibold">Children &lt;7 yrs</div>
                  <div className="font-headline font-bold text-lg text-[#006948] font-mono">
                    {activeNode.children}
                  </div>
                </div>
                <div className="bg-white p-2 rounded-lg border border-[#bccac0]/20 shadow-sm">
                  <div className="text-[10px] text-[#3d4a42] uppercase font-semibold">Elderly &gt;60 yrs</div>
                  <div className="font-headline font-bold text-lg text-[#904d00] font-mono">
                    {activeNode.elderly}
                  </div>
                </div>
              </div>

              <div className="text-xs text-[#3d4a42] flex items-start gap-2 bg-white p-2.5 rounded-lg border border-[#bccac0]/20">
                <span className="material-symbols-outlined text-[#006948] text-base mt-0.5">verified_user</span>
                <div>
                  <span className="font-bold text-[#131b2e]">Coordinator Contact:</span>
                  <span> {activeNode.coordinator} • {activeNode.coordinates}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bento Row 2: Offline Dignity Token Architecture & Grassroots Scout Intake */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch mb-8">
          {/* Offline Dignity Token System (Col 7) */}
          <div className="lg:col-span-7 bg-white p-6 rounded-xl shadow-sm border border-[#bccac0]/30 flex flex-col justify-between space-y-4">
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-[#006948] text-xs font-bold uppercase tracking-wider">
                <span className="material-symbols-outlined text-base">contactless</span>
                Low-Tech Inclusion Shield
              </div>
              <h2 className="font-headline font-bold text-base text-[#131b2e]">
                Offline Dignity Token System
              </h2>
              <p className="text-xs text-[#3d4a42] leading-relaxed">
                Zero smartphones. Zero biometric logging. Daily-wage migrant laborers and vulnerable
                unhoused folks receive meals using indestructible NFC / Paper-QR Dignity Tokens,
                ensuring privacy and non-invasive accountability.
              </p>
            </div>

            {/* Token Card Visual Demo */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-2">
              {/* Physical Card Mock */}
              <div className="bg-[#e2e7ff] rounded-xl p-4 flex flex-col justify-between shadow-sm relative overflow-hidden border border-[#bccac0]/30">
                <div className="absolute -right-4 -bottom-4 w-28 h-28 bg-[#006948]/10 rounded-full blur-xl pointer-events-none"></div>
                <div className="flex items-center justify-between pb-3">
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[#006948] text-xl">spa</span>
                    <span className="text-[11px] text-[#006948] font-bold uppercase tracking-wider">
                      NourishLink Dignity Token
                    </span>
                  </div>
                  <span className="material-symbols-outlined text-[#3d4a42] text-lg">contactless</span>
                </div>
                <div className="space-y-1">
                  <div className="text-[10px] text-[#3d4a42]">Corridor Token ID</div>
                  <div className="font-headline font-bold text-lg text-[#131b2e] font-mono tracking-wider">
                    PUN-JL-8841-B
                  </div>
                  <div className="text-xs text-[#904d00] font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#904d00]"></span>
                    Family Unit: 4 Members Registered
                  </div>
                </div>
                <div className="pt-4 flex items-center justify-between text-[11px] text-[#3d4a42]">
                  <span>Cryptographic QR: Valid 180 Days</span>
                  <span className="px-1.5 py-0.5 rounded bg-white font-mono text-[10px] font-bold">
                    FSSAI G-31
                  </span>
                </div>
              </div>

              {/* Feature Matrix */}
              <div className="space-y-2 flex flex-col justify-center">
                <div className="flex items-start gap-2 p-1.5 rounded-lg hover:bg-[#f2f3ff] transition-colors">
                  <span className="material-symbols-outlined text-[#006948] text-lg mt-0.5">lock_clock</span>
                  <div>
                    <h4 className="text-xs font-bold text-[#131b2e]">No Biometrics or Aadhaar Mandates</h4>
                    <p className="text-[11px] text-[#3d4a42]">
                      Food is a fundamental human right, never tied to surveillance or immigration scrutiny.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2 p-1.5 rounded-lg hover:bg-[#f2f3ff] transition-colors">
                  <span className="material-symbols-outlined text-[#006194] text-lg mt-0.5">offline_bolt</span>
                  <div>
                    <h4 className="text-xs font-bold text-[#131b2e]">Offline Field Mesh Scanners</h4>
                    <p className="text-[11px] text-[#3d4a42]">
                      Volunteers tap tokens with basic NFC wands. Encrypted vouchers sync automatically.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2 p-1.5 rounded-lg hover:bg-[#f2f3ff] transition-colors">
                  <span className="material-symbols-outlined text-[#904d00] text-lg mt-0.5">no_transfer</span>
                  <div>
                    <h4 className="text-xs font-bold text-[#131b2e]">Zero Double-Deprivation</h4>
                    <p className="text-[11px] text-[#3d4a42]">
                      Eliminates duplicate line counting so every camp inhabitant receives their fair portion.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#eaedff] p-3 rounded-lg flex items-center justify-between text-xs text-[#3d4a42] border border-[#bccac0]/20">
              <span>Active Token Inventory: 3,400 RFID Cards printed by Khalsa Aid volunteers</span>
              <button
                type="button"
                onClick={() => showToast('Dispatch packet sent to Khalsa Aid printing cell in Ludhiana.')}
                className="text-[#006948] font-bold hover:underline flex items-center gap-0.5 cursor-pointer"
              >
                Bulk Token Dispatch <span className="material-symbols-outlined text-sm">chevron_right</span>
              </button>
            </div>
          </div>

          {/* Grassroots Scout Reporting Desk (Col 5) */}
          <div className="lg:col-span-5 bg-white p-6 rounded-xl shadow-sm border border-[#bccac0]/30 flex flex-col justify-between space-y-4">
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-[#006948] text-xs font-bold uppercase tracking-wider">
                  <span className="material-symbols-outlined text-base">sms</span>
                  Scout Reporting Desk
                </div>
                <span className="px-2 py-0.5 rounded-full bg-[#85f8c4] text-[#002114] text-xs font-bold">
                  SMS • IVR Active
                </span>
              </div>
              <h2 className="font-headline font-bold text-base text-[#131b2e]">
                Live Scout Telegram &amp; SMS
              </h2>
              <p className="text-xs text-[#3d4a42] leading-relaxed">
                Grassroots scouts in remote railway corridors and kiln settlements send basic text
                messages to update shifting headcounts instantly.
              </p>
            </div>

            {/* Live SMS Feed Stream */}
            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {smsStream.map((sms) => (
                <div
                  key={sms.id}
                  className="p-2.5 rounded bg-[#f2f3ff] flex items-start gap-2 text-[#131b2e] border-l-2 border-[#006948]"
                >
                  <span className="material-symbols-outlined text-base text-[#006948] mt-0.5">
                    mark_chat_unread
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold">{sms.phone} ({sms.sender})</span>
                      <span className="text-[#3d4a42] text-[10px]">{sms.timeAgo}</span>
                    </div>
                    <div className="text-xs font-mono font-semibold text-[#131b2e] my-0.5">
                      "{sms.rawText}"
                    </div>
                    <div className="text-[11px] text-[#006948] font-medium">{sms.parsedSummary}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Scout Report Form */}
            <form onSubmit={handleScoutSubmit} className="bg-[#f2f3ff] p-3 rounded-xl space-y-2 border border-[#bccac0]/20">
              <div className="text-xs text-[#131b2e] font-bold flex items-center gap-1">
                <span className="material-symbols-outlined text-sm text-[#904d00]">add_circle</span>
                Simulate Incoming Scout SMS
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  required
                  placeholder="e.g. HEADCOUNT 40 MODEL TOWN FLYOVER"
                  value={scoutInputText}
                  onChange={(e) => setScoutInputText(e.target.value)}
                  className="flex-1 px-3 py-2 bg-white text-[#131b2e] rounded-lg text-xs placeholder:text-gray-400 focus:outline-none border border-[#bccac0]/30"
                />
                <button
                  type="submit"
                  className="px-3.5 py-2 bg-[#006948] text-white rounded-lg text-xs font-bold hover:bg-[#00855d] transition-colors flex items-center gap-1 shadow-sm cursor-pointer"
                >
                  <span>Transmit</span>
                  <span className="material-symbols-outlined text-sm">send</span>
                </button>
              </div>
            </form>

            {/* Toast Feedback */}
            {toastText && (
              <div className="p-2.5 rounded-lg bg-[#85f8c4] text-[#002114] text-xs font-bold flex items-center gap-2 animate-in fade-in duration-200">
                <span className="material-symbols-outlined text-sm">check_circle</span>
                <span>{toastText}</span>
              </div>
            )}
          </div>
        </div>

        {/* Editorial Storytelling Banner */}
        <div className="relative rounded-2xl overflow-hidden shadow-lg bg-[#dae2fd]">
          <div
            className="bg-cover bg-center w-full min-h-[300px] flex items-end"
            style={{
              backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDZMm5v5buwuXXxHK54TQvPcz2eJ_lTlcmUb7wewqh-kAcpWCbK7Rk2EnMfIBbZW4dx9iRB2owyP6wSeMLRJNOyD2Sk9kGIHgyYIlIOTzYGs4_ljkagWVsey_D1AKPowdeMyaN2lLQMS9BKoZyQY_8J5VgR90D2ZlgiI-aqEAMJfMARkgc6jwsa1n2lVCUj09Bd0FAm8j6l2bgnWTu9AsurpfZtulphNawPOXc4t40RYtmuG0L4mruXsg')`,
            }}
          >
            <div className="w-full bg-gradient-to-t from-[#131b2e] via-[#131b2e]/80 to-transparent p-6 md:p-8 text-white space-y-2">
              <span className="px-2 py-0.5 rounded bg-[#006948] text-white text-xs uppercase font-bold tracking-wider">
                Field Doctrine
              </span>
              <h3 className="font-headline font-bold text-xl md:text-2xl max-w-2xl leading-tight">
                "Food rescue without census precision is just charity. With algorithmic slicing, it is
                sovereign civic logistics."
              </h3>
              <p className="text-xs md:text-sm text-[#e2e7ff] max-w-2xl leading-relaxed">
                By eliminating street dumping and mismatch, NourishLink AI restores grace to daily-wage
                families across industrial belts while keeping commercial donor kitchens legally safeguarded
                under FSSAI Section 31(A).
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Sliced Manifest Modal */}
      {manifestModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white max-w-lg w-full rounded-2xl p-6 shadow-2xl space-y-4 border border-[#bccac0]/40 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-2 border-b border-[#bccac0]/20">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#006948] text-2xl">receipt_long</span>
                <h3 className="font-headline font-bold text-lg text-[#131b2e]">
                  Sliced Handoff Manifest
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setManifestModalOpen(false)}
                className="text-[#3d4a42] hover:text-[#131b2e] cursor-pointer"
              >
                <span className="material-symbols-outlined text-2xl">close</span>
              </button>
            </div>

            <div className="bg-[#f2f3ff] p-4 rounded-xl space-y-2 font-mono text-[#131b2e] border border-[#bccac0]/30">
              <div className="flex justify-between text-xs text-[#3d4a42] pb-1 border-b border-[#bccac0]/20">
                <span>MANIFEST #NLK-2025-081</span>
                <span>TIMESTAMP: JUST NOW</span>
              </div>
              <div className="text-[#006948] font-bold font-headline text-lg">
                {batchSize} MEALS SLICED ({nutritionalFilter === 'protein' ? 'High-Protein' : 'Mixed Roti & Sabzi'})
              </div>
              <div className="text-xs space-y-1.5 pt-1 text-[#131b2e]">
                {sliceResults.allocations.map((alloc) => (
                  <div key={`modal-alloc-${alloc.nodeId}`} className="flex justify-between">
                    <span>• {alloc.nodeName}:</span>
                    <span className="font-bold text-[#006948]">
                      {alloc.allocated} Meals {alloc.allocated === 0 ? '(Queued Next)' : ''}
                    </span>
                  </div>
                ))}
                {sliceResults.surplusBuffer > 0 && (
                  <div className="flex justify-between text-[#904d00]">
                    <span>• Secondary Cold Lockers:</span>
                    <span className="font-bold">+{sliceResults.surplusBuffer} Meals</span>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-1 text-xs text-[#3d4a42]">
              <div className="flex items-center gap-1.5 text-[#006948] font-bold">
                <span className="material-symbols-outlined text-sm">lock</span>
                Cold-Chain &amp; FSSAI Sec 31 Good Samaritan Protection Applied
              </div>
              <p>
                Driver dispatch pushed via LoRa/GSM to van unit PB-08-AX-9912. Offline Dignity Cards ready
                for scanning upon arrival.
              </p>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  setManifestModalOpen(false);
                  showToast('Manifest locked & autonomous fleet dispatched to sector census nodes.');
                }}
                className="w-full py-2.5 rounded-lg bg-[#006948] text-white font-headline font-bold text-sm hover:bg-[#00855d] transition-colors shadow-sm cursor-pointer"
              >
                Acknowledge &amp; Dispatch Fleet
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal to Register New Census Node with GPS / Interactive Map */}
      <AddCensusNodeModal
        isOpen={addNodeModalOpen}
        onClose={() => setAddNodeModalOpen(false)}
        onAddNode={handleAddNewNode}
      />

      {/* Toast Notification */}
      {toastText && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#131b2e] text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 text-xs border border-white/20 animate-fade-in">
          <span className="material-symbols-outlined text-[#85f8c4] text-base">check_circle</span>
          <span className="font-medium">{toastText}</span>
        </div>
      )}
    </div>
  );
};
