class Movies {
  constructor(elem) {
    this.connection = document.querySelector(elem.connection);
    this.video = this.connection.querySelector(".player-video");
    this.controls = this.connection.querySelector('.controls');
    this.playBtn = this.connection.querySelector(".controls-btns__play");
    this.pauseBtn = this.connection.querySelector(".controls-btns__pause");
    this.videoTrack = this.connection.querySelector(".controls-line__track");
    this.controlsLine = this.connection.querySelector('.controls-line');
    this.videoNextForward = this.connection.querySelector(".controls-btns__forward");
    this.videoVolume = this.connection.querySelector('.controls-btns__volume_line');
    this.videoVolumeTrack = this.connection.querySelector('.controls-btns__volume_line-track');
    this.volumeBtn = this.connection.querySelector('.controls-btns__volume_change');
    this.volume = this.connection.querySelector('.controls-btns__volume');
    this.fileBtn = this.connection.querySelector('.controls-btns__file_input');
    this.videoScreen = this.connection.querySelector('.controls-btns__screen');
    this.compressBtn = this.connection.querySelector('.controls-btns__screen_compress');
    this.uncompressBtn = this.connection.querySelector('.controls-btns__screen_uncompress');


    this.video.addEventListener("timeupdate", () => this.loadTrack());
    this.playBtn.addEventListener("click", () => this.videoPlay());
    this.pauseBtn.addEventListener("click", () => this.videoPlay());
    this.video.addEventListener("click", () => this.videoPlay());
    this.videoNextForward.addEventListener("click", () => this.videoForward());

    this.video.addEventListener("dblclick", (e) => this.videoForwardFif(e));
    this.controlsLine.addEventListener('click', (e) => this.speedClick(e));

    this.videoVolume.addEventListener('click', (e) => this.volumeChange(e));
    this.volume.addEventListener('wheel', (e) => this.volumeWheelChange(e));

    this.fileBtn.addEventListener('click', () => this.chooseFileVideo());

    this.videoScreen.addEventListener('click', ()=> this.videoScreenChange());

  }
  videoScreenChange(){
    if (this.compressBtn.classList.contains('hidden')) {
      this.compressBtn.classList.remove('hidden');
      this.uncompressBtn.classList.add('hidden');
      container.style.padding = '0px 15px';
      container.style.maxWidth = '1140px';
      document.exitFullscreen();
    } else {
      this.compressBtn.classList.add('hidden');
      this.uncompressBtn.classList.remove('hidden');
      container.style.padding = '0px';
      container.style.maxWidth = '100%';  
      document.documentElement.requestFullscreen();
    }
  }
  chooseFileVideo() {
    this.fileBtn.onchange = function (evt) {
      var tgt = evt.target || window.event.srcElement,
        files = tgt.files;
      if (FileReader && files && files.length) {
        let video = document.querySelector('.player-video');
        var fr = new FileReader();
        fr.onload = function () {
          video.src = fr.result;
        }
        fr.readAsDataURL(files[0]);
      }
    }
  }
  volumeWheelChange(e) {
    if (e.deltaY > 0) {
      this.video.volume = this.video.volume - 0.1;
      this.videoVolumeTrack.style.width = `${this.video.volume * 100}px`;
    } else {
      this.video.volume = this.video.volume + 0.1;
      this.videoVolumeTrack.style.width = `${this.video.volume * 100}px`;
    }
    if (this.video.volume < 0.01) {
      this.volumeBtn.innerHTML = '<i class="fas fa-volume-mute special-icon"></i>';
    } else {
      this.volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
    }
  }
  volumeChange(e) {
    this.video.volume = e.offsetX / 100;
    this.videoVolumeTrack.style.width = `${100 * (e.offsetX / this.videoVolume.clientWidth)}px`;
  }
  speedClick(e) {
    this.video.currentTime = this.video.duration * (e.offsetX / this.controlsLine.clientWidth);
  }
  videoForwardFif(e) {
    if (e.path[0].clientWidth / 2 <= e.offsetX) {
      this.video.currentTime = this.video.currentTime + 15;
    } else {
      this.video.currentTime = this.video.currentTime - 15;
    }
  }
  videoForward() {
    if (this.video.currentTime == this.video.duration) {
      this.video.currentTime = 0;
      this.videoPlay();
    } else {
      this.video.currentTime = this.video.currentTime + 15;
    }
  }
  videoPlay() {
    if (this.playBtn.classList.contains("hidden")) {
      this.playBtn.classList.remove("hidden");
      this.pauseBtn.classList.add("hidden");
      this.video.pause();
    } else {
      this.playBtn.classList.add("hidden");
      this.pauseBtn.classList.remove("hidden");
      this.video.play();
    }
  }
  loadTrack() {
    this.videoTrack.style.width = `${(this.video.currentTime / this.video.duration) * 100
      }%`;
  }
}
const video1 = new Movies({
  connection: ".player",
});
var container = document.querySelector('.container');