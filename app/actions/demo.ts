"use server";
import { headers } from "next/headers";
import { type DemoState, processDemo } from "@/lib/demo/service";
import { getDemoConfig } from "@/lib/demo/config";
import {
  MemoryLimiter,
  RedisLimiter,
  trustedAddress,
} from "@/lib/demo/rate-limit";
const developmentLimiter = new MemoryLimiter();
export async function submitDemo(
  _previous: DemoState,
  form: FormData,
): Promise<DemoState> {
  const config = getDemoConfig();
  const limiter =
    config.redisUrl && config.redisToken
      ? new RedisLimiter(config.redisUrl, config.redisToken)
      : developmentLimiter;
  return processDemo(
    Object.fromEntries(form),
    config,
    limiter,
    trustedAddress(await headers(), process.env.DEMO_TRUST_PROXY),
  );
}
