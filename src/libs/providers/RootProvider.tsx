import Footer from "../layout/Footer";
import Header from "../layout/Header";

const RootProvider: React.FC<{
  children: React.ReactElement;
}> = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default RootProvider;
