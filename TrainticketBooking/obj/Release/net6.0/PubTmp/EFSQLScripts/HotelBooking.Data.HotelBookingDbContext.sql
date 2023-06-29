IF OBJECT_ID(N'[__EFMigrationsHistory]') IS NULL
BEGIN
    CREATE TABLE [__EFMigrationsHistory] (
        [MigrationId] nvarchar(150) NOT NULL,
        [ProductVersion] nvarchar(32) NOT NULL,
        CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY ([MigrationId])
    );
END;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230606175500_init')
BEGIN
    CREATE TABLE [Bookings] (
        [Id] int NOT NULL IDENTITY,
        [RoomID] int NOT NULL,
        [CheckInDate] datetime2 NOT NULL,
        [CheckOutDate] datetime2 NOT NULL,
        [TotalPrice] int NOT NULL,
        [IsConfirmed] bit NOT NULL,
        [CustomerName] nvarchar(max) NULL,
        [CustomerId] nvarchar(max) NULL,
        [CustomerPhone] nvarchar(max) NULL,
        CONSTRAINT [PK_Bookings] PRIMARY KEY ([Id])
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230606175500_init')
BEGIN
    CREATE TABLE [Hotels] (
        [Id] int NOT NULL IDENTITY,
        [Name] nvarchar(max) NULL,
        [Address] nvarchar(max) NULL,
        [City] nvarchar(max) NULL,
        [FeaturedImage] nvarchar(max) NULL,
        CONSTRAINT [PK_Hotels] PRIMARY KEY ([Id])
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230606175500_init')
BEGIN
    CREATE TABLE [RoomTypes] (
        [Id] int NOT NULL IDENTITY,
        [Name] nvarchar(max) NULL,
        CONSTRAINT [PK_RoomTypes] PRIMARY KEY ([Id])
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230606175500_init')
BEGIN
    CREATE TABLE [Rooms] (
        [Id] int NOT NULL IDENTITY,
        [Name] nvarchar(max) NULL,
        [HotelId] int NOT NULL,
        [RoomTypeId] int NOT NULL,
        [PricePerNight] int NOT NULL,
        [Available] bit NOT NULL,
        [MaximumGuests] int NOT NULL,
        CONSTRAINT [PK_Rooms] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_Rooms_Hotels_HotelId] FOREIGN KEY ([HotelId]) REFERENCES [Hotels] ([Id]) ON DELETE CASCADE
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230606175500_init')
BEGIN
    CREATE TABLE [BookedDates] (
        [Id] int NOT NULL IDENTITY,
        [Date] datetime2 NOT NULL,
        [RoomId] int NOT NULL,
        CONSTRAINT [PK_BookedDates] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_BookedDates_Rooms_RoomId] FOREIGN KEY ([RoomId]) REFERENCES [Rooms] ([Id]) ON DELETE CASCADE
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230606175500_init')
BEGIN
    CREATE TABLE [Images] (
        [Id] int NOT NULL IDENTITY,
        [Source] nvarchar(max) NULL,
        [RoomId] int NOT NULL,
        CONSTRAINT [PK_Images] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_Images_Rooms_RoomId] FOREIGN KEY ([RoomId]) REFERENCES [Rooms] ([Id]) ON DELETE CASCADE
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230606175500_init')
BEGIN
    IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'Id', N'Address', N'City', N'FeaturedImage', N'Name') AND [object_id] = OBJECT_ID(N'[Hotels]'))
        SET IDENTITY_INSERT [Hotels] ON;
    EXEC(N'INSERT INTO [Hotels] ([Id], [Address], [City], [FeaturedImage], [Name])
    VALUES (1, N''29 Rustaveli Ave, Tbilisi, Tbilisi, 0108'', N''Tbilisi'', N''https://images.trvl-media.com/lodging/16000000/15840000/15835100/15835033/41cbdcb1.jpg?impolicy=resizecrop&rw=1200&ra=fit'', N''The Biltmore Hotel Tbilisi''),
    (2, N''4, Freedom Square, Tbilisi, 0105'', N''Tbilisi'', N''https://images.trvl-media.com/lodging/1000000/920000/916400/916376/3e65a896.jpg?impolicy=resizecrop&rw=1200&ra=fit'', N''Courtyard by Marriott Tbilisi''),
    (3, N''1 Republic square, Tbilisi, 0108'', N''Tbilisi'', N''https://images.trvl-media.com/lodging/3000000/2620000/2614700/2614694/84d23097.jpg?impolicy=resizecrop&rw=1200&ra=fit'', N''Radisson Blu Iveria Hotel Tbilisi'')');
    IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'Id', N'Address', N'City', N'FeaturedImage', N'Name') AND [object_id] = OBJECT_ID(N'[Hotels]'))
        SET IDENTITY_INSERT [Hotels] OFF;
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230606175500_init')
BEGIN
    IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'Id', N'Name') AND [object_id] = OBJECT_ID(N'[RoomTypes]'))
        SET IDENTITY_INSERT [RoomTypes] ON;
    EXEC(N'INSERT INTO [RoomTypes] ([Id], [Name])
    VALUES (1, N''Single Room''),
    (2, N''Double Room''),
    (3, N''Deluxe Room'')');
    IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'Id', N'Name') AND [object_id] = OBJECT_ID(N'[RoomTypes]'))
        SET IDENTITY_INSERT [RoomTypes] OFF;
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230606175500_init')
BEGIN
    IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'Id', N'Available', N'HotelId', N'MaximumGuests', N'Name', N'PricePerNight', N'RoomTypeId') AND [object_id] = OBJECT_ID(N'[Rooms]'))
        SET IDENTITY_INSERT [Rooms] ON;
    EXEC(N'INSERT INTO [Rooms] ([Id], [Available], [HotelId], [MaximumGuests], [Name], [PricePerNight], [RoomTypeId])
    VALUES (1, CAST(1 AS bit), 1, 3, N''Premium Room'', 199, 1),
    (2, CAST(1 AS bit), 1, 3, N''Deluxe Twin Room'', 299, 2),
    (3, CAST(1 AS bit), 1, 2, N''Club Room'', 89, 1),
    (4, CAST(1 AS bit), 1, 5, N''Deluxe Double Room'', 189, 2),
    (5, CAST(1 AS bit), 1, 3, N''Junior Suite'', 99, 1),
    (6, CAST(1 AS bit), 1, 2, N''Club Twin Room'', 199, 2),
    (7, CAST(1 AS bit), 1, 6, N''Grand Deluxe Suite'', 299, 3),
    (8, CAST(1 AS bit), 1, 5, N''Executive Suite'', 299, 1),
    (9, CAST(1 AS bit), 2, 5, N''Superior Twin Room'', 199, 2),
    (10, CAST(1 AS bit), 2, 3, N''Junior Suite'', 99, 2),
    (11, CAST(1 AS bit), 2, 5, N''Superior Room'', 399, 3),
    (12, CAST(1 AS bit), 2, 3, N''Executive Room'', 99, 2),
    (13, CAST(1 AS bit), 2, 4, N''Deluxe Twin Room'', 199, 2),
    (14, CAST(1 AS bit), 2, 3, N''Deluxe Room'', 149, 1),
    (15, CAST(1 AS bit), 3, 4, N''Premium Room'', 149, 2),
    (16, CAST(1 AS bit), 3, 6, N''Superior Room'', 299, 3),
    (17, CAST(1 AS bit), 3, 3, N''Superior Room, City View (High Floor)'', 399, 3),
    (18, CAST(1 AS bit), 3, 2, N''Standard Room'', 99, 1),
    (19, CAST(1 AS bit), 3, 4, N''Junior Suite'', 199, 2),
    (20, CAST(1 AS bit), 3, 2, N''Premium Room'', 149, 3)');
    IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'Id', N'Available', N'HotelId', N'MaximumGuests', N'Name', N'PricePerNight', N'RoomTypeId') AND [object_id] = OBJECT_ID(N'[Rooms]'))
        SET IDENTITY_INSERT [Rooms] OFF;
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230606175500_init')
BEGIN
    IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'Id', N'RoomId', N'Source') AND [object_id] = OBJECT_ID(N'[Images]'))
        SET IDENTITY_INSERT [Images] ON;
    EXEC(N'INSERT INTO [Images] ([Id], [RoomId], [Source])
    VALUES (1, 1, N''https://images.trvl-media.com/lodging/16000000/15840000/15835100/15835033/78e5bc5d.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium''),
    (2, 1, N''https://images.trvl-media.com/lodging/16000000/15840000/15835100/15835033/bf815e90.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium''),
    (3, 1, N''https://images.trvl-media.com/lodging/16000000/15840000/15835100/15835033/cbb31f78.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium''),
    (4, 1, N''https://images.trvl-media.com/lodging/16000000/15840000/15835100/15835033/d9add37c.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium''),
    (5, 1, N''https://images.trvl-media.com/lodging/16000000/15840000/15835100/15835033/11ed224a.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium''),
    (6, 1, N''https://images.trvl-media.com/lodging/16000000/15840000/15835100/15835033/1f20a362.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium''),
    (7, 2, N''https://images.trvl-media.com/lodging/16000000/15840000/15835100/15835033/b6bb61fc.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium''),
    (8, 2, N''https://images.trvl-media.com/lodging/16000000/15840000/15835100/15835033/14b60598.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium''),
    (9, 2, N''https://images.trvl-media.com/lodging/16000000/15840000/15835100/15835033/99460f51.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium''),
    (10, 2, N''https://images.trvl-media.com/lodging/16000000/15840000/15835100/15835033/7aac5bc6.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium''),
    (11, 2, N''https://images.trvl-media.com/lodging/16000000/15840000/15835100/15835033/f7436d8f.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium''),
    (12, 2, N''https://images.trvl-media.com/lodging/16000000/15840000/15835100/15835033/d9add37c.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium''),
    (13, 3, N''https://images.trvl-media.com/lodging/16000000/15840000/15835100/15835033/74bb8203.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium''),
    (14, 3, N''https://images.trvl-media.com/lodging/16000000/15840000/15835100/15835033/08619d53.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium''),
    (15, 3, N''https://images.trvl-media.com/lodging/16000000/15840000/15835100/15835033/afdf2bac.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium''),
    (16, 3, N''https://images.trvl-media.com/lodging/16000000/15840000/15835100/15835033/cbb31f78.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium''),
    (17, 3, N''https://images.trvl-media.com/lodging/16000000/15840000/15835100/15835033/d6ca6c86.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium''),
    (18, 4, N''https://images.trvl-media.com/lodging/16000000/15840000/15835100/15835033/14b60598.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium''),
    (19, 4, N''https://images.trvl-media.com/lodging/16000000/15840000/15835100/15835033/74bb8203.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium''),
    (20, 4, N''https://images.trvl-media.com/lodging/16000000/15840000/15835100/15835033/d6ca6c86.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium''),
    (21, 4, N''https://images.trvl-media.com/lodging/16000000/15840000/15835100/15835033/78e5bc5d.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium''),
    (22, 4, N''https://images.trvl-media.com/lodging/16000000/15840000/15835100/15835033/8eb86ca3.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium''),
    (23, 5, N''https://images.trvl-media.com/lodging/16000000/15840000/15835100/15835033/cbb31f78.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium''),
    (24, 5, N''https://images.trvl-media.com/lodging/16000000/15840000/15835100/15835033/bf815e90.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium''),
    (25, 5, N''https://images.trvl-media.com/lodging/16000000/15840000/15835100/15835033/7aac5bc6.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium''),
    (26, 5, N''https://images.trvl-media.com/lodging/16000000/15840000/15835100/15835033/d6ca6c86.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium''),
    (27, 6, N''https://images.trvl-media.com/lodging/16000000/15840000/15835100/15835033/14b60598.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium''),
    (28, 6, N''https://images.trvl-media.com/lodging/16000000/15840000/15835100/15835033/f7436d8f.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium''),
    (29, 6, N''https://images.trvl-media.com/lodging/16000000/15840000/15835100/15835033/99460f51.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium''),
    (30, 6, N''https://images.trvl-media.com/lodging/16000000/15840000/15835100/15835033/d9add37c.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium''),
    (31, 7, N''https://images.trvl-media.com/lodging/16000000/15840000/15835100/15835033/1f20a362.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium''),
    (32, 7, N''https://images.trvl-media.com/lodging/16000000/15840000/15835100/15835033/11ed224a.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium''),
    (33, 7, N''https://images.trvl-media.com/lodging/16000000/15840000/15835100/15835033/8eb86ca3.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium''),
    (34, 7, N''https://images.trvl-media.com/lodging/16000000/15840000/15835100/15835033/d6ca6c86.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium''),
    (35, 8, N''https://images.trvl-media.com/lodging/16000000/15840000/15835100/15835033/d6ca6c86.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium''),
    (36, 8, N''https://images.trvl-media.com/lodging/16000000/15840000/15835100/15835033/854cc524.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium''),
    (37, 8, N''https://images.trvl-media.com/lodging/16000000/15840000/15835100/15835033/1f20a362.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium''),
    (38, 8, N''https://images.trvl-media.com/lodging/16000000/15840000/15835100/15835033/3ac19564.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium''),
    (39, 9, N''https://images.trvl-media.com/lodging/1000000/920000/916400/916376/eca80ca3.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium''),
    (40, 9, N''https://images.trvl-media.com/lodging/1000000/920000/916400/916376/2e585f43.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium''),
    (41, 9, N''https://images.trvl-media.com/lodging/1000000/920000/916400/916376/c3b4f65a.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium''),
    (42, 9, N''https://images.trvl-media.com/lodging/1000000/920000/916400/916376/8b412d08.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium'');
    INSERT INTO [Images] ([Id], [RoomId], [Source])
    VALUES (43, 9, N''https://images.trvl-media.com/lodging/1000000/920000/916400/916376/60315e6d.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium''),
    (44, 10, N''https://images.trvl-media.com/lodging/1000000/920000/916400/916376/d020b03c.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium''),
    (45, 10, N''https://images.trvl-media.com/lodging/1000000/920000/916400/916376/76e3960e.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium''),
    (46, 10, N''https://images.trvl-media.com/lodging/1000000/920000/916400/916376/2e585f43.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium''),
    (47, 10, N''https://images.trvl-media.com/lodging/1000000/920000/916400/916376/eca80ca3.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium''),
    (48, 10, N''https://images.trvl-media.com/lodging/1000000/920000/916400/916376/acd56094.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium''),
    (49, 10, N''https://images.trvl-media.com/lodging/1000000/920000/916400/916376/11f2b0fe.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium''),
    (50, 11, N''https://images.trvl-media.com/lodging/1000000/920000/916400/916376/8715314f.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium''),
    (51, 11, N''https://images.trvl-media.com/lodging/1000000/920000/916400/916376/2e585f43.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium''),
    (52, 11, N''https://images.trvl-media.com/lodging/1000000/920000/916400/916376/eca80ca3.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium''),
    (53, 11, N''https://images.trvl-media.com/lodging/1000000/920000/916400/916376/1b7de5ef.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium''),
    (54, 11, N''https://images.trvl-media.com/lodging/1000000/920000/916400/916376/9c55692c.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium''),
    (55, 11, N''https://images.trvl-media.com/lodging/1000000/920000/916400/916376/11f2b0fe.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium''),
    (56, 12, N''https://images.trvl-media.com/lodging/1000000/920000/916400/916376/58871759.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium''),
    (57, 12, N''https://images.trvl-media.com/lodging/1000000/920000/916400/916376/2e585f43.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium''),
    (58, 12, N''https://images.trvl-media.com/lodging/1000000/920000/916400/916376/eca80ca3.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium''),
    (59, 12, N''https://images.trvl-media.com/lodging/1000000/920000/916400/916376/2ded8747.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium''),
    (60, 12, N''https://images.trvl-media.com/lodging/1000000/920000/916400/916376/b437570e.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium''),
    (61, 12, N''https://images.trvl-media.com/lodging/1000000/920000/916400/916376/60315e6d.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium''),
    (62, 13, N''https://images.trvl-media.com/lodging/1000000/920000/916400/916376/ef867c3b.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium''),
    (63, 13, N''https://images.trvl-media.com/lodging/1000000/920000/916400/916376/2e585f43.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium''),
    (64, 13, N''https://images.trvl-media.com/lodging/1000000/920000/916400/916376/eca80ca3.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium''),
    (65, 13, N''https://images.trvl-media.com/lodging/1000000/920000/916400/916376/b437570e.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium''),
    (66, 13, N''https://images.trvl-media.com/lodging/1000000/920000/916400/916376/60315e6d.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium''),
    (67, 13, N''https://images.trvl-media.com/lodging/1000000/920000/916400/916376/8b412d08.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium''),
    (68, 13, N''https://images.trvl-media.com/lodging/1000000/920000/916400/916376/ef867c3b.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium''),
    (69, 14, N''https://images.trvl-media.com/lodging/1000000/920000/916400/916376/9c55692c.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium''),
    (70, 14, N''https://images.trvl-media.com/lodging/1000000/920000/916400/916376/2e585f43.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium''),
    (71, 14, N''https://images.trvl-media.com/lodging/1000000/920000/916400/916376/eca80ca3.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium''),
    (72, 14, N''https://images.trvl-media.com/lodging/1000000/920000/916400/916376/b437570e.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium''),
    (73, 14, N''https://images.trvl-media.com/lodging/1000000/920000/916400/916376/60315e6d.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium''),
    (74, 14, N''https://images.trvl-media.com/lodging/1000000/920000/916400/916376/8b412d08.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium''),
    (75, 15, N''https://images.trvl-media.com/lodging/3000000/2620000/2614700/2614694/ea540433.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium''),
    (76, 15, N''https://images.trvl-media.com/lodging/3000000/2620000/2614700/2614694/2b8b7804.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium''),
    (77, 15, N''https://images.trvl-media.com/lodging/3000000/2620000/2614700/2614694/26bab1f5.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium''),
    (78, 15, N''https://images.trvl-media.com/lodging/3000000/2620000/2614700/2614694/496c6b5a.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium''),
    (79, 15, N''https://images.trvl-media.com/lodging/3000000/2620000/2614700/2614694/2f36defd.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium''),
    (80, 15, N''https://images.trvl-media.com/lodging/3000000/2620000/2614700/2614694/ea540433.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium''),
    (81, 15, N''https://images.trvl-media.com/lodging/3000000/2620000/2614700/2614694/2b8b7804.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium''),
    (82, 15, N''https://images.trvl-media.com/lodging/3000000/2620000/2614700/2614694/26bab1f5.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium''),
    (83, 16, N''https://images.trvl-media.com/lodging/3000000/2620000/2614700/2614694/406a3697.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium''),
    (84, 16, N''https://images.trvl-media.com/lodging/3000000/2620000/2614700/2614694/fa9c4653.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium'');
    INSERT INTO [Images] ([Id], [RoomId], [Source])
    VALUES (85, 16, N''https://images.trvl-media.com/lodging/3000000/2620000/2614700/2614694/14f420c8.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium''),
    (86, 16, N''https://images.trvl-media.com/lodging/3000000/2620000/2614700/2614694/c71aa3a5.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium''),
    (87, 16, N''https://images.trvl-media.com/lodging/3000000/2620000/2614700/2614694/549de7ab.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium''),
    (88, 16, N''https://images.trvl-media.com/lodging/3000000/2620000/2614700/2614694/a4557c21.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium''),
    (89, 16, N''https://images.trvl-media.com/lodging/3000000/2620000/2614700/2614694/72dc8d9c.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium''),
    (90, 17, N''https://images.trvl-media.com/lodging/3000000/2620000/2614700/2614694/10371176.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium''),
    (91, 17, N''https://images.trvl-media.com/lodging/3000000/2620000/2614700/2614694/549de7ab.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium''),
    (92, 17, N''https://images.trvl-media.com/lodging/3000000/2620000/2614700/2614694/c71aa3a5.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium''),
    (93, 17, N''https://images.trvl-media.com/lodging/3000000/2620000/2614700/2614694/16a596de.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium''),
    (94, 17, N''https://images.trvl-media.com/lodging/3000000/2620000/2614700/2614694/72dc8d9c.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium''),
    (95, 17, N''https://images.trvl-media.com/lodging/3000000/2620000/2614700/2614694/10371176.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium''),
    (96, 18, N''https://images.trvl-media.com/lodging/3000000/2620000/2614700/2614694/406a3697.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium''),
    (97, 18, N''https://images.trvl-media.com/lodging/3000000/2620000/2614700/2614694/67b0e7dc.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium''),
    (98, 18, N''https://images.trvl-media.com/lodging/3000000/2620000/2614700/2614694/549de7ab.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium''),
    (99, 18, N''https://images.trvl-media.com/lodging/3000000/2620000/2614700/2614694/95f52722.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium''),
    (100, 18, N''https://images.trvl-media.com/lodging/3000000/2620000/2614700/2614694/d3c76ffb.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium''),
    (101, 18, N''https://images.trvl-media.com/lodging/3000000/2620000/2614700/2614694/715be0ff.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium''),
    (102, 19, N''https://images.trvl-media.com/lodging/3000000/2620000/2614700/2614694/a2a0d8cd.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium''),
    (103, 19, N''https://images.trvl-media.com/lodging/3000000/2620000/2614700/2614694/029d4d4c.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium''),
    (104, 19, N''https://images.trvl-media.com/lodging/3000000/2620000/2614700/2614694/411ebc16.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium''),
    (105, 19, N''https://images.trvl-media.com/lodging/3000000/2620000/2614700/2614694/d09117ce.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium''),
    (106, 19, N''https://images.trvl-media.com/lodging/3000000/2620000/2614700/2614694/c9d0a60d.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium''),
    (107, 20, N''https://images.trvl-media.com/lodging/3000000/2620000/2614700/2614694/2b8b7804.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium''),
    (108, 20, N''https://images.trvl-media.com/lodging/3000000/2620000/2614700/2614694/a263f2a2.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium''),
    (109, 20, N''https://images.trvl-media.com/lodging/3000000/2620000/2614700/2614694/2056565d.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium''),
    (110, 20, N''https://images.trvl-media.com/lodging/3000000/2620000/2614700/2614694/e498958a.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium''),
    (111, 20, N''https://images.trvl-media.com/lodging/3000000/2620000/2614700/2614694/4f130092.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium'')');
    IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'Id', N'RoomId', N'Source') AND [object_id] = OBJECT_ID(N'[Images]'))
        SET IDENTITY_INSERT [Images] OFF;
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230606175500_init')
BEGIN
    CREATE INDEX [IX_BookedDates_RoomId] ON [BookedDates] ([RoomId]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230606175500_init')
BEGIN
    CREATE INDEX [IX_Images_RoomId] ON [Images] ([RoomId]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230606175500_init')
BEGIN
    CREATE INDEX [IX_Rooms_HotelId] ON [Rooms] ([HotelId]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230606175500_init')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20230606175500_init', N'7.0.4');
END;
GO

COMMIT;
GO

