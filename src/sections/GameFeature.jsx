export default function GameFeature({ game, onLearnMore }) {
  return (
    <section
      id={game.id === 'pong' ? 'games' : game.id}
      className={`game-feature ${game.reversed ? 'game-feature--reversed' : ''}`}
    >
      <div className="game-feature__inner section-container">
        <div className="game-feature__copy">
          <h2>
            {game.title[0] && <>{game.title[0]}<br /></>}
            <span>{game.title[1]}</span>
          </h2>
          <p>{game.description}</p>
          <button className="button" type="button" onClick={onLearnMore}>Learn more</button>
        </div>
        <div className="game-feature__art">
          <img className="game-feature__blob" src={game.blob} alt="" />
          <img className="game-feature__image" src={game.image} alt={game.imageAlt} />
        </div>
      </div>
    </section>
  );
}
