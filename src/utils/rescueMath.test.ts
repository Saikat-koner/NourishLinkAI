import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateBatchSlices,
  calculateDecayWindow,
  validateHaccpTemp,
  calculateEmissionsDiverted,
  calculateMapCoordinatesFromClick,
  validateCensusNode,
  CensusNodeTarget,
} from './rescueMath.ts';

test('calculateBatchSlices accurately distributes meals according to node capacities', () => {
  const nodes: CensusNodeTarget[] = [
    { id: 'nodeA', name: 'Civil Hospital', capacity: 65 },
    { id: 'nodeB', name: 'Railway Flyover', capacity: 85 },
    { id: 'nodeC', name: 'Brick Kiln', capacity: 110 },
  ];

  const result150 = calculateBatchSlices(150, nodes);
  assert.equal(result150.allocations[0].allocated, 65);
  assert.equal(result150.allocations[1].allocated, 85);
  assert.equal(result150.allocations[2].allocated, 0);
  assert.equal(result150.totalAllocated, 150);
  assert.equal(result150.surplusBuffer, 0);
});

test('calculateDecayWindow works for generic food categories', () => {
  const dairyResult = calculateDecayWindow('Dairy / Rich Gravy', 24.2);
  const breadResult = calculateDecayWindow('Baked Grain / Breads', 24.2);
  assert.ok(dairyResult.safeMinutes < breadResult.safeMinutes);
  assert.equal(dairyResult.haccpGrade, 'Class A');
});

test('calculateMapCoordinatesFromClick accurately resolves map clicks to GT Road bounds', () => {
  // Center click (50%, 50%)
  const center = calculateMapCoordinatesFromClick(50, 50);
  assert.ok(center.lat >= 30.85 && center.lat <= 31.39);
  assert.ok(center.lng >= 75.50 && center.lng <= 75.90);
  assert.ok(center.formatted.includes('Lat'));
  assert.ok(center.approxLandmark.includes('Phagwara'));

  // Top-left click (North Jalandhar)
  const northWest = calculateMapCoordinatesFromClick(10, 10);
  assert.ok(northWest.lat > 31.3);
  assert.ok(northWest.approxLandmark.includes('Jalandhar'));
});

test('validateCensusNode catches invalid or incomplete entries', () => {
  const invalid = validateCensusNode({ name: 'A' });
  assert.equal(invalid.valid, false);
  assert.ok(invalid.errors.length >= 2);

  const valid = validateCensusNode({
    name: 'Model Town Labor Camp',
    headcount: 55,
    coordinator: 'Jagjit Singh',
    lat: 31.325,
    lng: 75.578,
  });
  assert.equal(valid.valid, true);
  assert.equal(valid.errors.length, 0);
});
