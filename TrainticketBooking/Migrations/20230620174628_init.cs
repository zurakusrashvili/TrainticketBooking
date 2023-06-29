using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace TrainticketBooking.Migrations
{
    /// <inheritdoc />
    public partial class init : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Departures",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Source = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Destination = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Date = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Departures", x => x.Id);
                    table.UniqueConstraint("AK_Departures_Source", x => x.Source);
                });

            migrationBuilder.CreateTable(
                name: "Stations",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    StationNumber = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Stations", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Trains",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Number = table.Column<int>(type: "int", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Date = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    From = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    To = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Departure = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Arrive = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Trains", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Trains_Departures_From",
                        column: x => x.From,
                        principalTable: "Departures",
                        principalColumn: "Source");
                });

            migrationBuilder.CreateTable(
                name: "Tickets",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Phone = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Date = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TicketPrice = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    TrainID = table.Column<int>(type: "int", nullable: false),
                    Confirmed = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tickets", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Tickets_Trains_TrainID",
                        column: x => x.TrainID,
                        principalTable: "Trains",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Vagons",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TrainId = table.Column<int>(type: "int", nullable: false),
                    TrainNumber = table.Column<int>(type: "int", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Vagons", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Vagons_Trains_TrainId",
                        column: x => x.TrainId,
                        principalTable: "Trains",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Seats",
                columns: table => new
                {
                    SeatId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Number = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Price = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    IsOccupied = table.Column<bool>(type: "bit", nullable: false),
                    VagonId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Seats", x => x.SeatId);
                    table.ForeignKey(
                        name: "FK_Seats_Vagons_VagonId",
                        column: x => x.VagonId,
                        principalTable: "Vagons",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Persons",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TicketId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    SeatId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Surname = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IdNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PayoutCompleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Persons", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Persons_Seats_SeatId",
                        column: x => x.SeatId,
                        principalTable: "Seats",
                        principalColumn: "SeatId");
                    table.ForeignKey(
                        name: "FK_Persons_Tickets_TicketId",
                        column: x => x.TicketId,
                        principalTable: "Tickets",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Departures",
                columns: new[] { "Id", "Date", "Destination", "Source" },
                values: new object[] { 1, "ორშაბათი", "ბათუმი", "თბილისი" });

            migrationBuilder.InsertData(
                table: "Stations",
                columns: new[] { "Id", "Name", "StationNumber" },
                values: new object[,]
                {
                    { new Guid("14e9c3f3-aa64-44cf-bf1c-2f0da56c2dca"), "ზუგდიდი", "57290" },
                    { new Guid("2094d00c-7cce-4c47-a69e-32a5930c8282"), "ქუთაისი I", "57530" },
                    { new Guid("41624cf2-1a30-4122-b451-ff56ce4a7c75"), "აბაშა", "57170" },
                    { new Guid("9d6a972f-028d-4af9-89e4-9a2ecc75b1a2"), "ბათუმი", "57151" },
                    { new Guid("9d768d5c-ed8b-498d-9a7e-21dd88f8f874"), "ბორჯომი", "57760" },
                    { new Guid("b53fce52-1bbe-4474-9158-1ac9fcea6897"), "ურეკი", "57070" },
                    { new Guid("cb1ccab2-a8e5-4fec-b640-90f76e7338ab"), "თბილისი", "56014" },
                    { new Guid("d0b2558c-7362-402b-9d60-9fcd51c80436"), "ფოთი", "57210" },
                    { new Guid("f847108f-d96c-452e-8f86-2f7ff8d04376"), "ქობულეთი", "57120" }
                });

            migrationBuilder.InsertData(
                table: "Trains",
                columns: new[] { "Id", "Arrive", "Date", "Departure", "From", "Name", "Number", "To" },
                values: new object[,]
                {
                    { 1, "05:47", "ორშაბათი", "00:35", "თბილისი", null, 812, "ბათუმი" },
                    { 2, "15:38", "ორშაბათი", "10:25", "თბილისი", null, 808, "ბათუმი" },
                    { 3, "22:17", "ორშაბათი", "17:05", "თბილისი", null, 804, "ბათუმი" }
                });

            migrationBuilder.InsertData(
                table: "Vagons",
                columns: new[] { "Id", "Name", "TrainId", "TrainNumber" },
                values: new object[,]
                {
                    { 1, "II კლასი", 1, 812 },
                    { 2, "I კლასი", 1, 812 },
                    { 3, "ბიზნესი", 1, 812 },
                    { 4, "II კლასი", 2, 808 },
                    { 5, "II კლასი", 2, 804 }
                });

            migrationBuilder.InsertData(
                table: "Seats",
                columns: new[] { "SeatId", "IsOccupied", "Number", "Price", "VagonId" },
                values: new object[,]
                {
                    { new Guid("00359150-e45d-4846-a19f-6437977639ec"), false, "9D", 125.00m, 3 },
                    { new Guid("00f2516e-2037-4596-a0a2-c57bc90d8d71"), false, "10B", 35.00m, 5 },
                    { new Guid("0143feef-3530-4cea-a06b-932ebe180b1b"), false, "1D", 125.00m, 3 },
                    { new Guid("04e9bb12-4cf8-4302-97c8-c84ea3611985"), false, "3C", 35.00m, 5 },
                    { new Guid("051e0418-472c-4e63-b801-c136b6eb3f89"), false, "3B", 35.00m, 4 },
                    { new Guid("0823f441-21fd-4bca-8497-95ec900731ca"), false, "7D", 35.00m, 4 },
                    { new Guid("09446823-dc1a-4195-8097-d6328608af7c"), false, "1A", 75.00m, 2 },
                    { new Guid("0a7fc176-da91-421f-ac45-1bd07d580f96"), false, "10A", 35.00m, 5 },
                    { new Guid("0a88955f-a854-427d-8a76-43e004700d60"), false, "2B", 75.00m, 2 },
                    { new Guid("0ae38f8d-028c-4f3b-abfd-10d987bb6944"), false, "3A", 35.00m, 4 },
                    { new Guid("0af47436-84ef-40a0-9075-d17058a0bfe0"), false, "1B", 75.00m, 2 },
                    { new Guid("0b3f1ee2-b282-4c24-8dcb-d5ca9927ddb1"), false, "6B", 125.00m, 3 },
                    { new Guid("0c005814-40ee-483c-9405-436a133ba67c"), false, "2C", 75.00m, 2 },
                    { new Guid("0e3c3b88-a5c7-4f0c-a7aa-7082838b8d22"), false, "2A", 35.00m, 5 },
                    { new Guid("0e6011e3-a0d8-413e-bb43-4a02766a1708"), false, "9B", 35.00m, 1 },
                    { new Guid("10ca2991-01f6-434f-bcf6-3410445bdd40"), false, "5B", 75.00m, 2 },
                    { new Guid("1108e302-e63a-4d44-a043-a3baec781ee1"), false, "3B", 125.00m, 3 },
                    { new Guid("13ed9453-8749-47e9-bbad-5ef190f88137"), false, "2D", 35.00m, 5 },
                    { new Guid("14f3ec0e-b5ff-4338-a890-8fe06bfd1e00"), false, "7A", 35.00m, 1 },
                    { new Guid("152031c7-f93a-485f-8952-2ca40217d8d8"), false, "10A", 35.00m, 4 },
                    { new Guid("157918ac-1ffd-4769-8bc0-f46cbda7a92f"), false, "10B", 75.00m, 2 },
                    { new Guid("174b019e-4f81-47be-a05e-4c31f18bcd0d"), false, "2C", 35.00m, 1 },
                    { new Guid("175602b2-cee8-44d9-aa64-920331313a42"), false, "5D", 125.00m, 3 },
                    { new Guid("183cf0b1-da77-4515-a120-a8cb25d1513f"), false, "3C", 75.00m, 2 },
                    { new Guid("18a7d767-2f06-4408-a8d5-e86df786d6c4"), false, "10B", 125.00m, 3 },
                    { new Guid("1ccb80e6-8e75-44ab-b389-70c17647f051"), false, "6A", 35.00m, 5 },
                    { new Guid("1d76a789-d4e9-4c3e-957a-9535418079a1"), false, "4B", 75.00m, 2 },
                    { new Guid("1dd35bdd-b42d-4042-9471-02aa29b882cc"), false, "8A", 125.00m, 3 },
                    { new Guid("1e11fe82-b350-4065-ab13-8bc33abf3b1e"), false, "8A", 35.00m, 4 },
                    { new Guid("205b8241-515c-444c-b55d-21bd17197ada"), false, "9B", 35.00m, 4 },
                    { new Guid("215fd5ee-668d-4227-81b0-73529804a215"), false, "4D", 35.00m, 4 },
                    { new Guid("232c247f-9ea5-45dc-85f8-b5fb952960f8"), false, "2B", 35.00m, 4 },
                    { new Guid("240f471c-fd3e-42b1-984a-1501e488d3e5"), false, "6C", 35.00m, 1 },
                    { new Guid("24cef2d2-5127-4285-8487-053089435846"), false, "9A", 35.00m, 5 },
                    { new Guid("2546c1dc-8e6f-4a97-b81f-26e35c74a893"), false, "8A", 35.00m, 5 },
                    { new Guid("262b926b-a06f-4781-afb9-28206f99d6ed"), false, "3D", 35.00m, 4 },
                    { new Guid("275afcef-3bee-421e-8636-d20d5ba1e885"), false, "9D", 75.00m, 2 },
                    { new Guid("27b4a3a9-0f09-47e1-9b95-eea1982e4e73"), false, "7B", 35.00m, 5 },
                    { new Guid("2a909fcb-07c3-4520-bc0e-bd3b1b6543f9"), false, "10C", 75.00m, 2 },
                    { new Guid("2adb2415-7a77-4c2a-944a-71f1100fe540"), false, "8D", 125.00m, 3 },
                    { new Guid("2d04d75c-e969-4d4b-83af-a2c71f8488b8"), false, "1B", 35.00m, 4 },
                    { new Guid("312012e2-2d3a-494c-9326-d276cc400fa8"), false, "8B", 35.00m, 4 },
                    { new Guid("3248bce4-2a52-4d79-84a1-5e5ed30d397e"), false, "4D", 125.00m, 3 },
                    { new Guid("32a92e10-9fa7-4407-ab0b-e5f332847ff3"), false, "9A", 75.00m, 2 },
                    { new Guid("34b0f59d-994b-43ec-b56b-063a079e0322"), false, "1B", 125.00m, 3 },
                    { new Guid("34f4d7d1-4853-4548-8f65-720d47a2157f"), false, "3D", 35.00m, 1 },
                    { new Guid("3593cc8c-f12e-4aec-a820-d61bf9ce7e19"), false, "4B", 35.00m, 1 },
                    { new Guid("36b24c41-1abe-4666-a420-357fbf3b9292"), false, "1D", 35.00m, 1 },
                    { new Guid("371fc749-f479-474a-92f0-c72a0105fdd3"), false, "4D", 35.00m, 5 },
                    { new Guid("38754f15-cbac-4f8d-8a89-381dfbf9856a"), false, "7D", 35.00m, 1 },
                    { new Guid("38feee89-6ca9-48aa-9ae5-c1b33e245524"), false, "8D", 35.00m, 5 },
                    { new Guid("3aa0dcf7-7bfc-4681-8bb7-ca6da053a218"), false, "9C", 35.00m, 5 },
                    { new Guid("3cbae06e-2df9-4ec1-b89a-e21c669a12fc"), false, "1A", 35.00m, 1 },
                    { new Guid("3cce4561-0c09-46a1-a642-7e230a92f9f8"), false, "3A", 75.00m, 2 },
                    { new Guid("3e145f13-7536-4955-b33f-cfc3a57395e9"), false, "10D", 35.00m, 1 },
                    { new Guid("3fa055ea-564c-4176-8cc1-dedb007ee3d4"), false, "6C", 125.00m, 3 },
                    { new Guid("40525987-6ac9-414e-a3bf-bc47dfe068f7"), false, "10C", 35.00m, 4 },
                    { new Guid("445d6f53-3910-4c37-b548-a9e38190398e"), false, "4A", 35.00m, 4 },
                    { new Guid("4a63c1be-acb7-49a8-8c06-e3b4cb855c19"), false, "10D", 35.00m, 4 },
                    { new Guid("4b34eb2b-8f05-43d5-afbe-09e5aa8c28f6"), false, "5C", 35.00m, 5 },
                    { new Guid("4bc7b9c4-413b-49b8-8b04-f4488085a24e"), false, "9D", 35.00m, 1 },
                    { new Guid("4c0cfdfd-1167-4901-b657-689df21a0139"), false, "9A", 125.00m, 3 },
                    { new Guid("4c32a31e-93e9-49e2-82cd-65c66a6edc4b"), false, "1D", 35.00m, 5 },
                    { new Guid("4c73c0c3-dcb8-4b33-bdfc-2be33d3d645c"), false, "5D", 75.00m, 2 },
                    { new Guid("4c94b6c1-f2fc-4af0-967d-83d7af5cc267"), false, "2C", 35.00m, 4 },
                    { new Guid("4f6362ba-c1a8-4856-bad6-5caaeee41fbb"), false, "10C", 35.00m, 5 },
                    { new Guid("504c2dd1-c802-4dfe-b818-c839af58297d"), false, "5B", 125.00m, 3 },
                    { new Guid("50562711-2085-4491-bdf8-750eb4650913"), false, "7A", 75.00m, 2 },
                    { new Guid("517460c6-2a13-4cfa-80bb-fbf3c0970446"), false, "1B", 35.00m, 5 },
                    { new Guid("52ce71f2-eb9a-4ff8-a2fb-763035804c8e"), false, "3B", 35.00m, 1 },
                    { new Guid("53c20933-5ae4-4fd8-a0f4-16765d827a1f"), false, "5C", 35.00m, 4 },
                    { new Guid("559a9366-926d-4289-bfbb-eb3fedd59a23"), false, "10D", 75.00m, 2 },
                    { new Guid("56c23a80-9852-47fa-a9d7-b6d1289a98c9"), false, "7C", 35.00m, 5 },
                    { new Guid("580ff731-c5ec-4f1d-97de-b4f47a97a86f"), false, "3C", 35.00m, 4 },
                    { new Guid("5bae3403-186c-4fcc-be2e-b5bd6f72568d"), false, "3C", 125.00m, 3 },
                    { new Guid("5dde3914-2562-4d67-beb3-152a2c6ff3f5"), false, "1C", 35.00m, 1 },
                    { new Guid("60666b5b-917a-40bf-b8bc-1124f180d717"), false, "2D", 35.00m, 4 },
                    { new Guid("60d671fd-6f97-4fa0-b7a6-c01bf77f3736"), false, "4A", 75.00m, 2 },
                    { new Guid("61c1bda4-98f7-468d-9d0f-18ae3507b297"), false, "2D", 125.00m, 3 },
                    { new Guid("6243e5ed-914a-4044-8e34-820aa222bcb7"), false, "4D", 35.00m, 1 },
                    { new Guid("6335d17d-ff99-4485-82d2-f4605daa4a09"), false, "8A", 35.00m, 1 },
                    { new Guid("63653fc0-6c76-4628-9e0d-b0fa2e155773"), false, "6B", 35.00m, 4 },
                    { new Guid("656b3a22-9196-43c9-bd42-5d8fd76a9bf6"), false, "9B", 125.00m, 3 },
                    { new Guid("65950804-3741-49db-bda7-ebf699289ca8"), false, "9D", 35.00m, 4 },
                    { new Guid("676ab2fa-8306-408d-a515-13c0b4531066"), false, "5A", 35.00m, 4 },
                    { new Guid("677c414c-dd85-49ac-9d6e-fb33c5eb769f"), false, "6A", 125.00m, 3 },
                    { new Guid("68af96f0-9ccf-49dc-9afc-46d1e358bc31"), false, "1A", 35.00m, 4 },
                    { new Guid("6a10f576-64ae-4f5c-b4d2-49d54dd93259"), false, "4A", 125.00m, 3 },
                    { new Guid("6b92bf22-2c6b-42e3-97c5-e5f2876a0c21"), false, "4D", 75.00m, 2 },
                    { new Guid("6cd13526-58ab-479f-954c-c6176ada10b2"), false, "2C", 125.00m, 3 },
                    { new Guid("6ee9631e-49ee-486b-91f0-f714b587f51b"), false, "8C", 35.00m, 4 },
                    { new Guid("7071dc49-a401-468f-9780-ac3ce851b902"), false, "9C", 75.00m, 2 },
                    { new Guid("72774466-dc6d-4e8a-9d00-6df14d3420e7"), false, "6C", 35.00m, 4 },
                    { new Guid("7376b1a1-d9f6-40d1-80f5-a6eb3968d52a"), false, "9D", 35.00m, 5 },
                    { new Guid("74351140-d59a-48a1-a15b-73b6dfdf02ab"), false, "5B", 35.00m, 4 },
                    { new Guid("744fc20d-8652-4092-930e-2cb57d9e5750"), false, "3D", 35.00m, 5 },
                    { new Guid("747e5b5a-e374-4c1e-9946-eb6ef56d3402"), false, "5C", 125.00m, 3 },
                    { new Guid("77284767-9be4-4d78-95c2-bf38f8195ab0"), false, "9B", 75.00m, 2 },
                    { new Guid("78fda68d-85ab-4aeb-8925-8cf363402540"), false, "2B", 125.00m, 3 },
                    { new Guid("799b9219-1e30-4f86-9883-88022d75d249"), false, "9A", 35.00m, 4 },
                    { new Guid("7a40162a-f8b0-48ac-8d1f-cd3305776f86"), false, "4B", 35.00m, 4 },
                    { new Guid("7a6db1dd-28f3-4995-a59b-0d6a78252021"), false, "8A", 75.00m, 2 },
                    { new Guid("7bf76eec-04c6-48ed-b382-7e775e1628c3"), false, "8D", 35.00m, 4 },
                    { new Guid("7f32341b-1548-41dd-90ee-3bc73e7e36f9"), false, "5B", 35.00m, 1 },
                    { new Guid("7f5c0b96-466a-4e10-90e3-e310c7eeb80d"), false, "8C", 125.00m, 3 },
                    { new Guid("808db548-30bc-4b6a-a547-de138d0a1847"), false, "4C", 35.00m, 5 },
                    { new Guid("8247980c-434f-4a89-b3f2-11d3fe27a784"), false, "4C", 35.00m, 1 },
                    { new Guid("83989daf-89ae-4dc7-9d10-b590c35a1ece"), false, "6D", 75.00m, 2 },
                    { new Guid("83f642fb-d1ae-4f2d-b880-58bc86abe1dd"), false, "7B", 35.00m, 4 },
                    { new Guid("84e0a00c-f26a-45c5-bff2-30701aa7855f"), false, "8B", 75.00m, 2 },
                    { new Guid("85c18bca-70f8-4b80-ae2d-67449c68cd97"), false, "2A", 35.00m, 4 },
                    { new Guid("892ee038-b01b-4ef4-a28b-eaea843136e5"), false, "7D", 125.00m, 3 },
                    { new Guid("8975417b-7ca6-45a4-9d63-dd4c7894ba37"), false, "5C", 35.00m, 1 },
                    { new Guid("8a2e724d-adf5-4cce-bbb2-e65c775b04e9"), false, "6A", 35.00m, 1 },
                    { new Guid("8b2911c3-695c-4093-a614-5164eb3b08fa"), false, "7C", 75.00m, 2 },
                    { new Guid("8b2fe303-854b-4bc7-ab9a-a24a67080627"), false, "5D", 35.00m, 5 },
                    { new Guid("8c29f62e-110f-4d50-bff8-698f48f4b297"), false, "1C", 35.00m, 4 },
                    { new Guid("8cf764dc-2fbd-494e-945b-6e90a9a0cbed"), false, "8D", 35.00m, 1 },
                    { new Guid("8d3d013d-e1a7-47e5-adcb-a221c3358331"), false, "5A", 35.00m, 5 },
                    { new Guid("8d4f9845-046e-41da-b1d5-67ddf335dfae"), false, "5B", 35.00m, 5 },
                    { new Guid("8dd4c9f6-ad64-4307-b61a-63b2b9b9abdc"), false, "6A", 75.00m, 2 },
                    { new Guid("8dda6be2-fe6e-47e3-95ce-27ca19dbfd2a"), false, "3A", 35.00m, 1 },
                    { new Guid("91bcaf64-baf2-4aac-a191-6ac9a926e1fd"), false, "2A", 125.00m, 3 },
                    { new Guid("92629395-885c-4d77-9627-e802ff5185a3"), false, "6D", 35.00m, 5 },
                    { new Guid("939c2559-9646-4fa5-8c5c-e9248420915c"), false, "3A", 125.00m, 3 },
                    { new Guid("947870bc-3fe7-481b-951c-8fecf8c91742"), false, "7C", 35.00m, 4 },
                    { new Guid("94b7443a-ec4d-43c0-a47e-0d055e241bc5"), false, "1C", 75.00m, 2 },
                    { new Guid("95e07e42-8f4e-464f-ba0d-030a2d8427d1"), false, "7A", 35.00m, 4 },
                    { new Guid("97b04e7c-ef86-40ff-a01c-4ed7cbefbbb9"), false, "3B", 35.00m, 5 },
                    { new Guid("98a75295-7d83-4e50-8547-f6df909dc997"), false, "10B", 35.00m, 1 },
                    { new Guid("9b7464ff-cfae-405e-a507-26b4693c7830"), false, "5A", 35.00m, 1 },
                    { new Guid("9e42fe5a-0444-4979-b577-646398521d0e"), false, "10D", 125.00m, 3 },
                    { new Guid("9f5a1ddc-162f-4ad8-a79a-63a1b05116b4"), false, "5C", 75.00m, 2 },
                    { new Guid("a2f41b17-1aaa-442c-be25-14ea6adff0fc"), false, "4B", 35.00m, 5 },
                    { new Guid("a4149da3-dc40-4e18-bbe8-b71f33526e69"), false, "9C", 125.00m, 3 },
                    { new Guid("a58feb51-1162-434a-8966-a36eeb0bea12"), false, "10D", 35.00m, 5 },
                    { new Guid("a717674d-65b0-4ba1-a770-8bc6257235bb"), false, "4A", 35.00m, 5 },
                    { new Guid("a72c1fb4-c5d4-4e72-a950-bc3d46e8b78f"), false, "8B", 35.00m, 1 },
                    { new Guid("a8061fd3-b700-4317-8f82-297d513677ef"), false, "8C", 75.00m, 2 },
                    { new Guid("a8e1bf74-eab5-4ef6-8431-60f1dbb5fe65"), false, "1A", 125.00m, 3 },
                    { new Guid("a934b8b7-c54b-4a24-a2a5-dda5f0e9bca3"), false, "3D", 75.00m, 2 },
                    { new Guid("a9b10e02-18f6-4457-9d45-5be8db745d8c"), false, "5A", 125.00m, 3 },
                    { new Guid("a9c243e6-af7a-4f40-a1de-e0b80fd58135"), false, "6C", 75.00m, 2 },
                    { new Guid("abc874bf-4f18-4908-a0b6-55a7c7182631"), false, "6A", 35.00m, 4 },
                    { new Guid("ad01fed4-168a-42bc-a5c7-74166abb0296"), false, "2B", 35.00m, 5 },
                    { new Guid("afec5569-f66e-4cc3-821b-267541c8f3aa"), false, "10C", 125.00m, 3 },
                    { new Guid("b01c97bd-7fbd-4acb-a832-bbe9b16f7808"), false, "10A", 125.00m, 3 },
                    { new Guid("b0ea2177-e295-4c58-8d99-1ab8478c0fe4"), false, "10A", 75.00m, 2 },
                    { new Guid("b13f2e6c-5eb4-46a3-855e-b15b5a9e9572"), false, "10B", 35.00m, 4 },
                    { new Guid("b173209f-7f6a-446d-bb2d-957720329470"), false, "8B", 35.00m, 5 },
                    { new Guid("b1a924a2-074b-41c1-9e58-9d21c436ae75"), false, "7B", 75.00m, 2 },
                    { new Guid("b321052d-682c-4b41-b1c3-08c4156b76cd"), false, "3A", 35.00m, 5 },
                    { new Guid("b8d28a2f-0377-4ef9-b32e-8edaf956fa41"), false, "7B", 125.00m, 3 },
                    { new Guid("b92b6f95-b70f-428d-9785-4b38147e9ed8"), false, "6D", 125.00m, 3 },
                    { new Guid("b981332f-b41d-4b74-ac53-7312b14a2854"), false, "6D", 35.00m, 1 },
                    { new Guid("ba8e6680-0d24-400a-885f-17761f209c2e"), false, "7B", 35.00m, 1 },
                    { new Guid("bb05fff1-1244-4074-9af9-44d7469ae5ba"), false, "2B", 35.00m, 1 },
                    { new Guid("c1a6f484-c8f1-48cb-90f3-68c985acfca1"), false, "4A", 35.00m, 1 },
                    { new Guid("c28069b7-4e81-4b29-b395-41e93b503afa"), false, "3D", 125.00m, 3 },
                    { new Guid("c31d50b0-d3ca-40cc-87f5-58581103a9b6"), false, "4C", 125.00m, 3 },
                    { new Guid("c551913b-a714-4bbd-b332-0b1a6b0c952a"), false, "1D", 35.00m, 4 },
                    { new Guid("c68c2d2d-6b82-49e4-8648-161f0fd3a710"), false, "2A", 75.00m, 2 },
                    { new Guid("c6bf5c76-2eec-4a87-b1d8-2859d610f32d"), false, "6C", 35.00m, 5 },
                    { new Guid("c7c0aa75-a3fd-4f0a-a2bb-fde781356be1"), false, "5D", 35.00m, 4 },
                    { new Guid("cbcee5db-f169-47fb-82a8-f2b10bf597cb"), false, "1C", 35.00m, 5 },
                    { new Guid("cf3a12dd-0201-41fc-98cc-b5b8dd02065b"), false, "6B", 35.00m, 1 },
                    { new Guid("d02dfc94-e8b7-400f-95ec-b76ceab73e4c"), false, "6D", 35.00m, 4 },
                    { new Guid("d0f4d8c9-704d-4291-aab3-9d1506bbd1ba"), false, "9A", 35.00m, 1 },
                    { new Guid("d26ba4a4-4a77-4d2f-8d95-967b936c9469"), false, "8D", 75.00m, 2 },
                    { new Guid("d38b2970-203d-4efe-af71-c5f6c734541f"), false, "6B", 35.00m, 5 },
                    { new Guid("d47e4c3c-d50c-47a2-bc0a-07fe522c5a8e"), false, "4C", 75.00m, 2 },
                    { new Guid("d4d5cd0b-91ac-42f6-917e-993d3fee58b4"), false, "7C", 125.00m, 3 },
                    { new Guid("d6976dc9-b0f0-4c23-9ca7-2b709babe94a"), false, "3B", 75.00m, 2 },
                    { new Guid("d77aca44-e724-47f7-86b4-fe7d776b03ae"), false, "4B", 125.00m, 3 },
                    { new Guid("d905a55f-7d97-4633-a929-4aa8df003e53"), false, "5D", 35.00m, 1 },
                    { new Guid("d9c2d186-d8d5-42d0-a57d-6b1568d5b792"), false, "7D", 35.00m, 5 },
                    { new Guid("d9d10871-0b92-4c31-ac05-0242d2b94488"), false, "3C", 35.00m, 1 },
                    { new Guid("da464010-0393-4bdc-a40d-eddaf9d955ab"), false, "7D", 75.00m, 2 },
                    { new Guid("dc8f40b7-0341-4ecf-b754-8b77d8c4d292"), false, "8B", 125.00m, 3 },
                    { new Guid("df06fab2-c0b2-4cc1-970e-67821ecd6c70"), false, "4C", 35.00m, 4 },
                    { new Guid("df24747a-7473-47c4-bb01-03cc16c7bf3d"), false, "1B", 35.00m, 1 },
                    { new Guid("e398e61d-e570-451f-bcaa-7b65e6fc7e25"), false, "8C", 35.00m, 1 },
                    { new Guid("e5aa67c0-e3e1-42d8-9d3d-630ba2dee073"), false, "10C", 35.00m, 1 },
                    { new Guid("e5bc61af-19bb-4020-8a41-95ef180987b3"), false, "9B", 35.00m, 5 },
                    { new Guid("e72a3213-7eb8-49e8-b56c-00d2874b863f"), false, "2A", 35.00m, 1 },
                    { new Guid("ecf72c4e-3981-45f7-b12c-f5227550c494"), false, "7A", 125.00m, 3 },
                    { new Guid("f01f917d-3e2f-4d10-8704-d51ef99942c4"), false, "9C", 35.00m, 1 },
                    { new Guid("f0a7a440-36fd-479d-ab3b-c039e09a73bd"), false, "1C", 125.00m, 3 },
                    { new Guid("f15cecba-1586-48eb-91f8-3a0afc28f80f"), false, "7C", 35.00m, 1 },
                    { new Guid("f26a62ec-ff57-423b-a151-25dcbb3c742b"), false, "2D", 75.00m, 2 },
                    { new Guid("f432c0f8-e338-4187-ae57-b65832603afa"), false, "2D", 35.00m, 1 },
                    { new Guid("f4399942-34d0-4420-a1a4-3c9ba6b8d147"), false, "7A", 35.00m, 5 },
                    { new Guid("f6332e84-7f6c-43b4-96fc-bdcbb7881398"), false, "6B", 75.00m, 2 },
                    { new Guid("f69031b1-e79d-4087-98fa-746c885230b5"), false, "5A", 75.00m, 2 },
                    { new Guid("f812ab6b-ff23-4cc2-92ec-6ee6a65a593e"), false, "1A", 35.00m, 5 },
                    { new Guid("fa53ef20-74f9-4b80-b7af-1a38075a8193"), false, "9C", 35.00m, 4 },
                    { new Guid("fd4909db-88ca-4fe9-8b95-e1f7ddd8da7e"), false, "1D", 75.00m, 2 },
                    { new Guid("fd56616e-ce94-46fd-a6f3-ab72df1cc7af"), false, "10A", 35.00m, 1 },
                    { new Guid("ff608396-733f-4b02-a124-0d563905c500"), false, "8C", 35.00m, 5 },
                    { new Guid("ff964064-18aa-439a-9df0-a59e0c3bf239"), false, "2C", 35.00m, 5 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Persons_SeatId",
                table: "Persons",
                column: "SeatId");

            migrationBuilder.CreateIndex(
                name: "IX_Persons_TicketId",
                table: "Persons",
                column: "TicketId");

            migrationBuilder.CreateIndex(
                name: "IX_Seats_VagonId",
                table: "Seats",
                column: "VagonId");

            migrationBuilder.CreateIndex(
                name: "IX_Tickets_TrainID",
                table: "Tickets",
                column: "TrainID");

            migrationBuilder.CreateIndex(
                name: "IX_Trains_From",
                table: "Trains",
                column: "From");

            migrationBuilder.CreateIndex(
                name: "IX_Vagons_TrainId",
                table: "Vagons",
                column: "TrainId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Persons");

            migrationBuilder.DropTable(
                name: "Stations");

            migrationBuilder.DropTable(
                name: "Seats");

            migrationBuilder.DropTable(
                name: "Tickets");

            migrationBuilder.DropTable(
                name: "Vagons");

            migrationBuilder.DropTable(
                name: "Trains");

            migrationBuilder.DropTable(
                name: "Departures");
        }
    }
}
