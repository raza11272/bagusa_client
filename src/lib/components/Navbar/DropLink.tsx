import { setOpen } from "@/lib/redux/reducers/navbarSlice";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { DropdownMenuRadioItem } from "@/components/ui/dropdown-menu";



type NavbarProps = {
    name: String;
    path: String;
};

const DropLink = ({ name, path }: NavbarProps) => {
    const dispatch = useDispatch();

    return (
        <NavLink
            //@ts-ignore
            to={path}
            onClick={() => dispatch(setOpen())}
            className={`capitalize font-semibold hover:text-primary   ${({
                //@ts-ignore
                isActive,
            }) => (isActive ? "active" : "")} `}
        >
             {/* @ts-ignore */}
            <DropdownMenuRadioItem className="list-none">
                {name}
            </DropdownMenuRadioItem>
        </NavLink>
    );
};

export default DropLink;
