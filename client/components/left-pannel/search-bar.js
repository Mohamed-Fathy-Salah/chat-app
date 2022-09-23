const SearchBar = () => {
  return (
    <div className="row searchBox">
      <div className="col-sm-12 searchBox-inner">
        <div className="form-group has-feedback">
          <input
            id="searchText"
            type="text"
            className="form-control"
            name="searchText"
            placeholder="Search"
          />
          <span className="glyphicon glyphicon-search form-control-feedback" />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
