/**
 * Your favorite functional compose f(g(x)), but it is piped so you can right it from left
 * @param {function} fns functions to be composed
 * @returns {*|(function(...[*]): *)} composed functions
 */
const composePipe = (...fns) => fns.reduceRight ((f, g) => (...args) => f (g (...args)));

export {
    composePipe
};