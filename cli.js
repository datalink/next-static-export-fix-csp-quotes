#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

const dirPath = "./out";

// Matches &#x27; within the content="" section of the content security policy tag
const REGEX = /(\"Content-Security-Policy\" content=\".*?)(&#x27;)(.*?\")/gm;

console.log("Scanning directory " + dirPath + " for html files...");
let numFilesScanned = 0;
let numMatches = 0;
fs.readdirSync(dirPath)
    .filter((file) => file.substr(file.length - 5) === '.html')
    .forEach((file) => {
        numFilesScanned++;
        let contents = fs.readFileSync(dirPath + '/' + file).toString();
        let i = 0;
        let loop = REGEX.test(contents);
        while (loop) {
            contents = contents.replace(REGEX, "$1'$3");
            loop = REGEX.test(contents);
            numMatches++;
        }
        fs.writeFileSync(dirPath + '/' + file, contents);
    });
console.log(`Processed ${numFilesScanned} files, fixed ${numMatches} issues.`);
console.log("Done");
