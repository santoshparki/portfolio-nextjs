/** @type {import("next").NextConfig} */
const isGithubPages = process.env.GITHUB_PAGES === "true";
const repoName = "portfolio-nextjs";

const nextConfig = {
  output: "export",
  basePath: isGithubPages ? `/${repoName}` : "",
  assetPrefix: isGithubPages ? `/${repoName}/` : "",
  env: {
    NEXT_PUBLIC_BASE_PATH: isGithubPages ? `/${repoName}` : "",
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
