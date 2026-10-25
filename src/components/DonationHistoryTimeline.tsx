import React, { useState } from 'react';

export type RescueOperationStatus = 'Completed' | 'In-Transit' | 'Expired';

export interface RescueOperation {
  id: string;
  date: string;
  timeAgo: string;
  foodName: string;
  foodType: string;
  portions: number;
  weightKg: number;
  receiver: string;
  savedInr: number;
  pointsEarned: number;
  status: RescueOperationStatus;
  statusDescription: string;
  haccpTemp: string;
  haccpCompliant: boolean;
  vehicleOrDigester?: string;
  manifestHash: string;
  tamperSeal?: string;
}

export const INITIAL_RESCUE_OPERATIONS: RescueOperation[] = [
  {
    id: 'DON-9140',
    date: 'Today, 21:40 IST',
    timeAgo: '18 mins ago',
    foodName: 'Shahi Paneer, Garlic Naan & Dal Bukhara',
    foodType: 'Dairy / Rich Gravy',
    portions: 150,
    weightKg: 52,
    receiver: 'Shaheed Bhagat Singh Haven (Node A)',
    savedInr: 12000,
    pointsEarned: 380,
    status: 'In-Transit',
    statusDescription: 'Consignment en route on NH-44 Toll Bypass via EV Cargo Van PB-08-EV-4412. Driver: Gurpreet Singh. Active thermal chamber at 70.4°C.',
    haccpTemp: '70.4°C Hot Hold',
    haccpCompliant: true,
    vehicleOrDigester: 'EV Van PB-08-EV-4412 (Speed: 38 km/h • ETA 11 mins)',
    manifestHash: '0x9E4B..772',
    tamperSeal: 'SEAL-9140-PB (Active)',
  },
  {
    id: 'DON-9081',
    date: 'Today, 21:05 IST',
    timeAgo: '53 mins ago',
    foodName: 'Dal Makhani & Basmati Jeera Rice',
    foodType: 'Legume / Wet Curry',
    portions: 180,
    weightKg: 62,
    receiver: 'Shaheed Bhagat Singh Shelter (Node A)',
    savedInr: 14400,
    pointsEarned: 350,
    status: 'Completed',
    statusDescription: 'Successfully delivered and verified by Shelter Coordinator Gurmeet Kaur. Digital tamper-seal cryptographically verified.',
    haccpTemp: '68.5°C Verified',
    haccpCompliant: true,
    vehicleOrDigester: 'Delivered via Cargo Trike-02',
    manifestHash: '0x8F4A..71E',
    tamperSeal: 'SEAL-8921-PB (Tamper-Verified)',
  },
  {
    id: 'DON-8942',
    date: 'Yesterday, 22:30 IST',
    timeAgo: '1 day ago',
    foodName: 'Paneer Butter Gravy & Tandoori Roti',
    foodType: 'Dairy / Rich Gravy',
    portions: 220,
    weightKg: 78,
    receiver: 'Civil Hospital Night Dormitory',
    savedInr: 17600,
    pointsEarned: 420,
    status: 'Completed',
    statusDescription: 'Distribution completed within 28 minutes of cooking completion. 100% hot holding above statutory standard.',
    haccpTemp: '71.2°C Verified',
    haccpCompliant: true,
    vehicleOrDigester: 'Delivered via EV Van PB-10-EV-1904',
    manifestHash: '0x7C1D..33A',
    tamperSeal: 'SEAL-8840-PB (Tamper-Verified)',
  },
  {
    id: 'DON-8815',
    date: '24 Oct 2026, 21:15 IST',
    timeAgo: '2 days ago',
    foodName: 'Fresh Curd Gravy & Vegetable Pulao',
    foodType: 'Steamed Rice & Pulses',
    portions: 110,
    weightKg: 38,
    receiver: 'Ludhiana Municipal CBG Digester #2',
    savedInr: 8800,
    pointsEarned: 180,
    status: 'Expired',
    statusDescription: 'GT Road NH-44 traffic gridlock exceeded safe microbial consumption window (<63°C). Autonomous zero-methane protocol diverted batch to anaerobic digester for 14.5 kg Clean Bio-CNG.',
    haccpTemp: '58.2°C (Below 63°C Threshold)',
    haccpCompliant: false,
    vehicleOrDigester: 'Municipal Bio-Gas Intake Chamber #2',
    manifestHash: '0x6A9F..10E',
    tamperSeal: 'BIO-DIVERT-8815 (Methane Offset)',
  },
  {
    id: 'DON-8711',
    date: '23 Oct 2026, 20:45 IST',
    timeAgo: '3 days ago',
    foodName: 'Mixed Dal Khichdi & Aloo Gobhi',
    foodType: 'Legume / Wet Curry',
    portions: 140,
    weightKg: 48,
    receiver: 'Phagwara Labor Colony Guild',
    savedInr: 11200,
    pointsEarned: 290,
    status: 'Completed',
    statusDescription: '140 hot meal portions served to migrant labor families. Zero-stigma distribution tokens honored.',
    haccpTemp: '69.0°C Verified',
    haccpCompliant: true,
    vehicleOrDigester: 'Delivered via E-Rickshaw PB-09-ER-1022',
    manifestHash: '0x5D8E..90F',
    tamperSeal: 'SEAL-8711-ER (Tamper-Verified)',
  },
  {
    id: 'DON-8650',
    date: '21 Oct 2026, 23:15 IST',
    timeAgo: '4 days ago',
    foodName: 'Shahi Paneer, Pulao & Sweet Kheer',
    foodType: 'Sweets & Desserts',
    portions: 310,
    weightKg: 105,
    receiver: 'Ludhiana Migrant Transit Camp',
    savedInr: 24800,
    pointsEarned: 600,
    status: 'Completed',
    statusDescription: 'Mega banquet wedding surplus rescued at midnight. Dual insulated van consignment deployed.',
    haccpTemp: '70.8°C Verified',
    haccpCompliant: true,
    vehicleOrDigester: 'Delivered via Heavy EV Van PB-08-EV-4412',
    manifestHash: '0x4E7A..62C',
    tamperSeal: 'SEAL-8650-PB (Tamper-Verified)',
  },
  {
    id: 'DON-8520',
    date: '19 Oct 2026, 22:50 IST',
    timeAgo: '6 days ago',
    foodName: 'Sweetened Malpua & Rabri Cups',
    foodType: 'Sweets & Desserts',
    portions: 80,
    weightKg: 28,
    receiver: 'Phagwara Anaerobic Digester #1',
    savedInr: 6400,
    pointsEarned: 120,
    status: 'Expired',
    statusDescription: 'Ambient dairy acidity detected by IoT sensor. Revoked from human consumption; converted into 9.8 kg bio-fertilizer and biogas.',
    haccpTemp: 'Acid Index: 5.2 pH (Revoked)',
    haccpCompliant: false,
    vehicleOrDigester: 'Phagwara Bio-Gas Station #1',
    manifestHash: '0x3B6C..41D',
    tamperSeal: 'BIO-DIVERT-8520 (Methane Offset)',
  },
];

