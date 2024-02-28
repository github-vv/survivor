(() => {
    const SOUNDS = {
        DRUMS: 'drums',
        CLICK: 'click',
        THE_TRIBE_HAS_SPOKEN: 'the-tribe-has-spoken'
    }

    let audioPlaying = false;

    function getElement(elemId) {
        return document.getElementById(elemId);
    }

    function play(elemId) {
        const audio = getElement(elemId);
        if (audio.paused) {
            audio.play();
        } else {
            audio.pause();
        }
    }

    function getRandom(inputArray) {
        const randomIndex = Math.floor(Math.random() * inputArray.length);
        return inputArray[randomIndex];
    }

    function drawName() {
        play(SOUNDS.CLICK);

        if (audioPlaying) return; // wait for audio to finish before retry

        const background = getElement('background');
        const name = getElement('name');
        const textarea = getElement('textarea');

        if (!textarea.value.trim()) return;

        let frame = 1;
        const interval = setInterval(() => {
            if (frame <= 3) {
                if (frame === 1) {
                    name.classList.remove('visible');
                    play(SOUNDS.THE_TRIBE_HAS_SPOKEN);
                }
                if (frame === 3) {
                    if (textarea.value) {
                        const values = textarea.value.trim().split('\n');
                        name.innerText = getRandom(values);
                    } else {
                        name.innerText = '';
                    }
                    name.classList.add('visible');
                }
                background.style['background-image'] = `url("./img/frame${frame}.png")`;
                frame++;
            } else {
                clearInterval(interval);
            }
        }, 500)
    }

    window.addEventListener('DOMContentLoaded', () => {
        const label = getElement('label');
        const btnStart = getElement('btn-start');
        const btnClear = getElement('btn-clear');
        const textarea = getElement('textarea');
        const theTribeHasSpoken = getElement('the-tribe-has-spoken');

        label.addEventListener('click', () => {
            play(SOUNDS.DRUMS);
        });

        btnStart.addEventListener('click', () => {
            drawName();
        });

        btnClear.addEventListener('click', () => {
            textarea.value = '';
        });

        theTribeHasSpoken.addEventListener('ended', () => {
            audioPlaying = false;
        });

        theTribeHasSpoken.addEventListener('playing', () => {
            audioPlaying = true;
        });
    });
})();
