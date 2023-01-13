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
  autoplay.now = Date.now();
  autoplay.handleLumps(autoplay.now - Game.lumpT); 
  autoplay.popGoldenCookies();
  autoplay.handleBuildings();
  autoplay.handleUpgrades();
  autoplay.autoclick();
}

autoplay.popGoldenCookies = function () {
  for (let sx in Game.shimmers) {
    let s = Game.shimmers[sx];
    if (s.type == "golden") {
      s.pop();
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
  let upgrade_to_buy = undefined;
  for (let key in upgrades) {
    let upgrade = upgrades[key];
    let price = upgrade.getPrice();
    if (upgrade.unlocked == 1 && price <= Game.cookies && upgrade.bought == 0) {
      upgrade_to_buy = upgrade;
    }
  }
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

autoplay.handleLumps = function (age) {
  if (age >= Game.lumpRipeAge) {
    Game.clickLump();
    autoplay.useLump();
  }
}

autoplay.useLump = function () {
  if (Game.lumps == 0) return;

  let farm = Game.Objects["Farm"];
  if (farm.level < 9) {
    if (farm.level < Game.lumps) {
      farm.levelUp();
      autoplay.useLump();
    }
  }
}

setInterval(() => {
  autoplay.run();
}, 1000);
