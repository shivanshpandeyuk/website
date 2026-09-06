---
title: "Lecture #7-8 - Ramsey Taxation"
paper: "Paper 1 — Microeconomics"
year: "Year 3 (Part IIB)"
section: "Theory of Second Best"
description: "Theory of Second Best notes: Lecture Notes; Baseline Model; First-Best Tax Structure."
order: 5
tags: ["economics"]
---

![](../../assets/notes/y3-p1-lecture-7-8-ramsey-taxation/01.png)

## Lecture Notes

We showed that in a Diamond-Mirrlees world, there should be no taxes on production, instead only on consumption. But how do you choose the tax on the consumption of different items? 

Ramsey taxation shows us the most efficient tax structure in a DM world. The simplest model has **two commodities** this shows us how to tax those two commodities whereas before we had just one. 

### Baseline Model

As before, the government has a revenue requirement that it meets **using ad valorem taxes** 
$$
R
$$
This time there are *two *commodities and one factor of production. 
$$
x_1, x_2, l_0
$$
Consumer Assumptions
Ignore redistribution. **Assume a single consumer**. They are endowed with time, to split between labor and leisure (previously we just said labour can be supplied infinitely which is innacurate). 
$$
T_0 = L_0 + l_0
$$
The direct utility function is assumed to be increasing in the goods and decreasing in hours worked, so utility is: $U(x_1, x_2, l_0)$

The consumer’s budget constraint is 
$$
q_1x_1 + q_2x_2 = q_0l_0
$$
or we can treat leisure as a consumption good so 
$$
q_0L_0 + q_1x_1+q_2x_2 = q_0T_0
$$
The consumer maximises utility subject to the budget constraint. The optimising consumer gets indirect utility as measured by 
$$
V(q_0,q_2,q_2; m) = \text{max}  \ U(x_1,x_2; l_0) \text{ s.t. } q_1x_2+q_2x_2 = q_0l_0
$$

Producer Assumptions
We assume that the** two commodities are produced with constant returns to scale** using labour as the only factor of production.

The unit labour requirement to each good is $c_i$ and fixed at that due to CRTS. Then, with p=MC under perfect competition:
$$
p_i = q_0 c_i
$$
The entire tax incidence is thus borne by consumers.

Labour is the price numeraire, labour is also the tax numeraire. Thus $q_0 = p_0 = 1$ 

### First-Best Tax Structure

A uniform tax on all goods is equivalent to a tax on full income.

Income is exogenous, just from the individual’s endowed labour stream. Thus this is basically a lump sum tax, which is 1st best.

Here is why, notice that the consumer prices would be 
$$
q_i = (1+t_i)p_i
$$
Then the budget constraint becomes:
$$
(1 +t)p_1x_1 +(1+t)p_2x_2 +(1+t)p_0L_0 = p_0T_0
$$
- Clearly, no distortions introduced just scaling stuff
- The budget slope does not change just shifts it

Which we can rearrange to say that 
    $$
    p_1x_1 + p_2x_2 +p_0L_0=\frac{p_0T_0}{1+t}
    $$
**This is the first best solution**, but is only feasible if leisure can be taxed directly. 
As argued previously, **the government does not observe the value<br>of leisure** (or individual’s abilities, which determine how much leisure must be sacrificed to earn one unit of income).

The government observes market transactions only
**LEISURE IS NOT TAXABLE, LABOR IS.**
What if the government did a uniform tax on all commodities, and labour hours worked. (i.e. on all transactions)
$$
(1+t)p_1x_1+(1+t)p_2x_2=(1+t)p_0l_0
$$
Clearly, tax does not collect any tax revenue at all because the tax on x1 and x2 is offset by subsidy to labour. 

**You can’t have a uniform tax on commodites and labour hours worked**, that does not make sense! You want everything to go up by t% in price but that’s just inflation - taxing leisure uniformly did *NOT* do that because you were taxing only consumption.

