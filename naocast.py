from flask import Flask, make_response, render_template, abort, request, redirect
import requests

app = Flask(__name__)

# you're free to dunk on me (bonk) for how ugly ts is
EULA_URLS = {
    "wipeout/hd":     "https://svo.agracingfoundation.org/external/assets/eula/HD/Global/eula_PEGI.txt",
    "hd":     "https://svo.agracingfoundation.org/external/assets/eula/HD/Global/eula_PEGI.txt",
    "wipeout/pulse":  "https://svo.agracingfoundation.org/external/assets/eula/Pulse/eula_full.txt",
    "pulse":  "https://svo.agracingfoundation.org/external/assets/eula/Pulse/eula_full.txt",
    "wipeout/2048":   "https://svo.agracingfoundation.org/external/assets/eula/2048/Global/eula_PEGI.txt",
    "2048":   "https://svo.agracingfoundation.org/external/assets/eula/2048/Global/eula_PEGI.txt",
    "motorstorm/ae":  "https://svo.agracingfoundation.org/external/assets/eula/AE/Global/eula_PEGI.txt",
    "msae":  "https://svo.agracingfoundation.org/external/assets/eula/AE/Global/eula_PEGI.txt",
    "":               "https://svo.agracingfoundation.org/external/assets/eula/HD/Global/eula_PEGI.txt",  # default
}

@app.before_request
def disallow_ps_vita():
    if request.endpoint == 'static':
        return

    if request.path in ['/sorry_vita_unsupported', '/accept-legacy-redirect']:
        return

    if request.cookies.get('redirect_to_legacy') == '1':
        return redirect('https://agracingfoundation.org/', code=301)

    ua = request.headers.get('User-Agent', '')
    if 'PlayStation Vita' in ua or 'Silk/' in ua:
        return redirect('/sorry_vita_unsupported', code=301)

def get_eula(url: str):
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

@app.route("/sorry_vita_unsupported")
def fallback_psvita():
    return render_template("fallback_psvita.html")

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

@app.errorhandler(404)
def page_not_found(e):
    return render_template("404.html"), 404

if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=True)
