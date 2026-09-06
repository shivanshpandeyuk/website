---
title: "Lecture #6 - Diamond Mirrlees"
paper: "Paper 1 — Microeconomics"
year: "Year 3 (Part IIB)"
section: "Theory of Second Best"
description: "Theory of Second Best: the Diamond-Mirrlees assumptions and production efficiency result, and what it implies for optimal taxation."
order: 1
tags: ["economics"]
draft: true
---

![](../../assets/notes/y3-p1-lecture-6-diamond-mirrlees/01.png)
The three images:
(The set of feasible bundles, the PPP after R taken away)
![](../../assets/notes/y3-p1-lecture-6-diamond-mirrlees/02.png)
(The consumer’s budget line (this starts from zero, this is has opposite slope to the price area)), if you draw it and where the indifference curves and then you generate the offer curve
![](../../assets/notes/y3-p1-lecture-6-diamond-mirrlees/03.png)
You want to set a tax rate that just intersects the PPF we have, And the highest indifference curve we will
![](../../assets/notes/y3-p1-lecture-6-diamond-mirrlees/04.png)

Anyway you want the tax rate to be where the offer curve **just intersects the PPF this will be highest just by shape of offer curve being up sloping **
![](../../assets/notes/y3-p1-lecture-6-diamond-mirrlees/05.png)

WHY you cant tax intermediate goods
![](../../assets/notes/y3-p1-lecture-6-diamond-mirrlees/06.png)

## Lecture Notes

From lectures 4-5 it is critically clear that we need to figure out whether markets can be taken to be interdependent or independent.

The Diamond-Mireles assumptions are those general conditions that let us treat markets as independent. This gives rise to the Diamond Mirrlees Production Efficiency Result.

### Diamond-Mirrlees Assumptions

#### A1-A7

1. **Perfect Competition**: In all markets, agents are price takers
2. **CRTS**: Constant returns to scale on all commodities
3. **Full Instrument Set**: The government has full flexibility in choosing the tax rate levied on all commodities and all factors of production
4. **Revenue Requirement**: The government needs to raise a certain<br>amount of revenue R
5. **No lump sum tax: **So that this is a second best problem
6. **Individualistic SWF: **The social welfare function is individualistic (a function of individual utilities).
    1. The classic example is the utilitarian SWF
7. **Non-satiation: **There is at least one good that is desired by all agents in greater quantity; *i.e. there is no agent who is fully satiated in consumption of every commodity*

#### Explanations

A1-A2 imply that no producer earns any profit
- Price taking necessary to force p=MC pricing
- Increasing returns to scale not compatible with price-taking
- Constant returns to scale across the economy means the supply curves for produced commodities are horizontal and perfectly elastic (as is the demand for labour)
- Thus, the entire incidence of tax **is borne by consumers**

A3 means government can set any relative price configuration
- If there are N commodities and factors of production
- Then, a full instrument set has at least N-1 taxes where 
$$
t_i = q_i - p_i
$$
- By doing so, it can, for given producer prices (pinned down by the technology under constant returns to scale), **bring about any configuration of relative consumer prices **
    - It can meet its revenue requirement in the least distoring way
    - i.e. able to choose on the size of 
        - relative final consumer prices, 
        - relative factor (input) prices 
        - or any mixture of the two.

- Recall we only care about relative prices, one price is a numeraire, so to change all other relative prices you just need N-1 adjustment mechanisms
- Can use budget constraint of the representative consumer to show that any tax structure with a tax t1 \> 0 on commodity 1 and a tax t0 \> 0 on labour income has an equivalent to an alternative tax structure with t1 \> 0 and t0 = 0.
- It is important to keep in mind that **this is not saying that the government cannot tax the “untaxed”, **it is just *choosing* to do it indirectly

- **IT IS TYPICALLY ASSUMED THAT THE UNTAXED GOOD IS LABOUR, AND FURTHER LABOUR IS ONLY FoP**

A4-5 means government in 2nd best world
We can think of the revenue requirement (which could be related to the need to finance public spending) as an irremovable distortion/constraint. 
The distortion could, in principle, be removed if the requirement could be meet through lump sum taxation, but we rule that out by assumption 5

A6 - SWF is well-behaved
The usual assumption that *all members of society matter* and enter into the SWF

