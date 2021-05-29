import drillImage from '../assets/drill.svg';
import hammerImage from '../assets/hammer.svg';
import keyImage from '../assets/key.svg';
import measuringImage from '../assets/measuring-tool.svg';
import screwImage from '../assets/screw.svg';
import toolImage from '../assets/tool.svg';
import constructionToolsImage from '../assets/construction-tools.svg';

export function parseImage(imageId: number): string | string {
  switch (imageId) {
    case 1:
      return drillImage;
    case 2:
      return hammerImage;
    case 3:
      return keyImage;
    case 4:
      return measuringImage;
    case 5:
      return screwImage;
    case 6:
      return toolImage;
    case 7:
      return constructionToolsImage;
    default:
      return drillImage;
  }
}
