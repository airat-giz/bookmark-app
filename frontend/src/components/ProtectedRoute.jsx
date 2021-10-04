import { Route, Redirect } from "react-router-dom";
import { useUserContext } from "./contexts/UserContext";

function ProtectedRoute({ Component, ...rest }) {
   
  const {isAuthenticated} = useUserContext()
    
    return (
      <Route {...rest}
        render={(props) => {
          if (isAuthenticated) {
            return <Component {...props} />
        } else { 
            return <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        }} } 
        />
    )
    }

export default ProtectedRoute
