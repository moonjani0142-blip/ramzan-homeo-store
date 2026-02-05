# Ramzan Homeo. Store & Clinic - Medicine Supply Management System

A complete, modern, mobile-friendly web application for managing medicine supply business built with React, Node.js, Express, and MongoDB.

## 🌟 Features

### Admin Features
- **4-Level Admin System**: 1 Main Admin + 3 Sub-Admins
- **Dashboard**: Beautiful analytics with revenue charts, stats cards
- **User Management**: Create and manage medical store accounts
- **Inventory Management**: Track stock levels with low-stock alerts
- **Order Management**: Create orders for stores, track deliveries
- **Invoice System**: Generate professional PDF invoices with running balance
- **Product Management**: Organize by companies, add/edit/delete products
- **Potency Management**: Import from Excel or add manually
- **Cash Flow Tracking**: Revenue analytics and outstanding balances
- **Search Medicine**: Quick search with complete product info

### User Features  
- **Browse Products**: By company and category
- **Shopping Cart**: Add products and place orders
- **Order History**: Track order status
- **Download Invoices**: PDF format
- **Profile Management**: Update store details

### Invoice Features
- **Professional PDF Generation**: Company branding with logo
- **Running Balance System**: Previous balance + current bill
- **Credit System**: Overpayment automatically deducted from next invoice
- **Manual Payment Entry**: Add payments after delivery
- **Folder Organization**: Separate folder per store
- **File Naming**: `{InvoiceNumber}_{StoreName}.pdf`

## 🚀 Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: TailwindCSS with custom design system
- **Routing**: React Router v6
- **Backend**: Node.js + Express
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **PDF Generation**: PDFKit
- **Charts**: Recharts

## 📦 Installation

### Prerequisites
- Node.js 18+ and npm
- MongoDB 6+ (local or MongoDB Atlas)
- Git

### Step 1: Clone and Install

