import React, { useState } from 'react';
import { ActivePortal, AdminSubTab, DonorReceiverSubTab } from '../types.ts';

interface HeaderProps {
  activePortal: ActivePortal;
  setActivePortal: (portal: ActivePortal) => void;
  adminSubTab: AdminSubTab;
  setAdminSubTab: (tab: AdminSubTab) => void;
  donorReceiverSubTab: DonorReceiverSubTab;
  setDonorReceiverSubTab: (tab: DonorReceiverSubTab) => void;
  onOpenQuickRescue: () => void;
  onToggleNotifications: () => void;
  onOpenProfile?: () => void;
  unreadCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  activePortal,
  setActivePortal,
  adminSubTab,
  setAdminSubTab,
  donorReceiverSubTab,
  setDonorReceiverSubTab,
  onOpenQuickRescue,
  onToggleNotifications,
  onOpenProfile,
  unreadCount = 3,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const adminNavItems: { id: AdminSubTab; label: string; icon: string }[] = [
    { id: 'live-hub', label: 'Live Operations Hub', icon: 'monitoring' },
    { id: 'cvrptw', label: 'CVRPTW Fleet Dispatch', icon: 'local_shipping' },
    { id: 'census', label: 'Community Need Census', icon: 'groups_3' },
    { id: 'impact', label: 'Impact & SDGs', icon: 'eco' },
  ];

