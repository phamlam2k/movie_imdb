import { MediaType } from "../../type"
interface Props {
    type: MediaType | 'search'
}

export const Catalog = (props: Props) => {
    return <div> {props.type}</div>
}