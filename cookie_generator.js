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
  for (let i = 0; i < buildings.length; i++) {
    building = buildings[i];
    if (building.locked == 0 && building.price <= Game.cookies) {
      building_to_buy = building;
    }
  }
  if (building_to_buy != undefined) {
    building_to_buy.buy(Math.floor(Game.cookies/building_to_buy.price));
  }
}

setInterval(() => {
  autoplay.run();
}, 1000);
