import React from 'react';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const notifications = [
    {
      id: 'notif-1',
      title: 'Surplus Dispatched: Phagwara Palace',
      time: '2 mins ago',
      desc: 'EV Van PB-08-EV-4102 locked on priority GT Road corridor.',
      type: 'urgent',
      icon: 'local_shipping',
    },
    {
      id: 'notif-2',
      title: 'Grassroots Census Update',
      time: '9 mins ago',
      desc: 'Scout Balwant S. verified 85 meals needed at Railway Flyover Camp.',
      type: 'info',
      icon: 'sms',
    },
    {
      id: 'notif-3',
      title: 'HACCP Safe Handoff Completed',
      time: '18 mins ago',
      desc: 'Civil Hospital Shelter drop verified at 69°C. Cryptographic token logged.',
      type: 'success',
      icon: 'verified',
    },
    {
      id: 'notif-4',
      title: 'IoT Sensor Mesh Check Nominal',
      time: '34 mins ago',
      desc: 'All 24 thermal probes reporting active BLE signal across Jalandhar belt.',
      type: 'system',
      icon: 'sensors',
    },
  ];

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex justify-end">
      <div className="w-full max-w-sm bg-white h-full shadow-2xl flex flex-col p-4 border-l border-[#bccac0]/40 animate-in slide-in-from-right duration-200">
        <div className="flex items-center justify-between pb-3 border-b border-[#bccac0]/20">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#006948] text-xl">notifications</span>
            <h3 className="font-headline font-bold text-sm text-[#131b2e]">Telemetry Alerts</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-[#3d4a42] hover:bg-[#eaedff] cursor-pointer"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-3 space-y-2.5">
          {notifications.map((item) => (
            <div
              key={item.id}
              className="p-3 rounded-xl bg-[#f2f3ff] border border-[#bccac0]/20 space-y-1 hover:bg-[#eaedff] transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#131b2e] flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-sm text-[#006948]">{item.icon}</span>
                  {item.title}
                </span>
                <span className="text-[10px] text-[#3d4a42]">{item.time}</span>
              </div>
              <p className="text-xs text-[#3d4a42] leading-snug">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="pt-3 border-t border-[#bccac0]/20 text-center">
          <span className="text-[11px] text-[#3d4a42]">Encrypted Telemetry Hub • Desk #4 Chandigarh</span>
        </div>
      </div>
    </div>
  );
};
