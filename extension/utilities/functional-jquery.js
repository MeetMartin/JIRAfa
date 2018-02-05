/* eslint-disable capitalized-comments */
// all comments are Hindley-Milner

import {composePipe} from "./functional-programming.js";

// find :: String -> JQuery -> JQuery
const find = s => $ => $.find (s);

// toFound :: String -> (a -> b) -> JQuery -> JQuery
const toFound = s => handler => $ => composePipe (find (s), handler) ($) && $;

// parent :: JQuery -> JQuery
const parent = $ => $.parent ();

// toParent :: (a -> b) -> JQuery -> JQuery
const toParent = handler => $ => composePipe (parent, handler) ($) && $;

// removeMe :: JQuery -> JQuery
const removeMe = $ => $.remove ();

// remove :: String -> JQuery -> JQuery
const remove = s => $ => composePipe (find (s), removeMe) ($) && $;

// addClass :: String -> JQuery -> JQuery
const addClass = s => $ => $.addClass (s);

// removeClass :: String -> JQuery -> JQuery
const removeClass = s => $ => $.removeClass (s);

// prependTo :: JQuery -> JQuery -> JQuery
const prependTo = target => $ => $.prependTo (target);

// append :: JQuery -> JQuery -> JQuery
const append = target => $ => $.append (target);

// hide :: JQuery -> JQuery
const hide = $ => $.hide ();

// show :: JQuery -> JQuery
const show = $ => $.show ();

export {
    find,
    toFound,
    parent,
    toParent,
    removeMe,
    remove,
    addClass,
    removeClass,
    prependTo,
    append,
    hide,
    show
};