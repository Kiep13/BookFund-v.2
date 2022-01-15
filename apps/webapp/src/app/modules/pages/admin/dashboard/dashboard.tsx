import compose from '@shared/utils/compose';
import { wrapAdminPage } from '@features/page-wrapper';

function Dashboard() {
  return (
    <span>Dashboard page works</span>
  );
}

export default compose(
  wrapAdminPage()
)(Dashboard);

