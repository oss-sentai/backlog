import WithSpace from './client/space';
import WithUser from './client/user';
import WithProject from './client/project';
import WithIssues from './client/issues';
import BacklogClient from './backlogClient';
import { CreateIssueParams } from './types/issues.type';

export default WithProject(WithIssues(WithUser(WithSpace(BacklogClient))));

export { CreateIssueParams };
