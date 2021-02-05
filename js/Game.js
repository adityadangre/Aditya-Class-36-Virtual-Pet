class Game{
    constructor(){

    }

    getState(){
        var gameStateRef=database.ref('gameState');
        gameStateRef.on("value",function(data){
            gameState=data.val();
        })
    }

    update(state){
        database.ref('/').update({
            gameState:state
        });
    }

    start(){
        console.log(gameState);
        if(gameState===0){
            dog=new Dog();
            dog.getCount();
            form=new Form();
            form.display();
        }
    }
}