let trex;
let crnd_trex;
let solo;
let solo_png;
let solo_inv;
let cloudsprite;
let imgcloud;
let cacto1, cacto2, cacto3, cacto4, cacto5, cacto6;
let cactosprite;
let cactoss;
let cloudss;
let PLAY = 1;
let END = 0;
let gamestate = PLAY;
let score = 0;
let morte;
let restart;
let restartimg;
let gameover;
let gameoverimg;
let soundie;
let checksound;
let jumpsound;

function preload(){
  imgcloud = loadImage("cloud.png");
  crnd_trex = loadAnimation("trex1.png" ,"trex3.png", "trex4.png" );
  solo_png = loadImage("ground2.png");
  cacto1 = loadImage("obstacle1.png");
  cacto2 = loadImage("obstacle2.png");
  cacto3 = loadImage("obstacle3.png");
  cacto4 = loadImage("obstacle4.png");
  cacto5 = loadImage("obstacle5.png");
  cacto6 = loadImage("obstacle6.png");
  morte = loadImage("trex_collided.png");
  jumpsound = loadSound("jump.mp3");
  checksound = loadSound("checkpoint.mp3");
  soundie = loadSound("die.mp3");
  gameoverimg = loadImage("gameOver.png");
  restartimg = loadImage("restart.png");
}

function setup(){
  createCanvas(600,200);
  trex=createSprite(50,160,20,50);
  trex.addAnimation("crnd trex" , crnd_trex );
  trex.addImage("morte", morte);
  trex.scale = 0.5;
  solo = createSprite(200,180,400,20);
  solo.addImage(solo_png);
  solo_inv = createSprite (200,195,400,20);
  solo_inv.visible = false;
  gameover=createSprite(300,100);
  gameover.addImage("gameoverimg",gameoverimg);
  gameover.scale = 0.5
  restart=createSprite(300,140);
  restart.addImage("restartimg",restartimg);
  restart.scale = 0.5
   
  trex.debug=false;

  trex.setCollider("circle",0,0,40);

  cloudss = createGroup();
  cactoss = new Group(); 
}

function draw(){
  background("white");
//console.info("oi");
//console.error("oi");
//console.warn("oi");
  trex.collide(solo_inv);
  console.log(gamestate);
  textSize(15)
  text("Pontuação: "+ score, 475,50);
  

  if (gamestate === PLAY){
    solo.velocityX = -2;
   
    score = score + Math.round(getFrameRate()/60);
    if(score>0 && score%100===0){
      checksound.play();
    }
    
    if(solo.x<0){
      solo.x = solo.width/2;
    }

    if(keyDown("space") && trex.y>=161){
      trex.velocityY = -10;
      jumpsound.play();
    }
    
    gameover.visible=false
    restart.visible=false
  
    trex.velocityY += 0.5;

    cloud()
    cactos()

    if(cactoss.isTouching(trex)){
      gamestate=END;
      soundie.play();
    }
  }  
  else if (gamestate===END){
    gameover.visible=true
    restart.visible=true
    solo.velocityX = 0;
    trex.velocityY = 0;
    trex.changeImage("morte",morte);
    cactoss.setVelocityXEach(0);
    cloudss.setVelocityXEach(0);
    cactoss.setLifetimeEach(-1);
    cloudss.setLifetimeEach(-1);
    if(mousePressedOver(restart)){
      reset();
    }
  }

  drawSprites();
}

function reset(){
  gamestate = PLAY;
  cactoss.destroyEach();
  cloudss.destroyEach();
  trex.changeAnimation("crnd trex" , crnd_trex );
  score = 0
}



function cactos(){
  if(frameCount%60===0){
    cactosprite = createSprite(600,165,10,40);
    cactosprite.velocityX =-6;
    let ran = Math.round(random(1,6));
    switch(ran){
      case 1: cactosprite.addImage(cacto1);
      break;
      case 2: cactosprite.addImage(cacto2);
      break;
      case 3: cactosprite.addImage(cacto3);
      break;
      case 4: cactosprite.addImage(cacto4);
      break;
      case 5: cactosprite.addImage(cacto5);
      break;
      case 6: cactosprite.addImage(cacto6);
      break;
      default:break;
    }
    cactosprite.scale = 0.5
    cactosprite.lifetime = 120
    cactoss.add(cactosprite);
  }
}





function cloud(){
  if(frameCount%60===0){
    cloudsprite = createSprite(600,100,40,10);
    cloudsprite.velocityX =-3;
    cloudsprite.y = Math.round(random(10,100));
    cloudsprite.addImage(imgcloud);
    cloudsprite.scale = 0.7;
    trex.depth = cloudsprite.depth;
    trex.depth += 1;
    gameover.depth = cloudsprite.depth;
    gameover.depth += 1;
    cloudsprite.lifetime = 220
    cloudss.add(cloudsprite);
  }
}