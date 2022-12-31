import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import { AuthContextProvider } from './context/AuthContext';

import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faBars, faTimes, faAngleUp, faPlay, faHandshakeAlt, faMobileAlt, faUniversalAccess, faPause, faAngleDown, faMusic, faEye, faEyeSlash, faDownload, faBuildingColumns, faArrowRightFromBracket, faDatabase, faBug, faExchange, faUpload, faPalette, faComputer, faBook, faNetworkWired, faHouseUser } from '@fortawesome/free-solid-svg-icons'

library.add( fab, faBars, faAngleUp, faHandshakeAlt, faMobileAlt, faUniversalAccess, faPause, faPlay, faTimes, faExchange, faDownload, faEye, faEyeSlash, faAngleDown, faMusic, faBuildingColumns, faArrowRightFromBracket, faDatabase, faBug, faUpload, faPalette, faComputer, faBook, faNetworkWired, faHouseUser);

ReactDOM.render(
  <AuthContextProvider>
    <App />
  </AuthContextProvider>,
  document.getElementById('root')
);
