import Footer from '../layout/Footer'
import Header from '../layout/Header'

const RootLayout: React.FC<{
  children: React.ReactElement
}> = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  )
}

export default RootLayout
