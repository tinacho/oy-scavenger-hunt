/* eslint-disable react/display-name */
import { useQuery } from "@apollo/client";
import Loading from "../components/Loading";
import Error from "../components/Error";

export function withApiData({ query, propMapper = () => ({}), options = {} }) {
  return (Component) => (props) => {
    const { loading, error, ...rest } = useQuery(query, {
      variables: propMapper(props),
      ...options,
    });

    if (loading) {
      return <Loading />;
    }

    // TODO investigate error handling once we have the provider in place
    if (error) {
      return <Error />;
    }

    return <Component {...props} {...rest} />;
  };
}
