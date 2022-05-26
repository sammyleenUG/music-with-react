import LoaderSrc from '../assets/preloader.gif';
import './loader.css'

const Loader = () => (
    <div className="row align-items-center loader">
        <div className="col">
            <img src={LoaderSrc} alt="loading" />
        </div>
    </div>
);

export default Loader;