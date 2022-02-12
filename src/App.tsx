import React from 'react';
import { useTranslation } from 'react-i18next';

const App: React.FC = () => {
  const { t } = useTranslation();

  return <h1 className="text-3xl font-bold underline">{t('helloWorld')}</h1>;
};

export default App;
