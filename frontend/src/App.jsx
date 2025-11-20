import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import SideBarAdmin from "./components/SideBar-Admin.jsx";
import UploadSong from "./pages/UploadSong.jsx";
import ListSong from "./pages/ListSong.jsx";
import SideBar from "./components/SideBar.jsx";
import Header from "./components/Header.jsx";
import Display from "./components/Display.jsx";

function App() {
  const location = useLocation();
  const adminPath = ["/add-music", "/list-songs"];
  const isAdminPage = adminPath.includes(location.pathname);

  return (
    <>
      <div className="flex relative h-screen">
        {isAdminPage ? (
          <>
            <SideBarAdmin />
            <div className="flex-1 overflow-y-scroll">
              <Routes>
                <Route path="/add-music" element={<UploadSong />} />
                <Route path="/list-songs" element={<ListSong />} />
              </Routes>
            </div>
          </>
        ) : (
          <>
            <SideBar />
            <div className="flex-1 bg-black overflow-y-scroll">
              <Header />
            </div>
            <div className="flex-2 bg-black hidden lg:block p-2">
              <Display />
            </div>
          </>
        )}
      </div>
      ;
    </>
  );
}
export default App;
