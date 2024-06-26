import Routes from "./routes/Routes";
import { Provider } from "react-redux";
import store from "./redux/store";
import { BrowserRouter } from "react-router-dom";
import AlertComponent from "components/AlertComponent";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AlertComponent />
        <Routes />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
