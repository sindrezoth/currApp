import EditClientForm from './EditClientForm'
import { useGetClientsQuery } from './clientsApiSlice'
import PulseLoader from 'react-spinners/PulseLoader'
import useTitle from '../../hooks/useTitle'

const EditClient = () => {
  useTitle('techNotes: Edit Client')

  const { id } = useParams()

  const { client } = useGetClientsQuery("clientsList", {
    selectFromResult: ({ data }) => ({
      client: data?.entities[id]
    }),
  })

  if (!client) return <PulseLoader color={"#FFF"} />

  const content = <EditClientForm client={client} />

  return content
}
export default EditClient
