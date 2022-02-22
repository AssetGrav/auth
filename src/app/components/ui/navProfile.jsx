import React, { useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useAuth } from "../../hooks/useAuth";

const NavProfile = () => {
    const { currentUser } = useAuth();
    const [isOpen, setOpen] = useState(false);
    const toggleMenu = () => {
        setOpen((prevState) => !prevState);
    };
    return (
        <div className="dropdown" onClick={toggleMenu}>
            <div className="btn dropdown-toggle d-flex align-items-center">
                <div className="me-2">{currentUser.name}</div>
                <img
                    src={currentUser.image}
                    className="rounded-circle shadow-1-strong me-3"
                    alt="avatar"
                    height="40"
                />
                <div className={"w-100 dropdown-menu" + (isOpen ? " show" : "")}>
                    <Link
                        to={`/users/${currentUser._id}`}
                        className="dropdown-item"
                    >
                        Profile
                    </Link>
                    <Link to="/logout" className="dropdown-item">
                        Logout
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NavProfile;
