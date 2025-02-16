const gravity = 75;
const numAstroids = 20;
const desiredFrameRate = 80;

var planets = [];
var asteroids = [];
var explosions = [];

var planetImages = [];
var astroideImages = [];
var fireImage;
var explosionImage;

function setup() {
  bodyWidth = document.body.clientWidth;
  createCanvas(bodyWidth, 992);
  background(30);
  frameRate(desiredFrameRate);
  imageMode(CENTER);

  planetImages.push(loadImage("assets/planet1.png"));
  planetImages.push(loadImage("assets/planet2.png"));
  planetImages.push(loadImage("assets/planet3.png"));

  astroideImages.push(loadImage("assets/astroid1.webp"));
  astroideImages.push(loadImage("assets/astroid2.png"));
  astroideImages.push(loadImage("assets/astroid3.png"));

  fireImage = loadImage("assets/fire.png");
  explosionImage = loadImage("assets/explosion.png");

  for (let i = 0; i < (bodyWidth <= 1080 ? 1 : random(3)); i++) {
    spawnPlanet();
  }

  for (let i = 0; i < numAstroids; i++) {
    asteroids.push(
      new Astroid(
        1,
        createVector(random(width), random(height)),
        createVector(random(-9, 9), random(-9, 9)),
        random(astroideImages),
      ),
    );
  }
}

function draw() {
  background(30);
  if (frameCount % 60 == 0) {
    console.log(parseInt(frameRate()));
  }

  // handles explosion rendering and ttl
  let expiredExplosions = [];
  for (let explosion of explosions) {
    explosion.render();
    if (explosion.ttl <= 0) {
      expiredExplosions.push(explosion);
    }
  }

  for (let expiredExplosion of expiredExplosions) {
    explosions.splice(explosions.indexOf(expiredExplosion), 1);
  }

  // renders planets
  for (let planet of planets) {
    planet.render();
  }
  // handles asteroid rendering and fysics
  for (let asteroid of asteroids) {
    asteroid.tick(planets);
    asteroid.render();
  }
}

function getDistanceBetween(p1, p2) {
  return dist(p1.x, p1.y, p2.x, p2.y);
}

function getAngleBetween(planetPos, astroidPos) {
  return atan2(astroidPos.y - planetPos.y, astroidPos.x - planetPos.x);
}

function spawnPlanet() {
  var newPosition = createVector(
    random(width / 5, width - width / 5),
    random(height / 5, height - height / 5),
  );

  for (let planet of planets) {
    if (getDistanceBetween(newPosition, planet.position) < 400) {
      spawnPlanet();
      return;
    }
  }

  planets.push(
    new Planet(
      random(70, 100),
      newPosition,
      color(100, 0, 80),
      random(planetImages),
    ),
  );
}
