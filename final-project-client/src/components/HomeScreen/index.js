import NavigationSidebar from '../NavigationSidebar';

const HomeScreen = () => {
    return (
        <div className="row mt-2">
            <div className="col-2 col-md-4 col-lg-3 col-xl-2">
                <NavigationSidebar active="home"/>
            </div>
            <div className="col-10 col-md-8 col-lg-5 col-xl-6">
                Main content
            </div>
            <div className="d-xs-none d-sm-none d-md-none d-lg-block col-lg-4 col-xl-4">
                Additional content
            </div>
        </div>
    );
};
export default HomeScreen;