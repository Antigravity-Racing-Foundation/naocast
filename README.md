# Naocast
Version 2 of the official AGRF website
## What is this?
Naocast is the code name for [AGRF's new website](https://agracingfoundation.org/), replacing the first implementation (which is also [open-source](https://github.com/Antigravity-Racing-Foundation/agrf-frontend) and can still be accessed at https://legacy.agracingfoundation.org/).

Built from ground-up in Flask and Tailwind with some vanilla JavaScript ported from the legacy website as a base for the Status page.
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
## SVG resource notice
This website utilizes SVG resources extensively. The sources for each asset are included in the `static/images/` directory, but the assets actually used in markup have been compressed and modified.

While this enables color customization and eliminates SVG flashes on page reloads, this operation makes it hard to change the SVG assets used directly.

To counter this, the \<img> tags referencing the source SVG files are left in markup and commented out, and this Readme section has been written to describe the "baking" process.

The SVG files are:
- Exported as plain SVG's;
- Further compressed using SVGO with the `--pretty` flag;
- References to colors are replaced with Jinja variables;
- A `class` tag is added, configurable via a Jinja variable;
- The result is placed into an appropriate macro template and references to the images are replaced with a proper macro call.

For development process, you may use typical \<img> SVG loads. However, such assets will ignore color theming!
## Contributions
...are welcome! If you want to suggest a feature, improve the code or report a bug, please open an issue or a pull request.
