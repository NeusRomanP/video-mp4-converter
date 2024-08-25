<template>
  <main>
    <h1>Convert your videos to <span>MP4</span></h1>
    <div class="video-input__container">
      <input type="file" @change="handleFileChange" 
             accept="video/*" id="file-input" multiple />
      <label for="file-input" class="file-label">Select videos</label>
      <span class="file-name">{{ labelMsg }}</span>
    </div>
    <div v-if="videoUrl" class="current-video__container">
      <video :src="videoUrl" controls></video>
    </div>
    <p>{{ message }}</p>
    <ul class="videos">
      <li v-for="video in videos" :key="video.url">
        <span @click="playVideo(video)" class="name">{{ video.name }}</span>
        <a :href="video.url" :download="video.name" class="download">Download</a>
      </li>
    </ul>
    <div v-if="videos.length" class="download-all">
      <button @click="downloadAll()">Download all</button>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue';
import { fetchFile } from '@ffmpeg/util';
import { FFmpeg } from '@ffmpeg/ffmpeg';

const videoUrl = ref(null);
const message = ref("");
const labelMsg = ref("No video has been selected");
let videos = ref([]);
const handleFileChange = async (event) => {
  const files = event.target.files;
  if (files.length > 0) {
    labelMsg.value = files.length === 1
      ? "1 video has been selected"
      : `${files.length} videos have been selected`;
    for (const file of files) {
      const [convertedFile, fileName] = await convertToMp4(file);
      videos.value.push({
        file: convertedFile,
        name: fileName,
        url: URL.createObjectURL(convertedFile)
      });
      if (videos.value.length && !videoUrl.value) {
        playVideo(videos.value[0]);
      }
    }
    message.value = "Done!";
  } else {
    labelMsg.value = "No video has been selected"
  }
};

const convertToMp4 = async (file) => {
  const ffmpeg = new FFmpeg({ log: true });
  message.value = "Loading...";
  await ffmpeg.load();
  const fileName = file.name.split('.').slice(0, -1).join('') + '.mp4';
  message.value = "Writting file...";
  await ffmpeg.writeFile(file.name, await fetchFile(file))
  message.value = "Converting..." + fileName;
  await ffmpeg.exec([
    '-i', file.name, 
    '-preset', 'ultrafast',
    '-profile:v', 'baseline',
    '-level', '3.0',
    '-pix_fmt', 'yuv420p',
    '-b:v', '1M',
    '-c:a', 'aac',
    '-b:a', '128k',
    '-ar', '44100',
    '-ac', '2',
    '-movflags', '+faststart', fileName])
  message.value = "Reading...";
  const data = await ffmpeg.readFile(fileName);
  return [new Blob([data.buffer], { type: 'video/mp4' }), fileName];
};

const playVideo = (video) => {
  videoUrl.value = video.url;
};

const downloadAll = () => {
  const videoItems = document.querySelectorAll('a.download');
  videoItems.forEach(videoItem => {
    videoItem.click();
  });
};
</script>

<style scoped>

h1 {
  text-align: center;
}

h1 span{
  font-size: 3rem;
  color: var(--primary-color, black);
  text-shadow: 1px 0 var(--primary-color, #04baab), 
               -1px 0 var(--primary-color, #04baab),
               0 1px var(--primary-color, #04baab), 
               0 -1px var(--primary-color, #04baab),
               1px 1px var(--primary-color, #04baab), 
               -1px -1px var(--primary-color, #04baab), 
               1px -1px var(--primary-color, #04baab), 
               -1px 1px var(--primary-color, #04baab);
}

main {
  display: flex;
  flex-direction: column;
  align-items: center;
}

video {
  width: 600px;
  max-width: 90%;
  aspect-ratio: 16/9;
  background-color: black;
  border-radius: 8px;
}

.current-video__container {
  display: flex;
  justify-content: center;
  padding: 16px;
}

.video-input__container {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

#file-input {
  display: none;
}

.file-label {
  display: inline-block;
  padding: 8px;
  background-color: #333;
  border: 1px solid white;
  border-radius: 8px;
  text-align: center;
}

.file-label:hover {
  border: 1px solid var(--primary-color, #04baab);
  color: var(--primary-color, #04baab);
  cursor: pointer;
}

ul.videos {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 0;
  width: 90%;
  max-width: 500px;
}

ul.videos li {
  display: flex;
  justify-content: space-between;
  list-style: none;
  padding: 16px;
  background-color: #333;
  border: 2px solid white;
  color: white;
  border-radius: 4px;
}

ul.videos li .name:hover {
  cursor: pointer;
  color: var(--primary-color, #04baab);
}

.videos a.download {
  color: white;
}

.videos a.download:hover {
  color: var(--primary-color, #04baab);
}

.download-all button {
  display: inline-block;
  padding: 8px 16px;
  background-color: #333;
  color: white;
  border: 1px solid white;
  border-radius: 8px;
  text-align: center;
  font-size: 1rem;
}

.download-all button:hover {
  border: 1px solid var(--primary-color, #04baab);
  color: var(--primary-color, #04baab);
  cursor: pointer;
}

.download-all {
  margin-bottom: 16px;
}
</style>