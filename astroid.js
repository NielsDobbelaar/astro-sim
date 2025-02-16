class Astroid {
  radius = 10;
  outOfBoundsMargin = 500;
  trail = [];
  maxTrailLength = 15;

  // constructor
  constructor(mass, position, initialVelocity, image) {
    this.mass = mass;
    this.position = position;
    this.velocity = initialVelocity;
    this.image = image;
  }

  tick(planets) {
    let totalForce = createVector(0, 0);

    for (let planet of planets) {
      let distance = getDistanceBetween(this.position, planet.position);
      let force = gravity * ((this.mass * planet.mass) / (distance * distance));

      let angle = getAngleBetween(planet.position, this.position);

      totalForce.add(createVector(force * cos(angle), force * sin(angle)));
    }

    let acceleration = totalForce.div(this.mass);
    this.velocity.sub(acceleration);

    this.position.add(this.velocity);

    // Check if the astroid is out of bounds
    if (
      this.position.x < -this.outOfBoundsMargin ||
      this.position.x > width + this.outOfBoundsMargin ||
      this.position.y < -this.outOfBoundsMargin ||
      this.position.y > height + this.outOfBoundsMargin
    ) {
      this.resetAstroid();
    }

    // Check if the astroid is colliding with a planet
    for (let planet of planets) {
      let distance = getDistanceBetween(this.position, planet.position);
      if (distance < this.radius + planet.mass / 2) {
        let explosionAngle = getAngleBetween(planet.position, this.position);

        let explosionPosition = createVector(
          planet.position.x + (planet.mass / 2) * cos(explosionAngle),
          planet.position.y + (planet.mass / 2) * sin(explosionAngle),
        );

        explosions.push(
          new Explosion(
            explosionPosition,
            explosionAngle + HALF_PI + random(-PI / 6, PI / 6),
          ),
        );

        this.resetAstroid();
      }
    }

    this.handleTrail();
  }

  render() {
    // Render the planet
    this.renderTrail();
    if (this.image) {
      for (let i = 30; i > 0; i--) {
        let alpha = map(i, 50, 0, 3, 0.6);

        fill(255, alpha);
        noStroke();
        ellipse(this.position.x, this.position.y, i, i);
      }

      image(
        this.image,
        this.position.x,
        this.position.y,
        this.radius * 2,
        this.radius * 2,
      );
    } else {
      fill(255);
      ellipse(this.position.x, this.position.y, this.radius * 2);
    }
  }

  resetAstroid() {
    this.position = createVector(random(width), random(height));
    this.velocity = createVector(random(-7, 7), random(-7, 7));
    this.image = random(astroideImages);
  }

  handleTrail() {
    this.trail.push(this.position.copy());
    if (this.trail.length > this.maxTrailLength) {
      this.trail.shift();
    }
  }

  renderTrail() {
    for (let i = 0; i < this.trail.length; i++) {
      // use fireImage as the trail
      let ballSize = parseInt(map(i, 0, this.trail.length, 1, this.radius * 2));
      image(fireImage, this.trail[i].x, this.trail[i].y, ballSize, ballSize);
    }
  }
}