The term 1+t simply cancels out.
- Basically if the government taxes all goods 10%
- It also taxes consumption of labour to make it more expensive by 10%, to ensure uniformness
- Both your nominal salary and your expenditure is up 10%
- So really nothing happened
    - This is unintuitive because there is no such tax on *consumption *of labour (well employer’s NI)
    ![](../../assets/notes/y3-p1-lecture-7-8-ramsey-taxation/02.png)

This is to show that in the first-best world you can tax leisure, and so you uniformly tax leisure and all commodities.

In the 2nd-best world you tax labour, and so **you do NOT uniformly tax all commodities**. To raise revenue, you must have distortions and change relative prices. This is why it is 2nd best.

### Second-Best Tax Structure

#### Why Ramsey Taxation is a pricing problem

We assume that the government has access to a full set of taxes (DM A3), i.e., **it can tax all commodities and hours of work at different rates. **

By convention, set the tax on labour to 0. Only need N-1 taxes, because optimal behaviour depends on relative relationships.

The optimal tax problem facing the government is to maximize the utility of the (representative) consumer subject to the revenue requirement and the resource constraint of the economy.

Recall that $q_ i = p_i (1+t_i)$, but also that $p_i =c_i$. 
- Then, producer prices are fixed. 
- **Thus, choosing the optimal tax structure is equivalent to choosing the optimal price structure.**
$$
\text{max}_{q_1, q_2} \ V(q_1, q_2, m) \ \ \ s.t. \ R=x_1(q_1, q_2, m)t_1 + x_2(q_1,q_2,m)t_2
$$
- m is the amount of extra, exogenous income. m=0 here

Rewrite this to get all in terms of q and then solve the Lagrangean 
$$
L = V(q_1, q_2, m) +\mu[x_1(q_1, q_2; m)(q_1-p_1) + x_2(q_1, q_2; m)(q_2-p_2)]
$$
- $\mu$ is marginal cost of public funds (how much utility we lose when the government asks for 1 unit more of tax)
- $x_i$ are the Marshallian demand functions
- $p_i$ are fixed based on the labor requirement

#### Roy’s Identity

To solve the above Lagrangean, we want to express the marshallian demand functions in terms of indirect utility.

The link is through Roy’s identity:
$$
x_i (q, m)  = - \frac{\frac{\partial V(q,m)}{\partial q_i}}{\lambda}
$$
Where $\lambda = \frac{\partial V}{\partial m}$

#### Slutsky Equation

Slutsky shows that the change in total demand for a good i, due to the change in price of another good j can be decomposed into the substitution effect (how much the price change increases Hicksian demand for good i) and the remaining income effect (how much the income change decreases demand for good i)

Thus, we get the following decomposition:
$$
\frac{\partial x_i(q,m)}{\partial q_j} = \frac{\partial x^c_i (q, V(q,m))}{\partial q_j} - \frac{\partial x_i}{\partial m}x_j
$$

#### First Order Conditions

$$
L = V(q_1, q_2, m) +\mu[x_1(q_1, q_2; m)(q_1-p_1) + x_2(q_1, q_2; m)(q_2-p_2)]
$$
Take the F.O.C from q1, q2 
$$
\frac{\partial \cal L}{\partial q_1} = \frac{\partial V}{\partial q_1} + \mu[x_1 + \frac{\partial x_1}{\partial q_1} (q_1-p_1)+ \frac{\partial x_2}{\partial q_1} (q_2-p_2)] = 0 \\ \ \\ \frac{\partial \cal L}{\partial q_2} = \frac{\partial V}{\partial q_2} + \mu[x_2 + \frac{\partial x_1}{\partial q_2} (q_1-p_1)+ \frac{\partial x_2}{\partial q_2} (q_2-p_2)] = 0
$$

Interpretation
**Direct Welfare Loss**
- There is a direct welfare loss from an increase in the consumer price of good i, due to our tax $t_i = q_i-p_i$ 
$$
\text{Direct Welfare Loss } = \frac{\partial V}{\partial q_i}
$$

