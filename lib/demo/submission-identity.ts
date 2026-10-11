export type SubmissionIdentity = { fingerprint: string; requestId: string };
/** Keep only a digest in the retry ref. Same payload retries share the receiver key. */
export async function submissionIdentity(
  form: FormData,
  previous?: SubmissionIdentity,
  createId: () => string = () => crypto.randomUUID(),
): Promise<SubmissionIdentity> {
  const entries = Array.from(form.entries())
    .filter(([key]) => key !== "requestId")
    .sort(([a], [b]) => a.localeCompare(b));
  const bytes = new TextEncoder().encode(JSON.stringify(entries));
  const hash = await crypto.subtle.digest("SHA-256", bytes);
  const fingerprint = Array.from(new Uint8Array(hash), (byte) =>
    byte.toString(16).padStart(2, "0"),
  ).join("");
  return previous?.fingerprint === fingerprint
    ? previous
    : { fingerprint, requestId: createId() };
}
