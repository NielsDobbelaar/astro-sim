class Explosion {
  constructor(position, angle) {
    this.position = position;
    this.angle = angle;
    this.ttl = 100;
  }

  render() {
    this.ttl--;
    //fade in and out with ttl
    push();
    translate(this.position.x, this.position.y);
    rotate(this.angle);

    let tintValue;
    if (this.ttl >= 90) {
      tintValue = map(this.ttl, 100, 90, 0, 255); // ramp up
    } else {
      tintValue = map(this.ttl, 90, 0, 255, 0); // fade out
    }

    tint(255, tintValue);
    image(explosionImage, 0, 0, 20, 20);
    noTint();
    pop();
  }
}
