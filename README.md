# How to Run the Project

- Open the terminal => type `pnpm install` to install all needed **dependencies** => type `pnpm dev` => **enjoy**! :)

## Required Extensions for Work

- **ESLint**
- **Prettier**
- **Stylelint**

## Aliases Are Not Working, How to Fix Them?

1. Press `Ctrl + Shift + P` => open **user settings (JSON)**.
2. Add the following setting:
   ```json
   "typescript.preferences.importModuleSpecifier": "non-relative"
   ```

## IMPORTANT: If you are working on other projects and this project doesn’t have aliases, change this setting to:

```json
   "typescript.preferences.importModuleSpecifier": "relative"
```
