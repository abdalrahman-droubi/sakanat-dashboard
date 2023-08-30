import PropTypes from "prop-types";
import { Typography } from "@material-tailwind/react";
import { HeartIcon } from "@heroicons/react/24/solid";

export function Footer({ brandName, brandLink, routes }) {
  const year = new Date().getFullYear();

  return (
    <footer className="bottom-1 py-2">
      <div className="flex w-full flex-wrap items-center justify-end gap-6 px-2 md:justify-end">
        <Typography variant="small" className="font-normal text-inherit">
          All Rights Reserved &copy; {year}, Sakanat .
        </Typography>

      </div>
    </footer>
  );
}

Footer.defaultProps = {
  brandName: "Creative Tim",
  brandLink: "https://www.creative-tim.com",
  routes: [

  ],
};

Footer.propTypes = {
  brandName: PropTypes.string,
  brandLink: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object),
};

Footer.displayName = "/src/widgets/footer.jsx";

export default Footer;
