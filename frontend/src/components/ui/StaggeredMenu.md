# StaggeredMenu Component

A beautiful, animated navigation menu component built with Framer Motion that provides a staggered animation effect for menu items.

## Features

- ✨ Smooth staggered animations using Framer Motion
- 🎨 Customizable colors and styling
- 📱 Responsive design
- ♿ Accessibility features (ARIA labels, keyboard navigation)
- 🔄 Left or right positioning
- 📊 Optional item numbering
- 🔗 Social media links support
- 🖼️ Logo support
- 🎯 Customizable callbacks

## Installation

The component uses Framer Motion which is already installed in the project. No additional dependencies required.

## Usage

```tsx
import StaggeredMenu from "./StaggeredMenu";

const menuItems = [
  { label: "Home", ariaLabel: "Go to home page", link: "/" },
  { label: "About", ariaLabel: "Learn about us", link: "/about" },
  { label: "Services", ariaLabel: "View our services", link: "/services" },
  { label: "Contact", ariaLabel: "Get in touch", link: "/contact" },
];

const socialItems = [
  { label: "Twitter", link: "https://twitter.com" },
  { label: "GitHub", link: "https://github.com" },
  { label: "LinkedIn", link: "https://linkedin.com" },
];

<div style={{ height: "100vh", background: "#1a1a1a" }}>
  <StaggeredMenu
    position="right"
    items={menuItems}
    socialItems={socialItems}
    displaySocials={true}
    displayItemNumbering={true}
    menuButtonColor="#fff"
    openMenuButtonColor="#fff"
    changeMenuColorOnOpen={true}
    colors={["#B19EEF", "#5227FF"]}
    logoUrl="/path-to-your-logo.svg"
    accentColor="#ff6b6b"
    onMenuOpen={() => console.log("Menu opened")}
    onMenuClose={() => console.log("Menu closed")}
  />
</div>;
```

## Props

| Prop                    | Type                | Default                  | Description                                    |
| ----------------------- | ------------------- | ------------------------ | ---------------------------------------------- |
| `position`              | `'left' \| 'right'` | `'right'`                | Position of the menu panel                     |
| `items`                 | `MenuItem[]`        | Required                 | Array of menu items                            |
| `socialItems`           | `SocialItem[]`      | `[]`                     | Array of social media links                    |
| `displaySocials`        | `boolean`           | `false`                  | Whether to show social media links             |
| `displayItemNumbering`  | `boolean`           | `false`                  | Whether to show numbers next to menu items     |
| `menuButtonColor`       | `string`            | `'#fff'`                 | Color of the menu button when closed           |
| `openMenuButtonColor`   | `string`            | `'#fff'`                 | Color of the menu button when open             |
| `changeMenuColorOnOpen` | `boolean`           | `true`                   | Whether to change button color when menu opens |
| `colors`                | `string[]`          | `['#B19EEF', '#5227FF']` | Gradient colors for the menu background        |
| `logoUrl`               | `string`            | `undefined`              | URL to the logo image                          |
| `accentColor`           | `string`            | `'#ff6b6b'`              | Color for item numbers and accents             |
| `onMenuOpen`            | `() => void`        | `undefined`              | Callback when menu opens                       |
| `onMenuClose`           | `() => void`        | `undefined`              | Callback when menu closes                      |

## Types

```tsx
interface MenuItem {
  label: string;
  ariaLabel: string;
  link: string;
}

interface SocialItem {
  label: string;
  link: string;
}
```

## Examples

### Basic Usage

```tsx
<StaggeredMenu items={menuItems} position="left" />
```

### With Social Links

```tsx
<StaggeredMenu
  items={menuItems}
  socialItems={socialItems}
  displaySocials={true}
  displayItemNumbering={true}
/>
```

### Custom Styling

```tsx
<StaggeredMenu
  items={menuItems}
  colors={["#ff6b6b", "#4ecdc4"]}
  accentColor="#45b7d1"
  menuButtonColor="#333"
  openMenuButtonColor="#fff"
/>
```

## Demo

Visit `/navigation-demo` to see the StaggeredMenu component in action.

## Notes

- The component uses Framer Motion for animations
- All animations are optimized for performance
- The component is fully accessible with proper ARIA labels
- Menu items use Next.js Link component for client-side navigation
- Social links open in new tabs with proper security attributes
