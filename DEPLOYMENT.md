# 3S Pets - VPS Deployment Guide

## Overview
This guide covers deploying the 3S Pets full-stack application to a Hostinger VPS.

**VPS Details:**
- SSH: `root@72.61.112.194`
- Backend: Node.js/Express on port 8125
- Frontend: Static files served by Nginx
- Domain: threespets.com (to be configured)

---

## Prerequisites
- SSH access to VPS: `ssh root@72.61.112.194`
- Domain name pointing to VPS IP
- Git installed on local machine

---

## Step 1: Connect to VPS and Verify Environment

```bash
# Connect to VPS
ssh root@72.61.112.194

# Check existing installations
node --version
npm --version
git --version
nginx -v
```

**Expected Versions:**
- Node.js: v18+ or v20+
- npm: v9+ or v10+
- git: v2+

---

## Step 2: Install Required Dependencies (if missing)

```bash
# Update system packages
apt update && apt upgrade -y

# Install Node.js (if not installed)
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs

# Install PM2 (process manager)
npm install -g pm2

# Install Nginx (if not installed)
apt install -y nginx

# Install Git (if not installed)
apt install -y git

# Verify installations
node --version
npm --version
pm2 --version
nginx -v
git --version
```

---

## Step 3: Transfer Project Files to VPS

### Option A: Using SCP (Recommended for initial deployment)

```bash
# On your local machine, navigate to project directory
cd /Users/himanshudhande/develop/3S-Pets/3S-Pets

# Create deployment directory on VPS
ssh root@72.61.112.194 "mkdir -p /var/www/3spets"

# Copy entire project to VPS
scp -r . root@72.61.112.194:/var/www/3spets/
```

### Option B: Using Git (Recommended for ongoing updates)

```bash
# On VPS - Initialize git repo
cd /var/www/3spets
git init

# On your local machine - add VPS as remote
cd /Users/himanshudhande/develop/3S-Pets/3S-Pets
git remote add vps root@72.61.112.194:/var/www/3spets

# Push to VPS
git push vps main
```

---

## Step 4: Configure Backend Environment Variables

```bash
# On VPS
cd /var/www/3spets/backend

# Create .env file
nano .env
```

**Paste the following configuration:**

```env
# 3S PETS - Backend Environment Variables
PORT=8125

# Hostinger SMTP Configuration
EMAIL_USER=info@threespets.com
EMAIL_PASS=3Spetspvtltd@2026

# Environment Control
NODE_ENV=production

# Security Configuration
# UPDATE THIS to your actual domain once DNS propagates
ALLOWED_ORIGINS=https://threespets.com,http://threespets.com

# Lead Destination
CLIENT_EMAIL=piyushmahale286@gmail.com

# Admin Configuration
ADMIN_PASS=pets3sadmin2026
```

**Save and exit:** `Ctrl+X`, then `Y`, then `Enter`

---

## Step 5: Install Backend Dependencies

```bash
# On VPS
cd /var/www/3spets/backend

# Install dependencies
npm install

# Test backend locally (optional)
node app.js
# Press Ctrl+C to stop after verifying it starts
```

---

## Step 6: Set Up PM2 for Process Management

```bash
# Start backend with PM2
cd /var/www/3spets/backend
pm2 start app.js --name "3spets-backend"

# Configure PM2 to start on system boot
pm2 startup
# Follow the instructions provided by PM2

# Save PM2 process list
pm2 save

# Check PM2 status
pm2 status
pm2 logs 3spets-backend
```

---

## Step 7: Configure Nginx

```bash
# Create Nginx configuration file
nano /etc/nginx/sites-available/3spets
```

**Paste the following configuration:**

```nginx
server {
    listen 80;
    server_name threespets.com www.threespets.com;

    # Frontend - Serve static files
    location / {
        root /var/www/3spets;
        index index.html;
        try_files $uri $uri/ /index.html;
    }

    # Backend API - Proxy to Node.js
    location /api/ {
        proxy_pass http://localhost:8125;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/javascript application/json;
}
```

**Save and exit:** `Ctrl+X`, then `Y`, then `Enter`

```bash
# Enable the site
ln -s /etc/nginx/sites-available/3spets /etc/nginx/sites-enabled/

# Remove default Nginx site (optional)
rm /etc/nginx/sites-enabled/default

# Test Nginx configuration
nginx -t

# Restart Nginx
systemctl restart nginx
systemctl enable nginx
```

