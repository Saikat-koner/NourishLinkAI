import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';

export interface VehicleTelemetry {
  id: string;
  code: string;
  driver: string;
  avatar: string;
  routeTitle: string;
  payloadPercent: number;
  temperature: number;
  tempType: 'hot' | 'chilled';
  speedKmH: number;
  status: 'En Route' | 'Delivering' | 'Picking Up' | 'Bio-Gas Divert';
  etaMins: number;
  currentLat: number;
  currentLng: number;
  waypoints: [number, number][];
  currentWaypointIdx: number;
  segmentProgress: number; // 0 to 1
}

interface CorridorSpatialMapProps {
  isGridlock?: boolean;
  onVehicleSelect?: (vehicle: VehicleTelemetry) => void;
  className?: string;
}

// Punjab GT Road Corridor Waypoints (NH-44 Corridor: Jalandhar -> Phagwara -> Ludhiana)
const GT_ROAD_CORRIDOR: [number, number][] = [
  [31.3260, 75.5762], // Jalandhar Cantt / GT Road
  [31.2850, 75.6420], // Chaheru
  [31.2240, 75.7709], // Phagwara Central
  [31.1820, 75.8150], // Phagwara South
  [31.1270, 75.8550], // Goraya
  [31.0250, 75.8450], // Phillaur Sutlej River Crossing
  [30.9450, 75.8520], // Ludhiana Bypass
  [30.9010, 75.8573], // Ludhiana Industrial Hub
];

const FEEDER_ROUTE_JALANDHAR: [number, number][] = [
  [31.3260, 75.5762],
  [31.3500, 75.5800],
  [31.3650, 75.5900], // Banquet Belt
];

const FEEDER_ROUTE_LUDHIANA: [number, number][] = [
  [30.9010, 75.8573],
  [30.8920, 75.8300],
  [30.8750, 75.8150], // Municipal CBG Digester #2
];

const HUBS = [
  { id: 'jal-1', name: 'Jalandhar Banquet Cluster', coords: [31.3260, 75.5762] as [number, number], type: 'surplus' },
  { id: 'phag-1', name: 'Phagwara Cold Hub', coords: [31.2240, 75.7709] as [number, number], type: 'transit' },
  { id: 'lud-1', name: 'Ludhiana Distribution Haven', coords: [30.9010, 75.8573] as [number, number], type: 'demand' },
  { id: 'cbg-1', name: 'Municipal CBG Bio-Gas Digester #2', coords: [30.8750, 75.8150] as [number, number], type: 'biogas' },
  { id: 'chaheru-1', name: 'Chaheru Rural Census Camp', coords: [31.2850, 75.6420] as [number, number], type: 'census' },
];

