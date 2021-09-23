import BacklogClient from '../backlogClient';
import { Constructor, Image } from '../utils';

export interface Space {
  spaceKey: string;
  name: string;
  ownerId: number;
  lang: string | 'ja';
  timezone: string;
  reportSendTime: string;
  textFormattingRule: string;
  created: string;
  updated: string;
}

export interface SpaceNotification {
  content: string;
  updated: string;
}

export interface UpdateSpaceNotificationParams {
  content: string;
}

export interface DiskUsageDetail {
  projectId: number;
  issue: number;
  wiki: number;
  file: number;
  subversion: number;
  git: number;
  gitLFS: number;
}

export interface SpaceDiskUsage {
  capacity: number;
  issue: number;
  wiki: number;
  file: number;
  subversion: number;
  git: number;
  gitLFS: number;
  details: DiskUsageDetail[];
}

interface SpaceInterface {
  getSpaceInfo(): Promise<Space>;
  getSpaceImage(): Promise<Image>;
  getSpaceNotification(): Promise<SpaceNotification>;
  updateSpaceNotification(
    params: UpdateSpaceNotificationParams
  ): Promise<SpaceNotification>;
  getSpaceDiskUsage(): Promise<SpaceDiskUsage>;
}

export default <T extends Constructor<BacklogClient>>(Base: T) =>
  class extends Base implements SpaceInterface {
    async getSpaceInfo(): Promise<Space> {
      const { data } = await this.httpClient.get<Space>('/api/v2/space');
      return data;
    }

    async getSpaceImage(): Promise<Image> {
      const { data } = await this.httpClient.get<Image>('/api/v2/space/image');
      return data;
    }

    async getSpaceNotification(): Promise<SpaceNotification> {
      const { data } = await this.httpClient.get<SpaceNotification>(
        '/api/v2/space/notification'
      );
      return data;
    }

    async updateSpaceNotification(
      params: UpdateSpaceNotificationParams
    ): Promise<SpaceNotification> {
      const { data } = await this.httpClient.put<
        UpdateSpaceNotificationParams,
        SpaceNotification
      >('/api/v2/space/notification', params);
      return data;
    }

    async getSpaceDiskUsage(): Promise<SpaceDiskUsage> {
      const { data } = await this.httpClient.get<SpaceDiskUsage>(
        '/api/v2/space/diskUsage'
      );
      return data;
    }
  };
