<p align="center">
  <img src="ad-blocker.png" alt="Remove Ad Overlays Icon" width="128" height="128">
</p>

# Remove Ad Overlays

A lightweight, purely client-side solution designed to bypass intrusive full-screen AdBlock detection overlays and restore DOM functionality.

## Technical Overview

This tool implements a JavaScript-based payload (Bookmarklet) that interacts with the browser's Document Object Model (DOM) to mitigate the effects of script-injected modal overlays.

### Core Functionality
- **DOM Node Removal**: Specifically targets and removes identified overlay elements (e.g., `#adblock-overlay`) that obstruct user interaction.
- **State Restoration**: Dynamically resets the `overflow` property of `document.body` and `document.documentElement` to `auto`. This counteracts scripts that programmatically disable page scrolling by setting these properties to `hidden`.
- **Lightweight Execution**: Optimized for minimal memory footprint and zero persistent background overhead.

## Installation

The project includes an interactive landing page ([index.html](index.html)) designed to generate the bookmarklet dynamically from the source script.

1. Deploy the files to a local or remote web server.
2. Open `index.html`.
3. Drag the **"Remove Overlay"** button to your browser's Bookmarks bar.

## License

This project is licensed under the **GNU Affero General Public License v3.0 (AGPL-3.0)**. 

> [!IMPORTANT]
> Any derivative work or modifications hosted on a server must also be made available under the same license terms, ensuring full transparency and reciprocity within the open-source community.

## Legal Disclaimer

> [!WARNING]
> This repository and the software contained herein are provided for **educational and research purposes only**. The primary objective is to study DOM manipulation and browser security mechanisms.
>
> The author(s) and contributors:
> 1. Do **not** encourage or endorse the bypass of legitimate website monetization systems.
> 2. Accept **no responsibility** for any misuse of this tool.
> 3. Shall not be held liable for any damages, legal issues, or account suspensions resulting from the use of this software.
>
> Users are solely responsible for ensuring that their actions comply with the Terms of Service of any website they interact with.

---
<p align="center">
  Made with ❤️ by <a href="https://github.com/cellicom">cellicom</a> | 
  <a href="https://www.flaticon.com/free-icons/ad-blocker" title="ad blocker icons">Ad blocker icons created by Freepik - Flaticon</a>
</p>
