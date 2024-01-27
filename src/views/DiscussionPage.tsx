import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ReplayIcon from '@mui/icons-material/Replay';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import LinearProgress from '@mui/material/LinearProgress';
import { useTheme } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link as RouterLink, useLocation } from 'react-router-dom';

export const DiscussionPage: React.FC = () => {
  const { spacing } = useTheme();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = parseInt(queryParams.get('id') ?? '', 10);

  const topPart = (
    <>
      <Box sx={{ minBlockSize: 4, marginInline: spacing(-2) }}>
        {false && <LinearProgress color='inherit' />}
      </Box>
      <Toolbar sx={{ gap: spacing(1) }} disableGutters>
        <IconButton
          aria-label='Go back to home page'
          color='inherit'
          component={RouterLink}
          edge='start'
          size='large'
          to='/'>
          <ArrowBackIcon />
        </IconButton>
        <Typography component='h2' flexGrow={1} variant='h5'>
          Discussion
        </Typography>
        <Button
          color='inherit'
          size='large'
          startIcon={<ReplayIcon />}
          sx={{ marginInlineEnd: spacing(-1) }}
          disabled>
          Refresh
        </Button>
      </Toolbar>
    </>
  );

  return (
    <>
      {topPart}
      {id ? (
        <Typography component='h3' variant='h6'>
          #{id}
        </Typography>
      ) : (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Alert severity='error'>There&apos;s no post with this ID.</Alert>
        </Box>
      )}
    </>
  );
};
