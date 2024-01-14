import { useLocation } from 'react-router-dom';

export const DiscussionPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('id');

  if (!id) return <h2>No such item</h2>;

  return <h2>Discussion #{id}</h2>;
};