export const CorridorSpatialMap: React.FC<CorridorSpatialMapProps> = ({
  isGridlock = false,
  onVehicleSelect,
  className = '',
}) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<{ [key: string]: L.Marker }>({});
  const polylineCorridorRef = useRef<L.Polyline | null>(null);
  const polylineGlowRef = useRef<L.Polyline | null>(null);
  const polylineDivertRef = useRef<L.Polyline | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);

  const [activeTileType, setActiveTileType] = useState<'isro' | 'satellite' | 'street'>('isro');
  const [selectedVehicleId, setSelectedVehicleId] = useState<string>('NL-654');
  const [isLiveTelemetryRunning, setIsLiveTelemetryRunning] = useState<boolean>(true);

  // Initial fleet state matching user reference screenshot
  const [vehicles, setVehicles] = useState<VehicleTelemetry[]>([
    {
      id: 'NL-654',
      code: 'NL-654',
      driver: 'Gurpreet Singh',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
      routeTitle: 'Near Ludhiana',
      payloadPercent: 78,
      temperature: 1.9,
      tempType: 'chilled',
      speedKmH: 38,
      status: 'En Route',
      etaMins: 12,
      currentLat: 30.9650,
      currentLng: 75.8500,
      waypoints: GT_ROAD_CORRIDOR,
      currentWaypointIdx: 5,
      segmentProgress: 0.35,
    },
    {
      id: 'NL-4050',
      code: 'NL-4050',
      driver: 'Manjit Kaur',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80',
      routeTitle: 'GT Jalandhar North',
      payloadPercent: 26,
      temperature: 2.1,
      tempType: 'chilled',
      speedKmH: 42,
      status: 'En Route',
      etaMins: 18,
      currentLat: 31.3120,
      currentLng: 75.6020,
      waypoints: GT_ROAD_CORRIDOR,
      currentWaypointIdx: 0,
      segmentProgress: 0.65,
    },
    {
      id: 'NL-472',
      code: 'NL-472',
      driver: 'Harjit Randhawa',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
      routeTitle: 'Phagwara Bypass',
      payloadPercent: 16,
      temperature: 1.9,
      tempType: 'chilled',
      speedKmH: 45,
      status: 'En Route',
      etaMins: 7,
      currentLat: 31.1980,
      currentLng: 75.7950,
      waypoints: GT_ROAD_CORRIDOR,
      currentWaypointIdx: 2,
      segmentProgress: 0.45,
    },
    {
      id: 'NL-884',
      code: 'NL-884',
      driver: 'Mandeep Gill',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
      routeTitle: 'Goraya Corridor',
      payloadPercent: 78,
      temperature: 1.9,
      tempType: 'chilled',
      speedKmH: 36,
      status: 'En Route',
      etaMins: 24,
      currentLat: 31.1450,
      currentLng: 75.8420,
      waypoints: GT_ROAD_CORRIDOR,
      currentWaypointIdx: 3,
      segmentProgress: 0.55,
    },
    {
      id: 'NL-102',
      code: 'NL-102',
      driver: 'Simranjit Virdi',
      avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=120&q=80',
      routeTitle: 'Sutlej River Link',
      payloadPercent: 54,
      temperature: 2.0,
      tempType: 'chilled',
      speedKmH: 40,
      status: 'En Route',
      etaMins: 15,
      currentLat: 31.0550,
      currentLng: 75.8480,
      waypoints: GT_ROAD_CORRIDOR,
      currentWaypointIdx: 4,
      segmentProgress: 0.7,
    },
  ]);

  // Helper to get tile URL (including official ISRO Bhuvan Real Map Geospatial layer)
  const getTileUrl = (type: 'isro' | 'satellite' | 'street') => {
    if (type === 'isro') {
      // Official Open Real Geospatial Layer for India with ISRO Bhuvan alignment
      return 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
    }
    if (type === 'satellite') {
      return 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
    }
    return 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';
  };

  // Helper to build custom HTML div icon for a vehicle
  const createVehicleDivIcon = (v: VehicleTelemetry, isSelected: boolean) => {
    return L.divIcon({
      className: 'custom-div-icon',
      html: `
        <div class="relative group cursor-pointer flex items-center select-none" style="transform: translate(-50%, -50%);">
          <!-- Outer Pulsing Glow -->
          <div class="absolute -inset-1.5 rounded-full ${isSelected ? 'bg-emerald-400/80 animate-ping' : 'bg-amber-400/40 animate-pulse'}"></div>
          
          <!-- Vehicle Icon Pin -->
          <div class="relative w-7 h-7 rounded-lg ${isSelected ? 'bg-emerald-500 ring-2 ring-white shadow-emerald-500/50' : 'bg-amber-500 shadow-amber-500/50'} text-white shadow-lg flex items-center justify-center transition-transform hover:scale-110">
            <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
            </svg>
          </div>

          <!-- Real-Time Floating Badge (matching screenshot: "NL-4050 26% 2.1°C") -->
          <div class="ml-1.5 px-2 py-0.5 rounded bg-black/85 backdrop-blur-md text-white border ${isSelected ? 'border-emerald-400 ring-1 ring-emerald-400/50' : 'border-white/20'} shadow-md flex items-center gap-1.5 font-mono text-[10px] whitespace-nowrap">
            <span class="font-bold text-amber-300 tracking-tight">${v.code}</span>
            <span class="text-white/90">${v.payloadPercent}%</span>
            <span class="${v.temperature > 5 ? 'text-red-400' : 'text-emerald-300'} font-semibold">${v.temperature.toFixed(1)}°C</span>
          </div>
        </div>
      `,
      iconSize: [110, 32],
      iconAnchor: [16, 16],
    });
  };

  // Helper for Hub markers
  const createHubDivIcon = (name: string, type: string) => {
    const isBiogas = type === 'biogas';
    return L.divIcon({
      className: 'custom-div-icon',
      html: `
        <div class="relative flex flex-col items-center cursor-pointer select-none" style="transform: translate(-50%, -50%);">
          <!-- Outer Pulsing Ring -->
          <div class="absolute w-9 h-9 rounded-full ${isBiogas ? 'bg-red-500/30' : 'bg-amber-400/30'} animate-ping"></div>
          <div class="w-6 h-6 rounded-full ${isBiogas ? 'bg-red-600 border-2 border-white' : 'bg-amber-500 border-2 border-white'} text-white shadow-md flex items-center justify-center text-[10px] font-bold">
            ${isBiogas ? '⚡' : '●'}
          </div>
          <div class="mt-1 px-1.5 py-0.5 bg-black/80 backdrop-blur-xs rounded text-[9px] font-bold text-white shadow whitespace-nowrap border border-white/20">
            ${name}
          </div>
        </div>
      `,
      iconSize: [24, 24],
      iconAnchor: [12, 12],
    });
  };

  // Initialize Moveable Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    // Center between Jalandhar and Ludhiana (near Phagwara)
    const map = L.map(mapContainerRef.current, {
      center: [31.15, 75.72],
      zoom: 11,
      minZoom: 9,
      maxZoom: 18,
      zoomControl: false, // We render custom stylish controls
      attributionControl: false,
    });

    mapInstanceRef.current = map;

    // Add Tile Layer
    const tileLayer = L.tileLayer(getTileUrl(activeTileType), {
      maxZoom: 19,
      crossOrigin: true,
    }).addTo(map);
    tileLayerRef.current = tileLayer;

    // Primary GT Road Highway Polyline Corridor with Cyan/Emerald Glow (matching screenshot)
    const glowLine = L.polyline(GT_ROAD_CORRIDOR, {
      color: '#00e599',
      weight: 8,
      opacity: 0.45,
      lineCap: 'round',
      lineJoin: 'round',
    }).addTo(map);
    polylineGlowRef.current = glowLine;

    const mainLine = L.polyline(GT_ROAD_CORRIDOR, {
      color: '#00e599',
      weight: 4,
      opacity: 0.95,
      dashArray: undefined,
      lineCap: 'round',
      lineJoin: 'round',
    }).addTo(map);
    polylineCorridorRef.current = mainLine;

    // Feeder lines
    L.polyline(FEEDER_ROUTE_JALANDHAR, {
      color: '#00e599',
      weight: 3,
      opacity: 0.7,
      dashArray: '4, 4',
    }).addTo(map);

    // Feeder radial thin lines connecting rural nodes to GT road (like in the user screenshot)
    const radialConnections = [
      [[31.2850, 75.6420], [31.3200, 75.6800]],
      [[31.2240, 75.7709], [31.2500, 75.8200]],
      [[31.1820, 75.8150], [31.1500, 75.7600]],
      [[31.0250, 75.8450], [31.0600, 75.9000]],
    ];
    radialConnections.forEach((pts) => {
      L.polyline(pts as [number, number][], {
        color: '#ffb77d',
        weight: 1.5,
        opacity: 0.4,
        dashArray: '3, 6',
      }).addTo(map);
    });

    // Add Hub markers
    HUBS.forEach((hub) => {
      const marker = L.marker(hub.coords, {
        icon: createHubDivIcon(hub.name, hub.type),
      }).addTo(map);
      marker.bindPopup(`
        <div style="font-family: inherit; font-size: 12px; color: #131b2e; padding: 4px;">
          <strong>${hub.name}</strong><br/>
          <span style="color: #666;">Type: ${hub.type.toUpperCase()}</span><br/>
          <span style="font-family: monospace; font-size: 10px;">${hub.coords[0].toFixed(4)}° N, ${hub.coords[1].toFixed(4)}° E</span>
        </div>
      `);
    });

    // Add Vehicle markers
    vehicles.forEach((v) => {
      const marker = L.marker([v.currentLat, v.currentLng], {
        icon: createVehicleDivIcon(v, v.id === selectedVehicleId),
        zIndexOffset: v.id === selectedVehicleId ? 1000 : 500,
      }).addTo(map);

      marker.on('click', () => {
        handleSelectVehicle(v);
      });

      markersRef.current[v.id] = marker;
    });

    // Invalidate size after layout mounts to ensure full tiles render
    setTimeout(() => {
      map.invalidateSize();
    }, 250);

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update Tile Layer if user switches between Satellite and Street
  useEffect(() => {
    if (!tileLayerRef.current || !mapInstanceRef.current) return;
    tileLayerRef.current.setUrl(getTileUrl(activeTileType));
  }, [activeTileType]);

  // Update Divert Line when isGridlock changes
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    if (isGridlock) {
      if (!polylineDivertRef.current) {
        polylineDivertRef.current = L.polyline(FEEDER_ROUTE_LUDHIANA, {
          color: '#ba1a1a',
          weight: 5,
          opacity: 0.9,
          dashArray: '6, 6',
        }).addTo(mapInstanceRef.current);
      }
    } else {
      if (polylineDivertRef.current) {
        polylineDivertRef.current.remove();
        polylineDivertRef.current = null;
      }
    }
  }, [isGridlock]);

  // Handle vehicle selection
  const handleSelectVehicle = (v: VehicleTelemetry) => {
    setSelectedVehicleId(v.id);
    if (onVehicleSelect) onVehicleSelect(v);

    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([v.currentLat, v.currentLng], 13, {
        duration: 1.2,
      });
    }

    // Refresh markers icons for selection highlight
    Object.keys(markersRef.current).forEach((vid) => {
      const targetVehicle = vehicles.find((x) => x.id === vid);
      if (targetVehicle && markersRef.current[vid]) {
        markersRef.current[vid].setIcon(createVehicleDivIcon(targetVehicle, vid === v.id));
        markersRef.current[vid].setZIndexOffset(vid === v.id ? 1000 : 500);
      }
    });
  };

  // Live Telemetry Movement Engine: moves vehicles along the GT Road corridor
  useEffect(() => {
    if (!isLiveTelemetryRunning) return;

    const interval = setInterval(() => {
      setVehicles((prev) =>
        prev.map((v) => {
          const wps = v.waypoints;
          if (wps.length < 2) return v;

          // Advance segment progress
          let newProgress = v.segmentProgress + 0.035;
          let newWaypointIdx = v.currentWaypointIdx;

          if (newProgress >= 1) {
            newProgress = 0;
            newWaypointIdx = (newWaypointIdx + 1) % (wps.length - 1);
          }

          const p1 = wps[newWaypointIdx];
          const p2 = wps[newWaypointIdx + 1];

          // Linear interpolation between waypoints
          const newLat = p1[0] + (p2[0] - p1[0]) * newProgress;
          const newLng = p1[1] + (p2[1] - p1[1]) * newProgress;

          // Minor realistic telemetry fluctuations
          const tempDelta = (Math.random() - 0.5) * 0.1;
          const newTemp = Math.max(1.4, Math.min(2.8, v.temperature + tempDelta));
          const speedDelta = Math.floor((Math.random() - 0.5) * 4);
          const newSpeed = Math.max(25, Math.min(55, v.speedKmH + speedDelta));

          const updatedVehicle: VehicleTelemetry = {
            ...v,
            currentLat: newLat,
            currentLng: newLng,
            segmentProgress: newProgress,
            currentWaypointIdx: newWaypointIdx,
            temperature: newTemp,
            speedKmH: newSpeed,
          };

          // Update marker position and custom DivIcon in Leaflet map
          const marker = markersRef.current[v.id];
          if (marker) {
            marker.setLatLng([newLat, newLng]);
            marker.setIcon(createVehicleDivIcon(updatedVehicle, v.id === selectedVehicleId));
          }

          return updatedVehicle;
        })
      );
    }, 2000);

    return () => clearInterval(interval);
  }, [isLiveTelemetryRunning, selectedVehicleId]);

  // Map Navigation Actions
  const handleZoomIn = () => {
    mapInstanceRef.current?.zoomIn();
  };

  const handleZoomOut = () => {
    mapInstanceRef.current?.zoomOut();
  };

  const handleResetCorridorView = () => {
    mapInstanceRef.current?.flyTo([31.15, 75.72], 11, { duration: 1.0 });
  };

  const activeVehicle = vehicles.find((v) => v.id === selectedVehicleId) || vehicles[0];

  return (
    <div className={`bg-white rounded-2xl overflow-hidden shadow-lg border border-[#bccac0]/30 flex flex-col ${className}`}>
      {/* Component Header matching user screenshot */}
      <div className="p-3.5 px-4 flex items-center justify-between bg-[#eaedff] border-b border-[#bccac0]/25">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-lg bg-[#006948] text-white flex items-center justify-center">
            <span className="material-symbols-outlined text-lg">satellite_alt</span>
          </span>
          <div>
            <h2 className="font-headline font-bold text-sm lg:text-base text-[#131b2e] leading-none">
              Live Corridor Spatial Tracking
            </h2>
            <span className="text-[11px] text-[#3d4a42]">
              Interactive Moveable Slippy Map · GT Road Punjab NH-44
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-md bg-[#002114] text-[#85f8c4] font-mono text-xs font-bold tracking-wider">
            CVRPTW MESH #4
          </span>
        </div>
      </div>

      {/* Main Interactive Map & Telemetry Stage */}
      <div className="relative w-full h-[440px] md:h-[480px] bg-slate-900 overflow-hidden">
        {/* Leaflet Map Div */}
        <div ref={mapContainerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

        {/* Left Floating Driver Telemetry Stack (matching screenshot) */}
        <div className="absolute top-3 left-3 z-[1000] w-64 md:w-72 max-h-[calc(100%-24px)] flex flex-col gap-2 overflow-y-auto pr-1 pointer-events-auto">
          {vehicles.map((v) => {
            const isSelected = v.id === selectedVehicleId;
            return (
              <div
                key={v.id}
                onClick={() => handleSelectVehicle(v)}
                className={`p-2.5 rounded-xl backdrop-blur-md cursor-pointer transition-all border ${
                  isSelected
                    ? 'bg-black/85 text-white border-emerald-400 ring-2 ring-emerald-400/40 shadow-xl'
                    : 'bg-black/60 text-white/90 border-white/20 hover:bg-black/75 shadow-md'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 min-w-0">
                    <img
                      src={v.avatar}
                      alt={v.driver}
                      className="w-8 h-8 rounded-full object-cover border border-white/30 shrink-0"
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-emerald-300 font-mono">
                          {v.code}
                        </span>
                        <span className="text-[11px] text-white/80 truncate">
                          {v.routeTitle}
                        </span>
                      </div>
                      <span className="text-[10px] text-white/60 block truncate">
                        Driver: {v.driver}
                      </span>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-[9px] uppercase tracking-wider text-white/60 block font-bold">
                      ETA
                    </span>
                    <span className="text-[11px] font-bold text-amber-300 font-mono">
                      {v.etaMins}m
                    </span>
                  </div>
                </div>

                {/* Expanded active metrics strip */}
                {isSelected && (
                  <div className="mt-2 pt-2 border-t border-white/15 space-y-1.5">
                    <div className="flex items-center justify-between text-[11px] font-mono">
                      <span className="text-emerald-300 font-semibold">{v.status}</span>
                      <span className="text-white/80">{v.payloadPercent}% Full</span>
                      <span className="text-amber-300">Temp {v.temperature.toFixed(1)}°C</span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-emerald-400 h-full rounded-full transition-all duration-500"
                        style={{ width: `${Math.round(v.segmentProgress * 100)}%` }}
                      ></div>
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-white/70 pt-0.5">
                      <span>Speed: {v.speedKmH} km/h</span>
                      <span className="text-emerald-400 font-semibold">● Live Telemetry</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* ISRO Bhuvan Real Map Verification Badge */}
        {activeTileType === 'isro' && (
          <div className="absolute top-3 left-1/2 -translate-x-1/2 z-[1000] bg-black/85 backdrop-blur-md px-3.5 py-1 rounded-full border border-emerald-400 text-[10px] font-bold text-white shadow-xl pointer-events-none flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="text-emerald-300">🇮🇳 ISRO Bhuvan Verified Real Map</span>
            <span className="text-white/40">|</span>
            <span className="text-amber-300 font-mono">NRSC Dept. of Space Govt of India</span>
          </div>
        )}

        {/* Top-Right Floating Controls Bar (Moveable zoom, 3D reset, Layer toggle) */}
        <div className="absolute top-3 right-3 z-[1000] flex flex-col gap-1.5 pointer-events-auto">
          {/* Zoom In */}
          <button
            type="button"
            onClick={handleZoomIn}
            title="Zoom In (Moveable map)"
            className="w-8 h-8 rounded-lg bg-black/80 hover:bg-black text-white flex items-center justify-center shadow-md border border-white/20 cursor-pointer active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-lg">add</span>
          </button>

          {/* Zoom Out */}
          <button
            type="button"
            onClick={handleZoomOut}
            title="Zoom Out (Moveable map)"
            className="w-8 h-8 rounded-lg bg-black/80 hover:bg-black text-white flex items-center justify-center shadow-md border border-white/20 cursor-pointer active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-lg">remove</span>
          </button>

          {/* Layer Switcher (ISRO Real Map vs Satellite vs Street) */}
          <button
            type="button"
            onClick={() => {
              if (activeTileType === 'isro') setActiveTileType('satellite');
              else if (activeTileType === 'satellite') setActiveTileType('street');
              else setActiveTileType('isro');
            }}
            title={`Active: ${activeTileType === 'isro' ? 'ISRO Bhuvan Real Map' : activeTileType === 'satellite' ? 'Satellite' : 'Street'} (Click to cycle)`}
            className={`w-8 h-8 rounded-lg flex items-center justify-center shadow-md border cursor-pointer active:scale-95 transition-all ${
              activeTileType === 'isro'
                ? 'bg-emerald-600 text-white border-emerald-300 ring-2 ring-emerald-300/60 shadow-emerald-600/40'
                : 'bg-black/80 hover:bg-black text-white border-white/20'
            }`}
          >
            <span className="material-symbols-outlined text-base">
              {activeTileType === 'isro' ? 'verified' : activeTileType === 'satellite' ? 'satellite' : 'map'}
            </span>
          </button>

          {/* Recenter Full Corridor */}
          <button
            type="button"
            onClick={handleResetCorridorView}
            title="Recenter Punjab GT Road Corridor"
            className="w-8 h-8 rounded-lg bg-black/80 hover:bg-black text-emerald-400 flex items-center justify-center shadow-md border border-white/20 cursor-pointer active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-base">center_focus_strong</span>
          </button>

          {/* Telemetry Pause/Resume */}
          <button
            type="button"
            onClick={() => setIsLiveTelemetryRunning(!isLiveTelemetryRunning)}
            title={isLiveTelemetryRunning ? 'Pause Real Telemetry Feed' : 'Resume Telemetry Feed'}
            className="w-8 h-8 rounded-lg bg-black/80 hover:bg-black text-amber-300 flex items-center justify-center shadow-md border border-white/20 cursor-pointer active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-base">
              {isLiveTelemetryRunning ? 'pause' : 'play_arrow'}
            </span>
          </button>
        </div>

        {/* Bottom Map Status Strip */}
        <div className="absolute bottom-3 right-3 left-3 md:left-80 z-[1000] pointer-events-auto flex flex-wrap items-center justify-between gap-2 bg-black/80 backdrop-blur-md p-2 px-3 rounded-xl border border-white/20 text-xs text-white">
          <div className="flex items-center gap-2">
            <span
              className={`w-2 h-2 rounded-full ${
                isGridlock ? 'bg-red-500 animate-ping' : 'bg-emerald-400 animate-pulse'
              }`}
            ></span>
            <span className="font-bold">
              {isGridlock
                ? 'EMERGENCY REROUTE: GT Road Gridlock → Bio-Gas Digester #2'
                : `Tracking ${vehicles.length} Active Cold-Chain Vehicles on NH-44`}
            </span>
          </div>

          <div className="flex items-center gap-3 font-mono text-[11px] text-white/80">
            <span>
              Target: <strong className="text-amber-300">{activeVehicle.code}</strong> (
              {activeVehicle.currentLat.toFixed(3)}°N, {activeVehicle.currentLng.toFixed(3)}°E)
            </span>
            <span className="hidden sm:inline text-white/40">|</span>
            <span className="hidden sm:inline text-emerald-300">
              Drag to move · Scroll to zoom
            </span>
          </div>
        </div>
      </div>

      {/* Corridor Legend & Live Status Strip */}
      <div className="p-3 bg-[#f2f3ff] border-t border-[#bccac0]/25 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-1.5 font-bold text-[#131b2e]">
            <span className="w-3 h-1.5 rounded-full bg-[#00e599]"></span>
            <span>NH-44 Super Corridor</span>
          </div>
          <div className="flex items-center gap-1.5 text-[#3d4a42]">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
            <span>Strategic Hubs</span>
          </div>
          <div className="flex items-center gap-1.5 text-[#3d4a42]">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600"></span>
            <span>CBG Bio-Gas Plant</span>
          </div>
          <div className="flex items-center gap-1.5 text-[#3d4a42]">
            <span className="w-3 h-0.5 border-t border-dashed border-[#ffb77d]"></span>
            <span>Rural Feeder Spoke</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded bg-emerald-100 text-[#006948] font-bold text-[11px] flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#006948] animate-ping"></span>
            GNSS Satellite Lock (±3.2m)
          </span>
          <span className="text-[11px] text-[#3d4a42] font-mono">
            HACCP Hash: 0x8F4A..71E
          </span>
        </div>
      </div>
    </div>
  );
};
