---
draft: false
title: "Lecture 3 - Algorithms II: complexity, sorting and knapsack"
paper: "ST444 Computational Data Science"
year: "M.S. Statistics (LSE)"
section: "Computation"
description: "Worst-case analysis and Big-O, Big-Ω and Big-Θ, P vs NP, merge sort and the Ω(n log n) lower bound for comparison sorts, quicksort and pivot choice, and the 0/1 knapsack problem by dynamic programming."
order: 3
tags: [statistics, computation, algorithms]
---

ST444, LSE, Autumn Term 2026, week 3. Reading: Cormen, Leiserson, Rivest and Stein, *Introduction to Algorithms*, Ch. 1 to 4, 7, 8.1 and 9. The median section and expression trees are non-examinable.

## Cheat sheet

- **Worst-case running time** T(n): maximum number of basic operations over all inputs of size n. Easier to analyse than the average case, and what applications need.
- **findMax:** at most 3n − 1 basic operations, so $a(3n-1)\le T(n)\le b(3n-1)$: bounded by two linear functions, Θ(n).
- **Big-O:** f is O(g) if there exist c > 0 and $n_0$ with $f(n)\le c\,g(n)$ for n ≥ $n_0$ (upper bound). **Big-Ω:** $f(n)\ge c\,g(n)$ (lower bound). **Big-Θ:** both (growth rate pinned down).
- **Rules:** a degree-d polynomial is O($n^d$); drop constants and lower-order terms; use the smallest, simplest class.
- **Doubling n:** time ×2 for Θ(n), ×4 for Θ(n²), ×8 for Θ(n³). Needs Θ (i.e. $T(n)\approx cn^k$), not just O.
- **P:** problems solvable in polynomial time. **NP:** solutions verifiable in polynomial time. P ⊆ NP. TSP (decision), knapsack and generalised Sudoku are NP-complete.
- **Merge sort:** divide in half, sort halves recursively, merge in O($m_1+m_2$). log₂ n levels × O(n) work per level = **O(n log n)**.
- **Comparison-sort lower bound:** the decision tree needs at least n! leaves; height h ≥ log₂(n!) ≥ (n/2) log₂(n/2), so **Ω(n log n)** comparisons in the worst case. Merge sort is optimal up to constants.
- **Quicksort:** pick a pivot, partition into ≤ and ≥, recurse. Worst case $T(n)=T(n-1)+cn=O(n^2)$; best case $T(n)=2T(n/2)+cn=O(n\log n)$; average O(n log n), about $2(n+1)H_n-4n\approx1.39\,n\log_2n$ comparisons (leading order).
- **Pivot choice:** first element is O(n²) on sorted input; a random pivot is safe; median-of-three is cheap and avoids the sorted-input worst case.
- **Small arrays:** insertion sort (worst ≈ n²/2 comparisons, O(n) on nearly sorted input) beats quicksort for roughly n ≤ 10 to 20.
- **Knapsack DP:** $m[0,w]=0$; $m[i,w]=m[i-1,w]$ if $w_i>w$; else $m[i,w]=\max(m[i-1,w],\,m[i-1,w-w_i]+v_i)$. Answer m[n, W]. Time **O(nW)**, pseudo-polynomial.
- **Greedy by** $v_i/w_i$ **fails** for 0/1 knapsack: W = 50, items (10, 60), (20, 100), (30, 120): greedy 160, optimum 220.
- **Slide 74 example:** w = (12, 2, 1, 1, 4), v = (4, 2, 2, 1, 10), W = 15 gives 15.

## Analysis of algorithms: what we measure

Two questions for any algorithm: **how long** does it run, and **how much memory** does it need? Both depend on the **input size** n.

- Most algorithms transform input objects into output objects, and running time typically grows with n.
- The **average case** is often hard to determine (it needs a distribution over inputs). The focus is the **worst case**: easier to analyse, and crucial for applications such as games, finance and robotics, where a guarantee matters.

## Experimental studies and their limits

The empirical route: implement, run on inputs of varying size and composition, time it with `time.perf_counter()` in Python or `system.time()` in R, and plot. Theoretical analysis is usually preferred.

