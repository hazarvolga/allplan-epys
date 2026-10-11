import { existsSync } from "node:fs";
import { loadEnvFile } from "node:process";
export function loadBuildEnv() {
  for (const file of [
    ".env.production.local",
    ".env.local",
    ".env.production",
    ".env",
  ])
    if (existsSync(file)) loadEnvFile(file);
}
