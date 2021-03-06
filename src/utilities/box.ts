interface _box {
  x: number;
  y: number;
  width: number;
  height: number;
}

export class box implements _box {
  constructor(
    public x: number,
    public y: number,
    public width: number,
    public height: number
  ) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
}
