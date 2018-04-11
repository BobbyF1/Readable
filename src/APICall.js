const url = process.env.REACT_APP_BACKEND ?  `${process.env.REACT_APP_BACKEND}` :  'http://localhost:3001' ;
const credentials = process.env.REACT_APP_BACKEND ? 'include' : 'true';

export { url, credentials }
