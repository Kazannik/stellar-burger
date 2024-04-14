import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { useDispatch } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import {
  ingredientsMoveUp,
  ingredientsMoveDown,
  ingredientRemove
} from '../../services/constructor/slice';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useDispatch();

    const handleMoveUp = () => {
      dispatch(ingredientsMoveUp(index));
    };

    const handleMoveDown = () => {
      dispatch(ingredientsMoveDown(index));
    };

    const handleClose = () => {
      dispatch(ingredientRemove(ingredient));
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
