# Publishing Guide for @dittmar/shared-angular-configs

## Pre-Publishing Checklist

✅ Package structure created
✅ All configuration files validated
✅ README.md with usage instructions
✅ LICENSE file (MIT)
✅ .npmignore configured

## How to Publish

### 1. Login to npm (first time only)
```bash
npm login
```
Enter your npm credentials when prompted.

### 2. Verify the package contents
```bash
npm pack --dry-run
```
This shows what will be included in the published package.

### 3. Test locally (optional but recommended)
Create a test tarball:
```bash
npm pack
```
This creates `dittmar-shared-angular-configs-1.0.0.tgz`

Install in a test Angular project:
```bash
cd /path/to/test-angular-project
npm install /Users/aaron/WebstormProjects/shared-angular-configs/dittmar-shared-angular-configs-1.0.0.tgz
```

### 4. Publish to npm
```bash
npm publish --access public
```

The `--access public` flag is required for scoped packages (@dittmar/*) to be publicly accessible.

## After Publishing

### View your package
- npm: https://www.npmjs.com/package/@dittmar/shared-angular-configs
- Check it's published: `npm view @dittmar/shared-angular-configs`

### Update the package
1. Make your changes
2. Update version in `package.json`:
   - Patch release (bug fixes): `npm version patch` (1.0.0 -> 1.0.1)
   - Minor release (new features): `npm version minor` (1.0.0 -> 1.1.0)
   - Major release (breaking changes): `npm version major` (1.0.0 -> 2.0.0)
3. Publish: `npm publish --access public`

## Using in an Angular Project

### Install
```bash
npm install --save-dev @dittmar/shared-angular-configs
```

### Install peer dependencies
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

**Important:** This package requires **ESLint 9+** for flat config support and **Prettier 3+**.

### Configure ESLint
Create `eslint.config.js` (ESLint 9+ flat config):
```javascript
const sharedConfig = require('@dittmar/shared-angular-configs');

module.exports = sharedConfig;
```

Or extend it:
```javascript
const sharedConfig = require('@dittmar/shared-angular-configs');

module.exports = [
  ...sharedConfig,
  {
    // Your custom rules
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
    },
  },
];
```

### Configure Prettier
Create `.prettierrc.js`:
```javascript
module.exports = {
  ...require('@dittmar/shared-angular-configs/prettier.config.js'),
};
```

Or use in `package.json`:
```json
{
  "prettier": "@dittmar/shared-angular-configs/prettier.config.js"
}
```

### Configure TypeScript
Update `tsconfig.json`:
```json
{
  "extends": "@dittmar/shared-angular-configs/tsconfig.base.json",
  "compilerOptions": {
    "outDir": "./dist/out-tsc",
    "paths": {
      "@app/*": ["src/app/*"]
    }
  },
  "include": ["src/**/*.d.ts"]
}
```

## Troubleshooting

### "You do not have permission to publish"
Make sure you're logged in to npm and have access to the @dittmar scope:
```bash
npm whoami
```

### "Package name too similar to existing package"
The package name must be unique. You might need to choose a different scope or name.

### Testing locally with npm link
```bash
# In this package directory
npm link

# In your Angular project
npm link @dittmar/shared-angular-configs
```

This creates a symlink for local development without publishing.
