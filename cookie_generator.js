console.log("Hello World!");
let autoplay;
if (!autoplay) autoplay = {};
/*
Game.ClickCookie();
for (let index = 0; index < 0; index++) {
  console.log("E");
  Game.ClickCookie();
}
*/

autoplay.run = function () {
  autoplay.popGoldenCookies();
  autoplay.handleBuildings();
}

autoplay.popGoldenCookies = function () {
  for (let sx in Game.shimmers) {
    console.log("found shimmer");
    let s = Game.shimmers[sx];
    if (s.type == "golden") {
      s.pop();
      console.log("popped shimmer");
    }
  }
}

autoplay.handleBuildings = function () {
  let buildings = Game.ObjectsById;
  let building_to_buy = undefined;
  for (let building in buildings) {
    if (building.locked == 0 && building.price <= Game.cookies) {
      building_to_buy = building;
    }
  }
  building_to_buy.buy(Math.floor(building_to_buy.price/Game.cookies));
}

setInterval(() => {
  autoplay.run();
}, 1000);
