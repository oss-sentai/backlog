import { Constructor } from './../utils';
import BacklogClient from '../backlogClient';
import url from 'url';

export interface Project {
  id: string;
  projectKey: string;
  name: string;
  chartEnabled: boolean;
  subtaskingEnabled: boolean;
  projectLeaderCanEditProjectLeader: boolean;
  textFormattingRule: string;
  archived: boolean;
}

export interface CreateProjectParams {
  name: string;
  key: string;
  chartEnabled?: boolean;
  projectLeaderCanEditProjectLeader?: boolean;
  subtaskingEnabled?: boolean;
  textFormattingRule?: string;
}

export interface UpdateProjectParams {
  name?: string;
  key?: string;
  chartEnabled?: boolean;
  projectLeaderCanEditProjectLeader?: boolean;
  subtaskingEnabled?: boolean;
  textFormattingRule?: string;
  archived?: boolean;
}

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
      const requestData = new url.URLSearchParams({
        ...params,
        chartEnabled: params.chartEnabled?.toString(),
        subtaskingEnabled: params.subtaskingEnabled?.toString(),
        projectLeaderCanEditProjectLeader:
          params.projectLeaderCanEditProjectLeader?.toString(),
      }); // TODO: これ大丈夫？？

      const { data } = await this.httpClient.post<Project>(
        '/api/v2/projects',
        requestData.toString()
      );

      return data;
    }

    async updateProject(
      projectIdOrKey: string,
      params: UpdateProjectParams
    ): Promise<Project> {
      const requestData = new url.URLSearchParams({
        ...params,
        chartEnabled: params.chartEnabled?.toString(),
        subtaskingEnabled: params.subtaskingEnabled?.toString(),
        projectLeaderCanEditProjectLeader:
          params.projectLeaderCanEditProjectLeader?.toString(),
        archived: params.archived?.toString(),
      }); // TODO: これ大丈夫？？

      const { data } = await this.httpClient.post<Project>(
        `/api/v2/projects/${projectIdOrKey}`,
        requestData.toString()
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
