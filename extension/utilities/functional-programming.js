/**
 * Your favorite functional compose f(g(x)), but it is piped so you can right it from left
 * @param {function} fns functions to be composed
 * @returns {function} composePipe :: [(a -> b)] -> (a -> b)
 */
const pipe = (...fns) => fns.reduceRight ((f, g) => (...args) => f (g (...args)));

/**
 * Identity
 * @param {x} x anything
 * @returns {*} id :: a -> a
 */
const id = x => x;

export {
    pipe,
    id
};