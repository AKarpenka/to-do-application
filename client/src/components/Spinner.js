import PacmanLoader from 'react-spinners/PacmanLoader';

const Spinner = () => {
    return (
        <div className="loading">
            <PacmanLoader
                color={'rgb(255,175,163)'}
                loading={true}
                size={30}
                aria-label="Loading"
            />
        </div>
    )
}

export default Spinner;