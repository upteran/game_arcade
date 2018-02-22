import Moving from './Moving';
import Hit from './Hit';
// import MovementAxis from './MovementAxis';
import Vitality from './Vitality';

let createAdvantagesMap = () => {
    let advantages = [];
    advantages.push(
        Moving,
        Hit,
        Vitality
        // MovementAxis,
    );
    return advantages;
};

export const map = createAdvantagesMap();
