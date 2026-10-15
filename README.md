# SIAS Lab website

GitHub Pages publication for ruolinli.me, following successful mainland-China testing.

Create a public GitHub repository named `sias-access-preview`, upload this directory, and select **Settings → Pages → Source → GitHub Actions**. The included workflow publishes the `site` directory.

The production address is `https://ruolinli.me/`. GitHub Pages custom-domain settings control routing; leave the workflow source as GitHub Actions.

Google Fonts are bundled locally. Google Forms, Google Scholar, YouTube, and LinkedIn remain external links and may not be reachable from every network.

Ask testers in mainland China to check the homepage, Team, Research, Publications, News, Join SIAS, and EVAC-AI using mobile data and campus/home Wi-Fi. Verify photos, fonts, page navigation, and application links. Do not change production DNS until these checks pass.

Rebuild from the authoring workspace with `python3 scripts/build.py` followed by `python3 scripts/prepare_github_preview.py`.
