window.addEventListener("load", () => {

let audio = new Audio('sounds/Star_Wars.mp3');
        audio.play();

        const checkbox = document.getElementById("onoffswitch");
        checkbox.addEventListener('change', function() {
                if (this.checked) {
                        if (audio.paused) {
                            audio.play(); // If audio is paused, play it
                        }
                    } else {
                        audio.pause(); // If checkbox is unchecked, pause the audio
                    }
});

});
const playRoundButton = document.getElementById("credits").addEventListener("click", () => {
        creditSound(); 

});

function creditSound() {
        let audio1 = new Audio('sounds/chewbacca.mp3');
        audio1.play();
    }
    
