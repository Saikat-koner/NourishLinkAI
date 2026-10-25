import React, { useState, useEffect, useRef } from 'react';
import { validateHaccpTemp } from '../utils/rescueMath.ts';
import { CorridorSpatialMap } from './CorridorSpatialMap.tsx';

export const CvrptwFleetDispatch: React.FC = () => {
  // Simulation states
  const [isGridlock, setIsGridlock] = useState(false);
  const [deliverySuccess, setDeliverySuccess] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(46 * 60 + 12);
  const [chamberTemp, setChamberTemp] = useState(68.2);

  // Canvas drawing state
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSignature, setHasSignature] = useState(false);

  // Timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTimerSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (sec: number) => {
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = sec % 60;
    return `00:${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // Canvas drawing handlers
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set resolution
    canvas.width = canvas.offsetWidth * 2;
    canvas.height = canvas.offsetHeight * 2;
    ctx.scale(2, 2);
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#006948';
  }, []);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsDrawing(true);
    setHasSignature(true);

    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.nativeEvent.offsetX;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.nativeEvent.offsetY;

    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.nativeEvent.offsetX;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.nativeEvent.offsetY;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasSignature(false);
  };

  // Simulation triggers
  const handleTriggerGridlock = () => {
    setIsGridlock(true);
    setDeliverySuccess(false);
    setChamberTemp(58.4);
    setTimerSeconds(8 * 60 + 14);
  };

  const handleTriggerHandover = () => {
    setDeliverySuccess(true);
    setIsGridlock(false);
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.font = '14px Plus Jakarta Sans';
        ctx.fillStyle = '#006948';
        ctx.textAlign = 'center';
        ctx.fillText('✓ Signed & Tamper-Verified: Gurpreet Singh', canvas.offsetWidth / 2, canvas.offsetHeight / 2);
        setHasSignature(true);
      }
    }
  };

  const handleReset = () => {
    setIsGridlock(false);
    setDeliverySuccess(false);
    setChamberTemp(68.2);
    setTimerSeconds(46 * 60 + 12);
    clearCanvas();
  };

  const haccpCheck = validateHaccpTemp(chamberTemp, 'hot');

  return (
    <div className="flex flex-col w-full pb-10">
      <div className="w-full max-w-7xl mx-auto px-4 md:px-6 py-4">
        {/* Top Strategic Operations Strip */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center justify-center p-1 rounded-lg bg-[#006948] text-white">
                <span className="material-symbols-outlined text-base">local_shipping</span>
              </span>
              <span className="text-xs uppercase tracking-wider text-[#006948] font-bold">
                Autonomous Dispatch · CVRPTW Engine v3.1
              </span>
            </div>
            <h1 className="font-headline font-extrabold text-2xl lg:text-4xl text-[#131b2e] tracking-tight mt-1">
              CVRPTW Cold-Chain Fleet Routing &amp; Bio-Gas Safeguard
            </h1>
            <p className="text-xs lg:text-sm text-[#3d4a42] max-w-3xl leading-relaxed mt-0.5">
              Capacitated vehicle optimization with dynamic microbial shelf-life time windows, active IoT
              telemetry, and zero-methane statutory diversion protocols.
            </p>
          </div>

          {/* Quick Testing Controls */}
          <div className="flex flex-wrap items-center gap-2 bg-[#eaedff] p-1.5 rounded-xl shadow-sm border border-[#bccac0]/30">
            <button
              type="button"
              onClick={handleTriggerGridlock}
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer active:scale-95 shadow-sm ${
                isGridlock
                  ? 'bg-[#ba1a1a] text-white'
                  : 'bg-[#904d00] text-white hover:bg-[#fe932c]'
              }`}
            >
              <span className="material-symbols-outlined text-base">traffic</span>
              <span>Simulate GT Road Gridlock (Failover)</span>
            </button>
            <button
              type="button"
              onClick={handleTriggerHandover}
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer active:scale-95 shadow-sm ${
                deliverySuccess
                  ? 'bg-[#00855d] text-white ring-2 ring-emerald-300'
                  : 'bg-[#006948] text-white hover:bg-[#00855d]'
              }`}
            >
              <span className="material-symbols-outlined text-base">verified</span>
              <span>Simulate Handover Complete</span>
            </button>
            {(isGridlock || deliverySuccess) && (
              <button
                type="button"
                onClick={handleReset}
                className="px-2.5 py-2 text-xs font-bold text-[#131b2e] hover:bg-[#dae2fd] rounded-lg transition-colors cursor-pointer"
              >
                Reset
              </button>
            )}
          </div>
        </div>

        {/* Active Incident Banner (Critical Failover) */}
        {isGridlock && (
          <div className="mb-6 rounded-xl bg-[#ffdad6] text-[#93000a] p-4 shadow-md border-l-4 border-[#ba1a1a] animate-in slide-in-from-top duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-3xl text-[#ba1a1a] mt-0.5 animate-bounce">
                  warning
                </span>
                <div>
                  <div className="font-headline font-bold text-sm text-[#ba1a1a]">
                    CRITICAL: Freshness Threshold Breach Imminent (&lt; 14m Safe Margin)
                  </div>
                  <p className="text-xs text-[#93000a] mt-0.5 leading-relaxed">
                    GT Road NH-44 Gridlock confirmed. Food safety index deteriorating. Autonomous
                    Bio-Gas Safeguard activated: Rerouting Van PB-08-EV-4412 to{' '}
                    <strong>Ludhiana Municipal Compressed Bio-Gas (CBG) Digester Unit #2</strong>.
                    Landfill methane offset logged.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                <span className="text-[10px] uppercase font-bold px-2 py-1 rounded bg-[#ba1a1a] text-white">
                  FSSAI Safe Route Revoked
                </span>
                <button
                  type="button"
                  onClick={handleReset}
                  className="text-xs font-bold px-3 py-1 bg-white text-[#131b2e] rounded shadow-sm hover:bg-[#f2f3ff] cursor-pointer"
                >
                  Reset Grid
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Success Celebration Toast */}
        {deliverySuccess && (
          <div className="mb-6 rounded-xl bg-[#006948] text-white p-4 shadow-lg border-l-4 border-[#85f8c4] animate-in slide-in-from-top duration-300">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-3xl text-[#85f8c4]">task_alt</span>
                <div>
                  <div className="font-headline font-bold text-sm">
                    Consignment Dignity Handoff Verified!
                  </div>
                  <p className="text-xs opacity-95 mt-0.5 leading-relaxed">
                    420 Fresh Hot Meals distributed at Shaheed Bhagat Singh Colony. Digital tamper-seal
                    cryptographically anchored to Punjab Civil Supplies Ledger.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleReset}
                className="px-3 py-1.5 bg-white text-[#131b2e] rounded-lg text-xs font-bold shadow hover:bg-[#f2f3ff] cursor-pointer ml-3"
              >
                Acknowledge
              </button>
            </div>
          </div>
        )}

        {/* Live Corridor Spatial Tracking (CVRPTW MESH #4) - Moveable Slippy Map */}
        <div className="mb-6">
          <CorridorSpatialMap isGridlock={isGridlock} />
        </div>

        {/* Cockpit Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Active Vehicle Telemetry & Fleet Status (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* Fleet Unit 1: EV Cargo Van */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-[#bccac0]/30 flex flex-col gap-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#00855d] text-[#f5fff7] flex items-center justify-center">
                    <span className="material-symbols-outlined text-2xl">downloading</span>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="font-headline font-bold text-base text-[#131b2e]">
                        Van PB-08-EV-4412
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[11px] font-bold inline-flex items-center gap-1 ${
                          isGridlock
                            ? 'bg-[#ffdad6] text-[#93000a]'
                            : 'bg-[#85f8c4] text-[#002114]'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full animate-ping ${
                            isGridlock ? 'bg-[#ba1a1a]' : 'bg-[#006948]'
                          }`}
                        ></span>
                        {isGridlock ? 'REROUTING TO BIO-GAS' : 'IN TRANSIT'}
                      </span>
                    </div>
                    <span className="text-xs text-[#3d4a42]">
                      Driver: <strong>Gurpreet Singh</strong> · Capacity: 480/600 kg (80%)
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] uppercase tracking-wider text-[#3d4a42] block font-bold">
                    Dynamic Corridor
                  </span>
                  <span
                    className={`text-xs font-bold ${
                      isGridlock ? 'text-[#ba1a1a]' : 'text-[#006948]'
                    }`}
                  >
                    {isGridlock
                      ? 'Emergency Divert → CBG Bio-Gas Plant #2'
                      : 'Jalandhar Palace → Shelter A'}
                  </span>
                </div>
              </div>

              {/* IoT Thermal Chamber Deck */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#f2f3ff] p-4 rounded-xl border border-[#bccac0]/20">
                {/* Temp */}
                <div className="flex flex-col">
                  <div className="flex items-center gap-1 text-[#3d4a42] text-[11px]">
                    <span className="material-symbols-outlined text-sm">device_thermostat</span>
                    <span>Chamber Temp</span>
                  </div>
                  <div className="flex items-baseline gap-1 mt-1 font-mono">
                    <span
                      className={`font-headline font-bold text-2xl ${
                        haccpCheck.compliant ? 'text-[#006948]' : 'text-[#ba1a1a]'
                      }`}
                    >
                      {chamberTemp.toFixed(1)}
                    </span>
                    <span className="text-xs text-[#3d4a42]">°C</span>
                  </div>
                  <span
                    className={`text-[10px] font-bold ${
                      haccpCheck.compliant ? 'text-[#006948]' : 'text-[#ba1a1a]'
                    }`}
                  >
                    {haccpCheck.statusLabel}
                  </span>
                </div>

                {/* Window */}
                <div className="flex flex-col">
                  <div className="flex items-center gap-1 text-[#3d4a42] text-[11px]">
                    <span className="material-symbols-outlined text-sm">timer</span>
                    <span>Time Window (TW)</span>
                  </div>
                  <div className="flex items-baseline gap-1 mt-1 font-mono">
                    <span
                      className={`font-headline font-bold text-2xl ${
                        isGridlock ? 'text-[#ba1a1a]' : 'text-[#131b2e]'
                      }`}
                    >
                      {formatTimer(timerSeconds)}
                    </span>
                  </div>
                  <span
                    className={`text-[10px] font-bold ${
                      isGridlock ? 'text-[#ba1a1a]' : 'text-[#006948]'
                    }`}
                  >
                    {isGridlock ? 'EXPIRED TIME WINDOW (SLA FAILED)' : 'Safe Consumption Zone'}
                  </span>
                </div>

                {/* IoT Battery */}
                <div className="flex flex-col">
                  <div className="flex items-center gap-1 text-[#3d4a42] text-[11px]">
                    <span className="material-symbols-outlined text-sm">battery_charging_90</span>
                    <span>IoT Node Battery</span>
                  </div>
                  <div className="flex items-baseline gap-1 mt-1 font-mono">
                    <span className="font-headline font-bold text-2xl text-[#131b2e]">94</span>
                    <span className="text-xs text-[#3d4a42]">%</span>
                  </div>
                  <span className="text-[10px] text-[#3d4a42]">BLE Mesh Active (4.2V)</span>
                </div>

                {/* SOC */}
                <div className="flex flex-col">
                  <div className="flex items-center gap-1 text-[#3d4a42] text-[11px]">
                    <span className="material-symbols-outlined text-sm">ev_station</span>
                    <span>Vehicle SOC</span>
                  </div>
                  <div className="flex items-baseline gap-1 mt-1 font-mono">
                    <span className="font-headline font-bold text-2xl text-[#904d00]">71</span>
                    <span className="text-xs text-[#3d4a42]">%</span>
                  </div>
                  <span className="text-[10px] text-[#3d4a42]">Est. 128 km remaining</span>
                </div>
              </div>

              {/* Sparkline Telemetry Stream */}
              <div className="flex flex-col bg-[#eaedff] rounded-xl p-3 border border-[#bccac0]/20">
                <div className="flex items-center justify-between mb-1 text-xs text-[#3d4a42]">
                  <span>HACCP Thermal Telemetry Stream (Past 45 mins)</span>
                  <span className="flex items-center gap-1 text-[#006948] font-bold text-[11px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#006948] animate-pulse"></span>
                    Live Polling: 2.4s
                  </span>
                </div>
                <div className="w-full h-12 flex items-center">
                  <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 400 50">
                    <path
                      className={isGridlock ? 'text-[#ba1a1a]' : 'text-[#006948]'}
                      d={
                        isGridlock
                          ? 'M0,25 Q40,24 80,26 T160,25 T240,28 T320,38 T400,45'
                          : 'M0,25 Q40,24 80,26 T160,25 T240,23 T320,25 T400,24'
                      }
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeWidth="2.5"
                    />
                    <path
                      className={isGridlock ? 'text-[#ba1a1a]/10' : 'text-[#006948]/10'}
                      d={
                        isGridlock
                          ? 'M0,25 Q40,24 80,26 T160,25 T240,28 T320,38 T400,45 L400,50 L0,50 Z'
                          : 'M0,25 Q40,24 80,26 T160,25 T240,23 T320,25 T400,24 L400,50 L0,50 Z'
                      }
                      fill="currentColor"
                    />
                    <circle
                      className={isGridlock ? 'fill-[#ba1a1a] animate-ping' : 'fill-[#006948] animate-ping'}
                      cx="400"
                      cy={isGridlock ? '45' : '24'}
                      r="4"
                    />
                    <circle
                      className={isGridlock ? 'fill-[#ba1a1a]' : 'fill-[#006948]'}
                      cx="400"
                      cy={isGridlock ? '45' : '24'}
                      r="3"
                    />
                  </svg>
                </div>
              </div>

              {/* Waypoint Flow */}
              <div className="flex flex-col space-y-2">
                <span className="text-xs uppercase tracking-wider text-[#3d4a42] font-bold">
                  CVRPTW Time-Indexed Waypoint Sequence
                </span>

                {/* Node 1 */}
                <div className="flex items-start gap-3 p-3 rounded-lg bg-[#e2e7ff]/60 border border-[#bccac0]/20">
                  <div className="flex flex-col items-center">
                    <span className="w-5 h-5 rounded-full bg-[#006948] text-white flex items-center justify-center text-[10px] font-bold">
                      1
                    </span>
                    <div className="w-0.5 h-8 bg-[#006948]"></div>
                  </div>
                  <div className="flex-1 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-[#131b2e] block">
                        Grand Amber Banquet Palace, NH-44
                      </span>
                      <span className="text-[11px] text-[#3d4a42]">
                        Surplus Picked: 420 Dal Makhani, Paneer Gravy, Rice [68°C Verified]
                      </span>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-[#85f8c4] text-[#002114] text-[10px] font-bold shrink-0">
                      COMPLETED · 21:05
                    </span>
                  </div>
                </div>

                {/* Node 2 (Target or Rerouted) */}
                <div
                  className={`flex items-start gap-3 p-3 rounded-lg border transition-all ${
                    isGridlock
                      ? 'bg-[#ffdad6] border-[#ba1a1a]'
                      : 'bg-[#e2e7ff] border-[#bccac0]/30'
                  }`}
                >
                  <div className="flex flex-col items-center">
                    <span
                      className={`w-5 h-5 rounded-full text-white flex items-center justify-center text-[10px] font-bold ${
                        isGridlock ? 'bg-[#ba1a1a]' : 'bg-[#904d00]'
                      }`}
                    >
                      2
                    </span>
                    <div className="w-0.5 h-8 bg-gray-300"></div>
                  </div>
                  <div className="flex-1 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-[#131b2e] block">
                        {isGridlock
                          ? 'Ludhiana Municipal CBG Digester #2 (Bio-Gas)'
                          : 'Shaheed Bhagat Singh Shelter (Node A)'}
                      </span>
                      <span className="text-[11px] text-[#3d4a42]">
                        {isGridlock
                          ? 'Emergency Reroute • Zero Landfill Safeguard • Converting to 18kg Bio-CNG'
                          : 'Scheduled Drop: 280 Meals · Time Window: 21:30 - 21:55 · ETA: 12 mins'}
                      </span>
                    </div>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold shrink-0 ${
                        isGridlock
                          ? 'bg-[#ba1a1a] text-white'
                          : deliverySuccess
                          ? 'bg-[#85f8c4] text-[#002114]'
                          : 'bg-[#ffdcc3] text-[#2f1500]'
                      }`}
                    >
                      {isGridlock
                        ? 'BIO-GAS REROUTE'
                        : deliverySuccess
                        ? 'HANDOVER VERIFIED'
                        : 'NEXT DROP'}
                    </span>
                  </div>
                </div>

                {/* Node 3 */}
                <div className="flex items-start gap-3 p-3 rounded-lg bg-[#f2f3ff] opacity-75 border border-[#bccac0]/20">
                  <div className="flex flex-col items-center">
                    <span className="w-5 h-5 rounded-full bg-gray-400 text-white flex items-center justify-center text-[10px] font-bold">
                      3
                    </span>
                  </div>
                  <div className="flex-1 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold text-[#131b2e] block">
                        Labour Colony Night Transit Camp (Node B)
                      </span>
                      <span className="text-[11px] text-[#3d4a42]">
                        Scheduled Drop: 140 Meals · Time Window: 22:05 - 22:30
                      </span>
                    </div>
                    <span className="text-[10px] text-[#3d4a42] font-semibold shrink-0">QUEUED</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Fleet Unit 2: Micro E-Rickshaw Cold Chain */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-[#bccac0]/30 flex flex-col gap-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#007bb9] text-[#fdfcff] flex items-center justify-center">
                    <span className="material-symbols-outlined text-2xl">electric_rickshaw</span>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="font-headline font-bold text-base text-[#131b2e]">
                        E-Rickshaw PB-09-ER-1022
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-[#cce5ff] text-[#001d31] text-[10px] font-bold inline-flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#006194] animate-pulse"></span>
                        HYPERLOCAL CHILLED
                      </span>
                    </div>
                    <span className="text-xs text-[#3d4a42]">
                      Driver: <strong>Manjit Kaur</strong> · Dairy Cold-Box Insulated
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase tracking-wider text-[#3d4a42] block font-bold">
                    Cold Line
                  </span>
                  <span className="text-xs font-bold text-[#006194]">Chilled Dairy &amp; Desserts</span>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-[#f2f3ff] p-4 rounded-xl border border-[#bccac0]/20">
                <div className="flex flex-col">
                  <span className="text-[#3d4a42] text-[11px]">Insulated Vault Temp</span>
                  <div className="flex items-baseline gap-1 mt-1 font-mono">
                    <span className="font-headline font-bold text-2xl text-[#006194]">3.8</span>
                    <span className="text-xs text-[#3d4a42]">°C</span>
                  </div>
                  <span className="text-[10px] text-[#006194] font-bold">Chilled Target: ≤4.0°C OK</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[#3d4a42] text-[11px]">Payload Weight</span>
                  <div className="flex items-baseline gap-1 mt-1 font-mono">
                    <span className="font-headline font-bold text-2xl text-[#131b2e]">115</span>
                    <span className="text-xs text-[#3d4a42]">kg</span>
                  </div>
                  <span className="text-[10px] text-[#3d4a42]">140 Sweetened Kheer Cups</span>
                </div>
                <div className="flex flex-col col-span-2 sm:col-span-1">
                  <span className="text-[#3d4a42] text-[11px]">Current Street Navigation</span>
                  <div className="text-xs font-bold text-[#131b2e] mt-1 truncate">
                    Civil Lines Ring → Bal Orphanage
                  </div>
                  <span className="text-[10px] text-[#006948] font-bold">On Schedule (ETA 8 mins)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Spatial Tracking & Driver Handover (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Active Consignment Route Execution Card */}
            <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-[#bccac0]/30 flex flex-col">
              <div className="p-3.5 flex items-center justify-between bg-[#eaedff] border-b border-[#bccac0]/20">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[#006948] text-lg">alt_route</span>
                  <span className="text-xs font-bold text-[#131b2e]">Active Consignment Guidance</span>
                </div>
                <span className="text-[10px] font-bold text-[#006948] bg-emerald-100 px-2 py-0.5 rounded uppercase">
                  Telemetry Synced
                </span>
              </div>

              {/* Status Header */}
              <div className="p-4 bg-[#f2f3ff] border-b border-[#bccac0]/20 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className={`w-2.5 h-2.5 rounded-full animate-ping ${
                      isGridlock ? 'bg-[#ba1a1a]' : 'bg-[#006948]'
                    }`}
                  ></span>
                  <span className="text-xs font-bold text-[#131b2e]">
                    {isGridlock
                      ? 'Van PB-08: REROUTING TO DIGESTER #2 • ETA 6 mins'
                      : 'Van PB-08: NH-44 Toll Bypass • Speed: 38 km/h'}
                  </span>
                </div>
                <span className="text-[10px] text-[#3d4a42] font-mono font-bold">
                  31.3260° N, 75.5762° E
                </span>
              </div>

              {/* Driver Companion Turn-by-Turn & Handover */}
              <div className="p-6 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[#904d00] text-lg">navigation</span>
                    <span className="font-headline font-bold text-sm text-[#131b2e]">
                      Driver Companion Portal
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-[#e2e7ff] text-[#3d4a42] text-[10px] font-semibold">
                    Active Session
                  </span>
                </div>

                {/* Turn Instruction */}
                <div className="p-3.5 rounded-xl bg-[#f2f3ff] flex items-center gap-3 border border-[#bccac0]/20">
                  <div
                    className={`w-10 h-10 rounded-lg text-white flex items-center justify-center shrink-0 ${
                      isGridlock ? 'bg-[#ba1a1a]' : 'bg-[#006948]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-2xl">
                      {isGridlock ? 'u_turn_left' : 'turn_right'}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-xs font-bold text-[#131b2e] block truncate">
                      {isGridlock
                        ? 'EMERGENCY: U-Turn at Sector 32 Flyover → CBG Digester'
                        : 'Take Exit 4 towards Shaheed Bhagat Singh Marg'}
                    </span>
                    <span className="text-[11px] text-[#3d4a42]">
                      {isGridlock
                        ? 'Autonomous Failsafe Active: ETA 6 mins to Bio-Gas facility'
                        : 'Continue 650m • Destination on left'}
                    </span>
                  </div>
                </div>

                {/* Signature Pad */}
                <div className="flex flex-col gap-1.5 bg-[#f2f3ff] p-4 rounded-xl border border-[#bccac0]/20">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-[#131b2e]">
                      Recipient Verification Signature
                    </label>
                    <span className="text-[10px] text-[#006948] font-bold">Touch / Stylus Ready</span>
                  </div>

                  <div className="relative w-full h-24 bg-white rounded-lg overflow-hidden cursor-crosshair border border-[#bccac0]/30 shadow-inner">
                    <canvas
                      ref={canvasRef}
                      onMouseDown={startDrawing}
                      onMouseMove={draw}
                      onMouseUp={stopDrawing}
                      onMouseLeave={stopDrawing}
                      onTouchStart={startDrawing}
                      onTouchMove={draw}
                      onTouchEnd={stopDrawing}
                      className="w-full h-full block"
                    />
                    {!hasSignature && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-gray-400 text-xs">
                        Sign digitally to confirm 420-meal tamper-seal unbroken
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <button
                      type="button"
                      onClick={clearCanvas}
                      className="text-xs text-[#3d4a42] hover:text-[#ba1a1a] transition-colors cursor-pointer"
                    >
                      Clear Signature
                    </button>
                    <button
                      type="button"
                      onClick={handleTriggerHandover}
                      className="px-3.5 py-1.5 bg-[#006948] text-white text-xs font-bold rounded-lg shadow-sm hover:bg-[#00855d] transition-all cursor-pointer active:scale-95"
                    >
                      Confirm Dignity Handover
                    </button>
                  </div>
                </div>

                {/* Legal Shield Tag */}
                <div className="flex items-start gap-2 p-2.5 rounded-lg bg-[#eaedff]/60 border border-[#bccac0]/20">
                  <span className="material-symbols-outlined text-[#006948] text-base mt-0.5">
                    verified_user
                  </span>
                  <p className="text-[11px] text-[#3d4a42] leading-tight">
                    <strong>Statutory Good Samaritan Protection:</strong> Both driver and donor
                    indemnified under FSSAI Section 31(C). Consignment passes bio-metric thermal standard.
                  </p>
                </div>
              </div>
            </div>

            {/* Municipal Bio-Gas Circular Safeguard Card */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-[#bccac0]/30 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#904d00] text-xl">compost</span>
                <h3 className="font-headline font-bold text-sm text-[#131b2e]">
                  Automated Bio-Gas Circularity Safeguard
                </h3>
              </div>
              <p className="text-xs text-[#3d4a42] leading-relaxed">
                If GT road congestion or refrigeration failure degrades perishable hot food below 63°C,
                the algorithm revokes humanitarian distribution and triggers an instant autonomous
                reroute to an anaerobic digester.
              </p>
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 rounded-lg bg-[#f2f3ff] flex flex-col border border-[#bccac0]/20">
                  <span className="text-[10px] text-[#3d4a42] uppercase font-bold">Failover Target</span>
                  <span className="text-xs font-bold text-[#131b2e] mt-0.5">Ludhiana CBG Unit #2</span>
                  <span className="text-[10px] text-[#904d00] font-semibold">Capacity 40MT/day</span>
                </div>
                <div className="p-3 rounded-lg bg-[#f2f3ff] flex flex-col border border-[#bccac0]/20">
                  <span className="text-[10px] text-[#3d4a42] uppercase font-bold">Methane Prevention</span>
                  <span className="text-xs font-bold text-[#006948] mt-0.5">100% Zero-Landfill</span>
                  <span className="text-[10px] text-[#3d4a42]">Generates 18 kg Bio-CNG</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Impact & Verification Ledger Strip */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl shadow-sm border border-[#bccac0]/30 flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#85f8c4] text-[#002114] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-2xl">eco</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-[#3d4a42] uppercase font-semibold">Active Rescues Today</span>
              <span className="font-headline font-bold text-xl text-[#006948] font-mono">1,840 kg</span>
              <span className="text-[11px] text-[#3d4a42]">3,680 Meals Preserved</span>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-sm border border-[#bccac0]/30 flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#ffdcc3] text-[#2f1500] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-2xl">nest_clock_farsight_analog</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-[#3d4a42] uppercase font-semibold">Average Rescue SLA</span>
              <span className="font-headline font-bold text-xl text-[#904d00] font-mono">11.4 min</span>
              <span className="text-[11px] text-[#3d4a42]">Well below 25 min limit</span>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-sm border border-[#bccac0]/30 flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#cce5ff] text-[#001d31] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-2xl">co2</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-[#3d4a42] uppercase font-semibold">CO2e Diverted</span>
              <span className="font-headline font-bold text-xl text-[#006194] font-mono">4.62 MT</span>
              <span className="text-[11px] text-[#3d4a42]">Validated via GHG Protocol</span>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-sm border border-[#bccac0]/30 flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#e2e7ff] text-[#131b2e] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-2xl">safety_check</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-[#3d4a42] uppercase font-semibold">Quality Index</span>
              <span className="font-headline font-bold text-xl text-[#131b2e] font-mono">99.8%</span>
              <span className="text-[11px] text-[#006948] font-bold">HACCP Class-A Tier</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
