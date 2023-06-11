/* eslint-disable react/display-name */
import { useQuery } from '@apollo/client';
import Loading from '../components/Loading';

export function withApiData(query, propMapper = () => ({})) {
  return Component => props => {

    const { loading, error, data } = useQuery(query, {
      variables: propMapper(props),
    });

    console.log({loading, error, data})

    if(loading) {
      return <Loading></Loading>
    }

    // TODO investigate error handling once we have the provider in place
    if(error) {
      throw error;
    }

    return <Component {...props} data={data}/>

  }
}