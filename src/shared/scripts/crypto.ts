let S: any | null = null;

async function getSodium(): Promise<any> {
  if (S) return S;
  const mod = await import('libsodium-wrappers');
  S = (mod as any).default ?? (mod as any);
  await S.ready;
  return S;
}

let cached: { keyId: string; publicKeyB64: string } | null = null;
const RAW_BACKEND_URL = import.meta.env.VITE_API_URL as string;
const BACKEND_URL = RAW_BACKEND_URL?.endsWith('/') ? RAW_BACKEND_URL : `${RAW_BACKEND_URL}/`;

export async function getServerPublicKey(): Promise<{ keyId: string; publicKeyB64: string }> {
  if (cached) return cached;
  const res = await fetch(`${BACKEND_URL}crypto/public-key`);
  const json = await res.json();
  cached = { keyId: json.keyId, publicKeyB64: String(json.publicKey).trim() };
  return cached;
}

export async function encryptForServer(payload: unknown, serverPublicKeyB64: string): Promise<string> {
  const s = await getSodium();
  const pk = s.from_base64(String(serverPublicKeyB64).trim(), s.base64_variants.URLSAFE_NO_PADDING);
  if (pk.length !== 32) throw new Error(`Server public key has wrong size: ${pk.length}`);
  const msg = new TextEncoder().encode(JSON.stringify(payload));
  const sealed = s.crypto_box_seal(msg, pk);
  return s.to_base64(sealed, s.base64_variants.URLSAFE_NO_PADDING);
}
