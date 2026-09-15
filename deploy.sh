#!/bin/bash

# Auto-deploy script - German at root, no prompts
# Server: cPanel shared hosting. Shell access is NOT enabled on this account,
# so uploads go over pure SFTP (lftp) instead of rsync-over-ssh.
SERVER_HOST="pintaro-cpanel"
SERVER_PATH="/home/pintaro/public_html"

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}═══════════════════════════════════════════${NC}"
echo -e "${YELLOW}   🚀 AUTO-DEPLOY PINTARO.CH${NC}"
echo -e "${BLUE}═══════════════════════════════════════════${NC}"
echo ""

# 1. Build
echo -e "${GREEN}📦 Building Next.js...${NC}"
npm run build
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Build failed!${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Build successful!${NC}"

# 2. Prepare files - German at root
echo -e "${GREEN}📁 Preparing files (German as root)...${NC}"
rm -rf deploy-temp
mkdir -p deploy-temp

# Copy everything from out directory
cp -r out/* deploy-temp/
cp -r out/.* deploy-temp/ 2>/dev/null

# Create redirect for /de to root
mkdir -p deploy-temp/de
cat > deploy-temp/de/index.html << 'REDIR'
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="refresh" content="0; url=/">
  <link rel="canonical" href="/">
</head>
<body>
  <script>window.location.href = "/";</script>
</body>
</html>
REDIR

# Create .htaccess for proper routing
cat > deploy-temp/.htaccess << 'EOF'
# .htaccess for pintaro.ch - German at root
RewriteEngine On

# Force HTTPS
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}/$1 [R=301,L]

# Handle HTML files without extension
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_FILENAME}\.html -f
RewriteRule ^(.*)$ $1.html [L]

# Handle trailing slashes
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_FILENAME}/index.html -f
RewriteRule ^(.*)$ $1/index.html [L]

# Custom 404 page
ErrorDocument 404 /404.html

# Security headers
<IfModule mod_headers.c>
    Header set X-Content-Type-Options "nosniff"
    Header set X-Frame-Options "SAMEORIGIN"
    Header set X-XSS-Protection "1; mode=block"
    Header set Referrer-Policy "strict-origin-when-cross-origin"
</IfModule>

# Compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/css text/javascript application/javascript application/json
</IfModule>

# Caching
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/svg+xml "access plus 1 year"
    ExpiresByType text/css "access plus 1 month"
    ExpiresByType application/javascript "access plus 1 month"
    ExpiresByType text/html "access plus 1 hour"
</IfModule>
EOF

# 3. Upload via SFTP (lftp mirror --reverse --delete)
# No shell access on the account, so rsync-over-ssh cannot run there;
# lftp's sftp backend syncs using the SFTP protocol only.
# Commands go through -f (a script file) rather than -e: multi-line -e strings
# were observed to silently no-op ("mirror: Not connected") in this environment.
echo -e "${GREEN}📤 Uploading files (SFTP mirror)...${NC}"
LFTP_SCRIPT=$(mktemp)
cat > "$LFTP_SCRIPT" << LFTPEOF
set sftp:connect-program ssh
set sftp:auto-confirm yes
set mirror:parallel-transfer-count 4
open sftp://${SERVER_HOST}
mirror --reverse --delete --verbose --exclude-glob '.well-known/' --exclude-glob 'cgi-bin/' --exclude-glob 'cp_errordocument.shtml' --exclude-glob '4??.shtml' --exclude-glob '5??.shtml' --exclude-glob '.htaccess' deploy-temp/ ${SERVER_PATH}/
bye
LFTPEOF
lftp -f "$LFTP_SCRIPT"
LFTP_EXIT=$?
rm -f "$LFTP_SCRIPT"

if [ $LFTP_EXIT -eq 0 ]; then
    # 4. Upload .htaccess separately (excluded above so mirror --delete never touches it)
    echo -e "${GREEN}📤 Uploading .htaccess...${NC}"
    LFTP_SCRIPT=$(mktemp)
    cat > "$LFTP_SCRIPT" << LFTPEOF
set sftp:connect-program ssh
set sftp:auto-confirm yes
open sftp://${SERVER_HOST}
put deploy-temp/.htaccess -o ${SERVER_PATH}/.htaccess
bye
LFTPEOF
    lftp -f "$LFTP_SCRIPT"
    rm -f "$LFTP_SCRIPT"

    # Permissions: lftp mirror sets remote perms to match the local source by
    # default (755 dirs / 644 files here, via umask) — no separate chmod pass needed.

    # Cleanup
    rm -rf deploy-temp

    echo ""
    echo -e "${GREEN}═══════════════════════════════════════════${NC}"
    echo -e "${GREEN}✅ DEPLOYMENT SUCCESSFUL!${NC}"
    echo -e "${GREEN}═══════════════════════════════════════════${NC}"
    echo ""
    echo -e "${BLUE}🇩🇪 ${NC}https://pintaro.ch (Deutsch)"
    echo -e "${BLUE}🇬🇧 ${NC}https://pintaro.ch/en (English)"
    echo -e "${BLUE}🇮🇹 ${NC}https://pintaro.ch/it (Italiano)"
    echo -e "${BLUE}🚫 ${NC}https://pintaro.ch/404test (404 Page)"
    echo ""
else
    echo -e "${RED}❌ Upload failed!${NC}"
    rm -rf deploy-temp
    exit 1
fi