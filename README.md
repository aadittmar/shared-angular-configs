# @dittmar/shared-angular-configs

Shared ESLint, Prettier, and TypeScript configurations for Angular projects using **ESLint 9+ Flat Config**.

> 📖 **Upgrading from ESLint 8?** See the [Migration Guide](./MIGRATION.md) for step-by-step instructions.

## Installation

```bash
npm install --save-dev @dittmar/shared-angular-configs
```

## Usage

### ESLint Configuration

Create or update your `eslint.config.js` file (ESLint 9+ flat config):

**eslint.config.js**

```javascript
const sharedConfig = require('@dittmar/shared-angular-configs');

module.exports = sharedConfig;
```

#### Extending the Configuration

You can extend and customize the shared config:

```javascript
const sharedConfig = require('@dittmar/shared-angular-configs');

module.exports = [
  ...sharedConfig,
  {
    // Your custom rules
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      'no-console': 'off',
    },
  },
  {
    // Override Angular selector prefixes
    files: ['**/*.ts'],
    rules: {
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: ['my-app'],
          style: 'kebab-case',
        },
      ],
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: ['myApp'],
          style: 'camelCase',
        },
      ],
    },
  },
];
```

### TypeScript Configuration

Extend the base TypeScript config in your `tsconfig.json`:

```json
{
  "extends": "@dittmar/shared-angular-configs/tsconfig.base.json",
  "compilerOptions": {
    "outDir": "./dist/out-tsc",
    "baseUrl": "./",
    "paths": {
      "@app/*": ["src/app/*"],
      "@environments/*": ["src/environments/*"]
    }
  },
  "files": [],
  "include": [
    "src/**/*.d.ts"
  ]
}
```

### Prettier Configuration

Extend the Prettier config by creating a `.prettierrc.js` file:

```javascript
module.exports = {
  ...require('@dittmar/shared-angular-configs/prettier.config.js'),
};
```

Or reference it directly in your `package.json`:

```json
{
  "prettier": "@dittmar/shared-angular-configs/prettier.config.js"
}
```

Or create a `.prettierrc.json`:

```json
"@dittmar/shared-angular-configs/prettier.config.js"
```

#### Customizing Prettier

You can override any settings:

```javascript
// .prettierrc.js
const baseConfig = require('@dittmar/shared-angular-configs/prettier.config.js');

module.exports = {
  ...baseConfig,
  printWidth: 100, // Override base setting
  semi: false,     // Override base setting
};
```

### npm Configuration (.npmrc)

Copy the shared `npmrc` file to your project root as `.npmrc`:

```bash
cp node_modules/@dittmar/shared-angular-configs/npmrc .npmrc
```

Or manually create a `.npmrc` file with the shared settings. The shared configuration includes:

- **Exact version saving** - No `^` or `~` in package.json
- **Package lock enabled** - For consistent installs
- **Engine strict** - Enforce Node.js version requirements
- **Moderate audit level** - Security vulnerability checking

You can override any settings by adding your own values to your project's `.npmrc` file.

## What's Included

### ESLint Rules

This package provides a modern **ESLint 9+ flat config** with:

- **@eslint/js** recommended rules
- **TypeScript ESLint** rules for type-safe code
- **Angular ESLint** rules for Angular best practices
- **Accessibility** rules for templates
- **Code style** consistency rules

Key features:
- Component and directive naming conventions (customizable prefixes: 'app', 'lib')
- Modern Angular best practices:
  - Prefer standalone components (`@angular-eslint/prefer-standalone`)
  - Prefer inject function (`@angular-eslint/prefer-inject`)
  - Prefer OnPush change detection (`@angular-eslint/prefer-on-push-component-change-detection`)
- Spacing and formatting rules for consistency
- TypeScript strict rules with pragmatic defaults
- Template best practices and accessibility checks
- Global browser API definitions

### TypeScript Configuration

The base TypeScript config includes:

- **Strict mode** enabled
- **ES2022** target and module support
- **Experimental decorators** for Angular
- **Source maps** for debugging
- **Angular compiler options** with strict templates
- **Import helpers** for cleaner compiled output

### Prettier Configuration

The Prettier config includes:

- **80 character** line width (200 for HTML templates)
- **Single quotes** for TypeScript/JavaScript
- **Trailing commas** everywhere
- **2 spaces** indentation
- **LF** line endings
- **Angular parser** for HTML templates with single attribute per line
- File-specific overrides for `.ts`, `.html`, and `.scss`

### npm Configuration

The shared `.npmrc` includes:

- **Exact versioning** (`save-exact=true`) - No `^` or `~` prefixes
- **Package lock** enabled for consistent installs
- **Engine strict** mode for Node.js version enforcement
- **Moderate audit level** for security checks
- **Optimized settings** for team consistency

## Peer Dependencies

Make sure you have these dependencies installed in your project:

```bash
npm install --save-dev \
  @angular-eslint/eslint-plugin \
  @angular-eslint/eslint-plugin-template \
  @angular-eslint/template-parser \
  @eslint/js \
  @typescript-eslint/eslint-plugin \
  @typescript-eslint/parser \
  eslint \
  prettier \
  typescript
```

**Note:** This package requires **ESLint 9+** for flat config support and **Prettier 3+**.

## Scripts

Add these scripts to your `package.json`:

```json
{
  "scripts": {
    "lint": "eslint .",
    "lint:fix": "eslint . --fix",
    "format": "prettier --write \"src/**/*.{ts,html,scss,css,json}\"",
    "format:check": "prettier --check \"src/**/*.{ts,html,scss,css,json}\""
  }
}
```

## License

MIT

## Contributing

Issues and pull requests are welcome!

## Changelog

### 1.0.0
- Initial release
- ESLint 9+ flat config for Angular projects
- Prettier configuration with Angular-specific settings
- TypeScript base configuration
- Support for Angular 17+ and TypeScript 5+
- Support for Angular 17+ and TypeScript 5+
