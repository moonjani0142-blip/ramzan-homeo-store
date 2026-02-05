# Quick Start Guide - Ramzan Homeo. Store & Clinic

## ⚡ 5-Minute Setup

### 1. Install Dependencies
\`\`\`bash
npm run install-all
\`\`\`

### 2. Create .env File
Create `server/.env`:
\`\`\`
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ramzan-homeo
JWT_SECRET=change_this_to_a_random_secret_key
JWT_EXPIRE=30d
\`\`\`

### 3. Start Application
\`\`\`bash
npm run dev
\`\`\`

### 4. Access Application
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

### 5. Login
First time? Register as admin or create account.

## 📱 Mobile Access

### Same WiFi:
1. Find your PC IP: Run `ipconfig` (Windows) or `ifconfig` (Mac/Linux)
2. Use `http://YOUR_IP:3000` on mobile

### Internet Access (Deploy):
- Use Replit: Just click "Deploy" button
- OR deploy to Vercel (frontend) + Railway (backend)

## ✅ Checklist

- [ ] Node.js installed (v18+)
- [ ] MongoDB installed or use MongoDB Atlas
- [ ] Dependencies installed
- [ ] .env file created
- [ ] Application running
- [ ] Can access on browser

## 🆘 Common Issues

**Port already in use:**
\`\`\`bash
# Change PORT in server/.env to 5001 or 5002
\`\`\`

**MongoDB connection error:**
\`\`\`bash
# Make sure MongoDB is running
# OR use MongoDB Atlas free tier
\`\`\`

**Module not found:**
\`\`\`bash
# Delete node_modules and reinstall
rm -rf node_modules client/node_modules server/node_modules
npm run install-all
\`\`\`

## 🎯 Next Steps

1. Create main admin account
2. Add sub-admins
3. Create medical store accounts
4. Import potencies from Excel
5. Add products
6. Start creating orders!

## 📞 Need Help?

Check README.md for complete documentation.

---
**Ramzan Homeo. Store & Clinic** - Life saving Homeopathic Medicine
