import YoutubeVideo from "./YoutubeVideo";
import { useEffect, useState, useRef } from "react";
import './index.css';
import youtubeicon from '../src/img/youtube.png';

function App() {
  const isDownloadable = useRef(false)
  const [url, setUrl] = useState("");
  const [history, setHistory] = useState(
    localStorage.getItem("{history}")
    ? JSON.parse(localStorage.getItem(history))
    : []
  );
  const [youtube, setYoutube] = useState(false);
  const [loading, setLoading] = useState(false);

  const downloadAgain = (url) => {
    isDownloadable.current = true
    setUrl(url)
  }

  const clickHandle = () => {
    isDownloadable.current = true
    download()
  }

  useEffect(() => {
    if(isDownloadable.current === true){
      download()
    }
  }, [url])

  useEffect(() => {
    if (youtube) {
      if (!history.find((h) => h.url === url)) {
        let newHistory = {
          url: url,
          title: youtube.info.title,
        };
        setHistory([...history, newHistory]);
      }
    }
  }, [youtube]);

  useEffect(() => {
    localStorage.setItem("history", JSON.stringify(history));
  }, [history]);

  const download = () => {
    if (url) {
      setLoading(true);
      fetch(`https://youtubevideoindirme.pythonanywhere.com/api/youtube?url=${url}`)
        .then((res) => res.json())
        .then((data) => { 
          setLoading(false);
          setYoutube(data);
        });
    }
  };

  return (
    <div className="App">
      <form action="" method="post" onSubmit={(e) => e.preventDefault()}>
        <div className="top-title"><img src={youtubeicon} className="yt-icon"/><h3>Downloader</h3></div>
        <div className="search">
          <input
            type="text"
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Youtube URL"
          />
          <button type="submit" onClick={clickHandle}>
            Download
          </button>
        </div>
      </form>
      {loading && <div className="loader"> Yükleniyor...</div>}
      {youtube && loading === false && <YoutubeVideo youtube={youtube} />}
      <div className="must"><span>Created by <a href="https://github.com/MustafaOzkarabulut" target='_blank'>Must</a></span></div>
    </div>
  );
}

export default App;
