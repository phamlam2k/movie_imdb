import Footer from "../layout/Footer";
import Header from "../layout/Header";
import Body from "../layout/Body";

const RootProvider: React.FC<{
  children: React.ReactElement;
}> = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
      <Footer />
      <Body/>
    </div>
  );
};

export default RootProvider;
