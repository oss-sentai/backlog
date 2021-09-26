import WithSpace from './client/space';
import WithUser from './client/user';
import BacklogClient from './backlogClient';

export default WithUser(WithSpace(BacklogClient));
