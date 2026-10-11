import { connection } from "next/server";
import { getDemoConfig } from "@/lib/demo/config";
import { isDemoReady } from "@/lib/demo/service";
import { DemoFormClient } from "@/lib/demo/form-client";
export async function DemoForm() {
  await connection();
  return <DemoFormClient enabled={isDemoReady(getDemoConfig())} />;
}
