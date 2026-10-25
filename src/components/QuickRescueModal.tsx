import React, { useState } from 'react';

interface QuickRescueModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitRescue: (data: any) => void;
}

export const QuickRescueModal: React.FC<QuickRescueModalProps> = ({
  isOpen,
  onClose,
  onSubmitRescue,
}) => {
  const [kitchenName, setKitchenName] = useState('Haveli Banquets & Heritage Kitchen');
  const [foodType, setFoodType] = useState('Dal Makhani & Basmati Rice');
  const [portions, setPortions] = useState(150);
  const [temperature, setTemperature] = useState('71.5');
  const [isDeploying, setIsDeploying] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsDeploying(true);
    setTimeout(() => {
      onSubmitRescue({
        kitchenName,
        foodType,
        portions,
        temperature,
      });
      setIsDeploying(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white max-w-lg w-full rounded-2xl p-6 shadow-2xl space-y-4 border border-[#bccac0]/40 animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-2 border-b border-[#bccac0]/20">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#006948] text-2xl">add_circle</span>
            <div>
              <h3 className="font-headline font-bold text-base text-[#131b2e]">
                Quick Food Rescue Dispatch
              </h3>
              <p className="text-xs text-[#3d4a42]">Deploy autonomous rescue unit in &lt;14 mins</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-[#3d4a42] hover:text-[#131b2e] cursor-pointer"
          >
            <span className="material-symbols-outlined text-2xl">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="space-y-1">
            <label className="text-xs font-bold text-[#131b2e]">Donor Kitchen / Facility</label>
            <input
              type="text"
              required
              value={kitchenName}
              onChange={(e) => setKitchenName(e.target.value)}
              className="w-full px-3 py-2 bg-[#f2f3ff] text-xs text-[#131b2e] font-semibold rounded-lg border border-[#bccac0]/30 focus:outline-none focus:ring-1 focus:ring-[#006948]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-bold text-[#131b2e]">Food Preparation</label>
              <input
                type="text"
                required
                value={foodType}
                onChange={(e) => setFoodType(e.target.value)}
                className="w-full px-3 py-2 bg-[#f2f3ff] text-xs text-[#131b2e] rounded-lg border border-[#bccac0]/30 focus:outline-none focus:ring-1 focus:ring-[#006948]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-[#131b2e]">Portions Count</label>
              <input
                type="number"
                min="10"
                max="1000"
                required
                value={portions}
                onChange={(e) => setPortions(parseInt(e.target.value, 10))}
                className="w-full px-3 py-2 bg-[#f2f3ff] text-xs text-[#131b2e] font-mono rounded-lg border border-[#bccac0]/30 focus:outline-none focus:ring-1 focus:ring-[#006948]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-bold text-[#131b2e]">IR Temp (°C)</label>
              <input
                type="text"
                value={temperature}
                onChange={(e) => setTemperature(e.target.value)}
                className="w-full px-3 py-2 bg-[#f2f3ff] text-xs text-[#006948] font-bold font-mono rounded-lg border border-[#bccac0]/30 focus:outline-none focus:ring-1 focus:ring-[#006948]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-[#131b2e]">Pre-Matched Shelter</label>
              <div className="px-3 py-2 bg-[#eaedff] text-xs text-[#131b2e] font-semibold rounded-lg truncate border border-[#bccac0]/20">
                Pingalwara Slum Feeding Hub
              </div>
            </div>
          </div>

          <div className="p-2.5 rounded-lg bg-[#85f8c4]/20 border border-[#006948]/30 flex items-center gap-2 text-xs text-[#006948] font-medium">
            <span className="material-symbols-outlined text-base">shield</span>
            <span>Covered under FSSAI Sec 31(C) Good Samaritan Legal Protection</span>
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
              type="submit"
              disabled={isDeploying}
              className="px-4 py-2 rounded-lg bg-[#006948] text-white text-xs font-bold hover:bg-[#00855d] transition-all shadow-sm flex items-center gap-1.5 cursor-pointer disabled:opacity-75"
            >
              <span className={`material-symbols-outlined text-sm ${isDeploying ? 'animate-spin' : ''}`}>
                {isDeploying ? 'refresh' : 'send'}
              </span>
              <span>{isDeploying ? 'Dispatching Fleet...' : 'Deploy Nearest Unit'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
