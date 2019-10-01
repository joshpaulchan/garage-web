export default class Dependency {
  source = null;
  sink = null;
  constructor({ source, sink }) {
    this.source = source;
    this.sink = sink;
  }
  static from(source) {
    return new Dependency({ source });
  }
  static of(sink) {
    return Dependency.from(sink);
  }
  to(sink) {
    this.sink = sink;
    return this;
  }
  on(sink) {
    return this.to(sink);
  }
}
