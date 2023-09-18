import Navbar from './Navbar';
import Footer from './Footer';

const HomeLayout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
};
export default HomeLayout;
