import ArticleIcon from '@mui/icons-material/Article';
import PollIcon from '@mui/icons-material/Poll';
import ReplayIcon from '@mui/icons-material/Replay';
import WorkIcon from '@mui/icons-material/Work';
import Alert from '@mui/material/Alert';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { createPortal } from 'react-dom';
import { Link as RouterLink } from 'react-router-dom';

import { appBarContext } from '~/contexts';
import { content } from '~/stores';
import { Item } from '~/types';
import { relTimeFormat } from '~/utils';

const makeInfoStr = ({ by, score, time, descendants }: Item): string => {
  const parts = [];
  if (score !== undefined)
    parts.push(`${score} point${score === 1 ? '' : 's'}`);
  if (by) parts.push(`by ${by}`);
  if (time !== undefined) parts.push(relTimeFormat(time));
  if (descendants)
    parts.push(`| ${descendants} comment${descendants === 1 ? '' : 's'}`);
  return parts.join(' ');
};

export const HomePage: React.FC = observer(function HomePage() {
  const { state } = content;
  const { breakpoints, spacing, palette } = useTheme();
  const isSmUp = useMediaQuery(breakpoints.up('sm').slice(7));
  const appBarSlot = useContext(appBarContext);

  const handleRefresh = () => {
    content.getRecent();
  };

  const appBarPortal = appBarSlot
    ? createPortal(
        isSmUp ? (
          <Button
            color='inherit'
            disabled={state === 'pending'}
            size='large'
            startIcon={<ReplayIcon />}
            onClick={handleRefresh}>
            Refresh
          </Button>
        ) : (
          <IconButton
            aria-label='Refresh'
            color='inherit'
            disabled={state === 'pending'}
            size='large'
            onClick={handleRefresh}>
            <ReplayIcon />
          </IconButton>
        ),
        appBarSlot,
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
              There was a problem getting the content. Try again.
            </Alert>
          )}
        </Box>
      </>
    );
  }

  return (
    <>
      {appBarPortal}
      <Typography component='h2' variant='h5'>
        Recent
      </Typography>
      <List sx={{ marginInline: spacing(-2) }}>
        {content.recent.map((item) => (
          <ListItem
            key={item.id}
            sx={{ '&:hover': { backgroundColor: palette.action.hover } }}>
            <ListItemAvatar>
              <Avatar>
                {item.type === 'story' && <ArticleIcon />}
                {item.type === 'job' && <WorkIcon />}
                {item.type === 'poll' && <PollIcon />}
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={
                <Link component={RouterLink} to={`item?id=${item.id}.json`}>
                  {item.title || '<No title>'}
                </Link>
              }
              secondary={makeInfoStr(item)}
            />
          </ListItem>
        ))}
      </List>
    </>
  );
});
