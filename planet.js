class Planet {
  constructor(mass, position, color, image) {
    this.mass = mass;
    this.position = position;
    this.color = color;
    this.image = image;
  }

  render() {
    // Render the planet
    if (this.image) {
      for (let i = 95; i > 0; i--) {
        let alpha = map(i, 50, 0, 2, 0.3);
        let colorCopy = this.color;
        colorCopy.setAlpha(alpha);
        fill(colorCopy);
        noStroke();
        ellipse(this.position.x, this.position.y, i, i);
      }
      image(this.image, this.position.x, this.position.y, this.mass, this.mass);
    } else {
      fill(this.color);
      ellipse(this.position.x, this.position.y, this.mass, this.mass);
    }
  }
}
