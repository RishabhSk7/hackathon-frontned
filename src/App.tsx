import React from "react";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import UploadPage from "./page/Upload";
import ChatPage from "./page/Chat";

function useHashRoute() {
  const [route, setRoute] = React.useState(window.location.hash.slice(1) || "/");
  React.useEffect(() => {
    const onHash = () => setRoute(window.location.hash.slice(1) || "/");
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  return route;
}

export default function App() {
  const route = useHashRoute();

  let Content = null;
  if (route === "/upload") Content = <UploadPage />;
  else Content = <ChatPage />; // defaults to chat

  return (
    <div className="min-h-screen flex bg-theme-bg">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar />
        <main className="flex-1 overflow-auto">{Content}</main>
      </div>
    </div>
  );
}
