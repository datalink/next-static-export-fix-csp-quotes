#!/usr/bin/env node
var fs = require("fs");
var path = require("path");

var dirPath = "./out";

// Matches &#x27; within the content="" section of the content security policy tag
var REGEX = /(\"Content-Security-Policy\" content=\".*?)(&#x27;)(.*?\")/gm;

console.log("Scanning dirdctory " + dirPath + " for html files");
fs.readdirSync(dirPath)
    .filter((file) => file.substr(file.length - 5) === '.html')
    .forEach((file) => {
        console.log("Updating " + file);
        let contents = fs.readFileSync(dirPath + '/' + file).toString();
        let i = 0;
        let loop = REGEX.test(contents);;
        while (loop) {
            contents = contents.replace(REGEX, "$1'$3");
            loop = REGEX.test(contents);
            i++;
        }
        console.log("Fixed " + i + " occurrances");
        fs.writeFileSync(dirPath + '/' + file, contents);
    });
console.log("Done");
