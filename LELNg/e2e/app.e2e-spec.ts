import { LELNgPage } from './app.po';

describe('lelng App', () => {
  let page: LELNgPage;

  beforeEach(() => {
    page = new LELNgPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
