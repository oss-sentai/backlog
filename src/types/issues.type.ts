import { Maybe } from './base.type';
import { Version } from './version.type';

type User = {
  id: number;
  userId: string;
  name: string;
  roleType: number;
  lang: string;
  mailAddress: string;
};

// TODO: add custom Field
export type CreateIssueParams = {
  projectId: number;
  summary: string;
  parentIssueId?: number;
  description?: string;
  startDate?: string;
  dueDate?: string;
  estimatedHours?: number;
  actualHours?: number;
  issueTypeId: number;
  categoryId?: number[];
  versionId?: number[];
  milestoneId?: number[];
  priorityId: number;
  assigneeId?: number;
  notifiedUserId?: number[];
  attachmentId?: number[];
};

export type Issue = {
  id: number;
  projectId: number;
  issueKey: string;
  keyId: number;
  issueType: {
    id: number;
    projectId: number;
    name: string;
    color: string;
    displayOrder: number;
  };
  summary: string;
  description: '';
  resolutions: Maybe<string>;
  priority: {
    id: number;
    name: string;
  };
  status: {
    id: number;
    projectId: number;
    name: string;
    color: string;
    displayOrder: number;
  };
  assignee: {
    id: number;
    userId: string;
    name: string;
    roleType: number;
    lang: string | null;
    mailAddress: string;
  };
  category: unknown[];
  versions: unknown[];
  milestone: Version[];
  startDate: Maybe<string>;
  dueDate: Maybe<string>;
  estimatedHours: Maybe<string>;
  actualHours: Maybe<string>;
  parentIssueId: Maybe<string>;
  createdUser: User;
  created: string;
  updatedUser: User;
  updated: string;
  customFields: [];
  attachments: {
    id: number;
    name: string;
    size: number;
  }[];
  sharedFiles: unknown[];
  stars: unknown[];
};
