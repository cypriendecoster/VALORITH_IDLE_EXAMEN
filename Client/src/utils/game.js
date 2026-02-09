export function getActiveRealmId(data) {
  return data?.player?.realms?.find((r) => r.is_active === 1)?.realm_id ??
    data?.player?.realms?.[0]?.realm_id ??
    null;
}

export function getActiveRealmName(data) {
  const activeRealmId = getActiveRealmId(data);
  const activeRealm = data?.realms?.find((r) => r.id === activeRealmId);
  return activeRealm ? activeRealm.name : null;
}
