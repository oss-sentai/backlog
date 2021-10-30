import {
  CreateIssueParams,
  GetIssuesParams,
  Issue,
} from '../types/issues.type';
import BacklogClient from '../backlogClient';
import { Constructor } from '../utils';

interface Issues {
  createIssue(params: CreateIssueParams): Promise<Issue>;
  getIssue(idOrKey: string): Promise<Issue>;
  getIssues(params: GetIssuesParams): Promise<Issue[]>;
  deleteIsseue(issueIdOrKey: string): Promise<Issue>;
}

export default <T extends Constructor<BacklogClient>>(Base: T) =>
  class extends Base implements Issues {
    async getIssues(params?: GetIssuesParams): Promise<Issue[]> {
      const { data } = await this.httpClient.get<Issue[]>(
        '/api/v2/issues',
        params
      );
      return data;
    }

    async getIssue(idOrKey: string): Promise<Issue> {
      const { data } = await this.httpClient.get<Issue>(
        '/api/v2/issues/' + idOrKey
      );
      return data;
    }

    async createIssue(params: CreateIssueParams): Promise<Issue> {
      const { data } = await this.httpClient.post<Issue>(
        '/api/v2/issues',
        this.httpClient.generateURLSearchParams(params)
      );
      return data;
    }

    async deleteIsseue(issueIdOrKey: string): Promise<Issue> {
      const { data } = await this.httpClient.delete<Issue>(
        '/api/v2/issues/' + issueIdOrKey
      );

      return data;
    }
  };
