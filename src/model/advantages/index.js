import Advantage from './Advantage';
import MovingAxis from './MovingAxis';


let createAdvantagesMap = () => {
    let advantages = [];
    advantages.push(
        Advantage,
        MovingAxis
    );
    return advantages;
};

export const map = createAdvantagesMap();