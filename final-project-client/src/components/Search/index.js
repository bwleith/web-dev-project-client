import NavigationSidebar from "../NavigationSidebar";

const Search = () => {
    return(
        <div className="row mt-2">
            <div className="col-2 col-md-2 col-lg-1 col-xl-2">
                <NavigationSidebar active="search"/>
            </div>
            <div className="col-10 col-md-10 col-lg-7 col-xl-6">
                Search main content
            </div>
            <div className="d-xs-none d-sm-none d-md-none d-lg-block col-lg-4 col-xl-4">
                Additional content
            </div>
        </div>
    );
};

export default Search;