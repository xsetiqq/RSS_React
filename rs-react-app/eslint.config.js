import react from '@eslint-react/eslint-plugin';
import reactCompiler from '@eslint-react/compiler-plugin';
import reactHooks from 'eslint-plugin-react-hooks';
import tseslint from 'typescript-eslint';

const config = tseslint.config(
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parserOptions: {
        project: true,
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
    },
  },
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      react,
      'react-compiler': reactCompiler,
      'react-refresh': await import('eslint-plugin-react-refresh'),
      'react-hooks': reactHooks,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'react-compiler/react-compiler': 'error',
      '@typescript-eslint/no-invalid-void-type': [
        'error',
        {
          allowAsThisParameter: false,
          allowInGenericTypeArguments: true,
        },
      ],

      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
    },
  }
);

export default config;
