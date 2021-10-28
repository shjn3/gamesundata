import { Objects } from "./objects";

export class imageObject extends Objects {
  imageSprites: HTMLImageElement = new Image();
  constructor() {
    super();
    this.imageSprites.src = "./image/assets/sprite.png";
  }
}
