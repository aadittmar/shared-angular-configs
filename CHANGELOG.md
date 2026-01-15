# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-01-15

### Added
- Initial release of @dittmar/shared-angular-configs
- **ESLint 9+ Flat Config** format support
- **Prettier 3+** configuration with Angular-specific settings
- ESLint configuration for Angular projects with TypeScript
- Base TypeScript configuration (tsconfig.base.json)
- Support for Angular 17+ and TypeScript 5+
- Comprehensive ESLint rules for:
  - TypeScript best practices
  - Angular component/directive naming conventions
  - Template accessibility rules
  - Code consistency and style
  - Modern Angular patterns (standalone, inject, OnPush)
- Prettier configuration with:
  - Angular HTML template formatting (printWidth: 200)
  - Single attribute per line for HTML
  - TypeScript/JavaScript formatting rules
  - SCSS formatting rules
- Complete documentation and usage examples

### Features
- Shareable ESLint flat config with Angular-specific rules
- Shareable Prettier config with file-specific overrides
- TypeScript strict mode configuration
- HTML template linting and formatting support
- Accessibility rules for better a11y compliance
- Spacing and formatting rules for code consistency
- Global browser API definitions
- Customizable component/directive prefixes (app, lib)
