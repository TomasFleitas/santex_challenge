import { useEffect, useState } from 'react';

/* useState pero con persistencia en localStorage */
export default function useStateWithStorage<T>(key: string, defaultValue: T) {
  const [innerValue, setInnerValue] = useState<T>(defaultValue);

  const setValue = (v: any) => {
    if (typeof v === 'function') {
      v = v(innerValue);
    }
    let aux = JSON.stringify(v);
    localStorage.setItem(key, aux);
    setInnerValue(v);
  };

  useEffect(() => {
    if (!key) return;
    const value = localStorage.getItem(key);
    if (value) {
      setInnerValue(JSON.parse(value));
    }
  }, [key]);

  return [innerValue, setValue];
}
