import ReplayIcon from '@mui/icons-material/Replay';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { observer } from 'mobx-react-lite';
import { createPortal } from 'react-dom';

import { stories } from '~/stores/stories';

interface HomePageProps {
  appBarRef?: React.MutableRefObject<HTMLDivElement | undefined>;
}

export const HomePage: React.FC<HomePageProps> = observer(function HomePage({
  appBarRef,
}) {
  const { state } = stories;
  const theme = useTheme();
  const isSmUp = useMediaQuery(theme.breakpoints.up('sm').slice(7));

  const handleRefresh = () => {
    stories.getTopStories();
  };

  const appBarPortal = appBarRef?.current
    ? createPortal(
        isSmUp ? (
          <Button
            aria-label='Refresh stories'
            color='inherit'
            disabled={state === 'pending'}
            size='large'
            startIcon={<ReplayIcon />}
            onClick={handleRefresh}>
            Refresh
          </Button>
        ) : (
          <IconButton
            aria-label='Refresh stories'
            color='inherit'
            disabled={state === 'pending'}
            size='large'
            onClick={handleRefresh}>
            <ReplayIcon />
          </IconButton>
        ),
        appBarRef.current,
      )
    : null;

  if (state !== 'done') {
    return (
      <>
        {appBarPortal}
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          {state === 'idle' && <Alert severity='info'>Nothing to show.</Alert>}
          {state === 'pending' && <CircularProgress />}
          {state === 'error' && (
            <Alert severity='error'>
              There was a problem getting the stories. Try again.
            </Alert>
          )}
        </Box>
      </>
    );
  }

  return (
    <>
      {appBarPortal}
      <Stack spacing={2} sx={{ marginBlock: theme.spacing(2) }}>
        {stories.topStories.map(({ by, id, score, time, title }) => (
          <Paper key={id} sx={{ padding: theme.spacing(1) }}>
            <Typography component='h3' variant='h6'>
              {title ?? '-'}
            </Typography>
            Author: {by ?? '-'}
            <br />
            Score: {score ?? 0}
            <br />
            Date: {time ? new Date(time * 1000).toDateString() : '-'}
          </Paper>
        ))}
      </Stack>
    </>
  );
});
