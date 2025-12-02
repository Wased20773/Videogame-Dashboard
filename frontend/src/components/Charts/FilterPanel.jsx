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
          <option value="Genres">Genres</option>
          <option value="Themes">Themes</option>
          <option value="Game Types">Game Types</option>
          <option value="Languages">Languages</option>
          <option value="Platforms">Platforms</option>
          <option value="Player Perspectives">Player Perspectives</option>
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
