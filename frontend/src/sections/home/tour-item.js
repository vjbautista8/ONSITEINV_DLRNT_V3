import PropTypes from 'prop-types';
import { forwardRef, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRecordByID } from 'src/features/user/userSlice';
// @mui
import { useTheme } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import List from '@mui/material/List';
import Slide from '@mui/material/Slide';
import AppBar from '@mui/material/AppBar';
import Divider from '@mui/material/Divider';
import Toolbar from '@mui/material/Toolbar';
import ListItemButton from '@mui/material/ListItemButton';
import Tooltip from '@mui/material/Tooltip';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Container from '@mui/material/Container';

// routes
import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
// utils
import { fDateTime, fDateTimeSecs } from 'src/utils/format-time';
import { fCurrency } from 'src/utils/format-number';
// components
import { useBoolean } from 'src/hooks/use-boolean';
import EmptyContent from 'src/components/empty-content/empty-content';
import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import Label from 'src/components/label';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import { shortDateLabel } from 'src/components/custom-date-range-picker';
import Markdown from 'src/components/markdown';
import Carousel, { CarouselArrowIndex, CarouselArrows, useCarousel } from 'src/components/carousel';
import Lightbox, { useLightBox } from 'src/components/lightbox';
import {
  convertToNumber,
  getDistinctValuesByKey,
  getFilePathSrcList,
  getSortedValuesByKey,
  stringToListObjects,
} from 'src/helper';
import { useSettingsContext } from 'src/components/settings';

import SwipeRightCar from './SwipeRightCar';
import TransitionsDialogRight from './transitions-dialog-right';
import TransitionsDialogLeft from './transitions-dialog-left';
import AnalyticsOrderTimeline from './history-time-line';
import ViewVehicleInfo from './ViewVehicleInfo';

