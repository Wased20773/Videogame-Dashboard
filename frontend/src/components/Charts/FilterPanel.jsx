const FilterPanel = ({
  selectedTag,
  setSelectedTag,
  displayOption,
  setDisplayOption,
}) => {
  return (
    <div className="chart-options">
      <div className="options">
        <label htmlFor="tags">Tags</label>
        <select
          value={selectedTag}
          onChange={(e) => setSelectedTag(e.target.value)}
        >
          <option value="genres">Genres</option>
          <option value="themes">Themes</option>
          <option value="game_types">Game Types</option>
          <option value="languages">Languages</option>
          <option value="platforms">Platforms</option>
          <option value="player_perspectives">Player Perspectives</option>
        </select>
      </div>

      <div className="options">
        <label htmlFor="options">Display All Data</label>
        <select
          value={displayOption}
          onChange={(e) => setDisplayOption(e.target.value)}
        >
          <option value="no">No</option>
          <option value="yes">Yes</option>
        </select>
      </div>
    </div>
  );
};

export default FilterPanel;
