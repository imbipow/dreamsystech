@echo off
REM AWS S3 and CloudFront Setup Script for DreamSys Technologies (Windows)
REM This script creates all necessary AWS resources for hosting your static website

echo ============================================
echo AWS SETUP FOR DREAMSYS TECHNOLOGIES
echo ============================================
echo.

REM ============================================
REM CONFIGURATION - EDIT THESE VALUES
REM ============================================

set BUCKET_NAME=dreamsystech.com
set AWS_REGION=ap-southeast-2
set FORM_EMAIL=your-email@example.com

echo Using configuration:
echo Bucket Name: %BUCKET_NAME%
echo AWS Region: %AWS_REGION%
echo Form Email: %FORM_EMAIL%
echo.
pause

REM ============================================
REM STEP 1: Create S3 Bucket
REM ============================================

echo.
echo [STEP 1] Creating S3 bucket...
echo.

aws s3api create-bucket --bucket %BUCKET_NAME% --region %AWS_REGION% --create-bucket-configuration LocationConstraint=%AWS_REGION%

if %errorlevel% neq 0 (
    echo ERROR: Failed to create bucket
    pause
    exit /b 1
)

echo.
echo SUCCESS: Bucket created
echo.

REM ============================================
REM STEP 2: Configure Website Hosting
REM ============================================

echo [STEP 2] Configuring static website hosting...
echo.

aws s3 website s3://%BUCKET_NAME%/ --index-document index.html --error-document 404.html

echo.
echo SUCCESS: Website hosting configured
echo.

REM ============================================
REM STEP 3: Disable Block Public Access
REM ============================================

echo [STEP 3] Disabling block public access...
echo.

aws s3api put-public-access-block --bucket %BUCKET_NAME% --public-access-block-configuration "BlockPublicAcls=false,IgnorePublicAcls=false,BlockPublicPolicy=false,RestrictPublicBuckets=false"

echo.
echo SUCCESS: Public access enabled
echo.

REM ============================================
REM STEP 4: Create Bucket Policy
REM ============================================

echo [STEP 4] Setting bucket policy...
echo.

(
echo {
echo     "Version": "2012-10-17",
echo     "Statement": [
echo         {
echo             "Sid": "PublicReadGetObject",
echo             "Effect": "Allow",
echo             "Principal": "*",
echo             "Action": "s3:GetObject",
echo             "Resource": "arn:aws:s3:::%BUCKET_NAME%/*"
echo         }
echo     ]
echo }
) > bucket-policy.json

aws s3api put-bucket-policy --bucket %BUCKET_NAME% --policy file://bucket-policy.json

echo.
echo SUCCESS: Bucket policy applied
echo.

REM ============================================
REM STEP 5: Request SSL Certificate
REM ============================================

echo [STEP 5] Requesting SSL certificate...
echo NOTE: Certificate is being created in us-east-1 (required for CloudFront)
echo.

for /f "tokens=*" %%i in ('aws acm request-certificate --domain-name %BUCKET_NAME% --subject-alternative-names "www.%BUCKET_NAME%" --validation-method DNS --region us-east-1 --query CertificateArn --output text') do set CERTIFICATE_ARN=%%i

echo.
echo SUCCESS: Certificate requested
echo Certificate ARN: %CERTIFICATE_ARN%
echo.
echo.
echo ========================================
echo IMPORTANT: VALIDATE YOUR CERTIFICATE!
echo ========================================
echo.
echo Run this command to see DNS validation records:
echo.
echo aws acm describe-certificate --certificate-arn %CERTIFICATE_ARN% --region us-east-1
echo.
echo Add the CNAME records to your domain's DNS settings.
echo Wait for validation to complete (can take 5-30 minutes).
echo.
pause

REM ============================================
REM STEP 6: Create CloudFront Distribution Config
REM ============================================

echo.
echo [STEP 6] Creating CloudFront configuration...
echo.

set S3_ENDPOINT=%BUCKET_NAME%.s3-website-%AWS_REGION%.amazonaws.com