interface DonationHistoryTimelineProps {
  operations?: RescueOperation[];
  className?: string;
}

export const DonationHistoryTimeline: React.FC<DonationHistoryTimelineProps> = ({
  operations = INITIAL_RESCUE_OPERATIONS,
  className = '',
}) => {
  const [filterStatus, setFilterStatus] = useState<'All' | RescueOperationStatus>('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredOps = operations.filter((op) => {
    const matchesStatus = filterStatus === 'All' || op.status === filterStatus;
    const matchesSearch =
      op.foodName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      op.foodType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      op.receiver.toLowerCase().includes(searchTerm.toLowerCase()) ||
      op.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const countByStatus = {
    All: operations.length,
    Completed: operations.filter((o) => o.status === 'Completed').length,
    'In-Transit': operations.filter((o) => o.status === 'In-Transit').length,
    Expired: operations.filter((o) => o.status === 'Expired').length,
  };

  const totalPoints = operations.reduce((sum, o) => sum + o.pointsEarned, 0);

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Top Controls & Metrics Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-[#bccac0]/30 shadow-xs">
        <div>
          <h3 className="font-headline font-bold text-sm sm:text-base text-[#131b2e] flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#006948] text-xl">timeline</span>
            <span>Donation History &amp; Rescue Operation Timeline</span>
          </h3>
          <p className="text-xs text-[#3d4a42]">
            Visual chronological log of past rescue operations with status verification and impact points earned.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
          <div className="px-3 py-1.5 rounded-lg bg-[#e2f7ec] border border-[#006948]/30 text-xs font-mono font-bold text-[#006948] flex items-center gap-1.5">
            <span className="material-symbols-outlined text-sm">stars</span>
            <span>{totalPoints.toLocaleString()} Total Pts Earned</span>
          </div>
        </div>
      </div>

      {/* Filter Tabs & Search Strip */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
        <div className="flex flex-wrap items-center gap-1 p-1 bg-[#eaedff] rounded-xl border border-[#bccac0]/30 text-xs">
          <button
            type="button"
            onClick={() => setFilterStatus('All')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
              filterStatus === 'All'
                ? 'bg-[#006948] text-white shadow-xs'
                : 'text-[#3d4a42] hover:bg-white hover:text-[#131b2e]'
            }`}
          >
            All Operations ({countByStatus.All})
          </button>

          <button
            type="button"
            onClick={() => setFilterStatus('Completed')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1 cursor-pointer ${
              filterStatus === 'Completed'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-[#3d4a42] hover:bg-white hover:text-[#131b2e]'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Completed ({countByStatus.Completed})</span>
          </button>

          <button
            type="button"
            onClick={() => setFilterStatus('In-Transit')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1 cursor-pointer ${
              filterStatus === 'In-Transit'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-[#3d4a42] hover:bg-white hover:text-[#131b2e]'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping"></span>
            <span>In-Transit ({countByStatus['In-Transit']})</span>
          </button>

          <button
            type="button"
            onClick={() => setFilterStatus('Expired')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1 cursor-pointer ${
              filterStatus === 'Expired'
                ? 'bg-red-600 text-white shadow-xs'
                : 'text-[#3d4a42] hover:bg-white hover:text-[#131b2e]'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-red-500"></span>
            <span>Expired / Bio-Gas ({countByStatus.Expired})</span>
          </button>
        </div>

        <div className="relative min-w-[200px]">
          <span className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-gray-400">
            <span className="material-symbols-outlined text-sm">search</span>
          </span>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search dish, type, or shelter..."
            className="w-full pl-8 pr-3 py-1.5 bg-white text-xs text-[#131b2e] rounded-xl border border-[#bccac0]/30 focus:outline-none focus:border-[#006948]"
          />
        </div>
      </div>

      {/* Visual Timeline Stream */}
      <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-3 sm:before:left-4 before:top-3 before:bottom-3 before:w-0.5 before:bg-gradient-to-b before:from-[#006948] before:via-[#007bb9] before:to-[#ba1a1a]">
        {filteredOps.map((op) => {
          // Status styling
          const isCompleted = op.status === 'Completed';
          const isInTransit = op.status === 'In-Transit';
          const isExpired = op.status === 'Expired';

          const nodeColor = isCompleted
            ? 'bg-emerald-600 text-white ring-4 ring-emerald-100'
            : isInTransit
            ? 'bg-blue-600 text-white ring-4 ring-blue-100 animate-pulse'
            : 'bg-red-600 text-white ring-4 ring-red-100';

          const nodeIcon = isCompleted ? 'task_alt' : isInTransit ? 'local_shipping' : 'recycling';

          const badgeClasses = isCompleted
            ? 'bg-emerald-100 text-[#006948] border-emerald-300'
            : isInTransit
            ? 'bg-blue-100 text-blue-900 border-blue-300'
            : 'bg-red-100 text-red-900 border-red-300';

          return (
            <div key={op.id} className="relative group">
              {/* Timeline Node Icon Anchor */}
              <div
                className={`absolute -left-6 sm:-left-8 top-1 w-6 h-6 sm:w-8 sm:h-8 rounded-full ${nodeColor} flex items-center justify-center shadow-md transition-transform group-hover:scale-110 z-10`}
              >
                <span className="material-symbols-outlined text-xs sm:text-base">{nodeIcon}</span>
              </div>

              {/* Timeline Entry Card */}
              <div
                className={`p-4 sm:p-5 rounded-2xl bg-white border transition-all shadow-xs hover:shadow-md ${
                  isInTransit
                    ? 'border-blue-400 ring-2 ring-blue-400/20'
                    : isExpired
                    ? 'border-red-300 bg-red-50/20'
                    : 'border-[#bccac0]/30 hover:border-[#006948]'
                }`}
              >
                {/* Header Strip: ID, Timestamp, Status & Points Badge */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#bccac0]/20">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[#131b2e] bg-[#f2f3ff] px-2.5 py-0.5 rounded-md border border-[#bccac0]/30">
                      {op.id}
                    </span>

                    <span
                      className={`px-2.5 py-0.5 rounded-md text-[11px] font-bold border flex items-center gap-1 ${badgeClasses}`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          isCompleted
                            ? 'bg-emerald-600'
                            : isInTransit
                            ? 'bg-blue-600 animate-ping'
                            : 'bg-red-600'
                        }`}
                      ></span>
                      <span>
                        {isCompleted
                          ? 'COMPLETED · VERIFIED HANDOVER'
                          : isInTransit
                          ? 'IN-TRANSIT · LIVE FLEET'
                          : 'EXPIRED · BIO-GAS DIVERT'}
                      </span>
                    </span>

                    <span className="text-[11px] text-[#3d4a42] font-mono">
                      {op.date} ({op.timeAgo})
                    </span>
                  </div>

                  {/* Points Earned Pill */}
                  <div className="flex items-center gap-1.5 self-start sm:self-auto">
                    <div
                      className={`px-3 py-1 rounded-xl font-headline font-black text-xs sm:text-sm flex items-center gap-1 shadow-xs font-mono ${
                        isExpired
                          ? 'bg-amber-100 text-[#904d00] border border-amber-300'
                          : isInTransit
                          ? 'bg-blue-100 text-blue-900 border border-blue-300'
                          : 'bg-[#006948] text-white shadow-emerald-700/20'
                      }`}
                    >
                      <span className="material-symbols-outlined text-xs sm:text-sm">
                        {isExpired ? 'eco' : isInTransit ? 'pending' : 'military_tech'}
                      </span>
                      <span>+{op.pointsEarned} Impact Pts</span>
                    </div>
                  </div>
                </div>

                {/* Operation Body: Food Name, Category, Receiver & Description */}
                <div className="pt-3 space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="font-headline font-bold text-sm sm:text-base text-[#131b2e]">
                          {op.foodName}
                        </h4>
                        <span className="px-2 py-0.5 rounded-full bg-[#eaedff] text-[#006194] text-[10px] font-bold uppercase">
                          {op.foodType}
                        </span>
                      </div>

                      <div className="text-xs text-[#3d4a42] mt-1 flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-sm text-[#006948]">
                          {isExpired ? 'compost' : 'location_on'}
                        </span>
                        <span>
                          {isExpired ? 'Diverted to:' : 'Destination:'}{' '}
                          <strong className="text-[#131b2e]">{op.receiver}</strong>
                        </span>
                      </div>
                    </div>

                    <div className="text-left sm:text-right shrink-0">
                      <div className="font-headline font-extrabold text-sm sm:text-base text-[#131b2e] font-mono">
                        {op.portions} Portions
                      </div>
                      <div className="text-[11px] text-[#006948] font-bold">
                        {op.weightKg} kg · Saved ₹{op.savedInr.toLocaleString()}
                      </div>
                    </div>
                  </div>

                  {/* Context Description */}
                  <p className="text-xs text-[#3d4a42] bg-[#f8f9ff] p-2.5 rounded-xl border border-[#bccac0]/20 leading-relaxed">
                    {op.statusDescription}
                  </p>

                  {/* Operation Telemetry Strip */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-[11px] text-[#3d4a42] font-mono">
                    <div className="flex flex-wrap items-center gap-3">
                      <span
                        className={`inline-flex items-center gap-1 font-bold ${
                          op.haccpCompliant ? 'text-[#006948]' : 'text-[#ba1a1a]'
                        }`}
                      >
                        <span className="material-symbols-outlined text-xs">device_thermostat</span>
                        <span>{op.haccpTemp}</span>
                      </span>

                      {op.vehicleOrDigester && (
                        <span className="text-gray-600 hidden md:inline">
                          • {op.vehicleOrDigester}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2 text-[10px]">
                      {op.tamperSeal && (
                        <span className="px-2 py-0.5 rounded bg-gray-100 text-gray-700 font-bold border border-gray-200">
                          {op.tamperSeal}
                        </span>
                      )}
                      <span className="text-gray-400">Hash: {op.manifestHash}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {filteredOps.length === 0 && (
          <div className="p-8 text-center bg-white rounded-2xl border border-[#bccac0]/30 text-xs text-[#3d4a42]">
            No rescue operations found matching "{searchTerm}" under "{filterStatus}".
          </div>
        )}
      </div>
    </div>
  );
};
