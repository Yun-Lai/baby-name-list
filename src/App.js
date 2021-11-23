import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { initDB } from "react-indexed-db";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store from "./redux/store";
import persistor from "./redux/persistStore";
import DragTable from './components/draggable/container';

import { DBConfig } from "./config/DBConfig";

import "./App.css";

import AddBaby from "./components/addBaby";

initDB(DBConfig);

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <DndProvider backend={HTML5Backend}>
          <div className="App">
            <h1>Baby List </h1>
            <AddBaby />
            <DragTable />
          </div>
          <ToastContainer hideProgressBar={true}/>
        </DndProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
