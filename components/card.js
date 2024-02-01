export const Card = ({ id, name, types, attack, defense, hp, speed, specialAttack, specialDefense }) => {
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
                        <p><b>Types: </b><span>{types.join(', ')}</span></p>
                        <p><b>Attack: </b><span>{attack}</span></p>
                        <p><b>Defensive: </b><span>{defense}</span></p>
                        <p><b>HP: </b><span>{hp}</span></p>
                        <p><b>Speed: </b><span>{speed}</span></p>
                        <p><b>SpecialAttack: </b><span>{specialAttack}</span></p>
                        <p><b>SpecialDefense: </b><span>{specialDefense}</span></p>
                    </div>
                </div>
            </div>
        </div>
    );
};