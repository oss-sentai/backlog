import { Constructor } from './../utils';
import BacklogClient from '../backlogClient';

type TextFormattingRule = 'markdown' | 'backlog';

export type Project = {
  id: string;
  projectKey: string;
  name: string;
  chartEnabled: boolean;
  subtaskingEnabled: boolean;
  projectLeaderCanEditProjectLeader: boolean;
  textFormattingRule: TextFormattingRule;
  archived: boolean;
  displayOrder: number;
  useDevAttributes: boolean;
};

export type CreateProjectParams = {
  name: string;
  key: string;
  chartEnabled?: boolean;
  projectLeaderCanEditProjectLeader?: boolean;
  subtaskingEnabled?: boolean;
  textFormattingRule?: TextFormattingRule;
};

export type UpdateProjectParams = {
  name?: string;
  key?: string;
  chartEnabled?: boolean;
  projectLeaderCanEditProjectLeader?: boolean;
  subtaskingEnabled?: boolean;
  textFormattingRule?: TextFormattingRule;
  archived?: boolean;
};

interface ProjectInterface {
  getProjectList(): Promise<Project[]>;
  getProjectInfo(projectIdOrKey: string): Promise<Project>;
  createProject(params: CreateProjectParams): Promise<Project>;
  updateProject(
    projectIdOrKey: string,
    params: UpdateProjectParams
  ): Promise<Project>;
  deleteProject(projectIdOrKey: string): Promise<Project>;
}

export default <T extends Constructor<BacklogClient>>(Base: T) =>
  class extends Base implements ProjectInterface {
    async getProjectList(): Promise<Project[]> {
      const { data } = await this.httpClient.get<Project[]>(
        '/api/v2/projects '
      );
      return data;
    }

    async getProjectInfo(projectIdOrKey: string): Promise<Project> {
      const { data } = await this.httpClient.get<Project>(
        `/api/v2/projects/${projectIdOrKey}`
      );
      return data;
    }

    async createProject(params: CreateProjectParams): Promise<Project> {
      const { data } = await this.httpClient.post<Project>(
        '/api/v2/projects',
        this.httpClient.generateURLSearchParams(params)
      );
      return data;
    }

    async updateProject(
      projectIdOrKey: string,
      params: UpdateProjectParams
    ): Promise<Project> {
      const { data } = await this.httpClient.patch<Project>(
        `/api/v2/projects/${projectIdOrKey}`,
        this.httpClient.generateURLSearchParams(params)
      );
      return data;
    }

    async deleteProject(projectIdOrKey: string): Promise<Project> {
      const { data } = await this.httpClient.delete<Project>(
        `/api/v2/projects/${projectIdOrKey}`
      );
      return data;
    }
  };
