import Navbar from './Navbar';
import Footer from './Footer';
import Input from '../Input';

const HomeLayout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <Input />
      <main>{children}</main>
      <Footer />
    </div>
  );
};
export default HomeLayout;
