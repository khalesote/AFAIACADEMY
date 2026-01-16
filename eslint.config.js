// ESLint config para proyectos TypeScript/React Native modernos
module.exports = [
  {
    ignores: ['node_modules/**'],
    files: ['**/*.js', '**/*.ts', '**/*.tsx'],
    plugins: {
      '@typescript-eslint': require('@typescript-eslint/eslint-plugin'),
    },
    languageOptions: {
      parser: require('@typescript-eslint/parser'),
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
      },
    },
    rules: {
      // Puedes añadir reglas personalizadas aquí
    },
  },
];