The choice of SWF then makes an ethical judgement on the interpersonal comparisons (i.e. first the ability to even assign utility levels to each individual and then second on what weight to put on each level).

A7 - People always wants more
Government can always find a way to allocate extra output that will make individuals better off

### Diamond-Mirrlees Production Efficiency Result

Under A1-7, the second best optimal tax system maintains the economy on the production possibility frontier. 

#### Baseline Model

Two commodities: $x_1, l_0$

Representative Consumer: 
$$
max \ U(x_1, l_0) \ s.t. \ q_1x_1 = q_0l_0 \\ \ \\ max \ U(x_1, l_0) \ s.t. \ q_1x_1 = l_0
$$
- The income of the consumer is just wage income on labor
- This is because no profit assumed A1-A2
- For further simplicity, **normalise the wage rate, **$q_0=1$
- For further simplicity, **normalise the tax to **$t_0=0$

Representative Producer with CRTS:
The agent maximises profit by earning zero profit, thus 
$$
\pi = p_1x_1-l_0 = 0 
$$
- The price of l0 is 1, so does not enter the equation

They do this subject to their technology. 
- Their technology is that they need c1 units of labor to produce one unit of x1. (Marginal resource cost = c1)
$$
x_1 \leq \frac{l_0}{c_1}
$$
- The competitive firm is productively efficient (of course they won’t produce x1 less than they can) so:
$$
x_1 = \frac{l_0}{c_1}
$$
- Putting this together means 
$$
p_1(\frac{l_0}{c_1}) - l_0 = 0 \\ \ \implies p_1 = c_1
$$
At this price, the firm is willing to produce any amount of commodity 1 demanded by the consumer. It gives same profit.
This means that the supply curve is perfectly elastic and that the producer price is determined by the production technology.

Revenue Requirement
$$
R = \text{R units of l}_0
$$

#### RECAP: Pareto Conditions

In this model the pareto conditions (of PE, PME, CE) are simply

    **Production Efficiency** 
    $$
    PE: \ \ \ x_1 = \frac{l_0-R}{c_1}
    $$
    Since there is only one input to the production process, production efficiency simply requires that the employed workers produce the maximum amount of output.
    - otherwise it’s also about using best combination of inputs

    **Product Mix Efficiency**
    $$
    PME: \ \ MRS_{l_0, x_1} = MRT_{l_0, x_1} = \frac{1}{c_1}
    $$
    Product mix efficiency says that the marginal rate of transformation in production between output and labour is equal to the marginal rate of substitution between the two in consumption

    **Consumption Efficiency**
    This is trivially satisfied, only one consumer so we don’t have to worry about some pareto improving re-allocation across consumers being possible… there are no other consumers

#### Producer’s Diagram (PPF)

![](../../assets/notes/y3-p1-lecture-6-diamond-mirrlees/07.png)
The production frontier shows the maximum amount of output that can be produced with the resources available and is a straight line because of constant returns to scale.

So the blue and red lines show the PPF $x_1 \leq \frac{l_0}{c_1}$, productive efficient outcomes are on those lines.

If there were no revenue requirement, then the production frontier would start at the origin, but **the fact the government requires resources means that the frontier is shifted to the left** by the amount required.
- The revenue requirement is just how much units of labor (R) the government is eating

So, blue production set (no revenue requirement) 
$$
x_1 = \frac{l_0}{c_1}
$$
So, red production set (R Revenue requirement)
$$
x_1 = \frac{l_0-R}{c_1}
$$

On the RHS of the graph we have $q_0, p_1$ space to show **relative producer price of labour on x-axis, and output on y-axis**
- By normalisation, $q_0 = 1$
- By zero profit CRTS, $p_1 = c_1$

These points are plotted.

#### Consumer’s Diagram (ICs + Budget)

The consumer is trading off x1 and l0, in other words the consumption good and lesiure.
$$
max \ U(x_1, l_0) \ s.t. \ q_1x_1 = l_0
$$
The utility function can be draws as indifference curves. Utility is increasing towards north-east (less labour, more consumption).

The income constraint can be drawn as budget lines, these are upward sloping because as more labour is worked the more consumption can be afforded at the slope of $\frac{1}{q_1}$
![](../../assets/notes/y3-p1-lecture-6-diamond-mirrlees/08.png)
On the right-hand we have $q_1, q_0$ space. 
- $q_0 = 1$ by normalisation
- $q_1$ so we choose this by the tax
- This shows the relative price of the consumption good
    - The more expensive it is, the flatter our budget line is (i.e. the less x1 we can consume as it is more expensive).

