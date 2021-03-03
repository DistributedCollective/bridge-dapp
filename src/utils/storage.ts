class CustomStorage {
  private items: { [key: string]: string } = {};
  public set(key: string, value: string) {
    this.items[key] = value;
    try {
      window.localStorage.setItem(key, value);
    } catch (e) {}
  }

  public get(key: string, _default: any = null) {
    let value;
    try {
      value = window.localStorage.getItem(key) || _default;
    } catch (e) {
      if (this.items.hasOwnProperty(key)) {
        value = this.items[key] || _default;
      } else {
        value = _default;
      }
    }
    return value;
  }
}

export const storage = new CustomStorage();
