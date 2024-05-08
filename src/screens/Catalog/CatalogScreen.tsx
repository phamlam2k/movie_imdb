import RootLayout from '../../libs/providers/RootLayout'
import { MediaType } from '../../types/catalog.type'

interface Props {
  type: MediaType | 'search'
}

const CatalogScreen = (props: Props) => {
  return (
    <RootLayout>
      <div>{props.type}</div>
    </RootLayout>
  )
}

export default CatalogScreen