- **Bubble sort timings** (Python, random floats, timing starts after the input is created): n = 200: 0.012 s; 1,000: 0.127 s; 5,000: 3.162 s; 10,000: 12.103 s; 20,000: 48.033 s. Runtime grows quadratically.
- Check: 48.033/12.103 = 3.97 and 12.103/3.162 = 3.83 per doubling, close to 4 = 2². The least-squares slope of log(time) on log(n) is about 2.0 for n ≥ 1,000.

**Limitations** of experiments:

1. The algorithm has to be implemented, which may be difficult, and some inefficient algorithms never finish.
2. Results may not be indicative for **inputs not included in the experiment**.
3. Comparing two algorithms needs the **same hardware and software environment**.

**Theoretical analysis** fixes all three: it uses a high-level description (pseudocode), characterises running time as a function of n, covers **all possible inputs**, and is independent of hardware and software.

## Counting basic operations: findMax

Inspect the pseudocode and count the maximum number of basic operations as a function of n.

| Step | # operations (worst case) |
| --- | --- |
| currentMax ← $X_1$ | 1 |
| for i = 2, …, n (loop counter) | n − 1 |
| if $X_i$ > currentMax (comparison) | n − 1 |
| currentMax ← $X_i$ (assignment) | n − 1 (at most) |
| return currentMax | 1 |
| **Total** | **3n − 1** |

- Conventions differ on whether the function call itself counts as an operation; it changes the total by a constant and so never matters for the growth rate.
- Worst case for the assignment line: **increasing** input, where every $X_i$ is a new maximum.

## From operation counts to running time

Let a be the time of the fastest basic operation and b of the slowest (nanoseconds, $10^{-9}$ s). If T(n) is the worst-case time of findMax,

$$
a(3n-1)\le T(n)\le b(3n-1).
$$

**T(n) is bounded by two linear functions.** The constants a and b do not really matter; the size of n is what determines most of the runtime.

- **Not all operations are equal:** integer add 2.1 ns, multiply 2.4, integer divide 5.4, float add 4.5, float multiply 4.2, float divide 13.5, sin 91.3, atan2 129.0 (one laptop).
- **Changing hardware or software affects T(n) by a constant factor but does not alter its growth rate.** The linear growth of findMax is an intrinsic property of the algorithm.

### Exercise: findRange, bubble sort, and a bonus

1. **findRange** (max minus min). Run findMax twice (once on the negated values for the min), giving $2(3n-1)+1=6n-1$. A single pass keeping both min and max is also linear. Either way **Θ(n)**.
2. **Bubble sort.** Pass i compares n − i adjacent pairs, so total comparisons $\sum_{i=1}^{n-1}(n-i)=n(n-1)/2$, plus at most as many swaps: **Θ(n²)**.
3. **Bonus: about 3n/2 comparisons.** Two separate scans use 2(n − 1). Instead take elements in pairs: compare the two (1 comparison), then the larger with the current max and the smaller with the current min (2 more). That is 3 comparisons per 2 elements, about **3n/2 − 2** in total (n even: initialise from the first pair with 1 comparison, then 3 for each of the remaining (n − 2)/2 pairs).

> **Check.** n = 10: two scans 18 comparisons; pairwise 1 + 3 × 4 = 13 = 3(10)/2 − 2.

## Growth rates and Big-O, Big-Ω, Big-Θ

Growth rate matters more than constants. At $10^9$ operations per second, $2^{64}$ operations take about 585 years; at n = 1,024, $n^2\approx10^6$, $n^3\approx10^9$, $2^n\approx1.8\times10^{308}$ (which does not fit in a double).

**Big-O (upper bound).** To simplify, **ignore constants and lower-order terms**: $10n^3+4n^2-4n+5$ is O(n³).

$$
f(n)\text{ is }O(g(n))\iff\exists\,c>0,\ n_0:\ f(n)\le c\,g(n)\ \text{for all } n\ge n_0.
$$

- Example: n² is not O(n), since $n^2\le cn$ fails for n > c.
- Rules: a degree-d polynomial is O($n^d$); use the **smallest** class ("2n is O(n)", not O(n²)) and the **simplest** expression ("3n + 5 is O(n)", not O(3n)).

