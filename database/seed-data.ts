
interface SeedData {
    entries: SeedEntry[];
}

interface SeedEntry {
    description: string;
    status: string;
    createdAt: number;
}




export const seedData: SeedData ={
    entries: [
        {
            description: 'Pending: Proident dolor duis elit sunt qui dolor laborum beniam ea laboris qui consequat.',
            status: 'pending',
            createdAt: Date.now()
        },
        {
            description: 'Progress: Veniam dolor duis elit sunt qui dolor laborum beniam ea laboris qui consequat.',
            status: 'in-progress',
            createdAt: Date.now() - 1000000
        },
        {
            description: 'Finished: Comodo dolor duis elit sunt qui dolor laborum beniam ea laboris qui consequat.',
            status: 'finished',
            createdAt: Date.now() - 100000
        },
    ]
}