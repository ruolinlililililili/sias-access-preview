# SIAS access preview

This is an independent China-access test deployment. It does not change ruolinli.me or its DNS records.

Create a public GitHub repository named `sias-access-preview`, upload this directory, and select **Settings → Pages → Source → GitHub Actions**. The included workflow publishes the `site` directory.

The preview address will be `https://USERNAME.github.io/sias-access-preview/`.

Google Fonts are bundled locally. Google Forms, Google Scholar, YouTube, and LinkedIn remain external links and may not be reachable from every network.

Ask testers in mainland China to check the homepage, Team, Research, Publications, News, Join SIAS, and EVAC-AI using mobile data and campus/home Wi-Fi. Verify photos, fonts, page navigation, and application links. Do not change production DNS until these checks pass.

Rebuild from the authoring workspace with `python3 scripts/build.py` followed by `python3 scripts/prepare_github_preview.py`.