$$
f\in\Omega(g)\iff\exists\,c>0,n_0:\ f(n)\ge c\,g(n)\ (n\ge n_0);\qquad f\in\Theta(g)\iff f\in O(g)\text{ and }f\in\Omega(g).
$$

- Ω is the minimum order and Θ the exact order: 3n − 1 is Θ(n), it really grows like n. Bubble sort's worst case is Θ(n²); n² is O(n³) but not Θ(n³).
- Stochastic analogue (ST460): $X_n=O_p(a_n)$ means $X_n/a_n$ is bounded in probability, e.g. $\bar X_n-\mu=O_p(n^{-1/2})$.
- **Statements such as "doubling n quadruples the time" need Θ, not just O.** The sorting lower bound later is an Ω statement.

## Doubling examples

Assume $T(n)\approx cn^k$ for large n (i.e. Θ($n^k$)); an O-bound alone would be assuming the upper bound is the exact bound. Then

$$
\frac{T(2n)}{T(n)}\approx\frac{c(2n)^k}{cn^k}=2^k.
$$

- O(n²), 5 s at n gives $5\times2^2=20$ s at 2n. O(n): 10 s. O(n³): 40 s.

> The doubling rule comes from the ratio $T(2n)/T(n)=2^k$, not from the derivative dT/dn. The derivative is not part of the argument and would mislead on, say, n log n, where the ratio is $2\log(2n)/\log n$, slightly above 2.

## P vs NP

**Travelling salesman (decision version):** given cities and pairwise distances, is there a tour visiting each city exactly once with length at most D?

- **Efficient = polynomial time** in the input size: O(n), O(n log n), O(n²), O($n^{10}$), generally O($n^c$). **Non-polynomial:** O($n^{\log n}$), O($2^n$), O(n!) with $n!\sim\sqrt{2\pi n}(n/e)^n$.
- **P:** problems that can be solved efficiently. **NP:** problems where a proposed solution can be checked efficiently. NP stands for **nondeterministic polynomial time**.
- Every problem in P is in NP, so P ⊆ NP. Conjectured: some NP problems (TSP, generalised n² × n² Sudoku) are not in P.
- **NP-complete:** TSP (decision), knapsack, generalised Sudoku. A polynomial algorithm for any one would give one for every NP problem. P vs NP is one of the seven Clay Millennium Prize problems (Poincaré is solved; Perelman, 2002-03).
- The xkcd panel's middle algorithm, O(n²2ⁿ) for TSP, is the Held-Karp dynamic programme: exponential, but far better than brute force O(n!).

## Merge sort: divide and conquer

Bubble sort is O(n²), slow for n > 10,000. Merge sort does better.

**Divide and conquer:** divide S into two disjoint subsets; conquer (solve each recursively); combine. Base cases: size 0 or 1.

```text
Algorithm mergeSort(S)
  Input: sequence S with n elements; Output: S sorted
  if size of S > 1:
      (S1, S2) <- divide(S, n/2)
      mergeSort(S1); mergeSort(S2)
      S <- merge(S1, S2)
```

**Execution on 7 2 9 4 | 3 8 6 1:** split down to single elements, then merge back sorted: 7|2 → 2 7; 9|4 → 4 9; 2 7 + 4 9 → 2 4 7 9; 3 8 → 3 8; 6 1 → 1 6; 3 8 + 1 6 → 1 3 6 8; final 1 2 3 4 6 7 8 9.

**How merge works, with the 2 7 + 4 9 step.** Keep a pointer at the front of each sorted list. Compare the two front elements, output the smaller, advance that pointer.

1. Fronts 2 and 4: output 2.
2. Fronts 7 and 4: output 4.
3. Fronts 7 and 9: output 7.
4. Left list empty: copy 9. Result 2 4 7 9, using 3 comparisons.

> Merge compares the **front (smallest remaining) element of each list**. It works because each list is already sorted, so the smallest remaining element overall must be one of the two fronts; every comparison outputs one element. Note also that "binary sort" usually means binary insertion sort, a different algorithm.

## Analysis of merge sort

