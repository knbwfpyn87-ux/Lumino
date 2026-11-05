export default String.raw`
@course micro-macro | Principles of Economics (College) | College | 💹 | College

// Follows a standard college principles of economics course (OpenStax Principles of Economics 3e): foundations, supply and demand, consumer and firm behavior, market structures, macroeconomic measurement, and fiscal and monetary policy.

@unit Microeconomics | Supply and demand, elasticity, costs, market structures
@lesson Supply, demand and elasticity
say: Microeconomics studies choices by households and firms. Supply and demand are its core model.
key: Scarcity means every choice has an opportunity cost. Comparative advantage explains gains from trade.
Demand slopes down; supply slopes up. A change in price moves along a curve; changes in income, tastes, related prices, expectations or buyers shift demand; input costs, technology and taxes shift supply. Equilibrium sets price and quantity; price ceilings cause shortages and price floors cause surpluses.
Elasticity: PED = %ΔQd ÷ %ΔP (use the midpoint formula). Elastic demand (|PED| > 1) means price cuts raise revenue. Tax incidence falls more on the less elastic side.
ex: Price rises from $4 to $6 and quantity falls from 120 to 80. Find PED (midpoint).
> %ΔQ = −40/100 = −40%; %ΔP = 2/5 = 40%
= PED = −1 (unit elastic)
term: opportunity cost = the value of the best alternative forgone
term: equilibrium = where quantity supplied equals quantity demanded
term: price floor = a legal minimum price above equilibrium
term: tax incidence = how a tax's burden is divided between buyers and sellers
q: A rise in consumer income for a normal good shifts demand… | *right | left | not at all | along the curve
why: Buyers want more at every price.
q: A binding price ceiling creates… | *a shortage | a surplus | equilibrium | deadweight gain
why: Quantity demanded exceeds supply.
gen: stem.elasticity, bank.HIST.economics

@lesson Costs and market structures
say: Firms choose output to maximize profit, and the market structure shapes the outcome.
key: Costs: fixed, variable, total, average and marginal cost. Diminishing marginal returns make MC rise. Profit is maximized where marginal revenue MR = marginal cost MC. Economic profit subtracts implicit costs; accounting profit doesn't.
Perfect competition: many firms, identical products, price takers (P = MR); long-run economic profit is zero. Monopoly: one firm, barriers to entry, sets MR = MC then charges the price on demand, causing deadweight loss. Monopolistic competition: differentiated products. Oligopoly: few interdependent firms (game theory, the prisoner's dilemma).
Market failures include externalities and public goods; government can use Pigouvian taxes, subsidies and regulation.
term: marginal cost = the extra cost of producing one more unit
term: price taker = a firm that can't affect the market price
term: deadweight loss = lost total surplus from an inefficient quantity
term: oligopoly = a market dominated by a few interdependent firms
q: Every firm maximizes profit where… | *MR = MC | P = ATC | TR is maximized | MC is minimized
why: Producing beyond adds more cost than revenue.
q: In the long run, perfectly competitive firms earn… | *zero economic profit | large economic profit | losses | monopoly profit
why: Entry and exit remove profits.

@unit Macroeconomics | GDP, unemployment, inflation, fiscal and monetary policy
@lesson Measuring the macroeconomy
say: Macroeconomics studies the whole economy: total output, jobs and prices.
key: GDP = C + I + G + (X − M), the market value of final goods and services produced in a country. Real GDP adjusts for inflation using a deflator; GDP per capita divides by population. GDP misses non-market work, inequality and the environment.
Unemployment rate = unemployed ÷ labor force × 100. Types: frictional, structural and cyclical; the natural rate excludes cyclical.
Inflation is measured with the CPI: inflation rate = (CPI₂ − CPI₁)/CPI₁ × 100. Unexpected inflation hurts lenders and people on fixed incomes.
ex: The CPI rises from 200 to 210. Find the inflation rate.
> (210 − 200) ÷ 200 × 100
= 5%
term: real GDP = GDP adjusted for changes in the price level
term: labor force = people employed plus those unemployed and seeking work
term: consumer price index = a measure of the cost of a fixed basket of goods
term: natural rate of unemployment = frictional plus structural unemployment
q: Which is counted in GDP? | *A new car made domestically | A used car resale | Stocks bought | Unpaid housework
why: Only new final goods and services count.
q: Someone who stops searching for work is… | *not in the labor force | unemployed | employed | cyclically unemployed
why: They're not seeking work.
gen: stem.gdp, stem.inflation, stem.unemployment

@lesson Fiscal and monetary policy
say: Governments and central banks try to keep the economy growing steadily with low inflation.
key: The AD–AS model: aggregate demand slopes down; short-run aggregate supply slopes up; long-run aggregate supply is vertical at potential output. Recessionary gaps cause unemployment; inflationary gaps cause rising prices.
Fiscal policy: changes in government spending and taxes. The spending multiplier = 1 ÷ (1 − MPC). Deficits add to national debt and may crowd out private investment.
Monetary policy: the Federal Reserve targets the federal funds rate using interest on reserves and open market operations. Lower rates boost investment and AD; higher rates fight inflation. Banks create money through fractional-reserve lending (money multiplier = 1 ÷ reserve ratio).
ex: MPC = 0.75. How much can GDP rise from $100 billion of new government spending?
> Multiplier = 1 ÷ 0.25 = 4
= up to $400 billion
term: aggregate demand = total spending in an economy at each price level
term: fiscal policy = government spending and taxation used to influence the economy
term: open market operations = the central bank buying or selling government bonds
term: crowding out = government borrowing reducing private investment
q: To fight a recession, the Fed would most likely… | *lower interest rates | raise interest rates | raise reserve requirements | sell bonds
why: Cheaper borrowing boosts spending.
q: With a 10% reserve requirement, the simple money multiplier is… | *10 | 0.1 | 1 | 100
why: 1 ÷ 0.10.
gen: stem.multiplier
`;
