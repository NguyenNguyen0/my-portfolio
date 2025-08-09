# Project Components

This directory contains the project-related UI components for the portfolio.

## Components

### ProjectSection

The main section component that displays a collection of projects with filtering capabilities.

**Props:**

- `title` (optional): Section title (default: "Featured Projects")
- `description` (optional): Section description
- `initialShowCount` (optional): Number of projects to show initially (default: 3)

**Features:**

- Responsive grid layout (1 column on mobile, 2 on tablet, 3 on desktop)
- Type-based filtering (All, Personal, Work, Frontend, Backend, Fullstack)
- Show more/less functionality
- Dark/light mode compatible
- Empty state handling

### ProjectCard

Individual project card component that displays project information.

**Props:**

- `project`: Project object containing all project details

**Features:**

- Project image with fallback design
- Hover effects and animations
- Tech stack badges with icons
- GitHub and demo links
- Responsive design
- Dark/light mode compatible

## Data Structure

Projects are defined in `/src/data/projects.tsx` with the following interface:

```typescript
interface Project {
	id: string;
	title: string;
	description: string;
	techStack: string[];
	image?: string; // Optional project image
	demoUrl?: string; // Optional demo link
	githubUrl: string; // Required GitHub link
	type: string[]; // Array of project types for filtering
}
```

## Usage

```tsx
import { ProjectSection } from '@/components/ui';

// Basic usage
<ProjectSection />

// With custom props
<ProjectSection
  title="My Projects"
  description="Custom description"
  initialShowCount={2}
/>
```

## Images

Project images should be placed in `/public/projects/` directory. The component handles missing images gracefully with a fallback design.

## Styling

- Uses TailwindCSS for styling
- Responsive design with mobile-first approach
- Dark/light mode support
- Smooth transitions and hover effects
- Compatible with existing design system