1. **Height.** Each call halves the sequence, so the tree has about log₂ n levels: depth i has $2^i$ sequences of size $n/2^i$.
2. **Work per level.** Merging sorted sequences of lengths $m_1,m_2$ needs O($m_1+m_2$) operations. At depth i the sizes add to n, so the work at each level is O(n).
3. **Total:** (number of levels) × (work per level) = O(log n) × O(n) = **O(n log n)**. "Depth of a layer" is its index i, not n.

- **Why merge is O($m_1+m_2$):** each comparison outputs one element and is never repeated, so at most $m_1+m_2-1$ comparisons and exactly $m_1+m_2$ placements. It is not $m_1\cdot m_2$: that would be comparing every element of one list with every element of the other, which sortedness makes unnecessary.
- Summary: bubble sort O(n²), slow, fine only for small data (< 1K); merge sort O(n log n), fast, fine for huge data (> 1M).

## Interlude: e^π or π^e?

Which is bigger, $e^\pi$ or $\pi^e$? And $\pi^{e^\pi}$ or $e^{\pi^e}$? (From *Heard on the Street*.)

In fact $e^\pi\approx23.14>\pi^e\approx22.46$. Rough estimates are risky here: approximating $e^\pi$ by $2^3$ rounds the base down too far, since e ≈ 2.718 gives $2.718^{3.14}\approx23.1$, while $3^{2.7}\approx19.4$ undershoots $\pi^e$.

**Proof without a calculator.**

1. Compare $e^{1/e}$ with $\pi^{1/\pi}$: $e^\pi>\pi^e\iff e^{1/e}>\pi^{1/\pi}$ (raise both sides to the power 1/(eπ)).
2. Let $f(x)=x^{1/x}=e^{\ln x/x}$. Then $\frac{d}{dx}\frac{\ln x}{x}=\frac{1-\ln x}{x^2}$, positive for x < e and negative for x > e, so f has its **unique maximum at x = e**.
3. Hence $f(e)>f(\pi)$, so $e^\pi>\pi^e$.

**Second part.** Compare logs: $\ln\pi^{e^\pi}=e^\pi\ln\pi\approx23.14\times1.1447\approx26.49$ and $\ln e^{\pi^e}=\pi^e\approx22.46$. So $\pi^{e^\pi}>e^{\pi^e}$. (Without numbers: $e^\pi>\pi^e$ and $\ln\pi>1$ give $e^\pi\ln\pi>\pi^e$.)

## Optimality: no comparison sort beats n log n

**Theorem.** Any sorting algorithm that **uses only comparisons between elements** needs **Ω(n log n)** comparisons in the worst case.

**Trees.** Root, parent, child, leaf; a binary tree has at most two children per node; full: every non-leaf has two; perfect: full with all leaves at the same depth.

**Detective game.** 10 suspects, yes/no questions. Each answer can at most halve the set of suspects still possible, so the worst case needs at least $\lceil\log_2 10\rceil=4$ questions. A sorting algorithm plays the same game against n! possible orderings.

**Proof.**

1. **Model.** A comparison sort on n elements is a binary decision tree: each internal node compares $a_i$ with $a_j$, each leaf is an output ordering.
2. **Worst case = height.** The worst-case number of comparisons is the depth of the deepest leaf, h.
3. **Upper bound on leaves.** A binary tree of height h has at most $2^h$ leaves: each node has at most 2 children, and the bound is attained by a perfect tree.
4. **Lower bound on leaves.** The n elements can be arranged in n! ways and each needs its own leaf, so the tree has at least n! leaves.
5. **Combine.** $2^h\ge n!\Rightarrow h\ge\log_2(n!)$.
6. **Bound n!.** The top n/2 factors of n! are each ≥ n/2, so $n!\ge(n/2)^{n/2}$, giving $h\ge\frac n2\log_2\frac n2$, which is Ω(n log n). (The bound $n!\ge n^{n/2}$ is true too, since pairing k with n + 1 − k gives $k(n+1-k)\ge n$.)

- **Stirling:** $\log_2n!=n\log_2n-1.44n+O(\log n)$, and merge sort uses at most about $n\log_2n$ comparisons: **optimal up to lower-order terms**.
- Checks: $\log_2 3!=2.58$, so 3 elements need 3 comparisons in the worst case; $\log_2 10!=21.8$, so sorting 10 items needs at least 22.

