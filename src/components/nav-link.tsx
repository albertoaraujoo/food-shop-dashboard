import { Link, LinkProps, useLocation } from "react-router-dom";

export type NavLinkProps = LinkProps;

export const NavLink = (props: NavLinkProps) => {
  const { pathname } = useLocation();

  return (
    <Link
      data-current={pathname === props.to}
      {...props}
      className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground data-[current=true]:text-foreground"
    />
  );
};
