function YoutubeVideo({ youtube: { info, sources } }) {

 return (

        <div className="result">

            <div className="video-item">
                <img src={info.thumbnail} alt={info.title} />
                <div className="video-details">
                    <div className="title">{info.title}</div>
                    <div className="author"><span>Yükleyen</span>{info.author}</div>
                    <div className="length"><span>Süre</span>{info.length}</div>
                    <div className="view"><span>Görüntülenme</span>{info.views}</div>
                </div>
            </div>


            <ul>
                {sources.map((sources, key) => (
                    <li key={key}>
                        <div className="quality">
                            <span>Kalite</span>
                            {sources.quality}
                        </div>
                        <div className="size">
                            <span>Boyut</span>
                            {sources.size}
                        </div>
                        <a href={sources.url + '&title=' + info.title } download={info.title} target="_blank">Download</a>
                    </li>
                ))}

            </ul>
        </div >

    )
}

export default YoutubeVideo

