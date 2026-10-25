import React, { useState } from 'react';
import { CensusNode } from '../types.ts';
import { LocationSelector } from './LocationSelector.tsx';
import { validateCensusNode } from '../utils/rescueMath.ts';

interface AddCensusNodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddNode: (node: CensusNode) => void;
}

export const AddCensusNodeModal: React.FC<AddCensusNodeModalProps> = ({
  isOpen,
  onClose,
  onAddNode,
}) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState<CensusNode['category']>('Shelter');
  const [headcount, setHeadcount] = useState(60);
  const [children, setChildren] = useState(15);
  const [elderly, setElderly] = useState(10);
  const [urgency, setUrgency] = useState('High Priority');
  const [coordinatorName, setCoordinatorName] = useState('');
  const [coordinatorPhone, setCoordinatorPhone] = useState('');
  const [locationAddress, setLocationAddress] = useState('GT Road, Jalandhar Bypass, Punjab');
  const [lat, setLat] = useState(31.3260);
  const [lng, setLng] = useState(75.5762);
  const [locationMethod, setLocationMethod] = useState<'gps' | 'map'>('map');
  const [errors, setErrors] = useState<string[]>([]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validation = validateCensusNode({
      name,
      headcount,
      coordinator: coordinatorName,
      lat,
      lng,
    });

    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }

    const newNode: CensusNode = {
      id: `node-${Date.now()}`,
      code: `NODE PB-${Math.floor(1000 + Math.random() * 9000)}`,
      name: name.trim(),
      category,
      location: locationAddress,
      headcount,
      children,
      elderly,
      urgency,
      coordinator: `${coordinatorName.trim()} (${coordinatorPhone.trim() || 'Scout Verified'})`,
      coordinates: `Lat ${lat.toFixed(4)}, Lon ${lng.toFixed(4)}`,
      lat,
      lng,
      locationMethod,
      timestamp: new Date().toLocaleTimeString(),
    };

    onAddNode(newNode);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white max-w-xl w-full rounded-2xl p-6 shadow-2xl space-y-4 border border-[#bccac0]/40 my-8 animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-2 border-b border-[#bccac0]/20">
          <div className="flex items-center gap-2 text-[#006948]">
            <span className="material-symbols-outlined text-2xl">person_pin_circle</span>
            <div>
              <h3 className="font-headline font-bold text-lg text-[#131b2e]">
                Add New Community Need Census Node
              </h3>
              <p className="text-xs text-[#3d4a42]">
                Register unhoused camp, hospital shelter, or migrant settlement
              </p>
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

        {errors.length > 0 && (
          <div className="p-3 rounded-lg bg-[#ffdad6] text-[#93000a] text-xs space-y-1 border border-[#ba1a1a]/30">
            {errors.map((err, idx) => (
              <div key={idx} className="flex items-center gap-1.5 font-semibold">
                <span className="material-symbols-outlined text-xs">error</span>
                <span>{err}</span>
              </div>
            ))}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-bold text-[#131b2e]">Shelter / Community Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Model Town Slum Feeding Hub"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 bg-[#f2f3ff] text-xs text-[#131b2e] font-semibold rounded-lg border border-[#bccac0]/30 focus:outline-none focus:ring-1 focus:ring-[#006948]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-[#131b2e]">Facility Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full px-3 py-2 bg-[#f2f3ff] text-xs text-[#131b2e] font-semibold rounded-lg border border-[#bccac0]/30 focus:outline-none focus:ring-1 focus:ring-[#006948]"
              >
                <option value="Shelter">Civil Shelter / Rain Basera</option>
                <option value="Railway Camp">Railway Flyover Camp</option>
                <option value="Brick Kiln">Brick Kiln Worker Colony</option>
                <option value="Slum Cluster">Slum &amp; Informal Settlement</option>
                <option value="Hospital Ward">Hospital Dependent Relatives</option>
                <option value="Orphanage">Child Care / Orphanage Hub</option>
              </select>
            </div>
          </div>

          {/* Headcount Metrics */}
          <div className="grid grid-cols-3 gap-2.5 bg-[#eaedff]/50 p-3 rounded-xl border border-[#bccac0]/20">
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-[#131b2e] block">
                Total Headcount
              </label>
              <input
                type="number"
                min="1"
                max="1000"
                required
                value={headcount}
                onChange={(e) => setHeadcount(parseInt(e.target.value, 10))}
                className="w-full px-2.5 py-1.5 bg-white text-xs text-[#131b2e] font-mono font-bold rounded-lg border border-[#bccac0]/30"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-[#006948] block">
                Children &lt;7 yrs
              </label>
              <input
                type="number"
                min="0"
                max={headcount}
                value={children}
                onChange={(e) => setChildren(parseInt(e.target.value, 10))}
                className="w-full px-2.5 py-1.5 bg-white text-xs text-[#006948] font-mono font-bold rounded-lg border border-[#bccac0]/30"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-[#904d00] block">
                Elderly &gt;60 yrs
              </label>
              <input
                type="number"
                min="0"
                max={headcount}
                value={elderly}
                onChange={(e) => setElderly(parseInt(e.target.value, 10))}
                className="w-full px-2.5 py-1.5 bg-white text-xs text-[#904d00] font-mono font-bold rounded-lg border border-[#bccac0]/30"
              />
            </div>
          </div>

          {/* Coordinator Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-bold text-[#131b2e]">Field Coordinator / Scout</label>
              <input
                type="text"
                required
                placeholder="e.g. Gurmeet Kaur (Khalsa Aid)"
                value={coordinatorName}
                onChange={(e) => setCoordinatorName(e.target.value)}
                className="w-full px-3 py-2 bg-[#f2f3ff] text-xs text-[#131b2e] rounded-lg border border-[#bccac0]/30 focus:outline-none focus:ring-1 focus:ring-[#006948]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-[#131b2e]">Scout Mobile Number</label>
              <input
                type="text"
                placeholder="+91 98140-XXXXX"
                value={coordinatorPhone}
                onChange={(e) => setCoordinatorPhone(e.target.value)}
                className="w-full px-3 py-2 bg-[#f2f3ff] text-xs text-[#131b2e] font-mono rounded-lg border border-[#bccac0]/30 focus:outline-none focus:ring-1 focus:ring-[#006948]"
              />
            </div>
          </div>

          {/* Location Selector Component with 2 Options (GPS & Map Click) */}
          <LocationSelector
            initialLat={lat}
            initialLng={lng}
            initialAddress={locationAddress}
            onLocationChange={(loc) => {
              setLat(loc.lat);
              setLng(loc.lng);
              setLocationAddress(loc.address);
              setLocationMethod(loc.method);
            }}
          />

          <div className="pt-2 flex items-center justify-end gap-2 border-t border-[#bccac0]/20">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-xs font-bold text-[#3d4a42] hover:bg-[#f2f3ff] transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#006948] text-white text-xs font-bold rounded-lg shadow-sm hover:bg-[#00855d] transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
            >
              <span className="material-symbols-outlined text-base">add_task</span>
              <span>Register &amp; Add to Census Matrix</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
