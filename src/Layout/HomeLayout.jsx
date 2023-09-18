import Navbar from '../Components/Layout/Navbar';
import Footer from '../Components/Layout/Footer';

const Layout = ({children}) => {
  return (
    <div>
      <Navbar />
      <main style={{minHeight:"100vh", background:"red", width:"100vw"}}>{children}</main>
      <Footer />
    </div>
  );
};
export default Layout;