**Mechanical Revenue Effect**
    - A small increase in $t_i$ generates revenue on the entire $x_i$ units 
    - But you lose a bit of tax revenue from the lost $\partial x_i/q_i$
    $$
    \text{Mechanical Revenue Effect } = x_i + \frac{\partial x_i}{\partial q_i} (q_i-p_i)
    $$
**Behavioral Revenue Effect**
    - Consumers substitute a bit to good j when $t_i$ increases
    - So you gain all the tax revenue on that substiution 
    $$
    \text{Behavioral Revenue Effect } = \frac{\partial x_j}{\partial q_i} (q_j-p_j)
    $$

In other words, the optimal tax on each good balances the<br>direct welfare cost of the tax with the revenue effects.

#### Ramsey Taxation Derivation

Use Roy and Slutsky
**Roy’s identity** tells us that 
$$
x_i (q, m)  = - \frac{\frac{\partial V(q,m)}{\partial q_i}}{\lambda}
$$
So we can rewrite the direct welfare effect from levying tax (of let’s say good 1) as the 
$$
\text{Direct Welfare Loss } = \frac{\partial V}{\partial q_1} = -\lambda x_1
$$

**Slutsky’s Identity** tells us that
$$
\frac{\partial x_i(q,m)}{\partial q_j} = \frac{\partial x^c_i (q, V(q,m))}{\partial q_j} - \frac{\partial x_i}{\partial m}x_j
$$
So writing this for how the increase in q1 affects both the total demands for goods 1 and 2 
$$
\frac{\partial x_1 }{\partial q_1} =  \frac{\partial x_1^c}{\partial q_1} - \frac{\partial x_1}{\partial m}x_2 \\ \ \\ \frac{\partial x_2 }{\partial q_1} =  \frac{\partial x_2^c}{\partial q_1} - \frac{\partial x_2}{\partial m}x_1
$$
Substitute this into the revenue effect
![](../../assets/notes/y3-p1-lecture-7-8-ramsey-taxation/03.png)

Then put the Hickisan terms on LHS, negative terms on RHS
![](../../assets/notes/y3-p1-lecture-7-8-ramsey-taxation/04.png)

Define the **social marginal value of income** as the RHS 
![](../../assets/notes/y3-p1-lecture-7-8-ramsey-taxation/05.png)

Sub this back in, rearrange so that the FOC is now
![](../../assets/notes/y3-p1-lecture-7-8-ramsey-taxation/06.png)

Finally rewrite $q_i-p_i = p_it_i$ **because ad valoretm tax**, so now resembles a policy rule. This is the Ramsey taxation principle
![](../../assets/notes/y3-p1-lecture-7-8-ramsey-taxation/07.png)
 

#### Why is this Ramsey?

