import { prisma } from '../src/lib/prisma'

async function seed() {
    await prisma.event.create({
        data: {
            id: '5f82a4af-b1d8-4a24-8a7d-3614ea73ba61',
            title: 'Unite Summit',
            slug: 'unite-summit',
            details: 'Um evento para devs',
            maximumAttendees: 120,
        }
    })
}

seed().then(() => {
    console.log('DataBase seeded')
    prisma.$disconnect()
})