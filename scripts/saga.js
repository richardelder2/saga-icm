#!/usr/bin/env node

import * as fs from 'fs';
import * as path from 'path';
import { fork } from 'child_process';
import { fileURLToPath } from 'url';

const args = process.argv.slice(2);
const command = args[0];
const subCommand = args[1];

const STAGES = [
  '01_onboarding',
  '02_planning',
  '03_drafting',
  '04_diagnostics_edits',
  '05_publishing'
];

function printHeader(text) {
  console.log(`\n\x1b[1m\x1b[35m=== ${text} ===\x1b[0m`);
}

function copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();
  if (isDirectory) {
    if (path.basename(src) === 'output') return; // Skip stage outputs to keep it blank
    fs.mkdirSync(dest, { recursive: true });
    fs.readdirSync(src).forEach(childItemName => {
      copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
    });
  } else {
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.copyFileSync(src, dest);
  }
}

function handleInit() {
  printHeader('Initializing SAGA-ICM Workspace');
  
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const templateDir = path.dirname(__dirname); // The template SAGA-ICM folder
  const targetDir = process.cwd();

  if (templateDir === targetDir) {
    console.log('\x1b[33mWarning: You are running init inside the template repository itself.\x1b[0m');
    console.log('To start a clean project, create a blank directory elsewhere, cd into it, and run:');
    console.log(`  node "${path.join(templateDir, 'scripts', 'saga.js')}" init`);
    return;
  }

  console.log(`Copying template files from: ${templateDir}`);
  console.log(`Initializing clean workspace at: ${targetDir}`);

  // Items to copy
  const items = [
    '_config',
    'setup',
    'stages',
    'scripts',
    '.claude',
    'package.json',
    'CLAUDE.md',
    'CONTEXT.md',
    'README.md',
    'LOCAL_SETUP.md'
  ];

  items.forEach(item => {
    const srcPath = path.join(templateDir, item);
    const destPath = path.join(targetDir, item);
    if (fs.existsSync(srcPath)) {
      copyRecursiveSync(srcPath, destPath);
    }
  });

  // Write default .env template if it doesn't exist
  const envPath = path.join(targetDir, '.env');
  if (!fs.existsSync(envPath)) {
    fs.writeFileSync(envPath, `# SAGA-ICM Environment Variables
# Option A: Local Edge (Ollama)
LOCAL_MODEL=true
LOCAL_MODEL_URL=http://localhost:11434/v1/chat/completions
LOCAL_MODEL_NAME=gemma2

# Option B: OpenRouter
# USE_OPENROUTER=true
# OPENROUTER_API_KEY=your_key
# OPENROUTER_MODEL=meta-llama/llama-3-8b-instruct:free

# Option C: Gemini Cloud
# GEMINI_API_KEY=your_key
`, 'utf8');
    console.log('Created template .env file.');
  }

  console.log('\n\x1b[32m✔ SAGA-ICM Workspace successfully initialized! Run "npm install" to configure dependencies.\x1b[0m\n');
}


function handleStatus() {
  printHeader('SAGA-ICM Stage Pipeline Status');

  STAGES.forEach(stage => {
    const stagePath = path.join('stages', stage);
    const contractExists = fs.existsSync(path.join(stagePath, 'CONTEXT.md'));
    const outputFiles = getFilesRecursive(path.join(stagePath, 'output'));

    let statusText = '\x1b[31mNot Started\x1b[0m';
    if (outputFiles.length > 0) {
      statusText = '\x1b[32mHas Output\x1b[0m';
    } else if (contractExists) {
      statusText = '\x1b[33mActive / Configured\x1b[0m';
    }

    console.log(`- \x1b[1mStage ${stage}\x1b[0m: ${statusText}`);
    outputFiles.forEach(file => console.log(`    ↳ \x1b[90m${file}\x1b[0m`));
  });
}

function getFilesRecursive(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFilesRecursive(filePath));
    } else {
      results.push(filePath);
    }
  });
  return results;
}

function handleWizard(type) {
  if (type === 'onboard') {
    // Resolve --blueprint=<name> into a setup/ file (dashes map to underscores,
    // "_blueprint.md" suffix optional). Passed to the wizard via env var.
    const blueprintArg = args.find(a => a.startsWith('--blueprint='));
    const env = { ...process.env };
    if (blueprintArg) {
      const name = blueprintArg.split('=')[1].replace(/-/g, '_');
      const candidates = [
        path.join('setup', `${name}.md`),
        path.join('setup', `${name}_blueprint.md`),
      ];
      const resolved = candidates.find(c => fs.existsSync(c));
      if (!resolved) {
        console.error(`Blueprint not found. Tried: ${candidates.join(', ')}`);
        process.exit(1);
      }
      env.SAGA_BLUEPRINT = resolved;
    }
    const wizardProcess = fork(path.join('scripts', 'onboard_wizard.js'), [], { env });
    wizardProcess.on('close', (code) => {
      process.exit(code);
    });
  } else {
    console.error(`Unknown wizard: ${type}. Available: onboard`);
  }
}

async function handleAudit() {
  const { runAudit } = await import('./narrative_audit.js');
  runAudit(args.slice(1));
}

function handleRunStage(stageId) {
  const matchingStage = STAGES.find(s => s.startsWith(stageId) || s === stageId);
  if (!matchingStage) {
    console.error(`Invalid stage ID: "${stageId}". Choose from: ${STAGES.join(', ')}`);
    process.exit(1);
  }

  printHeader(`Running Stage: ${matchingStage}`);
  const stagePath = path.join('stages', matchingStage);
  const contractPath = path.join(stagePath, 'CONTEXT.md');
  
  if (!fs.existsSync(contractPath)) {
    console.error(`Stage contract not found at: ${contractPath}`);
    process.exit(1);
  }

  console.log(`Loaded stage contract from ${contractPath}.`);
  console.log(`Please run the corresponding wizard or let your agent co-author complete the steps detailed in the contract.`);
}

function showHelp() {
  console.log(`
SAGA-ICM novel engineering CLI

Usage:
  node scripts/saga.js init                   Scaffold template files into a new project directory
  node scripts/saga.js status                 Show the status of each pipeline stage
  node scripts/saga.js wizard onboard         Start the interactive onboarding session
                       [--blueprint=<name>]   Pick a setup/ questionnaire (default: comfort-scifi)
  node scripts/saga.js run-stage <stage_id>   View contract and execute/validate a specific stage pipeline
  node scripts/saga.js audit [path ...]       Scan chapters for AI prose tells (default: stage 03 output);
                                              writes reports to stages/04_diagnostics_edits/output/reports/
  `);
}

switch (command) {
  case 'init':
    handleInit();
    break;
  case 'status':
    handleStatus();
    break;
  case 'wizard':
    handleWizard(subCommand);
    break;
  case 'run-stage':
    handleRunStage(subCommand || args[2]);
    break;
  case 'audit':
    handleAudit();
    break;
  case '--help':
  case 'help':
  default:
    showHelp();
    break;
}
