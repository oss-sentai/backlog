import { Maybe } from './base.type';

export type Version = {
  id: number;
  projectId: number;
  name: string;
  description: string;
  startDate: Maybe<string>;
  releaseDueDate: Maybe<string>;
  archived: boolean;
  displayOrder: number;
};
