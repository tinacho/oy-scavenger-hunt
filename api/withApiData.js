/* eslint-disable react/display-name */
import { useQuery, useMutation } from "@apollo/client";
import Loading from "../components/Loading";
import Error from "../components/Error";

export function withApiData({ query, propMapper = () => ({}), options = {} }) {
  return (Component) => (props) => {
    const { loading, error, data } = useQuery(query, {
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

    return <Component {...props} data={data} />;
  };
}

export function withApiDataMutation(mutation, actionName) {
  return (Component) => (props) => {
    const [action, { loading, error, data }] = useMutation(mutation);
    const mutationProps = { [actionName]: action, data };

    if (loading) {
      return <Loading />;
    }

    // TODO investigate error handling once we have the provider in place
    if (error) {
      return <Error />;
    }

    return <Component {...props} {...mutationProps} />;
  };
}
