var LobbyClass = /** @class */ (function () {
    function LobbyClass() {
        var lobbyApp = angular.module("lobbyApp", []);
        lobbyApp.controller("lobbyController", [
            "$scope", "$http", function ($scope, $http) {
                $.extend($scope, {
                    //getAllBasket
                    basketGetAll: function () {
                        $.ajax({
                            type: "GET",
                            url: "https://".concat(window.location.host, "/api/Baskets/GetAll"),
                            success: function (response) {
                                $scope.basketProducts = response;
                                $scope.calculateTotal();
                                $scope.$apply();
                            }
                        });
                    },
                    //updateBasket()
                    updateBasket: function (data) {
                        $.ajax({
                            type: "PUT",
                            url: "https://".concat(window.location.host, "/api/Baskets/UpdateBasket"),
                            data: JSON.stringify(data),
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            },
                            dataType: 'json',
                            success: function () {
                            }
                        });
                    },
                    // addToBasket()
                    addToApiBasket: function (data) {
                        $.ajax({
                            type: "POST",
                            url: "https://".concat(window.location.host, "/api/Baskets/AddToBasket"),
                            data: JSON.stringify(data),
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            },
                            dataType: 'json',
                            success: function (response) {
                            }
                        });
                    },
                    addToBasket: function (data, quantity) {
                        var productExistsInBasket = $scope.basketProducts.find(function (bskt) { return bskt.product.id === data.id; });
                        if (productExistsInBasket) {
                            var dto = {
                                price: data.price,
                                productId: data.id,
                                quantity: productExistsInBasket.quantity += quantity
                            };
                            $scope.updateBasket(dto);
                        }
                        else {
                            var dto = {
                                price: data.price,
                                productId: data.id,
                                quantity: quantity
                            };
                            $scope.addToApiBasket(dto);
                        }
                    },
                    increaseBasketQuantity: function (data) {
                        var productExistsInBasket = $scope.basketProducts.find(function (bskt) { return bskt.product.id === data.product.id; });
                        var dto = {
                            price: data.product.price,
                            productId: data.product.id,
                            quantity: productExistsInBasket.quantity += 1
                        };
                        $scope.updateBasket(dto);
                        $scope.calculateTotal();
                    },
                    decreaseBasketQuantity: function (data) {
                        if (data.quantity <= 1)
                            return;
                        var productExistsInBasket = $scope.basketProducts.find(function (bskt) { return bskt.product.id === data.product.id; });
                        var dto = {
                            price: data.product.price,
                            productId: data.product.id,
                            quantity: productExistsInBasket.quantity -= 1
                        };
                        $scope.calculateTotal();
                        $scope.updateBasket(dto);
                    },
                    // deleteProductFromBasket()
                    deleteFromBasket: function (id) {
                        $.ajax({
                            type: "DELETE",
                            url: "https://".concat(window.location.host, "/api/Baskets/DeleteProduct/").concat(id),
                            success: function (response) {
                                $scope.basketGetAll();
                            }
                        });
                    },
                    // getAllCategories()
                    getAllCategories: function () {
                        $.ajax({
                            type: "GET",
                            url: "https://".concat(window.location.host, "/api/Categories/GetAll"),
                            success: function (response) {
                                $scope.categories = response;
                                console.log(response);
                                $scope.$apply();
                            }
                        });
                    },
                    // getAllProducts
                    getAllProducts: function () {
                        $.ajax({
                            type: "GET",
                            url: "https://".concat(window.location.host, "/api/Products/GetAll"),
                            success: function (response) {
                                $scope.products = response;
                                $scope.activeCategoryId = null;
                                $scope.$apply();
                            }
                        });
                    },
                    createFilterParams: function (vegeterian, nuts, spiciness, categoryId) {
                        var obj = {};
                        if (vegeterian == true) {
                            obj.vegeterian = vegeterian;
                        }
                        if (nuts == false) {
                            obj.nuts = nuts;
                        }
                        if (spiciness !== null && spiciness !== -1) {
                            obj.spiciness = spiciness;
                        }
                        if (categoryId !== null) {
                            obj.categoryId = categoryId;
                        }
                        return obj;
                    },
                    // getFilteredProducts()
                    getFilteredProducts: function (vegeterian, nuts, spiciness, categoryId) {
                        var object = $scope.createFilterParams(vegeterian, nuts, spiciness, categoryId);
                        var params = '?' + new URLSearchParams(object).toString();
                        $.ajax({
                            type: "GET",
                            url: "https://".concat(window.location.host, "/api/Products/GetFiltered").concat(params),
                            success: function (response) {
                                $scope.products = response;
                                $scope.$apply();
                            }
                        });
                    },
                    calculateTotal: function () {
                        $scope.basketTotal = 0;
                        $scope.basketProducts.forEach(function (pr) {
                            $scope.basketTotal += (pr.price * pr.quantity);
                        });
                    },
                    filterProducts: function (Id) {
                        if (Id) {
                            $scope.activeCategoryId = Id;
                            $.ajax({
                                type: "GET",
                                url: "https://".concat(window.location.host, "/api/Products/GetFiltered?categoryId=").concat(Id),
                                success: function (response) {
                                    $scope.products = response;
                                    $scope.$apply();
                                }
                            });
                        }
                        else {
                            $scope.getAllProducts();
                        }
                    },
                    applyFilter: function () {
                        $scope.getFilteredProducts($scope.isVegeterianOn, !$scope.isNutsOn, $scope.spicinessCount, $scope.activeCategoryId);
                    },
                    resetFilter: function () {
                        $scope.getAllProducts();
                        $scope.isNutsOn = null;
                        $scope.isVegeterianOn = null;
                        $scope.spicinessCount = -1;
                        $scope.activeCategoryId = null;
                    },
                    init: function () {
                        $scope.getAllProducts();
                        $scope.getAllCategories();
                        $scope.basketGetAll();
                        $scope.isNutsOn = null;
                        $scope.isVegeterianOn = null;
                        $scope.spicinessCount = -1;
                        $scope.activeCategoryId = null;
                    }
                });
            }
        ]);
    }
    return LobbyClass;
}());
(function () {
    var lobby = new LobbyClass();
})();
//# sourceMappingURL=file.js.map