var givenSequence = [];
var triedSequence = [];
var active = false;
var level = 0;

$(".btn").on("click", function(e){
    e.target.classList.add("clicked");
    setTimeout(function(){
        e.target.classList.remove("clicked");
    }, 500);
});

$(document).on("keydown", () => {
    if(!active) {
        level = 0;
        active = true;
        $(".btn").off("click");

        $(".btn").on("click", function(e){
            console.log(e.target.classList[1]);
            triedSequence.push(e.target.classList[1]);
            e.target.classList.add("clicked");
            setTimeout(function(){
                e.target.classList.remove("clicked");
            }, 500);
            checkSequence(triedSequence.length-1);
        });
        if(active){
            start();
        }
    }
})

function start(){
    triedSequence = [];
    
    level++;
    $("h1").text("Level " + level);

    var randomSequence = Math.floor(Math.random() * 9 + 1);
    givenSequence.push("" + randomSequence);
    $("." + givenSequence[level - 1]).addClass("clicked");
    setTimeout(() => {
        $("." + givenSequence[level - 1]).removeClass("clicked");
    }, 1000);
}

function checkSequence(elem){
    if(triedSequence[elem] === givenSequence[elem]){
        if(givenSequence.length === triedSequence.length){
            setTimeout(() => {
                start();
            }, 1000);
        }
    } else {
        $("h1").text("Game Over press any key to try again");
        givenSequence = [];
        triedSequence = [];
        active = false;
    }
}