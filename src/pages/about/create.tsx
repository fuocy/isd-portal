import { LayoutHOC } from 'base/ui/layout/layout';
import { AboutPage } from './about';

export const createAboutPage = (layoutHOC: LayoutHOC) => {

  return layoutHOC(AboutPage);
}
