import { wrapUserPage } from '@features/pageWrapper';
import { compose } from '@shared/utils';

const Page = () => {
  return <>Favorites page works</>
}

export const Favorites = compose(
  wrapUserPage()
)(Page);
