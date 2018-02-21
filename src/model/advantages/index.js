import Moving from './Moving';
import Draw from './Draw';
import Hit from './Hit';
import MovementAxis from './MovementAxis';
import Destroyable from './Destroyable';

let createAdvantagesMap = () => {
    let advantages = [];
    advantages.push(
        Moving,
        Hit,
        Destroyable
        // Draw
        // Hit,
        // MovementAxis,
        // 
    );
    return advantages;
};

export const map = createAdvantagesMap();
