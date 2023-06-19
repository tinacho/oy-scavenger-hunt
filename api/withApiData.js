/* eslint-disable react/display-name */
import { useQuery } from "@apollo/client";
import Loading from "../components/Loading";
import Error from "../components/Error";

export function withApiData(query, propMapper = () => ({})) {
  return (Component) => (props) => {
    const { loading, error, data } = useQuery(query, {
      variables: propMapper(props),
    });

    if (loading) {
      return <Loading></Loading>;
    }

    // TODO investigate error handling once we have the provider in place
    if (error) {
      return <Error />;
    }

    return <Component {...props} data={data} />;
  };
}
