const simpleGit = require('simple-git');
const path = require('path');
const fs = require('fs');

async function syncToGithub() {
  // Only sync if GITHUB_TOKEN is provided (production/Render)
  if (!process.env.GITHUB_TOKEN) {
    console.log('ℹ️  Skipping Git Auto-Sync (GITHUB_TOKEN not provided)');
    return;
  }

  try {
    const git = simpleGit(path.join(__dirname, '..', '..'));
    
    // Configure remote with token for authentication
    // Assuming the remote is already 'origin'
    const remote = await git.remote(['get-url', 'origin']);
    if (remote && !remote.includes(process.env.GITHUB_TOKEN)) {
      // Modify URL to include token: https://<token>@github.com/user/repo.git
      const authRemote = remote.replace('https://', `https://${process.env.GITHUB_TOKEN}@`);
      await git.remote(['set-url', 'origin', authRemote]);
    }

    // Stage the Excel file (and any other potential data files)
    const excelFile = path.join('data', 'techinnosphere_data.xlsx');
    await git.add(excelFile);
    
    // Commit
    const timestamp = new Date().toISOString();
    await git.commit(`💾 Auto-sync: Database update at ${timestamp}`);
    
    // Push
    await git.push('origin', 'main');
    
    console.log(`✅ Database synced to GitHub at ${timestamp}`);
  } catch (error) {
    console.error('❌ Git Auto-Sync failed:', error.message);
  }
}

module.exports = { syncToGithub };
