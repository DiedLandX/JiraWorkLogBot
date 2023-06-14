import { login } from "./jiraApi";
import { Issue, LoginData } from "./utils/types";

/**  For now this is using Basic Auth but later it will implement OAuth.
 *   @returns Jira Access Token
 */
export const authJiraUser = async ({
  password,
  username,
}: LoginData): Promise<string> => {
  return await login({ username, password });
};

export const getCurrentIssues = (): Issue[] => {
  return [
    {
      key: "This should be the name of the Issue",
      fields: {
        description: "This is a demo description",
      },
    },
    {
      key: "ORIENT-11",
      fields: {
        description: "Some sort of description",
      },
    },
  ];
};

export const addWorkLog = () => {
  const payload = {
    comment: "I did some work here.",
    visibility: {
      type: "group",
      value: "jira-developers",
    },
    started: "2017-12-07T09:23:19.552+0000",
    timeSpentSeconds: 12000,
  };
};
