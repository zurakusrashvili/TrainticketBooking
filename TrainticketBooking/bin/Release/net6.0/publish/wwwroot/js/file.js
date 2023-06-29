class LobbyClass {
    constructor() {
        let lobbyApp = angular.module("lobbyApp", ['ui.bootstrap']);
        lobbyApp.controller("lobbyController", [
            "$scope", "$http", ($scope, $http) => {
                $.extend($scope, {
                    //getAllBasket
                    // addToBasket()
                    //addToApiBasket(data: BasketPostDto) {
                    //    $.ajax({
                    //        type: "POST",
                    //        url: `https://${window.location.host}/api/Baskets/AddToBasket`,
                    //        data: JSON.stringify(data),
                    //        headers: {
                    //            'Accept': 'application/json',
                    //            'Content-Type': 'application/json'
                    //        },
                    //        dataType: 'json',
                    //        success: function (response) {
                    //        }
                    //    });
                    //},
                    //createFilterParams(roomTypeId?: boolean, priceFrom?: number, priceTo?: number, guestsCount?: number, checkIn?: string, checkOut?: string) {
                    //    let obj: any = {
                    //    }
                    //    if (vegeterian == true) {
                    //        obj.vegeterian = vegeterian;
                    //    }
                    //    if (nuts == false) {
                    //        obj.nuts = nuts;
                    //    }
                    //    if (spiciness !== null && spiciness !== -1) {
                    //        obj.spiciness = spiciness
                    //    }
                    //    if (categoryId !== null) {
                    //        obj.categoryId = categoryId;
                    //    }
                    //    return obj;
                    //},
                    // getFilteredProducts()
                    //getFilteredProducts(vegeterian?: boolean, nuts?: boolean, spiciness?: number, categoryId?: number) {
                    //    let object = $scope.createFilterParams(vegeterian, nuts, spiciness, categoryId)
                    //    const params = '?' + new URLSearchParams(object).toString();
                    //    $.ajax({
                    //        type: "GET",
                    //        url: `https://${window.location.host}/api/Products/GetFiltered${params}`,
                    //        success: function (response) {
                    //            $scope.products = response;
                    //            $scope.$apply();
                    //        }
                    //    });
                    //},
                    //filterProducts(Id: number) {
                    //    if (Id) {
                    //        $scope.activeCategoryId = Id;
                    //        $.ajax({
                    //            type: "GET",
                    //            url: `https://${window.location.host}/api/Products/GetFiltered?categoryId=${Id}`,
                    //            success: function (response) {
                    //                $scope.products = response;
                    //                $scope.$apply()
                    //            }
                    //        });
                    //    } else {
                    //        $scope.getAllProducts()
                    //    }
                    //},
                    hotelsGetAll() {
                        $.ajax({
                            type: "GET",
                            url: `https://${window.location.host}/api/Hotels/GetAll`,
                            success: function (response) {
                                $scope.hotels = response;
                                $scope.getCities();
                                console.log($scope.hotels);
                            }
                        });
                    },
                    getRoomImageWithId(roomId) {
                        var image = $scope.Rooms.find((r) => {
                            return r.id == roomId;
                        }).images[0];
                        return image.source;
                    },
                    getRoomDataForBooking(roomId) {
                        var room = $scope.Rooms.find((r) => {
                            return r.id == roomId;
                        });
                        console.log(room);
                        return room;
                    },
                    getHotelDataForBooking(roomId) {
                        var room = $scope.Rooms.find((h) => {
                            return h.id == roomId;
                        });
                        var hotel = $scope.hotels.find((h) => {
                            return h.id == room.hotelId;
                        });
                        return hotel;
                    },
                    cencelBooking(id) {
                        $.ajax({
                            type: "DELETE",
                            url: `https://${window.location.host}/api/Booking/${id}`,
                            success: function (response) {
                                alert(response);
                                $scope.getBookedRooms();
                                $scope.$apply();
                            }
                        });
                    },
                    getHotelById(id) {
                        $.ajax({
                            type: "GET",
                            url: `https://${window.location.host}/api/Hotels/GetHotel/${id}`,
                            success: function (response) {
                                $scope.filteredRooms = response.rooms;
                                $scope.$apply();
                            }
                        });
                    },
                    getHotelByCity(city) {
                        var link;
                        if (city) {
                            link = `https://${window.location.host}/api/Hotels/GetHotels?city=${city}`;
                        }
                        else {
                            link = `https://${window.location.host}/api/Hotels/GetAll`;
                        }
                        $.ajax({
                            type: "GET",
                            url: link,
                            success: function (response) {
                                $scope.hotels = response;
                                $scope.$apply();
                            }
                        });
                    },
                    getCities() {
                        $.ajax({
                            type: "GET",
                            url: `https://${window.location.host}/api/Hotels/GetCities`,
                            success: function (response) {
                                $scope.cities = response;
                                $scope.$apply();
                            }
                        });
                    },
                    getAllRooms() {
                        $.ajax({
                            type: "GET",
                            url: `https://${window.location.host}/api/Rooms/GetAll`,
                            success: function (response) {
                                $scope.Rooms = response;
                                $scope.$apply();
                            }
                        });
                    },
                    getRoomById(id) {
                        $.ajax({
                            type: "GET",
                            url: `https://${window.location.host}/api/Rooms/GetRoom/${id}`,
                            success: function (response) {
                                console.log(response);
                            }
                        });
                    },
                    getAvailableRooms(dateFrom, dateTo) {
                        $.ajax({
                            type: "GET",
                            url: `https://${window.location.host}/api/Rooms/GetAvailableRooms?from=${dateFrom}&to=${dateTo}`,
                            success: function (response) {
                                console.log(response);
                            }
                        });
                    },
                    getRoomTypes() {
                        $.ajax({
                            type: "GET",
                            url: `https://${window.location.host}/api/Rooms/GetRoomTypes`,
                            success: function (response) {
                                console.log(response);
                                $scope.roomTypes = response;
                                $scope.$apply();
                            }
                        });
                    },
                    getFilteredRooms(filter) {
                        $.ajax({
                            type: "POST",
                            url: `https://${window.location.host}/api/Rooms/GetFiltered`,
                            data: JSON.stringify(filter),
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            },
                            dataType: 'json',
                            success: function (response) {
                                $scope.filteredRooms = response;
                                console.log($scope.filteredRooms);
                                $scope.$apply();
                            }
                        });
                    },
                    filterByRoomType(id) {
                        var link;
                        var filter = {};
                        if (id) {
                            filter.roomTypeId = id;
                        }
                        $.ajax({
                            type: "POST",
                            url: `https://${window.location.host}/api/Rooms/GetFiltered`,
                            data: JSON.stringify(filter),
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            },
                            dataType: 'json',
                            success: function (response) {
                                console.log(response);
                                $scope.filteredRooms = response;
                                if (!id) {
                                    $scope.Rooms = response;
                                }
                                $scope.$apply();
                            }
                        });
                    },
                    apiBookRoom(bookConfig) {
                        console.log("ჯავშანი");
                        $.ajax({
                            type: "POST",
                            url: `https://${window.location.host}/api/Booking`,
                            data: JSON.stringify(bookConfig),
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            },
                            dataType: 'json',
                            success: function (response) {
                                alert("ოთახი წარმატებით დაიჯავშნა");
                            },
                            error: function (error) {
                                alert(error.statusText);
                            }
                        });
                    },
                    changeActiveTab(data) {
                        $scope.activeTab = data;
                    },
                    applyRoomsFilter() {
                        var formData = $('#filterForm').serializeArray();
                        console.log(formData);
                        var priceFrom, priceTo, roomType, checkIn, checkOut, guests;
                        var filter = {};
                        for (var val of formData) {
                            if (val.name == 'price-from' && Boolean(val.value)) {
                                filter.priceFrom = parseInt(val.value);
                            }
                            if (val.name == 'price-to' && Boolean(val.value)) {
                                filter.priceTo = parseInt(val.value);
                            }
                            if (val.name == 'room' && Boolean(val.value)) {
                                filter.roomTypeId = parseInt(val.value);
                            }
                            if (val.name == 'checkinfilter' && Boolean(val.value)) {
                                filter.checkIn = val.value;
                            }
                            if (val.name == 'checkoutfilter' && Boolean(val.value)) {
                                filter.checkOut = val.value;
                            }
                            if (val.name == 'adults' && Boolean(val.value)) {
                                filter.guestsCount = parseInt(val.value);
                            }
                        }
                        $scope.getFilteredRooms(filter);
                    },
                    getBookedRooms() {
                        $.ajax({
                            type: "GET",
                            url: `https://${window.location.host}/api/Booking`,
                            success: function (response) {
                                console.log(response);
                                $scope.allBookings = response;
                                $scope.$apply();
                            }
                        });
                    },
                    calculateTotalDays() {
                        if ($scope.user.checkInDate && $scope.user.checkOutDate) {
                            var checkIn = new Date($scope.user.checkInDate);
                            var checkOut = new Date($scope.user.checkOutDate);
                            var timeDiff = Math.abs(checkOut.getTime() - checkIn.getTime());
                            var totalDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
                            return totalDays;
                        }
                        return 0;
                    },
                    calculateTotalPrice(price) {
                        var pricePerDay = price; // Replace with your actual price per day
                        var totalDays = $scope.calculateTotalDays();
                        var totalPrice = totalDays * pricePerDay;
                        return totalPrice;
                    },
                    bookRoom(room) {
                        $scope.user = {
                            checkOutDate: '',
                            checkInDate: '',
                            cName: '',
                            cPhone: ''
                        };
                        var formData = $('#reservationform').serializeArray();
                        console.log(formData);
                        let bookObj = {
                            checkInDate: formData[0].value,
                            checkOutDate: formData[1].value,
                            customerId: "1",
                            customerName: formData[2].value,
                            customerPhone: formData[3].value,
                            isConfirmed: true,
                            roomId: room.id,
                        };
                        if (bookObj.checkInDate && bookObj.checkOutDate) {
                            var timeDiff = Math.abs(new Date(bookObj.checkInDate).getTime() - new Date(bookObj.checkOutDate).getTime());
                            var dayCount = Math.ceil(timeDiff / (1000 * 3600 * 24));
                            console.log("Number of days: " + dayCount);
                        }
                        else {
                            console.log("Please select both check-in and check-out dates.");
                        }
                        $scope.apiBookRoom(bookObj);
                    },
                    selectRoom(room) {
                        $(window).scrollTop(0);
                        $scope.selectedForBooking = room;
                        $scope.bookedDatesForSelectedRoom = [];
                        $scope.selectedForBooking.bookedDates.forEach((date) => {
                            $scope.bookedDatesForSelectedRoom.push(date.date.split('T')[0]);
                        });
                        $scope.relatedRooms = $scope.filteredRooms.filter((r) => {
                            return r.hotelId = room.hotelId;
                        }).slice(0, 3);
                        console.log("related", $scope.relatedRooms, "rooms", $scope.Rooms);
                    },
                    selectHotel(hotel) {
                        $(window).scrollTop(0);
                        var filter = {};
                        $scope.getHotelById(hotel.id);
                    },
                    init: () => {
                        var Pages = {
                            Home: 0,
                            Rooms: 1,
                            Hotels: 2,
                            Details: 3,
                            BookedRooms: 4
                        };
                        $scope.user = {
                            checkOutDate: '',
                            checkInDate: '',
                            cName: '',
                            cPhone: ''
                        };
                        $scope.selectedForBooking = undefined;
                        $scope.webPages = Pages;
                        $scope.activeTab = Pages.Home;
                        $scope.getRoomTypes();
                        $scope.hotelsGetAll();
                        $scope.getAllRooms();
                    }
                });
            }
        ]);
    }
}
(() => {
    var lobby = new LobbyClass();
})();
//# sourceMappingURL=file.js.map