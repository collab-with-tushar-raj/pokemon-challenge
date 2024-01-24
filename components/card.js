export const Card = ({ id, name, types, stats }) => {
    return (
        <div className='col-lg-4 col-md-6 col-sm-12 card-container'>
            <div className='content'>
                <h5 className='text-center'>{name}</h5>
                <img src={`/sprites/${id}.svg`} alt={`${name}`} width={300} height={300} />
            </div>
            <div className="overlay">
                <div className="d-flex p-3">
                    <img src={`/sprites/${id}.svg`} alt={`${name}`} width={200} height={200} />
                    <div className="d-flex flex-column px-4">
                        <p><b>Types: </b><span>{types.join(',')}</span></p>
                        <p><b>Stats: </b><span>{stats.join(',')}</span></p>
                    </div>
                </div>
            </div>
        </div>
    );
};