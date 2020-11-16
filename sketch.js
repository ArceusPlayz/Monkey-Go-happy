var monkey, monkey_running, monkey_collide
var banana, bananaImage, obstacle, obstacleImage
var foodGroup, obstacleGroup
var score
var PLAY = 1;
var END = 0;
var gamestate = PLAY
var survivalTime

function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  monkey_collide = loadAnimation("sprite_0.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

}



function setup() {
  createCanvas(600, 300);
  monkey = createSprite(50, 240, 20, 20);
  monkey.addAnimation("running", monkey_running);
  monkey.addAnimation("collide", monkey_collide);
  monkey.scale = 0.1;
  monkey.setCollider("circle", 0, 0, 250);
  monkey.debug = true;
  //monkey.debug = true;

  ground = createSprite(200, 280, 1200, 20);
  ground.x = ground.width / 2;
  foodGroup = new Group();
  obstacleGroup = new Group();







}


function draw() {
  background("white");


  text("Survival Time: " + survivalTime, 100, 50);

  if (gamestate === PLAY) {

    survivalTime = Math.ceil(frameCount / frameRate());

    if (keyDown("space") && monkey.y >= 240) {
      monkey.velocityY = -12;
    }
    monkey.velocityY = monkey.velocityY + 0.8;

    ground.velocityX = -4;
    if (ground.x < 0) {
      ground.x = ground.width / 2;

    }
    spawnBanana();
    spawnObstacles();
    if (monkey.isTouching(obstacleGroup)) {
      gamestate = END;
    }
  }
  if (gamestate === END) {
    monkey.changeAnimation("collide", monkey_collide);
    monkey.velocityY = 0;
    ground.velocityX = 0;
    obstacleGroup.setVelocityXEach(0);
    foodGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);




  }
  monkey.collide(ground);
  drawSprites();

}

function spawnBanana() {
  if (frameCount % 80 === 0) {
    banana = createSprite(610, 220, 10, 10);
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    banana.y = Math.round(random(150, 220));
    foodGroup.add(banana);
  }

}

function spawnObstacles() {
  if (frameCount % 100 === 0) {
    obstacle = createSprite(610, 255, 10, 10);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.1;
    obstacle.velocityX = -3;
    //obstacle.y = Math.round(random(150,220));
    obstacle.lifetime = 210;
    obstacleGroup.add(obstacle);
  }

}