import HttpClientImpl from './httpc';

interface BacklogConfig {
  spaceId: string;
  apiKey?: string;
  domain?: 'backlog.jp' | 'backlog.com' | 'backlogtool.com' | string;
}

export default class BacklogClient {
  protected httpClient: HttpClientImpl;

  constructor(config: BacklogConfig) {
    this.httpClient = new HttpClientImpl({
      baseUrl: `https://${config.spaceId}.${config.domain}`,
      apikey: config.apiKey,
    });
  }
}
