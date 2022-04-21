#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const child_process = require("child_process");

const basePath = path.join(__dirname, "../../..");
const srcPath = path.join(basePath, "src");

console.log("Cleaning up CRA build...");

// Remove images
console.log("Remove images...");
if (fs.existsSync(path.join(srcPath, "logo.svg"))) {
  fs.unlinkSync(path.join(srcPath, "logo.svg"));
}
console.log("Remove images... done");

// Replace App.tsx
console.log("Replace App.tsx...");
const appTsxPath = path.join(srcPath, "App.tsx");
const appTsx = `import React from 'react';
import './App.scss';

function App() {
  return (
    <div className="app">
      <h1>Cleaned!</h1>
    </div>
  );
}

export default App;

`;

// fs.readFileSync(appTsxPath, 'utf8', (err, data) => {
//   if (err) {
//     return console.error(err);
//   }

fs.writeFileSync(appTsxPath, appTsx, "utf8", (err) => {
  if (err) {
    return console.error(err);
  }
  console.log("Replace App.tsx... done");
});
// });
// console.log('Replace App.tsx... done');

// Replace App.scss
console.log("Replace App.scss...");
const appCssPath = path.join(srcPath, "App.css");
const appScssPath = path.join(srcPath, "App.scss");
const appScss = `.app {
  // 
}
`;
if (fs.existsSync(appCssPath)) {
  fs.unlinkSync(appCssPath);
}

fs.writeFileSync(appScssPath, appScss, "utf8", (err) => {
  if (err) {
    return console.error(err);
  }
});
console.log("Replace App.scss... done");

// Install SASS
console.log("Installing SASS...");
child_process.execSync("npm install --save-dev sass", {
  cwd: basePath,
  stdio: "inherit",
});
console.log("Installing SASS... done");

// Add Prettier config
console.log("Add Prettier config...");
const prettierConfigPath = path.join(basePath, ".prettierrc");
const prettierConfig = `
{
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "semi": true,
  "singleQuote": true,
  "trailingComma": "es5",
  "bracketSpacing": true,
  "jsxBracketSameLine": false,
  "arrowParens": "avoid",
  "parser": "typescript"
}
`;

fs.writeFileSync(prettierConfigPath, prettierConfig, "utf8", (err) => {
  if (err) {
    return console.error(err);
  }
  console.log("Add Prettier config... done");
});
