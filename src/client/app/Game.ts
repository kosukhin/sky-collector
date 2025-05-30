import { SourceType } from "silentium";
import { visible } from "silentium-web-api";

/**
 * Information about game
 */
export class Game {
  public constructor(startScreenSrc: SourceType<HTMLElement>) {
    visible(true, startScreenSrc);
  }

  public round() {}
}