---

## Step 8: Update Frontend API URL

```bash
# On VPS, edit the frontend API configuration
nano /var/www/3spets/js/api.js
```

**Verify line 2-4 uses dynamic hostname detection:**

```javascript
const API_BASE_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:8125/api/v1'
    : `${window.location.protocol}//${window.location.hostname}/api/v1`;
```

**Save and exit:** `Ctrl+X`, then `Y`, then `Enter`

---

## Step 9: Configure Firewall (UFW)

```bash
# Allow SSH
ufw allow 22/tcp

# Allow HTTP
ufw allow 80/tcp

# Allow HTTPS
ufw allow 443/tcp

# Enable firewall
ufw enable

# Check status
ufw status
```

---

## Step 10: Configure SSL/HTTPS with Let's Encrypt

```bash
# Install Certbot
apt install -y certbot python3-certbot-nginx

# Obtain SSL certificate
certbot --nginx -d threespets.com -d www.threespets.com

# Follow the prompts to:
# - Enter email for renewal notices
# - Agree to terms
# - Choose whether to redirect HTTP to HTTPS (recommended: Yes)

# Certbot will automatically update Nginx configuration
```

**Verify SSL renewal is set up:**

```bash
# Check certbot timer
systemctl status certbot.timer

# Test renewal
certbot renew --dry-run
```

---

## Step 11: Final Testing

```bash
# Check PM2 status
pm2 status

# Check Nginx status
systemctl status nginx

# Check backend logs
pm2 logs 3spets-backend

# Test backend health endpoint
curl http://localhost:8125/
```

**Test from your browser:**
1. Visit: `http://72.61.112.194`
2. Visit: `https://threespets.com` (after DNS propagation)
3. Test contact form submission
4. Test product catalog
5. Test newsletter subscription
6. Test review submission
7. Access admin portal (password: pets3sadmin2026)

---

## Step 12: DNS Configuration

**In your domain registrar (e.g., GoDaddy, Namecheap):**

```
Type: A Record
Name: @
Value: 72.61.112.194
TTL: 3600

Type: A Record
Name: www
Value: 72.61.112.194
TTL: 3600
```

**Wait for DNS propagation** (can take 24-48 hours, usually much faster)

---

## Ongoing Maintenance

### View Backend Logs
```bash
pm2 logs 3spets-backend
```

### Restart Backend
```bash
pm2 restart 3spets-backend
```

### Update Application
```bash
# On local machine - make changes
git add .
git commit -m "Update description"
git push vps main

# On VPS - pull changes
cd /var/www/3spets
git pull vps main

# If backend dependencies changed
cd backend
npm install
pm2 restart 3spets-backend
```

### Update SSL Certificate
```bash
# Certbot auto-renews, but you can manually renew
certbot renew
```

---

## Troubleshooting

### Backend not starting
```bash
# Check logs
pm2 logs 3spets-backend

# Check if port 8125 is in use
netstat -tlnp | grep 8125

# Kill process if needed
kill -9 <PID>
```

### Nginx 502 Bad Gateway
```bash
# Check if backend is running
pm2 status

# Check Nginx error logs
tail -f /var/log/nginx/error.log

# Restart Nginx
systemctl restart nginx
```

### Permission issues
```bash
# Fix file permissions
chown -R www-data:www-data /var/www/3spets
chmod -R 755 /var/www/3spets
```

### Email not sending
```bash
# Check backend logs for email errors
pm2 logs 3spets-backend

# Verify Gmail App Password is correct in .env
nano /var/www/3spets/backend/.env
```

---

## Security Checklist

- [ ] Change ADMIN_PASS to a strong password
- [ ] Ensure firewall is enabled
- [ ] SSL certificate is active
- [ ] Regular security updates: `apt update && apt upgrade -y`
- [ ] Monitor logs regularly
- [ ] Set up automated backups
- [ ] Disable root SSH login (create separate user)
- [ ] Configure SSH key authentication

---

## Contact & Support

**VPS IP:** 72.61.112.194
**Domain:** threespets.com
**Backend Port:** 8125
**Admin Password:** pets3sadmin2026

For issues, check:
1. PM2 logs: `pm2 logs 3spets-backend`
2. Nginx logs: `/var/log/nginx/error.log`
3. System logs: `journalctl -xe`
