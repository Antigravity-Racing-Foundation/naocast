# Naocast
Version 2 of the official AGRF website
## What is this?
Naocast is the code name for [AGRF's new website](https://agracingfoundation.org/), replacing the first implementation (which is closed-source and can still be accessed at https://legacy.agracingfoundation.org/).

Written from ground-up in Flask and Tailwind with some vanilla Javascript ported from the legacy website as a base for the Status page.
## Features
Compared to the original website, Naocast features many improvements:
- A more complete and accurate implementation of ThatOneBonk's original design concept - a near-perfect match;
- Proper scaling for smaller screens (mobile devices);
- Redesigned Status page;
- "Website unsupported" notices for legacy platforms (such as PS3 and PS Vita);
- More features such as RSS News reader and Thallium leaderboard viewer coming;
- Secrets
## How to run
1. `tailwindcss -i ./static/css/input.css -o ./static/css/output.css` (add `--watch` if you're developing, for continuous compiling)
2. `python naocast.py` to run web server
3. Open browser at `localhost:5000`
## Contributions
...are welcome! If you want to suggest a feature, improve the code or report a bug, please open an issue or a pull request.
