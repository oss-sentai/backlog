import WithSpace from './client/space';
import WithUser from './client/user';
import WithIssues from './client/issues';
import BacklogClient from './backlogClient';

import { CreateIssueParams } from './types/issues.type';

export default WithIssues(WithUser(WithSpace(BacklogClient)));

export { CreateIssueParams };