The optimal choice is where the indifference curve’s slope intersects the slope of the budget line 
$$
MRS_{l_0, x_1} = \frac{1}{q_1}
$$
The set of optimal consumption bundles, for every selection of q1 is the **contract curve** and is traced out as the black line.

#### Taxing the Consumer

Lump Sum Tax
As a benchmark, we can ask what would happen if the revenue requirement could be met by a lump sum tax levied on the consumer. This means prices are unaffected, R amount of labour resource is just taken out by the government.

Thus, you just take the Revenue requirement out of the representative consumer’s endowed income stream. 
$$
q_1x_1 = l_0-R
$$
**Accordingly, the budget line and the production frontier coincide** and the choice will be a point FB in Figure 3.
$$
B: \ \ \ q_1x_1 = l_0 - R \\ \ \\ PPF: \ \ x_1  \leq \frac{l_0-R}{c_1} 
$$
Now note that $q_1=p_1,  \ p_1 =c_1$ so: 
$$
x_1 = \frac{l_0-R}{p_1} = \frac{l_0-R}{c_1} = PPF
$$
![](../../assets/notes/y3-p1-lecture-6-diamond-mirrlees/09.png)
The key point is that the production set = the budget set, that this happens is because consumer and producer prices are same.

We notice that t**his is the first best allocation.** Further, the two relevant Pareto conditions are satisfied, i.e.,
- **production is on the frontier** so we have product efficiency
- slope of IC (MRS) equals slope of PPF (MRT) so we have product mix efficiency

Distortionary Commodity Taxes
Absent LST. Revenue, R, will have to be raised through a tax on x1 such that the wedge t = q1-pq1 is big enough that
$$
R = (q_1-p_1) x_1(q_1)
$$
The government wants to do this in such a way as to maximize the utility of the consumer subject to the revenue and the resource constraint of the economy.

Suppose that the consumer price is increased to $q^0_1$ such that the consumer’s budget is $B_2$. The consumer’s choice is at $E_0$, so equilibrium is here. **This is below the production frontier**, **and it raises more revenue than required. **
- We can see it raises excess revenue because horizontally, it’s distance from the origin is more than R

We could still meet R and let our consumer work less, clearly this is not optimal so instead, try lower tax rate so that the consumer price is at $q^1_1$ and then the consumer’s optimal choice is at $E_1.$

$E_1$ lies exactly on the production frontier, so the revenue it raises is exactly equal to R. It is also production efficient. If you were to tax less, than you raise insufficient revenue. **Thus this is the second best allocation.**
![](../../assets/notes/y3-p1-lecture-6-diamond-mirrlees/10.png)
This satisfies production efficiency, **but not product mix efficiency**, because the slope of the IC and the PPF are different due to the tax wedge:
$$
MRS_{l_o, x_1} = \frac{1}{q_1} < MRT_{l_0, x_1} = \frac{1}{p_1}
$$
**DMS: The optimal (commodity) tax structure should maintain production efficiency and violate product mix efficiency only.**

Diagramatic Intuition
- The production frontier is still shifted by the amount of the tax because this is how resource constraint works.

- Then, we are effectively choosing which Budget line is the best while still being feasible under this taxation. 
- We cannot shift the budget line (no LST) 
- We can only pivot it around the origin by putting a wedge on the price of x1.
- We want to pivot in a way that the consumer choice is both feasible, and the least amount tax needed.
- **This is where the contract curve and the PPF intersect**. $E_1$
    - If you tax more than that then you are not productively efficient
    - If you tax less than that then you are not on a feasible point.

Lecturer’s Intuition
The intuition behind this result runs as follows. As long as the government can freely adjust taxes on all (but one) goods and factors of production, it can bring about any configuration of relative consumer prices it likes consis tent with the revenue requirement. 
When profits are zero, consumer prices are the sole determinant of consumer choice and welfare. 
**Any utility level attained at a relative consumer price that involves a production inefficiency can be obtained with one without.** This means that production inefficiency only adds distortions without correcting others or generating benefits to consumers through profit. 
This is socially undesirable and so production efficiency should be maintained.

