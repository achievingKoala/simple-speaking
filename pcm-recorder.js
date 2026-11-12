class PcmRecorder extends AudioWorkletProcessor {
  constructor() {
    super();
    this.chunk = new Int16Array(800);
    this.offset = 0;
  }

  process(inputs) {
    const channel = inputs[0]?.[0];
    if (!channel) return true;
    for (const sample of channel) {
      this.chunk[this.offset++] = Math.max(-1, Math.min(1, sample)) * 32767;
      if (this.offset === this.chunk.length) {
        this.port.postMessage(this.chunk, [this.chunk.buffer]);
        this.chunk = new Int16Array(800);
        this.offset = 0;
      }
    }
    return true;
  }
}
registerProcessor("pcm-recorder", PcmRecorder);
