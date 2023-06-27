/* eslint-disable react/display-name */
import { useRouter } from "next/router";

export function withRouter(Component) {
  return (props) => {
    const router = useRouter();
    return <Component {...props} router={router} />;
  };
}
