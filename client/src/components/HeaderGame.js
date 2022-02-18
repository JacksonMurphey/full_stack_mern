import { Link } from "@reach/router"

const HeaderGame = (props) => {

    const { title, linkRoute, linkName } = props

    return (
        <header>
            <h1>{title}</h1>
            <Link to={linkRoute}><button>{linkName}</button></Link>
        </header>
    )
}
export default HeaderGame;    