module.exports = {
  'extends': [
      '@jitsi/eslint-config',
      '@jitsi/eslint-config/react',
      '@jitsi/eslint-config/typescript'
  ],
  'overrides': [
      {
        'files': ['*.tsx','*.ts'],
        'rules': {
          'react/react-in-jsx-scope': 'off',
          'react/jsx-no-bind': 'off',
          'react/no-multi-comp': 'off',
          'require-jsdoc': 'off',
          'camelcase': 'off'
        }
      }
  ]
};