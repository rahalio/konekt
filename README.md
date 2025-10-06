# KONEKT

A React-based cross-chain connectivity platform built with TypeScript and Tailwind CSS.

## 🏗️ Project Structure

The project has been refactored from a single `app.ts` file into a well-organized, modular structure:

```
src/
├── components/           # React components
│   ├── ui/              # Reusable UI components
│   │   ├── Badge.tsx    # Badge component for labels
│   │   ├── Section.tsx  # Section wrapper component
│   │   ├── Pill.tsx     # Navigation pill component
│   │   ├── ChainDot.tsx # Chain indicator dot
│   │   ├── Stat.tsx     # Statistics display component
│   │   └── index.ts     # UI components exports
│   ├── views/           # Page/view components
│   │   ├── Dashboard.tsx     # Dashboard overview
│   │   ├── BridgeView.tsx    # Cross-chain bridge interface
│   │   ├── DexView.tsx       # DEX trading interface
│   │   ├── GovernanceView.tsx # Governance and voting
│   │   ├── RegistryView.tsx  # DApp registry
│   │   └── index.ts          # Views exports
│   ├── App.tsx          # Main app component
│   └── index.ts         # Components exports
├── hooks/               # Custom React hooks
│   └── useToasts.ts     # Toast notification management
├── types/               # TypeScript type definitions
│   └── index.ts         # All type exports
├── constants/           # Application constants
│   └── index.ts         # Constants and static data
├── utils/               # Utility functions
│   └── index.ts         # Helper functions
├── main.tsx            # Application entry point
├── index.css           # Global styles (Tailwind)
└── index.ts            # Main exports
```

## 🧩 Component Architecture

### UI Components (`src/components/ui/`)

- **Badge**: Displays labels and tags
- **Section**: Wrapper for content sections with title and icon
- **Pill**: Navigation buttons with selected states
- **ChainDot**: Visual indicator for different blockchain networks
- **Stat**: Statistics display with icon, label, and value

### View Components (`src/components/views/`)

- **Dashboard**: Overview with metrics and quick actions
- **BridgeView**: Cross-chain asset transfer interface
- **DexView**: Decentralized exchange for token swapping
- **GovernanceView**: Voting and staking interface
- **RegistryView**: DApp discovery and registry

### Main App Component

- **App.tsx**: Root component with navigation, routing, and toast system

## 📊 Data Layer

### Types (`src/types/`)

- `ChainId`: Supported blockchain identifiers
- `Asset`: Token/asset definitions
- `Proposal`: Governance proposal structure
- `DApp`: DApp registry entry
- `TabType`: Navigation tab types
- `ToastType`: Notification message types

### Constants (`src/constants/`)

- `CHAINS`: Blockchain network configurations
- `ASSETS`: Available tokens and assets
- `DAPPS`: Registered decentralized applications
- `MOCK_ADDRESS`: Demo wallet address

## 🎣 Custom Hooks

### `useToasts` (`src/hooks/useToasts.ts`)

Manages toast notifications with:

- `push(message, type)`: Add new notification
- `remove(id)`: Remove specific notification
- `toasts`: Current notification list

## 🛠️ Utilities (`src/utils/`)

- `wait(ms)`: Promise-based delay function
- `fmt(number)`: Number formatting for display

## 🚀 Getting Started

1. **Install dependencies**:

   ```bash
   npm install
   ```

2. **Start development server**:

   ```bash
   npm run dev
   ```

3. **Build for production**:
   ```bash
   npm run build
   ```

## 🎨 Styling

The project uses:

- **Tailwind CSS** for utility-first styling
- **Responsive design** with mobile-first approach
- **Dark theme** with gradient backgrounds
- **Custom color palette** for blockchain networks

## 🔧 Development Setup

### Required Dependencies

- React 18+
- TypeScript 5+
- Vite (build tool)
- Tailwind CSS
- Lucide React (icons)

### Configuration Files

- `tsconfig.json`: TypeScript configuration
- `vite.config.ts`: Vite build configuration
- `tailwind.config.js`: Tailwind CSS configuration
- `postcss.config.js`: PostCSS configuration

## 📁 Migration from Single File

The original `app.ts` contained all components, types, and logic in one file (~800+ lines). This refactoring provides:

✅ **Better Organization**: Logical separation of concerns
✅ **Improved Maintainability**: Easier to find and modify specific components
✅ **Enhanced Reusability**: UI components can be reused across views
✅ **Type Safety**: Proper TypeScript types for all components
✅ **Developer Experience**: Better IntelliSense and debugging
✅ **Scalability**: Easy to add new features and components

## 🔮 Next Steps

This modular structure makes it easy to:

- Add new blockchain networks
- Create additional DApp views
- Implement real blockchain integrations
- Add state management (Redux, Zustand)
- Include testing framework
- Add component documentation (Storybook)

## 📝 License

MIT License - see LICENSE file for details.
Connect independent blockchains so communities can transact without intermediaries; enable DApps, cross-chain DEX, and decentralized governance.
