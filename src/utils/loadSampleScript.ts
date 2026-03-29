import { useAppStore } from '../store/useAppStore';

export async function loadSampleScript() {
  const store = useAppStore.getState();
  const hasScript = store.scriptPages.some((sp) => sp.showId === 'sample-show-1');
  if (hasScript) return;

  try {
    const res = await fetch('/sample-script.txt');
    const text = await res.text();
    if (text) {
      store.importScript('sample-show-1', text);
    }
  } catch {
    // Sample script not available, that's fine
  }
}
