import { useDispatch, useSelector } from 'react-redux'
import { addInventory } from '../actions/inventory'

const useInventory = () => {
    const dispatch = useDispatch();
    const { message, fetching } = useSelector((state: any) => state.inventory)
    const addInventoryFunc = (productId: string, stock: string) => dispatch(addInventory(productId, stock))

    return {
        message,
        fetching,
        addInventoryFunc
    }
}

export default useInventory