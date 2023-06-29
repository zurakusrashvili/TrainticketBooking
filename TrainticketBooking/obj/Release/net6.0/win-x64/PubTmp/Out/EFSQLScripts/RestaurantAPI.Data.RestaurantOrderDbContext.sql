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

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230327070154_Init')
BEGIN
    CREATE TABLE [Categories] (
        [Id] int NOT NULL IDENTITY,
        [Name] nvarchar(max) NULL,
        CONSTRAINT [PK_Categories] PRIMARY KEY ([Id])
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230327070154_Init')
BEGIN
    CREATE TABLE [Products] (
        [Id] int NOT NULL IDENTITY,
        [Name] nvarchar(max) NULL,
        [Price] float NOT NULL,
        [Nuts] bit NOT NULL,
        [Image] nvarchar(max) NULL,
        [Vegeterian] bit NOT NULL,
        [Spiciness] int NOT NULL,
        [CategoryId] int NOT NULL,
        CONSTRAINT [PK_Products] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_Products_Categories_CategoryId] FOREIGN KEY ([CategoryId]) REFERENCES [Categories] ([Id]) ON DELETE CASCADE
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230327070154_Init')
BEGIN
    CREATE TABLE [Basket] (
        [Id] int NOT NULL IDENTITY,
        [Quantity] int NOT NULL,
        [Price] float NOT NULL,
        [ProductId] int NOT NULL,
        CONSTRAINT [PK_Basket] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_Basket_Products_ProductId] FOREIGN KEY ([ProductId]) REFERENCES [Products] ([Id]) ON DELETE CASCADE
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230327070154_Init')
BEGIN
    IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'Id', N'Name') AND [object_id] = OBJECT_ID(N'[Categories]'))
        SET IDENTITY_INSERT [Categories] ON;
    EXEC(N'INSERT INTO [Categories] ([Id], [Name])
    VALUES (1, N''Salads''),
    (2, N''Soups''),
    (3, N''Chicken-Dishes''),
    (4, N''Beef-Dishes''),
    (5, N''Seafood-Dishes''),
    (6, N''Vegetable-Dishes''),
    (7, N''Bits&Bites''),
    (8, N''On-The-Side'')');
    IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'Id', N'Name') AND [object_id] = OBJECT_ID(N'[Categories]'))
        SET IDENTITY_INSERT [Categories] OFF;
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230327070154_Init')
BEGIN
    IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'Id', N'CategoryId', N'Image', N'Name', N'Nuts', N'Price', N'Spiciness', N'Vegeterian') AND [object_id] = OBJECT_ID(N'[Products]'))
        SET IDENTITY_INSERT [Products] ON;
    EXEC(N'INSERT INTO [Products] ([Id], [CategoryId], [Image], [Name], [Nuts], [Price], [Spiciness], [Vegeterian])
    VALUES (1, 1, N''https://course-jsbasic.javascript.ru/assets/products/laab_kai_chicken_salad.png'', N''Laab kai chicken salad'', CAST(1 AS bit), 10.0E0, 2, CAST(0 AS bit)),
    (2, 1, N''https://course-jsbasic.javascript.ru/assets/products/som_tam_papaya_salad.png'', N''Som tam papaya salad'', CAST(0 AS bit), 9.5E0, 0, CAST(1 AS bit)),
    (3, 2, N''https://course-jsbasic.javascript.ru/assets/products/tom_yam.png'', N''Tom yam kai'', CAST(0 AS bit), 7.0E0, 3, CAST(0 AS bit)),
    (4, 2, N''https://course-jsbasic.javascript.ru/assets/products/tom_kha.png'', N''Tom kha kai'', CAST(0 AS bit), 7.0E0, 3, CAST(0 AS bit)),
    (5, 2, N''https://course-jsbasic.javascript.ru/assets/products/tom_kha.png'', N''Tom kha koong'', CAST(0 AS bit), 8.0E0, 2, CAST(0 AS bit)),
    (6, 2, N''https://course-jsbasic.javascript.ru/assets/products/tom_yam.png'', N''Tom yam koong'', CAST(0 AS bit), 8.0E0, 4, CAST(0 AS bit)),
    (7, 2, N''https://course-jsbasic.javascript.ru/assets/products/tom_yam.png'', N''Tom yam vegetarian'', CAST(0 AS bit), 7.0E0, 1, CAST(1 AS bit)),
    (8, 2, N''https://course-jsbasic.javascript.ru/assets/products/tom_kha.png'', N''Tom kha vegetarian'', CAST(0 AS bit), 7.0E0, 1, CAST(1 AS bit)),
    (9, 3, N''https://course-jsbasic.javascript.ru/assets/products/sweet_n_sour.png'', N''Sweet ''''n sour chicken'', CAST(1 AS bit), 14.0E0, 2, CAST(0 AS bit)),
    (10, 3, N''https://course-jsbasic.javascript.ru/assets/products/chicken_cashew.png'', N''Chicken cashew'', CAST(1 AS bit), 14.0E0, 1, CAST(0 AS bit)),
    (11, 3, N''https://course-jsbasic.javascript.ru/assets/products/kai_see_ew.png'', N''Kai see ew'', CAST(0 AS bit), 14.0E0, 4, CAST(0 AS bit)),
    (12, 4, N''https://course-jsbasic.javascript.ru/assets/products/beef_massaman.png'', N''Beef massaman'', CAST(0 AS bit), 14.5E0, 2, CAST(0 AS bit)),
    (13, 5, N''https://course-jsbasic.javascript.ru/assets/products/chu_chee.png'', N''Seafood chu chee'', CAST(0 AS bit), 16.0E0, 2, CAST(0 AS bit)),
    (14, 5, N''https://course-jsbasic.javascript.ru/assets/products/red_curry.png'', N''Penang shrimp'', CAST(1 AS bit), 16.0E0, 4, CAST(0 AS bit)),
    (15, 6, N''https://course-jsbasic.javascript.ru/assets/products/green_curry.png'', N''Green curry veggies'', CAST(1 AS bit), 12.5E0, 0, CAST(1 AS bit)),
    (16, 6, N''https://course-jsbasic.javascript.ru/assets/products/tofu_cashew.png'', N''Tofu cashew'', CAST(1 AS bit), 12.5E0, 0, CAST(1 AS bit)),
    (17, 6, N''https://course-jsbasic.javascript.ru/assets/products/red_curry_vega.png'', N''Red curry veggies'', CAST(0 AS bit), 12.5E0, 4, CAST(1 AS bit)),
    (18, 6, N''https://course-jsbasic.javascript.ru/assets/products/krapau_vega.png'', N''Krapau tofu'', CAST(0 AS bit), 12.5E0, 0, CAST(1 AS bit)),
    (19, 7, N''https://course-jsbasic.javascript.ru/assets/products/kroepoek.png'', N''Prawn crackers'', CAST(0 AS bit), 2.5E0, 1, CAST(0 AS bit)),
    (20, 7, N''https://course-jsbasic.javascript.ru/assets/products/fish_cakes.png'', N''Fish cakes'', CAST(0 AS bit), 6.5E0, 1, CAST(0 AS bit)),
    (21, 7, N''https://course-jsbasic.javascript.ru/assets/products/sate.png'', N''Chicken satay'', CAST(0 AS bit), 6.5E0, 1, CAST(0 AS bit)),
    (22, 7, N''https://course-jsbasic.javascript.ru/assets/products/satesaus.png'', N''Satay sauce'', CAST(0 AS bit), 1.5E0, 2, CAST(0 AS bit)),
    (23, 7, N''https://course-jsbasic.javascript.ru/assets/products/koong_hom_pha.png'', N''Shrimp springrolls'', CAST(0 AS bit), 6.5E0, 3, CAST(0 AS bit)),
    (24, 7, N''https://course-jsbasic.javascript.ru/assets/products/mini_vega_springrolls.png'', N''Mini vegetarian spring rolls'', CAST(0 AS bit), 6.5E0, 2, CAST(0 AS bit)),
    (25, 7, N''https://course-jsbasic.javascript.ru/assets/products/chicken_loempias.png'', N''Chicken springrolls'', CAST(0 AS bit), 6.5E0, 2, CAST(0 AS bit)),
    (26, 8, N''https://course-jsbasic.javascript.ru/assets/products/fried_rice.png'', N''Thai fried rice'', CAST(0 AS bit), 7.5E0, 2, CAST(0 AS bit)),
    (27, 8, N''https://course-jsbasic.javascript.ru/assets/products/kroepoek.png'', N''Fresh prawn crackers'', CAST(0 AS bit), 2.5E0, 1, CAST(0 AS bit))');
    IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'Id', N'CategoryId', N'Image', N'Name', N'Nuts', N'Price', N'Spiciness', N'Vegeterian') AND [object_id] = OBJECT_ID(N'[Products]'))
        SET IDENTITY_INSERT [Products] OFF;
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230327070154_Init')
BEGIN
    CREATE INDEX [IX_Basket_ProductId] ON [Basket] ([ProductId]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230327070154_Init')
BEGIN
    CREATE INDEX [IX_Products_CategoryId] ON [Products] ([CategoryId]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230327070154_Init')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20230327070154_Init', N'7.0.4');
END;
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230511110416_init2')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20230511110416_init2', N'7.0.4');
END;
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230511110533_test')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20230511110533_test', N'7.0.4');
END;
GO

COMMIT;
GO

