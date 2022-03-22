import { wrapUserPage } from '@components/PageWrapper';
import { compose } from '@utils/helpers';

export const Page = () => <>Articles page works</>

export const Articles = compose(
  wrapUserPage()
)(Page);
