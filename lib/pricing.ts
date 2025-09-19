export type PackageKey = 'session' | 'mini' | 'grand' | 'maxi';

export const basePricing: Record<PackageKey, number> = {
  session: 25,
  mini: 93,
  grand: 126,
  maxi: 140,
};

export const packageLabels: Record<PackageKey, string> = {
  session: 'Session libre',
  mini: 'Mini Grand Prix',
  grand: 'Grand Prix',
  maxi: 'Maxi Grand Prix',
};

export function computeReservationEstimate({
  packageKey,
  participants,
  restaurant,
}: {
  packageKey: PackageKey;
  participants: {
    adults: number;
    teens: number;
    kids: number;
  };
  restaurant: boolean;
}) {
  const totalParticipants = participants.adults + participants.teens + participants.kids;
  const basePrice = basePricing[packageKey] * totalParticipants;
  const restaurantPrice = restaurant ? totalParticipants * 18 : 0;
  return {
    totalParticipants,
    packagePrice: basePricing[packageKey],
    subtotal: basePrice,
    restaurant: restaurantPrice,
    total: basePrice + restaurantPrice,
  };
}

export function computeGroupQuote({
  participants,
  duration,
  catering,
  meetingRoom,
}: {
  participants: number;
  duration: number;
  catering: boolean;
  meetingRoom: boolean;
}) {
  const baseRatePerParticipant = duration <= 60 ? 75 : 110;
  const trackCost = participants * baseRatePerParticipant;
  const cateringCost = catering ? participants * 32 : 0;
  const meetingRoomCost = meetingRoom ? 180 : 0;
  return {
    trackCost,
    cateringCost,
    meetingRoomCost,
    total: trackCost + cateringCost + meetingRoomCost,
  };
}
