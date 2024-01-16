import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { createPortal } from 'react-dom';
import { Link as RouterLink, useLocation } from 'react-router-dom';

interface DiscussionPageProps {
  appBarRef?: React.MutableRefObject<HTMLDivElement | undefined>;
}

export const DiscussionPage: React.FC<DiscussionPageProps> = ({
  appBarRef,
}) => {
  const theme = useTheme();
  const isSmUp = useMediaQuery(theme.breakpoints.up('sm').slice(7));
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('id');

  return (
    <>
      {appBarRef?.current &&
        createPortal(
          isSmUp ? (
            <Button
              aria-label='Go back to home page'
              color='inherit'
              component={RouterLink}
              size='large'
              startIcon={<ArrowBackIcon />}
              to='/'>
              Back
            </Button>
          ) : (
            <IconButton
              aria-label='Go back to home page'
              color='inherit'
              component={RouterLink}
              size='large'
              to='/'>
              <ArrowBackIcon />
            </IconButton>
          ),
          appBarRef.current,
        )}
      {id ? (
        <Typography component='h2' variant='h6'>
          Discussion #{id}
        </Typography>
      ) : (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Alert severity='error'>There&apos;s no story with this ID.</Alert>
        </Box>
      )}
    </>
  );
};
