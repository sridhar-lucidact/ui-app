import { isEmpty } from 'lodash';

/**
 * Check if the provided value is empty
 * @param value
 * @returns {boolean}
 */
export const isValueEmpty = (value: any): boolean => isEmpty(value);
