# Taxi Wale Partners - Landing Page

A modern SaaS-style landing page for Taxi Wale Partners, a platform-as-a-service app for taxi drivers, vendors, and agents.

## 🚀 Tech Stack

- **Next.js 14** - React framework with App Router
- **Tailwind CSS** - Utility-first CSS framework
- **Anime.js** - Lightweight JavaScript animation library
- **TypeScript** - Type-safe JavaScript
- **Lucide React** - Beautiful & consistent icon toolkit

## 🎨 Design Features

- **Primary Brand Color**: Yellow (#facc15)
- **Supporting Colors**: Black, Grey, White
- **Modern SaaS Design**: Clean, professional, technology-first
- **Responsive Design**: Mobile-first approach
- **Smooth Animations**: Powered by Anime.js
- **Interactive Elements**: Hover effects and scroll animations

## 📱 Landing Page Sections

1. **Hero Section**
   - Compelling headline: "One Platform. Zero Chaos."
   - Interactive India map with animated taxi icons
   - Clear CTAs: "Join the Network" & "Request Demo"
   - Key statistics display

2. **Problem Section**
   - 6 major problems with unique illustrations
   - WhatsApp chaos, lost opportunities, frauds, etc.
   - Visual problem indicators

3. **Solution Section**
   - 5 smart solutions with matching illustrations
   - Interactive flowchart showing the process
   - Smart lead-matching, escrow system, etc.

4. **Trust Section**
   - Security features and compliance badges
   - Operating cities map with animated dots
   - Customer testimonials with ratings
   - Trust statistics

5. **Closing Section**
   - Final CTA with handshake imagery
   - Partnership benefits
   - Final statistics and footer

## 🛠️ Installation & Setup

1. **Install Dependencies**

   ```bash
   npm install
   ```

2. **Run Development Server**

   ```bash
   npm run dev
   ```

3. **Open in Browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📦 Build for Production

```bash
npm run build
npm start
```

## 🎯 Key Features

- **Smooth Scroll Navigation**: Click navigation items to scroll to sections
- **Intersection Observer Animations**: Elements animate when they come into view
- **Responsive Design**: Works perfectly on all device sizes
- **Performance Optimized**: Fast loading with Next.js optimizations
- **SEO Ready**: Proper meta tags and semantic HTML
- **Accessibility**: Keyboard navigation and screen reader friendly

## 🎨 Customization

### Colors

The brand colors are defined in `tailwind.config.js`:

- Primary Yellow: `#facc15`
- Black: `#000000`
- Grey: `#6b7280`
- White: `#ffffff`

### Animations

Animations are powered by Anime.js and can be customized in each component's `useEffect` hook.

### Content

All text content and images can be easily modified in the respective component files.

## 📁 Project Structure

```
├── app/
│   ├── components/
│   │   ├── HeroSection.tsx
│   │   ├── ProblemSection.tsx
│   │   ├── SolutionSection.tsx
│   │   ├── TrustSection.tsx
│   │   ├── ClosingSection.tsx
│   │   └── Navigation.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── tailwind.config.js
├── postcss.config.js
├── next.config.js
└── package.json
```

## 🚀 Deployment

This project can be deployed to:

- **Vercel** (recommended for Next.js)
- **Netlify**
- **AWS Amplify**
- **Any static hosting service**

## 📞 Support

For any questions or support, please contact the development team.

---

**Built with ❤️ for Taxi Wale Partners**
