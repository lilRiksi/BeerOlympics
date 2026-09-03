import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import SiteFooter from '../components/SiteFooter';
import { bracketEvents } from '../data/bracketEvents';
import '../styles/bracket.css';

function EventTitle({ title }) {
  const prefix = 'Beer Olympics';
  return <>{prefix}<sup>™</sup><span>{title.slice(prefix.length)}</span></>;
}

function Match({ teams, result, onSelect }) {
  return (
    <button className="bracket-match" type="button" onClick={() => onSelect({ teams, result })}>
      {teams.map((team, index) => <div className={'bracket-team' + (result?.winner === index ? ' bracket-team--winner' : '')} key={team + index}>{team}{result?.winner === index && <span aria-label="Winner">✓</span>}</div>)}
    </button>
  );
}

function matchPairs(teams) {
  return Array.from({ length: Math.ceil(teams.length / 2) }, (_, index) => teams.slice(index * 2, index * 2 + 2));
}

function playedResult(winner, index) {
  const losingScore = 2 + (index % 4);
  return { scores: winner === 0 ? [6, losingScore] : [losingScore, 6], winner };
}

function preferredTeams(event) {
  const matches = event.podiumMatches;
  return [
    ...(matches?.quarterfinals?.map((match) => match.teams[match.winner]) || []),
    ...(matches?.semifinals?.map((match) => match.teams[match.winner]) || []),
    matches?.final?.teams?.[0],
    matches?.final?.teams?.[1],
    matches?.thirdPlace?.teams?.[0],
  ].filter(Boolean);
}

function makePlayedRound(title, entrants, event, offset = 0) {
  const matches = matchPairs(entrants);
  const preferred = preferredTeams(event);
  const results = matches.map((match, index) => {
    const preferredIndex = match.findIndex((team) => preferred.includes(team));
    return playedResult(preferredIndex === -1 ? 0 : preferredIndex, offset + index);
  });
  return { title, matches, results, winners: matches.map((match, index) => match[results[index].winner]) };
}

function buildBracket(event) {
  const firstRoundTeams = Array.from({ length: event.teamCount }, (_, index) => event.teams[index] || 'TBD team ' + (index + 1));
  const firstRound = makePlayedRound('First round', firstRoundTeams, event);

  if (event.teamCount === 48) {
    const secondRound = makePlayedRound('Second round', firstRound.winners, event, 24);
    const thirdRound = makePlayedRound('Third round', secondRound.winners, event, 36);
    const fourthRound = makePlayedRound('Fourth round', thirdRound.winners, event, 42);
    return [
      firstRound,
      secondRound,
      thirdRound,
      fourthRound,
      { title: 'Playoff round', matches: event.podiumMatches?.playoff?.map((match) => match.teams) || matchPairs(fourthRound.winners), results: event.podiumMatches?.playoff || [] },
      { title: 'Third place match', matches: [event.podiumMatches?.thirdPlace?.teams || fourthRound.winners.slice(0, 2)], results: event.podiumMatches?.thirdPlace ? [event.podiumMatches.thirdPlace] : [] },
      { title: 'Final', matches: [event.podiumMatches?.final?.teams || fourthRound.winners.slice(0, 2)], results: event.podiumMatches?.final ? [event.podiumMatches.final] : [] },
    ];
  }

  const roundOf16 = makePlayedRound(event.teamCount === 32 ? 'Round of 16' : 'Semifinals', firstRound.winners, event, 16);
  const generatedQuarterfinals = makePlayedRound(event.teamCount === 32 ? 'Quarterfinals' : 'Final', roundOf16.winners, event, 24);
  const quarterfinals = event.teamCount === 32 && event.podiumMatches?.quarterfinals
    ? { title: 'Quarterfinals', matches: event.podiumMatches.quarterfinals.map((match) => match.teams), results: event.podiumMatches.quarterfinals, winners: event.podiumMatches.quarterfinals.map((match) => match.teams[match.winner]) }
    : generatedQuarterfinals;
  const generatedSemifinals = makePlayedRound('Semifinals', quarterfinals.winners, event, 28);
  const semifinals = event.teamCount === 32
    ? (event.podiumMatches?.semifinals
      ? { title: 'Semifinals', matches: event.podiumMatches.semifinals.map((match) => match.teams), results: event.podiumMatches.semifinals, winners: event.podiumMatches.semifinals.map((match) => match.teams[match.winner]) }
      : generatedSemifinals)
    : null;
  const finalists = semifinals?.winners || quarterfinals.winners;
  return [
    firstRound,
    roundOf16,
    ...(event.teamCount === 32 ? [quarterfinals, semifinals] : []),
    { title: 'Third place match', matches: [event.podiumMatches?.thirdPlace?.teams || finalists.slice(0, 2)], results: event.podiumMatches?.thirdPlace ? [event.podiumMatches.thirdPlace] : [] },
    { title: 'Final', matches: [event.podiumMatches?.final?.teams || finalists.slice(0, 2)], results: event.podiumMatches?.final ? [event.podiumMatches.final] : [] },
  ];
}

