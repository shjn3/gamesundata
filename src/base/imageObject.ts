import { _Object } from "./_Object";

interface _imageObject {
  imageSprites: HTMLImageElement; // Image is used in canvas
}

export class imageObject extends _Object implements _imageObject {
  imageSprites: HTMLImageElement = new Image();
  constructor() {
    super();
    Object.setPrototypeOf(this, imageObject.prototype);
    this.imageSprites.src = "./image/assets/sprite.png";
  }
}
