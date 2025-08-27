import { ButtonAction, ModCallback } from "isaac-typescript-definitions";
import {
  Callback,
  ModFeature,
  game,
  isActionTriggeredOnAnyInput,
  onFirstFloor,
} from "isaacscript-common";

export class FastReset extends ModFeature {
  // 2
  @Callback(ModCallback.POST_RENDER)
  postRender(): void {
    checkResetInput();
  }
}

function checkResetInput() {
  const isPaused = game.IsPaused();

  // Disable the fast-reset feature if the console is open. (This will also disable the feature when
  // the game is paused, but that's okay as well.)
  if (isPaused) {
    return;
  }

  // Check to see if the player has pressed the restart input. (We check all inputs instead of
  // "player.ControllerIndex" because a controller player might be using the keyboard to reset.)
  if (isActionTriggeredOnAnyInput(ButtonAction.RESTART)) {
    Isaac.DebugString("Fast reset triggered.");
    checkReset();
  }
}

function checkReset() {
  if (onFirstFloor()) {
    // Speedrun functionality relies on knowing whether a fast-reset occurred.
    Isaac.DebugString("First floor reset detected.");
    Isaac.ExecuteCommand("restart");
    return false;
  }
}
