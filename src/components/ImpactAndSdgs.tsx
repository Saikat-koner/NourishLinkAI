import React, { useState } from 'react';

export const ImpactAndSdgs: React.FC = () => {
  const [downloadNotice, setDownloadNotice] = useState<string | null>(null);

  const triggerDownload = (name: string) => {
    setDownloadNotice(`Downloading audited report: ${name}...`);
    setTimeout(() => {
      setDownloadNotice(null);
    }, 4000);
  };

  return (
    <div className="flex flex-col w-full pb-10">
      {/* Header Banner */}
      <div className="w-full bg-[#f2f3ff] px-4 md:px-6 py-5 border-b border-[#bccac0]/30">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#85f8c4] text-[#002114] text-xs font-bold uppercase tracking-wider">
                UN SDG 2 &amp; SDG 12 Alignment
              </span>
              <span className="text-xs text-[#3d4a42] font-semibold">ISO 14064 Carbon Audited</span>
            </div>
            <h1 className="font-headline font-extrabold text-2xl lg:text-4xl text-[#006948] tracking-tight mt-1">
              Impact, ESG Ledger &amp; Sovereign Food Security
            </h1>
            <p className="text-xs lg:text-sm text-[#3d4a42] max-w-3xl leading-relaxed mt-0.5">
              Quantified environmental abatement, corporate 80G tax write-off certificates, and
              district-by-district zero-hunger milestones across the Punjab GT Road cluster.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => triggerDownload('Punjab_GT_Road_ESG_Ledger_Q3.pdf')}
              className="px-4 py-2 bg-[#006948] text-white text-xs font-bold rounded-lg shadow-sm hover:bg-[#00855d] transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
            >
              <span className="material-symbols-outlined text-base">file_download</span>
              <span>Export Audited ESG Report</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto w-full px-4 md:px-6 py-6 space-y-6">
        {downloadNotice && (
          <div className="p-3 bg-[#85f8c4] text-[#002114] rounded-xl text-xs font-bold flex items-center gap-2 animate-in fade-in">
            <span className="material-symbols-outlined text-base">check_circle</span>
            <span>{downloadNotice}</span>
          </div>
        )}

        {/* Global UN SDG Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* SDG 2 Card */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-[#bccac0]/30 space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-2xl bg-[#fe932c] text-[#663500] flex items-center justify-center font-headline font-extrabold text-2xl shadow-sm">
                  2
                </div>
                <div>
                  <span className="text-[10px] text-[#904d00] font-bold uppercase tracking-wider block">
                    United Nations Goal
                  </span>
                  <h3 className="font-headline font-bold text-lg text-[#131b2e]">
                    SDG 2: Zero Hunger &amp; Sovereign Access
                  </h3>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded bg-[#ffdcc3] text-[#2f1500] text-xs font-bold">
                Target 2.1 &amp; 2.2
              </span>
            </div>

            <p className="text-xs text-[#3d4a42] leading-relaxed">
              Guaranteeing access for daily-wage migrant labor, unhoused elders, and hospital shelter
              dependents to nutritious, hot meals within a 14-minute metro response SLA.
            </p>

            <div className="grid grid-cols-3 gap-3 pt-2 text-center">
              <div className="bg-[#f2f3ff] p-3 rounded-lg border border-[#bccac0]/20">
                <span className="text-[10px] text-[#3d4a42] uppercase font-bold block">Meals Served Free</span>
                <span className="font-headline font-bold text-xl text-[#006948] font-mono">528,450</span>
              </div>
              <div className="bg-[#f2f3ff] p-3 rounded-lg border border-[#bccac0]/20">
                <span className="text-[10px] text-[#3d4a42] uppercase font-bold block">Zero Stigma Score</span>
                <span className="font-headline font-bold text-xl text-[#904d00] font-mono">4.92 / 5</span>
              </div>
              <div className="bg-[#f2f3ff] p-3 rounded-lg border border-[#bccac0]/20">
                <span className="text-[10px] text-[#3d4a42] uppercase font-bold block">Cost to Beneficiary</span>
                <span className="font-headline font-bold text-xl text-[#006194] font-mono">₹0.00</span>
              </div>
            </div>
          </div>

          {/* SDG 12 Card */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-[#bccac0]/30 space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-2xl bg-[#006948] text-white flex items-center justify-center font-headline font-extrabold text-2xl shadow-sm">
                  12
                </div>
                <div>
                  <span className="text-[10px] text-[#006948] font-bold uppercase tracking-wider block">
                    United Nations Goal
                  </span>
                  <h3 className="font-headline font-bold text-lg text-[#131b2e]">
                    SDG 12: Responsible Consumption &amp; Production
                  </h3>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded bg-[#85f8c4] text-[#002114] text-xs font-bold">
                Target 12.3
              </span>
            </div>

            <p className="text-xs text-[#3d4a42] leading-relaxed">
              Halving per capita food waste along commercial banquet halls and institutional dining
              halls, eliminating biological methane generation at open landfill dumps.
            </p>

            <div className="grid grid-cols-3 gap-3 pt-2 text-center">
              <div className="bg-[#f2f3ff] p-3 rounded-lg border border-[#bccac0]/20">
                <span className="text-[10px] text-[#3d4a42] uppercase font-bold block">Landfill Diversion</span>
                <span className="font-headline font-bold text-xl text-[#006948] font-mono">1,321 T</span>
              </div>
              <div className="bg-[#f2f3ff] p-3 rounded-lg border border-[#bccac0]/20">
                <span className="text-[10px] text-[#3d4a42] uppercase font-bold block">Bio-Gas Generated</span>
                <span className="font-headline font-bold text-xl text-[#904d00] font-mono">14,200 kg</span>
              </div>
              <div className="bg-[#f2f3ff] p-3 rounded-lg border border-[#bccac0]/20">
                <span className="text-[10px] text-[#3d4a42] uppercase font-bold block">Clean EV Miles</span>
                <span className="font-headline font-bold text-xl text-[#006194] font-mono">68,400 km</span>
              </div>
            </div>
          </div>
        </div>

        {/* District Progress Matrix */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-[#bccac0]/30 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#bccac0]/20">
            <div>
              <h3 className="font-headline font-bold text-base text-[#131b2e]">
                Punjab Corridor District Performance Breakdown
              </h3>
              <p className="text-xs text-[#3d4a42]">
                Certified cold-chain compliance and food security penetration across urban centers
              </p>
            </div>
            <span className="text-xs text-[#006948] font-bold">Quarterly Audit Active</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#bccac0]/30 text-xs text-[#3d4a42] uppercase font-bold">
                  <th className="py-2.5 px-3">District Node</th>
                  <th className="py-2.5 px-3">Commercial Donors</th>
                  <th className="py-2.5 px-3">Meals Rescued (MTD)</th>
                  <th className="py-2.5 px-3">Average SLA</th>
                  <th className="py-2.5 px-3">HACCP Integrity</th>
                  <th className="py-2.5 px-3">Tax Credit Value</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#bccac0]/20 text-xs text-[#131b2e]">
                <tr className="hover:bg-[#f2f3ff] transition-colors">
                  <td className="py-3 px-3 font-bold flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#006948]"></span> Jalandhar City &amp; Bypass
                  </td>
                  <td className="py-3 px-3">34 Verified Kitchens</td>
                  <td className="py-3 px-3 font-mono font-bold text-[#006948]">218,400</td>
                  <td className="py-3 px-3 font-mono">11.2 min</td>
                  <td className="py-3 px-3 text-[#006948] font-bold">100% Nominal</td>
                  <td className="py-3 px-3 font-mono">₹5,40,000</td>
                </tr>
                <tr className="hover:bg-[#f2f3ff] transition-colors">
                  <td className="py-3 px-3 font-bold flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#fe932c]"></span> Phagwara Highway Cluster
                  </td>
                  <td className="py-3 px-3">18 Banquet Resorts</td>
                  <td className="py-3 px-3 font-mono font-bold text-[#006948]">142,650</td>
                  <td className="py-3 px-3 font-mono">12.8 min</td>
                  <td className="py-3 px-3 text-[#006948] font-bold">99.8% Nominal</td>
                  <td className="py-3 px-3 font-mono">₹3,85,000</td>
                </tr>
                <tr className="hover:bg-[#f2f3ff] transition-colors">
                  <td className="py-3 px-3 font-bold flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#006194]"></span> Ludhiana Industrial Corridor
                  </td>
                  <td className="py-3 px-3">42 Commercial Hubs</td>
                  <td className="py-3 px-3 font-mono font-bold text-[#006948]">167,400</td>
                  <td className="py-3 px-3 font-mono">14.1 min</td>
                  <td className="py-3 px-3 text-[#006948] font-bold">99.6% Nominal</td>
                  <td className="py-3 px-3 font-mono">₹4,95,000</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Cryptographic ESG Ledger */}
        <div className="bg-[#eaedff] p-6 rounded-xl border border-[#bccac0]/30 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#006948] text-xl">token</span>
              <h3 className="font-headline font-bold text-sm text-[#131b2e]">
                Cryptographic Immutable Chain-of-Custody Ledger
              </h3>
            </div>
            <span className="text-[11px] font-mono text-[#006948] font-bold">BLOCK #892,104 VERIFIED</span>
          </div>
          <p className="text-xs text-[#3d4a42] leading-relaxed">
            Every food consignment is hashed at kitchen pickup (Flir IR temperature + weight) and validated
            at destination handoff. Handover certificates are cryptographically anchored to prevent fraud,
            satisfying Good Samaritan statutory indemnification under Indian Law.
          </p>
          <div className="bg-white p-3 rounded-lg font-mono text-xs space-y-1 text-[#131b2e] border border-[#bccac0]/30">
            <div className="flex justify-between">
              <span className="text-[#3d4a42]">Root Hash:</span>
              <span className="font-bold text-[#006948]">0x8f91c3029daef78921bba8821045f</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#3d4a42]">Audited Jurisdiction:</span>
              <span>Punjab Food Commission &amp; Ministry of Consumer Affairs</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#3d4a42]">Statutory Immunity:</span>
              <span className="text-[#006948] font-bold">Full Sovereign Safe Harbor Sec 31(C)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
