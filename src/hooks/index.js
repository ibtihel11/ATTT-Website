// hooks/useAsync.js
import { useState, useCallback } from 'react';

export function useAsync(asyncFn) {
  const [state, setState] = useState({ loading: false, error: null, data: null });

  const execute = useCallback(async (...args) => {
    setState({ loading: true, error: null, data: null });
    try {
      const data = await asyncFn(...args);
      setState({ loading: false, error: null, data });
      return data;
    } catch (err) {
      setState({ loading: false, error: err.message || 'Une erreur est survenue', data: null });
      throw err;
    }
  }, [asyncFn]);

  return { ...state, execute };
}

// hooks/useReservation.js
import { useReducer } from 'react';

const initialState = {
  step: 1,
  vehicle: null,
  ville: null,
  centre: null,
  date: null,
  slot: null,
  paymentMethod: 'card',
  reservation: null,
  payment: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_VEHICLE': return { ...state, vehicle: action.payload, step: 2 };
    case 'SET_SCHEDULE': return { ...state, ...action.payload, step: 3 };
    case 'SET_PAYMENT_METHOD': return { ...state, paymentMethod: action.payload };
    case 'SET_RESERVATION': return { ...state, reservation: action.payload, step: 4 };
    case 'SET_PAYMENT': return { ...state, payment: action.payload, step: 5 };
    case 'GO_STEP': return { ...state, step: action.payload };
    case 'RESET': return initialState;
    default: return state;
  }
}

export function useReservation() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return { state, dispatch };
}
