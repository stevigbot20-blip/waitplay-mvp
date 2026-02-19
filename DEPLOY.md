# Deploying WaitPlay to GitHub Pages

## Steps to Deploy

1. Create a new repository on GitHub named `waitplay-mvp`
2. Add the remote to your local repository:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/waitplay-mvp.git
   ```
3. Push the code:
   ```bash
   git push -u origin master
   ```
4. Enable GitHub Pages:
   - Go to your repository Settings
   - Scroll to "Pages" section
   - Select "Deploy from a branch"
   - Choose "master" branch and "/ (root)" folder
   - Click "Save"

## Alternative: Using GitHub CLI

If you have GitHub CLI installed:

```bash
gh repo create waitplay-mvp --public
gh repo deploy waitplay-mvp
```

## After Deployment

Once deployed, your site will be available at:
`https://YOUR_USERNAME.github.io/waitplay-mvp/`

This URL can then be shared with potential sponsors to demonstrate the ad placement opportunities.