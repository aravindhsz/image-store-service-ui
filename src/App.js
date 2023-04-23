import "./App.css";
import Home from "./components/home/Home";
import Navbar from "./components/navbar/Navbar";
import Album from "./components/album/Album";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Route, Routes } from "react-router-dom";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Navbar />
      <Routes>
        <Route path="/home" exact element={<Home/>} />
        <Route path="/" element={<Home/>}/>
        <Route path="/album/:id" exact element={<Album/>} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
