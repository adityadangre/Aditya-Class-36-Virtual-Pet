var gameState=0;
var dogCount;
var database;
var form,dog,game;
var fedTime, lastFed;
var dogObj,sadDog,happyDog,doghouse;
var ebottol,fbottol,bottol;
var foodS;
var bg1,bg2,bg3,bg4,bg;


function preload(){
  sadDog=loadImage("Images/Dog.png");
  happyDog=loadImage("Images/happy dog.png");
  ebottol=loadImage("Images/milkImage.png");
  fbottol=loadImage("Images/Milk.png");
  doghouse=loadImage("Images/doghouse.png");
  bg1=loadImage("Images/garden.png");
  bg2=loadImage("Images/house.png");
  bg3=loadImage("Images/night.png");
  bg4=loadImage("Images/evening.png");
}

function setup() {
  createCanvas(1000,400);

   feed=createButton("Feed the dog"); 
      feed.position(350,95); 
      feed.hide();

   addFood=createButton("Add Food"); 
      addFood.position(450,95); 
      addFood.hide();
  
  database=firebase.database(); 
  game=new Game();
  game.getState();
  game.start();

  dogObj=createSprite(800,200,150,150);
  dogObj.addImage(sadDog);
  dogObj.scale=0.15;

  bottol=createSprite(730,220,150,150);
  bottol.addImage(fbottol);
  bottol.scale=0.10;
  bottol.visible=false;

  house=createSprite(920,200);
  house.addImage(doghouse);
  house.scale=0.3;

  

  feed.mousePressed(feedDog); 
  
  addFood.mousePressed(addFoods);
  
  foodStock = database.ref('Food');
  foodStock.on("value",function(data){
    foodS = data.val();
  })

  foodObj = new Food(foodS);
  

}

function draw() {
  

  fedTime = database.ref('hour');
  fedTime.on("value",function(data){
    lastFed = data.val();
  });
  if(lastFed>=7 && lastFed<=12)
  background(bg2);
  else
  if(lastFed>12 && lastFed<=15)
  background(bg1);
  else
  if(lastFed>15 && lastFed<19)
  background(bg4);
  else
  if(lastFed>19 && lastFed<=7)
  background(bg3);
  else
  background("black");

  fill("yellow");
  stroke("red");
  strokeWeight(3);
  textSize(30);
  text("Food Available : " + foodS,350,40);

  drawSprites();

  foodObj.display();

  fill("yellow"); 
  textSize(30); 
  if(lastFed>=12){ 
    text("Last Feed : "+ lastFed%12 + " PM", 710,40); 
  }else if(lastFed==0){ 
    text("Last Feed : 12 AM",710,30); 
  }else{ 
    text("Last Feed : "+ lastFed + " AM", 710,40); 
  }
  
}

//function to read food Stock
function feedDog(){ 
  bottol.addImage(fbottol);
  bottol.visible=true;
  dogObj.addImage(happyDog); 
  foodObj.updateFoodStock(foodObj.getFoodStock()); 
  database.ref('/').update({ 
    Food:foodObj.getFoodStock(),
    hour:hour()
  })
} 

//function to add food in story 
function addFoods(){ 
  bottol.addImage(ebottol);
  dogObj.addImage(sadDog);
  foodS++; 
  database.ref('/').update({ 
    Food:foodS 
  }) 
} 
