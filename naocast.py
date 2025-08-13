import os
import fnmatch
from functools import lru_cache

import requests
from flask import (
    Flask, make_response, render_template, abort,
    request, redirect, url_for
)

app = Flask(__name__)

_BASE_EULA_URL = "https://svo.agracingfoundation.org/external/assets/eula"
EULA_URLS = {
    "wipeout/hd":       f"{_BASE_EULA_URL}/HD/Global/eula_PEGI.txt",
    "hd":               f"{_BASE_EULA_URL}/HD/Global/eula_PEGI.txt",
    "wipeout/pulse":    f"{_BASE_EULA_URL}/Pulse/eula_full.txt",
    "pulse":            f"{_BASE_EULA_URL}/Pulse/eula_full.txt",
    "wipeout/2048":     f"{_BASE_EULA_URL}/2048/Global/eula_PEGI.txt",
    "2048":             f"{_BASE_EULA_URL}/2048/Global/eula_PEGI.txt",
    "motorstorm/ae":    f"{_BASE_EULA_URL}/AE/Global/eula_PEGI.txt",
    "msae":             f"{_BASE_EULA_URL}/AE/Global/eula_PEGI.txt",
    "naocast":          f"/static/license/agpl.txt",
    "site":             f"/static/license/agpl.txt",
    "":                 f"{_BASE_EULA_URL}/HD/Global/eula_PEGI.txt",  # default
}

UA_REDIRECTS = {
    "PlayStation Vita": "fallback_psvita",
    "PLAYSTATION 3": "/fallback_ps3",
    "PlayStation Portable": "fallback_psp",
}

@app.before_request
def disallow_old_clients():
    if request.endpoint == 'static':
        return

    if request.path in ['/sorry_psvita_unsupported', '/sorry_ps3_unsupported', '/sorry_psp_unsupported', '/accept-legacy-redirect']:
        return

    if request.cookies.get('redirect_to_legacy') == '1':
        return redirect('https://legacy.agracingfoundation.org/', code=301)

    ua = request.headers.get('User-Agent', '')

    for agent, endpoint in UA_REDIRECTS.items():
        if agent in ua:
            return redirect(url_for(endpoint), code=301)

@lru_cache(maxsize=16)
def get_eula(url: str):
    if url.startswith("/static"):
        local_path = os.path.join(os.path.dirname(__file__), url.lstrip("/"))
        with open(local_path, encoding="utf-8") as f:
            txt_content = f.read()
    else:
        try:
            response = requests.get(url)
            response.encoding = 'utf-8'
            response.raise_for_status()
            txt_content = response.text\
            .replace("Online Interactions Not Rated by PEGI", "Online Interactions Not Rated by the ESRB, PEGI or CERO")\
            .replace("`", "'") # symbol ` doesn't render properly with our font :(
        except requests.RequestException:
            txt_content = "Could not load file content."

    return txt_content

@app.route("/")
def home():
    return render_template("home.html")

@app.route("/sorry_psvita_unsupported")
def fallback_psvita():
    return render_template("fallback_psvita.html")

@app.route("/sorry_ps3_unsupported")
def fallback_ps3():
    return render_template("fallback_ps3.html")

@app.route("/sorry_psp_unsupported")
def fallback_psp():
    return render_template("fallback_psp.html")

@app.route('/accept-legacy-redirect', methods=['POST'])
def accept_legacy_redirect():
    response = make_response(redirect('https://agracingfoundation.org/', code=301))
    response.set_cookie('redirect_to_legacy', '1', max_age=60*60*24*31)
    return response

@app.route("/news")
def news():
    return render_template("stub.html")

@app.route("/leaderboards")
def leaderboards():
    return render_template("leaderboards.html")

@app.route("/status")
def status():
    return render_template("status.html")

@app.route("/why_we_have_ads")
def ad_explainer():
    return render_template("ad_explainer.html")

def eula(path):
    if path in EULA_URLS:
        eula_text = get_eula(EULA_URLS[path])
        return render_template("eula.html", eula=eula_text)
    else:
        abort(404)

app.add_url_rule("/eula", defaults={"path": ""}, view_func=eula)
app.add_url_rule("/eulas/", defaults={"path": ""}, view_func=eula)
app.add_url_rule("/eula/<path:path>", view_func=eula)
app.add_url_rule("/eulas/<path:path>", view_func=eula)

@app.route("/license")
def horizon_license():
    return make_response(redirect('https://github.com/Horizon-Private-Server/horizon-server/blob/master/LICENSE', code=301))

@app.errorhandler(404)
def page_not_found(e):
    return render_template("404.html"), 404

if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=True)
