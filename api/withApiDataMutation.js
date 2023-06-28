/* eslint-disable react/display-name */
import { useMutation } from "@apollo/client";
import Loading from "../components/Loading";
import Error from "../components/Error";

export function withApiDataMutation(mutation, actionName) {
  return (Component) => (props) => {
    const [action, { loading, error, data }] = useMutation(mutation);
    const mutationProps = { [actionName]: action, data };

    if (loading) {
      return <Loading />;
    }

    if (error) {
      return <Error />;
    }

    return <Component {...props} {...mutationProps} />;
  };
}
