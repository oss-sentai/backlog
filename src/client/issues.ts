import { CreateIssueParams, Issue } from '../types/issues.type';
import BacklogClient from '../backlogClient';
import { Constructor } from '../utils';

interface Issues {
  createIssue(params: CreateIssueParams): Promise<Issue>;
}

export default <T extends Constructor<BacklogClient>>(Base: T) =>
  class extends Base implements Issues {
    async createIssue(params: CreateIssueParams): Promise<Issue> {
      const { data } = await this.httpClient.post<Issue>(
        '/api/v2/issues',
        this.httpClient.generateURLSearchParams(params)
      );
      return data;
    }
  };
