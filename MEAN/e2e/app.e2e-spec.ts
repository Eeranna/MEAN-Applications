import { MEANPage } from './app.po';

describe('mean App', () => {
  let page: MEANPage;

  beforeEach(() => {
    page = new MEANPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
