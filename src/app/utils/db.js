import { openDB } from "idb";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";

export const initDB = async () => {
  return openDB("ExcelDB", 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains("files")) {
        db.createObjectStore("files");
      }
    },
  });
};

export const saveExcelData = async (key, data) => {
  const db = await initDB();
  await db.put("files", data, key);
  toast.success("Data save successfully");
  window.location.reload();
};

export const getExcelData = async (key) => {
  const db = await initDB();
  return db.get("files", key);
};

export const deleteDB = async () => {
  await indexedDB.deleteDatabase("ExcelDB");
};

export const useCheckExcelData = (key) => {
  const router = usePathname();

  useEffect(() => {
    const checkData = async () => {
      const db = await initDB();
      const data = await db.get("files", key);

      if (!data) {
        // If no data exists, redirect to /upload
        router.replace("/uploads");
      }
    };

    checkData();
  }, [key, router]);
};
