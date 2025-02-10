# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```



# KEYCLOAK INFO

```sh
[VERSION]: 21.0.0
```

### pour exporter le realm on du suivre ces instructions

- exporter le realm grace a la commande suivante

```sh
/opt/keycloak/bin/kc.sh export --dir /opt/keycloak/ --users realm_file
```

- copier le nouveau realm creer dans l'environnement docker vers le bureau par exemple

```sh
docker cp kd:/opt/keycloak/demo-realm.json /${HOME}/Desktop/realm.json
```

## LANCER KEYCLOAK

```sh

docker run --name kd -p 8080:8080 -e KEYCLOAK_ADMIN=admin -e KEYCLOAK_ADMIN_PASSWORD=admin -v $(pwd)/keycloak/realm.json:/opt/keycloak/data/import/realm.json -v $(pwd)/keycloak/themes/kd:/opt/keycloak/themes/k-demo quay.io/keycloak/keycloak:21.0.0 start-dev --import-realm

```