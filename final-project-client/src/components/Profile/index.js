import NavigationSidebar from "../NavigationSidebar";

const Profile = () => {
    return(
        <div className="row mt-2">
            <div className="col-2 col-md-4 col-lg-3 col-xl-2">
                <NavigationSidebar active="profile"/>
            </div>
            <div className="col-10 col-md-8 col-lg-9 col-xl-10">
                Profile main content
            </div>
        </div>
    );
};

export default Profile;