import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const [repositoryOwner, repositoryName] =
  process.env.GITHUB_REPOSITORY?.split("/") ?? [];
const isUserSite = repositoryName === `${repositoryOwner}.github.io`;

export default defineConfig({
  base:
    process.env.GITHUB_ACTIONS && repositoryName && !isUserSite
      ? `/${repositoryName}/`
      : "/",
  plugins: [react()],
});
