import { Constructor } from './../utils';
import BacklogClient from '../backlogClient';
import url from 'url';

export type User = {
  id: number;
  userId: string;
  name: string;
  roleType: number; // ここnumberで良い？？
  lang: string | null;
  mailAddress: string;
};

export type CreateUserParams = {
  userId: string;
  password: string;
  name: string;
  mailAddress: string;
  roleType: number;
};

export type UpdateUserParams = {
  password: string;
  name: string;
  mailAddress: string;
  roleType: number;
};

interface UserInterface {
  getUserList(): Promise<User[]>;
  getUserInfo(userId: number): Promise<User>;
  createUser(params: CreateUserParams): Promise<User>;
  updateUser(userId: number, params: UpdateUserParams): Promise<User>;
  deleteUser(userId: number): Promise<User>;
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
      const requestData = new url.URLSearchParams({
        ...params,
        roleType: params.roleType.toString(),
      });

      const { data } = await this.httpClient.patch<User>(
        `/api/v2/users/${userId}`,
        requestData.toString()
      );
      return data;
    }

    async deleteUser(userId: number): Promise<User> {
      const { data } = await this.httpClient.delete<User>(
        `/api/v2/users/${userId}`
      );
      return data;
    }
  };
