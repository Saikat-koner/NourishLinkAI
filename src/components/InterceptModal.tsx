import React from 'react';

interface InterceptModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmIntercept: () => void;
}

export const InterceptModal: React.FC<InterceptModalProps> = ({
  isOpen,
  onClose,
  onConfirmIntercept,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white max-w-md w-full rounded-2xl p-6 shadow-2xl space-y-4 border border-[#bccac0]/40 animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-2 border-b border-[#bccac0]/20">
          <div className="flex items-center gap-2 text-[#904d00]">
            <span className="material-symbols-outlined text-2xl animate-bounce">crisis_alert</span>
            <h3 className="font-headline font-bold text-base text-[#131b2e]">
              Priority Intercept Command
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-[#3d4a42] hover:text-[#131b2e] cursor-pointer"
          >
            <span className="material-symbols-outlined text-2xl">close</span>
          </button>
        </div>

        <div className="bg-[#ffdcc3]/40 p-4 rounded-xl space-y-2 border border-[#fe932c]/30">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-[#904d00]">TARGET CORRIDOR:</span>
            <span className="font-mono text-[10px] font-bold bg-white px-2 py-0.5 rounded text-[#904d00]">
              URGENT &lt;41m
            </span>
          </div>
          <div className="font-bold text-sm text-[#131b2e]">Phagwara Palace Resort</div>
          <p className="text-xs text-[#3d4a42] leading-relaxed">
            180 freshly prepared hot meals (Dal Makhani &amp; Basmati Pulao) ready for pickup.
            Rerouting nearest unit <strong>EV Van #PB-08-EV-4102</strong> (2.3 km away).
          </p>
        </div>

        <div className="space-y-1.5 text-xs text-[#3d4a42]">
          <div className="flex items-center gap-1 text-[#006948] font-bold">
            <span className="material-symbols-outlined text-sm">thermostat</span>
            <span>Pre-cooled chamber ready at 68°C Hot Hold standard</span>
          </div>
          <div className="flex items-center gap-1 text-[#006194] font-bold">
            <span className="material-symbols-outlined text-sm">route</span>
            <span>Automated green-corridor priority signal sync</span>
          </div>
        </div>

        <div className="pt-2 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-xs font-bold text-[#3d4a42] hover:bg-[#f2f3ff] transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirmIntercept();
              onClose();
            }}
            className="px-4 py-2 rounded-lg bg-[#904d00] text-white text-xs font-bold hover:bg-[#fe932c] transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm">local_shipping</span>
            <span>Lock Priority Intercept</span>
          </button>
        </div>
      </div>
    </div>
  );
};
