# DreamSys Technologies - S3 Deployment Guide

This guide will help you deploy your Next.js website to AWS S3 and configure form submissions to be sent to your email.

## Prerequisites

- AWS Account
- Your email address for receiving form submissions
- Node.js installed on your computer

## Step 1: Configure Email for Form Submissions

### Option A: Using FormSubmit.co (Easiest - Free)

1. Create a `.env.local` file in the project root:
   ```bash
   cp .env.local.example .env.local
   ```

2. Edit `.env.local` and replace with your email:
   ```
   NEXT_PUBLIC_FORM_EMAIL=your-actual-email@example.com
   ```

3. **IMPORTANT**: The first time someone submits a form, FormSubmit.co will send a confirmation email to your address. You MUST click the confirmation link to activate the service.

### Option B: Using Web3Forms (Alternative - Free)

1. Go to https://web3forms.com
2. Sign up and get your free access key
3. Update `.env.local`:
   ```
   NEXT_PUBLIC_WEB3FORMS_KEY=your-web3forms-access-key
   ```

4. Update form components to use Web3Forms instead (see `src/lib/formSubmit.ts` for the alternative function)

## Step 2: Build Your Static Website

1. Install dependencies:
   ```bash
   npm install
   ```

2. Build the static export:
   ```bash
   npm run build
   ```

   This will create an `out` folder with your static website files.

3. Verify the build worked:
   - Check that `out` folder exists
   - Check that it contains `index.html` and other pages

## Step 3: Deploy to AWS S3

### Create S3 Bucket

1. Log in to AWS Console
2. Go to S3 service
3. Click "Create bucket"
4. Bucket settings:
   - **Bucket name**: `dreamsystech.com` (or your domain)
   - **Region**: Choose closest to your customers
   - **Block Public Access**: UNCHECK "Block all public access"
   - **Acknowledge**: Check the warning box
   - Click "Create bucket"

### Configure Bucket for Website Hosting

1. Click on your bucket name
2. Go to "Properties" tab
3. Scroll to "Static website hosting"
4. Click "Edit"
5. Enable static website hosting
6. Set:
   - **Index document**: `index.html`
   - **Error document**: `404.html`
7. Click "Save changes"
8. **Note the endpoint URL** (e.g., http://dreamsystech.s3-website-us-east-1.amazonaws.com)

### Set Bucket Policy for Public Access

1. Go to "Permissions" tab
2. Scroll to "Bucket policy"
3. Click "Edit"
4. Paste this policy (replace `YOUR-BUCKET-NAME` with your actual bucket name):

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::YOUR-BUCKET-NAME/*"
        }
    ]
}
```

5. Click "Save changes"

### Upload Files

**Option 1: Using AWS Console**

1. Go to "Objects" tab
2. Click "Upload"
3. Click "Add folder"
4. Select the entire `out` folder
5. Click "Upload"

**Option 2: Using AWS CLI (Faster)**

1. Install AWS CLI: https://aws.amazon.com/cli/
2. Configure credentials:
   ```bash
   aws configure
   ```
3. Upload files:
   ```bash
   aws s3 sync ./out s3://YOUR-BUCKET-NAME --delete
   ```

## Step 4: Configure Custom Domain (Optional)

### Using CloudFront (Recommended for HTTPS)

1. Go to CloudFront in AWS Console
2. Click "Create Distribution"
3. Settings:
   - **Origin Domain**: Select your S3 bucket
   - **Viewer Protocol Policy**: Redirect HTTP to HTTPS
   - **Allowed HTTP Methods**: GET, HEAD, OPTIONS
   - **Alternate Domain Names (CNAMEs)**: www.dreamsystech.com, dreamsystech.com
   - **SSL Certificate**: Request or import certificate
4. Create distribution
5. Update your domain DNS to point to CloudFront distribution

### DNS Configuration

1. Go to your domain registrar (GoDaddy, Namecheap, etc.)
2. Add CNAME record:
   - **Type**: CNAME
   - **Name**: www
   - **Value**: Your CloudFront domain or S3 endpoint
3. Add A record for root domain (if supported)

## Step 5: Test Form Submissions

1. Visit your website
2. Go to the "/audit" page
3. Fill out the form with test data
4. Submit the form
5. Check your email - you should receive:
   - First time: Confirmation email from FormSubmit.co - **CLICK THE LINK!**
   - After activation: Form submission emails

## Updating Your Website

When you make changes:

1. Update code locally
2. Rebuild:
   ```bash
   npm run build
   ```
3. Re-upload to S3:
   ```bash
   aws s3 sync ./out s3://YOUR-BUCKET-NAME --delete
   ```
4. If using CloudFront, invalidate cache:
   ```bash
   aws cloudfront create-invalidation --distribution-id YOUR-DIST-ID --paths "/*"
   ```

## Troubleshooting

### Forms not sending emails

- Check browser console for errors
- Verify `.env.local` email is correct
- For FormSubmit: Did you click the activation link?
- Try submitting again after 5 minutes

### Website not accessible

- Check S3 bucket policy is public
- Verify static website hosting is enabled
- Check bucket name matches domain

### 404 errors on page refresh

- This is normal for S3 static hosting
- Configure error document to redirect to index.html
- Or use CloudFront with Lambda@Edge for proper routing

## Cost Estimate

- **S3 Storage**: ~$0.023 per GB/month (tiny website = pennies)
- **S3 Requests**: ~$0.0004 per 1000 requests
- **Data Transfer**: First 100GB/month is free
- **CloudFront** (optional): Free tier includes 1TB/month
- **FormSubmit.co**: FREE (unlimited forms)

**Expected monthly cost for small traffic**: **$1-5/month**

## Security Notes

1. ✅ Forms use HTTPS (via FormSubmit.co API)
2. ✅ No sensitive data stored in your code
3. ✅ Email address is in environment variable
4. ⚠️ Environment variables are public in static sites - this is OK for email addresses
5. ⚠️ Enable CloudFront + HTTPS for production use

## Need Help?

- AWS S3 Docs: https://docs.aws.amazon.com/s3/
- FormSubmit Docs: https://formsubmit.co/
- Next.js Static Export: https://nextjs.org/docs/app/building-your-application/deploying/static-exports
