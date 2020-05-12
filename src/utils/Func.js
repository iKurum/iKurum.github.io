function ByteConvert(bytes) {
  if (isNaN(bytes)) {
    return '';
  }
  const symbols = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  let exp = Math.floor(Math.log(bytes) / Math.log(2));
  if (exp < 1) {
    exp = 0;
  }

  const i = Math.floor(exp / 10);
  bytes = bytes / Math.pow(2, 10 * i);

  if (bytes.toString().length > bytes.toFixed(2).toString().length) {
    bytes = bytes.toFixed(2);
  }

  return bytes + ' ' + symbols[i];
};

function ArrayBufferToBase64(buffer) {
  var binary = '';
  var bytes = new Uint8Array(buffer);
  var len = bytes.byteLength;
  for (var i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}

function FolderIcon(data) {
  if (data.folder) {
    return 'iconfont icon-open_filled';
  } else if (data.package && data.package.type === 'oneNote') {
    return 'iconfont icon-microsoftonenote';
  } else if (data.file) {
    switch (data.name.split('.')[data.name.split('.').length - 1].toLowerCase()) {
      case 'pdf':
        return 'iconfont icon-pdf';
      case 'doc':
      case 'docx':
        return 'iconfont icon-Word';
      case 'ppt':
      case 'pptx':
        return 'iconfont icon-office-pptx';
      case 'xls':
      case 'xlsx':
        return 'iconfont icon-office-excel';
      case 'mp4':
      case 'flv':
      case 'mkv':
        return 'iconfont icon-video';
      case 'mp3':
        return 'iconfont icon-MusicAcc';
      case 'jpeg':
      case 'jpg':
      case 'png':
        return 'iconfont icon-image';
      case '7z':
      case 'zip':
      case 'gz':
      case 'rar':
        return 'iconfont icon-filezip';
      case 'md':
        return 'iconfont icon-file-markdown';
      case 'exe':
        return 'iconfont icon-exe';
      case 'iso':
        return 'iconfont icon-iso';
      case 'txt':
        return 'iconfont icon-txt';
      case 'apk':
        return 'iconfont icon-apk';
      default:
        return 'iconfont icon-geshi_weizhi';
    }
  } else {
    return 'iconfont icon-geshi_weizhi';
  }
}

export { ByteConvert, ArrayBufferToBase64, FolderIcon };