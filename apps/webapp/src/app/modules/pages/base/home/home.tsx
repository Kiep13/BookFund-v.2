import compose from '@shared/utils/compose';
import { wrapUserPage } from '@features/page-wrapper';

function Home() {
  return (
    <span>Home page works</span>
  );
}

export default compose(
  wrapUserPage()
)(Home);
