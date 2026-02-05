# Deployment Guide - Ramzan Homeo. Store & Clinic

## 🌐 Deploy to Replit (Recommended for Testing)

### Step 1: Prepare Repository
1. Push code to GitHub (or use Replit's import)
2. Make sure all files are committed

### Step 2: Import to Replit
1. Go to replit.com
2. Click "Create Repl"
3. Select "Import from GitHub"
4. Choose your repository
5. Select Node.js as language

### Step 3: Configure Environment
In Replit, go to "Secrets" (lock icon) and add:
```
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_random_secret_key
PORT=5000
```

### Step 4: Install and Run
Replit will auto-detect and install dependencies.
Click "Run" button.

### Step 5: Deploy
1. Click "Deploy" button at top
2. Choose deployment tier
3. Get public URL (e.g., https://your-app.replit.app)

## 🚀 Deploy to Production (Vercel + Railway)

### Frontend on Vercel

1. **Push to GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Import to Vercel**
   - Go to vercel.com
   - Click "New Project"
   - Import your GitHub repo
   - Framework: Vite
   - Root Directory: `client`
   - Build Command: `npm run build`
   - Output Directory: `dist`

3. **Environment Variables**
```
VITE_API_URL=https://your-backend-url.railway.app
```

4. **Deploy**
   - Click "Deploy"
   - Get URL: https://your-app.vercel.app

### Backend on Railway

1. **Create Railway Project**
   - Go to railway.app
   - Click "New Project"
   - Select "Deploy from GitHub repo"

2. **Add MongoDB**
   - Click "New"
   - Select "Database" → "MongoDB"
   - Copy connection string

3. **Configure Backend**
   - Select your repo
   - Root Directory: `server`
   - Add environment variables:
```
MONGODB_URI=your_railway_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
FRONTEND_URL=https://your-app.vercel.app
```

4. **Deploy**
   - Railway auto-deploys
   - Get URL: https://your-backend.railway.app

5. **Update Frontend**
   - Go back to Vercel
   - Update `VITE_API_URL` with Railway backend URL
   - Redeploy

## 💻 Self-Host on VPS

### Requirements
- Ubuntu 20.04+ server
- Node.js 18+
- MongoDB
- Nginx (for reverse proxy)

### Setup Steps

1. **Install Dependencies**
```bash
sudo apt update
sudo apt install -y nodejs npm mongodb nginx
```

2. **Clone Repository**
```bash
git clone your-repo-url
cd medicine-supply-app
npm run install-all
```

3. **Configure Environment**
```bash
cd server
nano .env
# Add your environment variables
```

4. **Build Frontend**
```bash
cd ../client
npm run build
```

5. **Setup PM2 (Process Manager)**
```bash
sudo npm install -g pm2
cd ../server
pm2 start server.js --name ramzan-homeo
pm2 startup
pm2 save
```

6. **Configure Nginx**
```bash
sudo nano /etc/nginx/sites-available/ramzan-homeo
```

Add:
```nginx
server {
    listen 80;
    server_name your-domain.com;

    # Frontend
    location / {
        root /path/to/medicine-supply-app/client/dist;
        try_files $uri /index.html;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

7. **Enable Site**
```bash
sudo ln -s /etc/nginx/sites-available/ramzan-homeo /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

8. **Setup SSL (Optional but Recommended)**
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

## 📱 Mobile App (PWA)

The app is already configured as a Progressive Web App (PWA).

### Install on Mobile
1. Open app URL in mobile browser
2. Tap "Add to Home Screen" (Chrome/Safari)
3. App icon appears on home screen
4. Works offline!

## 🔒 Security Checklist

- [ ] Change default JWT_SECRET
- [ ] Use strong MongoDB password
- [ ] Enable HTTPS/SSL
- [ ] Set CORS allowed origins
- [ ] Enable rate limiting
- [ ] Regular backups
- [ ] Monitor error logs
- [ ] Keep dependencies updated

## 📊 Monitoring

### Logs
```bash
# PM2 logs
pm2 logs ramzan-homeo

# Nginx logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

### Performance
- Use Railway/Vercel built-in analytics
- Setup error tracking (Sentry)
- Monitor database performance

## 💾 Backup Strategy

### Database Backup
```bash
# MongoDB dump
mongodump --db ramzan-homeo --out /backups/$(date +%Y%m%d)

# Automated daily backup
0 2 * * * mongodump --db ramzan-homeo --out /backups/$(date +\%Y\%m\%d)
```

### Invoice Files Backup
```bash
# Copy invoices folder
rsync -av invoices/ /backups/invoices/
```

---

**🎉 Your app is now live and accessible from anywhere!**
