import { BiAtom } from "react-icons/bi";
import { GrAddCircle } from "react-icons/gr";
import { Link } from "react-router-dom";
import { IoReceiptOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { TbScan } from "react-icons/tb";




const NavbarIcon = ({ icon }) => {
    return (
        <div className="sidebar-icon">
            {icon}
        </div>
    );

}

const Navbar = () => {
    return (
        <div className="h-screen w-56 m-0 
        flex flex-col
        bg-gray-900 text-white shadow-lg justify-center items-center" >
            <div className="flex flex-col gap-4">
                <Link to="/">
                    <NavbarIcon icon={<IoReceiptOutline size={108} />} />
                </Link>
                <Link to="/upload">
                    <NavbarIcon icon={<TbScan size={108} />} />
                </Link>

                <NavbarIcon icon={<CgProfile size={108} />} />
            </div>
        </div>
    );
}



export default Navbar;