// ----------------------------------------------------------------------
const Transition = forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);
export default function TourItem({ tour, onView, onEdit, onDelete }) {
  const popover = usePopover();
  const popoverComments = usePopover();

  const {
    id,
    name,
    price,
    Images1,
    bookers,
    createdAt,
    available,
    priceSale,
    destination,
    ratingNumber,
    VIN,
    Year_field,
    Make,
    Model,
    Type,
    Added_Time,
    Modified_Time,
    Image_Count,
    Days_In_Stock,
    Stock,
    Keys,
    Vehicle_Items,
    Other_Reasons,
  } = tour;

  // const shortLabel = shortDateLabel(available.startDate, available.endDate);
  // const slides = gallery.map((slide) => ({
  //   src: slide.imageUrl,
  // }));
  const dispatch = useDispatch();
  const [carInfo, setCarInfo] = useState(tour);
  const [loadingCar, setLoadingCar] = useState(true);
  const dialog = useBoolean();
  // const theme = useTheme();
  // const slides = getFilePathSrcList(Images1);
  const slides = tour?.Images_List_Sources;
  const lightbox = useLightBox(slides);
  // console.log(`SLIDES IMAGES ${Stock} :`, slides);
  const { loginUserState } = useSelector((store) => store.user);

  const handlingEditRecord = () => {
    const url = `https://creatorapp.zoho.com/dealernet/dealer-inventory/Dealer_Inventory_Records/record-edit/On_Site_Inventory/${carInfo?.ID}/`;
    if (typeof url === 'string' && url.trim() !== '') {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };
  const handleVehicleViewing = () => {
    dialog.onTrue();
    console.log('LOAD CAR INFO ....', carInfo?.ID);
    // setLoadingPage(true);
    const config = {
      appName: loginUserState?.appLinkName,
      reportName: 'On_Site_Inventory',
      id: carInfo?.ID,
    };
    // await dispatch(getRecordByID(config));
    dispatch(getRecordByID(config)).then((carResponse) => {
      console.log('LOADED CAR INFO ....', carResponse);
      setCarInfo(carResponse?.payload?.data);
    });
  };

  const renderRating = (
    <Stack
      direction="column"
      alignItems="center"
      sx={{
        top: 12,
        right: 12,
        zIndex: 9,

        position: 'absolute',
        gap: 0.25,
        typography: 'subtitle2',

        // bgcolor:{Keys !== '' ? 'warning.dark':''},
      }}
    >
      <Stack
        key={Type}
        spacing={0.5}
        direction="row"
        alignItems="flex-end"
        sx={{
          typography: 'subtitle2',
          bgcolor: 'rgb(33, 43, 54)',
          borderRadius: 1,
          p: '2px 6px 2px 4px',
          color: 'whitesmoke',
        }}
      >
        <Iconify icon="solar:tag-price-bold" sx={{ color: 'whitesmoke' }} />
        {Type}
      </Stack>
    </Stack>
  );

  const renderType = (
    <Stack
      direction="column"
      alignItems="flex-start"
      sx={{
        top: 12,
        left: 12,
        zIndex: 9,
        position: 'absolute',
        gap: 0.25,
        typography: 'subtitle2',
      }}
    >
      {Keys === 'Need' && (
        <Stack
          key={Keys}
          spacing={0.5}
          direction="row"
          alignItems="center"
          sx={{
            typography: 'subtitle2',
            bgcolor: 'warning.dark',
            borderRadius: 1,
            p: '2px 6px 2px 4px',
            color: 'whitesmoke',
          }}
        >
          <Iconify icon="mdi:table-key" sx={{ color: 'whitesmoke' }} />
          Keys Needed
        </Stack>
      )}
      {Keys !== 'Need' && Keys !== '' && (
        <Stack
          key={Keys}
          spacing={0.5}
          direction="row"
          alignItems="center"
          sx={{
            typography: 'subtitle2',
            bgcolor: 'warning.dark',
            borderRadius: 1,
            p: '2px 6px 2px 4px',
            color: 'whitesmoke',
          }}
        >
          <Iconify icon="mdi:table-key" sx={{ color: 'whitesmoke' }} />
          {`Keys ${Keys}`}
        </Stack>
      )}
      {Vehicle_Items !== '' &&
        Vehicle_Items.map((item) => (
          <Stack
            key={item?.display_value}
            spacing={0.5}
            direction="row"
            alignItems="center"
            sx={{
              typography: 'subtitle2',
              bgcolor: 'green',
              borderRadius: 1,
              p: '2px 6px 2px 4px',
              color: 'whitesmoke',
            }}
          >
            <Iconify icon="ant-design:comment-outlined" sx={{ color: 'whitesmoke' }} />
            {item?.display_value}
          </Stack>
        ))}
      {Other_Reasons !== '' && (
        <Stack
          key={Other_Reasons}
          spacing={0.5}
          direction="row"
          alignItems="center"
          sx={{
            typography: 'subtitle2',
            bgcolor: 'green',
            borderRadius: 1,
            p: '2px 6px 2px 4px',
            color: 'whitesmoke',
          }}
        >
          <Iconify icon="ant-design:comment-outlined" sx={{ color: 'whitesmoke' }} />
          {Other_Reasons}
        </Stack>
      )}
    </Stack>
  );
  const renderCartType = (
    <Stack
      direction="column"
      alignItems="flex-start"
      sx={{
        top: 2,
        // left: 12,
        zIndex: 9,
        position: 'absolute',
        gap: 0.25,
        typography: 'subtitle2',
        ml: 1.1,
      }}
    >
      {Keys === 'Need' && (
        <Stack
          key={Keys}
          spacing={0.5}
          direction="row"
          alignItems="center"
          sx={{
            typography: 'subtitle2',
            bgcolor: 'warning.dark',
            borderRadius: 0.5,
            p: '2px 6px 2px 4px',
            color: 'whitesmoke',
            fontSize: '0.5rem',
          }}
        >
          <Iconify icon="mdi:table-key" sx={{ color: 'whitesmoke', width: 10, height: 10 }} />
          Keys Needed
        </Stack>
      )}
      {Keys !== 'Need' && Keys !== '' && (
        <Stack
          key={Keys}
          spacing={0.5}
          direction="row"
          alignItems="center"
          sx={{
            typography: 'subtitle2',
            bgcolor: 'warning.dark',
            borderRadius: 0.5,
            p: '2px 6px 2px 4px',
            color: 'whitesmoke',
            fontSize: '0.5rem',
          }}
        >
          <Iconify icon="mdi:table-key" sx={{ color: 'whitesmoke', width: 10, height: 10 }} />
          {`Keys ${Keys}`}
        </Stack>
      )}
    </Stack>
  );
  const renderVehicle = (
    <Stack
      direction="row"
      alignItems="center"
      sx={{
        bottom: 165,
        left: 12,
        zIndex: 9,
        borderRadius: 1,
        bgcolor: 'grey.800',
        position: 'absolute',
        p: '2px 6px 2px 4px',
        color: 'common.white',
        typography: 'subtitle2',
        maxWidth: 285,
      }}
    >
      {/* {!!priceSale && (
        <Box component="span" sx={{ color: 'grey.500', mr: 0.25, textDecoration: 'line-through' }}>
          {fCurrency(priceSale)}
        </Box>
      )}
      {fCurrency(price)} */}
      <Iconify icon="mdi:folder-information-outline" sx={{ color: 'primary.dark', mr: 0.25 }} />
      {getSortedValuesByKey(Vehicle_Items, 'display_value')}
    </Stack>
  );

  const renderTexts = (
    <ListItemText
      sx={{
        p: (theme) => theme.spacing(2.5, 2.5, 2, 2.5),
        cursor: 'pointer',
      }}
      primary={`Last Update: ${fDateTimeSecs(Modified_Time)}`}
      secondary={
        <Link onClick={handleVehicleViewing} color="inherit">
          {/* {name} */}
          <Tooltip title="Stock # | Year | Make | Model" arrow>
            {Stock} | {Year_field} | {Make} | {Model}
          </Tooltip>
        </Link>
      }
      primaryTypographyProps={{
        typography: 'caption',
        color: 'text.disabled',
      }}
      secondaryTypographyProps={{
        mt: 1,
        noWrap: true,
        component: 'span',
        color: 'text.primary',
        typography: 'subtitle1',
      }}
    />
  );
  const renderPhotoCountColor = () => {
    let result = 'red';
    if (slides.length > 1 && slides.length < 10) {
      result = 'orange';
    }
    if (slides.length > 10) {
      result = 'green';
    }
    return result;
  };
  const renderDaysOldColor = () => {
    const oldDays = convertToNumber(Days_In_Stock);
    let result = 'red';
    if (oldDays < 7) {
      result = 'green';
    }
    if (oldDays > 7 && oldDays < 15) {
      result = 'orange';
    }
    return result;
  };

  const renderInfo = (
    <>
      <Stack
        spacing={1.5}
        sx={{
          position: 'relative',
          p: (theme) => theme.spacing(0, 2.5, 2.5, 2.5),
        }}
      >
        <IconButton onClick={popover.onOpen} sx={{ position: 'absolute', bottom: 20, right: 8 }}>
          <Iconify icon="eva:more-vertical-fill" />
        </IconButton>

        <Stack
          key={Image_Count}
          spacing={1}
          direction="row"
          alignItems="center"
          sx={{ typography: 'body2' }}
        >
          <Iconify
            icon="material-symbols-light:photo-camera-outline"
            sx={{ color: renderPhotoCountColor }}
          />
          <Tooltip title="Photo Count" arrow>
            {Image_Count}
          </Tooltip>
        </Stack>
        <Stack
          key={Days_In_Stock}
          spacing={1}
          direction="row"
          alignItems="center"
          sx={{ typography: 'body2' }}
        >
          <Iconify icon="mdi:calendar-clock" sx={{ color: renderDaysOldColor }} />
          <Tooltip title="Days Old" arrow>
            {Days_In_Stock}
          </Tooltip>
        </Stack>
        {/* {[
          {
            label: Image_Count,
            icon: <Iconify icon="mdi:camera-iris" sx={{ color: 'error.main' }} />,
          },
          {
            label: Days_In_Stock,
            icon: <Iconify icon="mdi:calendar-clock" sx={{ color: 'info.main' }} />,
          },
        ].map((item) => (
          <Stack
            key={item.label}
            spacing={1}
            direction="row"
            alignItems="center"
            sx={{ typography: 'body2' }}
          >
            {item.icon}
            {item.label}
          </Stack>
        ))} */}
      </Stack>
    </>
  );
  const renderInfo1 = (
    <>
      <Stack
        spacing={1.5}
        sx={{
          position: 'relative',
          p: (theme) => theme.spacing(2.5, 2.5, 2.5, 2.5),
        }}
      >
        {/* <IconButton onClick={popover.onOpen} sx={{ position: 'absolute', bottom: 20, right: 8 }}>
          <Iconify icon="eva:more-vertical-fill" />
        </IconButton> */}
        {[
          {
            label: 'Add to Keys Needed ?',
            icon: (
              <Iconify icon="solar:checklist-minimalistic-broken" sx={{ color: 'error.main' }} />
            ),
          },
        ].map((item) => (
          <Stack
            key={item.label}
            spacing={1}
            direction="row"
            alignItems="center"
            sx={{ typography: 'body2' }}
          >
            {item.icon}
            {item.label}
          </Stack>
        ))}

        <Grid
          item
          xs={12}
          md={8}
          sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
        >
          {/* <Button
            variant="contained"
            startIcon={<Iconify icon="solar:clipboard-remove-bold" sx={{ color: 'error.main' }} />}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            startIcon={<Iconify icon="solar:verified-check-bold" sx={{ color: 'success.main' }} />}
          >
            Yes
          </Button> */}
        </Grid>
      </Stack>
    </>
  );
  const renderInfo2 = (
    <>
      <Stack
        spacing={1.5}
        sx={{
          position: 'relative',
          p: (theme) => theme.spacing(2.5, 2.5, 2.5, 2.5),
        }}
      >
        {/* <IconButton onClick={popover.onOpen} sx={{ position: 'absolute', bottom: 20, right: 8 }}>
          <Iconify icon="eva:more-vertical-fill" />
        </IconButton> */}
        {[
          {
            label: 'Add Reason(s) ?',
            icon: (
              <Iconify icon="solar:checklist-minimalistic-broken" sx={{ color: 'error.main' }} />
            ),
          },
        ].map((item) => (
          <Stack
            key={item.label}
            spacing={1}
            direction="row-reverse"
            alignItems="center"
            textAlign="right"
            sx={{ typography: 'body2' }}
          >
            {item.icon}
            {item.label}
          </Stack>
        ))}

        <Grid
          xs={12}
          md={8}
          sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
        >
          {/* <Button
            variant="contained"
            startIcon={<Iconify icon="solar:clipboard-remove-bold" sx={{ color: 'error.main' }} />}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            startIcon={<Iconify icon="solar:verified-check-bold" sx={{ color: 'success.main' }} />}
          >
            Yes
          </Button> */}
        </Grid>
      </Stack>
    </>
  );

  const carousel = useCarousel({
    autoplay: false,
    initialSlide: 1,
    infinite: true,
    car_info: tour,
    originalIndex: 1,
  });
  // const {
  //   dialogSwipe, // Get the dialog component
  // } = useCarousel(props);

  const TOUR_DETAILS_TABS = [
    { value: 'content', label: 'Vehicle Information' },
    { value: 'history', label: 'Vehicle History' },
    { value: 'bookers', label: 'Gallery' },
  ];
  const { swipeLeftState, swipeRightState } = useSelector((store) => store.user);
  const [currentTab, setCurrentTab] = useState('content');
  const handleChangeTab = useCallback((event, newValue) => {
    setCurrentTab(newValue);
  }, []);
  // const historyTimeline = carInfo?.Vehicle_History;
  const historyTimeline = stringToListObjects(carInfo?.Vehicle_History);
  // console.log('historyTimeline', historyTimeline);
  const settings = useSettingsContext();
  const renderTabSize = (value) => {
    if (value === 'bookers') {
      return <Label variant="filled">{slides.length}</Label>;
    }
    if (value === 'history') {
      return <Label variant="filled">{historyTimeline.length}</Label>;
    }
    return '';
  };
  const renderTabBgColor = () => {
    if (settings.themeMode === 'dark') {
      return 'rgb(33, 43, 54)';
    }
    return 'rgb(255, 255, 255)';
  };
  const renderTabs = (
    <Tabs
      value={currentTab}
      onChange={handleChangeTab}
      sx={{
        mb: { xs: 2, md: 2 },
        // position: 'sticky',
        // top: 0,

        pr: 3,
        pl: 3,
        // zIndex: 1000, // Ensure it's above other content
        bgcolor: renderTabBgColor(),
        borderBottom: (theme) => `dashed 1px ${theme.palette.divider}`,
        borderTop: (theme) => `dashed 1px ${theme.palette.divider}`,
        // bgcolor: (theme) => theme.palette.background.default, // Set background color to avoid overlap issues
        // backgroundColor: 'background.default', // Ensure the background matches your theme
        // color: 'default',
      }}
    >
      {TOUR_DETAILS_TABS.map((tab) => (
        <Tab
          key={tab.value}
          iconPosition="end"
          value={tab.value}
          label={tab.label}
          icon={renderTabSize(tab.value)}
        />
      ))}
    </Tabs>
  );
  const renderCommentLength = () => {
    if (Other_Reasons !== '') {
      return Vehicle_Items.length + 1;
    }
    return Vehicle_Items.length;
  };

  const renderCarInfo = (
    <Stack>
      <Stack spacing={1}>
        <ListItemText
          sx={{
            // p: (theme) => theme.spacing(2.5, 2.5, 2, 2.5),
            cursor: 'pointer',
          }}
          primary={`Last Update: ${fDateTimeSecs(Modified_Time)}`}
          secondary={
            <Link onClick={handleVehicleViewing} color="inherit">
              {/* {name} */}
              <Tooltip title="Stock # | Year | Make | Model" arrow>
                {Stock} | {Year_field} | {Make} | {Model}
              </Tooltip>
            </Link>
          }
          primaryTypographyProps={{
            typography: 'caption',
            color: 'text.disabled',
            minWidth: '200px',
            // maxWidth: '200px',
          }}
          secondaryTypographyProps={{
            // mt: 1,
            noWrap: true,
            component: 'span',
            color: 'text.primary',
            typography: 'subtitle1',
            minWidth: '200px',
            maxWidth: '230px',
          }}
        />
      </Stack>

      <Stack
        spacing={1}
        direction="row"
        // spacing={1.5}
        sx={{
          p: (theme) => theme.spacing(0.8, 3, 1, 0),
          justifyContent: 'space-between',
        }}
      >
        <>
          {/* sx={{ position: 'absolute', bottom: 20, right: 8 }} */}
          <Tooltip title="Photo Count" arrow>
            <Stack
              key={Image_Count}
              spacing={1}
              direction="row"
              alignItems="center"
              sx={{ typography: 'body2' }}
            >
              <Iconify icon="mdi:camera" sx={{ color: renderPhotoCountColor }} />

              {Image_Count}
            </Stack>
          </Tooltip>
          <Tooltip title="Days Old" arrow>
            <Stack
              key={Days_In_Stock}
              spacing={1}
              direction="row"
              alignItems="center"
              sx={{ typography: 'body2' }}
            >
              <Iconify icon="mdi:calendar-clock" sx={{ color: renderDaysOldColor }} />

              {Days_In_Stock}
            </Stack>
          </Tooltip>
          <Tooltip title="Reasons" arrow>
            <Stack
              // key={Days_In_Stock}
              spacing={1}
              direction="row"
              alignItems="center"
              sx={{ typography: 'body2', cursor: 'pointer' }}
              onClick={popoverComments.onOpen}
            >
              <Iconify icon="ant-design:comment-outlined" />

              {renderCommentLength()}
            </Stack>
          </Tooltip>
        </>
      </Stack>
      {/* <Stack
        spacing={1}
        direction="row"
        alignItems="center"
        sx={{ position: 'absolute', left: '41%', bottom: '5%' }}
      >
        <IconButton onClick={popover.onOpen}>
          <Iconify icon="eva:more-vertical-fill" />
        </IconButton>
      </Stack> */}
    </Stack>
  );
  const renderImages = (
    <Stack
      spacing={1}
      direction="row"
      sx={{
        display: 'flex !important',
        p: (theme) => theme.spacing(1, 1, 0, 1),
      }}
    >
      {renderCartType}
      {/* {renderType}

      {renderRating} */}

      <Stack sx={{ position: 'relative', cursor: 'pointer', color: 'common.white' }}>
        {/* flexGrow={1} */}
        {/* <Image 
          alt={slides[0]?.src}
          src={slides[0]?.src}
          onClick={() => lightbox.onOpen(slides[0]?.src)}
          sx={{ borderRadius: 1, height: 100, width: 1 }}
        /> */}
        <Image
          alt={slides[0]?.src}
          src={slides[0]?.src}
          onClick={() => lightbox.onOpen(slides[0]?.src)}
          ratio="1/1"
          sx={{ borderRadius: 1, width: 80, cursor: 'pointer', color: 'common.white', height: 70 }}
        />
      </Stack>
      {renderCarInfo}
    </Stack>
  );
  return (
    <>
      <ViewVehicleInfo
        dialogvalue={dialog.value}
        dialogonFalse={dialog.onFalse}
        Transition={Transition}
        tour={tour}
        renderTabs={renderTabs}
        currentTab={currentTab}
        slides={slides}
        settings={settings}
        historyTimeline={historyTimeline}
      />

      <Card
        sx={{
          // backgroundColor: 'rgb(255, 255, 255)',
          boxShadow: 'rgba(0, 0, 0, 0.1) 0px 2px 4px 0px, rgba(0, 0, 0, 0.1) 0px 12px 24px -4px',
          // padding: 2,
          borderRadius: 2,
        }}
      >
        {/* {renderTexts} */}
        {/* {renderImages} */}
        <Carousel ref={carousel.carouselRef} {...carousel.carouselSettings}>
          {/* {renderInfo2}


          {renderInfo1} */}
          {renderInfo2}
          {renderImages}
          {renderInfo1}
        </Carousel>

        {/* {carousel.dialogSwipe} */}
        {}
      </Card>
      <Lightbox
        index={lightbox.selected}
        slides={slides}
        open={lightbox.open}
        close={lightbox.onClose}
      />
      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="right-top"
        sx={{ width: 140 }}
      >
        <MenuItem
          onClick={() => {
            dialog.onTrue();
            popover.onClose();
          }}
        >
          <Iconify icon="solar:eye-bold" />
          View
        </MenuItem>

        <MenuItem onClick={handlingEditRecord}>
          <Iconify icon="solar:pen-bold" />
          Edit
        </MenuItem>
      </CustomPopover>
      <CustomPopover
        open={popoverComments.open}
        onClose={popoverComments.onClose}
        arrow="right-top"
      >
        {Vehicle_Items !== '' &&
          Vehicle_Items.map((item) => (
            <Stack
              key={item?.display_value}
              spacing={0.5}
              direction="row"
              alignItems="center"
              sx={{
                typography: 'caption',
                // bgcolor: 'green',
                borderRadius: 1,
                p: '2px 6px 2px 4px',
                // color: 'whitesmoke',
              }}
            >
              <Iconify icon="ant-design:comment-outlined" />
              {item?.display_value}
            </Stack>
          ))}
        {Other_Reasons !== '' && (
          <Stack
            key={Other_Reasons}
            spacing={0.5}
            direction="row"
            alignItems="center"
            sx={{
              typography: 'caption',
              // bgcolor: 'green',
              borderRadius: 1,
              p: '2px 6px 2px 4px',
              // color: 'whitesmoke',
            }}
          >
            <Iconify icon="ant-design:comment-outlined" />
            {Other_Reasons}
          </Stack>
        )}
      </CustomPopover>
    </>
  );
}

TourItem.propTypes = {
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
  onView: PropTypes.func,
  tour: PropTypes.object,
};
