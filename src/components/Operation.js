import { ACTIONS } from "../App";

export default function operation({ dispatch, operation }) {
  return (
    <button
      onClick={() =>
        dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation } }) // Corrected the action type name.
      }
    >
      {operation}
    </button>
  );
}
