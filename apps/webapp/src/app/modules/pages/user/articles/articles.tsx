import { wrapUserPage } from '@features/pageWrapper';
import { compose } from '@shared/utils';

export const Page = () => {
  return <>Articles page works</>
}

export const Articles = compose(
  wrapUserPage()
)(Page);