> **Where the bound stops.** It applies only to comparison sorts. Counting sort or radix sort on bounded integers run in O(n + k) by reading the values, not comparing them (CLRS Ch. 8, beyond 8.1).

## Quicksort

**One of the fastest known sorting algorithms in practice.** Average O(n log n); worst O(n²), a bad but unlikely case. Like merge sort it is divide and conquer, but **the work is done in the divide step, not the combine step**.

1. **Divide:** pick a **pivot** v. Partition $S\setminus\{v\}$ into $S_1=\{x\le v\}$ and $S_2=\{x\ge v\}$; each element goes into exactly one, ties either way.
2. **Conquer:** recursively sort $S_1$ and $S_2$.
3. **Combine:** output sorted $S_1$, then v, then sorted $S_2$. Nothing extra is needed.

- Illustration: pivot 65 splits {13, 81, 43, 92, 31, 57, 26, 75, 0} into {0, 13, 26, 31, 43, 57} and {75, 81, 92}.

### Partitioning in place, traced

Array 5 6 4 6 3 12 19, pivot 6 (the 6 in position 4).

1. Swap the pivot with the last element: 5 6 4 19 3 12 **6**. Set i = first, j = next-to-last.
2. Goal: $A[p]\le$ pivot for p < i and $A[p]\ge$ pivot for p > j. While i < j: move i right past elements **smaller** than the pivot; move j left past elements **larger** than the pivot.
3. i stops at 6 (≥ 6, position 2); j stops at 3 (≤ 6, position 5). Swap: 5 **3** 4 19 **6** 12 6. The large element is pushed right, the small one left.
4. Continue: i stops at 19 (position 4); j moves left past 19 and stops at 4 (position 3). Now j < i: the pointers have **crossed**, so stop.
5. Swap A[i] with the pivot: 5 3 4 **6** 6 12 19. Everything left of i is ≤ 6, everything right is ≥ 6.

- Elements equal to the pivot stop both i and j. That costs swaps but keeps partitions balanced when there are many duplicates (stopping on equals is the standard safe choice).

### Small n, pivot choice

- For very small arrays quicksort loses to **insertion sort** (build the sorted list one element at a time, like a hand of cards). Insertion sort: worst ≈ n²/2 comparisons, about n on nearly sorted input, in place and stable; used for pieces of up to roughly 10 to 20 elements inside quicksort and Timsort. In the lecture's timings insertion sort is about twice as fast as bubble sort at the same n.
- **First element as pivot:** fine on random input; on presorted or reverse-sorted input every element goes to one side at every call, giving O(n²).
- **Random pivot:** generally safe; random number generation can cost something.
- **Median-of-three** (first, middle, last): cheap, avoids O(n²) on sorted input. In the example, the median of 5, 6 and 19 is 6.

## Quicksort analysis

Assume a random pivot and no cutoff for small arrays. Pivot selection O(1), partitioning O(n), plus two recursive calls:

$$
T(n)=T(i)+T(n-i-1)+cn,\qquad i=|S_1|.
$$

**Worst case:** the pivot is always the smallest element, so i = 0 every time.

1. $T(n)=T(n-1)+cn$ (take T(0) as constant).
2. Unroll n times: $T(n-1)=T(n-2)+c(n-1)$, …, $T(2)=T(1)+2c$.
3. Add up: $T(n)=T(1)+c\sum_{i=2}^ni=T(1)+c\big(\tfrac{n(n+1)}2-1\big)=O(n^2)$.

**Best case:** the pivot is always the median, perfectly balanced.

1. $T(n)=2T(n/2)+cn$, with cn because partitioning is linear in n.
2. Divide by n: $\frac{T(n)}n=\frac{T(n/2)}{n/2}+c$.
3. Repeat: $\frac{T(n/2)}{n/2}=\frac{T(n/4)}{n/4}+c$, …, $\frac{T(2)}2=\frac{T(1)}1+c$.
4. There are log₂ n equations; adding them telescopes: $\frac{T(n)}n=\frac{T(1)}1+c\log_2n$.
5. So $T(n)=nT(1)+cn\log_2n=O(n\log n)$.

