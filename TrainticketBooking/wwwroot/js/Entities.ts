interface ILobbyScope extends ng.IScope {
    trains: Train[];
    departures: Departure[];
    vagons: Vagon[];
    stations: Station[];

    activeTab: number
    webPages: any
    //departureFormData: DepartureFormConfig;

    //Api Endpoints
    getAllTrains: () => void;
    getTrainById: (trainId: number) => void;
    getAllVagons: () => void;
    getVagonById: (vagonId: number) => void;
    getAllDepartures: () => void;
    getDepartureById: (departure: GetDepartureConfig) => void;

    // Tickets
    getAllTickets: () => void;
    registerTicket: (data: RegisterTicketConfig, isFormValid: boolean) => void;
    checkTicketStatus: (ticketId: string) => void;
    confirmTicketStatus: (ticketId: string) => void;
    cancelTicket: (ticketId: string) => void;

    departureFormData: any;

    changeActiveTab: (tab: any, isFormInvalid?: boolean) => void;

    findDepartures: () => void;

    departureDataToWorkWith: Departure;

    selectVagonClass: (vagon: Vagon) => void;

    chooseTrainForBooking: (train: Train) => void;

    chosenTrainForBooking: Train;

    personsForTicket: PersonPost[];

    ticketRegisterData: RegisterTicketConfig;

    personsMockData: PersonMock[];

    selectVagon: (personID: number) => void;
    changeVagonToChoose: (vagon: Vagon) => void;
    chosenVagon: Vagon;
    selectedPersonId: number;

    previouslyClickedSeat: Seat[];

    ticketPriceSum: number;
    currentDate: any;
    formatDate: () => void;

    finalTicketToConfirm: Ticket;

    registeredTicketId: any;

    creditCardInfo: CreditCard;

    showNoTicket: boolean;
    showTicket: boolean;
    showCanceledTicketText: boolean;

    TicketIdToBeChecked: string;

    checkedTicket: Ticket;
    CheckedSeatsFromTicket: Seat[]

    getSeatNumber: (seatId: string) => void;

    getAllStations: () => void;

    resetData: () => void;
}

interface CreditCard {
    number: string,
    expDate: string,
    cvvNumber: string,
    nameOnCard: string;
}
interface Station {
    id: string,
    name: string,
    stationNumber: string
}

interface DepartureFormConfig {
    from: any,
    to: any,
    date: any,
    passengerCount: any
}


interface Departure {
    id: number,
    source: string,
    destination: string,
    date: string,
    trains: Train[]
}

interface GetDepartureConfig {
    from: string,
    to: string,
    date: string
}
interface Vagon {
    id: number,
    trainId: number,
    trainNumber: number,
    name: string,
    seats: Seat[]
}

interface Seat {
    seatId: string,
    number: string,
    price: number,
    isOccupied: boolean,
    vagonId: number,
}

interface Train {
    id: number,
    number: number,
    name: string,
    date: string,
    from: string,
    to: string,
    departure: string,
    arrive: string,
    vagons: Vagon[]
}

interface Ticket {
    id: string,
    phone: string,
    email: string,
    date: string,
    ticketPrice: number,
    trainId: number,
    confirmed: boolean,
    train: Train,
    persons: Person[]
}

interface Person {
    id: number,
    ticketId: string,
    name: string,
    surname: string,
    idNumber: string,
    status: string,
    payoutCompleted: boolean,
    seat: Seat
}

interface PersonMock {
    seatId: string,
    name: string,
    surname: string,
    idNumber: string,
    status: string,
    payoutCompleted: boolean;
    seatNumber: string;
    vagon: Vagon;
}

interface PersonPost {
    seatId: string,
    name: string,
    surname: string,
    idNumber: string,
    status: string,
    payoutCompleted: boolean;
}

interface RegisterTicketConfig {
    trainId: number,
    date: string,
    email: string,
    phoneNumber: string,
    people: PersonPost[]
}
