import WithSpace from './client/space';
import WithUser from './client/user';
import WithProject from './client/project';
import BacklogClient from './backlogClient';

export default WithProject(WithUser(WithSpace(BacklogClient)));
