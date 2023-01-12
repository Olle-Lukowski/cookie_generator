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
  console.log("running");
  for (let sx in Game.shimmers) {
    console.log("found shimmer");
    let s = Game.shimmers[sx];
    if (s.type == "golden") {
      s.pop();
      console.log("popped shimmer");
    }
  }
}
