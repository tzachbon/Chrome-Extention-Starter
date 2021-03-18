export const STORAGE_KEY = 'youtube.liveshare.storage.key'

const onChanged = chrome.storage.onChanged;
const storage = chrome.storage.local;

type TOnChangeListener = Parameters<(typeof onChanged)['addListener']>[0]
type TOnChangeCallbackValue<T> = {
  oldValue?: T;
  newValue: T;
}

export class ChromeStorage<T> {
  constructor(private readonly key: string = STORAGE_KEY) { }

  subscribe(callback: (newValue: T, oldValue?: T) => any) {
    const listener: TOnChangeListener = async (changes, areaName) => {
      if (areaName !== 'local') return;

      const { newValue, oldValue } = changes[this.key] as TOnChangeCallbackValue<T>;

      await callback(newValue, oldValue);
    };

    onChanged.addListener(listener)
    return {
      remove: () => {
        onChanged.removeListener(listener)
      }
    }
  }

  set(data: T, handleChange?: () => void) {
    storage.set({ [this.key]: data }, handleChange);
  }

  get(): Promise<T> {
    return new Promise((resolve, reject) => {
      storage.get((changes) => {
        const data = changes[this.key] as T;

        resolve(data);
      })
    })
  }

  clear(callback?: () => any) {
    storage.clear(callback)
  }
}