**LHS**
    Notice this looks familiar, recall the Haarberger formula from lecture 2

        Direct DWL
        - For a small increase in t1, the numerator is the MDWL from increasing a tax by that small amount (Behavioral)
        $$
        \text{Harberger: } \ DWL_1 \approx -\frac{1}{2}p_1t_1^2 \frac{\partial x^c_1}{\partial t_1} \\ \ \\ \implies \frac{\partial DWL_1}{\partial t_1} = -t_1p_1\frac{\partial x^c_1}{\partial t_1}
        $$
        - We have this in terms of q1 being changed so rewrite 
        $$
        p_1 \frac{\partial x^c_1}{\partial q_1} = \frac{\partial x^c_1}{\partial t_1} \\ \ \\ \implies \frac{\partial DWL_1}{\partial t_1} = -p_1^2t_1\frac{\partial x^c_1}{\partial q_1}
        $$
        - This is the marginal DWL of t1, from good 1

        Indirect DWL (Tax Interaction)
        - Good 2 also has a tax
        - So, we lose some DWL because we gain some tax revenue from SE
            - or we get more DWL if they are complements
        - Specifically, 
        $$
        \frac{\partial DWL}{\partial t_2} = -\frac{\partial x^c_2}{\partial t_1}p_2t_2
        $$
        - The tax is ad valorem, so the new tax revenue gained is the the $t_2$ % of the price multiplied by the new units consumed

        Mechanical Revenue Effect
        - The remaining bit is what we gain, new tax revenue!
        - Specifically, a small increase in the ad valorem tax will yield an increase of 
        $$
        \frac{\partial R}{\partial t_1} \ |_{x_1} = p_1x_1
        $$

        Thus we can say that the LHS of the FOC is the **marginal DWL per marginal unit of revenue collected**
        ![](../../assets/notes/y3-p1-lecture-7-8-ramsey-taxation/08.png)

    **RHS**
        The right-hand side is the same for both commodities 
        $$
        \frac{\mu - a}{\mu}
        $$
        **The Social Marginal Utility of Income **$\alpha$
            $\alpha$ represents the welfare value of one unit of income in the hands of the consumer. 
            ![](../../assets/notes/y3-p1-lecture-7-8-ramsey-taxation/09.png)
            It is defined as the **sum of the private value to the consumer and the public value to the government**.

            - $\lambda = \frac{\partial V}{\partial m}$** (Private Marginal Value):** The private marginal utility of income for the representative consumer
                - This measures the direct welfare loss to the consumer if they lose a unit of income.<br>
            - $\mu$ **(Marginal Value of Public Funds): **The value society places on an extra unit of government revenue.

            - The terms in the bracket **(Revenue Effect**): the change in tax revenue collected from commodities caused by a small increase in exogenous income m
            <br>We can think of $\alpha$ as measuring overall welfare loss if we take one unit of income away from consumers via LST:
            - Direct Effect: It reduces their welfare directly by $\lambda$
            - Indirect Revenue Effect: The drop in income shifts the budget line inwards. Consumption falls of x1 and x2
            - Revenue Loss: Because consumption falls, the tax revenue collected on those goods falls. This lost revenue is valued at the shadow price of public funds $\mu$
        <br>**Marginal Excess Burden**
            Thus $\mu - \alpha$ represents the marginal *excess* burden of tax 
            - $\mu$ = Represents the welfare cost of raising a unit of revenue through distortionary commodity taxation.
            - $\alpha$ = Represents the welfare cost of raising a unit of revenue directly from consumers via a lump sum tax.

            The difference measures the extra cost (or excess burden) incurred,** because the government must use distortionary taxes instead of lump sum taxes.**<br>
        **THUS AT THE OPTIMUM, marginal excess burden must be the same for all taxed commodities.** 
        - The government should balance the distortions across different goods to minimize total deadweight loss.

    OVERALL
    $$
    \text{RAMSEY: }\ \frac{\partial DWL_1/\partial t_1 + \partial DWL_2/\partial t_2}{\partial R/\partial t_1 |_{x_1}} = \frac{\mu-\alpha}{\mu}
    $$

    **Consequently, the Ramsey formula simply says that the marginal DWL per marginal unit of revenue collected must be the same for all tax bases (or tax instruments)**

    This is the General Theory of Second Best in action: the inability to tax leisure (= the absence of a lump sum tax) creates an unavoidable labour-leisure distortion. 
    This makes it optimal to distort, not just a few other relative consumer prices, but all relative prices in order to counter-act this one unavoidable distortion.

### Independent Demands

Consider the special case where demands are independent so for all goods
$$
\frac{ \partial x^c_i}{\partial q_j} = 0
$$
There is no substitution effect, at best an income effect but we only care about compensated demand.
![](../../assets/notes/y3-p1-lecture-7-8-ramsey-taxation/07.png)
This is now simply, 
$$
-\frac{\frac{\partial x^c_1}{\partial q_1} p_1^2t_1}{p_1x_1} = \frac{\mu-\alpha}{\mu} \\ \ \\ -\frac{\frac{\partial x^c_2}{\partial q_2} p_2^2t_2}{p_2x_2} = \frac{\mu-\alpha}{\mu}
$$
- Recall that elasticity is defined as  $\epsilon = \frac{\partial x^c_1/x^c_i}{\partial q_i/q_i}$