### DM and Theory of 2nd Best

#### How to Reconcile DM and GT2B?

General theory of 2nd best:
- It is not optimal to eliminate distortions completely 
- It is optimal to add new distortions to counteract existing ones in interdependent markets

DM Production Efficiency:
- It is optimal to restrict distortions to consumer prices
- It is not at all optimal to distort production by creating production inefficiencies

#### Independent Consumer and Producer

The two are reconciled by the fact that the Diamond-Mirrlees analysis assumes that **consumer and producer prices are independent**
- Producer prices are determined by the production technology
- $p_1= c_1$, producer prices are *NOT* determined by consumer demand

As a consequence, the **incidence of any taxes levied on outputs or **inputs eventually **falls on consumers**
- If taxes fall on the consumers, then there is no point to use taxes that distort production efficiency

General theory of 2nd best says that we should restore Pareto conditions in independent markets. So we do just that.

#### What can go wrong with DM?

Key assumptions:
- Government has full set of instruments
- Zero Profit Assumption
    - i.e. CRTS
    - i.e. Perfect Competition

Full set of Instruments
These are not realistic. Government consists of departments, ministries etc. **each with jurisdiction over only a subset of<br>taxes** (and other policy instruments). They take each other’s taxes as given.

So, we are back in the second best world proper and it may be optimal to distort producer (input) prices in order to alleviate the unavoidable preexisting distortions.

CRTS
What if there is DRTS rather than CRTS? Then, in the short-run **profit can exist. **Consumer and producer no longer independent.
- Any (untaxed) profit must end up as income for some<br>consumers (who own (the shares in) the companies). 
- The level of profit depends on producer prices of outputs and inputs, **so by manipulating these prices the government can now affect the welfare of consumers** 
- It may be optimal to distort production decisions to alleviate distortions created on the consumer side.

In this case have to tax profits optimally (100%), but in practice, it is hard to tax pure profit at 100% **because it is hard to observe what is pure profit and what is ‘just reward’ to entrepreneurship.**

Monopolies
In this case, it is not enough to tax the profit away because the **production decisions are distorted in themselves **and this needs fixing

Externalities
Externalities of various sorts can also invalidate<br>the production efficiency result

### Implications of the Theory

To repeat, the general implication is that a **revenue-requirement (**or any amount of redistribution among consumers in a competitive economy) **should be done by distorting the product mix, while preserving production efficiency.**

This means every sector in the economy, the MRTS between factors should be the same. This puts the economy on **the PPF**. 

**ANY POLICY THAT TAKES ECONOMY AWAY FROM THE PPF IS NOT 2nd BEST.**

#### Input Tax

Taxes on production factors should not vary across firms (or sectors). E.g. transport should not be exempt from fuel tax, that means the MRTS in transport is higher than in rest of economy. 
![](../../assets/notes/y3-p1-lecture-6-diamond-mirrlees/11.png)
- This makes the economy productive inefficient
- You could give that fuel to the private sector 
- The private sector could give up some labour
- Both sectors could expand production, because transport was overusing fuel and private sector overusing labour.

Likewise businesses should not be exempt from corporation tax, only levying on corporations. That means the taxes on capital inputs invested in the two types of firms differently.
- Making corporations overuse labour
- Making businesses overuse capital

#### Public and private sector should price same

Public and private sector production should be based on the same relative prices.

For example, the wage paid in the public sector to a teacher **should be the same as the wage paid in the private sector**. (if they are producing the same product).

#### Pricing within public sector

The marginal rate of technical substitution within the public sector **should be the same across all public enterprises.**

#### Intermediate Goods

**Intermediate goods should not be taxed.**

Firm 1 produces x1 and receives price p1. The firm chooses to hire labour until the wage = marginal revenue product 
$$
q_0 = p_1*MP_{l_0}^1 \\ \ \\ \implies MP^1 = \frac{p_0}{p_1}
$$
- labor is untaxed

Firm 2 produces x2 using both x1 and l0 as inputs. The firm chooses the input mix such that MRTS = relative price of inputs 
$$
MRTS^2_{l_0, x_1} = \frac{p_0}{p_1+t_1} < MP^1_{l_0, x_1}
$$

