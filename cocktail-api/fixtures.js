const mongoose = require("mongoose");
const config = require("./config");
const Cocktail = require("./models/Cocktail");
const { nanoid } = require("nanoid");
const User = require("./models/User");

mongoose.connect(config.db.url + '/' + config.db.name, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.once("open", async () => {
    try {
        await db.dropCollection("users");
        await db.dropCollection("cocktails");
    } catch (e) {
        console.log("Collection were not presented, skipping drop...");
    };

    const [user, admin] = await User.create(
        {
            token: nanoid(),
            displayName: 'Vasya',
        },
        {
            token: nanoid(),
            displayName: 'Admin Vasya',
            role: 'admin',
        }
    );

    await Cocktail.create(
        {
            userID: user._id,
            name: "Unpublished Item",
            image: "strawberry_margarita.jpg",
            recipe: "Rub rim of cocktail glass with lemon juice and dip rim in salt. Shake schnapps, tequila, triple sec, lemon juice, and strawberries with ice, strain into the salt-rimmed glass, and serve.",
            published: false,
            ingredients: [
                {
                    name: 'Strawberry schnapps',
                    amount: '1/2 oz',
                },
                {
                    name: 'Tequila',
                    amount: '1 oz',
                },
                {
                    name: 'Triple sec',
                    amount: '1/2 oz',
                },
                {
                    name: 'Lemon juice',
                    amount: '1 oz',
                },
                {
                    name: 'Strawberries',
                    amount: '1 oz',
                },],
        },
        {
            userID: user._id,
            name: "Margarita",
            image: "margarita.jpg",
            recipe: "Rub the rim of the glass with the lime slice to make the salt stick to it. Take care to moisten only the outer rim and sprinkle the salt on it. The salt should present to the lips of the imbiber and never mix into the cocktail. Shake the other ingredients with ice, then carefully pour into the glass.",
            published: true,
            ingredients: [
                {
                    name: 'Tequila',
                    amount: '1 1/2 oz',
                },
                {
                    name: 'Triple sec',
                    amount: '1/2 oz',
                },
                {
                    name: 'Lime juice',
                    amount: '1 oz',
                },],
        },
        {
            userID: user._id,
            name: "Blue Margarita",
            image: "blue_margarita.jpg",
            recipe: "Rub rim of cocktail glass with lime juice. Dip rim in coarse salt. Shake tequila, blue curacao, and lime juice with ice, strain into the salt-rimmed glass, and serve.",
            published: true,
            ingredients: [
                {
                    name: 'Tequila',
                    amount: '1 1/2 oz',
                },
                {
                    name: 'Blue Curacao',
                    amount: '1 oz',
                },
                {
                    name: 'Lime juice',
                    amount: '1 oz',
                },
                {
                    name: 'Salt',
                    amount: 'Coarse',
                },],
        },
        {
            userID: user._id,
            name: "Tommy's Margarita",
            image: "tommy_s_margarita.jpg",
            recipe: "Shake and strain into a chilled cocktail glass.",
            published: true,
            ingredients: [
                {
                    name: 'Tequila',
                    amount: '4.5 cl',
                },
                {
                    name: '1.5 cl',
                    amount: '1/2 oz',
                },
                {
                    name: 'Agave syrup',
                    amount: '2 spoons',
                },],
        },
        {
            userID: user._id,
            name: "Whitecap Margarita",
            image: "whitecap_margarita.jpg",
            recipe: "Place all ingredients in a blender and blend until smooth. This makes one drink.",
            published: true,
            ingredients: [
                {
                    name: 'Tequila',
                    amount: '2 oz',
                },
                {
                    name: 'Ice',
                    amount: '1 cup',
                },
                {
                    name: 'Cream of coconut',
                    amount: '1/4 cup',
                },
                {
                    name: 'Lime juice',
                    amount: '3 tblsp fresh',
                },],
        },
        {
            userID: user._id,
            name: "Strawberry Margarita",
            image: "strawberry_margarita.jpg",
            recipe: "Rub rim of cocktail glass with lemon juice and dip rim in salt. Shake schnapps, tequila, triple sec, lemon juice, and strawberries with ice, strain into the salt-rimmed glass, and serve.",
            published: true,
            ingredients: [
                {
                    name: 'Strawberry schnapps',
                    amount: '1/2 oz',
                },
                {
                    name: 'Tequila',
                    amount: '1 oz',
                },
                {
                    name: 'Triple sec',
                    amount: '1/2 oz',
                },
                {
                    name: 'Lemon juice',
                    amount: '1 oz',
                },
                {
                    name: 'Strawberries',
                    amount: '1 oz',
                },],
        },
    );

    db.close();
});