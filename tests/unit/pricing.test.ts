import { describe, expect, it } from 'vitest';

import { computeGroupQuote, computeReservationEstimate } from '@/lib/pricing';

describe('pricing calculations', () => {
  it('computes reservation estimate with restaurant', () => {
    const result = computeReservationEstimate({
      packageKey: 'grand',
      participants: { adults: 6, teens: 2, kids: 0 },
      restaurant: true,
    });
    expect(result.totalParticipants).toBe(8);
    expect(result.packagePrice).toBe(126);
    expect(result.restaurant).toBe(8 * 18);
  });

  it('computes group quote', () => {
    const quote = computeGroupQuote({
      participants: 20,
      duration: 120,
      catering: true,
      meetingRoom: false,
    });
    expect(quote.trackCost).toBe(20 * 110);
    expect(quote.cateringCost).toBe(20 * 32);
    expect(quote.total).toBe(quote.trackCost + quote.cateringCost);
  });
});
