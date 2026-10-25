/**
 * Pure calculation utilities for NourishLink AI
 * Covers dynamic batch slicing, microbial decay window estimation,
 * HACCP safety validation, carbon diversion metrics, and geo-coordinate resolution.
 */

export interface CensusNodeTarget {
  id: string;
  name: string;
  capacity: number;
}

export interface BatchSliceResult {
  allocations: { nodeId: string; nodeName: string; allocated: number; remainingNeeded: number }[];
  totalAllocated: number;
  surplusBuffer: number;
  coverageStatus: 'partial' | 'optimal' | 'buffer';
  coverageStatusText: string;
}

export function calculateBatchSlices(
  batchCount: number,
  nodes: CensusNodeTarget[]
): BatchSliceResult {
  let remaining = Math.max(0, batchCount);
  const allocations = nodes.map(node => {
    const allocated = Math.min(remaining, node.capacity);
    remaining -= allocated;
    return {
      nodeId: node.id,
      nodeName: node.name,
      allocated,
      remainingNeeded: node.capacity - allocated,
    };
  });

  const totalAllocated = allocations.reduce((acc, curr) => acc + curr.allocated, 0);
  const totalCapacity = nodes.reduce((acc, curr) => acc + curr.capacity, 0);

  let coverageStatus: 'partial' | 'optimal' | 'buffer' = 'partial';
  let coverageStatusText = 'Partial Allocation Mode';

  if (remaining > 0) {
    coverageStatus = 'buffer';
    coverageStatusText = `Surplus Buffer: +${remaining} meals routed to secondary cold lockers`;
  } else if (batchCount >= totalCapacity) {
    coverageStatus = 'optimal';
    coverageStatusText = '100% Satisfied - Optimal Node Coverage';
  } else if (batchCount >= 100) {
    coverageStatus = 'optimal';
    coverageStatusText = 'Optimal Priority Coverage';
  }

  return {
    allocations,
    totalAllocated,
    surplusBuffer: remaining,
    coverageStatus,
    coverageStatusText,
  };
}

export interface DecayPhysicsResult {
  safeMinutes: number;
  formattedTime: string;
  haccpGrade: 'Class A' | 'Class B' | 'Critical Warning';
  bacterialDoublingMinutes: number;
  spoilageProbability: number;
}

export function calculateDecayWindow(
  foodCategory: string,
  ambientTempC: number = 24.2
): DecayPhysicsResult {
  // Base safe duration in minutes for properly hot-held food (65°C+)
  let baseMinutes = 210; // ~3.5 hours

  const lowerCat = foodCategory.toLowerCase();
  if (lowerCat.includes('bread') || lowerCat.includes('roti') || lowerCat.includes('baked')) {
    baseMinutes = 245; // lower moisture, longer safety margin
  } else if (lowerCat.includes('dairy') || lowerCat.includes('paneer') || lowerCat.includes('rich')) {
    baseMinutes = 180; // rich dairy base, faster spoilage propensity
  } else if (lowerCat.includes('rice') || lowerCat.includes('steamed')) {
    baseMinutes = 210; // B. cereus risk curve
  } else if (lowerCat.includes('legume') || lowerCat.includes('gravy') || lowerCat.includes('curry')) {
    baseMinutes = 208;
  } else if (lowerCat.includes('sweet') || lowerCat.includes('dessert')) {
    baseMinutes = 195;
  }

  // Temperature penalty if ambient is high (Arrhenius approximation)
  const tempExcess = Math.max(0, ambientTempC - 20);
  const adjustedMinutes = Math.max(20, Math.round(baseMinutes - tempExcess * 2.5));

  const hours = Math.floor(adjustedMinutes / 60);
  const mins = adjustedMinutes % 60;
  const formattedTime = `0${hours}:${mins < 10 ? '0' : ''}${mins}:00`;

  const bacterialDoublingMinutes = Math.round(110 + (baseMinutes - adjustedMinutes) * 0.4);
  const spoilageProbability = adjustedMinutes > 60 ? 0.015 : 0.85;

  return {
    safeMinutes: adjustedMinutes,
    formattedTime,
    haccpGrade: adjustedMinutes > 120 ? 'Class A' : (adjustedMinutes > 45 ? 'Class B' : 'Critical Warning'),
    bacterialDoublingMinutes,
    spoilageProbability,
  };
}

