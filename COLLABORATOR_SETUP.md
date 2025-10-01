# GitHub Collaborator Setup Guide

This guide explains how to give access to the `hustlingup` user for the `hyperstonekorea/hyperstone-website` repository.

## Method 1: Add as Repository Collaborator (Recommended)

### Step-by-Step Instructions:

1. **Navigate to Repository Settings**:
   - Go to https://github.com/hyperstonekorea/hyperstone-website
   - Click the "Settings" tab (you need admin access)

2. **Access Manage Access**:
   - In the left sidebar, click "Manage access"
   - You'll see current collaborators and permissions

3. **Invite Collaborator**:
   - Click the "Invite a collaborator" button
   - Enter username: `hustlingup`
   - Click "Select a collaborator above"

4. **Set Permission Level**:
   Choose the appropriate permission level:
   
   - **Read** 📖: Can view and clone the repository
     - View code, issues, and pull requests
     - Clone and fork the repository
   
   - **Triage** 🔧: Can manage issues and pull requests
     - Everything in Read
     - Manage issues and pull requests
     - Apply labels and assign people
   
   - **Write** ✏️: Can push to the repository (Recommended for developers)
     - Everything in Triage
     - Push to repository
     - Create branches and make commits
     - Merge pull requests
   
   - **Maintain** 🛠️: Can manage repository settings
     - Everything in Write
     - Manage repository settings
     - Manage webhooks and deploy keys
   
   - **Admin** 👑: Full access to the repository
     - Everything in Maintain
     - Add/remove collaborators
     - Delete repository

5. **Send Invitation**:
   - Click "Add [hustlingup] to this repository"
   - GitHub will send an email invitation to the user

### Recommended Permission Level:
For a developer working on the HYPERSTONE website, **Write** permission is recommended as it allows:
- Pushing code changes
- Creating and merging pull requests
- Managing branches
- But doesn't allow changing repository settings

## Method 2: Add to Organization (Alternative)

If you want to give broader access across all hyperstonekorea repositories:

1. **Navigate to Organization**:
   - Go to https://github.com/hyperstonekorea
   - Click the "People" tab

2. **Invite Member**:
   - Click "Invite member"
   - Enter username: `hustlingup`
   - Choose role:
     - **Member**: Standard access to organization repositories
     - **Owner**: Full administrative access (not recommended)

3. **Send Invitation**:
   - Click "Send invitation"
   - User will receive email to join organization

## Verification Steps

After adding the collaborator:

1. **Check Access**:
   - The user should appear in Settings > Manage access
   - They should receive an email invitation

2. **Test Access**:
   - Ask `hustlingup` to visit the repository
   - They should be able to clone/fork based on permissions
   - If given Write access, they can push changes

## Managing Existing Collaborators

To modify or remove collaborators:

1. Go to repository Settings > Manage access
2. Find the collaborator in the list
3. Click the gear icon next to their name
4. Choose "Change role" or "Remove"

## Security Best Practices

- **Principle of Least Privilege**: Give minimum necessary permissions
- **Regular Review**: Periodically review collaborator access
- **Use Teams**: For multiple collaborators, consider creating teams
- **Branch Protection**: Set up branch protection rules for main branch

## Troubleshooting

### User Can't Accept Invitation
- Check if username is correct: `hustlingup`
- Ensure they have a GitHub account
- Check their email (including spam folder)
- Resend invitation if needed

### User Can't Push Code
- Verify they have Write permissions or higher
- Check if branch protection rules are blocking
- Ensure they're pushing to correct repository

### Permission Issues
- Only repository admins can add collaborators
- Organization owners can manage all repositories
- Check your own permission level first

## Repository Information

- **Repository**: hyperstonekorea/hyperstone-website
- **URL**: https://github.com/hyperstonekorea/hyperstone-website
- **Main Branch**: main
- **Recommended Permission for Developers**: Write

## Next Steps After Adding Collaborator

1. **Share Repository Information**:
   - Repository URL
   - Branch structure (main branch)
   - Development workflow

2. **Provide Documentation**:
   - Share setup instructions
   - Environment variables needed
   - Deployment process

3. **Set Up Development Environment**:
   - Clone repository
   - Install dependencies
   - Configure local environment