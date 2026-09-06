---
title: "Lecture #2 - Tax Incidence"
paper: "Paper 1 — Microeconomics"
year: "Year 3 (Part IIB)"
section: "Theory of Second Best"
description: "Theory of Second Best notes: Lecture Notes; Lump Sum Taxes; Principles of Tax Incidence."
order: 3
tags: ["economics"]
---

## Lecture Notes

### Lump Sum Taxes

A lump sum tax is a tax where the taxpayer cannot affect his or her tax liabilities by changing behavior.
- It’s got to be on levied the taxpayer cannot change
- For instance you can levy everyone £1 for having brown eyes, or just anyone alive

In lump sum tax, the incidence falls 100% on the tax payer.

Impossibility of using LST
To achieve your SWF you have to tax people with better ‘endowments’ (e.g. ability like IQ) and redistribute it to people with lesser ‘endowments’.
- The most important determinant of the “quality of the endowment” of an individual is his or her **ability **which, in turn, determines his or her earnings-potential. 
- **But “ability” is private information** and individuals will have no incentive to reveal the quality of their endowment to the government if they can reduce their tax liabilities by<br>concealing it. (Tax on IQ, just lie about your IQ)
- **This rules out the use of optimal or person-specific lump sum<br>taxes **and forces governments to tax characteristics which they can observe (e.g., income or purchases of goods).
    - Ofc, the government could raise revenue through poll taxes, i.e., lump sum taxes where all citizens pay the same amount, but this is generally considered to be unfair and regressive.
    - It also eliminates the point of FWTII to redistribute!

    ![](../../assets/notes/y3-p1-lecture-2-tax-incidence/01.png)

Distortionary Tax
The government cannot observe endowments but can observe income or consumptions, hence it levies taxes on those.
- **SO YOU HAVE TO BASE TAXATION ON OBSERVABLE FACTORS; such factors are of course changeable** 
- Thus incidence matters

Tax incidence analysis is only interesting from an economic point of view if **taxes are distortionary, i.e., if taxpayers can do things to affect their tax liability.**
- Thus all taxes, apart from lump sum tax, is distortionary

### Principles of Tax Incidence

Principle 1: Tax Liability Side Equivalence
- The burden of a tax is not necessarily borne by those whom the tax is levied. 
- This implies that the **incidence of the tax does not, in general, depend on which side of a competitive market it is, levied,** assessed or collected.

Principle 2: Dalton’s Formula
- Incidence is borne by those who cannot easily change behavior
- i.e. Taxes will be shifted by those agents that are more elastic in supply or demand to those that are less elastic.
    - E.g. The more relatively elastic demand is to supply, the more incidence is borne by firms than consumers.
    - E.g. The more relatively elastic supply is to demand, the more incidence is born by consumers than firms.

Principle 3: SR and LR
- The short run and long run incidence of a tax can be<br>very different
- Elasticities change over time

Principle 4: Method of tax
- In a competitive economy, if comparing two tax methods that raise the same revenue it does not matter (for tax incidence) if it is levied as:
    - a unit tax
    - ad valorem tax
- **It does, however, matter if competition is not perfect,** i.e., if markets are characterized by monopoly or oligopoly.

### Partial Equilibrium Framework

Tax Notation
Recall in the baseline model for a commodity x, that:
- t = q-p for a unit tax
- t = (q-p)/p for ad valorem tax

Ad Valorem is a bit unintuitive think of it like this
- There are four important types of taxes which are typically levied as a percentage of the price of the good. 
    - **sales taxes**
    - **expenditure taxes**
    - **value added tax **
    - **income taxes**. 

In each case, to think about ad valorem tax is to start with price paid by the side of the market from which the tax is not collected.
    - Expenditure tax is collected from consumers
        - So start with p (producer price)
        - The consumers pay that plus the percentage tax. t_e
        $$
        q = p(1+t_e)
        $$

    - Sale tax is collected from firms
        - So start with q (consumer price)
        - The firm earns that and hands t% of it to government
        - You discount firm’s revenue by the amount 1+t_s
        $$
        p = \frac{q}{1+t_s}
        $$

Demand and Supply
For demand, **assume that there is no income effect. **Demand elasticity is negative because it is down sloping.
$$
x^D = D(q) \\ \ \\ \epsilon^D = \frac{\partial D}{\partial q} \frac{q}{x^D}
$$
So that the compensated (Hicksian) and uncompensated (Marhsallian) demand curves are the same

For supply, assume there is decreasing returns for a competitive market. The elasticity is positive as it is up sloping.
$$
x^S = S(p) \\ \ \\ \epsilon^S = \frac{\partial S}{\partial p} \frac{p}{x^S}
$$

### Principle 1 (Tax Liability Equivalence)

- We assume that demand and supply functions are linear
- We consider a unit tax

