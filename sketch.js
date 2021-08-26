var knife,fruit ,monster, score,rand,rand1,rand2,rand3,rand4,randM;
var knifeImage , fruit1, fruit2 ,fruit3,fruit4, monsterImage, gameOverImage,fruitGroup;
var background2,backgroundImg;
var gameState="start";
var start, next, restart,startimg,nextimg,restartimg
function preload()
{
  knifeImage = loadImage("knife.png");
  monsterImage = loadAnimation("alien1.png","alien2.png")
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  gameOverImage = loadImage("gameover.png")
  gameOverSound=loadSound("gameover.mp3")
  cutSound=loadSound("knifeSwoosh.mp3") 
  backgroundImg = loadImage("background2.png")
  startimg= loadImage("play button .png")
  nextimg = loadImage("next level .png")
  restartimg= loadImage("restart image .png")
}



function setup() 
{
  createCanvas(windowWidth, windowHeight);
   background2=createSprite(windowWidth/2,(windowHeight/2)+150,windowWidth+100, windowHeight);
   background2.addImage(backgroundImg);  
   background2.visible=false;
   background2.scale=0.65;
   //creating knife
   knife=createSprite((windowWidth/2)-250,windowHeight/2,20,20);
   knife.addImage(knifeImage);
   knife.scale=0.7;
   knife.setCollider("circle",0,-20,30);
   score=0;
   fruitGroup=createGroup();
   monsterGroup=createGroup();  
  start=createSprite((windowWidth/2)+200,(windowHeight/2),50,50);
  start.addImage(startimg); 
start.scale=0.25;
start.visible=true;

  next=createSprite((windowWidth/2),(windowHeight/2)+100,50,50);
  next.addImage(nextimg); 
next.scale=0.5;
next.visible=false;

restart=createSprite((windowWidth/2),(windowHeight/2)+130,50,50);
  restart.addImage(restartimg); 
restart.scale=0.5;
restart.visible=false;
}

function draw() 
{
  background("lightblue");
  fill("red");
  stroke("white");
  strokeWeight(5);
  textSize(20);
  text("SCORE="+score,(windowWidth/2)-50,20) ;
  if(gameState==="start")
 {
   start.visible=true;
   next.visible=false;
   restart.visible=false;
   text("PRESS space TO SERVE or click --->",(windowWidth/2)-200,windowHeight/2);
  text("cut the fruits and escape the monster",(windowWidth/2)-150,(windowHeight/2)-50)
  text("reach (score=50) to reach to the next round",(windowWidth/2)-180,(windowHeight/2)+50)
  knife.addImage(knifeImage);
  knife.scale=0.75;
  score=0;
 }
  if(gameState==="start"&&keyDown("space"))
  {
    gameState="play";
  }
  if(gameState==="start"&&mousePressedOver(start))
  {
    gameState="play";
  }
  if(gameState==="play")
 { start.visible=false;
   next.visible=false;
   restart.visible=false;
   background2.visible=true;
   knife.x=World.mouseX; 
   knife.y=World.mouseY;
   Fruits();
   Monster();
 if(knife.isTouching(fruitGroup)) 
  {
   cutSound.play();
   score=score+2;
   fruitGroup.destroyEach();
  }
 if(knife.isTouching(monsterGroup)&&gameState==="play")
  {
   gameState="over";
   gameOverSound.play();
  }
  if(score===10&&gameState==="play")
  {
   gameState="start2"
  }
 }
  
  if(gameState==="start2")
  {
    next.visible=true;
    start.visible=false;
    restart.visible=false;
    background2.visible=false;
    text("PRESS <enter> TO GO TO THE SECOND LEVEL or click",(windowWidth/2)-250,windowHeight/2); 
  knife.y=(windowHeight/windowHeight)+50
  } 
  
  if(gameState==="start2"&&keyDown("enter"))
  {gameState="play2"
   score=0;
  }
  
  if(gameState==="start2"&&mousePressedOver(next))
  {gameState="play2"
   score=0;
  }
  
  if(gameState==="play2")
  {
   next.visible=false;
   start.visible=false;
   restart.visible=false;
   background2.visible=true;
   knife.x=World.mouseX; 
   knife.y=World.mouseY;
   Fruits();
   Monster();
  if(knife.isTouching(fruitGroup)) 
  {
    cutSound.play();
    score=score+2;
    fruitGroup.destroyEach();
  }
  if(knife.isTouching(monsterGroup)&&gameState==="play2")
  {
   gameState="over";
   gameOverSound.play();

  }
 } 
  
  if(gameState==="over")
  {
   next.visible=false; 
   start.visible=false;
   restart.visible=true;
   background2.visible=false;
   knife.addImage(gameOverImage)
   knife.x=windowWidth/2;
   knife.y=windowHeight/2;
   knife.scale=1.5;
   text("press R to restart OR press",(windowWidth/2)-85,(windowHeight/2)+50);
  fruitGroup.destroyEach();
  monsterGroup.destroyEach();
  }
  if(keyDown("r")&&gameState==="over")
  {
   gameState="start"}
    if(gameState==="over"&&mousePressedOver(restart))
  {
   gameState="start"}
  
  drawSprites();
  }


