//= wrapped

angular
    .module('prototype.index')
    .controller('ActionCtrl', ActionCtrl);

function ActionCtrl($state, $sessionStorage, $stateParams, result, toasterService) {
    var vm = this;

    vm.data = {};
    vm.dateCreatedPopup = {
        opened: false,
        dateOptions: {
            maxDate: new Date()
        }
    };
    vm.dueDatePopup = {
        opened: false
    };
    vm.rows = [10, 25, 50, 100];
    vm.data.rows = vm.rows[1];
    vm.data.offset = 0;

    vm.openDatepicker = openDatepicker;
    vm.search = search;
    vm.changeOffset = changeOffset;
    vm.getNumber = getNumber;

    init();

    function init() {
        if ($sessionStorage.loggedUser) {
            if (result.errorMessage) {
                toasterService.error(result.errorMessage);
                return;
            }
            if ($sessionStorage[$stateParams.searchId]) {
                vm.data = retrieveData();
            }
            vm.actions = result.actions;
            vm.totalResults = result.total;
            vm.totalPages = Math.ceil(result.total / vm.data.rows);
        } else {
            $state.go('home', {}, {location: 'replace'});
        }
    }

    function openDatepicker(datePicker) {
        vm[datePicker].opened = true;
    }

    function search(searchActionsForm) {
        if (searchActionsForm.$dirty && searchActionsForm.$valid) {
            vm.data.rows = vm.data.rows ? vm.data.rows : null;
            vm.data.offset = 0;
            var newSearchId = Date.now().toString();
            $sessionStorage[newSearchId] = vm.data;
            $state.go('actions', {searchId: newSearchId});
        }
    }

    function retrieveData() {
        return angular.copy($sessionStorage[$stateParams.searchId]);
    }

    function changeOffset(offset) {
        vm.data = retrieveData();
        vm.data.offset = offset * vm.data.rows;
        var newSearchId = Date.now().toString();
        $sessionStorage[newSearchId] = vm.data;
        $state.go('actions', {searchId: newSearchId});
    }

    function getNumber(num) {
        return new Array(num);
    }
}
