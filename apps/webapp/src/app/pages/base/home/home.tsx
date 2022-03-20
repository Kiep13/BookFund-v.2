import { wrapUserPage } from '@components/pageWrapper';
import { compose } from '@utils/helpers';

const Page = () => {
  return (
    <span>Home page works</span>
  );
}

export const Home = compose(
  wrapUserPage()
)(Page);
