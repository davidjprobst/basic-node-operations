const fs = require("fs");

function done(output) {
    process.stdout.write(output);
    process.stdout.write('\nprompt > ');
}

function evaluateCmd(userInput) {
  const userInputArray = userInput.split(" ");
  const command = userInputArray[0];

  switch (command) {
    case "echo":
      commandLibrary.echo(userInputArray.slice(1).join(" "));
      break;
    case "cat":
      commandLibrary.cat(userInputArray.slice(1));
      break;
    case "head":
        commandLibrary.head(userInputArray.slice(1));
        break;
    case "tail":
        commandLibrary.tail(userInputArray.slice(1));
        break;
    default:
        console.log("This command does not exist. Try again.");
  }
}

const commandLibrary = {
  "echo": function(userInput) {
      done(userInput);
  },
 "cat": function(fullPath) {
      const fileName = fullPath[0];
      fs.readFile(fileName, (err, data) => {
          if (err) throw err;
          done(data);
      });
  },
  "head": function(fullPath) {
       const fileName = fullPath[0];
       fs.readFile(fileName, "utf8", (err, data) => {
           if (err) throw err;
           let lineCount = 0;
           let dataHead = [];
           for (let i = 0; i<= data.length; i++) {
             if (data[i] === '\n') {
               lineCount++;
             };
             if (lineCount<5) {
               dataHead.push(data[i]);
             };
           };
           done(dataHead.join(''));
       });
     },
     "tail": function(fullPath) {
       const fileName = fullPath[0];
       fs.readFile(fileName, "utf8", (err, data) => {
           if (err) throw err;
           let totalLines = 0;
           let lineCount = 0;
           let dataTail = [];
           for (let i = 0; i<= data.length; i++) {
             if (data[i] === '\n') {
               totalLines++;
             };
           };
           for (let i = 0; i<= data.length; i++) {
             if (data[i] === '\n') {
               lineCount++;
             };
             if (lineCount >= totalLines - 5) {
               dataTail.push(data[i]);
             };
           };
           done(dataTail.join(''));
       });
     }
 };

module.exports.commandLibrary = commandLibrary;
module.exports.evaluateCmd = evaluateCmd;
