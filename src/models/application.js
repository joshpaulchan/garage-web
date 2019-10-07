export default class Application {
  id = null;
  name = null;
  version = null;
  constructor({ id, name, version }) {
    this.id = id;
    this.name = name;
    this.version = version;
  }
}
