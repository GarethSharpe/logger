import { LoggerAppPage } from './app.po';

describe('logger-app App', () => {
  let page: LoggerAppPage;

  beforeEach(() => {
    page = new LoggerAppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
