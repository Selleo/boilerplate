export interface EmailContent {
  getText: () => Promise<string>;
  getHtml: () => Promise<string>;
}
