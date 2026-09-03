import { DeliveryStatus, PrismaClient, UserRole } from "@prisma/client";

const prisma = new PrismaClient();

const customers = [
    ["Lotte Aerts", "Kerkstraat", "18", "2960", "Brecht"],
    ["Milan Jacobs", "Molenstraat", "42", "2960", "Sint-Lenaarts"],
    ["Nora Vermeulen", "Kloosterstraat", "7", "2960", "Brecht"],
    ["Finn Claes", "Bredabaan", "201", "2930", "Brasschaat"],
    ["Mila Peeters", "Dorpsstraat", "88", "2990", "Wuustwezel"],
    ["Lina De Smet", "Brechtsesteenweg", "116", "2900", "Schoten"],
    ["Sep Van Acker", "Loenhoutsebaan", "34", "2990", "Wuustwezel"],
    ["Ella Willems", "Kapelstraat", "12", "2960", "Brecht"],
    ["Otis Maes", "Handelslei", "55", "2980", "Zoersel"],
    ["Noor Hermans", "Heiken", "9", "2960", "Sint-Job-in-'t-Goor"],
    ["Vic De Clercq", "Eikenlei", "103", "2960", "Brecht"],
    ["Lena Wouters", "Mieksebaan", "21", "2930", "Brasschaat"],
    ["Cas De Vos", "Kalmthoutsesteenweg", "76", "2990", "Wuustwezel"],
    ["Louise Mertens", "Koningin Astridlaan", "14", "2900", "Schoten"],
    ["Bram Simons", "Gemeenteplaats", "3", "2960", "Brecht"],
] as const;

async function main() {
    const driver = await prisma.user.upsert({
        where: { email: "chauffeur@palethoeve.local" },
        update: {},
        create: { name: "Tom Peeters", email: "chauffeur@palethoeve.local", passwordHash: "demo-only", role: UserRole.DRIVER },
    });
    await prisma.user.upsert({
        where: { email: "admin@palethoeve.local" },
        update: {},
        create: { name: "Els Verhoeven", email: "admin@palethoeve.local", passwordHash: "demo-only", role: UserRole.ADMIN },
    });
    const route = await prisma.route.create({ data: { name: "Route 1", routeDate: new Date(), startAddress: "De Palethoeve, Brecht", assignedDriverId: driver.id, estimatedKm: 38.4, estimatedMins: 78 } });
    for (const [index, [name, street, houseNumber, postalCode, city]] of customers.entries()) {
        const customer = await prisma.customer.create({ data: { name, street, houseNumber, postalCode, city } });
        await prisma.delivery.create({ data: { routeId: route.id, customerId: customer.id, customerName: name, street, houseNumber, postalCode, city, mealCount: (index % 3) + 1, routeOrder: index + 1, status: index < 2 ? DeliveryStatus.DELIVERED : index === 2 ? DeliveryStatus.ACTIVE : DeliveryStatus.PENDING, completedAt: index < 2 ? new Date() : undefined } });
    }
    console.log(`Seeded ${customers.length} demo customers and route ${route.name}.`);
}

main().finally(() => prisma.$disconnect());