export function validateHaccpTemp(
  tempC: number,
  category: 'hot' | 'cold' = 'hot'
): {
  compliant: boolean;
  statusLabel: string;
  actionRequired: 'deliver' | 'biogas';
  failoverTarget?: string;
} {
  if (category === 'hot') {
    if (tempC >= 63.0) {
      return {
        compliant: true,
        statusLabel: 'Hot Meals (HACCP Safe >63°)',
        actionRequired: 'deliver',
      };
    } else {
      return {
        compliant: false,
        statusLabel: 'DANGER: Below Safe HACCP Threshold (63°C)',
        actionRequired: 'biogas',
        failoverTarget: 'Ludhiana Municipal CBG Digester Unit #2',
      };
    }
  } else {
    if (tempC <= 4.0) {
      return {
        compliant: true,
        statusLabel: 'Chilled Target: ≤4.0°C OK',
        actionRequired: 'deliver',
      };
    } else {
      return {
        compliant: false,
        statusLabel: 'EXCEEDED: Chilled Threshold >4°C',
        actionRequired: 'biogas',
        failoverTarget: 'Ludhiana Municipal CBG Digester Unit #2',
      };
    }
  }
}

export function calculateEmissionsDiverted(mealCount: number) {
  const divertedKg = Math.round(mealCount * 0.35 * 10) / 10;
  const co2eKg = Math.round(divertedKg * 2.5 * 10) / 10;
  const methaneAvoidedKg = Math.round(divertedKg * 0.12 * 10) / 10;
  const biogasEquivalentKwh = Math.round(divertedKg * 0.48 * 10) / 10;

  return {
    divertedKg,
    co2eKg,
    methaneAvoidedKg,
    biogasEquivalentKwh,
  };
}

/**
 * Calculates geographical latitude & longitude from interactive map click percentage (0-100%)
 * bounding the Jalandhar-Phagwara-Ludhiana GT Road Corridor.
 */
export function calculateMapCoordinatesFromClick(xPercent: number, yPercent: number): {
  lat: number;
  lng: number;
  formatted: string;
  approxLandmark: string;
} {
  // Lat bounds: 31.39 (North, Jalandhar) to 30.85 (South, Ludhiana)
  // Lng bounds: 75.50 (West) to 75.90 (East)
  const clampedX = Math.max(0, Math.min(100, xPercent));
  const clampedY = Math.max(0, Math.min(100, yPercent));

  const lat = parseFloat((31.39 - (clampedY / 100) * 0.54).toFixed(4));
  const lng = parseFloat((75.50 + (clampedX / 100) * 0.40).toFixed(4));

  let approxLandmark = 'GT Road Transit Corridor';
  if (clampedY < 35 && clampedX < 45) {
    approxLandmark = 'Jalandhar City Urban Sector';
  } else if (clampedY >= 35 && clampedY <= 65) {
    approxLandmark = 'Phagwara Bypass & Industrial Node';
  } else if (clampedY > 65) {
    approxLandmark = 'Ludhiana Metro Industrial Belt';
  }

  return {
    lat,
    lng,
    formatted: `Lat ${lat.toFixed(4)}° N, Lon ${lng.toFixed(4)}° E`,
    approxLandmark,
  };
}

/**
 * Validates census node input before adding to the active registry
 */
export function validateCensusNode(data: {
  name?: string;
  headcount?: number;
  coordinator?: string;
  lat?: number;
  lng?: number;
}): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!data.name || data.name.trim().length < 3) {
    errors.push('Shelter or node name must be at least 3 characters.');
  }

  if (!data.headcount || data.headcount < 1) {
    errors.push('Headcount must be at least 1 person.');
  }

  if (!data.coordinator || data.coordinator.trim().length < 2) {
    errors.push('Coordinator or scout contact is required.');
  }

  if (typeof data.lat !== 'number' || typeof data.lng !== 'number') {
    errors.push('Valid location coordinates (GPS or map click) must be assigned.');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
