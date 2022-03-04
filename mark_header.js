const path = require("path");
const fs = require("fs");

//input header
const inputHeader = `//this is headerxxx
`;

const removeOldHeader = (str) => {
  let newStr = str;
  if (str.trim().startsWith("/*")) {
    const lastComment = str.indexOf("*/");
    newStr = str.slice(lastComment + 2, str.length).trim();

    if (newStr.startsWith("/*")) {
      newStr = removeOldHeader(newStr);
    }
  }
  return newStr;
};

const changeContentFile = (header, pathFile) => {
  fs.readFile(pathFile, "utf8", function (err, data) {
    if (err) {
      return console.log(err);
    }
    // var result = data.replace(/string to be replaced/g, 'replacement');
    const newContent = removeOldHeader(data);
    var result = `${header}${newContent}`;

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
        changeContentFile(inputHeader, `${pathFolder}/${file}`);
      }
    });
  });
};

const folderName = process.argv[2];

getPathFiles(folderName);
