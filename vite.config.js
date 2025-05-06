import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/SRA/", // make sure this matches your <Router basename="/SRA">
  build: {
    outDir: "dist",
  },
});
