from flask import Flask, render_template, abort
import requests

app = Flask(__name__)

EULA_URLS = {
    "wipeout/hd":     "https://svo.agracingfoundation.org/external/assets/eula/HD/Global/eula_PEGI.txt",
    "wipeout/pulse":  "https://svo.agracingfoundation.org/external/assets/eula/Pulse/eula_full.txt",
    "wipeout/2048":   "https://svo.agracingfoundation.org/external/assets/eula/2048/Global/eula_PEGI.txt",
    "motorstorm/ae":  "https://svo.agracingfoundation.org/external/assets/eula/AE/Global/eula_PEGI.txt",
    "":               "https://svo.agracingfoundation.org/external/assets/eula/HD/Global/eula_PEGI.txt",  # default
}

def get_eula(url: str):
    try:
        response = requests.get(url)
        response.encoding = 'utf-8'
        response.raise_for_status()
        txt_content = response.text\
        .replace("Online Interactions Not Rated by PEGI", "Online Interactions Not Rated by the ESRB, PEGI or CERO")\
        .replace("`", "'") # symbol ` doesn't render properly with our font >n<
    except requests.RequestException:
        txt_content = "Could not load file content."

    return txt_content

@app.route("/")
def home():
    return render_template("home.html")

@app.route("/thallium")
def thallium():
    return render_template("stub.html")

@app.route("/leaderboards")
def leaderboards():
    return render_template("leaderboards.html")

@app.route("/status")
def status():
    return render_template("stub.html")

@app.route("/eula", defaults={"path": ""})
@app.route("/eula/<path:path>")
def eula(path):
    if path in EULA_URLS:
        eula_text = get_eula(EULA_URLS[path])
        return render_template("eula.html", eula=eula_text)
    else:
        abort(404)

@app.errorhandler(404)
def page_not_found(e):
    return render_template("404.html"), 404

if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=True)
