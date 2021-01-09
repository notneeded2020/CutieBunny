var bg,bgImage;

var bunny, bImage; 
var carrot,cImage, carrotGroup;
var cat,catImage, catGroup;

var invisibleGround;

var score = 0;

var PLAY = 1;
var END = 0;
var gameState = PLAY

var restart, reImage;

var sun,sunImage


function preload (){
  bImage   = loadImage  ("bunny.png");
  bgImage  = loadImage  ("ground.png");
  cImage   = loadImage  ("carrot.png");
  catImage = loadImage  ("predator.png");
  reImage  = loadImage  ("restart.png");
  sunImage = loadImage  ("sun.png");
}
function setup (){
  createCanvas (400,400);
  
 bg = createSprite(200,200,400,50);
 bg.addImage ("garden", bgImage);
 bg.scale = 1;
 
    
 bunny = createSprite(50,350,10,20);
 bunny.addImage ("bunny",bImage); 
 bunny.scale = 0.08;
  
 invisibleGround = createSprite (200,390,400,10);
 invisibleGround.visible = false;
  
 carrotGroup = createGroup();
 catGroup = createGroup();
  
 bunny.setCollider("rectangle",0,0,bunny.width,bunny.height)
 bunny.debug = false;
  
 restart  = createSprite (200,180);
 restart.addImage (reImage);
 restart.scale = 0.2;
  
 sun = createSprite (350,53);
 sun.addImage (sunImage);
 sun.scale = 0.15;
  
  
}
function draw (){
  background ("lightblue")
  
  if (gameState === PLAY){
    // making sure restart button isn't visible while game is going on
    restart .visible = false;
    
 //for ground scrolling effect 
  bg.velocityX = -4; 
 if (bg.x < 0){
    bg.x = bg.width/2;
  }
     
  //bunny jumps
if (keyDown ("space") && bunny.y >= 100){
  bunny.velocityY = -10;
}  
// adding gravity so that bunny doesn't travel to space
 bunny.velocityY = bunny.velocityY + 0.8
  
  //bunny collides with invisible ground and doesn't travel to hell
 bunny.collide (invisibleGround);
  
  //spawning carrot and cat
  spawnCarrot ();
  spawnPredator();
  
  //displaying score
  textSize (20);
  fill ("black");
  text ("Score: " + score,30,50)
  
  //scoring
   if (carrotGroup.isTouching(bunny)){
  score = score+2;
  carrotGroup.destroyEach();
   }
    
    //game is over if bunny touches cat
   if (catGroup.isTouching(bunny)){
     gameState = END;   
   } 
  }else if (gameState === END){
     //after game is over restart button is visible
      restart.visible = true;
    
    //stopping ground and bunny from moving
    bg.velocityX = 0;
    bunny.velocityY = 0;
    
    //setting lifetime in negative so that cat and carrot don't disappear
    catGroup.setLifetimeEach(-1);
    carrotGroup.setLifetimeEach(-1);
    
    //setting the velocity to 0 for each cat and carrot so that they don't move
     catGroup.setVelocityXEach(0);
     carrotGroup.setVelocityXEach(0);
    
    //if mouse clicks restart button, the game restarts
    if(mousePressedOver(restart)) {
      reset();
    }
     
    //making bunny collide with invisible ground so that it doesn't travel to hell and get eaten by ghosts :c
    bunny.collide (invisibleGround);
    
  //showing the score so that the player knows his/her score
  textSize (20);
  fill ("black");
  text ("Score: " + score,30,50)
       
  } 
  
  drawSprites();
}

function spawnCarrot (){
  if (frameCount % 80 === 0){
    
   carrot = createSprite (400,40,10,10);
   carrot.addImage (cImage);
   carrot.scale = 0.1
   carrot.y = Math.round (random(120,250)); 
   carrot.velocityX = -5;
   carrot.lifetime = 100;
   
   carrotGroup.add(carrot);
  
     
  } 
}


function spawnPredator(){
  if (frameCount % 300 === 0){
    
   cat = createSprite (400,340,10,10);
   cat.addImage (catImage);
   cat.scale = 0.5; 
   cat.velocityX = -5;
   cat.lifetime = 100;
   
   catGroup.add(cat);
    
     
  } 
  
}

function reset(){
  
   gameState = PLAY;
  
  restart.visible = false;
  
  catGroup.destroyEach();
  carrotGroup.destroyEach();
  
  score = 0;

}