function BracketPanel({ title, matches, results, onSelect }) {
  const splitAt = Math.ceil(matches.length / 2);
  const leftMatches = matches.slice(0, splitAt);
  const rightMatches = matches.slice(splitAt);
  return (
    <section className="bracket-panel">
      <div className="bracket-panel__side">
        <div className="bracket-panel__matches">{leftMatches.map((match, index) => <Match key={index} teams={match} result={results?.[index]} onSelect={onSelect} />)}</div>
      </div>
      <div className="bracket-panel__center">
        <span>{title}</span>
        <img src="/media/download.png" alt="" />
        <strong>Beer Olympics™</strong>
      </div>
      <div className="bracket-panel__side bracket-panel__side--right">
        <div className="bracket-panel__matches">{rightMatches.map((match, index) => <Match key={index} teams={match} result={results?.[index + splitAt]} onSelect={onSelect} />)}</div>
      </div>
    </section>
  );
}

function BracketBoard({ event, onSelect }) {
  const stages = buildBracket(event);
  return (
    <div className="bracket-board-stack" aria-label={event.title + ' tournament bracket'}>
      {stages.map((stage) => <BracketPanel key={stage.title} title={stage.title} matches={stage.matches} results={stage.results} onSelect={onSelect} />)}
      <a className="bracket-winners-button" href={'/halloffame.html#year-' + event.id}>View Winners</a>
    </div>
  );
}

export default function BracketPage() {
  const [activeId, setActiveId] = useState('2025');
  const [selectedMatch, setSelectedMatch] = useState(null);
  const activeEvent = bracketEvents.find((event) => event.id === activeId) || bracketEvents[0];

  useEffect(() => {
    if (!selectedMatch) return undefined;
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setSelectedMatch(null);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [selectedMatch]);

  return (
    <div className="brackets-page">
      <Navbar alwaysScrolled />
      <main>
        <section className="brackets-intro">
          <p>Beer Olympics<sup>™</sup></p>
          <h1>Brackets</h1>
          <span>Choose an edition to view its tournament bracket.</span>
        </section>
        <section className="brackets-events" aria-label="Tournament editions">
          {bracketEvents.map((event) => <button type="button" key={event.id} className={event.id === activeId ? 'is-active' : ''} onClick={() => { setActiveId(event.id); setSelectedMatch(null); }}><EventTitle title={event.title} /></button>)}
        </section>
        <section className="brackets-display">
          <h2><EventTitle title={activeEvent.title} /></h2>
          {activeEvent.teams.length ? <>
            <p className="brackets-display__meta">{activeEvent.teamCount} teams</p>
            <div className="brackets-display__scroll"><BracketBoard event={activeEvent} onSelect={setSelectedMatch} /></div>
          </> : <p className="brackets-display__empty">The Beer Olympics VI bracket will be added when the tournament begins.</p>}
        </section>
      </main>
      <SiteFooter />
      {selectedMatch && <div className="bracket-modal-backdrop" role="presentation" onMouseDown={() => setSelectedMatch(null)}>
        <section className="bracket-modal" role="dialog" aria-modal="true" aria-labelledby="bracket-modal-title" onMouseDown={(event) => event.stopPropagation()}>
          <button className="bracket-modal__close" type="button" aria-label="Close match details" onClick={() => setSelectedMatch(null)}>×</button>
          <h2 id="bracket-modal-title">Match Info</h2>
          <div className="bracket-modal__labels"><span>Winner</span><span>Score</span></div>
          <div className="bracket-modal__teams">
            {selectedMatch.teams.map((team, index) => <div className={'bracket-modal__team' + (selectedMatch.result?.winner === index ? ' bracket-modal__team--winner' : '')} key={team + index}><span className="bracket-modal__team-name">{team}</span><span className="bracket-modal__winner">{selectedMatch.result?.winner === index ? '✓' : ''}</span><strong>{selectedMatch.result?.scores?.[index] ?? '—'}</strong></div>)}
          </div>
          {!selectedMatch.result && <p className="bracket-modal__note">Score not recorded yet.</p>}
        </section>
      </div>}
    </div>
  );
}
