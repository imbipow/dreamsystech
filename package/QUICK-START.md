# Quick Start Guide

## Setup (5 minutes)

1. **Set your email address:**
   ```bash
   cp .env.local.example .env.local
   ```
   Edit `.env.local` and replace with your email:
   ```
   NEXT_PUBLIC_FORM_EMAIL=your-email@example.com
   ```

2. **Install and build:**
   ```bash
   npm install
   npm run build
   ```

3. **Deploy to S3:**
   - The `out` folder contains your static website
   - Upload it to your S3 bucket (see DEPLOYMENT.md for details)

## Test Locally First

```bash
npm run dev
```
Visit http://localhost:3000 and test the forms.

## Important: Activate Email Service

The **first time** a form is submitted, you'll receive an activation email from FormSubmit.co. **You MUST click the confirmation link** to activate email delivery!

## Files Changed

- `next.config.mjs` - Configured for static export
- `src/components/DreamSys/AuditForm/index.tsx` - Now sends emails
- `src/components/Contact/Form/index.tsx` - Now sends emails
- `.env.local` - Your email configuration (create this file!)

## Need Help?

See DEPLOYMENT.md for full deployment guide.
