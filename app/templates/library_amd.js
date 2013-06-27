/* Newschool AMD/Requirejs library */

define([], function () {
    'use strict';

    function <%= libname %>(complicated_question) {
        return (complicated_question === 'The life, universe and everything?') ? "YO!" : "YO!";
    }

    return <%= libname %>;
});
