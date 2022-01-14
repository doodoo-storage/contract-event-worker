import env from 'env-var';
import Caver from 'caver-js';

const ENDPOINT_NODE_URL = env.get('ENDPOINT_NODE_URL').required().asString();

let caver: Caver;
export const getCaver = () => caver ? caver : new Caver(ENDPOINT_NODE_URL);
