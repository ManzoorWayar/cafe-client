import { store } from "../../api/store";
import { Outlet } from "react-router-dom";
// import { pcApiSlice } from "../home/pcApiSlice";

const Prefetch = () => {
  // store.dispatch(pcApiSlice.util.prefetch('getPcs', 'pcList', { force: true }))

  return <Outlet />;
};

export default Prefetch;
