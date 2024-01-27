import ArticleIcon from '@mui/icons-material/Article';
import PollIcon from '@mui/icons-material/Poll';
import ReplayIcon from '@mui/icons-material/Replay';
import WorkIcon from '@mui/icons-material/Work';
import Alert from '@mui/material/Alert';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import { useTheme } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { content } from '~/stores';
import { Item } from '~/types';
import { relTimeFormat } from '~/utils';

const makeInfoStr = ({ by, score, time, descendants }: Item): string => {
  const parts = [];
  if (score !== undefined)
    parts.push(`${score}\xa0point${score === 1 ? '' : 's'}`);
  if (by) parts.push(`by\xa0${by}`);
  if (time !== undefined) parts.push(relTimeFormat(time));
  if (descendants)
    parts.push(`—\xa0${descendants}\xa0comment${descendants === 1 ? '' : 's'}`);
  return parts.join(' ');
};

export const HomePage: React.FC = observer(function HomePage() {
  const { state } = content;
  const { spacing, palette } = useTheme();

  useEffect(() => {
    content.getRecent();
    return () => {
      content.stopUpdate();
    };
  }, []);

  const handleRefresh = () => {
    content.getRecent();
  };

  const topPart = (
    <>
      <Box sx={{ minBlockSize: 4, marginInline: spacing(-2) }}>
        {content.state === 'pending' && <LinearProgress color='inherit' />}
      </Box>
      <Toolbar disableGutters>
        <Typography component='h2' flexGrow={1} variant='h5'>
          Recent
        </Typography>
        <Button
          color='inherit'
          disabled={state === 'pending'}
          size='large'
          startIcon={<ReplayIcon />}
          sx={{ marginInlineEnd: spacing(-1) }}
          onClick={handleRefresh}>
          Refresh
        </Button>
      </Toolbar>
    </>
  );

  if (state === 'error') {
    return (
      <>
        {topPart}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            padding: spacing(2),
          }}>
          <Alert severity='error'>
            There was a problem getting the content. Try again.
          </Alert>
        </Box>
      </>
    );
  }

  if (content.recent.length === 0 && state !== 'pending') {
    return (
      <>
        {topPart}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            padding: spacing(2),
          }}>
          <Alert severity='info'>Nothing to show.</Alert>
        </Box>
      </>
    );
  }

  return (
    <>
      {topPart}
      <List sx={{ marginInline: spacing(-2) }}>
        {content.recent.map((item) => (
          <ListItem
            key={item.id}
            sx={{ '&:hover': { backgroundColor: palette.action.hover } }}>
            <ListItemAvatar sx={{ alignSelf: 'flex-start', marginTop: 1 }}>
              <Avatar>
                {item.type === 'story' && <ArticleIcon />}
                {item.type === 'job' && <WorkIcon />}
                {item.type === 'poll' && <PollIcon />}
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={
                <Link component={RouterLink} to={`item?id=${item.id}`}>
                  {item.title || '<No title>'}
                </Link>
              }
              secondary={makeInfoStr(item)}
              sx={{ textWrap: 'balance' }}
            />
          </ListItem>
        ))}
      </List>
    </>
  );
});
