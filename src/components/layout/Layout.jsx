import Navbar from "../navigation/Navbar";

const Layout = ({ children }) => (
  <div>
    <Navbar />
    {children}
  </div>
);

export default Layout;