- Recall that $q_i =  (1+t_i)p_i$

Then, we get the **Ramsey Taxation Result** (No SE)
$$
\frac{t_1}{1+t_1} = -\frac{\mu-\alpha}{\mu}\frac{1}{\epsilon^c_{11}} \\ \ \\ \frac{t_2}{1+t_2} = -\frac{\mu-\alpha}{\mu}\frac{1}{\epsilon^c_{22}}
$$
This says that the tax rate on each good should be inversely proportional to its (compensated) own-price elasticity.

**In other words, it is optimal to have high taxes on goods which are inelastic in demand.**

### Equity Considerations

To think about the possible equity efficiency trade-off involved in designing optimal Ramsey taxes, we must consider a many-person version of the Ramsey model, and introduce a SWF to optimise.

#### R,P Model

The model is the same as before, except we now have two representative consumers. 

**Two Consumers**
R and P, rich and poor. 
$$
V^R(q, m^R), \ \ V^P(q, m^P), \ \ \ \ \ \ \ \  m^r > m^P
$$

**Utilitarian SWF**
The social welfare function is assumed to be utilitarian so that we simply add up the indirect utilities of the two:
$$
SWF = \theta ^RV^R(q, m^R) + \theta^PV^P(q, m^P)
$$
If society wants to help the poor, we would expect $\theta ^P > \theta ^R$

The optimal tax problem is to select (ad valorem) taxes to maximise the social welfare subject to revenue requirement
$$
\tilde R = 	(q_1-p_1)x_1 + (q_2-p_2)x_2 \\ \ \\ x_i = x_i^R + x_i^P
$$

**Assume no compensated-cross-price effects:**
Once again, the optimal tax rule is 
$$
\frac{t_i}{1+t_i} = -(\frac{\mu-\alpha_i}{\mu}) \frac{1}{\epsilon_{ii}}
$$
The only difference is that the social marginal value of income α is replaced by a** commodity-specific social marginal value of income, **$\alpha_i$**. **

This new object is defined as 
$$
\alpha_i = s_i^P \alpha^P + s_i^R \alpha^R
$$
- $s^h_i$ = share of consumption of i, belonging to consumer h
- $\alpha^h$ = marginal social value of income for consumer h
    - **THIS IS DIFFERENT TO RICH AND POOR PEOPLE**
![](../../assets/notes/y3-p1-lecture-7-8-ramsey-taxation/10.png)
- $\theta^h$ = society accords a certain weight to putting a unit of income in rich hands vs poor hands
- $\lambda^h$ = rich people value additional income less by nature of the indirect utility function being diminishing
- (bracket term) = revenue effect, the amount of new tax revenue generated will differ depending on who gets more income 
    - (rich people will use income to consume rolexes, poor people will use income to consume potatoes)

If society cares about the poor more than the rich then 
$$
\alpha^P > \alpha^R \\ \ \\ \implies \alpha_i \neq \alpha_j
$$
- $\alpha_i$ is higher for goods which pre-dominated consumed by those for whom the social marginal value of income is high
- $\alpha_i$ is in other words higher for potatoes

The optimal tax formula in turn tells us that these are the goods which should be taxed leniently. 
$$
\text{Equity Channel: } \ \frac{\mu-\alpha_i}{\mu}
$$
- Higher alpha products are taxed less
<br>The efficiency aspect is represented through the<br>inverse elasticity term as before. 
$$
\text{Efficiency Channel: } \frac{1}{\epsilon_{ii}}
$$

**There is only a tradeoff, if high alpha products are also inelastic. **This is of course actually true, so there is an equity-efficiency tradeoff!

#### Alternative Interpretation

“goods that constitutes a large share of the *budget<br>of the poor *(i.e. inferior goods) should every thing else being equal be taxed at a lower rate”

Yes, this is a true statement here is why.

