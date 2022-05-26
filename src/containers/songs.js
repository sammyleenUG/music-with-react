import React from 'react';
import './songs.css';
import Navbar from './navbar';
import Loader from './loader';
import 'whatwg-fetch';

const Songs = (props) => {

    return (
        <div className="row offset-sm-2">
            {props.list.map((song, index) => {
                return (
                    <div className="col-sm-5" key={index}>
                        <div className="card">
                            <img className="card-top-img" src={song.snippet.thumbnails.high.url} alt="thumbnail" />

                            <div className="card-body">
                                <p className="card-text">{song.snippet.title.toLowerCase()}</p>
                            </div>
                            <div className="card-footer">
                                <div className="row">
                                    <div className="col-sm-8">
                                        <p className="artist-name"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                            <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                                        </svg> {song.snippet.channelTitle.toUpperCase()}</p>
                                    </div>
                                    <div className="col-sm-4">
                                        <button className="btn btn-sm btn-outline-secondary">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-download" viewBox="0 0 16 16">
                                                <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
                                                <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z" />
                                            </svg> Download</button>
                                    </div>
                                </div>


                            </div>

                        </div>
                    </div>

                )


            })}

        </div>



    )

}

class FetchSongs extends React.Component {
    state = {
        songs: [],
        isFetching: false,
    };

    componentDidMount() {
        this.setState({ isFetching: true });
        fetch('https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=UG&videoCategoryId=10&key=AIzaSyDfgXMzksOcFkRe5LVLmTDAXjrv4IClGbo')
            .then((response) => response.json())
            .then((json) => this.setState({ songs: json.items, isFetching: false }))
    };

    setOnChangeListener = (e) => {
        const q = e.target.value;
        this.setState({ isFetching: true });
        return (
            fetch('https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&q=' + q + '&order=date&type=video&videoEmbeddable=true&videoCategoryId=10&key=AIzaSyDfgXMzksOcFkRe5LVLmTDAXjrv4IClGbo')
                .then((response) => response.json())
                .then((json) => this.setState({ songs: json.items, isFetching: false }))
        )

    }

    render() {
        return (
            <div className="container">
                <Navbar onChangeListener={this.setOnChangeListener} />

                {
                    (this.isFetching || this.state.songs.length === 0) ?
                        <Loader />
                        :
                        <Songs list={this.state.songs} />
                }

            </div>
        );
    }
}



export default FetchSongs;