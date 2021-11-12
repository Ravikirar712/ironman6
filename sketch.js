var bg, backgroundImg,platformImage,platformGroup;
var diamondImage,diamondsGroup;
var spikeImage,spikesGroup;
var score =0;
var gameState="PLAY";


function preload() 
 {
   //upload images,sounds
  backgroundImg = loadImage("images/bg.jpg");
  ironImage = loadImage("images/iron.png");

  platformImage = loadImage("images/stone.png");
  platformSound = loadSound("sounds/platformSound.mp3");

  diamondImage = loadImage("images/diamond.png");
  diamondSound = loadSound("sounds/diamondSound.mp3");

  spikeImage = loadImage("images/spikes.png");
  spikeSound = loadSound("sounds/spikeSound.mp3");
  }

function setup() {
  createCanvas(1000, 600);

  //create background sprite
  bg = createSprite(580,300);
  bg.addImage(backgroundImg);
  bg.scale =2;
 
  //create ironMan sprite
  ironMan = createSprite(200, 505, 20, 50);
  ironMan.addImage("running", ironImage);
  ironMan.scale = 0.3;
  ironMan.setCollider("rectangle",100,0,200,400)
  
  //create ground sprite
  ground = createSprite(200,585,400,10);
  ground.visible = false;

  //create ground sprite
 ground = createSprite(200,585,1550,5);
 ground.visible = false;

  //create groups
  platformGroup = new Group();
  diamondsGroup = new Group();
  spikesGroup = new Group();
}

function draw() {
 if (gameState==="PLAY"){

  /*//scroll background 
  if (backgroundImg.x < 100){
    backgroundImg.x=backgroundImg.width/4;
  }
  //prevent ironMan moving out with the bricks
  if(ironMan.x<200){
    ironMan.x=200;
  }
 //prevent ironMan moving out from top
  if(ironMan.y<50){
    ironMan.y=50;
  }*/

  //up with up  key
  if (keyDown("up")) {
    ironMan.velocityY = -10;
  }
  //left with left key
  if (keyDown("left")) {
    ironMan.x = ironMan.x - 5;
  }
  //right with right key
  if (keyDown("right")) {
    ironMan.x = ironMan.x + 5;
  }
  //gravity
  ironMan.velocityY = ironMan.velocityY + 0.5;

  //call the function to generate platforms
  generatePlatforms();

  //make ironMan collide on platforms
  for (var i = 0; i < platformGroup.length; i++) {
    var temp = platformGroup.get(i);

    if (temp.isTouching(ironMan)) {
      ironMan.collide(temp);
      //play sound when ironMan touches platform
      //platformSound.play();
    }
  }
 //call the function to generate diamonds
  generateDiamonds();

  //make ironMan catch the diamonds
  for(var i = 0 ; i< (diamondsGroup).length ;i++){
    var temp = (diamondsGroup).get(i) ;
    
    if (temp.isTouching(ironMan)) {
      //play sound when diamond in catch
       diamondSound.play();
      //increase score when diamond in catch
      score++;
      //destroy diamond 
      temp.destroy();
      temp=null;
      }
        
    }
   // call the function to generate spikes
    generateSpikes();
    //make ironMan catch the spikes
    for(var i = 0 ; i< (spikesGroup).length ;i++){
      var temp = (spikesGroup).get(i) ;
      
      if (temp.isTouching(ironMan)) {
        //play sound when spikes in catch
        spikeSound.play();
        //decrease score when spike in catch
        score=score-5;
      //destroy spike
        temp.destroy();
        temp=null;
        }
          
      }
    }
    //end of if (gameState==="PLAY")
    else if (gameState==="END"){
      bg.velocityX = 0;
      ironMan.velocityY = 0;  
      ironMan.velocityX = 0; 
      platformGroup.setVelocityXEach(0);
      diamondsGroup.setVelocityXEach(0);
      spikesGroup.setVelocityXEach(0);
      platformGroup.setLifetimeEach(-1);
      diamondsGroup.setLifetimeEach(-1);
      spikesGroup.setLifetimeEach(-1);
    }
    //prevent Mario from falling down due to gravity
      ironMan.collide(ground);

    //draw sprites on screen
    drawSprites();
    textSize(20);
    fill("white")
    //display score
    text("Diamonds Collected: "+ score, 500,50);
 
  
}
//function of platform
function generatePlatforms() {
  if (frameCount % 60 === 0) {
    var brick = createSprite(1200, 10, 40, 10);
    brick.x = random(50, 850);
    brick.addImage(platformImage);
    brick.velocityY = 5;
    brick.lifetime = 250;
    platformGroup.add(brick);
  }
}

//function of diamond
function generateDiamonds() {
  if (frameCount % 80 === 0) {
    var diamond = createSprite(1200, 0, 40, 10);

    diamond.addAnimation("diamond", diamondImage);
    diamond.x = random(50, 850);
    diamond.scale = 0.5;
    diamond.velocityY = 3;
    diamond.lifetime = 1200;
    diamondsGroup.add(diamond);
  }
}

//function of spike
function generateSpikes() {
  if (frameCount % 150 === 0) {
    var spikes = createSprite(1200, 90, 10, 40);
    spikes.addAnimation("spike", spikeImage);
    spikes.x = random(50, 850);
    spikes.scale = 0.5;
    spikes.velocityY = 3;
    spikes.lifetime = 600;
    spikesGroup.add(spikes);
  }
}