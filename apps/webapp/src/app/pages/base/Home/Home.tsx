import { wrapUserPage } from '@components/PageWrapper';
import { compose } from '@utils/helpers';

const Page = () => <span>Home page works</span>

export const Home = compose(
  wrapUserPage()
)(Page);
