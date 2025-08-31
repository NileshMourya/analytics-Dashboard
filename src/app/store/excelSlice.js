import { createSlice } from "@reduxjs/toolkit";
import * as XLSX from "xlsx";
import { saveExcelData } from "../utils/db";

const initialState = {
  file: null,
  fileType: null,
  excelData: null,
  error: null,
  loading: null,
  tableContent: "TESLA",
  groupData: null,
  summary: null,
  colorTheme: null,
};

const excelSlice = createSlice({
  name: "excel",
  initialState,
  reducers: {
    setFile(state, action) {
      const file = action.payload;
      state.file = file
        ? { name: file.name, size: file.size, type: file.type }
        : null;
    },
    setFileType(state, action) {
      state.fileType = action.payload;
    },
    setExcelData(state, action) {
      state.excelData = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    setTableContent(state, action) {
      state.tableContent = action.payload;
    },
    setGroupData(state, action) {
      state.groupData = action.payload;
    },
    setSummary(state, action) {
      state.summary = action.payload;
    },
    setColorTheme(state, action) {
      state.colorTheme = action.payload;
    },
  },
});

export const {
  setFile,
  setError,
  setExcelData,
  setFileType,
  setLoading,
  setTableContent,
  setGroupData,
  setSummary,
  setColorTheme,
} = excelSlice.actions;
export default excelSlice.reducer;

export const parseExcelFile = (uploadFile) => async (dispatch) => {
  if (!uploadFile) {
    return;
  }

  dispatch(setLoading(true));
  dispatch(setError(null));

  try {
    dispatch(setFile(uploadFile));
    const extension = uploadFile?.name?.split(".").pop().toLowerCase();
    dispatch(setFileType(extension));

    const reader = new FileReader();

    reader.onload = async (event) => {
      try {
        const data = new Uint8Array(event.target.result);
        let workbook;

        if (extension === "csv") {
          const csvText = new TextDecoder("utf-8").decode(data);
          workbook = XLSX.read(csvText, { type: "string" });
        } else {
          workbook = XLSX.read(data, { type: "array" });
        }

        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        let json = XLSX.utils.sheet_to_json(worksheet, { defval: "" });

        const cleanedData = json.map((row) =>
          Object.fromEntries(
            Object.entries(row)?.map(([key, value]) => [
              key.replace(/\s+/g, ""),
              value,
            ])
          )
        );

        dispatch(setExcelData(cleanedData));
        await saveExcelData("excelData", cleanedData);
      } catch (error) {
        dispatch(setError("Error parsing file"));
        console.error(error);
      } finally {
        dispatch(setLoading(false));
      }
    };

    reader.readAsArrayBuffer(uploadFile);
  } catch (error) {
    dispatch(setError("File Processing failed"));
    dispatch(setLoading(false));
  }
};

export const groupByMake =
  (data = []) =>
  async (dispatch) => {
    const grouped = (data || [])?.reduce((acc, obj) => {
      const make = obj?.Make || "Unknown"; // fallback for missing Make
      if (!acc[make]) {
        acc[make] = [];
      }
      acc[make].push(obj);
      return acc;
    }, {});

    // Build summary with counts
    const summary = Object?.keys(grouped).map((make) => ({
      make,
      count: grouped[make].length,
    }));
    const sortedSummary = summary?.sort((a, b) => b.count - a.count);
    dispatch(setGroupData(grouped));
    dispatch(setSummary(sortedSummary));
  };
