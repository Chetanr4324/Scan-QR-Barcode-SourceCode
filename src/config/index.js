import {Dimensions} from 'react-native';

export const width = Dimensions.get('screen').width;
export const height = Dimensions.get('screen').height;

const baseWidth = 375;
const baseHeight = 667;

const scaleWidth = width / baseWidth;
const scaleHeight = height / baseHeight;
const scale = Math.min(scaleWidth, scaleHeight);

export const fs = size => Math.ceil(size * scale);