Let the budget of a type h consumer be 
$$
m^h+l^h_0 = \bar m^h = q_1x_1^h+q_2x_2^h
$$

The consumer’s budget share of a good i, is thus 
$$
\sigma^h_i = \frac{q_ix^h_i}{\bar m^h}
$$

The physical unit share of consumption to individual h, of a good i, out of the total consumption of society is 
$$
s_i^h = \frac{q_ix^h_i}{q_ix^P_i + q_ix^R_i} = \frac{\sigma^h_i \bar m^h}{\sigma^P_i \bar m^P+\sigma^R_i \bar m^R}
$$
Take the derivative w.r.t to budget share of a poor 
$$
\frac{\partial s^P_i}{\partial  \sigma^P_i} = \frac{\bar m^P (\sigma^R_i \bar m^R)}{(\sigma^P_i \bar m^P+\sigma^R_i \bar m^R)^2} > 0
$$

This means that the share of good i consumed by the poor $s^p_i$, is indeed bigger when it constitutes a larger share of the<br>budget of the poor. 

We can, therefore, see that it is OK to say that good which constitutes a larger share of the budget of the poor should<br>be tax relatively leniently.
$$
\alpha_i = s_i^P \alpha^P + s_i^R \alpha^R
$$
Because $\uparrow \sigma_i^P \rightarrow \ \uparrow  s^P_i \rightarrow \ \uparrow \alpha_i \rightarrow \ \downarrow t_i$

## Stiglitz and Rosengard Ch.20

![](../../assets/notes/y3-p1-lecture-7-8-ramsey-taxation/11.png)
Diagrammatically
![](../../assets/notes/y3-p1-lecture-7-8-ramsey-taxation/12.png)
In Figure 20.5C, the **marginal deadweight loss per marginal dollar of<br>revenue raised is higher for commodity i than for commodity j** at any given tax rate. 
To equate the marginal deadweight loss per marginal dollar of revenue raised, we must impose a lower tax rate on i than on j. 
Ramsey’s basic insight was to observe that **commodities with low elasticity of demand have a lower marginal deadweight loss per marginal dollar of revenue raised**, and thus should face higher marginal tax rates.

If demand is interdependent, the basic formula is not the same, have to account for the SE. Nonetheless, you still get result:
![](../../assets/notes/y3-p1-lecture-7-8-ramsey-taxation/13.png)

## Hindriks and Myles Ch.15.5

15.5.1 - Independent Demands (Inverse Elasticity Rule)
This independence of demands is a strong assumption. 
The way the analysis works is to **choose the optimal allocation<br>and infer the tax rates from this.**
![](../../assets/notes/y3-p1-lecture-7-8-ramsey-taxation/14.png)
Note that $\alpha$ is the marginal utility of income, it must be equal to the marginal utility per pound spent on good 1 = good 2
![](../../assets/notes/y3-p1-lecture-7-8-ramsey-taxation/15.png)
Differentiate the Lagrangean
![](../../assets/notes/y3-p1-lecture-7-8-ramsey-taxation/16.png)
15.9 is the **inverse elasticity rule**
- the proportional rate of tax on good i should be inversely related to its price elasticity of demand.
- the constant of proportionality is the same for all goods

15.5.2 - Interdependent Demands (Ramsey Rule)
The general result is called the Ramsey rule, and it is one of the oldest results in the theory of optimal taxation. 
It provides a description of the **optimal taxes for an economy with a single consumer and with no equity considerations.**

![](../../assets/notes/y3-p1-lecture-7-8-ramsey-taxation/17.png)
From the FOC, we do some rearrangement noting:
- The budget constraint, when differentiated gives (15.14)
    ![](../../assets/notes/y3-p1-lecture-7-8-ramsey-taxation/18.png)
- The optimal consumer choice tells us that
    ![](../../assets/notes/y3-p1-lecture-7-8-ramsey-taxation/19.png)
- Substitute that into the FOC
    ![](../../assets/notes/y3-p1-lecture-7-8-ramsey-taxation/20.png)
