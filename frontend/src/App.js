import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// i18n
import 'src/locales/i18n';

// scrollbar
import 'simplebar-react/dist/simplebar.min.css';

// lightbox
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/captions.css';
import 'yet-another-react-lightbox/plugins/thumbnails.css';

// map
import 'mapbox-gl/dist/mapbox-gl.css';

// editor
import 'react-quill/dist/quill.snow.css';

// carousel
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// image
import 'react-lazy-load-image-component/src/effects/blur.css';

// ----------------------------------------------------------------------

// routes
import Router from 'src/routes/sections';
// theme
import ThemeProvider from 'src/theme';
// locales
import { LocalizationProvider } from 'src/locales';
// hooks
import { useScrollToTop } from 'src/hooks/use-scroll-to-top';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// components
import ProgressBar from 'src/components/progress-bar';

import { MotionLazy } from 'src/components/animate/motion-lazy';
import SnackbarProvider from 'src/components/snackbar/snackbar-provider';
import { SettingsProvider, SettingsDrawer } from 'src/components/settings';
import { LoadingScreen } from './components/loading-screen';
import { handleChangeState, loginUser, searchRecords } from './features/user/userSlice';

// ----------------------------------------------------------------------

function App() {
  const {
    loginUserState,
    has_more_on_site_inventory,
    page_on_site,
    finishedGettingInventoryItems,
    has_more_vehicle,
    has_more_dealership,
  } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const [hasMoreItem, setHasMoreItem] = useState(has_more_on_site_inventory);
  const [loadingPage, setLoadingPage] = useState(false);

  useScrollToTop();
  // useEffect(() => {
  //   const handleScroll = () => {
  //     console.log('User is scrolling');
  //   };

  //   window.addEventListener('scroll', handleScroll);

  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, []);
  useEffect(() => {
    if (!loginUserState) {
      dispatch(loginUser());
    }
  }, [loginUserState, dispatch]);

  useEffect(() => {
    const fetchPage = async () => {
      if (loginUserState && !loadingPage) {
        setLoadingPage(true);
        if (has_more_on_site_inventory) {
          const config = {
            appName: loginUserState?.appLinkName,
            pageSize: 200,
            reportName: 'On_Site_Inventory',
            criteria: '',
            page: page_on_site,
          };
          await dispatch(searchRecords(config));
        }
        if (has_more_vehicle) {
          const config_vehicle = {
            appName: loginUserState?.appLinkName,
            pageSize: 200,
            reportName: 'Vehicle_Items1',
            criteria: '',
            page: 1,
          };
          await dispatch(searchRecords(config_vehicle));
        }
        if (has_more_dealership) {
          const config_dealership = {
            appName: loginUserState?.appLinkName,
            pageSize: 200,
            reportName: 'All_Dealers',
            criteria: '(Dealership_ID != "")',
            page: 1,
          };
          await dispatch(searchRecords(config_dealership));
        }

        setLoadingPage(false);
      }
    };

    fetchPage();
  }, [
    loginUserState,
    has_more_on_site_inventory,
    has_more_vehicle,
    has_more_dealership,
    page_on_site,
    dispatch,
    loadingPage,
  ]);

  return (
    <>
      <LocalizationProvider>
        <SettingsProvider
          defaultSettings={{
            themeMode: 'dark', // 'light' | 'dark'
            themeDirection: 'ltr', //  'rtl' | 'ltr'
            themeContrast: 'default', // 'default' | 'bold'
            themeLayout: 'horizontal', // 'vertical' | 'horizontal' | 'mini'
            themeColorPresets: 'orange', // 'default' | 'cyan' | 'purple' | 'blue' | 'orange' | 'red'
            themeStretch: true, // true | false
          }}
        >
          <ThemeProvider>
            <MotionLazy>
              <SnackbarProvider>
                <SettingsDrawer />
                {/* <ProgressBar /> */}

                <Router />
              </SnackbarProvider>
            </MotionLazy>
          </ThemeProvider>
        </SettingsProvider>
      </LocalizationProvider>
    </>
  );
}

export default App;
