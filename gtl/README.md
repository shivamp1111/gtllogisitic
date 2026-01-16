# Gateway Trans Logistic (GTL) - Modern React Application v2.0

A cutting-edge React-based logistics management system with modern UI, animations, and advanced features.

## ✨ Features

### 🎨 Modern UI/UX
- **Dark Mode Toggle** - Switch between light and dark themes
- **Smooth Animations** - Powered by Framer Motion
- **Responsive Design** - Works perfectly on all devices
- **Modern Color Scheme** - Beautiful gradients and professional styling

### 📦 Core Features
- 🏠 **Home Page** - Company information with animated statistics
- 📦 **Booking System** - Advanced inquiry form with validation
- 📍 **Real-time Tracking** - Enhanced tracking with Firebase
- 🏢 **Branch Locations** - Interactive branch map
- 📞 **Contact** - Multiple contact options with animations
- ✨ **Features Page** - Comprehensive service showcase
- 💼 **Why Us** - Detailed company advantages
- ℹ️ **About Us** - Company history and values

### 👨‍💼 Advanced Admin Panel
- **Secure Authentication** - Login system with session management
- **Dashboard Analytics** - Visual charts and statistics
- **Shipment Management** - Add, Edit, Delete shipments
- **Search & Filter** - Advanced filtering capabilities
- **Export to CSV** - Download shipment data
- **Real-time Updates** - Live data synchronization
- **Status Tracking** - Multiple status types

## 🚀 Tech Stack

- **React 18** - Latest React with hooks
- **React Router v6** - Client-side routing
- **Firebase Realtime Database** - Backend for tracking
- **Framer Motion** - Smooth animations
- **Tailwind CSS** - Utility-first styling
- **Recharts** - Beautiful charts and analytics
- **React Icons** - Icon library
- **Vite** - Fast build tool
- **date-fns** - Date formatting

## 📦 Installation

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## 🔐 Admin Access

**Default Credentials:**
- **Email:** `admin@gtl.com`
- **Password:** `admin123`

⚠️ **Important:** Change these in `src/context/AuthContext.jsx` before production!

## 🎯 Key Improvements from v1.0

1. **Modern UI** - Complete redesign with gradients and animations
2. **Dark Mode** - Full dark mode support with theme persistence
3. **Advanced Admin** - Analytics dashboard with charts
4. **Export Feature** - CSV export functionality
5. **Better UX** - Loading states, error handling, smooth transitions
6. **Enhanced Tracking** - Better status visualization
7. **Search & Filter** - Advanced filtering in admin panel
8. **Responsive** - Better mobile experience
9. **Error Boundaries** - Graceful error handling
10. **Performance** - Optimized with code splitting

## 📁 Project Structure

```
gtl/
├── src/
│   ├── components/       # Reusable components
│   │   ├── Header.jsx    # Header with dark mode toggle
│   │   ├── Sidebar.jsx   # Navigation sidebar
│   │   ├── Footer.jsx    # Footer with contacts
│   │   ├── Layout.jsx    # Main layout wrapper
│   │   └── ErrorBoundary.jsx
│   ├── pages/            # Page components
│   │   ├── Home.jsx
│   │   ├── Booking.jsx
│   │   ├── Tracking.jsx
│   │   ├── Branches.jsx
│   │   ├── Contact.jsx
│   │   ├── WhyUs.jsx
│   │   ├── About.jsx
│   │   ├── Features.jsx
│   │   └── Admin.jsx    # Advanced admin dashboard
│   ├── context/          # React contexts
│   │   ├── AuthContext.jsx
│   │   └── ThemeContext.jsx
│   ├── firebase/         # Firebase config
│   │   └── config.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── tailwind.config.js
├── vite.config.js
└── package.json
```

## 🎨 Customization

### Change Colors
Edit `tailwind.config.js` to customize the color scheme.

### Change Admin Credentials
Edit `src/context/AuthContext.jsx`:
```javascript
const ADMIN_EMAIL = 'your-email@example.com';
const ADMIN_PASSWORD = 'your-password';
```

### Firebase Configuration
Update `src/firebase/config.js` with your Firebase credentials.

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## 🚀 Deployment

The `dist` folder can be deployed to:
- Netlify
- Vercel
- Firebase Hosting
- GitHub Pages
- Any static hosting service

## 📄 License

Proprietary software for Gateway Trans Logistic.

## 📞 Support

For support: gatewaytranslogistic@gmail.com

---

**Built with ❤️ using React, Tailwind CSS, and Firebase**

