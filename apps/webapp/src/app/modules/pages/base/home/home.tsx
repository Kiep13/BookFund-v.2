import { wrapUserPage } from '@features/pageWrapper';
import { compose } from '@shared/utils';

const Page = () => {
  return (
    <span>Home page works</span>
  );
}

export const Home = compose(
  wrapUserPage()
)(Page);
