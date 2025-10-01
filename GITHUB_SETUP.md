# GitHub Repository Setup Guide

This guide will help you create a GitHub repository under the hyperstonekorea organization and connect your local hyperstone-website project.

## Step 1: Create GitHub Repository in Organization

1. Go to [GitHub.com](https://github.com) and sign in to your account
2. Navigate to the hyperstonekorea organization: https://github.com/hyperstonekorea
3. Click the "New" button or "+" icon and select "New repository"
4. Fill in the repository details:
   - **Owner**: Select `hyperstonekorea` from the dropdown
   - **Repository name**: `hyperstone-website`
   - **Description**: `HYPERSTONE company website - Professional construction and concrete solutions with DULITE products`
   - **Visibility**: Choose Public or Private based on your preference
   - **DO NOT** initialize with README, .gitignore, or license (since we already have a local repository)
5. Click "Create repository"

## Step 2: Connect Local Repository to GitHub

The local repository is already configured with the remote origin. After creating the repository on GitHub, run:

```bash
# Navigate to your project directory (if not already there)
cd hyperstone-website

# Push your code to GitHub
git push -u origin main
```

The remote origin is already set to: `https://github.com/hyperstonekorea/hyperstone-website.git`

## Step 3: Verify the Connection

After pushing, you should see all your files on GitHub. The repository should contain:
- Complete Next.js 14 application
- All components and pages
- Configuration files
- Documentation

## Step 4: Optional - Set Up Branch Protection Rules

To protect your main branch:

1. Go to your repository on GitHub
2. Click on "Settings" tab
3. Click on "Branches" in the left sidebar
4. Click "Add rule" next to "Branch protection rules"
5. Configure the following settings:
   - **Branch name pattern**: `main`
   - ✅ **Require a pull request before merging**
   - ✅ **Require status checks to pass before merging**
   - ✅ **Require branches to be up to date before merging**
   - ✅ **Include administrators** (optional)

## Next Steps

Once your repository is set up on GitHub, you can:
1. Set up Vercel deployment by connecting your GitHub repository
2. Configure automated deployments on push to main branch
3. Set up environment variables in your deployment platform

## Repository Structure

Your repository now contains:
```
hyperstone-website/
├── src/                    # Source code
├── public/                 # Static assets
├── messages/              # Internationalization files
├── config/                # Configuration files
├── .env.example           # Environment variables template
├── package.json           # Dependencies
├── tailwind.config.ts     # Tailwind configuration
├── next.config.ts         # Next.js configuration
└── README.md              # Project documentation
```

## Important Files to Review

Before deployment, make sure to:
1. Update `.env.local` with your actual environment variables
2. Review `config/admin-settings.json` for admin panel settings
3. Check `CONTACT_FORM_SETUP.md` for email configuration instructions