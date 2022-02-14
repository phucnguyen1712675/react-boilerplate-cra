import { StrictMode } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import FontFaceObserver from 'fontfaceobserver';
import { HelmetProvider } from 'react-helmet-async';

import 'index.css';
import App from 'app';

// Initialize languages
import 'locales/i18n';

// Configure store
import store from 'store/configureStore';

// Observe loading of Inter (to remove 'Inter', remove the <link> tag in
// the index.html file and this observer)
const openSansObserver = new FontFaceObserver('Inter', {});

// When Inter is loaded, add a font-family using Inter to the body
openSansObserver.load().then(() => {
  document.body.classList.add('fontLoaded');
});

const MOUNT_NODE = document.getElementById('root') as HTMLElement;

render(
  <Provider store={store}>
    <HelmetProvider>
      <StrictMode>
        <App />
      </StrictMode>
    </HelmetProvider>
  </Provider>,
  MOUNT_NODE
);
