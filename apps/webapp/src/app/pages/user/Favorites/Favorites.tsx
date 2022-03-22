import { wrapUserPage } from '@components/PageWrapper';
import { compose } from '@utils/helpers';

const Page = () => <>Favorites page works</>

export const Favorites = compose(
  wrapUserPage()
)(Page);
