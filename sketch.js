//Creating global variables for different objects
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score, survialTime;
var ground;
var monkey_collided;
var jungle, jungleImage;


//Defining Gamestates
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var bananaSound

//Images and animations are loaded 
function preload(){
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  monkey_collided = loadAnimation("sprite_0.png");

  bananaImage = loadImage("banana.png");

  obstacleImage = loadImage("obstacle.png");
  
  bananaSound = loadSound("zapsplat_vehicles_bicycle_bell_single_ring_ping_29516-1.mp3");
  
  jungleImage = loadImage("jungle.jpg");
 
}

function setup() {
  //Creating the Canvas
  createCanvas(600,400);
  
  //Defining Groups
  FoodGroup = createGroup();
  obstacleGroup = createGroup();
  TimeGroup = createGroup();
  
 //Creating Ground
  ground = createSprite(70, 370, 1200, 10);
  ground.velocityX = -4;
  ground.x=ground.width/2;
  ground.visible = false;
  
  //creating jungle
  jungle = createSprite(300,200,30,30);
  jungle.addImage(jungleImage);
  jungle.velocityX = -2;
  
  //Creating Monkey
  monkey = createSprite(50, 250, 10, 10);
  monkey.addAnimation("running",monkey_running);
  monkey.addAnimation("collided",monkey_collided);
  monkey.scale = 0.1;
  
  //score
  score = 0;
  survialTime = 0;
  
}

function draw() {
  
  //Background color
  background ("skyBlue");
  
  
  if(jungle.x <= 100){
    jungle.x = 300;
  }
  
 //Monkey does not fall
  monkey.collide(ground);
  
  //Assigning functions to Gamestate PLAY
  if(gameState === PLAY){
    monkey.changeAnimation("running", monkey_running);
    
  survialTime = Math.ceil(frameCount/frameRate());
     
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    //jump when the space key is pressed
    if(keyDown("space") && monkey.y >= 310) {
        monkey.velocityY = -17;
    }   
    
   switch(score){
    case 10: monkey.scale = 0.12;
       break;
    case 20: monkey.scale = 0.15;  
       break;
    case 30: monkey.scale = 0.18;
       break;
    case 40: monkey.scale = 0.22;
       break;
    case 50: monkey.scale = 0.26;
       break;
    case 60: monkey.scale = 0.30;
       break;
    default: break;     
  }
    
    if(FoodGroup.isTouching(monkey)) {
      FoodGroup[0].destroy();
      score = score + 2;
      bananaSound.play();
    }
   
   //Gravity
   monkey.velocityY = monkey.velocityY + 0.8;
  
   //calling functions for food and obstacles
   food();
   obstacles();
    
  //Gamestate changes to end once monkey touches obstacles
   if(obstacleGroup.isTouching(monkey)){       
     gameState = END; 
     monkey.scale = 0.1;
  }
      
  }
  //Assigning functions to Gamestate END
   if (gameState == END) {
     
    obstacleGroup.destroyEach();
    FoodGroup.destroyEach();
     
    jungle.velocityX = 0; 
     
    monkey.changeAnimation("collided", monkey_collided);
     
    //assigning lifetime to groups in END state 
    obstacleGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);    
     
    ground.velocityX = 0;
     
    survialTime.visible = false;
     
   }
  
   //drawing the sprites
   drawSprites();
  
  //displaying survial time
  stroke("black");
  fill("white");
  textSize(20);
  text("Survial Time:"+  survialTime, 70, 50);
  
  //displaying score
  stroke("black");
  fill("white");
  textSize(20);
  text("Score:"+  score, 260, 50);
    
  //Displaying Gameover message once gameState changes to END
  if(gameState == END){
    stroke("white");
    fill("hotPink");
    textSize(30);
    text("Game Over!!", 200, 200);
  }
  
}

//Creating function for food and assigning functions to it
function food() {
  
  if (frameCount % 80 === 0) {
    banana = createSprite(600,350,40,10);
    
    banana.addImage(bananaImage);
    
    banana.y = Math.round(random(120,200));
    banana.scale = 0.1;
    
    banana.velocityX = -3;
    banana.lifetime = 200;
    
    FoodGroup.add(banana);
  }
  
}


//Creating function for obstacles and assigning functions to it
function obstacles() {
  
  if (frameCount % 300 === 0){
    obstacle = createSprite(600,345,10,10);
    
    obstacle.addImage(obstacleImage);
    
    obstacle.velocityX = -4;
    obstacle.lifetime = 200;
    obstacle.scale = 0.1 ;
    
    obstacleGroup.add(obstacle);
  }

}