(
echo {
echo     "CallerReference": "dreamsystech-%random%",
echo     "Comment": "DreamSys Technologies Website",
echo     "Enabled": true,
echo     "DefaultRootObject": "index.html",
echo     "Origins": {
echo         "Quantity": 1,
echo         "Items": [
echo             {
echo                 "Id": "S3-%BUCKET_NAME%",
echo                 "DomainName": "%S3_ENDPOINT%",
echo                 "CustomOriginConfig": {
echo                     "HTTPPort": 80,
echo                     "HTTPSPort": 443,
echo                     "OriginProtocolPolicy": "http-only"
echo                 }
echo             }
echo         ]
echo     },
echo     "DefaultCacheBehavior": {
echo         "TargetOriginId": "S3-%BUCKET_NAME%",
echo         "ViewerProtocolPolicy": "redirect-to-https",
echo         "AllowedMethods": {
echo             "Quantity": 2,
echo             "Items": ["GET", "HEAD"],
echo             "CachedMethods": {
echo                 "Quantity": 2,
echo                 "Items": ["GET", "HEAD"]
echo             }
echo         },
echo         "Compress": true,
echo         "ForwardedValues": {
echo             "QueryString": false,
echo             "Cookies": {
echo                 "Forward": "none"
echo             }
echo         },
echo         "MinTTL": 0,
echo         "DefaultTTL": 86400,
echo         "MaxTTL": 31536000,
echo         "TrustedSigners": {
echo             "Enabled": false,
echo             "Quantity": 0
echo         }
echo     },
echo     "CustomErrorResponses": {
echo         "Quantity": 1,
echo         "Items": [
echo             {
echo                 "ErrorCode": 404,
echo                 "ResponsePagePath": "/index.html",
echo                 "ResponseCode": "200",
echo                 "ErrorCachingMinTTL": 300
echo             }
echo         ]
echo     },
echo     "Aliases": {
echo         "Quantity": 2,
echo         "Items": ["%BUCKET_NAME%", "www.%BUCKET_NAME%"]
echo     },
echo     "ViewerCertificate": {
echo         "ACMCertificateArn": "%CERTIFICATE_ARN%",
echo         "SSLSupportMethod": "sni-only",
echo         "MinimumProtocolVersion": "TLSv1.2_2021"
echo     },
echo     "PriceClass": "PriceClass_All"
echo }
) > cloudfront-config.json

echo.
echo SUCCESS: CloudFront config saved to cloudfront-config.json
echo.
echo After certificate validation completes, run:
echo aws cloudfront create-distribution --distribution-config file://cloudfront-config.json
echo.

REM ============================================
REM STEP 7: Build and Upload Website
REM ============================================

echo.
echo [STEP 7] Building and uploading website...
echo.

REM Set environment variable
set NEXT_PUBLIC_FORM_EMAIL=%FORM_EMAIL%

echo Installing dependencies...
call npm install

echo Building website...
call npm run build

if %errorlevel% neq 0 (
    echo ERROR: Build failed
    pause
    exit /b 1
)

echo.
echo Uploading files to S3...
echo.

REM Upload non-HTML files with long cache
aws s3 sync ./out s3://%BUCKET_NAME% --delete --cache-control "max-age=31536000,public" --exclude "*.html" --exclude "404.html"

REM Upload HTML files with shorter cache
aws s3 sync ./out s3://%BUCKET_NAME% --delete --cache-control "max-age=3600,public" --exclude "*" --include "*.html"

echo.
echo SUCCESS: Files uploaded to S3
echo.

REM ============================================
REM OUTPUT SUMMARY
REM ============================================

echo.
echo ==========================================
echo           SETUP COMPLETE!
echo ==========================================
echo.
echo S3 Bucket: %BUCKET_NAME%
echo Region: %AWS_REGION%
echo Website URL: http://%S3_ENDPOINT%
echo Certificate ARN: %CERTIFICATE_ARN%
echo.
echo NEXT STEPS:
echo 1. Validate SSL certificate (check DNS records)
echo 2. Create CloudFront distribution (command shown above)
echo 3. Update domain DNS to point to CloudFront
echo 4. Add GitHub secrets for auto-deployment
echo.
echo Configuration files created:
echo - bucket-policy.json
echo - cloudfront-config.json
echo.
echo Save the Certificate ARN for later use!
echo ==========================================
echo.
pause
