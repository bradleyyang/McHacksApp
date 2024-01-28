import { BiAtom } from "react-icons/bi";

const NavbarIcon = ({ icon }) => {
    <div className="sidebar-icon">
        {icon}
    </div>
}

const Navbar = () => {
    return ( 
        <div className="fixed h-screen top-0 left-0 w-48 m-0 
        flex flex-col
        bg-gray-900 text-white shadow-lg">
            <NavbarIcon icon={<BiAtom size={56}/>} />
            <NavbarIcon icon={BiAtom} />
            <NavbarIcon icon={BiAtom} />
        </div>
     );
}


 
export default Navbar;