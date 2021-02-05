class Dog{
    constructor(){

    }

    getCount(){
        var dogCountRef=database.ref('dogCount');
        dogCountRef.on("value",function(data){
            dogCount=data.val();
        })
    }

    updateCount(count){
        database.ref('/').update({
            dogCount:count
        });
    }

    update(name){
        var dogIndex="Dog"+dogCount;
        database.ref(dogIndex).set({
            name:name
        });
    }
}