\`\`\`bash
# Clone or extract the project
cd medicine-supply-app

# Install all dependencies
npm run install-all

# This will install:
# - Root dependencies (concurrently, nodemon)
# - Client dependencies (React, Vite, TailwindCSS, etc.)
# - Server dependencies (Express, Mongoose, etc.)
\`\`\`

### Step 2: Environment Setup

Create `.env` file in the `server` directory:

\`\`\`env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/ramzan-homeo
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ramzan-homeo

# JWT Secret (generate a random string)
JWT_SECRET=your_super_secret_jwt_key_here_change_this

# JWT Expiry
JWT_EXPIRE=30d
\`\`\`

### Step 3: Start Development Servers

\`\`\`bash
# Start both frontend and backend concurrently
npm run dev

# Frontend will run on: http://localhost:3000
# Backend will run on: http://localhost:5000
\`\`\`

## 📱 Usage

### Default Admin Account
After first run, create main admin through registration or use:
- **Email**: admin@ramzanhomeo.com
- **Password**: admin123 (change after first login)

### Creating Sub-Admins (Main Admin Only)
1. Login as Main Admin
2. Go to "Admin Management"
3. Click "Create Sub-Admin"
4. Fill in details and save

### Creating Medical Store Accounts
**Option 1**: From Dashboard
1. Click "Create Store" quick action
2. Fill in store details
3. Save - credentials sent to store

**Option 2**: From User Management
1. Navigate to "User Management"
2. Click "Add New Store"
3. Complete registration form

### Adding Products
1. Go to "Products" section
2. Select or create company
3. Click "Add Product"
4. Fill details: Batch No., Name, Packing, Rate (Rs.), Quantity, Potency
5. Save

### Importing Potencies from Excel
1. Go to "Potency Range"
2. Click "Import from Excel"
3. Select your Excel file (.xlsx or .csv)
4. Preview and confirm import

### Creating Orders
1. Go to "Orders"
2. Click "Create New Order"
3. Select medical store
4. Add products (search and select)
5. Set delivery date
6. Generate order

### Generating Invoices
1. Go to "Invoices"
2. Select completed order OR create manual invoice
3. Review products and amounts
4. Edit discounts if needed
5. Add delivery charges
6. **Important**: Payment is added AFTER delivery
7. Generate PDF - saves as `{InvoiceNumber}_{StoreName}.pdf`

### Adding Past Invoices
1. Go to "Invoices"
2. Click "Add Past Invoice"
3. Enter old invoice data
4. Set custom invoice date
5. Save to store's folder

### Payment Handling
1. After medicine delivery, open invoice
2. Click "Add Payment"
3. Enter payment received amount
4. System automatically:
   - Calculates new balance
   - Credits overpayment to next invoice
   - Carries forward underpayment

## 🎨 Design System

### Colors
- **Primary**: Teal (#17a2b8) - Main brand color
- **Accent**: Gold (#ffb900) - Highlights
- **Success**: Green - Positive actions
- **Warning**: Yellow - Alerts
- **Danger**: Red - Errors

### Typography
- **Display**: Epilogue (headings)
- **Body**: DM Sans (content)
- **Mono**: JetBrains Mono (code, numbers)

### Components
- **Cards**: Rounded with shadow, hover effects
- **Buttons**: Gradient backgrounds, transform animations
- **Inputs**: 2px border, focus rings, rounded corners
- **Tables**: Responsive, hover states, pagination

## 📂 Project Structure

\`\`\`
medicine-supply-app/
├── client/                    # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/       # Reusable components
│   │   ├── context/          # React Context (Auth)
│   │   ├── layouts/          # Layout components
│   │   ├── pages/            # Page components
│   │   │   ├── admin/        # Admin pages
│   │   │   ├── auth/         # Login, Register
│   │   │   └── user/         # User pages
│   │   ├── App.jsx           # Main app component
│   │   ├── main.jsx          # React entry point
│   │   └── index.css         # Global styles
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
│
├── server/                    # Node.js backend
│   ├── models/               # Mongoose models
│   ├── routes/               # Express routes
│   ├── middleware/           # Auth, validation
│   ├── utils/                # Helpers (PDF, Excel)
│   ├── server.js             # Express app
│   └── package.json
│
├── invoices/                 # Generated invoices
│   ├── {StoreName}/          # Folder per store
│   │   └── *.pdf            # Invoice PDFs
│
├── package.json              # Root package.json
└── README.md                 # This file
\`\`\`

## 🔐 Security Features

- **JWT Authentication**: Secure token-based auth
- **Password Hashing**: bcrypt with salt
- **Role-Based Access**: Main Admin, Sub-Admin, User
- **Rate Limiting**: Prevent abuse
- **Input Validation**: Server-side validation
- **SQL Injection Prevention**: Mongoose parameterized queries
- **XSS Protection**: Helmet middleware
- **CORS**: Configured for security

## 🚀 Deployment

### Option 1: Replit (Easiest)
1. Push code to GitHub
2. Import in Replit
3. Set environment variables
4. Click "Deploy"
5. Get public URL

### Option 2: Vercel + Railway (Recommended)
**Frontend (Vercel)**:
1. Push to GitHub
2. Import in Vercel
3. Set build command: `cd client && npm run build`
4. Deploy

**Backend (Railway)**:
1. Push to GitHub
2. Import in Railway
3. Add MongoDB database
4. Set environment variables
5. Deploy

### Option 3: Self-Hosted
1. Install Node.js and MongoDB on server
2. Clone repository
3. Install dependencies
4. Configure .env
5. Run with PM2:
\`\`\`bash
npm install -g pm2
pm2 start server/server.js --name ramzan-homeo
pm2 startup
pm2 save
\`\`\`

## 📱 Mobile Access

The app is fully responsive and works on:
- **Desktop**: Full-featured dashboard
- **Tablet**: Optimized layout
- **Mobile**: Touch-friendly interface, hamburger menu

**To access on mobile**:
1. Make sure mobile is on same WiFi (development)
2. Get your PC's local IP (e.g., 192.168.1.100)
3. Open `http://192.168.1.100:3000` on mobile
4. Or use deployment URL for remote access

## 💾 Database Collections

- **users**: Medical stores and admins
- **products**: Medicine inventory
- **orders**: Customer orders
- **invoices**: Generated invoices with payments
- **potencies**: Homeopathic potency values
- **activity_logs**: Admin actions tracking

## 🛠️ Customization

### Company Branding
Edit in `/client/src/pages/auth/Login.jsx`:
- Company name
- Address
- Phone numbers
- Email
- Motto and tagline

### Colors
Edit in `/client/tailwind.config.js`:
- Primary color
- Accent color
- Other theme colors

### Invoice Template
Edit in `/server/utils/generatePDF.js`:
- Invoice layout
- Company logo
- Header/footer design

## 📞 Support & Contact

**Ramzan Homeo. Store & Clinic**
- Address: Faisal Bazaar Faqirwali, Tehsil Haroonabad, Dist. Bahawalnagar
- Phone: 0305-3253108, 0306-8436142
- Email: Ramzanhomeostoreclinic@gmail.com

**Motto**: "Life saving Homeopathic Medicine"  
**Tagline**: "YOUR HEALTH IS OUR PRIORITY"

## 📄 License

Copyright © 2026 Ramzan Homeo. Store & Clinic. All rights reserved.

---

**Built with ❤️ for Ramzan Homeo. Store & Clinic**
\`\`\`

This README provides complete documentation for installation, usage, and deployment of your application!
