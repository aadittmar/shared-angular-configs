# Migration Guide: ESLint 8 → ESLint 9+ (Flat Config)

This package now uses **ESLint 9+ flat config** format. If you're upgrading from ESLint 8 or the old `.eslintrc` format, follow this guide.

## What Changed

### ESLint 8 (Old)
- Used `.eslintrc.json` or `.eslintrc.js`
- Configuration object with `extends`, `overrides`, etc.
- Required `root: true`

### ESLint 9+ (New)
- Uses `eslint.config.js`
- Configuration array (flat config)
- No need for `root: true`
- Simpler, more explicit configuration

## Migration Steps

### 1. Update Dependencies

Upgrade to ESLint 9+ and install required packages:

```bash
npm install --save-dev \
  eslint@latest \
  @eslint/js \
  @angular-eslint/eslint-plugin@latest \
  @angular-eslint/eslint-plugin-template@latest \
  @angular-eslint/template-parser@latest \
  @typescript-eslint/eslint-plugin@latest \
  @typescript-eslint/parser@latest \
  @dittmar/shared-angular-configs@latest
```

### 2. Delete Old Config Files

Remove these files if they exist:
```bash
rm .eslintrc.json .eslintrc.js .eslintrc.yml .eslintrc
```

### 3. Create New Flat Config

Create `eslint.config.js` in your project root:

```javascript
const sharedConfig = require('@dittmar/shared-angular-configs');

module.exports = sharedConfig;
```

### 4. Update package.json Scripts

No changes needed - your scripts should work the same:

```json
{
  "scripts": {
    "lint": "eslint .",
    "lint:fix": "eslint . --fix"
  }
}
```

## Before & After Examples

### Before (ESLint 8 - .eslintrc.json)

```json
{
  "root": true,
  "extends": ["@dittmar/shared-angular-configs"],
  "overrides": [
    {
      "files": ["*.ts"],
      "rules": {
        "@angular-eslint/component-selector": [
          "error",
          {
            "type": "element",
            "prefix": "my-app",
            "style": "kebab-case"
          }
        ]
      }
    }
  ]
}
```

### After (ESLint 9+ - eslint.config.js)

```javascript
const sharedConfig = require('@dittmar/shared-angular-configs');

module.exports = [
  ...sharedConfig,
  {
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
    },
  },
];
```

## Key Differences

### 1. Configuration Format
- **Old:** Object with `extends` and `overrides`
- **New:** Array of config objects

### 2. File Patterns
- **Old:** `files: ["*.ts"]` in overrides
- **New:** `files: ['**/*.ts']` in config object

### 3. Extending Configs
- **Old:** `extends: ["@dittmar/shared-angular-configs"]`
- **New:** `...sharedConfig` (spread array)

### 4. Ignoring Files
- **Old:** `ignorePatterns: ['dist/**']`
- **New:** `{ ignores: ['dist/**/*'] }` as a config object

### 5. Globals
- **Old:** `env: { browser: true, es2021: true }`
- **New:** `languageOptions: { globals: { window: 'readonly', ... } }`

## Common Customizations

### Custom Component Prefix

```javascript
const sharedConfig = require('@dittmar/shared-angular-configs');

module.exports = [
  ...sharedConfig.filter(config => !config.files?.includes('**/*.ts')),
  {
    files: ['**/*.ts'],
    languageOptions: sharedConfig.find(c => c.files?.includes('**/*.ts')).languageOptions,
    plugins: sharedConfig.find(c => c.files?.includes('**/*.ts')).plugins,
    rules: {
      ...sharedConfig.find(c => c.files?.includes('**/*.ts')).rules,
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: ['my-prefix'],
          style: 'kebab-case',
        },
      ],
    },
  },
  ...sharedConfig.filter(config => config.files?.includes('**/*.html')),
];
```

Or simpler - just override:

```javascript
const sharedConfig = require('@dittmar/shared-angular-configs');

module.exports = [
  ...sharedConfig,
  {
    files: ['**/*.ts'],
    rules: {
      '@angular-eslint/component-selector': [
        'error',
        { type: 'element', prefix: ['my-prefix'], style: 'kebab-case' },
      ],
    },
  },
];
```

### Add Custom Ignores

```javascript
const sharedConfig = require('@dittmar/shared-angular-configs');

module.exports = [
  {
    ignores: ['**/generated/**', '**/*.generated.ts'],
  },
  ...sharedConfig,
];
```

### Disable Specific Rules

```javascript
const sharedConfig = require('@dittmar/shared-angular-configs');

module.exports = [
  ...sharedConfig,
  {
    files: ['**/*.ts'],
    rules: {
      '@angular-eslint/prefer-standalone': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
];
```

## Troubleshooting

### "Error: Config (unnamed): Key 'parserOptions': Key 'project' expected value."

Make sure your `tsconfig.json` exists in your project root, or update the path in a custom config:

```javascript
const sharedConfig = require('@dittmar/shared-angular-configs');

module.exports = sharedConfig.map(config => {
  if (config.languageOptions?.parserOptions?.project) {
    return {
      ...config,
      languageOptions: {
        ...config.languageOptions,
        parserOptions: {
          ...config.languageOptions.parserOptions,
          project: ['./tsconfig.app.json', './tsconfig.spec.json'],
        },
      },
    };
  }
  return config;
});
```

### "Config array must only contain config objects"

Make sure you're spreading the shared config array correctly with `...sharedConfig`, not wrapping it in another array.

❌ Wrong:
```javascript
module.exports = [sharedConfig]; // Don't wrap it
```

✅ Correct:
```javascript
module.exports = [...sharedConfig]; // Spread it
// or
module.exports = sharedConfig; // Use directly
```

## Resources

- [ESLint Flat Config Migration Guide](https://eslint.org/docs/latest/use/configure/migration-guide)
- [ESLint Configuration Files](https://eslint.org/docs/latest/use/configure/configuration-files)
- [Angular ESLint](https://github.com/angular-eslint/angular-eslint)
