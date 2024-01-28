import { BiAtom } from "react-icons/bi";
import { GrAddCircle } from "react-icons/gr";
import { Link } from "react-router-dom";
import { IoReceiptOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { TbScan } from "react-icons/tb";
import Logo from "./Memo logo.png";



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
            <div className="flex flex-col gap-4 align-middle">
                <a href="https://github.com/martindmhe/McHacksApp" target="_blank">
                    <img src={Logo} width={80} className="opacity-60 hover:opacity-100 transition duration-150"/>
                </a>
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