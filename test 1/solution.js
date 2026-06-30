/*
 * So I did it like this, well kinda:
 *
 * 1. The idea:
 *    We need to figure out how many “countries” there are, meaning groups of neighboring cells that share the same color or value. The map can be huge, like up to 300,000 cells or more.
 *
 * 2. Picking the approach:
 *    - If you try plain recursion (DFS), yeah it can fall apart, because the grid is too big, stack gets angry.
 *    - BFS with a queue is generally safe from crashes, but it ends up being kinda slow, because making tons of small coordinate objects pairs in JavaScript costs time.
 *    - So instead I used Union-Find, basically a grouping structure. It’s super quick, it doesn’t really crash on large grids, and it barely uses extra memory, or at least that’s how it feels.
 *
 * 3. What actually happens:
 *    - Each cell gets one ID, like flattening it into a simple list rather than treating it as a 2D board.
 *    - I start with the assumption that every cell is its own country.
 *    - Then I scan the grid in order, and I compare each cell with the one on the right, and also the one underneath it.
 *    - When two cells match in color, we glue them into the same group. Each time we glue, the total count of countries drops by 1, not magic, just bookkeeping.
 *    - I also add path compression, that little trick that makes “find” and merge operations stay fast.
 */
function solution(A) {
    const N = A.length;
    if (N === 0) return 0;
    const M = A[0].length;
    if (M === 0) return 0;

    const size = N * M;
    const parent = new Int32Array(size);
    for (let i = 0; i < size; i++) {
        parent[i] = i;
    }

    function find(i) {
        let root = i;
        while (parent[root] !== root) {
            root = parent[root];
        }
        let curr = i;
        while (curr !== root) {
            const next = parent[curr];
            parent[curr] = root;
            curr = next;
        }
        return root;
    }

    let count = size;

    function union(i, j) {
        const rootI = find(i);
        const rootJ = find(j);
        if (rootI !== rootJ) {
            parent[rootI] = rootJ;
            count--;
            return true;
        }
        return false;
    }

    for (let r = 0; r < N; r++) {
        for (let c = 0; c < M; c++) {
            const val = A[r][c];
            const idx = r * M + c;

            if (c + 1 < M && A[r][c + 1] === val) {
                union(idx, idx + 1);
            }
            if (r + 1 < N && A[r + 1][c] === val) {
                union(idx, idx + M);
            }
        }
    }

    return count;
}

module.exports = { solution };
