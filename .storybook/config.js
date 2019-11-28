import React from 'react';

// Modules
import { configure, addDecorator } from '@storybook/react';
// import { ThemeProvider } from 'styled-components';

// Components
// import { theme } from '../src/theme/MainTheme';

function loadStories() {
  const req = require.context('../src/components', true, /\.stories\.js$/);
  req.keys().forEach(filename => req(filename));
}

// addDecorator(story => <ThemeProvider theme={theme}>{story()}</ThemeProvider>);

configure(loadStories, module);
