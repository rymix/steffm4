## 🎶 **Stef.fm** 🎶

### _Music streaming service in a retro audio player in the browser_

![Stars](https://badgen.net/github/stars/rymix/steffm4)
![License](https://badgen.net/github/license/rymix/steffm4)

Stef.fm is an online music streaming platform which I am using as a permanent home for my late friend's amazing house music mix collection. I explain more in my [LinkedIn article](https://www.linkedin.com/pulse/passion-project-digital-preservation-archaeology-steve-arnott/).

The UI is based on the Roland Jupiter-8 and Yamaha DX7 keyboards from the 1980s. It's a classic design that I've always loved.

# See it in Action

🌈 [Stef.fm](https://stef.fm) 🌈

# Try it for Yourself

### Clone repo

- [Git](https://git-scm.com/downloads)

```
git clone https://github.com/rymix/steffm4
cd steffm
```

### Yarn

- [Node.js](https://nodejs.org/en/download/) (**v16 LTS**)
- [Yarn](https://classic.yarnpkg.com/en/) (`npm install --global yarn`)

```
yarn
```

##### Development

```
yarn run dev
```

[http://localhost:3001](http://localhost:3001)

##### Production

```
yarn run build
```

### Docker

- [Docker Desktop](https://www.docker.com/products/docker-desktop)

```
docker build -t steffm .
docker run -dp 3001:3001 --rm --name steffm steffm
```

# Custom Hooks

This project includes several reusable React hooks that provide core functionality across the application.

## 🎙️ `useVoiceControl`

**Location**: `hooks/useVoiceControl.ts`

A comprehensive hook for voice command functionality using Porcupine wake word detection and Web Speech API.

### Features
- Wake word detection ("Hey Stef")
- Speech-to-text recognition
- Fuzzy command matching with scoring system
- Automatic command timeout and error handling
- Debug logging and state management

### Interface
```typescript
interface UseVoiceControlReturn {
  // Status and state
  status: VoiceStatus;
  isLoaded: boolean;
  isListening: boolean;
  isCommandListening: boolean;
  error: any;
  lastCommand: string;
  debugInfo: string[];
  keywordDetections: string[];

  // Control functions
  start: () => void;
  stop: () => void;
  testCommandListening: () => Promise<void>;

  // Utility functions
  getStatusMessage: () => string;
}
```

### Usage
```typescript
import { useVoiceControl } from "hooks/useVoiceControl";

const MyComponent = () => {
  const { status, start, stop, isListening } = useVoiceControl();

  return (
    <div>
      <p>Status: {status}</p>
      <button onClick={start}>Start Voice Control</button>
      <button onClick={stop}>Stop Voice Control</button>
    </div>
  );
};
```

## 💾 `usePersistedState`

**Location**: `hooks/usePersistedState.ts`

A hook that persists state to localStorage, providing automatic synchronization between React state and browser storage.

### Features
- Automatic localStorage persistence
- SSR-safe (handles server-side rendering)
- TypeScript generic support for type safety
- JSON serialization/deserialization

### Interface
```typescript
function usePersistedState<T>(
  key: string,
  defaultValue: T
): [T, React.Dispatch<React.SetStateAction<T>>]
```

### Usage
```typescript
import usePersistedState from "hooks/usePersistedState";

const MyComponent = () => {
  const [theme, setTheme] = usePersistedState("user-theme", "dark");
  const [settings, setSettings] = usePersistedState("app-settings", {
    volume: 0.5,
    autoplay: true
  });

  return (
    <div>
      <p>Current theme: {theme}</p>
      <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
        Toggle Theme
      </button>
    </div>
  );
};
```

## ⏱️ `useMasterTimer`

**Location**: `hooks/useMasterTimer.ts`

A performance-optimized timer hook that consolidates multiple timers into a single `setInterval`, reducing resource usage and improving performance.

### Features
- Single master timer for all subscriptions
- Automatic cleanup when no subscriptions remain
- Subscription-based architecture
- 100ms precision for accurate timing

### Interface
```typescript
interface MasterTimerHook {
  subscribe: (
    id: string,
    callback: () => void,
    interval: number
  ) => () => void; // Returns unsubscribe function
}
```

### Usage
```typescript
import { useMasterTimer } from "hooks/useMasterTimer";

const MyComponent = () => {
  const { subscribe } = useMasterTimer();

  useEffect(() => {
    // Subscribe to a timer that runs every 1000ms
    const unsubscribe = subscribe("my-timer", () => {
      console.log("Timer tick!");
    }, 1000);

    // Cleanup subscription
    return unsubscribe;
  }, [subscribe]);

  return <div>Check console for timer ticks</div>;
};
```

## 📱 `useDeviceOrientation`

**Location**: `hooks/useDeviceOrientation.ts`

A comprehensive hook for detecting device characteristics, screen size, and orientation changes with multiple detection methods.

### Features
- Multi-method mobile device detection
- Screen size and orientation tracking
- Special mode detection (skinny/tall wide modes)
- Real-time updates on resize/orientation change
- SSR-safe implementation

### Interface
```typescript
interface DeviceOrientationState {
  isSmallScreen: boolean;
  isMobile: boolean;
  isPortrait: boolean;
  isLandscape: boolean;
  isSkinnyWideMode: boolean; // height < 450 && landscape
  isTallWideMode: boolean;   // 450 <= height < 650 && landscape
  windowWidth: number;
  windowHeight: number;
}
```

### Detection Methods
1. **User Agent Client Hints** (modern browsers)
2. **Touch capability + screen size** combination
3. **User Agent string patterns** (fallback)
4. **CSS Media Query** matching

### Usage
```typescript
import { useDeviceOrientation } from "hooks/useDeviceOrientation";

const MyComponent = () => {
  const {
    isMobile,
    isPortrait,
    isLandscape,
    isSkinnyWideMode,
    windowWidth,
    windowHeight
  } = useDeviceOrientation();

  return (
    <div>
      <p>Device: {isMobile ? "Mobile" : "Desktop"}</p>
      <p>Orientation: {isPortrait ? "Portrait" : "Landscape"}</p>
      <p>Screen: {windowWidth} × {windowHeight}</p>
      {isSkinnyWideMode && <p>Optimized for skinny wide screens</p>}
    </div>
  );
};
```

## Best Practices

- All hooks are TypeScript-enabled with proper type definitions
- SSR-safe implementations where applicable
- Proper cleanup and memory management
- Performance optimizations (like timer consolidation)
- Comprehensive error handling and fallbacks
