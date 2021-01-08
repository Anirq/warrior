var PLAY = 1;
var END = 0;
var gameState = PLAY;
var groundImage
var raghu,raghu_animation
var brick,castle
var ground,invisibleGround
var monster1,monster2,monsterGroup
var score=0

function preload(){
  raghu_animation = loadAnimation("images/raghu1.png","images/raghu2.png","images/raghu3.png")
  castle = loadImage("images/castle.png")
  monster1 = loadImage("images/monster1.png")
  monster2 = loadImage("images/monster2.png")
  groundImage = loadImage("images/ground.png")
}

function setup() {  
  createCanvas(800,380);
  brick = createSprite(400,200,900,800)
  brick.addImage("castle",castle)
  brick.scale = 1.5
  raghu = createSprite(250,200, 50, 50);
  raghu.addAnimation("running",raghu_animation)
  
  

  ground = createSprite(500,335,800,20)
  ground.visible = true
   ground.addImage("ground",groundImage)
  //ground.velocityX = -6
  //ground.x = ground.width/2
  monsterGroup = new Group()
}


function draw() {
   background(0)
   
   if(gameState === PLAY) {
    
    if(keyDown("space")){
      raghu.velocityY = -10
    }

    if(keyDown("right")){
      raghu.x = raghu.x += 3 
    }
  
    if(keyDown("left")){
      raghu.x = raghu.x -= 3 
    }
  
    raghu.velocityY=raghu.velocityY + 0.8
    
    if(ground.x < 0){
      ground.x = ground.width/2
    }
    createMonsters();

    if(monsterGroup.isTouching(raghu)){
       gameState = END
    }
    
    score += Math.round(getFrameRate()/60)
  
   }
   
    else if(gameState === END){

   }

  raghu.collide(ground)
  
  
  drawSprites();
  
  stroke("red")
   text("Score:"+ score,700,50)

}

function createMonsters() {
  
  if(frameCount %60 === 0){
    var monsters = createSprite(800,280,50,50)
       monsters.velocityX = - 6
      
      monsters.scale = 0.4
      monsters.collide(ground)
    var rand = Math.round(random(1,2))   
    switch(rand){
      case 1 :
        monsters.addImage(monster1)
        break;

      case 2 :
       monsters.addImage(monster2)
       break;
            
      default :
      break;

    }
    
    monsterGroup.add(monsters)

  }
}




