import { util } from '../../common/util.js';

export const audio = (() => {

    const statePlay = '<i class="fa-solid fa-circle-pause spin-button"></i>';
    const statePause = '<i class="fa-solid fa-circle-play"></i>';

    const load = async (playOnOpen = true) => {

        const url = document.body.getAttribute('data-audio');
        if (!url) return;

        let audioEl;
        try {
            audioEl = new Audio(url);
            audioEl.loop = true;
            audioEl.autoplay = false;
            audioEl.controls = false;
        } catch {
            return;
        }

        let isPlay = false;
        const music = document.getElementById('button-music');
        if (!music) return;

        const play = async () => {
            try {
                await audioEl.play();
                isPlay = true;
                music.innerHTML = statePlay;
            } catch (err) {
                console.error(err);
            }
        };

        const pause = () => {
            isPlay = false;
            audioEl.pause();
            music.innerHTML = statePause;
        };

        document.addEventListener('undangan.open', () => {
            music.classList.remove('d-none');
            if (playOnOpen) play();
        });

        music.addEventListener('click', () => isPlay ? pause() : play());
    };

    const init = () => ({ load });

    return { init };
})();
