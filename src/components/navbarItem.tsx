interface NavbarItemProps {
    render: boolean;
    onClick?: () => void;
    href: string;
    label: string;
}

function NavbarItem(props: NavbarItemProps) {
    if (props.render) {
        return (
            <li className="nav-item">
                <a onClick={props.onClick} className="nav-link" href={props.href}>
                    {props.label}
                </a>
            </li>
        );
    } else {
        return null;
    }
}

export default NavbarItem;