Levy on producer
- Now suppose we levy the tax on producers, market clearing is 
$$
D(q) = S(p) =S(q-t)
$$
![](../../assets/notes/y3-p1-lecture-2-tax-incidence/02.png)
- Recall the supply curve is the marginal cost curve, and we shift the marginal cost up by the amount of the tax.
    - p = q + t, so S(p) is literally shifted up by amount t in the q axis

Levy on consumer
- Now suppose we levy the tax on consumers, market clearing is
$$
D(q) = D(p+t) =  S(p) 
$$
- Recall the demand curve is the maximum you are willing to pay, that now is reduced directly how much tax paid t
    - q = p - t, D(q) function thus shifts by amount t downward in the p axis
![](../../assets/notes/y3-p1-lecture-2-tax-incidence/03.png)
Evidently, clearing outcome is the same either way, so incidence is also the same. 

We can see equivalence by putting all in the same graph
![](../../assets/notes/y3-p1-lecture-2-tax-incidence/04.png)

### Principle 2 (Dalton’s Formula)

Let’s assume it is a unit tax levied on consumers, so clearing
$$
D(q) = D(p+t) =  S(p) 
$$
Take the total derivative of this to get
$$
\frac{\partial D}{ \partial q} (dp + dt) = \frac{\partial S}{\partial p} dp
$$
- Total change of D = Total change of S
    - Total change of D = slope \* change in input (dq = dp + dt)
    - Total change of S = slope \* change in input (dp)

Solve this equation to get that the change in producer price is
$$
\frac{dp}{dt} =   \frac{\frac{\partial D}{\partial q}}{\frac{\partial S}{\partial p}-\frac{\partial D}{\partial q}}
$$
Since at equilibrium x_D = x_S, and q = p (if tax is small)
- multiply anything related with demand by q/x_D
- multiply anything related with supply by p/x_S
- and this works it’s scaling everything by approx same factor

This rearranges to give us 
$$
\frac{dp}{dt} = \frac{\frac{\partial D}{\partial q} \frac{q}{x^D}}{\frac{\partial S}{\partial p}\frac{p}{x^S}-\frac{\partial D}{\partial q}\frac{q}{x^D}} \\ \ \\ = \frac{\epsilon^D}{\epsilon^S - \epsilon^D} \\ \ \\ = \frac{1}{\frac{\epsilon^S}{\epsilon^D}-1} < 0
$$
Since dq = dp + dt, we get that the effect on consumer price is
$$
\frac{dq}{dt}  = \frac{dp}{dt} + 1 \\ \ \\ \frac{dq}{dt} = 1 + \frac{\epsilon^D}{\epsilon^S - \epsilon^D} = \frac{1}{1-\frac{\epsilon^D}{\epsilon^s}} > 0
$$

So now we can see how consumer and producer incidence work:
![](../../assets/notes/y3-p1-lecture-2-tax-incidence/05.png)
Graphically see that:
![](../../assets/notes/y3-p1-lecture-2-tax-incidence/06.png)
The more elastic party pays

### Principle 3 (SR LR)

This is an implied follow up from principle 2.
- In the SR, firms are inelastic they cannot change capital
- In the LR, firms are elastic they can change capital

![](../../assets/notes/y3-p1-lecture-2-tax-incidence/07.png)
Thus over the long-run more incidence should fall onto consumers.

There is another reason why the long run and short run incidence of a tax is different. It has to do with capital accumulation. 

**Imagine a tax levied on capital.** 
- In the short run, the stock of capital is fixed and so the incidence is taken entirely by firms.
- The tax reduces the incentive to invest and so the<br>capital stock will gradually depreciate.
- A consequence is that the marginal product of labour falls so the demand will fall and the wage rate will too, so that in the long run part of the incidence is shifted to workers.

### Principle 4 (Method of tax equivalence)

- In a competitive market, ad valorem and unit taxes are equivalent in terms of the distortions to agens
    ![](../../assets/notes/y3-p1-lecture-2-tax-incidence/08.png)
- The unit tax diagram is simple
- Now let’s derive the ad valorem diagram
    ![](../../assets/notes/y3-p1-lecture-2-tax-incidence/09.png)
    Basically, 
    $$
    pt^{ad} x_{ad} = t^ux_u \implies x_{ad} = x_{u} \implies \text{same volume, same incidence}
    $$

- What if there is no perfect competition?
    ![](../../assets/notes/y3-p1-lecture-2-tax-incidence/10.png)

## Stiglitz and Rosengard

Tax on Firm
Note diagram 1 = one firm, diagram 2 =  whole market
![](../../assets/notes/y3-p1-lecture-2-tax-incidence/11.png)

Equivalence of general and specific tax
To achieve the same tax revenues for ad valorem and for per unit tax, you need to hit the same volume of transactions

That means the incidence is the same
![](../../assets/notes/y3-p1-lecture-2-tax-incidence/12.png)
The revenue raised is either p\*t_a\*x, or t_ux. The thing is, either you set t_u to reach x or you set t_a to reach 1+pt_a but they still multiply to be the same number.

