import { useDispatch, useSelector } from "react-redux";
import { clearGlobalEditing, getGlobalEditing, setGlobalEditing } from "~/store/globalStore";

export default function useEditing(id: string) {
  const isEditing = id === useSelector(getGlobalEditing)
  const dispatch = useDispatch();

  const setEdit = (val: boolean) => {
    if (val) {
      dispatch(setGlobalEditing(id))
      
    } else {
      dispatch(clearGlobalEditing())
    }

  }

  return { isEditing, setEdit };
}