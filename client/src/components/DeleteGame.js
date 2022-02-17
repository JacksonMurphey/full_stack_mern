import { navigate } from "@reach/router"
import axios from "axios"

const DeleteGame = (props) => {

    const { id, gameList, setGameList } = props

    const deleteFilter = id => {
        const newGameList = gameList.filter((game, index) => game._id != id)
        setGameList(newGameList)
    }

    const deleteHandler = e => {
        axios.delete(`http://localhost:8000/api/games/${id}`)
            .then(res => {
                console.log(res.data)
                if (gameList) {
                    deleteFilter(id)
                } else {
                    navigate('/')
                }
            })
            .catch(err => console.log(err))
    }

    return (
        <div>
            <button onClick={deleteHandler}>Delete</button>
        </div>
    )
}
export default DeleteGame;