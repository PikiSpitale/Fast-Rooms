import { initModFeatures } from "isaacscript-common";
import { name } from "../package.json";
import { FastReset } from "./classes/FastReset";
import { mod } from "./mod";

// This function is run when your mod first initializes.
export function main(): void {
  // Register a callback function that corresponds to when a new player is initialized.

  const MOD_FEATURES = [FastReset] as const;

  initModFeatures(mod, MOD_FEATURES);
  // Print a message to the "log.txt" file.
  Isaac.DebugString(`${name} initialized.`);
}
