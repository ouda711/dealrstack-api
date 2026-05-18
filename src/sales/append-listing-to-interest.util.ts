export function appendListingToInterest(
  interestSummary: string | undefined,
  listingUrl: string | undefined,
  sourceLabel: string,
): string {
  const base = interestSummary?.trim() || `${sourceLabel} marketplace inquiry`;
  const listing = listingUrl?.trim();

  if (!listing) {
    return base;
  }

  if (base.includes(listing)) {
    return base;
  }

  return `${base} · Listing: ${listing}`;
}
