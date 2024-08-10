import { useSetRecoilState } from "recoil";
import { tokenAtom } from "../../store/atoms/todo.atom";

export const updateToken = (token) => {
  const setToken = useSetRecoilState(tokenAtom);
  token && setToken(token);
}