This is production inefficient. Firm 2 over-uses labour and under-utilises x1. If that labour was given to firm 1, then the produced x1 can be given to Firm 2 and so both x1 and x2 output increases.
![](../../assets/notes/y3-p1-lecture-6-diamond-mirrlees/12.png)

#### Trade Taxes

Revenue should not be raised through tariffs (or export taxes) in a small open economy.
In other words,** international trade should occur at producer prices,** otherwise the economy will not be on the production<br>frontier. 
The clue to this is to notice that **a tariff on a commodity is equivalent to a production subsidy** **and a consumption tax **levied at the same rate.

In short, in a small open economy, **production efficiency<br>requires that producers face world market prices**, so any policy that puts a wedge between the domestic producer price and the world market price is in-optimal according to the Production efficiency result.

**E.G. SUPPOSE YOU TARRIFF IMPORTS, then you produce it domestically under artifically high prices, you suck up labour resources here and underproduce your other domestic items (like services). **Suppose that entire delta, just replace it with imports! 
This frees up resources that can be move to<br>other sectors and increase the output produced there. As a consequence, total output increases, **demonstrating that the initial situation could not have been production efficient.**

## Stiglitz and Rosengard Ch.20

**Definition of Productive Efficiency**
- Productive efficiency is attained when all firms face the **same prices for inputs and outputs**. (SAME MRTS)
- Therefore, any tax on an input or output that is **not uniform** across all firms results in the economy not being efficient.

**Examples of Distortions in Production**
- **Corporate vs. Unincorporated Sectors:**
    - The **corporation income tax** is viewed as a tax on capital inputs used in incorporated firms.
    - It raises the after-tax cost of capital in corporations above that in unincorporated businesses, creating a distortion.
- **Industry-Specific Exemptions:**
    - Example: Gasoline used for most business purposes is taxed, whereas gasoline used for farming is often not.

**Market vs. Non-market Sector Distortions**
- Many production activities occur in both sectors, but **only activities in the market sector are taxed**.
    - **Transportation:** An individual driving to work performs the same service as a taxicab driver, but only the latter is taxed.
    - **Home Production:** A person baking bread at home performs a service similar to a baker, but is not taxed in the same way.
- **Result:** There is a distortion between marketed and non-marketed sectors, meaning the economy is not productively efficient.
- **Developing Countries:** This applies to taxing **formal but not informal markets**, which is central to the debate about disincentives for microenterprises and small businesses to formalise.

**Taxes on Intermediate Goods**
- Any tax on **intermediate goods** (goods used to produce other goods) is distortionary.
- **Example (Computers):**
    - Consider a firm that produces and uses computers in its own production plants: In a competitive economy, the internal cost is simply the cost of factors of production.
    - Now consider a separate firm buying a computer: If a **sales tax** is imposed, the cost to this firm is higher than the cost to the manufacturing firm using the computer internally.
    - **Result:** This creates an important distortion, and the economy is no longer productively efficient.

---

#### **Should Government Impose Distortionary Taxes?**

**The "Naïve" View**
- One might argue that if the goal is to minimize deadweight loss, the government should **not** introduce any additional distortions it doesn't need to.
- While simply "counting distortions" is not always valid logic, under certain circumstances, this conclusion is correct.

**Theoretical Desirability of Productive Efficiency**
- **Conditions for Efficiency:** If the government is able to:
1. Tax away **all profits** in the private sector.
2. Face no other restrictions on its ability to impose taxes (other than the inability to impose lump-sum taxes).
- **Conclusion:** Under these conditions, productive efficiency is desirable. The government should impose **no distortionary taxes on businesses**.
- **Reasoning:** Whatever could be achieved with a distortionary tax on producers could be done **better with a direct tax on consumers**, maintaining the economy on the production possibilities schedule.
- **Implications:** This suggests the **undesirability of import duties** and taxes on corporations that differ from taxes on unincorporated businesses.

**Real-World Constraints**
- Governments often face difficulties that violate the conditions above:
- They cannot easily distinguish between **final consumer use** and **business use** of a commodity (taxing consumers often necessitates taxing business use).
- They are often unable to identify and tax away all **pure profits** in the private sector.
- **Conclusion:** When these restrictions exist, it **may be desirable** to impose distortionary taxes on producers.

## Hindriks and Myles Ch.15