function Fruits()
{
  if(frameCount%30===0)
  {
   fruit=createSprite(Math.round(random(100,400)),
   Math.round(random(100,300)),10,10);
   fruit.scale=0.125;    
   if(gameState==="play")
   {
   rand=Math.round(random(1,2))   
   }
    if(gameState==="play2")
   {
   rand=Math.round(random(1,4))   
   }
    switch(rand)
  {
    case 1 :
      fruit.x<=100;
      fruit.velocityX=(5+2*score/10);
      var rand1=Math.round(random(1,4))  
      switch(rand1)
      {
        case 1: fruit.addImage(fruit1); 
        break;
        case 2: fruit.addImage(fruit2);
        break;
        case 3: fruit.addImage(fruit3);
        break;
        case 4: fruit.addImage(fruit4);
        break;
        default:  
        break;
     }  
  break;
  case 2 :
      fruit.x>=300; 
      fruit.velocityX=-(4+3*score/20);
      var rand2=Math.round(random(1,4))  
      switch(rand2)
      {
        case 1: fruit.addImage(fruit4);  
        break;
        case 2: fruit.addImage(fruit1);
        break;
        case 3: fruit.addImage(fruit3);
        break;
        case 4: fruit.addImage(fruit2);
        break;
        default:  
        break;
      }
     
  break;
  case 3 :
      fruit.y>=300 
      fruit.velocityY=-(6+2*score/10);
      var rand3=Math.round(random(1,4))  
      switch(rand3)
      {
        case 1: fruit.addImage(fruit3);  
        break;
        case 2: fruit.addImage(fruit1);
        break;
        case 3: fruit.addImage(fruit4);
        break;
        case 4: fruit.addImage(fruit2);
        break;
        default:  
        break;
      }
      
  break;
  case 4 :
      fruit.y<=100; 
      fruit.velocityY=(5+2*score/20);
      var rand4=Math.round(random(1,4))  
      switch(rand)
      {
        case 1: fruit.addImage(fruit4);  
        break;
        case 2: fruit.addImage(fruit1);
        break;
        case 3: fruit.addImage(fruit3);
        break;
        case 4: fruit.addImage(fruit2);
        break;
        default:  
        break;
      }
      break;
      default:
      break;
  }
  
    fruitGroup.add(fruit);
  }  
}



function Monster(){
  if(World.frameCount%100===0){
    monster=createSprite(400,200,20,20);
    monster.addAnimation("moving", monsterImage);
    if(gameState==="play")
    {randM=1;}
    
    if(gameState==="play2") 
     {randM=Math.round(random(1,2))}
    switch(randM)
    {
     case 1 : monster.x=400;   
     monster.y=Math.round(random(100,550)); 
       monster.velocityX = -(4+3*score/5);
        break;
    case 2 : monster.y=400;   
       monster.x=Math.round(random(100,550)); 
       monster.velocityY = -(4+3*score/5);
    break;
    //case 3 : monster.x=50;   
     //monster.y=Math.round(random(100,550)); 
       //monster.velocityX = (4+3*score/5);
       // break;
    
    
    default:
     break;    
    }
    monster.setLifetime=50;
    monsterGroup.add(monster);
  }
}




