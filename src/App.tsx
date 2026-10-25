import React, { useState, useEffect } from 'react';
import { ActivePortal, AdminSubTab, DonorReceiverSubTab } from './types.ts';
import { Header } from './components/Header.tsx';
import { Footer } from './components/Footer.tsx';
import { HomePage } from './components/HomePage.tsx';
import { DonorReceiverPortal } from './components/DonorReceiverPortal.tsx';
import { LiveOperationsHub } from './components/LiveOperationsHub.tsx';
import { CommunityNeedCensus } from './components/CommunityNeedCensus.tsx';
import { CvrptwFleetDispatch } from './components/CvrptwFleetDispatch.tsx';
import { ImpactAndSdgs } from './components/ImpactAndSdgs.tsx';
import { QuickRescueModal } from './components/QuickRescueModal.tsx';
import { NotificationDrawer } from './components/NotificationDrawer.tsx';
import { InterceptModal } from './components/InterceptModal.tsx';
import { DonorProfileModal } from './components/DonorProfileModal.tsx';

export default function App() {
  const [activePortal, setActivePortal] = useState<ActivePortal>('home');
  const [adminSubTab, setAdminSubTab] = useState<AdminSubTab>('live-hub');
  const [donorReceiverSubTab, setDonorReceiverSubTab] = useState<DonorReceiverSubTab>('donate');

  const [quickRescueOpen, setQuickRescueOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [interceptModalOpen, setInterceptModalOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [globalToast, setGlobalToast] = useState<string | null>(null);

  // Deep linking hash synchronization
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash === 'home') {
        setActivePortal('home');
      } else if (hash === 'donor' || hash === 'donate') {
        setActivePortal('donor-receiver');
        setDonorReceiverSubTab('donate');
      } else if (hash === 'receive' || hash === 'receiver') {
        setActivePortal('donor-receiver');
        setDonorReceiverSubTab('receive');
      } else if (hash === 'aid' || hash === 'request-aid') {
        setActivePortal('donor-receiver');
        setDonorReceiverSubTab('request-aid');
      } else if (hash === 'rewards' || hash === 'impact-rewards') {
        setActivePortal('donor-receiver');
        setDonorReceiverSubTab('rewards');
      } else if (hash === 'profile') {
        setProfileModalOpen(true);
      } else if (hash === 'admin' || hash === 'live-hub') {
        setActivePortal('admin');
        setAdminSubTab('live-hub');
      } else if (hash === 'cvrptw') {
        setActivePortal('admin');
        setAdminSubTab('cvrptw');
      } else if (hash === 'census') {
        setActivePortal('admin');
        setAdminSubTab('census');
      } else if (hash === 'impact') {
        setActivePortal('admin');
        setAdminSubTab('impact');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const triggerToast = (msg: string) => {
    setGlobalToast(msg);
    setTimeout(() => {
      setGlobalToast(null);
    }, 4500);
  };

  const handlePortalChange = (portal: ActivePortal) => {
    setActivePortal(portal);
    window.location.hash = portal;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateFromHome = (
    portal: ActivePortal,
    subTab?: AdminSubTab | DonorReceiverSubTab
  ) => {
    setActivePortal(portal);
    if (portal === 'donor-receiver' && subTab) {
      setDonorReceiverSubTab(subTab as DonorReceiverSubTab);
      window.location.hash = subTab;
    } else if (portal === 'admin' && subTab) {
      setAdminSubTab(subTab as AdminSubTab);
      window.location.hash = subTab;
    } else {
      window.location.hash = portal;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleQuickRescueSubmit = (data: any) => {
    triggerToast(
      `Autonomous unit dispatched to ${data.kitchenName} for ${data.portions} portions (${data.foodType}).`
    );
  };

  const handleConfirmIntercept = () => {
    triggerToast(
      'Interception active: EV Van #PB-08-EV-4102 locked on priority corridor to Phagwara Palace Resort!'
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#faf8ff] text-[#131b2e] antialiased selection:bg-[#85f8c4] selection:text-[#002114]">
      {/* Universal Fixed Header */}
      <Header
        activePortal={activePortal}
        setActivePortal={handlePortalChange}
        adminSubTab={adminSubTab}
        setAdminSubTab={(tab) => {
          setAdminSubTab(tab);
          window.location.hash = tab;
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        donorReceiverSubTab={donorReceiverSubTab}
        setDonorReceiverSubTab={(tab) => {
          setDonorReceiverSubTab(tab);
          window.location.hash = tab;
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenQuickRescue={() => setQuickRescueOpen(true)}
        onToggleNotifications={() => setNotificationsOpen(!notificationsOpen)}
        onOpenProfile={() => setProfileModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="w-full pt-[124px] flex-1">
        {/* 1. Home Page Overview */}
        {activePortal === 'home' && (
          <HomePage
            onSelectPortal={handleNavigateFromHome}
            onOpenQuickRescue={() => setQuickRescueOpen(true)}
          />
        )}

        {/* 2. Donor & Receiver Community Portal */}
        {activePortal === 'donor-receiver' && (
          <DonorReceiverPortal
            initialSubTab={donorReceiverSubTab}
            onDispatchToFleet={(data) => {
              triggerToast(
                `Fleet dispatch initiated for ${data.foodName} (${data.portions} portions) via ${data.vehicle}.`
              );
            }}
          />
        )}

        {/* 3. Admin Command Operations Hub */}
        {activePortal === 'admin' && (
          <>
            {adminSubTab === 'live-hub' && (
              <LiveOperationsHub
                onTriggerIntercept={() => setInterceptModalOpen(true)}
                onNavigateToTab={(tabId) => {
                  if (tabId === 'community-need-census') setAdminSubTab('census');
                  else if (tabId === 'cvrptw-fleet-dispatch') setAdminSubTab('cvrptw');
                  else if (tabId === 'impact-sdgs') setAdminSubTab('impact');
                  else if (tabId === 'donor-surplus-portal') {
                    setActivePortal('donor-receiver');
                    setDonorReceiverSubTab('donate');
                  }
                }}
              />
            )}

            {adminSubTab === 'cvrptw' && <CvrptwFleetDispatch />}

            {adminSubTab === 'census' && <CommunityNeedCensus />}

            {adminSubTab === 'impact' && <ImpactAndSdgs />}
          </>
        )}
      </main>

      {/* Universal Footer */}
      <Footer />

      {/* Modals & Drawers */}
      <QuickRescueModal
        isOpen={quickRescueOpen}
        onClose={() => setQuickRescueOpen(false)}
        onSubmitRescue={handleQuickRescueSubmit}
      />

      <NotificationDrawer
        isOpen={notificationsOpen}
        onClose={() => setNotificationsOpen(false)}
      />

      <InterceptModal
        isOpen={interceptModalOpen}
        onClose={() => setInterceptModalOpen(false)}
        onConfirmIntercept={handleConfirmIntercept}
      />

      {/* Donor Profile & Gamified Impact Modal */}
      <DonorProfileModal
        isOpen={profileModalOpen}
        onClose={() => setProfileModalOpen(false)}
      />

      {/* Global Feedback Toast */}
      {globalToast && (
        <div className="fixed bottom-6 right-6 max-w-md bg-[#131b2e] text-white p-3.5 rounded-xl shadow-2xl z-50 flex items-center gap-3 border border-[#bccac0]/40 animate-in slide-in-from-bottom duration-300">
          <span className="material-symbols-outlined text-[#85f8c4] text-xl">check_circle</span>
          <span className="text-xs font-semibold">{globalToast}</span>
        </div>
      )}
    </div>
  );
}
