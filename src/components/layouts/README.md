# Background Components

This directory contains animated background components for your portfolio application.

## Components

### 1. StarryBackground

- **Usage**: Dark mode background
- **Features**: Animated stars with twinkling effects and connecting lines
- **Performance**: Canvas-based animation with optimized rendering

### 2. PetalFallBackground

- **Usage**: Light mode background
- **Features**: Falling flower petals with rotation and gentle movement
- **Performance**: Canvas-based animation with colorful petal shapes

### 3. FallbackBackground

- **Usage**: Backup background when canvas animations fail
- **Features**: Simple gradient with subtle pattern overlay
- **Performance**: CSS-only, no JavaScript animations

### 4. SmartBackground

- **Usage**: Intelligent background switcher
- **Features**:
     - Automatically switches between StarryBackground (dark) and PetalFallBackground (light)
     - Includes error handling and fallback support
     - SSR-safe with proper hydration

## Usage

### Basic Usage

```tsx
import { SmartBackground } from '@/components/layouts';

function App() {
	return (
		<SmartBackground>
			<YourAppContent />
		</SmartBackground>
	);
}
```

### Individual Backgrounds

```tsx
import {
  StarryBackground,
  PetalFallBackground,
  FallbackBackground
} from '@/components/layouts';

// Dark mode only
<StarryBackground>
  <Content />
</StarryBackground>

// Light mode only
<PetalFallBackground>
  <Content />
</PetalFallBackground>

// Safe fallback
<FallbackBackground>
  <Content />
</FallbackBackground>
```

## Integration with Layout

Update your `app/layout.tsx`:

```tsx
import { SmartBackground } from '@/components/layouts';
import { ThemeProvider } from '@/components/theme-provider';

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='en'>
			<body>
				<ThemeProvider>
					<SmartBackground>{children}</SmartBackground>
				</ThemeProvider>
			</body>
		</html>
	);
}
```

## Features

- **Theme-aware**: Automatically switches backgrounds based on dark/light theme
- **Performance optimized**: Canvas animations with proper cleanup
- **Error resilient**: Fallback system prevents crashes
- **SSR compatible**: Safe server-side rendering
- **Responsive**: Adapts to window resize events
- **Accessible**: Doesn't interfere with screen readers

## Browser Support

- Modern browsers with Canvas API support
- Graceful degradation to fallback background on older browsers
- Mobile-friendly with optimized performance
