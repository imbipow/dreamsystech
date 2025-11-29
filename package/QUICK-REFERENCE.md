# Quick Reference - DreamSys Technologies

## 🔗 Important Links

- **S3 Website**: http://dreamsystech.com.s3-website-ap-southeast-2.amazonaws.com
- **Google Drive Content**: https://drive.google.com/file/d/1rBGPr7qSDz5SWKwthips60t2WaxwMEEY/view

## 📋 GitHub Secrets Required

| Secret Name | Value |
|-------------|-------|
| `AWS_ACCESS_KEY_ID` | Your AWS access key |
| `AWS_SECRET_ACCESS_KEY` | Your AWS secret key |
| `AWS_REGION` | `ap-southeast-2` |
| `S3_BUCKET_NAME` | `dreamsystech.com` |
| `FORM_EMAIL` | `imbpow@gmail.com` |
| `CONTENT_JSON_URL` | `https://drive.google.com/uc?export=download&id=1rBGPr7qSDz5SWKwthips60t2WaxwMEEY` |
| `CLOUDFRONT_DISTRIBUTION_ID` | (Add after CloudFront setup) |

## 🚀 Quick Commands

### Update Content (From Google Drive)
```bash
npm run fetch-content  # Fetch latest from Google Drive
npm run build          # Build with new content
```

### Deploy to S3
```bash
# Non-HTML files (long cache)
aws s3 sync ./out s3://dreamsystech.com --delete --cache-control "max-age=31536000,public" --exclude "*.html"

# HTML files (short cache)
aws s3 sync ./out s3://dreamsystech.com --cache-control "max-age=3600,public" --exclude "*" --include "*.html"
```

### Check SSL Certificate Status
```bash
aws acm describe-certificate --certificate-arn arn:aws:acm:us-east-1:941377129485:certificate/4989d5fa-34fb-477a-8482-a146339b74ce --region us-east-1 --query 'Certificate.Status' --output text
```

## 🌐 DNS Name Servers (Route 53)

Update at your domain registrar for **dreamsystech.com.au**:
```
ns-523.awsdns-01.net
ns-1034.awsdns-01.org
ns-1629.awsdns-11.co.uk
ns-119.awsdns-14.com
```

## 📦 AWS Resources

| Resource | ID/Value | Region |
|----------|----------|--------|
| S3 Bucket | `dreamsystech.com` | ap-southeast-2 |
| Hosted Zone | `Z0355417T7YN8UO6ADK9` | Global |
| SSL Certificate | `arn:aws:acm:us-east-1:941377129485:certificate/4989d5fa-34fb-477a-8482-a146339b74ce` | us-east-1 |

## 📚 Documentation Files

- **[GITHUB-SECRETS-SETUP.md](./GITHUB-SECRETS-SETUP.md)** - How to configure GitHub Actions
- **[CONTENT-UPDATE-GUIDE.md](./CONTENT-UPDATE-GUIDE.md)** - How to update website content
- **[DEPLOYMENT-STATUS.md](./DEPLOYMENT-STATUS.md)** - Current deployment status
- **[AWS-SETUP.md](./AWS-SETUP.md)** - AWS infrastructure setup
- **[README.md](./README.md)** - Project documentation

## ⚡ Workflow

### Update Website Content:
1. Edit JSON file in Google Drive
2. Push to GitHub (auto-deployment) **OR** run `npm run build` locally

### Manual Deployment:
1. `npm run fetch-content` - Fetch from Google Drive
2. `npm run build` - Build website
3. Deploy to S3 (commands above)

### Auto Deployment (GitHub Actions):
1. Add all GitHub secrets
2. Push to `main` branch
3. GitHub Actions handles everything automatically!

## 🎯 Current Status

- ✅ Google Drive content integration
- ✅ S3 deployment
- ✅ SSL certificate requested
- ✅ Route 53 hosted zone created
- ⏳ Waiting for DNS name server update
- ⏳ CloudFront distribution (pending SSL validation)

## 📞 Next Action

**Update domain name servers** at your registrar with the Route 53 name servers above!
