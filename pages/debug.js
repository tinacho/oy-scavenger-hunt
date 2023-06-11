// to debug stuff like api calls

import { withApiData } from "../api/withApiData"
import { useMutation } from "@apollo/client"
import { mutations, queries } from "@/api"


function DataView(props) {
  const { data } = props

  console.log(data)
  return <p>{JSON.stringify(data, null, 2)}</p>
}

const Home = withApiData(queries.home)(DataView)
const Team = withApiData(queries.team, props => ({ id: props.id }))(DataView)

function DebugView(props){

  // example for using mutations:
  const [createTeam, { data, loading, error }] = useMutation(mutations.createTeam)

  const onSubmit = async () => {
    try {
      const createdTeam = await createTeam({ 
        variables: {
          data: { 
            name: "Bike Gang",
            members: [{ name: "Tina" }, { name: "Jan" }] 
          }
        }
      })
      console.log(createdTeam)
    } catch (e) {
      console.error(e)
    }
  }

  console.log(props.data)
  return <div>
    <h1>debug view</h1>
    <h2>Home</h2>
    <Home></Home>
    <h2>Team</h2>
    <Team id="366821575551353037"></Team>
  </div>
}

export default DebugView