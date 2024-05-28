import { defineConfig } from 'vite'
import { config as dotenvConfig } from 'dotenv';
import react from '@vitejs/plugin-react'
import path from 'path';

dotenvConfig();

const __dirname = "";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174,
    start: "react-scripts start --ignore-certificate-errors",
    https: {
      key: path.resolve(__dirname, 'key.pem'), // SSL 개인 키 파일 경로
      cert: path.resolve(__dirname, 'cert.pem'), // SSL 인증서 파일 경로
    },

  },
});
