import {pathOr} from 'ramda';

export default <T = any>(data: T): string =>
    pathOr('', ['graphQLErrors', 0, 'message'], data) ||
    pathOr('', ['errors', 0, 'message'], data);
