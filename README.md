# 🌐 Acuvera Frontend

AI-powered waste classification frontend built with React, TypeScript, and Vite.

## 🏗️ Features

- **Modern UI**: React 18 + TypeScript + Vite
- **Styling**: TailwindCSS + shadcn/ui components
- **State Management**: Zustand
- **Charts**: Recharts for analytics
- **Authentication**: Password-protected login
- **Responsive**: Mobile-first design
- **Dark Mode**: Toggle between light and dark themes

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Development with HTTPS (for camera access)

```bash
# Generate SSL certificates (first time only)
./setup-https.sh

# Start with HTTPS
npm run dev:https
```

## 🔧 Environment Variables

Create `.env` file:

```bash
VITE_API_BASE=http://localhost:8000
VITE_ACUVERA_PASSWORD=Acuvera2024!
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── CameraCapture.tsx
│   ├── NavBar.tsx
│   └── ...
├── pages/              # Page components
│   ├── LandingPage.tsx
│   ├── LoginPage.tsx
│   ├── ClassifyPage.tsx
│   └── ...
├── store/              # Zustand state management
├── lib/                # Utilities and API client
└── App.tsx             # Main app component
```

## 🎨 UI Components

- **shadcn/ui**: Modern, accessible components
- **TailwindCSS**: Utility-first styling
- **Lucide React**: Beautiful icons
- **Recharts**: Data visualization

## 🌐 Deployment

### Vercel (Recommended)

1. **Connect to Vercel**
2. **Set Environment Variables**:
   - `VITE_API_BASE`: Your backend URL
   - `VITE_ACUVERA_PASSWORD`: Login password
3. **Deploy**

### Other Platforms

- **Netlify**: Static hosting
- **GitHub Pages**: Free hosting
- **AWS S3**: Static website hosting

## 🔑 Login Credentials

- **Password**: `Acuvera2024!`
- **Bins**: Select any bin (1-8)

## 📱 Features

- **Landing Page**: Professional marketing page
- **Login System**: Password-protected access
- **Image Classification**: Camera capture and file upload
- **Analytics Dashboard**: Real-time metrics and charts
- **Review System**: Correct predictions and export data
- **Dark Mode**: Toggle between themes

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run dev:https` - Start with HTTPS (for camera)
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **TailwindCSS** - Styling
- **Zustand** - State management
- **React Router** - Navigation
- **Recharts** - Charts
- **Lucide React** - Icons

## 📝 License

MIT License - see LICENSE file for details.