import { Constructor } from './../utils';
import BacklogClient from '../backlogClient';

enum ROLE_TYPE {
  ADOMIN = 1,
  USER,
  REPORTER,
  VIEWER,
  GUEST_REPORTER,
  GUEST_VIEWER,
}

export type User = {
  id: number;
  userId: string;
  name: string;
  roleType: ROLE_TYPE;
  lang: string | null;
  mailAddress: string;
};

export type CreateUserParams = {
  userId: string;
  password: string;
  name: string;
  mailAddress: string;
  roleType: ROLE_TYPE;
};

export type UpdateUserParams = {
  password: string;
  name: string;
  mailAddress: string;
  roleType: ROLE_TYPE;
};

interface UserInterface {
  getUserList(): Promise<User[]>;
  getUserInfo(userId: number): Promise<User>;
  createUser(params: CreateUserParams): Promise<User>;
  updateUser(userId: number, params: UpdateUserParams): Promise<User>;
  deleteUser(userId: number): Promise<User>;
  getMySelf(): Promise<User>;
}

export default <T extends Constructor<BacklogClient>>(Base: T) =>
  class extends Base implements UserInterface {
    async getUserList(): Promise<User[]> {
      const { data } = await this.httpClient.get<User[]>('/api/v2/users');
      return data;
    }

    async getUserInfo(userId: number): Promise<User> {
      const { data } = await this.httpClient.get<User>(
        `/api/v2/users/${userId}`
      );
      return data;
    }

    async createUser(params: CreateUserParams): Promise<User> {
      const { data } = await this.httpClient.post<User>(
        '/api/v2/users',
        this.httpClient.generateURLSearchParams(params)
      );
      return data;
    }

    async updateUser(userId: number, params: UpdateUserParams): Promise<User> {
      const { data } = await this.httpClient.patch<User>(
        `/api/v2/users/${userId}`,
        this.httpClient.generateURLSearchParams(params)
      );
      return data;
    }

    async deleteUser(userId: number): Promise<User> {
      const { data } = await this.httpClient.delete<User>(
        `/api/v2/users/${userId}`
      );
      return data;
    }

    async getMySelf(): Promise<User> {
      const { data } = await this.httpClient.get<User>(`/api/v2/users/myself`);
      return data;
    }
  };
