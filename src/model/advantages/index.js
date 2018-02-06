import Moving from './Moving';
import Draw from './Draw';
import Hit from './Hit';
import MovementAxis from './MovementAxis';
import Destroyable from './Destroyable';

let createAdvantagesMap = () => {
    let advantages = [];
    advantages.push(
        Moving,
        Draw,
        Hit,
        MovementAxis,
        Destroyable
    );
    return advantages;
};

export const map = createAdvantagesMap();
