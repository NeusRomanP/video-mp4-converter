<template>
  <div>
    <input type="file" @change="handleFileChange" accept="video/*" multiple />
    <video :src="videoUrl" controls></video>
    <p>{{ message }}</p>
    <ul>
      <li v-for="video in videos" :key="video.url">
        <span @click="playVideo(video)">{{ video.name }}</span>
        <a :href="video.url" :download="video.name" class="download">Download</a>
      </li>
    </ul>
    <div v-if="videos.length">
      <button @click="downloadAll()">Download all</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { fetchFile } from '@ffmpeg/util';
import { FFmpeg } from '@ffmpeg/ffmpeg';

const videoUrl = ref(null);
const message = ref("");
let videos = ref([]);
const handleFileChange = async (event) => {
  const files = event.target.files;
  if (files.length > 0) {
    for (const file of files) {
      const [convertedFile, fileName] = await convertToMp4(file);
      videos.value.push({
        file: convertedFile,
        name: fileName,
        url: URL.createObjectURL(convertedFile)
      });
    }
    message.value = "Done!";
    console.log("done");
  }
};

const convertToMp4 = async (file) => {
  const ext2Convert = ['avi', 'mpg'];
  const ffmpeg = new FFmpeg({ log: true });
  message.value = "Loading...";
  await ffmpeg.load();
  const fileName = file.name.split('.').slice(0, -1).join('') + '.mp4';
  if (ext2Convert.includes(file.name.split('.').pop().toLowerCase())) {
    message.value = "Writting file...";
    console.log("writting file");
    await ffmpeg.writeFile(file.name, await fetchFile(file))
    message.value = "Converting..." + fileName;
    console.log("Converting..." + fileName);
    await ffmpeg.exec(['-i', file.name, '-preset', 'ultrafast', fileName])
    message.value = "Reading...";
    console.log("reading...");
    const data = await ffmpeg.readFile(fileName);
    return [new Blob([data.buffer], { type: 'video/mp4' }), fileName];
  }
  return [file, file.name];
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
video {
  width: 600px;
  aspect-ratio: 16/9;
  background-color: black;
}
</style>