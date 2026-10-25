import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#f2f3ff] mt-10 border-t border-[#bccac0]/30">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          {/* Col 1 */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-gradient-to-br from-[#00855d] to-[#006948] p-1 flex items-center justify-center text-white">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="M12 8v8" />
                  <path d="M8 12h8" />
                </svg>
              </div>
              <span className="font-headline font-bold text-lg text-[#006948]">NourishLink AI</span>
            </div>
            <p className="text-xs text-[#3d4a42] leading-relaxed">
              Zero-hunger operational command deploying edge vision, real-time microbial decay
              telemetry, and dynamic CVRPTW dispatch corridors across high-density urban clusters.
            </p>
            <div className="flex items-center gap-1.5 text-xs text-[#006194] font-medium pt-1">
              <span className="material-symbols-outlined text-base">verified_user</span>
              <span>ISO 22000 Certified Cold-Chain Protocol</span>
            </div>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="text-sm font-bold text-[#131b2e] mb-2">Institutional Partners</h4>
            <ul className="space-y-1 text-xs text-[#3d4a42]">
              <li>Food Safety &amp; Standards Authority of India (FSSAI)</li>
              <li>Ministry of Consumer Affairs &amp; Public Distribution</li>
              <li>The Akshaya Patra National Kitchen Network</li>
              <li>UNDP SDG Acceleration Innovation Lab</li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="text-sm font-bold text-[#131b2e] mb-2">Statutory Safeguards</h4>
            <ul className="space-y-1 text-xs text-[#3d4a42]">
              <li>Good Samaritan Food Donor Immunity Act (Sec 31-C)</li>
              <li>Real-time Microbial HACCP Audit Vault</li>
              <li>Autonomous Bio-gas Reroute Protocols</li>
              <li>Traceable Dignity Ledger Tokens (DLT)</li>
            </ul>
          </div>

          {/* Col 4 */}
          <div>
            <h4 className="text-sm font-bold text-[#131b2e] mb-2">Regional Coordination Hub</h4>
            <p className="text-xs text-[#3d4a42] mb-1">
              Operational Command Desk #4, Chandigarh Multimodal Hub
            </p>
            <p className="text-xs text-[#131b2e] font-bold">
              Direct Dispatch: 1800-NOURISH (Ext. 402)
            </p>
            <p className="text-xs text-[#3d4a42]">
              Encrypted Packet: dispatch@nourishlink.ai.gov.in
            </p>
          </div>
        </div>

        {/* Legal Shield Card */}
        <div className="bg-[#eaedff] rounded-xl p-4 mb-6 border border-[#bccac0]/30 shadow-sm">
          <div className="flex items-start gap-3">
            <span className="material-symbols-outlined text-[#006948] text-2xl mt-0.5">shield</span>
            <div>
              <h5 className="text-sm font-bold text-[#131b2e]">
                FSSAI Good Samaritan Legal Protection Shield
              </h5>
              <p className="text-xs text-[#3d4a42] leading-relaxed mt-0.5">
                Registered donors, commercial kitchens, and certified logistics volunteers are
                protected under the Statutory Good Samaritan Food Donation Guidelines. All food logged
                via NourishLink AI undergoing temperature &amp; sensory verification qualifies for
                sovereign indemnification.
              </p>
            </div>
          </div>
        </div>

        {/* Copyright & Sublinks */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#3d4a42]">
          <p>© 2025 NourishLink AI. Sovereign Civic Infrastructure under UN SDG 2 &amp; SDG 12 Alignment.</p>
          <div className="flex items-center gap-4 font-medium">
            <a className="hover:text-[#131b2e] transition-colors" href="#whitepaper">Security Whitepaper</a>
            <a className="hover:text-[#131b2e] transition-colors" href="#esg">Audited ESG Ledger</a>
            <a className="hover:text-[#131b2e] transition-colors" href="#privacy">Privacy Framework</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
