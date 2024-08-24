# Video MP4 converter

## Description
A web application built with Vue.js that allows users to convert video files to MP4 format directly in the browser using FFmpeg.js. This application supports various video formats like AVI, MKV, MPG, and more, making it easy to convert and download videos without the need for any server-side processing.

### Features
- **Multi-format Conversion:** Convert a wide range of video formats to MP4.
- **Client-side Processing:** All conversions are done in the browser, ensuring privacy and no need for server resources.
- **Batch Conversion:** Supports converting multiple videos at once.
- **Fast Conversion:** Uses the ultrafast preset for quick processing.
- **Preview Before Download**: Display videos in the browser before downloading them.
- **Downloadable Outputs:** Easily download the converted videos in MP4 format.

### How to Use:
1. Upload one or more video files.
2. The app will convert each video to MP4 format.
3. Once the conversion is complete, download the videos directly to your device.
4. If you wish, you can display the videos in the browser before downloading them.

### Technologies Used:
- **Vue.js**: For building the user interface.
- **FFmpeg.js**: For handling video conversion in the browser.
- **JavaScript**: Core logic and functionality.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
