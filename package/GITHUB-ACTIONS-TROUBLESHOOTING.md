# GitHub Actions Troubleshooting

## ✅ Changes Pushed Successfully!

Your code has been pushed to GitHub. The workflow should now trigger automatically.

## 🔍 Check Workflow Status

### Go to GitHub:
1. Open your repository: https://github.com/imbipow/dreamsystech
2. Click the **Actions** tab
3. You should see a workflow run titled "Add CloudFront distribution and complete deployment setup"

### Check Run Status:
- **Yellow circle** 🟡 = Running
- **Green checkmark** ✅ = Successful
- **Red X** ❌ = Failed

## ⚠️ If Workflow Doesn't Start

### Possible Reasons:

#### 1. **GitHub Secrets Not Configured**

The workflow needs these secrets to run. Check if they're all added:

**Go to**: Repository → Settings → Secrets and variables → Actions

Required secrets:
- ✅ `AWS_ACCESS_KEY_ID`
- ✅ `AWS_SECRET_ACCESS_KEY`
- ✅ `AWS_REGION`
- ✅ `S3_BUCKET_NAME`
- ✅ `FORM_EMAIL`
- ✅ `CONTENT_JSON_URL`
- ✅ `CLOUDFRONT_DISTRIBUTION_ID`

**If ANY secret is missing**, add it now! See [GITHUB-SECRETS-SETUP.md](./GITHUB-SECRETS-SETUP.md)

#### 2. **Workflow File Issues**

Check if `.github/workflows/deploy.yml` exists in your repository:
- Go to: https://github.com/imbipow/dreamsystech/tree/main/.github/workflows
- You should see `deploy.yml` file

#### 3. **GitHub Actions Disabled**

Check if Actions are enabled:
- Repository → Settings → Actions → General
- Ensure "Allow all actions and reusable workflows" is selected

#### 4. **Workflow Permissions**

Check workflow permissions:
- Repository → Settings → Actions → General → Workflow permissions
- Select "Read and write permissions"
- Check "Allow GitHub Actions to create and approve pull requests"

## 🔧 Manual Trigger

If automatic trigger doesn't work, trigger manually:

1. Go to: https://github.com/imbipow/dreamsystech/actions
2. Click "Deploy to S3" workflow on the left
3. Click "Run workflow" button (top right)
4. Select branch: `main`
5. Click green "Run workflow" button

## 📊 Expected Workflow Steps

When the workflow runs, you should see these steps:

1. ✅ **Checkout code** - Downloads your repository
2. ✅ **Setup Node.js** - Installs Node.js 20
3. ✅ **Install dependencies** - Runs `npm ci`
4. ✅ **Build Next.js static export** - Fetches content from Google Drive and builds
5. ✅ **Configure AWS credentials** - Sets up AWS access
6. ✅ **Deploy to S3** - Uploads files to S3
7. ✅ **Invalidate CloudFront cache** - Clears CDN cache (if secret is set)
8. ✅ **Deployment complete** - Shows success message

## ❌ Common Errors & Solutions

### Error: "AWS credentials not found"
**Solution**: Add `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` secrets

### Error: "S3 bucket not found"
**Solution**: Verify `S3_BUCKET_NAME` secret is set to `dreamsystech.com`

### Error: "Permission denied"
**Solution**: Check IAM user has S3 full access permissions

### Error: "Failed to fetch content from Google Drive"
**Solution**:
- Verify `CONTENT_JSON_URL` secret is correct
- Check Google Drive file is public ("Anyone with the link")

### Error: "CloudFront distribution not found"
**Solution**: Add `CLOUDFRONT_DISTRIBUTION_ID` secret with value `E16TNO0K9X04XA`

## 🎯 Quick Actions

### View Latest Workflow Run:
```
https://github.com/imbipow/dreamsystech/actions
```

### View Deployment Logs:
1. Click on the workflow run
2. Click on "deploy" job
3. Expand each step to see detailed logs

### Cancel Running Workflow:
1. Click on the running workflow
2. Click "Cancel workflow" button (top right)

## ✅ Success Indicators

When deployment succeeds, you'll see:
- ✅ All steps have green checkmarks
- ✅ Last step shows: "✅ Deployment successful!"
- ✅ Website URL shown in logs

## 🔗 Useful Links

- **Your Repository**: https://github.com/imbipow/dreamsystech
- **Actions Tab**: https://github.com/imbipow/dreamsystech/actions
- **Settings**: https://github.com/imbipow/dreamsystech/settings
- **Secrets**: https://github.com/imbipow/dreamsystech/settings/secrets/actions

## 📝 Next Steps

1. **Check Actions tab** to see if workflow is running
2. **Add missing secrets** if workflow fails
3. **Monitor the build** to ensure it completes
4. **Visit your site** at https://dreamsystech.com.au once deployed

## 🆘 Still Not Working?

If the workflow still doesn't trigger:

1. **Check repository visibility** - Ensure it's not disabled
2. **Verify branch name** - Workflow triggers on `main` branch only
3. **Check workflow syntax** - Ensure YAML is valid
4. **Try manual trigger** - Use "Run workflow" button
5. **Check GitHub Status** - Visit https://www.githubstatus.com

---

**Need the secrets list?** See [GITHUB-SECRETS-SETUP.md](./GITHUB-SECRETS-SETUP.md)

**Need deployment help?** See [DEPLOYMENT-COMPLETE.md](./DEPLOYMENT-COMPLETE.md)
