import { useLocation, Navigate, Outlet } from "react-router-dom"
import ClientApp from '../../apps/client/ClientApp.js';
import PubliApp from '../../apps/public/PublicApp.js';
import useAuth from "../../hooks/useAuth"

const RequireAuth = ({ allowedRoles }) => {
  const location = useLocation()
  const { roles } = useAuth()
  //console.log(roles);

  let content;
 
  if(roles.some(role => allowedRoles.includes('client'))){
    content = <ClientApp />
  }
  else {
    content = <PubliApp/>
  }

  content = <Outlet />

  return content
}
export default RequireAuth
