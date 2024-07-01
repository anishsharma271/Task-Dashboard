import { lazy, Suspense } from "react"
const ToastContainerPopup = lazy(() => import('./utility/toastify/toastContainer'));
import CircularProgress from '@mui/material/CircularProgress';
import './App.css'
const Layout = lazy(() => import("./layout/layout"));
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"

function App() {
  return (
    <Suspense fallback={<div style={{
      display: "grid", justifyContent: "center", placeItems: "center", position: "absolute", left: "50%",
      top: "50%"
    }}><CircularProgress style={{ color: "#1976d2" }} /></div>}>
      <ToastContainerPopup />
      <Layout />
    </Suspense>
  )
}

export default App
