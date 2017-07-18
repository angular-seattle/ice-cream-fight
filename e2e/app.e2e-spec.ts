import { IceCreamFightPage } from './app.po';

describe('ice-cream-fight App', () => {
  let page: IceCreamFightPage;

  beforeEach(() => {
    page = new IceCreamFightPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
