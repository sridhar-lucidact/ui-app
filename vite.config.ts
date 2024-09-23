//@ts-ignore
import { resolve } from "path";
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

//@ts-ignore
const root = resolve(__dirname, "src");

const aliases = {
  "~/config": resolve(root, "config"),
  "~/utils": resolve(root, "utils"),
  "~/pages": resolve(root, "pages"),
  "~/components": resolve(root, "components"),
  "~/assets": resolve(root, "assets"),
  "~/hooks": resolve(root, "hooks"),
  "~/store": resolve(root, "store"),
  "~/styles": resolve(root, "store"),
  "~/types": resolve(root, "types"),
  "~/executableEvents": resolve(root, "executableEvents"),
  "~/__helper": resolve(root, "__helper"),
  "ui-conf": resolve(__dirname, "ui-conf"),
  "la-ui-schema": resolve(__dirname, "lib", "la-ui-schema"),
  "conf": resolve(__dirname, "conf"),
  "~/*": resolve(root)
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    // alias: [{ find: "@", replacement: root }]
    alias: aliases
  }
})
