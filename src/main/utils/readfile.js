function readBinaryChunked(file, chunkCallback, endCallback) {
  const fileSize = file.size;
  const chunkSize = 8 * 1024; // 8k
  let offset = 0;

  const reader = new FileReader();
  reader.onload = () => {
    if (reader.error) {
      endCallback(reader.error || {});
      return;
    }
    offset += reader.result.byteLength;
    try {
      chunkCallback(reader.result, offset, fileSize);
    } catch (err) {
      endCallback(err);
      return;
    }
    if (offset >= fileSize) {
      endCallback(null);
      return;
    }
    readNext();
  };

  reader.onerror = (err) => {
    endCallback(err || {});
  };

  function readNext() {
    const fileSlice = file.slice(offset, offset + chunkSize);
    reader.readAsArrayBuffer(fileSlice);
  }
  readNext();
}

export default readBinaryChunked;
