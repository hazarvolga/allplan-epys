import { z } from "zod";
import { type Limiter, rateKeys } from "./rate-limit";
const required = (maximum: number) =>
  z
    .string()
    .trim()
    .min(2, "Bu alanı en az 2 karakterle doldurun.")
    .max(maximum, `En fazla ${maximum} karakter girin.`);
export const demoSchema = z.object({
  name: required(120),
  email: z.email("Geçerli bir e-posta adresi girin.").max(254),
  company: required(160),
  discipline: required(120),
  software: required(160),
  projectType: required(160),
  topic: required(2000),
  phone: z.string().trim().max(40).optional(),
  consent: z.literal("on", {
    error: "Devam etmek için açık rıza onayı gereklidir.",
  }),
  website: z.string().max(0),
  requestId: z.uuid(),
});
export type DemoState = {
  status: "idle" | "error" | "success";
  message?: string;
  errors?: Record<string, string[]>;
};
export interface DemoConfig {
  webhook?: string;
  token?: string;
  publisher?: string;
  legalReady: boolean;
  rateSecret?: string;
  production: boolean;
  redisUrl?: string;
  redisToken?: string;
}
function validEndpoint(
  value: string | undefined,
  production: boolean,
): boolean {
  try {
    const url = new URL(value ?? "");
    return (
      !url.username &&
      !url.password &&
      (url.protocol === "https:" ||
        (!production &&
          url.protocol === "http:" &&
          ["localhost", "127.0.0.1"].includes(url.hostname)))
    );
  } catch {
    return false;
  }
}
export function isDemoReady(config: DemoConfig): boolean {
  return !!(
    config.token &&
    config.publisher &&
    config.legalReady &&
    config.rateSecret &&
    Buffer.byteLength(config.rateSecret, "utf8") >= 32 &&
    validEndpoint(config.webhook, config.production) &&
    (!config.production ||
      (config.redisToken && validEndpoint(config.redisUrl, true)))
  );
}
export const UNAVAILABLE =
  "Demo talep formu, yayıncı bilgileri ve veri işleme altyapısı tamamlandığında açılacaktır.";
const failure = (message: string): DemoState => ({ status: "error", message });
export async function processDemo(
  input: unknown,
  config: DemoConfig,
  limiter: Limiter,
  ip: string,
  fetcher: typeof fetch = fetch,
): Promise<DemoState> {
  if (!isDemoReady(config)) return failure(UNAVAILABLE);
  const result = demoSchema.safeParse(input);
  if (!result.success)
    return {
      status: "error",
      message: "Lütfen form alanlarını kontrol edin.",
      errors: z.flattenError(result.error).fieldErrors,
    };
  const { requestId } = result.data;
  const data = {
    name: result.data.name,
    email: result.data.email,
    company: result.data.company,
    discipline: result.data.discipline,
    software: result.data.software,
    projectType: result.data.projectType,
    topic: result.data.topic,
    phone: result.data.phone,
    consent: result.data.consent,
  };
  try {
    if (!(await limiter.allow(rateKeys(config.rateSecret!, ip, data.email))))
      return failure(
        "Çok sayıda talep alındı. Lütfen 15 dakika sonra yeniden deneyin.",
      );
    const response = await fetcher(config.webhook!, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.token}`,
        "Content-Type": "application/json",
        "Idempotency-Key": requestId,
      },
      body: JSON.stringify({
        type: "demo.request",
        data: {
          ...data,
          consent: true,
          consentVersion: "demo-consent-v1",
          consentedAt: new Date().toISOString(),
        },
      }),
      signal: AbortSignal.timeout(8000),
      redirect: "error",
      cache: "no-store",
    });
    if (!response.ok)
      return failure(
        "Talebiniz iletilemedi. Lütfen daha sonra yeniden deneyin.",
      );
    return {
      status: "success",
      message:
        "Talebiniz alındı. Paylaştığınız ihtiyaçlara göre sizinle iletişime geçeceğiz.",
    };
  } catch {
    return failure(
      "Talebinizin alındığı doğrulanamadı. Lütfen daha sonra yeniden deneyin.",
    );
  }
}
