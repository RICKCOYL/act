/*
 * How I sorta handled it:
 *
 * 1. The Goal
 *    I needed the smallest possible roof length that could cover at least  k cars  on a line.
 *    The cars aren’t in one place, they’re scattered at different spots.
 *
 * 2. What I picked as the approach
 *    I sorted the parking spots from low to high. Once they’re in order, any set of  k cars that sit together in the “best” way will show up as some consecutive slice in that sorted list.
 *    Also, if the roof covers exactly  k cars, it really only has to stretch from the first car in that slice to the last car in it. not more.
 *
 * 3. The actual process
 *    Sort all car positions smallest to largest .
 *    Then I loop through, checking every window of size k. If a window starts at i, the car that’s the k-th one in that window ends up at index i + k - 1.
 *    The needed roof length for that window becomes (position of that last car)  -  (position of the first car) + 1.
 *    I keep the minimum length I’ve seen so far, and in the end I return it , like , finished.
 */
function carParkingRoof(cars, k) {
    if (!cars || cars.length === 0 || k <= 0) {
        return 0;
    }

    cars.sort((a, b) => a - b);

    let minLength = Infinity;

    for (let i = 0; i <= cars.length - k; i++) {
        const currentLength = cars[i + k - 1] - cars[i] + 1;
        if (currentLength < minLength) {
            minLength = currentLength;
        }
    }

    return minLength;
}
