import { FC, useMemo } from 'react';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import {
  clearConstructor,
  selectConstructorBurger
} from '../../services/constructor/slice';
import { fetchOrderBurger } from '../../services/burger/action';
import {
  clearOrderBurger,
  selectOrderBurger,
  selectOrderBurgerIsLoading
} from '../../services/burger/slice';
import { useNavigate } from 'react-router-dom';
import { selectUserData } from '../../services/auth/slice';

export const BurgerConstructor: FC = () => {
  const constructorItems = useSelector(
    selectConstructorBurger
  ).constructorItems;
  const orderRequest = useSelector(selectOrderBurgerIsLoading);
  const orderModalData = useSelector(selectOrderBurger);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectUserData).name;

  const onOrderClick = () => {
    if (!isAuthenticated) {
      navigate('/login');
    }

    const { bun, ingredients } = constructorItems;
    if (!bun) {
      alert('Извини, без булочки никак!');
      return;
    }

    if (ingredients.length === 0) {
      alert('Извини, начинка в бургере обязательна!');
      return;
    }

    const order: string[] = [
      bun._id,
      ...ingredients.map((ingredient) => ingredient._id),
      bun._id
    ];
    dispatch(fetchOrderBurger(order));
  };

  const closeOrderModal = () => {
    navigate('/', { replace: true });
    dispatch(clearOrderBurger());
    dispatch(clearConstructor());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (acc, ingredient) => acc + ingredient.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
