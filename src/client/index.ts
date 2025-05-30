import { Game } from "@/client/app/Game";
import { lazyClass, patron, SourceType, value } from "silentium";
import { path } from "silentium-components";
import { attribute, element, event } from "silentium-web-api";
import "../../assets/base.css";

const startScreen = element(
  lazyClass(MutationObserver),
  document,
  ".start-screen",
);
const game = new Game(startScreen);
console.log("front is live!", game);

const startClick = event<Record<string, unknown>>(startScreen, "click");

value(
  attribute("data-action", <SourceType>path(startClick, "target")),
  patron(console.log),
);
