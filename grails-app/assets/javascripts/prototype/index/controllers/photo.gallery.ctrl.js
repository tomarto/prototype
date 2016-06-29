//= wrapped

angular
    .module('prototype.index')
    .controller('PhotoGalleryCtrl', PhotoGalleryCtrl)
    .controller('PhotoGalleryModalInstanceCtrl', PhotoGalleryModalInstanceCtrl);

function PhotoGalleryCtrl($uibModal) {
    var vm = this;

    vm.slides = [
        {
            image: '../assets/gallery/foto1-1.jpg',
            active: false,
            id: 0
        },
        {
            image: '../assets/gallery/foto1-2.jpg',
            active: false,
            id: 1
        },
        {
            image: '../assets/gallery/foto1-3.jpg',
            active: false,
            id: 2
        }
    ];

    vm.open = open;

    function open(index) {
        var modalInstance = $uibModal.open({
            templateUrl: '/prototype/index/photo-gallery-content.html',
            controller: 'PhotoGalleryModalInstanceCtrl',
            controllerAs: 'modalInstanceCtrl',
            size: 'lg',
            resolve: {
                slides: function() {
                    return vm.slides;
                },
                index: function () {
                    return index;
                }
            }
        });

        modalInstance.result.then(function() {

        }, function() {

        });
    }
}

function PhotoGalleryModalInstanceCtrl($uibModalInstance, slides, index) {
    var vm = this;

    vm.slides = slides;

    vm.ok = ok;

    init();

    function ok() {
        $uibModalInstance.close();
    }

    function init() {
        angular.forEach(vm.slides, function(value) {
            value.active = value.id === index;
        });
    }
}