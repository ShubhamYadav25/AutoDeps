const core = require('@actions/core');
const exec = require('@actions/exec');
const fs = require('fs');
const path = require('path');

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