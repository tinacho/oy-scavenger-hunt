/* eslint-disable react/display-name */
import { useQuery, gql } from '@apollo/client';

// TODO move to components folder
function Loading() {
  return <div>loading....</div>
}

export function withApiData(query, propMapper = () => ({})) {
  return Component => props => {

    const { loading, error, data } = useQuery(query, {
      variables: propMapper(props),
    });

    if(loading) {
      return <Loading></Loading>
    }

    // TODO investigate error handling once we have the provider in place
    if(error) {
      throw error;
    }

    <Component {...props} data={data}/>

  }
}