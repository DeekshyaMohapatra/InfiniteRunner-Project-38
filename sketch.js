var girlImg,girl,sadGirl;
var bg,bg2;
var PLAY=1;
var gameState=1;
var End=0;
var coins=0;
var coin,coinImg;
var barrier,barrierImg;
var crashImage,crash;
var gameOverImg,gameOver;

function preload()
{

bg=loadImage("road.PNG");
girlImg=loadImage("cycleGirl.PNG");
coinImg=loadImage("coin.PNG")
barrierImg=loadImage("barrier.PNG");
sadGirl=loadImage("cryGirl.PNG");
crashImage=loadImage("crash.PNG");
gameOverImg=loadImage("over.PNG");

}

function setup()
{
 createCanvas(1250,810);

bg2 = createSprite(1200,400,1600,2000);
bg2.addImage(bg);
bg2.scale=5.3
bg2.velocityX =-8;


girl= createSprite(180,400,50,50);
girl.addImage(girlImg);
girl.scale=0.4

crash=createSprite(600,100,70,30);
crash.addImage(crashImage);

gameOver=createSprite(600,700,70,30);
gameOver.addImage(gameOverImg);

coinGroup = new Group();
barrierGroup = new Group();

}

function draw()
{
background(0);
createEdgeSprites();

if(gameState===PLAY)
{
    if(bg2.x<30){
        bg2.x=bg2.width/2;
           }

           if(keyDown(UP_ARROW))
           {
               girl.y=girl.y-7;
           }
    
           if(keyDown(DOWN_ARROW))
           {
               girl.y=girl.y+7;
           }

           if(girl.isTouching(coinGroup)){
            coins=coins+1
            coinGroup.destroyEach();
          }
          if(girl.isTouching(barrierGroup))
          {
            barrierGroup.destroyEach();
            gameState=End;
          }
          crash.visible=false;
          gameOver.visible=false;
           spawnCoins();
           spawnBarriers();
}

    if(gameState===End)
    {
      bg2.x=1200;
      bg2.y=400;
      girl.addImage(sadGirl);
      girl.scale=1.5;
      girl.x=600;
      girl.y=500;
      coins=0;
      coinGroup.destroyEach();
      barrierGroup.destroyEach();
     crash.visible=true;
     gameOver.visible=true;
    }

drawSprites();
fill("lime");
textSize(32)     
text("Coins:"+coins,1000,30)
fill("cyan")
text("*Use UP and DOWN arrow keys to move*",30,800);
text("Help Lia To Reach The shop And Do collect coins on your way!",30,30);
}

function spawnCoins()
{
  if(frameCount%200===0)
  {
   coin=createSprite(1300,500,50,50);
   coin.addImage(coinImg);
   coin.scale=0.05
   coin.velocityX=-7
   coin.y=Math.round(random(30,600))
   coinGroup.add(coin);
   coinGroup.setLifetimeEach(180);
  }
}

function spawnBarriers()
{
    if(frameCount%250===0)
    {
      barrier=createSprite(1300,500,50,50);
      barrier.addImage(barrierImg);
      barrier.scale=0.4
      barrier.velocityX=-7
      barrier.y=Math.round(random(30,600));
      barrierGroup.add(barrier);
      barrierGroup.setLifetimeEach(180);
    }
}