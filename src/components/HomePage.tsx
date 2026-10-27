import React from 'react';
import { ActivePortal, AdminSubTab, DonorReceiverSubTab } from '../types.ts';

interface HomePageProps {
  onSelectPortal: (portal: ActivePortal, subTab?: AdminSubTab | DonorReceiverSubTab) => void;
  onOpenQuickRescue: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onSelectPortal,
  onOpenQuickRescue,
}) => {
  return (
    <div className="flex flex-col w-full pb-16">
      {/* Hero Section */}
      <section className="relative w-full bg-gradient-to-b from-[#e2e7ff]/70 via-[#faf8ff] to-[#faf8ff] px-4 md:px-6 pt-8 pb-12 overflow-hidden border-b border-[#bccac0]/20">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center space-y-5">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#85f8c4] text-[#002114] text-xs font-bold uppercase tracking-wider shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#006948] animate-ping"></span>
            Punjab GT Road Corridor · Autonomous Civic Infrastructure
          </div>

          <h1 className="font-headline font-extrabold text-3xl sm:text-5xl lg:text-6xl text-[#131b2e] max-w-4xl tracking-tight leading-tight">
            Zero Food Waste. Zero Urban Hunger. <br />
            <span className="text-[#006948]">Sovereign Dignity Logistics.</span>
          </h1>

          <p className="text-sm sm:text-base lg:text-lg text-[#3d4a42] max-w-3xl leading-relaxed">
            NourishLink AI connects commercial banquet halls, temples, and restaurants with unhoused
            shelters and daily-wage colonies in real-time. Powered by edge thermal vision, predictive
            microbial decay modeling, and autonomous CVRPTW cold-chain dispatch.
          </p>

          {/* Dual Portal Entry CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => onSelectPortal('donor-receiver', 'donate')}
              className="px-6 py-3.5 rounded-xl bg-[#006948] text-white font-headline font-bold text-sm shadow-md hover:bg-[#00855d] transition-all flex items-center gap-2 active:scale-95 cursor-pointer"
            >
              <span className="material-symbols-outlined text-xl">volunteer_activism</span>
              <span>Open Donor &amp; Receiver Portal</span>
            </button>

            <button
              onClick={() => onSelectPortal('admin', 'live-hub')}
              className="px-6 py-3.5 rounded-xl bg-[#131b2e] text-white font-headline font-bold text-sm shadow-md hover:bg-[#283044] transition-all flex items-center gap-2 active:scale-95 cursor-pointer"
            >
              <span className="material-symbols-outlined text-xl">admin_panel_settings</span>
              <span>Enter Admin Operations Command</span>
            </button>

            <button
              onClick={onOpenQuickRescue}
              className="px-5 py-3.5 rounded-xl bg-[#fe932c] text-[#663500] font-headline font-bold text-sm shadow-sm hover:bg-[#ffdcc3] transition-all flex items-center gap-1.5 active:scale-95 cursor-pointer"
            >
              <span className="material-symbols-outlined text-xl">crisis_alert</span>
              <span>+ Quick Emergency Rescue</span>
            </button>
          </div>

          {/* Hero Performance Band */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 w-full max-w-5xl pt-6">
            <div className="bg-white p-4 rounded-xl shadow-xs border border-[#bccac0]/30 text-left">
              <span className="text-[10px] text-[#3d4a42] uppercase font-bold tracking-wider block">
                Total Meals Rescued
              </span>
              <div className="font-headline font-extrabold text-2xl lg:text-3xl text-[#006948] font-mono mt-0.5">
                528,450
              </div>
              <span className="text-[11px] text-[#006948] font-semibold flex items-center gap-0.5 mt-1">
                <span className="material-symbols-outlined text-xs">trending_up</span> +1,240 meals today
              </span>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-xs border border-[#bccac0]/30 text-left">
              <span className="text-[10px] text-[#3d4a42] uppercase font-bold tracking-wider block">
                Landfill CO2e Avoided
              </span>
              <div className="font-headline font-extrabold text-2xl lg:text-3xl text-[#131b2e] font-mono mt-0.5">
                1,321 T
              </div>
              <span className="text-[11px] text-[#006948] font-semibold flex items-center gap-0.5 mt-1">
                <span className="material-symbols-outlined text-xs">eco</span> 98.4% diversion rate
              </span>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-xs border border-[#bccac0]/30 text-left">
              <span className="text-[10px] text-[#3d4a42] uppercase font-bold tracking-wider block">
                Rapid Rescue SLA
              </span>
              <div className="font-headline font-extrabold text-2xl lg:text-3xl text-[#006194] font-mono mt-0.5">
                11.4 min
              </div>
              <span className="text-[11px] text-[#3d4a42] font-semibold flex items-center gap-0.5 mt-1">
                <span className="material-symbols-outlined text-xs">schedule</span> Target &lt;25 min metro
              </span>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-xs border border-[#bccac0]/30 text-left">
              <span className="text-[10px] text-[#3d4a42] uppercase font-bold tracking-wider block">
                Beneficiary Meal Cost
              </span>
              <div className="font-headline font-extrabold text-2xl lg:text-3xl text-[#904d00] font-mono mt-0.5">
                Rs. 0.00
              </div>
              <span className="text-[11px] text-[#904d00] font-semibold flex items-center gap-0.5 mt-1">
                <span className="material-symbols-outlined text-xs">shield</span> 100% Free Sovereign Food
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Two Dedicated Portals Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-12 w-full space-y-6">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <h2 className="font-headline font-bold text-2xl sm:text-3xl text-[#131b2e]">
            Choose Your Dedicated Portal
          </h2>
          <p className="text-xs sm:text-sm text-[#3d4a42]">
            NourishLink AI is split into two tailored environments: one for community participants
            (donors and receivers), and one for administrative logistics command.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Portal 1: Community, Donors & Receivers */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-[#bccac0]/30 flex flex-col justify-between hover:border-[#006948] transition-all group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="p-3 rounded-xl bg-[#85f8c4] text-[#002114] flex items-center justify-center">
                  <span className="material-symbols-outlined text-2xl">soup_kitchen</span>
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#f2f3ff] text-[#006948] text-xs font-bold uppercase">
                  For Donors &amp; Shelters
                </span>
              </div>

              <div>
                <h3 className="font-headline font-bold text-xl text-[#131b2e] group-hover:text-[#006948] transition-colors">
                  Donor &amp; Receiver Community Portal
                </h3>
                <p className="text-xs sm:text-sm text-[#3d4a42] leading-relaxed mt-1">
                  Engineered for commercial banquet halls, restaurants, gurdwaras, and community
                  shelters. Donate surplus in 3 taps, claim hot meals, or register emergency needs.
                </p>
              </div>

              <div className="space-y-2 pt-2 border-t border-[#bccac0]/20 text-xs text-[#131b2e]">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#006948] text-base">check_circle</span>
                  <span><strong>Food Category &amp; Custom Dish Input:</strong> Select preparation type and type your recipe name.</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#006948] text-base">check_circle</span>
                  <span><strong>Dual Location Marking:</strong> Mark pickup/drop with live GPS or interactive map click.</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#006948] text-base">check_circle</span>
                  <span><strong>Receiver &amp; Shelter Hub:</strong> Track inbound delivery vans with driver ETA and tamper seals.</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#006948] text-base">check_circle</span>
                  <span><strong>FSSAI Legal Shield &amp; 80G Tax Credits:</strong> Instant statutory immunity invoice.</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-4 flex flex-col sm:flex-row gap-2">
              <button
                onClick={() => onSelectPortal('donor-receiver', 'donate')}
                className="flex-1 py-3 px-4 rounded-xl bg-[#006948] text-white font-headline font-bold text-xs hover:bg-[#00855d] transition-colors flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
              >
                <span>Donate Food Surplus</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
              <button
                onClick={() => onSelectPortal('donor-receiver', 'leaderboard')}
                className="py-3 px-3.5 rounded-xl bg-amber-100 text-amber-950 font-headline font-bold text-xs hover:bg-amber-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
              >
                <span className="material-symbols-outlined text-sm">leaderboard</span>
                <span>Leaderboard</span>
              </button>
              <button
                onClick={() => onSelectPortal('donor-receiver', 'receive')}
                className="py-3 px-3.5 rounded-xl bg-[#eaedff] text-[#006948] font-headline font-bold text-xs hover:bg-[#e2e7ff] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Shelters</span>
              </button>
            </div>
          </div>

          {/* Portal 2: Admin Operations Command */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-[#bccac0]/30 flex flex-col justify-between hover:border-[#131b2e] transition-all group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="p-3 rounded-xl bg-[#131b2e] text-white flex items-center justify-center">
                  <span className="material-symbols-outlined text-2xl">satellite_alt</span>
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#f2f3ff] text-[#131b2e] text-xs font-bold uppercase">
                  For Operations &amp; Dispatch
                </span>
              </div>

              <div>
                <h3 className="font-headline font-bold text-xl text-[#131b2e] group-hover:text-[#006948] transition-colors">
                  Admin &amp; Operations Command Hub
                </h3>
                <p className="text-xs sm:text-sm text-[#3d4a42] leading-relaxed mt-1">
                  Autonomous corridor monitoring, dynamic batch slicing across multiple registered
                  shelters, active EV van telemetry, and statutory bio-gas circularity safeguards.
                </p>
              </div>

              <div className="space-y-2 pt-2 border-t border-[#bccac0]/20 text-xs text-[#131b2e]">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#006194] text-base">check_circle</span>
                  <span><strong>Live Operations Hub:</strong> Punjab GT Road corridor grid telemetry with interactive map tracking.</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#006194] text-base">check_circle</span>
                  <span><strong>Add Census Nodes:</strong> Add new shelters using live GPS detection or map pin drops.</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#006194] text-base">check_circle</span>
                  <span><strong>Dynamic Batch Slicer:</strong> Mathematical kernel allocating bulk surplus with vulnerability quotas.</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#006194] text-base">check_circle</span>
                  <span><strong>Bio-Gas Safeguard:</strong> Autonomous failover to CBG anaerobic digesters if thermal limits drop.</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-4 flex flex-col sm:flex-row gap-2">
              <button
                onClick={() => onSelectPortal('admin', 'live-hub')}
                className="flex-1 py-3 px-4 rounded-xl bg-[#131b2e] text-white font-headline font-bold text-xs hover:bg-[#283044] transition-colors flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
              >
                <span>Launch Admin Command Hub</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
              <button
                onClick={() => onSelectPortal('admin', 'census')}
                className="py-3 px-4 rounded-xl bg-[#eaedff] text-[#131b2e] font-headline font-bold text-xs hover:bg-[#e2e7ff] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Census &amp; Slicer</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Operational Architecture (4 Pillars) */}
      <section className="bg-[#f2f3ff] py-12 px-4 md:px-6 border-y border-[#bccac0]/20">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <h2 className="font-headline font-bold text-2xl sm:text-3xl text-[#131b2e]">
              Four Pillars of Sovereign Food Rescue
            </h2>
            <p className="text-xs sm:text-sm text-[#3d4a42]">
              How algorithmic precision and statutory safeguards protect human dignity and eliminate food waste.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Pillar 1 */}
            <div className="bg-white p-5 rounded-xl border border-[#bccac0]/30 shadow-xs space-y-2.5">
              <div className="w-10 h-10 rounded-lg bg-[#85f8c4] text-[#002114] flex items-center justify-center">
                <span className="material-symbols-outlined text-xl">thermostat</span>
              </div>
              <h4 className="font-headline font-bold text-sm text-[#131b2e]">
                Arrhenius Microbial Physics
              </h4>
              <p className="text-xs text-[#3d4a42] leading-relaxed">
                Calculates real-time bacterial doubling curves based on ambient weather and food moisture,
                enforcing hot handoffs above 65°C.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="bg-white p-5 rounded-xl border border-[#bccac0]/30 shadow-xs space-y-2.5">
              <div className="w-10 h-10 rounded-lg bg-[#ffdcc3] text-[#2f1500] flex items-center justify-center">
                <span className="material-symbols-outlined text-xl">gavel</span>
              </div>
              <h4 className="font-headline font-bold text-sm text-[#131b2e]">
                Good Samaritan Safe Harbor
              </h4>
              <p className="text-xs text-[#3d4a42] leading-relaxed">
                Section 31(C) of National Food Standards indemnifies commercial donors against civil or
                criminal liability upon verified digital handover.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="bg-white p-5 rounded-xl border border-[#bccac0]/30 shadow-xs space-y-2.5">
              <div className="w-10 h-10 rounded-lg bg-[#cce5ff] text-[#001d31] flex items-center justify-center">
                <span className="material-symbols-outlined text-xl">contactless</span>
              </div>
              <h4 className="font-headline font-bold text-sm text-[#131b2e]">
                Offline Dignity Tokens
              </h4>
              <p className="text-xs text-[#3d4a42] leading-relaxed">
                Zero smartphones or biometrics required. Indestructible NFC &amp; Paper-QR tokens prevent
                double-deprivation while honoring privacy.
              </p>
            </div>

            {/* Pillar 4 */}
            <div className="bg-white p-5 rounded-xl border border-[#bccac0]/30 shadow-xs space-y-2.5">
              <div className="w-10 h-10 rounded-lg bg-[#eaedff] text-[#131b2e] flex items-center justify-center">
                <span className="material-symbols-outlined text-xl">recycling</span>
              </div>
              <h4 className="font-headline font-bold text-sm text-[#131b2e]">
                Zero-Landfill Bio-Gas Failover
              </h4>
              <p className="text-xs text-[#3d4a42] leading-relaxed">
                If traffic gridlock threatens the perishable time window, consignments are autonomously
                diverted to anaerobic digesters for clean Bio-CNG.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
