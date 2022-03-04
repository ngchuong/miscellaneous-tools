const path = require("path");
const fs = require("fs");

const changeContentFile = (header, pathFile) => {
  fs.readFile(pathFile, "utf8", function (err, data) {
    if (err) {
      return console.log(err);
    }
    // var result = data.replace(/string to be replaced/g, 'replacement');
    var result = `${header}
    ${data}`;

    fs.writeFile(pathFile, result, "utf8", function (err) {
      if (err) return console.log(err);
    });
  });
};

const getPathFiles = (pathFolder) => {
  //joining path of directory
  const directoryPath = path.join(__dirname, pathFolder);
  //passsing directoryPath and callback function
  fs.readdir(directoryPath, function (err, files) {
    //handling error
    if (err) {
      return console.log("Unable to scan directory: " + err);
    }
    //listing all files using forEach
    files.forEach(function (file) {
      // Do whatever you want to do with the file
      if (!file.includes(".")) {
        getPathFiles(`${pathFolder}/${file}`);
      } else {
        changeContentFile("//this is headerxxx", `${pathFolder}/${file}`);
      }
    });
  });
};

const folderName = process.argv[0];

getPathFiles(folderName);
