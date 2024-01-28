import { BiAtom } from "react-icons/bi";
import { GrAddCircle } from "react-icons/gr";
import { Link } from "react-router-dom";

const NavbarIcon = ({ icon }) => {
    return (
        <div className="sidebar-icon">
            {icon}
        </div>
    );

}

const Navbar = () => {
    return (
        <div className="h-screen w-52 m-0 
        flex flex-col
        bg-gray-900 text-white shadow-lg">
            <NavbarIcon icon={<BiAtom size={108} />} />
            <Link to="/upload">
                <NavbarIcon icon={<GrAddCircle size={108} />} />
            </Link>

            <NavbarIcon icon={BiAtom} />
        </div>
    );
}



export default Navbar;