- Now use the Slutksy decomposition
    ![](../../assets/notes/y3-p1-lecture-7-8-ramsey-taxation/21.png)
- And substiute it in, isolate the SE, then clean up constants as $\theta$
    ![](../../assets/notes/y3-p1-lecture-7-8-ramsey-taxation/22.png)
- Equation (15.20) is the Ramsey rule describing a system of optimal commodity taxes and an equation of this form must hold for all goods
    ![](../../assets/notes/y3-p1-lecture-7-8-ramsey-taxation/23.png)
- This is important the optimal tax rate is *NOT* a uniform lift-up on the prices of all goods in the economy; **rather it is a unfiorm reduction in *quantity demanded* vis a vis the pre-tax position.**
    ![](../../assets/notes/y3-p1-lecture-7-8-ramsey-taxation/24.png)

15.6 - Equity Considerations
Now make this a two consumer economy
![](../../assets/notes/y3-p1-lecture-7-8-ramsey-taxation/25.png)
There is some SWF, maximise the SWF s.t. R constraint using $t_k$
![](../../assets/notes/y3-p1-lecture-7-8-ramsey-taxation/26.png)
Using the old analysis we get that this solves to
![](../../assets/notes/y3-p1-lecture-7-8-ramsey-taxation/27.png)
Returning to a result that is similar to Ramsey rule
![](../../assets/notes/y3-p1-lecture-7-8-ramsey-taxation/28.png)
![](../../assets/notes/y3-p1-lecture-7-8-ramsey-taxation/29.png)
LHS = proportional change in aggregate compensated demand for good k from the imposition of the whole tax system
- This is negative, taxes reduces demand
RHS = two terms
- Equity Term
![](../../assets/notes/y3-p1-lecture-7-8-ramsey-taxation/30.png)
- Efficiency Term
![](../../assets/notes/y3-p1-lecture-7-8-ramsey-taxation/31.png)
15.7 - Applications
![](../../assets/notes/y3-p1-lecture-7-8-ramsey-taxation/32.png)
MRB is easy to calculate using existing data
![](../../assets/notes/y3-p1-lecture-7-8-ramsey-taxation/33.png)

## Past Papers

### Q4 - 2016 - Ramsey Optimal Tax

![](../../assets/notes/y3-p1-lecture-7-8-ramsey-taxation/34.png)

### Q1 - 2017 - Ramsey Tax and Externalities

### Q2 - 2018: Many Person Ramsey Tax Rule

![](../../assets/notes/y3-p1-lecture-7-8-ramsey-taxation/37.png)

### Q3 - 2021 - Ramsey Optimal Tax (Ad Valorem)

![](../../assets/notes/y3-p1-lecture-7-8-ramsey-taxation/38.png)
Part (a) is pretty simply about the **Dalton’s Formula**. So go seek that in Lecture 2 of tax incidence, it is based on infinitesmals, and market clearing.

#### Part (c) VAT exemptions and Diamond Mirrlees.

VAT with no exemptions
VAT-registered businesses can reclaim the VAT they pay on business-related inputs (known as Input VAT). In a well designed system, (2nd best), **all firms ‘are under VAT’** so they all are all VAT registered. 
This ensures every firm gets to pay zero taxes on their inputs, the only agent who cannot claim back the tax is the end consumer. This system then means all the VAT lumps onto the final consumer. It means VAT is an output tax.

VAT with exemptions
Some sectors are exempt from VAT meaning they charge no VAT to end consumers (e.g. Schools and Hospitals). This is fine, it’s not like the end output market (allocative efficiency) was achieved in first place anyways cuz of the taxes.
**The problem with VAT exemptions it that it means Schools and Hospitals also cannot claim back VAT they pay on their inputs. **They *pay higher prices for inputs* than other businesses! 
They face a huge incentive to do everything in-house, this is why you see so many schools and hospitals also having their own in house catering team, in house laundry which no one else really does! 
It would obviously be more productive to reallocate that labour from in-house catering teams to the professional catering companies. 
