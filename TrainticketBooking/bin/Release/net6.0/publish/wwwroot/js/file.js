class LobbyClass {
    constructor() {
        let lobbyApp = angular.module("lobbyApp", ['ui.bootstrap']);
        lobbyApp.controller("lobbyController", [
            "$scope", "$http", ($scope, $http) => {
                $.extend($scope, {
                    getAllTrains() {
                        $.ajax({
                            type: "GET",
                            url: `https://${window.location.host}/api/trains`,
                            success: function (response) {
                                $scope.trains = response;
                                console.log($scope.trains);
                                $scope.$apply();
                            }
                        });
                    },
                    getTrainById(trainId) {
                        $.ajax({
                            type: "GET",
                            url: `https://${window.location.host}/api/trains/${trainId}`,
                            success: function (response) {
                                console.log(response);
                                $scope.$apply();
                            }
                        });
                    },
                    getAllVagons() {
                        $.ajax({
                            type: "GET",
                            url: `https://${window.location.host}/api/vagons`,
                            success: function (response) {
                                $scope.vagons = response;
                                console.log($scope.trains);
                                $scope.$apply();
                            }
                        });
                    },
                    getVagonById(vagonId) {
                        $.ajax({
                            type: "GET",
                            url: `https://${window.location.host}/api/getvagon/${vagonId}`,
                            success: function (response) {
                                console.log(response);
                                $scope.$apply();
                            }
                        });
                    },
                    getAllDepartures() {
                        $.ajax({
                            type: "GET",
                            url: `https://${window.location.host}/api/departures`,
                            success: function (response) {
                                $scope.departures = response;
                                console.log($scope.departures);
                                $scope.$apply();
                            }
                        });
                    },
                    getDepartureById(departure) {
                        $(".preloader__wrap").show();
                        $.ajax({
                            type: "GET",
                            url: `https://${window.location.host}/api/getdeparture?from=${departure.from}&to=${departure.to}&date=${departure.date}`,
                            success: function (response) {
                                $scope.departureDataToWorkWith = response[0];
                                console.log($scope.departureDataToWorkWith);
                                $scope.$applyAsync();
                            },
                            complete: function () {
                                $(".preloader__wrap").hide();
                                $scope.changeActiveTab($scope.webPages.TrainList);
                                $scope.$applyAsync();
                            }
                        });
                    },
                    getAllStations() {
                        $.ajax({
                            type: "GET",
                            url: `https://${window.location.host}/api/stations`,
                            success: function (response) {
                                $scope.stations = response;
                                console.log($scope.stations);
                                $scope.$applyAsync();
                            },
                            complete: function () {
                            }
                        });
                    },
                    customSort: function (seat) {
                        var number = parseInt(seat.number.match(/\d+/)[0], 10);
                        var alphabeticPart = seat.number.match(/[A-Za-z]+/)[0];
                        // Pad the number with leading zeros for consistent sorting
                        var paddedNumber = ("000" + number).slice(-3);
                        // Concatenate the padded number and the alphabetic part
                        return paddedNumber + alphabeticPart;
                    },
                    // Tickets
                    getAllTickets() {
                        $.ajax({
                            type: "GET",
                            url: `https://${window.location.host}/api/tickets`,
                            success: function (response) {
                                console.log(response);
                                $scope.$apply();
                            }
                        });
                    },
                    registerTicket(data, isFormInvalid) {
                        if (isFormInvalid) {
                            $(".travel__validateText").removeClass('hidden');
                            $(".travel__validateText").addClass('shown');
                            return;
                        }
                        $.ajax({
                            type: "POST",
                            url: `https://${window.location.host}/api/tickets/register`,
                            data: JSON.stringify(data),
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            },
                            dataType: 'json',
                            success: function (response) {
                                $scope.registeredTicketId = response.split(':')[1];
                                $scope.$applyAsync();
                            },
                            error: function (error) {
                                alert(error.statusText);
                            }
                        });
                    },
                    CheckedSeatsFromTicket: [],
                    getSeatNumber(seatId) {
                        $.ajax({
                            type: "GET",
                            url: `https://${window.location.host}/api/seat/${seatId}`,
                            success: function (response) {
                                $scope.CheckedSeatsFromTicket.push(response);
                                console.log($scope.CheckedSeatsFromTicket);
                                $scope.$applyAsync();
                            },
                        });
                    },
                    checkTicketStatus(ticketId) {
                        $.ajax({
                            type: "GET",
                            url: `https://${window.location.host}/api/tickets/checkstatus/${ticketId}`,
                            success: function (response) {
                                $scope.checkedTicket = response;
                                $scope.showNoTicket = false;
                                $scope.showTicket = true;
                                $scope.showCanceledTicketText = false;
                                for (const person of $scope.checkedTicket.persons) {
                                    $scope.getSeatNumber(person.seat.seatId);
                                }
                                $scope.$applyAsync();
                            },
                            error: function (error) {
                                $scope.showNoTicket = true;
                                $scope.showTicket = false;
                                $scope.showCanceledTicketText = false;
                                $scope.$applyAsync();
                            }
                        });
                    },
                    resetData() {
                        $scope.personsMockData = [];
                        $scope.finalTicketToConfirm = undefined;
                        $scope.personsForTicket = [];
                        $scope.selectedPersonId = undefined;
                        $scope.departureFormData = undefined;
                        $scope.creditCardInfo = {
                            cvvNumber: '',
                            expDate: '',
                            nameOnCard: '',
                            number: ''
                        };
                        $scope.TicketIdToBeChecked = '';
                        $scope.chosenTrainForBooking = undefined;
                        $scope.chosenVagon = undefined;
                        $scope.CheckedSeatsFromTicket = [];
                        $scope.departureDataToWorkWith = undefined;
                        $scope.previouslyClickedSeat = undefined;
                        $scope.ticketRegisterData = undefined;
                    },
                    confirmTicketStatus(ticketId) {
                        let creditData = $('#creditCardInfo').serializeArray();
                        $scope.creditCardInfo = {
                            number: creditData[0].value,
                            expDate: creditData[1].value,
                            cvvNumber: creditData[2].value,
                            nameOnCard: creditData[3].value
                        };
                        $.ajax({
                            type: "GET",
                            url: `https://${window.location.host}/api/tickets/confirm/${ticketId}`,
                            success: function (response) {
                                $scope.finalTicketToConfirm = response;
                                console.log("Moooock", $scope.personsMockData);
                                $scope.$apply();
                            }
                        });
                    },
                    cancelTicket(ticketId) {
                        $.ajax({
                            type: "DELETE",
                            url: `https://${window.location.host}/api/tickets/cancel/${ticketId}`,
                            success: function (response) {
                                $scope.showNoTicket = false;
                                $scope.showTicket = false;
                                $scope.showCanceledTicketText = true;
                                $scope.$apply();
                            }
                        });
                    },
                    changeActiveTab(data, isFormInvalid) {
                        if (data == $scope.webPages.Home || data == $scope.webPages.CheckTicket) {
                            $scope.resetData();
                            $scope.showNoTicket = false;
                            $scope.showTicket = false;
                            $scope.showCanceledTicketText = false;
                        }
                        if (isFormInvalid) {
                            return;
                        }
                        $("html, body").scrollTop(0);
                        $scope.activeTab = data;
                    },
                    //calculateTotalDays() {
                    //    if ($scope.user.checkInDate && $scope.user.checkOutDate) {
                    //        var checkIn = new Date($scope.user.checkInDate);
                    //        var checkOut = new Date($scope.user.checkOutDate);
                    //        var timeDiff = Math.abs(checkOut.getTime() - checkIn.getTime());
                    //        var totalDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
                    //        return totalDays;
                    //    }
                    //    return 0;
                    //},
                    //calculateTotalPrice(price: number) {
                    //    var pricePerDay = price; // Replace with your actual price per day
                    //    var totalDays = $scope.calculateTotalDays();
                    //    var totalPrice = totalDays * pricePerDay;
                    //    return totalPrice;
                    //},
                    selectVagon(personID) {
                        console.log(personID, $scope.ticketRegisterData.people[personID]);
                        $scope.selectedPersonId = personID;
                        $scope.chosenVagon = $scope.chosenTrainForBooking.vagons[0];
                    },
                    changeVagonToChoose(vagon) {
                        $scope.chosenVagon = vagon;
                        $scope.$applyAsync();
                    },
                    previouslyClickedSeat: [],
                    selectSeatForPerson(seat) {
                        if (seat.isOccupied) {
                            return;
                        }
                        if ($scope.previouslyClickedSeat.length > 0) {
                            if ($scope.previouslyClickedSeat[$scope.selectedPersonId]) {
                                $scope.ticketPriceSum -= $scope.previouslyClickedSeat[$scope.selectedPersonId].price;
                                $scope.chosenVagon.seats[$scope.chosenVagon.seats.findIndex(r => r.number == $scope.previouslyClickedSeat[$scope.selectedPersonId].number)].isOccupied = false;
                            }
                            $scope.$applyAsync();
                        }
                        $scope.previouslyClickedSeat[$scope.selectedPersonId] = seat;
                        seat.isOccupied = true;
                        $scope.ticketPriceSum += seat.price;
                        $scope.personsMockData[$scope.selectedPersonId].seatNumber = seat.number;
                        $scope.ticketRegisterData.people[$scope.selectedPersonId].seatId = seat.seatId;
                        $scope.personsMockData[$scope.selectedPersonId].vagon = $scope.chosenVagon;
                        console.log("Final Register: ", $scope.ticketRegisterData);
                        $scope.$applyAsync();
                    },
                    findDepartures() {
                        var formData = $('#chooseDepartureForm').serializeArray();
                        if (formData.length < 4) {
                            alert("ყველა ველი შესავსებია");
                            return;
                        }
                        $scope.departureFormData = formData;
                        $scope.personsForTicket = [];
                        $scope.personsMockData = [];
                        for (var i = 0; i < parseInt(formData[3].value); i++) {
                            let person = {
                                idNumber: '',
                                name: '',
                                payoutCompleted: false,
                                seatId: '',
                                status: '0',
                                surname: ''
                            };
                            let personMock = {
                                idNumber: '',
                                name: '',
                                payoutCompleted: false,
                                seatId: '',
                                status: '0',
                                surname: '',
                                seatNumber: '0',
                                vagon: undefined
                            };
                            $scope.personsForTicket.push(person);
                            $scope.personsMockData.push(personMock);
                            $('#chooseDepartureForm input').val('');
                        }
                        $scope.getDepartureById({
                            from: formData[0].value,
                            to: formData[1].value,
                            date: formData[2].value
                        });
                    },
                    selectVagonClass(selectedVagon) {
                        console.log(selectedVagon);
                    },
                    chooseTrainForBooking(train) {
                        $scope.chosenTrainForBooking = train;
                        $scope.ticketRegisterData = {
                            date: $scope.departureFormData[2].value,
                            email: '',
                            people: $scope.personsForTicket,
                            phoneNumber: '',
                            trainId: train.id
                        };
                        $scope.$applyAsync();
                        console.log("Chosen", $scope.chosenTrainForBooking);
                        console.log("TicketData", $scope.ticketRegisterData);
                    },
                    formatDate: function (input) {
                        if (input) {
                            var dateParts = input.split('-');
                            var month = parseInt(dateParts[1]);
                            var day = parseInt(dateParts[2]);
                            var year = parseInt(dateParts[0]);
                            var monthNames = [
                                'January', 'February', 'March', 'April', 'May', 'June',
                                'July', 'August', 'September', 'October', 'November', 'December'
                            ];
                            return day + ' ' + monthNames[month - 1] + ' ' + year;
                        }
                        return '';
                    },
                    init: () => {
                        var Pages = {
                            Home: 0,
                            TrainList: 1,
                            TrainBooking: 2,
                            BookingDetails: 3,
                            PaymentDetails: 4,
                            PaymentResult: 5,
                            CheckTicket: 6
                        };
                        $scope.ticketPriceSum = 0;
                        $scope.webPages = Pages;
                        $scope.activeTab = $scope.webPages.Home;
                        $scope.getAllStations();
                        $scope.showNoTicket = false;
                        $scope.showTicket = false;
                        $scope.showCanceledTicketText = false;
                        $scope.TicketIdToBeChecked = '';
                        $scope.creditCardInfo = {
                            cvvNumber: '',
                            expDate: '',
                            nameOnCard: '',
                            number: ''
                        };
                        //$scope.getAllTrains()
                        //$scope.getAllDepartures()
                        //$scope.getAllVagons()
                        //$scope.getDepartureById({ from: "თბილისი", to: "ბათუმი", date: "2023-06-26" })
                        //$scope.getTrainById(1)
                        //$scope.getVagonById(1)
                        var currentDate = new Date();
                        var month = currentDate.getMonth() + 1; // January is 0, so we add 1
                        var day = currentDate.getDate();
                        var year = currentDate.getFullYear();
                        $scope.currentDate = month.toString() + '-' + day.toString() + '-' + year;
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