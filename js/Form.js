class Form{
    constructor(){

    }

    display(){
         
      var title=createElement('h3')
      title.html("Enter your Dog Name : ");
      title.position(690,150);
      var input=createInput("Name");
      var button=createButton('Enter');
      input.position(700,200);
      button.position(750,250);
      button.mousePressed(function(){
          input.hide();
          button.hide();
          title.hide();
          feed.show();
          addFood.show();
          gameState=1;
          game.update(gameState);
          var name=input.value();
          dogCount+=1;
          dog.update(name)
          dog.updateCount(dogCount);
          var greeting = createElement('h3');
          greeting.html("Your Cute Dog  "+name);
          greeting.position(930,370);
      })
    }
}