  const communityNavItems: { id: DonorReceiverSubTab; label: string; icon: string }[] = [
    { id: 'donate', label: 'Donate Food Surplus', icon: 'volunteer_activism' },
    { id: 'receive', label: 'Receiver Hub & Inbound', icon: 'inventory_2' },
    { id: 'request-aid', label: 'Request Food Aid', icon: 'support_agent' },
    { id: 'rewards', label: 'Gamified Impact & Rewards', icon: 'military_tech' },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#faf8ff]/95 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.05)] border-b border-[#bccac0]/30">
      {/* Top Emergency Ribbon */}
      <div className="bg-[#904d00] text-white px-4 md:px-6 py-1">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-[11px] font-semibold tracking-wide">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">emergency_home</span>
            <span>Toll-free 24/7 Food Rescue Hotline: 1800-NOURISH</span>
            <span className="opacity-60">|</span>
            <span className="hidden sm:inline opacity-90">SLA: &lt;14 mins Metro Thermal Handoff</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-[#ffdcc3]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Punjab Corridor Grid Active
            </span>
            <span className="hidden md:inline text-[#ffdcc3]/90">FSSAI Sec. 31-C Good Samaritan Shield</span>
          </div>
        </div>
      </div>

      {/* Main Nav Bar */}
      <div className="h-16 max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between gap-4">
        {/* Brand */}
        <div
          className="flex items-center gap-3 min-w-fit cursor-pointer"
          onClick={() => setActivePortal('home')}
          role="button"
          tabIndex={0}
          aria-label="Go to Home"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#00855d] to-[#006948] p-1.5 flex items-center justify-center shadow-sm text-white">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <path d="M12 8v8" />
              <path d="M8 12h8" />
            </svg>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-headline font-extrabold text-xl tracking-tight text-[#006948]">
                NourishLink AI
              </span>
              <span className="px-1.5 py-0.5 rounded-full bg-[#85f8c4] text-[#002114] text-[10px] font-bold uppercase tracking-wider">
                v2.4
              </span>
            </div>
            <span className="text-[10px] text-[#3d4a42] font-medium hidden md:inline leading-none">
              Autonomous Food Rescue &amp; Dignity Logistics
            </span>
          </div>
        </div>

        {/* Primary Portal Switcher Tabs (Desktop) */}
        <div className="hidden lg:flex items-center bg-[#eaedff] p-1 rounded-xl border border-[#bccac0]/30 shadow-xs">
          <button
            onClick={() => setActivePortal('home')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activePortal === 'home'
                ? 'bg-white text-[#006948] shadow-sm'
                : 'text-[#3d4a42] hover:text-[#131b2e]'
            }`}
          >
            <span className="material-symbols-outlined text-sm">home</span>
            <span>Home Overview</span>
          </button>

          <button
            onClick={() => setActivePortal('donor-receiver')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activePortal === 'donor-receiver'
                ? 'bg-[#006948] text-white shadow-sm'
                : 'text-[#3d4a42] hover:text-[#131b2e]'
            }`}
          >
            <span className="material-symbols-outlined text-sm">volunteer_activism</span>
            <span>Donor &amp; Receiver Portal</span>
          </button>

          <button
            onClick={() => setActivePortal('admin')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activePortal === 'admin'
                ? 'bg-[#131b2e] text-white shadow-sm'
                : 'text-[#3d4a42] hover:text-[#131b2e]'
            }`}
          >
            <span className="material-symbols-outlined text-sm">admin_panel_settings</span>
            <span>Admin Command Hub</span>
          </button>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2.5">
          {/* Quick Food Rescue CTA */}
          <button
            onClick={onOpenQuickRescue}
            className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#fe932c] text-[#4a2600] text-xs font-bold rounded-lg shadow-sm hover:bg-[#ffdcc3] transition-all active:scale-[0.98] cursor-pointer"
            type="button"
            aria-label="Quick Food Rescue"
          >
            <span className="material-symbols-outlined text-base">add_circle</span>
            <span className="hidden sm:inline">+ Emergency Rescue</span>
            <span className="sm:hidden">Rescue</span>
          </button>

          {/* Notifications Button */}
          <button
            onClick={onToggleNotifications}
            aria-label="Notifications"
            className="relative p-2 rounded-full text-[#3d4a42] hover:bg-[#eaedff] hover:text-[#131b2e] transition-colors cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-xl">notifications</span>
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-[#fe932c] rounded-full ring-2 ring-[#faf8ff] animate-pulse"></span>
            )}
          </button>

          {/* Coordinator / Scout Profile Avatar Button */}
          <button
            type="button"
            onClick={onOpenProfile}
            title="Open Donor & Field Profile • Gamified Rewards & Impact Tracker"
            className="flex items-center gap-2 pl-2 border-l border-[#bccac0]/40 hover:opacity-90 transition-all cursor-pointer group text-left rounded-lg p-1 hover:bg-[#eaedff]"
            aria-label="Open User Profile & Gamified Impact Tracker"
          >
            <div className="relative">
              <img
                alt="Coordinator Profile"
                className="w-8 h-8 rounded-full object-cover ring-2 ring-[#006948]/40 group-hover:ring-[#006948] transition-all shadow-xs"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC7O5uriTeAMK72VpNrVzvANsADTDf0lUkOJV9k45f4m6cxe5rLyIkUNxKPQRqtV5vp8glW97G8CazLMm0LA8fgogAGiZNexlKy4hF17H3fj99fJHmX7BoqWkj6H4yPr7Y9JlroMGvSIR7gP2f_UyBuZ5YJ7ClzkppkHcPeI5BIJN-N8RZV4IacXCpj5r2Ovjx4slx0L-KZ_Lk7UbzAtV9jbfMwVU61fyblF2_u5aBWFbe0Dd3uZ7jVtg"
              />
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-1 ring-white"></span>
            </div>
            <div className="hidden xl:flex flex-col text-left">
              <span className="text-[11px] font-bold text-[#131b2e] leading-tight group-hover:text-[#006948] transition-colors flex items-center gap-0.5">
                Punjab Field Desk
                <span className="material-symbols-outlined text-xs text-[#006948]">expand_more</span>
              </span>
              <span className="text-[9px] text-[#006948] font-bold leading-tight">4.8k Pts · Gold Tier</span>
            </div>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-[#3d4a42] hover:bg-[#eaedff]"
            aria-label="Toggle Navigation Menu"
          >
            <span className="material-symbols-outlined text-2xl">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Secondary Sub-Navigation Bar (Desktop) */}
      <div className="bg-[#f2f3ff] border-t border-[#bccac0]/25 px-4 md:px-6 py-1.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs overflow-x-auto">
          {activePortal === 'home' && (
            <div className="flex items-center gap-3 text-[#3d4a42]">
              <span className="font-semibold text-[#131b2e] flex items-center gap-1">
                <span className="material-symbols-outlined text-sm text-[#006948]">explore</span>
                Welcome to NourishLink:
              </span>
              <button
                onClick={() => setActivePortal('donor-receiver')}
                className="hover:text-[#006948] font-medium transition-colors cursor-pointer"
              >
                1. Donor Intake (Typed Dish &amp; Dual GPS/Map) &rarr;
              </button>
              <button
                onClick={() => setActivePortal('donor-receiver')}
                className="hover:text-[#006948] font-medium transition-colors cursor-pointer"
              >
                2. Receiver Live Tracking &rarr;
              </button>
              <button
                onClick={() => setActivePortal('admin')}
                className="hover:text-[#006948] font-medium transition-colors cursor-pointer"
              >
                3. Admin Census &amp; CVRPTW Hub &rarr;
              </button>
            </div>
          )}

          {activePortal === 'donor-receiver' && (
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold text-[#3d4a42] uppercase tracking-wider mr-2 hidden sm:inline">
                Community Portal:
              </span>
              {communityNavItems.map((item) => {
                const isActive = donorReceiverSubTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setDonorReceiverSubTab(item.id)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg font-bold text-xs transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#006948] text-white shadow-xs'
                        : 'text-[#3d4a42] hover:bg-white hover:text-[#131b2e]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-sm">{item.icon}</span>
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          )}

          {activePortal === 'admin' && (
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold text-[#3d4a42] uppercase tracking-wider mr-2 hidden sm:inline">
                Admin Operations:
              </span>
              {adminNavItems.map((item) => {
                const isActive = adminSubTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setAdminSubTab(item.id)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg font-bold text-xs transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#131b2e] text-white shadow-xs'
                        : 'text-[#3d4a42] hover:bg-white hover:text-[#131b2e]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-sm">{item.icon}</span>
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          )}

          <div className="hidden md:flex items-center gap-2 text-[11px] text-[#3d4a42] flex-shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span>Mesh Telemetry: 14 Active Nodes</span>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#faf8ff] border-t border-[#bccac0]/30 px-4 py-3 space-y-3 shadow-lg animate-in slide-in-from-top duration-200">
          <div className="space-y-1">
            <div className="text-[10px] font-bold text-[#3d4a42] uppercase tracking-wider">Select Portal</div>
            <button
              onClick={() => {
                setActivePortal('home');
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-2 ${
                activePortal === 'home' ? 'bg-[#006948] text-white' : 'text-[#3d4a42] hover:bg-[#e2e7ff]'
              }`}
            >
              <span className="material-symbols-outlined text-sm">home</span>
              Home Overview
            </button>
            <button
              onClick={() => {
                setActivePortal('donor-receiver');
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-2 ${
                activePortal === 'donor-receiver' ? 'bg-[#006948] text-white' : 'text-[#3d4a42] hover:bg-[#e2e7ff]'
              }`}
            >
              <span className="material-symbols-outlined text-sm">volunteer_activism</span>
              Donor &amp; Receiver Portal
            </button>
            <button
              onClick={() => {
                setActivePortal('admin');
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-2 ${
                activePortal === 'admin' ? 'bg-[#131b2e] text-white' : 'text-[#3d4a42] hover:bg-[#e2e7ff]'
              }`}
            >
              <span className="material-symbols-outlined text-sm">admin_panel_settings</span>
              Admin Command Hub
            </button>
          </div>

          {activePortal === 'donor-receiver' && (
            <div className="pt-2 border-t border-[#bccac0]/30 space-y-1">
              <div className="text-[10px] font-bold text-[#3d4a42] uppercase tracking-wider">Community Sections</div>
              {communityNavItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setDonorReceiverSubTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-xs font-semibold rounded-lg ${
                    donorReceiverSubTab === item.id ? 'bg-[#006948] text-white' : 'text-[#3d4a42] hover:bg-[#e2e7ff]'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}

          {activePortal === 'admin' && (
            <div className="pt-2 border-t border-[#bccac0]/30 space-y-1">
              <div className="text-[10px] font-bold text-[#3d4a42] uppercase tracking-wider">Admin Controls</div>
              {adminNavItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setAdminSubTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-xs font-semibold rounded-lg ${
                    adminSubTab === item.id ? 'bg-[#131b2e] text-white' : 'text-[#3d4a42] hover:bg-[#e2e7ff]'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}

          {/* Mobile Profile Trigger */}
          <div className="pt-2 border-t border-[#bccac0]/30">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenProfile) onOpenProfile();
              }}
              className="w-full py-2.5 px-3 rounded-lg bg-[#006948] text-white text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              <span className="material-symbols-outlined text-base">military_tech</span>
              <span>Open My Profile &amp; Gamified Impact (4.8k Pts)</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
