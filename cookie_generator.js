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
  autoplay.handleUpgrades();
  autoplay.autoclick();
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
    let building = buildings[i];
    if (building.locked == 0 && building.price <= Game.cookies) {
      building_to_buy = building;
    }
  }
  if (building_to_buy != undefined) {
    building_to_buy.buy(Math.floor(Game.cookies/building_to_buy.price));
  }
}

autoplay.handleUpgrades = function () {
  if (Game.Achievements["Hardcore"].won != 1) return;
  let upgrades = Game.UpgradesById;
  console.log(upgrades);
  let upgrade_to_buy = undefined;
  for (let i = 0; i < upgrades.length; i++) {
    let upgrade = upgrades[i];
    if (upgrade.unlocked == 1 && upgrade.getPrice() < Game.cookies && upgrade.Bought == 0) {
      upgrade_to_buy = upgrade;
    }
  }
  console.log(upgrade_to_buy);
  if (upgrade_to_buy != undefined) {
    upgrade_to_buy.buy();
  }
}

autoplay.autoclick = function () {
  if (Game.Achievements["True Neverclick"].won != 1) return;
  for (let index = 0; index < 10; index++) {
    setTimeout(() => {
      Game.ClickCookie();
    }, 100 * index);
  }
}

setInterval(() => {
  autoplay.run();
}, 1000);
