import React, { useContext } from 'react'
import { PlayerContext } from '../../Context/PlayerContext'
import YouTube from 'react-youtube'
import "./VideoPlayer.css"

const VideoPlayer = () => {

    const { urlId, setUrlId } = useContext(PlayerContext);

    return (

        <div className='video-player'>

            {urlId && (

                <div className='video-overlay'>

                    <button
                        className='close-btn'
                        onClick={() => setUrlId("")}
                    >
                        ✕
                    </button>

                    <YouTube
                        videoId={urlId}
                        opts={{
                            width: "100vw",
                            height: "100vh",
                            playerVars: {
                                autoplay: 1,
                                mute: 0,
                                controls: 1,
                                rel: 0,
                            },
                        }}
                    />

                </div>

            )}
        </div>

    )
}

export default VideoPlayer