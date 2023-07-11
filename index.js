var givenSequence = [];
var triedSequence = [];
var active = false;
var level = 0;

$(".btn").on("click", function(e){
    var tap_sound = new Audio("sounds/tap.wav")
    tap_sound.play();
    e.target.classList.add("clicked");
    setTimeout(function(){
        e.target.classList.remove("clicked");
    }, 500);
});

$(document).on("keydown", () => {
    if(!active) {
        if($("h1").hasClass("over")){
            $("h1").removeClass("over");
            $("body").removeClass("over");
        }
        level = 0;
        active = true;
        $(".btn").off("click");

        $(".btn").on("click", function(e){
            var tap_sound = new Audio("sounds/tap.wav")
            tap_sound.play();
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
            var win_sound = new Audio("sounds/win.wav");
            win_sound.play();
            setTimeout(() => {
                start();
            }, 1000);
        }
    } else {
        var over_sound = new Audio("sounds/over.wav");
        over_sound.play();
        $("h1").text("Game Over press any key to try again");
        $("h1").addClass("over");
        $("body").addClass("over");
        givenSequence = [];
        triedSequence = [];
        active = false;
    }
}