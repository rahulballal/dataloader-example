"use strict";
exports.__esModule = true;
var faker = require("faker");
var CATEGORIES = ['work', 'personal', 'family', 'no-good'];
var TODO_COUNT = 10;
var MAX_CATEGORY_COUNT = 3;
var makeCategories = function (count) {
    var cats = [];
    for (var c = 0; c < count; c++) {
        cats.push({ id: faker.random.uuid().toString(), name: CATEGORIES[c] });
    }
    return cats;
};
var makeTodos = function () {
    var data = [];
    for (var i = 0; i < TODO_COUNT; i++) {
        var seed = {
            id: faker.random.uuid().toString(),
            title: faker.lorem.lines(1),
            categories: makeCategories(faker.random.number(MAX_CATEGORY_COUNT))
        };
        data.push(seed);
    }
    return data;
};
console.log(JSON.stringify(makeTodos(), null, 2));
