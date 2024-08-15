function initMusicPlayer() {
    // 初始化音乐播放器
    const audio = document.querySelector('#music-player audio');
    const changeMusicButton = document.getElementById('change-music-button');

    // 定义音乐列表

    const musicFiles = [
        'https://pan.beecld.com/f/2lyHN/午后柠檬树下的阳光.mp3', 
        //'https://cloud.lxweb.cn/f/zERDHz/周杰伦-告白气球.flac', 
       // 'https://cloud.lxweb.cn/f/Kgy9HX/街道办GDC&欧阳耀莹-春娇与志明.mp3',

    ]; // 替换为您的音乐文件

    function getRandomMusic() {
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * musicFiles.length);
        } while (audio.src === musicFiles[randomIndex]); // 确保新音乐不与当前音乐相同
        return musicFiles[randomIndex];
    }

    function updateMusicInfo(musicUrl) {
        const musicNameElement = document.getElementById('current-music');
        const musicName = musicUrl.split('/').pop(); // 提取文件名
        musicNameElement.textContent = `当前播放：${musicName}`;
    }

    function playRandomMusic() {
        const randomMusic = getRandomMusic();
        audio.src = randomMusic;
        audio.load();
        updateMusicInfo(randomMusic);
    }

    audio.addEventListener('ended', playRandomMusic);
    changeMusicButton.addEventListener('click', playRandomMusic);

    // 初始化随机音乐
    playRandomMusic();
}

// 调用初始化函数
initMusicPlayer();
