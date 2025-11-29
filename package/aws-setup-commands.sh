#!/bin/bash

# AWS S3 and CloudFront Setup Script for DreamSys Technologies
# This script creates all necessary AWS resources for hosting your static website

# ============================================
# CONFIGURATION - EDIT THESE VALUES
# ============================================

# Your domain name (or choose a unique bucket name)
BUCKET_NAME="dreamsystech.com"

# AWS Region (choose closest to your customers)
# Common regions: us-east-1, us-west-2, ap-southeast-2 (Sydney), eu-west-1
AWS_REGION="ap-southeast-2"

# Your email for form submissions
FORM_EMAIL="your-email@example.com"

# ============================================
# STEP 1: Create S3 Bucket
# ============================================

echo "Creating S3 bucket: $BUCKET_NAME in region: $AWS_REGION"

# Create the bucket
aws s3api create-bucket \
    --bucket $BUCKET_NAME \
    --region $AWS_REGION \
    --create-bucket-configuration LocationConstraint=$AWS_REGION

# Note: For us-east-1, use this command instead (no LocationConstraint needed):
# aws s3api create-bucket --bucket $BUCKET_NAME --region us-east-1

echo "✅ Bucket created"

# ============================================
# STEP 2: Configure Bucket for Website Hosting
# ============================================

echo "Configuring static website hosting..."

aws s3 website s3://$BUCKET_NAME/ \
    --index-document index.html \
    --error-document 404.html

echo "✅ Website hosting configured"

# ============================================
# STEP 3: Disable Block Public Access
# ============================================

echo "Disabling block public access..."

aws s3api put-public-access-block \
    --bucket $BUCKET_NAME \
    --public-access-block-configuration \
    "BlockPublicAcls=false,IgnorePublicAcls=false,BlockPublicPolicy=false,RestrictPublicBuckets=false"

echo "✅ Public access enabled"

# ============================================
# STEP 4: Set Bucket Policy for Public Read
# ============================================

echo "Setting bucket policy for public read access..."

cat > bucket-policy.json <<EOF
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::${BUCKET_NAME}/*"
        }
    ]
}
EOF

aws s3api put-bucket-policy \
    --bucket $BUCKET_NAME \
    --policy file://bucket-policy.json

echo "✅ Bucket policy applied"

# ============================================
# STEP 5: Request SSL Certificate (ACM)
# ============================================

echo "Requesting SSL certificate from AWS Certificate Manager..."
echo "NOTE: Certificate MUST be created in us-east-1 for CloudFront!"

# Request certificate (must be in us-east-1 for CloudFront)
CERTIFICATE_ARN=$(aws acm request-certificate \
    --domain-name $BUCKET_NAME \
    --subject-alternative-names "www.$BUCKET_NAME" \
    --validation-method DNS \
    --region us-east-1 \
    --query CertificateArn \
    --output text)

echo "✅ Certificate requested: $CERTIFICATE_ARN"
echo ""
echo "⚠️  IMPORTANT: You need to validate this certificate!"
echo "Run this command to see DNS validation records:"
echo "aws acm describe-certificate --certificate-arn $CERTIFICATE_ARN --region us-east-1"
echo ""
echo "Add the CNAME records shown to your domain's DNS settings."
echo "Wait for validation before proceeding to CloudFront setup."
echo ""

# ============================================
# STEP 6: Create CloudFront Distribution
# ============================================

echo "Creating CloudFront distribution configuration..."

# Get the S3 website endpoint
S3_WEBSITE_ENDPOINT="${BUCKET_NAME}.s3-website-${AWS_REGION}.amazonaws.com"

cat > cloudfront-config.json <<EOF
{
    "CallerReference": "dreamsystech-$(date +%s)",
    "Comment": "DreamSys Technologies Website",
    "Enabled": true,
    "DefaultRootObject": "index.html",
    "Origins": {
        "Quantity": 1,
        "Items": [
            {
                "Id": "S3-${BUCKET_NAME}",
                "DomainName": "${S3_WEBSITE_ENDPOINT}",
                "CustomOriginConfig": {
                    "HTTPPort": 80,
                    "HTTPSPort": 443,
                    "OriginProtocolPolicy": "http-only"
                }
            }
        ]
    },
    "DefaultCacheBehavior": {
        "TargetOriginId": "S3-${BUCKET_NAME}",
        "ViewerProtocolPolicy": "redirect-to-https",
        "AllowedMethods": {
            "Quantity": 2,
            "Items": ["GET", "HEAD"],
            "CachedMethods": {
                "Quantity": 2,
                "Items": ["GET", "HEAD"]
            }
        },
        "Compress": true,
        "ForwardedValues": {
            "QueryString": false,
            "Cookies": {
                "Forward": "none"
            }
        },
        "MinTTL": 0,
        "DefaultTTL": 86400,
        "MaxTTL": 31536000,
        "TrustedSigners": {
            "Enabled": false,
            "Quantity": 0
        }
    },
    "CustomErrorResponses": {
        "Quantity": 1,
        "Items": [
            {
                "ErrorCode": 404,
                "ResponsePagePath": "/index.html",
                "ResponseCode": "200",
                "ErrorCachingMinTTL": 300
            }
        ]
    },
    "Aliases": {
        "Quantity": 2,
        "Items": ["${BUCKET_NAME}", "www.${BUCKET_NAME}"]
    },
    "ViewerCertificate": {
        "ACMCertificateArn": "${CERTIFICATE_ARN}",
        "SSLSupportMethod": "sni-only",
        "MinimumProtocolVersion": "TLSv1.2_2021"
    },
    "PriceClass": "PriceClass_All"
}
EOF

echo "⏸️  CloudFront distribution config created at cloudfront-config.json"
echo ""
echo "To create the distribution (after SSL certificate is validated), run:"
echo "aws cloudfront create-distribution --distribution-config file://cloudfront-config.json"
echo ""

# ============================================
# STEP 7: Build and Upload Your Website
# ============================================

echo "Building website..."

# Set environment variable
export NEXT_PUBLIC_FORM_EMAIL=$FORM_EMAIL

# Install dependencies and build
npm install
npm run build

echo "✅ Website built"

echo "Uploading files to S3..."

aws s3 sync ./out s3://$BUCKET_NAME \
    --delete \
    --cache-control "max-age=31536000,public" \
    --exclude "*.html" \
    --exclude "404.html"

# Upload HTML files with shorter cache
aws s3 sync ./out s3://$BUCKET_NAME \
    --delete \
    --cache-control "max-age=3600,public" \
    --exclude "*" \
    --include "*.html"

echo "✅ Files uploaded to S3"

# ============================================
# OUTPUT SUMMARY
# ============================================

echo ""
echo "=========================================="
echo "           SETUP COMPLETE!                "
echo "=========================================="
echo ""
echo "S3 Bucket: $BUCKET_NAME"
echo "Region: $AWS_REGION"
echo "Website URL: http://${S3_WEBSITE_ENDPOINT}"
echo "Certificate ARN: $CERTIFICATE_ARN"
echo ""
echo "NEXT STEPS:"
echo "1. Validate SSL certificate (add DNS records)"
echo "2. Create CloudFront distribution (command shown above)"
echo "3. Update your domain's DNS to point to CloudFront"
echo "4. Add GitHub secrets for auto-deployment"
echo ""
echo "=========================================="
