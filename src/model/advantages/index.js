import Moving from './Moving';
import Physical from './Physical';
import Hit from './Hit';

let createAdvantagesMap = () => {
    let advantages = [];
    advantages.push(
        Moving,
        Physical,
        Hit
    );
    return advantages;
};

export const map = createAdvantagesMap();
