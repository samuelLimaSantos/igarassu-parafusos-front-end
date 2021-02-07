import React from 'react';
import Routes from './routes';
import { AuthProvider } from './context';
import GlobalStyle from './globalStyle';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Routes />
      <GlobalStyle />
    </AuthProvider>
  );
};

export default App;
