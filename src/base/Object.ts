export class _Object {
  cX: number; // position X on the canvas of the object
  cY: number; // position y on the canvas of the object
  cW: number; // width on the canvas of the object
  cH: number; // height on the canvas of the object
  sX: number; // position x on the source image of the object
  sY: number; // position y on the source image of the object
  sW: number; // width on the source image of the object
  sH: number; // height on the source image of the object

  constructor() {
    this.cX = 0;
    this.cY = 0;
    this.cW = 0;
    this.cH = 0;
    this.sX = 0;
    this.sY = 0;
    this.sW = 0;
    this.sH = 0;
  }
}