**Average case:** if each size of $S_1$ is equally likely, the average is O(n log n). With a random pivot this holds for every input: expected comparisons $2(n+1)H_n-4n$, $H_n=1+\frac12+\dots+\frac1n$.

> **The 1.39 is a leading-order constant.** $2(n+1)H_n-4n\sim2n\ln n=(2\ln2)\,n\log_2n\approx1.386\,n\log_2n$. At n = 1,000 the exact expression is about 10,986 while 1.39 n log₂ n is about 13,852: the −4n and other lower-order terms still matter at moderate n. So quicksort makes more comparisons than merge sort asymptotically, yet is often faster because it works in place and uses the cache well.

## Theory to practice

|  | Best | Average | Worst | Memory | Stable |
| --- | --- | --- | --- | --- | --- |
| Quicksort | n log n | n log n | n² | log n on average (worst n; Sedgewick variation log n) | typical in-place no |
| Merge sort | n log n | n log n | n log n | n (block merge O(1)) | yes |
| Bubble sort | n | n² | n² | 1 | yes |

- **Warning:** asymptotic analysis breaks down for small n.
- Quicksort lives on in hybrids: C++ `std::sort` and NumPy's default `np.sort` are introsort (quicksort switching to heapsort if recursion gets too deep, insertion sort for small pieces); Java uses dual-pivot quicksort for primitives. Python (and Java for objects) uses **Timsort**, a merge/insertion hybrid exploiting existing runs; since Python 3.11 its merge order follows Munro and Wild's Powersort.
- **Timings:** log-log slopes about 2 for bubble and insertion sort, about 1.1 for merge sort and quicksort, about 1.15 for `sorted()`. Constants matter: C-implemented `sorted()` is about 8× faster than the Python quicksort at n = 256,000. Bubble sort takes 0.47 s at n = 4,000; at slope 2, n = 256,000 would take about half an hour.
- Check: $(256{,}000/4{,}000)^2=64^2=4{,}096$; $0.47\times4{,}096\approx1{,}925$ s ≈ 32 min.

## Median and order statistics (non-examinable)

The i-th order statistic is the i-th smallest element; the median is the halfway point. Selection: given n distinct elements, find the one larger than exactly i − 1 others. Sorting first costs O(n log n), but there is no need to sort everything: **randomisation + simple recursion** runs in O(n) on average (quickselect: partition, recurse into one side only); **more careful recursion** (median of medians) is O(n) worst case. CLRS Ch. 9.

## Knapsack: from greedy to dynamic programming

**Problem.** n items, weight $w_i$, value $v_i$, capacity W. Fill the knapsack with the most value without exceeding the weight limit:

$$
\max\sum_{i=1}^nv_ix_i\quad\text{subject to}\quad\sum_{i=1}^nw_ix_i\le W,\ x_i\in\{0,1\}.
$$

- NP-hard in general.
- **Greedy:** sort by $v_i/w_i$ decreasing and insert while they fit. Optimal only for the **fractional** knapsack. Counterexample: W = 50, items (w, v) = (10, 60), (20, 100), (30, 120). Ratios 6, 5, 4: greedy takes the first two (weight 30, value 160) and the third no longer fits; the last two give weight 50, value **220**.
- **But assume** $w_1,\dots,w_n$ **and W are strictly positive integers.** That restricts the possible combinations a lot and opens up a third option: dynamic programming.

### The recursion

Define m[i, w] = the maximum value attainable with weight ≤ w using items **up to i** (the first i items), for w = 0, 1, …, W.

$$
m[0,w]=0;\qquad m[i,w]=\begin{cases}m[i-1,w]&w_i>w\\ \max\big(m[i-1,w],\ m[i-1,w-w_i]+v_i\big)&w_i\le w\end{cases}
$$

