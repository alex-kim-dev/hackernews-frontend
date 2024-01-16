import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { observer } from 'mobx-react-lite';

import { stories } from '~/stores/stories';

export const HomePage = observer(function HomePage() {
  const theme = useTheme();

  if (stories.state === 'idle')
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Alert severity='info'>Nothing to show.</Alert>
      </Box>
    );

  if (stories.state === 'pending')
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    );

  if (stories.state === 'error')
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Alert severity='error'>
          There was a problem getting the stories. Try again.
        </Alert>
      </Box>
    );

  return (
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
  );
});
