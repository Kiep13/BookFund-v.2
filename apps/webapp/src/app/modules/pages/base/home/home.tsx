import compose from '@shared/utils/compose';
import { wrapUserPage } from '@features/pageWrapper';

const HomePage = () => {
  return (
    <span>Home page works</span>
  );
}

export const Home = compose(
  wrapUserPage()
)(HomePage);
