import PropTypes from "prop-types";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedRoutes = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, []);
  return <>{children}</>;
};

export default ProtectedRoutes;
ProtectedRoutes.propTypes = {
  children: PropTypes.node,
};
