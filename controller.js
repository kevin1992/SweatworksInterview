angular.module('test', [])
    .service('Utils', function () {

        this.range = function (min, max) {
            var arr = [];

            if (min == null || max == null)
                return arr;

            if (min > max)
                return arr;


            for (i = min; i <= max; i++)
                arr.push(i);

            return arr;
        }

    })
    .factory('Filter',function(){
        var filter = {};

        filter.condition = function(elem){
            return true;
        }
        filter.filter = function(array) {
            var self=this;
            return array.filter(function (elem) {
                return self.condition(elem);
            })
        }

        return filter;
    })
    .factory('OddFilter',['Filter',function(Filter){
        var filter = angular.extend(this,Filter);
        filter.condition = function(elem){
            return elem %2 == 1;
        }
        return filter;
    }])
    .factory('EvenFilter',['Filter',function(Filter){
        var filter = angular.extend(this,Filter);
        filter.condition = function(elem){
            return elem %2 == 0;
        }
        return filter;
    }])
    .directive('numberList', ['Utils', function (Utils) {
        var directive = {};

        directive.restrict = 'E';

        directive.template = '<p ng-repeat="number in showNumberList()">{{number}} </p>';

        directive.scope = {
            min: "=min",
            max: "=max",
            filter: "=filter"
        }

        directive.link = function (scope, elem, attrs) {
            scope.showNumberList = function () {
                var numbers = Utils.range(this.min, this.max);
                if(typeof(scope.filter)=="undefined" || scope.filter == null)
                    return numbers;
                return scope.filter.filter(numbers);
            }
        }
        return directive;
    }])
    .controller('testController', ['$scope','Filter','EvenFilter','OddFilter', function ($scope, Filter,EvenFilter,OddFilter) {

        $scope.data = {
            minNumber: null,
            maxNumber: null,
            filter: null,
            class:'left'
        }

        $scope.setOdd = function () {
            $scope.data.filter = OddFilter;
        }


        $scope.setEven = function () {
            $scope.data.filter = EvenFilter;
        }

        $scope.setAll=function(){
            $scope.data.filter=Filter;
        }
        $scope.setLeft=function(){
            $scope.data.class='left'
        }
        $scope.setRight=function(){
            $scope.data.class='right'
        }

    }]);

