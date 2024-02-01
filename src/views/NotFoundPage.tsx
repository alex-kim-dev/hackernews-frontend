import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';

export const NotFoundPage: React.FC = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Alert severity='error'>
        No page with this address.{' '}
        <Link component={RouterLink} to='/'>
          Go to home page.
        </Link>
      </Alert>
    </Box>
  );
};
