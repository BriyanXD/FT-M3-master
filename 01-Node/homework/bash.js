/* console.log(Object.keys(process)); */

/* console.log(process.stdout.write(Date())); */

/* // Output un prompt
process.stdout.write("prompt > ");
// El evento stdin 'data' se dispara cuando el user escribe una línea
process.stdin.on("data", function (data) {
  var cmd = data.toString().trim(); // remueve la nueva línea
  process.stdout.write("You typed: " + cmd);
  process.stdout.write("\nprompt > ");
}); */

const commands = require("./commands");

const print = function (output) {
  process.stdout.write(output);
  process.stdout.write("\nprompt > ");
};

// Output un prompt
process.stdout.write("prompt > ");
// El evento stdin 'data' se dispara cuando el user escribe una línea
process.stdin.on("data", function (data) {
  var args = data.toString().trim().split(" ");

  let cmd = args.shift(); // remueve la nueva línea

  if (commands[cmd]) {
    commands[cmd](args, print);
  } else {
    print("cmd not found.");
  }
});
