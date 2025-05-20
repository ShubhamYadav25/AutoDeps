/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 991:
/***/ ((module) => {

module.exports = eval("require")("@actions/core");


/***/ }),

/***/ 245:
/***/ ((module) => {

module.exports = eval("require")("@actions/exec");


/***/ }),

/***/ 896:
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ 928:
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId](module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
const core = __nccwpck_require__(991);
const exec = __nccwpck_require__(245);
const fs = __nccwpck_require__(896);
const path = __nccwpck_require__(928);

async function run() {
  try {
    const workingDirectory = core.getInput('working-directory') || '.';
    const dryRun = core.getBooleanInput('dry-run') || false;

    const packageJsonPath = path.join(workingDirectory, 'package.json');
    if (!fs.existsSync(packageJsonPath)) {
      core.setFailed('No package.json found in the specified directory.');
      return;
    }

    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
    const dependencies = {
      ...packageJson.dependencies,
      ...packageJson.devDependencies
    };

    if (dryRun) {
      core.info('Dry Run Mode: Listing Dependencies');
      console.log('Dependencies:', dependencies);
      return;
    }

    // Install Dependencies
    await exec.exec('npm ci', [], { cwd: workingDirectory });
    core.info('Dependencies installed successfully.');

  } catch (error) {
    core.setFailed(`Error: ${error.message}`);
  }
}

run();
module.exports = __webpack_exports__;
/******/ })()
;