**The Goal of Optimal Tax Analysis**<br>The purpose of optimal tax analysis is to find the set of taxes that gives the highest level of welfare while raising the revenue required by the government. The set of taxes that do this are termed **optimal**.
- **Constraints:** Consumers must be free to choose their most preferred consumption plans at resulting prices, and firms must maximize profits. Prices must equate supply to demand.
- **Scope:** This section considers a single consumer to focus solely on **efficiency**. (Equity is addressed in 15.6).

**Diagrammatic Approach: The Robinson Crusoe Economy**<br>To understand the **second-best nature** of commodity taxes relative to lump-sum taxes, we use a two-good economy (labor and output).
- **Labor:** Used as an input (supplied by consumer to firm).
- **Output:** Sold by firm to consumer.

**1. Revenue and Production Possibilities**
- The vertical axis measures output; the horizontal axis measures labor.
- The firm’s production set (**Y**) is displaced from the origin by distance **R** (the government's revenue requirement). 
    - The government effectively removes **R** units of labor.
- After meeting **R**, the economy has constant returns to scale.
- **Equilibrium Price (p):** Normalizing the wage rate to 1, **p** is the only output price leading to zero profit (competitive behavior). 
    - The firm is indifferent to where it produces on the frontier given **p**.
    ![](../../assets/notes/y3-p1-lecture-6-diamond-mirrlees/13.png)

**2. Consumer Choice and the Offer Curve**<br>**Budget Constraint:** With wage = 1 and consumer price of output = **q**, the budget is **qx=l**. This is up-sloping and passes the origin.<br>
- **Tax:** The difference between **q** (consumer price) and **p** (producer price) is the tax on the consumption good. Note: Labor is not taxed (a normalization).
- **Preferences:** Indifference curves are downward sloping because labor supply causes disutility.
- **Offer Curve:** Varying **q** traces out the **offer curve **— the locus of optimal choices. **These are the only points consistent with utility maximization** in the absence of lump-sum taxation. Utility rises as you move up the offer curve.
    ![](../../assets/notes/y3-p1-lecture-6-diamond-mirrlees/14.png)

3. The Optimal Tax Solution<br>Superimposing the production and consumption diagrams reveals the optimal tax.
- **Consumer’s Set:** The only points consistent with consumer choice are on the offer curve.
- **Feasible Set: **Must lie on or below the production frontier line.
- **The Optimum (Point e):** **The maximal utility is where the offer curve intersects the production frontier I_0**. 
    - Any higher level is not feasible.
- **Optimal Tax Rate (t\*):** The difference between consumer price **q** and producer price **p** at point **e**. This ensures the consumer chooses **e** and the government raises revenue **R**.
    ![](../../assets/notes/y3-p1-lecture-6-diamond-mirrlees/15.png)

#### **15.4 Production Efficiency**

**The Diamond–Mirrlees Production Efficiency Lemma**<br>The diagrammatic analysis yields a critical result: **The optimal commodity tax system should not disrupt production efficiency.**
- The optimum with commodity taxation must be on the **boundary** of the production set.
- All distortions should be focused on **consumer choice**, not production.
**Understanding Production Efficiency**
- Production efficiency occurs when an economy maximizes output from a given set of resources (the boundary of the production possibility set).
- **Condition:** The Marginal Rate of Substitution (MRS) between any two inputs must be the same for all firms. This happens naturally in competitive markets without taxes or when input taxes are not differentiated among firms.
**Proof of the Lemma**
- Consider an **interior point f** (inside the production set).
- If the equilibrium were at **f**, the consumer’s utility could be raised by reducing input use while keeping output constant (moving toward the boundary).
- Since this improvement is feasible, **f** cannot be an optimum. The optimum must therefore lie on the boundary.
![](../../assets/notes/y3-p1-lecture-6-diamond-mirrlees/16.png)
**Implications for Tax Structure**
1. **Intermediate Goods:** Intermediate goods should **not be taxed**. Taxing them would violate the equalization of MRSs between firms (e.g., between the intermediate and final goods industries).
2. **Input Taxes:** Input taxes should not be differentiated among firms.
3. **Generalization:** This result holds for many consumers provided there is some agreement in tastes (i.e., if all consumers prefer more output or less labor, moving from an interior point to the boundary is a unanimous improvement).

## Atkinson and Stiglitz Ch.15

## Past Questions

### Q2 - 2016 (DWL of a Subsidy when 2 Inputs)

![](../../assets/notes/y3-p1-lecture-6-diamond-mirrlees/17.png)

#### Part (a)

![](../../assets/notes/y3-p1-lecture-6-diamond-mirrlees/18.png)
![](../../assets/notes/y3-p1-lecture-6-diamond-mirrlees/19.png)
Of course the agri-sector is probably more land intensive than labor-intensive, so while w/r ratio is equal. The absolute value of land price, r, probably went up so yeah sure landowners definitely benefit.

##### *NOTES TO SELF NOT TO TRIP UP*

*WHY DON’T WE INCLUDE THE SECONDARY MARKET PRICES BID UP????*

*WHO BENEFITS?*
When you use representative agent models it’s hard to talk about this, you only have 1 consumer and 1 firm and 1 government. Obviously there is a mix of people with a mix of endowments, and so the way they benefit is also mixed!

### Q1 - 2018 (DM Derivation)

![](../../assets/notes/y3-p1-lecture-6-diamond-mirrlees/20.png)

#### Part (A)

![](../../assets/notes/y3-p1-lecture-6-diamond-mirrlees/21.png)
![](../../assets/notes/y3-p1-lecture-6-diamond-mirrlees/22.png)
Here the intermediate good is labour, should have called it x1
![](../../assets/notes/y3-p1-lecture-6-diamond-mirrlees/23.png)
![](../../assets/notes/y3-p1-lecture-6-diamond-mirrlees/24.png)
We see that the best point on the contract curve, that is feasible, is also on the PPF. Thus it is optimal, to ensure productive efficiency holds. This requires that the MRTS across sectors is equalised.
![](../../assets/notes/y3-p1-lecture-6-diamond-mirrlees/25.png)

![](../../assets/notes/y3-p1-lecture-6-diamond-mirrlees/26.png)

#### Part (B) - 2nd best with interdependency

![](../../assets/notes/y3-p1-lecture-6-diamond-mirrlees/27.png)
This question is basically a reversal of the above diagram. Except in market 2 (intermediate good) we are introducing the tarriff, not removing it! Additionally, the interlinking is through the supply curve not the demand curve. See:
![](../../assets/notes/y3-p1-lecture-6-diamond-mirrlees/28.png)

### Q2 - 2019 (Why DM needs CRTS)

#### Part (a): Constant Returns to Scale in the DM Result
![](../../assets/notes/y3-p1-lecture-6-diamond-mirrlees/31.png)
![](../../assets/notes/y3-p1-lecture-6-diamond-mirrlees/32.png)
Basically here we argued that lump sum tax impossible right, (Fig 6) but we can actually do some lump sum tax, we levy an input tax in a way that extracts those profits. This reduces tax burden in the output sector and brings us to a situation closer to Fig 6 than Fig 5. **The point is that before this option did not exist to us, there was no point in input taxes just brought the PPF inward without raising revenue → now with supernormal profit if you tax input you still bring PPF inward but you *do *raise LS revenue.**

#### Part (b): Irremovable Tariffs and Input Taxation in a Small Open Economy

*How?*
Basically, these indirect effects on the right are approx. 0, if firm is optimising.

### Q3 - 2021 (Why taxing is good in DRTS)

![](../../assets/notes/y3-p1-lecture-6-diamond-mirrlees/35.png)

### Q3 - 2022 (Open Economy Diamond Mirlees)

In closed economy, producer prices are not distorted by taxes or subsidies because it is entirely incident on the consumer. 
This is NOT true in open economy, in this case consumer prices are fixed by the world. While this means consumers still pay $q^W + t$, notice how subsidy is not there. Subsidies are entirely incident on the producer. Producer price distorted! **Indeed, what matters is that *****all producers face the same prices, regardless of nationality.***
![](../../assets/notes/y3-p1-lecture-6-diamond-mirrlees/37.png)
![](../../assets/notes/y3-p1-lecture-6-diamond-mirrlees/38.png)

### DM RULES AND TAKEAWAYS (CHEATSHEET)

1. What is Diamond Mirrlees?
2. What does it recommend?
3. How is it derived?
4. Why does it require CRTS? What happens with DRTS?
*It is all about incidence, interventions are okay if they are all incident on a final **consumer**. This means that producer prices are NOT distorted, we should also not care if producer is domestic or foreign they should get same producer price.*