In general unit tax (on volume) is easier than ad valroem (on price) as the latter just incentiveises people to lie about invoices… adminstrative burden of unit taxes is far less.

Taxing a Monopoly
**A tax on a monopolist may be shifted more than 100 percent—that is, the price paid by consumers may rise by more than the tax.**
![](../../assets/notes/y3-p1-lecture-2-tax-incidence/13.png)
Derivation of linear case
![](../../assets/notes/y3-p1-lecture-2-tax-incidence/14.png)

Derivation of non-linear case
In the case of a competitive industry, we showed that: 
- the **consumer price increased by an amount that normally was less than the tax.**
- the magnitude of the price increase depended on the demand and supply elasticities. 

The results for a monopolist are more complicated (this is why we do not tax monopolies, we break them).

![](../../assets/notes/y3-p1-lecture-2-tax-incidence/15.png)
So,
![](../../assets/notes/y3-p1-lecture-2-tax-incidence/16.png)

Corporation Tax
Unfortunately, many taxes aff ect many industries simultaneously. The<br>corporate income tax aff ects all incorporated businesses. If, as a result of the tax, incorporated businesses reduce their demand for capital, the capital released cannot be absorbed by the rest of the economy (the unincorporated sector) without reducing the return to capital there. 
Thus, we cannot assume that what the corporate sector must pay to obtain capital is independent of the tax imposed on that sector. To analyze the impact of the corporation tax requires analyzing its effect on the equilibrium of the entire economy, not just the businesses on which the tax is imposed. 
Such an analysis is called a general equilibrium analysis.
![](../../assets/notes/y3-p1-lecture-2-tax-incidence/17.png)
Equivalence
A tax on output (a uniform sales tax), a proportional income tax, and a uniform value-added tax are all equivalent. 
A uniform tax on wages and a uniform tax on consumption are equivalent

Non-Equivalence of Ad-Valorem and Unit to Monopoly
We asserted in the text that an ad valorem tax (a tax based on a fixed percentage of the value of sales) would reduce output less than a specific tax (a fixed tax on each unit sold) for any given revenue raised by the government.<br>
The reason is that the** ad valorem tax reduces marginal revenues by<br>less than the tax, whereas the specific tax reduces marginal revenues by exactly the amount of the tax.** 

Because a monopolist sets marginal revenue equal to marginal cost, if marginal revenue is reduced by less, output is reduced by less.
![](../../assets/notes/y3-p1-lecture-2-tax-incidence/18.png)
![](../../assets/notes/y3-p1-lecture-2-tax-incidence/19.png)
In this diagram we assume the monopolist has flat MC
![](../../assets/notes/y3-p1-lecture-2-tax-incidence/20.png)
In the case of unit tax, MR shifted down exactly, not much revenue is generated by reducing output from Q0 to Q1
![](../../assets/notes/y3-p1-lecture-2-tax-incidence/21.png)
In the case of ad valorem, MR shifted down and *also *slope change.
The reduction in output is same but the tax collected is way more

## Hindriks and Myles

**13.3 Lump Sum Tax**
It’s very hard to do, Poll tax was mean to be one (didnt work people moved house, did not update register and millions avoided the tax this way). But that’s also not *optimal*.

Recall that Optimal** here means a tax that is chosen, via application of the Second Theorem, to achieve the income distribution<br>necessary** to decentralise the chosen allocation of the planner. 
The optimal lump sum tax system is not a uniform tax on each consumer. 
This is because **the role of the lump-sum taxes is fundamentally redistributive**, so the taxes will be highly differentiated across consumers. 
Since even uniform lump-sum taxes are implemented with difficulty, the use of differentiated taxes presents even greater problems.

**13.4 *Optimal* Lump Sum Tax**
Lump-sum taxes are incentive incompatible when at least one individual, who understands how the information that is reported will be used, chooses to report falsely.

If you can observe ability it works
![](../../assets/notes/y3-p1-lecture-2-tax-incidence/22.png)
Tax people based on their ability, if they deliberately work not hard well they srewed themselves. The tax was designed to make it so they have the incentive to work hard not be lazy, they are worse off it they are lazy.

Now suppose that government cannot observe ability but can observe income of each individual. 

Assume that it still attempts to implement the optimal lump-sum taxes. The taxes are obviously not incentive compatible because, if the high–ability type understand the outcome, they can always choose to earn as little as the low ability type. 

Doing so then qualifies the high–ability type for the redistribution aimed at the low-ability type. This will provide them with a higher utility level than if they did not act strategically. The optimal lump-sum taxes cannot then be implemented with private information.

## Testing the Mill Hypothesis

Sausgruber and Tyran (2003) - Testing the Mill hypothesis of fiscal illusion∗<br>
![](../../assets/notes/y3-p1-lecture-2-tax-incidence/23.png)

![](../../assets/notes/y3-p1-lecture-2-tax-incidence/24.png)

## Past Questions

### Q5 2015 - Incidence of Subsidy

![](../../assets/notes/y3-p1-lecture-2-tax-incidence/25.png)
