import { useCallback, useMemo } from "react";

export type CacheEntry<T, P> = {
  data: T;
  pagination: P;
  timestamp: number;
};

let dbPromise: Promise<IDBDatabase> | null = null;

function openDB(): Promise<IDBDatabase> {
  if (dbPromise) return dbPromise;

  dbPromise = new Promise((resolve, reject) => {
    const request = indexedDB.open("PokemonCacheDB", 1);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains("allPokemons")) {
        db.createObjectStore("allPokemons");
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });

  return dbPromise;
}

export const useCache = () => {
  
  const getCache = useCallback(
    async <T, P>(queryKey: string): Promise<CacheEntry<T, P> | null> => {
      const db = await openDB();

      return new Promise((resolve, reject) => {
        const tx = db.transaction("allPokemons", "readonly");
        const store = tx.objectStore("allPokemons");
        const req = store.get(queryKey);

        req.onsuccess = () => {
          const entry = req.result as CacheEntry<T, P> | undefined;
          if (!entry) return resolve(null);

          const isExpired = Date.now() - entry.timestamp > 15 * 60 * 1000;
          if (isExpired) return resolve(null);

          resolve(entry);
        };

        req.onerror = () => reject(req.error);
      });
    },
    []
  );

  const setCache = useCallback(
    async <T, P>(queryKey: string, data: T, pagination: P): Promise<void> => {
      const db = await openDB();

      return new Promise((resolve, reject) => {
        const tx = db.transaction("allPokemons", "readwrite");
        const store = tx.objectStore("allPokemons");

        const entry: CacheEntry<T, P> = {
          data,
          pagination,
          timestamp: Date.now(),
        };

        const req = store.put(entry, queryKey);

        req.onsuccess = () => resolve();
        req.onerror = () => reject(req.error);
      });
    },
    []
  );

  const removeCache = useCallback(async (queryKey: string): Promise<void> => {
    const db = await openDB();

    return new Promise((resolve, reject) => {
      const tx = db.transaction("allPokemons", "readwrite");
      const store = tx.objectStore("allPokemons");

      const req = store.delete(queryKey);

      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  }, []);


  return useMemo(
    () => ({ getCache, setCache, removeCache }),
    [getCache, setCache, removeCache]
  );
};
