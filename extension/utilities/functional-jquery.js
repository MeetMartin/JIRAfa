/* eslint-disable capitalized-comments */
// all comments are Hindley-Milner

import {pipe} from "./functional-programming.js";

// find :: String -> JQuery -> JQuery
const find = s => $ => $.find (s);

// toFound :: String -> (a -> b) -> JQuery -> JQuery
const toFound = s => handler => $ => pipe (find (s), handler) ($) && $;

// parent :: JQuery -> JQuery
const parent = $ => $.parent ();

// toParent :: (a -> b) -> JQuery -> JQuery
const toParent = handler => $ => pipe (parent, handler) ($) && $;

// removeMe :: JQuery -> JQuery
const removeMe = $ => $.remove ();

// remove :: String -> JQuery -> JQuery
const remove = s => $ => pipe (find (s), removeMe) ($) && $;

// addClass :: String -> JQuery -> JQuery
const addClass = s => $ => $.addClass (s);

// removeClass :: String -> JQuery -> JQuery
const removeClass = s => $ => $.removeClass (s);

// getAttr :: String -> JQuery -> String
const getAttr = s => $ => $.attr (s);

// setAttr :: String -> String -> JQuery -> JQuery
const setAttr = s => value => $ => $.attr (s, value);

// prependTo :: JQuery -> JQuery -> JQuery
const prependTo = target => $ => $.prependTo (target);

// append :: JQuery -> JQuery -> JQuery
const append = target => $ => $.append (target);

// appendTo :: JQuery -> JQuery -> JQuery
const appendTo = target => $ => $.appendTo (target);

// hide :: JQuery -> JQuery
const hide = $ => $.hide ();

// show :: JQuery -> JQuery
const show = $ => $.show ();

// onClick :: (a -> b) -> JQuery -> JQuery
const onClick = handler => $ => $.click (handler);

export {
    find,
    toFound,
    parent,
    toParent,
    removeMe,
    remove,
    addClass,
    removeClass,
    getAttr,
    setAttr,
    prependTo,
    append,
    appendTo,
    hide,
    show,
    onClick
};