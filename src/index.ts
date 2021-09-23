import BacklogClient from './backlog';

function main(): void {
  const client = new BacklogClient({
    spaceId: '',
    apiKey: '',
    domain: 'backlog.com',
  });

  client
    .getSpaceInfo()
    .then((data) => {
      console.log(data);
    })
    .catch(console.log);

  client
    .getSpaceImage()
    .then((data) => {
      console.log(data);
    })
    .catch(console.log);
}

main();
