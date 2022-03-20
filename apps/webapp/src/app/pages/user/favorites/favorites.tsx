import { wrapUserPage } from '@components/pageWrapper';
import { compose } from '@utils/helpers';

const Page = () => {
  return <>Favorites page works</>
}

export const Favorites = compose(
  wrapUserPage()
)(Page);
