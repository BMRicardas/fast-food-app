import { REQUEST_DELAY_MS } from "@/constants";

export function sleep(ms: number = REQUEST_DELAY_MS) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
