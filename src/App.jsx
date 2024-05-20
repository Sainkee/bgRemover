import HeroSection from "./components/HeroSection";
import {ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <HeroSection />
      <Footer />
      <ToastContainer />
    </>
    
  );
}

export default App;