- Line 1 (base case): no items, no value.
- Line 2: item i does not fit in capacity w, so it is irrelevant. The test is against the **current** capacity w, not the overall W: an item with $w_i\le W$ can still be too heavy for a smaller subproblem.
- Line 3: **two ways to recurse, going backwards.** Either item i does not help (leave it out: m[i − 1, w]) or it does (put it in, gaining $v_i$ and using $w_i$ of the capacity: m[i − 1, w − $w_i$] + $v_i$). Take the better.
- The DP idea: solve every capacity (best sum ≤ 1, best sum ≤ 2, …, best sum ≤ W) for every prefix of items, and reuse stored answers.

> No sorting is needed for the DP. "Items up to i" means the first i items in any fixed order; sorting by $v_i/w_i$ belongs to the greedy method, which the DP replaces.

**Variant: two sets of equal sums.** If the total S is odd, equal halves are impossible (each half would be S/2, not an integer). If S is even, run the knapsack with $w_i=v_i=a_i$ and W = S/2; the split exists iff m[n, S/2] = S/2.

### Running time and the DP in code

- The solution is m[n, W]; storing previous computations in a table is **dynamic programming**.
- n items, solved for each w = 1, 2, …, W: each table entry costs O(1), and there are (n + 1)(W + 1) entries, so O(nW).
- **Pseudo-polynomial:** O(nW) is polynomial in the **value** of W, but W needs only about log₂ W bits to write down, so the running time is exponential in the input size. That is why knapsack stays NP-complete even though this DP exists.
- **Speed-up:** divide $w_1,\dots,w_n$ and W by their GCD g. This only works if g divides **every** weight; W is then replaced by ⌊W/g⌋. If W is not an integer, it can be floored, because feasible total weights are integers.

```python
def knapsack(w, v, W):
    m = [0] * (W + 1)                  # m[c]: best value, capacity c
    for wi, vi in zip(w, v):           # add the items one at a time
        for c in range(W, wi - 1, -1): # backwards: each item used once
            m[c] = max(m[c], m[c - wi] + vi)
    return m[W]

>>> knapsack([12, 2, 1, 1, 4], [4, 2, 2, 1, 10], 15)
15
```

- One row only needs the previous row, so a single array of length W + 1 suffices. Looping c **backwards** keeps m[c − $w_i$] at its previous-row value; looping forwards would let an item be reused (that solves the **unbounded** knapsack).
- Check: the optimum 15 takes items 2, 3, 4, 5 (weights 2 + 1 + 1 + 4 = 8, values 2 + 2 + 1 + 10 = 15); adding item 1 (weight 12) would exceed 15. The code also returns 220 on the greedy counterexample.

> **Finance analogue.** Capital budgeting with indivisible projects is a 0/1 knapsack: costs $w_i$, NPVs $v_i$, budget W. Ranking by profitability index (NPV/cost) is the greedy rule, and it fails for the same reason as the 160 vs 220 example when a big project crowds out a better combination.

Exam questions are typically modifications of well-known algorithms like this one.

## Traps

- Using O when the claim needs Θ (e.g. "doubling n quadruples the time").
- Doubling via derivatives instead of the ratio $T(2n)/T(n)=2^k$.
- Thinking merge compares "inner ends": it compares the fronts of the two lists.
- Calling the merge sort cost "height × depth": it is levels × work per level.
- e^π vs π^e: $e^\pi\approx23.14$ is bigger.
- Thinking the Ω(n log n) bound covers non-comparison sorts.
- Quicksort with first-element pivot on sorted data: O(n²).
- Greedy by value per weight for 0/1 knapsack.
- Knapsack DP: sorting items first (unnecessary), testing $w_i$ against W instead of the current w, or looping capacity forwards (gives the unbounded problem).
- Equal-sum partition: an odd total makes it **impossible**.
- Calling O(nW) polynomial: it is pseudo-polynomial.

## Self-check

1. Solve $T(n)=2T(n/2)+c$ (constant combine cost). *O(n).*
2. Is $n\log n$ in O($n^{1.1}$)? *Yes, log n grows slower than any positive power of n.*
3. Run the knapsack DP by hand: w = (1, 3, 4), v = (15, 20, 30), W = 4. *35 (items 1 and 2).*
4. Minimum worst-case comparisons to sort 5 elements, by the decision-tree bound? $\lceil\log_2120\rceil=7$.
