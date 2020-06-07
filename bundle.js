(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
// given a string and a dabatase of strings

NameCorrector = {
     names : [
        "SportsFan42",
        "BestShopperMinneapolis",
        "xXSuperSaiyanXx",
        "CoffeeAddict69",
        "PartyDropper",
        "ILoveMichigan",
        "CatLover",
        "McLovin",
        "KnitRider21",
        "WorldsBestMom",
        "python_dev",
        "Taconaut",
        "BillTheAIGuru",
        "BeerSteinChampion",
        "ArsenalFootball4ever",
        "MuskFan1",
        "TeslaDriver",
        "SmittenKitten",
        "John314"
    ],

    findClosestName : function(input)
    {
        var result = {};
        var bestScore = -100000;
        result.toName = this.names[0];
        for(var i = 0; i < this.names.length; i++)
        {
            var substring = longestCommonSubstring(input.toLowerCase(), this.names[i].toLowerCase());
            if(substring.length > bestScore)
            {
                bestScore = substring.length;
                result.toName = this.names[i];
                result.levenpath = levenshtein(input.toLowerCase(), this.names[i].toLowerCase()).levenpath;
                result.substring = substring;
            }
        }

        return result;
    }
}

// find the string in the database with the smallest levenshtein distance from the input string
// compute the series of string diffs you'd need to go from the input string to the selected string
// animate each diff one at a time
},{}]},{},[1]);
