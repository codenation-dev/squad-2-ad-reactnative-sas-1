import {Dimensions} from 'react-native';

export const fullWitdh = Dimensions.get('window').width;

export const PaddingPages = 20;
export const paddingHeader = '20px 20px 20px';

export const sizeAjust = PaddingPages * 2;

export const InputSizes = {
  width: `${fullWitdh - sizeAjust}px`,
  borderRadius: `${fullWitdh - sizeAjust / 2}px`,
};

export const search = {
  height: '44px',
};
