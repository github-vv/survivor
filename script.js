(() => {
    const SOUNDS = {
        DRUMS: 'drums',
        CLICK: 'click',
        THE_TRIBE_HAS_SPOKEN: 'the-tribe-has-spoken'
    }

    let lang = 'en-US'; // default
    getElement(lang).classList.add('selected');

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

    function speak(text) {
        const utterance = new SpeechSynthesisUtterance(text);
        const voices = window.speechSynthesis.getVoices();
        utterance.voice = voices.find(voice => voice.lang === lang);
        window.speechSynthesis.speak(utterance);
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
                        const values = textarea.value.split('\n').filter(val => !!val).map(val => val.trim());
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
        window.speechSynthesis.getVoices(); // fixes empty [] voices bug

        const label = getElement('label');
        const btnStart = getElement('btn-start');
        const btnClear = getElement('btn-clear');
        const textarea = getElement('textarea');
        const theTribeHasSpoken = getElement('the-tribe-has-spoken');
        const langRo = getElement('ro-RO');
        const langEn = getElement('en-US');

        label.addEventListener('click', () => {
            play(SOUNDS.DRUMS);
        });

        btnStart.addEventListener('click', () => {
            drawName();
        });

        btnClear.addEventListener('click', () => {
            play(SOUNDS.CLICK);
            textarea.value = '';
        });

        theTribeHasSpoken.addEventListener('ended', () => {
            audioPlaying = false;
            speak(getElement('name').innerText);
        });

        theTribeHasSpoken.addEventListener('playing', () => {
            audioPlaying = true;
        });

        langRo.addEventListener('click', () => {
            play(SOUNDS.CLICK);
            langEn.classList.remove('selected');
            langRo.classList.add('selected');
            lang = langRo.id;
        });

        langEn.addEventListener('click', () => {
            play(SOUNDS.CLICK);
            langRo.classList.remove('selected');
            langEn.classList.add('selected');
            lang = langEn.id;
        });
    });
})();
