(function () {



  angular.module('agera').controller('GridCtrl', function ($scope, $http, ENV, $sce) {
    var usdFormatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    });

    $scope.data = {};
    $scope.currentYear = 0;

    $scope.actionUrl = $sce.trustAsResourceUrl(ENV.apiHost + '/Scenario');
    init();

    //////////////////////////////////////////////////////
    function init() {



      $scope.gridOpts = {
        enableColResize: true
      };






      $http.get(ENV.apiHost + '/Scenario/1').
      success(function (results) {
        var ds = JSON.parse(results);//.GoalRules;
        $scope.data = ds
        var eGridDiv = document.querySelector('#grid1');

        loadData();
        new agGrid.Grid(eGridDiv, $scope.gridOpts);



      });
    }

    //////////////////////////////////////////////////////
    function loadData() {

      //$scope.gridOpts.data = {};
      $scope.gridOpts.columnDefs = [];

      for (var prop in $scope.data[0]) {

        if (prop == "GoalName")
          //Goal Name data
          $scope.gridOpts.columnDefs.push({ headerName: prop, field: prop, width: 250, pinned: 'left' });
        else if (prop == "StretchStage")
          //Goal Name data
          $scope.gridOpts.columnDefs.push({ headerName: prop, field: prop, width: 125, cellStyle: { 'text-align': 'right' } });
        else
          $scope.gridOpts.columnDefs.push({ headerName: prop, field: prop, width: 125, cellRenderer: actualCurrencyCellRenderer, cellStyle: { 'text-align': 'right' } });




      }

      $scope.gridOpts.rowData = $scope.data;

    }

    function actualCurrencyCellRenderer(params) {
      if (params.value == true) return params.value;
      if (params.value == false) return params.value;
      if (params.value == null) return "";

      if (!isNaN(params.value)) {
        if ((typeof params.value) == "string" && params.value.indexOf(".") == -1)
          return params.value;
        else
          return usdFormatter.format(params.value);
      }


      return params.value;
    }

    function isInteger(x) {
      return x % 1 === 0;
    }


  });

  angular.module('agera').controller('ActionCtrl', function ($scope, $http, ENV) {

    $scope.actionsByGoal = [];
    $scope.monthsToAdd = -1;

    $scope.$watch('monthsToAdd', function (newValue, oldValue) {
      if (newValue == -1) return;

      $scope.actionsByGoal = [];
      getActions();
    });


    $scope.getActions = function () {
      getActions();
    }


    function getActions() {

      var _monthsToAdd = 0;
      if ($scope.monthsToAdd == -1) {
        _monthsToAdd = $("#txtMonthsToAdd").val();
      }
      else {
        _monthsToAdd = $scope.monthsToAdd;
      }


      $http.get(ENV.apiHost + '/Scenario/Actions/' + _monthsToAdd, { cache: false }).
      success(function (results) {

        //$scope.grdActionsOpts.api.setRowData(results);
        $scope.actionsByGoal = results;

      });

    }
  });

}).call(this);



$(document).on("click", "#btnShowActions", function () {

  var monthsToAdd = $(this).data('id');
  $("#txtMonthsToAdd").val(monthsToAdd);
  $("#txtMonthsToAdd").trigger("change");

  var caption = $(this).data('caption');
  $("#txtCaption").val(caption);
  $("#txtCaption").trigger("change");
});




