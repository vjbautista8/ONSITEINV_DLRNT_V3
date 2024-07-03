import PropTypes from 'prop-types';
// @mui
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

// components
import Iconify from 'src/components/iconify';
import { shortDateLabel } from 'src/components/custom-date-range-picker';

// ----------------------------------------------------------------------

export default function TourFiltersResult({
  filters,
  onFilters,
  //
  canReset,
  onResetFilters,
  //
  results,
  ...other
}) {
  const shortLabel = shortDateLabel(filters.startDate, filters.endDate);

  const handleRemoveServices = (inputValue) => {
    const newValue = filters.services.filter((item) => item !== inputValue);
    onFilters('services', newValue);
  };
  const handleRemoveStatus = (inputValue) => {
    const newValue = filters.status.filter((item) => item !== inputValue);
    onFilters('status', newValue);
  };
  const handleRemoveKeys = (inputValue) => {
    const newValue = filters.keys.filter((item) => item !== inputValue);
    onFilters('keys', newValue);
  };

  const handleRemoveAvailable = () => {
    onFilters('startDate', null);
    onFilters('endDate', null);
  };

  const handleRemoveID = (inputValue) => {
    const newValue = filters.ID.filter((item) => item !== inputValue);
    onFilters('ID', newValue);
  };

  const handleRemoveTourGuide = (inputValue) => {
    const newValue = filters.tourGuides.filter((item) => item.name !== inputValue.name);
    onFilters('tourGuides', newValue);
  };

  const handleRemoveDestination = (inputValue) => {
    const newValue = filters.destination.filter((item) => item !== inputValue);
    onFilters('destination', newValue);
  };

  return (
    <Stack spacing={1.5} {...other}>
      <Box sx={{ typography: 'body2' }}>
        <strong>{results} </strong>
        <Box component="span" sx={{ color: 'text.secondary', ml: 0.25 }}>
          {(results > 1 && 'results found.') || 'result found.'}
        </Box>
      </Box>

      <Stack flexGrow={1} spacing={1} direction="row" flexWrap="wrap" alignItems="center">
        {!!filters.ID.length && (
          <Block label="Search:">
            {filters.ID.map((item) => (
              <Chip key={item} label={item} size="small" onDelete={() => handleRemoveID(item)} />
            ))}
          </Block>
        )}
        {!!filters.destination.length && (
          <Block label="Dealership:">
            {filters.destination.map((item) => (
              <Chip
                key={item}
                label={item}
                size="small"
                onDelete={() => handleRemoveDestination(item)}
              />
            ))}
          </Block>
        )}
        {filters.startDate && filters.endDate && (
          <Block label="Available:">
            <Chip size="small" label={shortLabel} onDelete={handleRemoveAvailable} />
          </Block>
        )}

        {!!filters.status.length && (
          <Block label="Type:">
            {filters.status.map((item) => (
              <Chip
                key={item}
                label={item}
                size="small"
                onDelete={() => handleRemoveStatus(item)}
              />
            ))}
          </Block>
        )}
        {!!filters.keys.length && (
          <Block label="Keys:">
            {filters.keys.map((item) => (
              <Chip key={item} label={item} size="small" onDelete={() => handleRemoveKeys(item)} />
            ))}
          </Block>
        )}
        {!!filters.services.length && (
          <Block label="Vehicle Items:">
            {filters.services.map((item) => (
              <Chip
                key={item}
                label={item}
                size="small"
                onDelete={() => handleRemoveServices(item)}
              />
            ))}
          </Block>
        )}

        {!!filters.tourGuides.length && (
          <Block label="Tour guide:">
            {filters.tourGuides.map((item) => (
              <Chip
                key={item.id}
                size="small"
                avatar={<Avatar alt={item.name} src={item.avatarUrl} />}
                label={item.name}
                onDelete={() => handleRemoveTourGuide(item)}
              />
            ))}
          </Block>
        )}

        {canReset && (
          <Button
            color="error"
            onClick={onResetFilters}
            startIcon={<Iconify icon="solar:trash-bin-trash-bold" />}
          >
            Clear
          </Button>
        )}
      </Stack>
    </Stack>
  );
}

TourFiltersResult.propTypes = {
  canReset: PropTypes.bool,
  filters: PropTypes.object,
  onFilters: PropTypes.func,
  onResetFilters: PropTypes.func,
  results: PropTypes.number,
};

// ----------------------------------------------------------------------

function Block({ label, children, sx, ...other }) {
  return (
    <Stack
      component={Paper}
      variant="outlined"
      spacing={1}
      direction="row"
      sx={{
        p: 1,
        borderRadius: 1,
        overflow: 'hidden',
        borderStyle: 'dashed',
        ...sx,
      }}
      {...other}
    >
      <Box component="span" sx={{ typography: 'subtitle2' }}>
        {label}
      </Box>

      <Stack spacing={1} direction="row" flexWrap="wrap">
        {children}
      </Stack>
    </Stack>
  );
}

Block.propTypes = {
  children: PropTypes.node,
  label: PropTypes.string,
  sx: PropTypes.object,
};
