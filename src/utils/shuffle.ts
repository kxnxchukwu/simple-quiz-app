export function shuffleArray<T>(array: T[]): T[] {
    // Make a copy of the array to avoid modifying the original
    const shuffledArray = [...array];

    // Loop through the array from the end to the beginning
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        // Generate a random index between 0 and i
        const j = Math.floor(Math.random() * (i + 1));

        // Swap the elements at indices i and j
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }

    return shuffledArray;
}