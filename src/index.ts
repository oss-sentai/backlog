import BacklogClient, { CreateIssueParams } from './backlog';

function main(): void {
  const client = new BacklogClient({
    spaceId: 'oss-sentai',
    apiKey: 'R2e4sSTvvknZFGO4j8OAOuAM3WzCS0xp5TVSjYsXm881fdaU8vmbscco24V7PVkf',
    domain: 'backlog.com',
  });

  client
    .updateProject('240729', {
      name: 'プロジェクト作成テストダオdd',
      key: 'PROJECT_TESTTT',
    })
    // .getProjectInfo('240729')
    // .getProjectList()
    // .createProject({
    //   name: 'プロジェクト作成テスト',
    //   key: 'PROJECT_TEST',
    //   chartEnabled: false,
    //   projectLeaderCanEditProjectLeader: true,
    //   subtaskingEnabled: false,
    //   textFormattingRule: 'markdown',
    // })
    // .createIssue({
    //   issueTypeId: 1124194,
    //   summary: 'test222',
    //   projectId: 230895,
    //   priorityId: 1,
    // })
    // .deleteIsseue('API_TEST-4')
    // .getIssues({
    //   projectId: [230895],
    // })
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log('------0-----');
      console.log('name', err.name);
      console.log('message', err.message);
      console.log('stack', err.stack);
      console.log('errors', err.errors);
      console.log('------1-----');
    });

  // client
  // .createIssue({
  //   issueTypeId: 1124194,
  //   summary: 'test',
  //   projectId: 230895,
  //   priorityId: 1,
  // })
  // .then((data) => {
  //   console.log(data);
  // })

  // client
  //   .getSpaceImage()
  //   .then((data) => {
  //     console.log(data);
  //   })
  //   .catch(console.log);
}

main();
