window.BOOK_TEXT = {
  parts: {
    "phan-1": { title: "The Bean", blurb: "What is already decided before you touch the kettle" },
    "phan-2": { title: "Water", blurb: "98% of your cup is water" },
    "phan-3": { title: "Extraction", blurb: "Truths and legends about what water takes away" },
    "phan-4": { title: "Cupping", blurb: "A diagnostic tool, not a competition" },
    "phan-5": { title: "Pour Over", blurb: "The physics of flow, and what your hand can actually do" },
    "phan-6": { title: "The Bridge", blurb: "From a cupping bowl to a pour-over" },
    "phan-7": { title: "Perception", blurb: "The cup is not the end — it is half the story" },
    "phan-8": { title: "The Notebook", blurb: "Pages to consult, not to read" }
  },

  chapters: {
    "ch-bon-bien-so": {
      title: "Four variables already set before you touch the kettle",
      lede: "Most of the flavour in your cup was decided in advance. Knowing that does not leave you powerless — it frees you from optimising things that do not matter.",
      minutes: 8,
      tags: ["foundations", "mindset"],
      body: `
<p>Start with a thought experiment. You have two bags of coffee: an Ethiopian washed light roast, and a Vietnamese Robusta dark roast. You brew both with the same recipe, the same grind, the same water. The results will differ so much that nobody could confuse them. Reverse it: brew the same bag ten different ways and the results will differ — but they will all sit inside a distinct band, and that band is set by the bag.</p>

<p>That is the central idea of this book: <strong>a cup has a ceiling, and the ceiling is set before you begin.</strong> Your job is not to create flavour. Your job is not to drop it.</p>

<p>Four things set that ceiling. You control none of them once you have bought the beans — but you need to know them, because they decide what you should expect and which way to adjust.</p>

<h3>1. Variety</h3>

<p>Variety sets the <em>character</em> of the flavour, and it is the most durable of the four. Robusta carries roughly twice the caffeine of Arabica, less sugar, and more roast-derived compounds — so it is more bitter, heavier, and has a characteristic "bean" smell. Arabica has more organic acids and sugars, so it is brighter, more aromatic, and lighter.</p>

<p>In Vietnam you will mostly meet four groups: Robusta (usually Canephora, grown in Đắk Lắk and Gia Lai), Arabica Catimor (a disease-resistant hybrid grown in Cầu Đất and Sơn La — the majority of Vietnamese Arabica), Arabica Bourbon/Typica (less common, higher quality), and newer varieties such as Gesha and Pacamara in small specialty lots.</p>

<p>Catimor is the clearest example of how variety sets a ceiling. It yields well and resists disease, but its flavour is usually described as flat: little fruit, a more bitter finish, sometimes notes of bean or wood. No grind size fixes that. A perfectly brewed Catimor is still a perfectly brewed Catimor — clean, tea-like, sweet, but without apricot.</p>

<h3>2. Processing</h3>

<p>After picking, the fruit has to be separated from the seed. How that is done has a large effect on flavour — and it is the variable drinkers discount most.</p>

<div class="table-wrap">
<table>
<thead><tr><th>Process</th><th>What happens</th><th>What it does to the cup</th></tr></thead>
<tbody>
<tr><td>Washed</td><td>Fruit and mucilage removed before drying</td><td>Clean, clear acidity, a high and transparent aroma. Bright fruit, but not jammy sweetness.</td></tr>
<tr><td>Natural</td><td>The whole fruit is dried</td><td>Sweeter, ripe fruit, sometimes fermented. More body, less clarity.</td></tr>
<tr><td>Honey</td><td>Pulp removed, mucilage left on</td><td>In between. Sweeter than washed, cleaner than natural.</td></tr>
<tr><td>Controlled fermentation</td><td>Fermented in tanks with selected microbes</td><td>Lots of fruit, sometimes unusual notes (tropical, boozy, spiced). Easy to overdo.</td></tr>
</tbody>
</table>
</div>

<p>What to remember: if you drink a natural and think "too much fruit, slightly fermented" — that is not a brewing fault. It is information about processing. And it points to a direction: naturals usually take less extraction (lower temperature, less agitation), because they are already generous with aroma.</p>

<h3>3. Roast level</h3>

<p>This is the most important of the four, and it has its own chapter. One sentence here: the darker the roast, the more porous the bean and the more freely it gives up material — but the more bitter compounds are also created during roasting. Both happen at once, which is why dark roast is not "easier" the way people assume.</p>

<h3>4. Freshness</h3>

<p>Freshly roasted beans release CO₂ for one to two weeks. CO₂ keeps water away from the grounds, so beans that are too fresh brew with a metallic sourness and uneven extraction. Beans that are too old oxidise: flat, papery, woody. This has its own chapter too.</p>

<div class="pull">You do not create aroma.<br>You can only <em>drop</em> it.</div>

<h3>Why this frees you</h3>

<p>If you believe technique creates flavour, you adopt a very specific attitude: every bad cup is a failure of skill, and every new technique is a chance to unlock hidden flavour. That attitude leads to a loop — you try twelve recipes, buy three more pieces of gear, and the cup still does not match the bag.</p>

<p>If you understand that the ceiling is already set, your attitude changes: a bad cup might be a brewing fault, or it might be <em>you drinking this coffee as it is, and this coffee is not for you.</em> Those two possibilities need two different responses, and telling them apart is the most important skill in this book.</p>

<div class="callout act">
<p class="callout-title">A small exercise</p>
<p>Take the bag you have. Read the label: variety, region, altitude, process, roast date. Write those four lines down. Then write one prediction: <em>"Given this, what should my cup have, and what should it not have?"</em> Brew, then compare. You have just built yourself a ruler — and that ruler matters more than any recipe.</p>
</div>

<p>One detail most drinkers do not know: the information on the bag <strong>affects what you taste</strong>. In a sensory study, when tasters were told the origin and process, their assessments shifted toward what they expected <span class="tier tier-a">Evidence</span>. Which means the "apricot" you find may come partly from the words on the bag.</p>

<p>This is not you being fooled. It is how the human brain works: taste is not separate from knowledge. But it has a plainly practical consequence — if you want to know what you <em>actually</em> like, you sometimes have to taste without knowing what you are tasting. Chapter 24 is about this.</p>
`
    },

    "ch-muc-rang": {
      title: "Roast level and the trap of “dark roast is easier”",
      lede: "Dark roast is not easier to brew. It is only different — and its window for success is narrower, not wider.",
      minutes: 10,
      tags: ["roast", "parameters"],
      body: `
<p>There is a popular belief among home brewers: dark roast is easier to brew, so beginners should start with dark roast. The belief is wrong in a subtle way — it is right in the first half and wrong in the second, and the second half is the one that matters.</p>

<p>Dark roast <em>really is</em> easier to extract. But "easier to extract" does not mean "easier to brew well". Those are two different things, and confusing them produces a great many bitter cups with no obvious cause.</p>

<h3>What happens in the roaster</h3>

<p>A green coffee bean is a dense block of cellulose, holding 10–12% water and hundreds of flavourless precursor compounds. During roasting, three processes run almost at once:</p>

<ul>
<li><strong>Water loss and expansion.</strong> The bean loses roughly 12–18% of its mass, mostly water, and its volume grows by 50–100%. The cellulose structure becomes porous and full of voids. This is why dark-roasted beans float.</li>
<li><strong>The Maillard reaction.</strong> Amino acids and reducing sugars combine into hundreds of aroma compounds: caramel, bread, hazelnut, chocolate. This is the roasted base you smell in every coffee.</li>
<li><strong>Caramelisation and acid breakdown.</strong> At higher temperatures sugars caramelise (creating the characteristic bittersweet taste) and organic acids begin to break down. Chlorogenic acid — the compound behind sourness and astringency — is partly degraded and converted into lactones, which taste more bitter.</li>
</ul>

<p>Two audible events mark the stages: <strong>first crack</strong> (around 196–205 °C), when steam and CO₂ trapped inside split the bean, and <strong>second crack</strong> (around 224–230 °C), when the cellulose structure starts to fracture. Light roasts stop before or just after first crack. Medium roasts stop between the two. Dark roasts go into or through second crack.</p>

<div class="table-wrap">
<table>
<thead><tr><th></th><th>Light</th><th>Medium</th><th>Dark</th></tr></thead>
<tbody>
<tr><td>Porosity</td><td>Low, heavy bean</td><td>Moderate</td><td>High, light bean</td></tr>
<tr><td>Solubles</td><td>Few, slow to release</td><td>Moderate</td><td>Many, released fast</td></tr>
<tr><td>Organic acids</td><td>High</td><td>Moderate</td><td>Low, already degraded</td></tr>
<tr><td>Origin character</td><td>Clearest</td><td>Partly intact</td><td>Overwhelmed by the roast</td></tr>
<tr><td>Baseline bitterness</td><td>Low</td><td>Moderate</td><td>High</td></tr>
<tr><td>Window for success</td><td>Wide, but needs force</td><td>Widest</td><td><strong>Narrow</strong></td></tr>
</tbody>
</table>
</div>

<h3>Why the dark-roast window is narrow</h3>

<p>Think of extraction as withdrawing money from an account. Light roast: a small account, but all of it is good money. You have to withdraw hard (finer grind, hotter water, agitation) to get enough — and if you overdo it you take a little bitterness too. Dark roast: a large account, with a fixed fee already charged — the bitter compounds created during roasting. A light withdrawal is enough, and any extra withdrawal takes more of that fee.</p>

<p>Put another way: <strong>dark roast forgives under-extraction, but punishes over-extraction severely.</strong> And over-extraction is far more common among beginners, who are usually told "grind finer, use hotter water" whenever a cup tastes weak.</p>

<div class="callout bad">
<p class="callout-title">The classic loop</p>
<p>You brew a dark roast and it tastes a bit thin. You grind finer. Still thin? You raise the temperature. Now the cup is both bitter and watery — a pair of symptoms that look contradictory but are entirely coherent: you extracted too much from the fines, while most of the bed was never extracted because water took the fast path through it.</p>
</div>

<h3>“Medium” does not mean one thing</h3>

<p>This is one of the most confusing points, and few people say it out loud: <strong>there is no shared definition of "medium roast".</strong> Every roaster has their own scale. One roaster's "medium" can be lighter than another's "light".</p>

<p>Objective scales exist — Agtron, which measures colour spectroscopically, or the older SCAA Light/Medium/Dark scale — but they are rarely printed on retail bags. And even Agtron has two variants (whole bean and ground) that give different numbers.</p>

<p>The practical consequence: <strong>do not use the word "medium" to choose parameters. Use your eyes and use the cup.</strong></p>

<h3>Reading roast level by eye</h3>

<div class="table-wrap">
<table>
<thead><tr><th>Sign</th><th>What it tells you</th></tr></thead>
<tbody>
<tr><td>Bean colour: pale gold → chocolate brown → glossy near-black</td><td>Relative roast level</td></tr>
<tr><td>Oily sheen on the surface</td><td>Past second crack. Fairly dark.</td></tr>
<tr><td>The centre line is still visible and lighter than the surface</td><td>Light roast — the bean has not fully expanded</td></tr>
<tr><td>Beans float during the bloom</td><td>Dark roast (little gas, many voids)</td></tr>
<tr><td>Beans sink, dense bed</td><td>Light roast, high density</td></tr>
</tbody>
</table>
</div>

<h3>Three parameters to change with roast level</h3>

<p>When you move from a light coffee to a dark one, this is the order to adjust:</p>

<ol class="steps">
<li><strong>Water temperature — drop 2–4 °C</strong><p>Dark roast already holds plenty of solubles and bitter compounds. Water at 96 °C pulls both out. 90–92 °C is a better starting point for dark roast. For light roast, 93–96 °C.</p></li>
<li><strong>Grind — one notch coarser</strong><p>Not because dark roast "needs a coarse grind", but because it releases material faster. The same grind yields more extraction on a dark roast. To hold extraction steady, you need a coarser bed.</p></li>
<li><strong>Stirring and pouring — less</strong><p>Dark roast does not need mechanical force to give up its solubles. Vigorous agitation only speeds up the extraction of the bitter part.</p></li>
</ol>

<div class="callout ok">
<p class="callout-title">One-sentence rule</p>
<p>The lighter the roast, the more <em>energy</em> you need to pull flavour out. The darker the roast, the less <em>energy</em> you need to avoid pulling bitterness out. Energy = heat + fineness + agitation.</p>
</div>

<h3>Special case: very light roasts</h3>

<p>Modern specialty coffee has drifted steadily lighter, sometimes stopping well before first crack is complete. These coffees can be hard to brew: they are dense, low in solubles, and can taste of "vegetal", "raw grain", or harsh sourness if they do not get enough energy. But brewed well they show origin character more clearly than anything else.</p>

<p>For these, the three levers are: hotter water (95–96 °C), a finer grind, and <strong>longer contact time</strong> — which is where immersion shows a clear advantage over percolation, because it keeps water in contact with the bed longer without needing a strong flow.</p>

<p>It is also why a Hario Switch or a French press is a better first brewer than a plain V60: they give you control over contact time, which a V60 does not.</p>
`
    },

    "ch-do-tuoi": {
      title: "Freshness: the number that got inflated",
      lede: "“Use within two weeks of roast” is correct advice in one very specific context — and it is applied wrongly almost everywhere.",
      minutes: 7,
      tags: ["storage"],
      body: `
<p>There is a small paradox in buying coffee: fresh-roasted beans <em>do not brew well</em>. They need time. But they also do not keep. Between those two points is a window, and that window is narrower than people think, but wider than people fear.</p>

<h3>What is happening inside the bean</h3>

<p>Roasting creates hundreds of volatile compounds — and CO₂. A lot of CO₂. A freshly roasted bean can hold a volume of gas many times its own volume. The gas escapes slowly through the pores, and the process is called <strong>degassing</strong>.</p>

<p>CO₂ causes two problems when you brew:</p>

<ul>
<li><strong>It pushes water away.</strong> Freshly roasted grounds, meeting hot water, release a large amount of CO₂ that forms bubbles around the particles. Those bubbles block water. The result: uneven extraction, a metallic sourness, and a bed that still looks alive.</li>
<li><strong>It makes the bloom uncontrollable.</strong> The bed swells violently, spills over the rim of the dripper, and you lose part of it up the filter wall — the part that never gets extracted.</li>
</ul>

<p>That is why the bloom exists: pour a small amount of water, wait for CO₂ to escape, then pour the rest. The bloom is not a ritual. It is a gas-handling step.</p>

<h3>So how long is enough?</h3>

<div class="table-wrap">
<table>
<thead><tr><th>Time after roast</th><th>State</th><th>How to brew</th></tr></thead>
<tbody>
<tr><td>0–3 days</td><td>Very high CO₂</td><td>Hard. Long bloom (60–90 s), gentle stir to release gas. Accept that results are unstable.</td></tr>
<tr><td>4–10 days</td><td>Still gassy, but easing</td><td>Starting to work. Bloom 40–45 s.</td></tr>
<tr><td>10–30 days</td><td>Stable</td><td><strong>The best window for most coffee.</strong></td></tr>
<tr><td>30–60 days</td><td>Starting to oxidise</td><td>Still drinkable. Aroma fading, flavour flattening.</td></tr>
<tr><td>60+ days</td><td>Clearly oxidised</td><td>Flat, papery, woody. Save it for cold brew or blends.</td></tr>
</tbody>
</table>
</div>

<p>How long this takes depends on processing and roast level. Naturals and dark roasts degas faster (more voids), so they come good sooner but also age faster. Washed and light roasts hold longer.</p>

<div class="callout warn">
<p class="callout-title">About the number “two weeks”</p>
<p>The "use within two weeks" advice comes from cafés: they need high consistency across hundreds of identical cups, and they have a continuous supply. At home, a 250 g bag often takes three to five weeks to finish. If you throw coffee away on day 21, you are discarding most of the bag because of a standard that was not written for you.</p>
</div>

<h3>Reading the date correctly</h3>

<p>You will see two kinds of date on a bag, and they mean completely different things:</p>

<ul>
<li><strong>"Roasted on"</strong> — the day the beans left the roaster. This is the useful number. If a bag shows only a "best before" and no roast date, that is usually a sign of commodity coffee, and you do not know what you are buying.</li>
<li><strong>"Best before"</strong> — usually twelve months after roasting, on a bag with a one-way valve. That number is about food safety, not about sensory quality. Eleven-month-old coffee is still "safe" and still drinkable — it is just no longer the coffee you bought.</li>
</ul>

<h3>Storage: four rules and one myth</h3>

<ol class="steps">
<li><strong>Air is enemy number one</strong><p>Oxidation is the main process that costs coffee its aroma. A bag with a one-way valve lets CO₂ out without letting air in — that is the best packaging there is. Do not transfer the beans into an open-mouthed glass jar "because it looks nice": you are trading a closed system for an open one.</p></li>
<li><strong>Light damages aromatic oils</strong><p>A clear jar on the counter beside the window is the worst combination. If you use a jar, make it opaque or keep it in a cupboard.</p></li>
<li><strong>Steady temperature, neither cold nor hot</strong><p>On top of the fridge or next to the stove are both bad. Temperature swings speed up oxidation and create condensation.</p></li>
<li><strong>Grind immediately before brewing</strong><p>This is the most important of the four, and it outweighs the other three combined. Ground coffee has thousands of times the surface area of whole beans, so it oxidises in hours, not weeks.</p></li>
</ol>

<div class="callout bad">
<p class="callout-title">Myth: keep coffee in the fridge</p>
<p>A fridge is humid and full of food smells. Porous coffee beans absorb both. The result: damp, mildly mouldy coffee that smells of the fridge. <strong>Do not store coffee in the fridge.</strong></p>
</div>

<h3>The real exception: freezing</h3>

<p>If you buy more than you can drink in three weeks, freezing is the only way to hold quality long-term <span class="tier tier-a">Evidence</span>. Low temperature slows almost every degradation reaction, and a freezer is far drier than a fridge.</p>

<p>But there are conditions, and they matter:</p>

<ul>
<li><strong>Split into single-brew portions</strong> before freezing. You cannot thaw and refreeze — each cycle creates condensation inside the bag.</li>
<li><strong>Vacuum-seal, or squeeze all the air out</strong> of each portion.</li>
<li><strong>Grind while still frozen</strong>, without thawing first. Frozen beans grind more evenly because they are brittle, and they keep their aroma because they spend less time in contact with room-temperature air.</li>
</ul>

<h3>Keep the proportions right</h3>

<p>Freshness matters. But if you have to choose between optimising freshness and fixing your water, fix the water first. A twenty-day-old bag brewed with the right water will taste better than a five-day-old bag brewed with water at 250 ppm alkalinity. That is not an opinion — it follows from alkalinity directly neutralising the acids that produce fruit, while oxidation at twenty days only slightly reduces aroma intensity.</p>

<p>Put another way: <strong>when you can only fix one thing, the order is water → grind → freshness → everything else.</strong></p>
`
    },

    "ch-nuoc": {
      title: "Water: the most underrated variable",
      lede: "A cup brewed at 1:16 is about 94% water. People spend hours choosing coffee and seconds choosing water.",
      minutes: 9,
      tags: ["water", "chemistry"],
      body: `
<p>Count the things you have bought to brew coffee: a scale, a kettle, a dripper, filters, a grinder, maybe a thermometer. Now count the things you have bought to improve your <em>water</em>. For most drinkers the second number is zero.</p>

<p>That is a strange imbalance, because water is the largest ingredient in the cup. And water is not inert — it is an active solvent, carrying minerals that react directly with the compounds in coffee.</p>

<h3>Three things in water that affect coffee</h3>

<p>Tap or bottled water contains dozens of dissolved substances. Only three groups really matter:</p>

<div class="table-wrap">
<table>
<thead><tr><th>Component</th><th>Effect</th><th>Importance</th></tr></thead>
<tbody>
<tr><td><strong>Bicarbonate (HCO₃⁻)</strong><br>measured as <em>alkalinity</em></td><td>Neutralises organic acids. High → fruit disappears, bitterness and "flatness" increase.</td><td><strong>Most important</strong></td></tr>
<tr><td><strong>Calcium, magnesium (Ca²⁺, Mg²⁺)</strong><br>measured as <em>hardness</em></td><td>Mg binds aroma compounds and pulls them into the water. But the sensory effect is smaller than people think.</td><td>Moderate</td></tr>
<tr><td><strong>Chlorine, chloramine</strong></td><td>Chemical smell, destroys aroma.</td><td>Easy to fix</td></tr>
</tbody>
</table>
</div>

<p>pH also has an effect, but a small one, and it is <em>governed by alkalinity</em>. If alkalinity is low, pH settles itself. Chasing pH first is chasing the symptom instead of the cause.</p>

<h3>Alkalinity: the thing that actually matters</h3>

<p><strong>Alkalinity</strong> is the water's capacity to neutralise acid — mostly through the bicarbonate ion. It is a measure of <em>buffering capacity</em>, not the concentration of one specific substance. The unit used in coffee is <strong>ppm as CaCO₃</strong>.</p>

<p>The mechanism is direct: the organic acids in coffee — citric, malic, acetic, lactic, chlorogenic — are exactly the compounds that create brightness, fruit, and "life". Bicarbonate neutralises them:</p>

<div class="formula">
<span class="fx-label">Neutralisation</span>
HCO₃⁻ + H⁺ → H₂CO₃ → CO₂ + H₂O
</div>

<p>In other words: <strong>high alkalinity turns your acids into CO₂ and water.</strong> You lose the fruit; what remains is roast flavour, bitterness, and a feeling of "full but empty".</p>

<div class="callout ok">
<p class="callout-title">How strong is the evidence?</p>
<p>This is one of the few claims in this book with solid foundations. Controlled sensory work by Christopher Hendon and colleagues (the group behind much of the research on water and coffee) shows that <strong>bicarbonate is the dominant factor in flavour perception</strong>, while adding calcium at high levels produced <em>no</em> significant sensory difference <span class="tier tier-a">Evidence</span>. That is why this book puts alkalinity first and hardness second.</p>
</div>

<h3>Reference targets</h3>

<p>Specialty coffee uses the SCAA/SCA targets as a starting point <span class="tier tier-b">Plausible</span>:</p>

<div class="table-wrap">
<table>
<thead><tr><th>Measure</th><th>Target</th><th>Acceptable range</th></tr></thead>
<tbody>
<tr><td>Alkalinity (as CaCO₃)</td><td><strong>~40 ppm</strong></td><td>40–75 ppm</td></tr>
<tr><td>Total hardness (as CaCO₃)</td><td>~68 ppm</td><td>50–175 ppm</td></tr>
<tr><td>pH</td><td>~7.0</td><td>6.5–7.5</td></tr>
<tr><td>Na⁺</td><td>—</td><td>&lt; 10 ppm</td></tr>
</tbody>
</table>
</div>

<p>40 ppm is the midpoint. At 20 ppm the acidity is very bright, sometimes sharp or thin. At 75 ppm the cup is balanced but the fruit is starting to blur. Above 100 ppm most light-roasted coffee loses its character. Above 200 ppm you are mostly tasting the roast.</p>

<div class="pull">Water is not the background.<br>Water is <em>part of the recipe</em>.</div>

<h3>Why this matters more than you think</h3>

<p>There is a very common story: someone buys an expensive bag of specialty coffee, brews it at home, and finds it "nothing special". They assume they brewed it wrong, or that the roaster oversold it. Most of the time the cause is the tap.</p>

<p>Think of it this way: you pay for 250 g of coffee to get apricot and florals. Then you brew it with water at 250 ppm alkalinity — water that neutralises much of the acid producing that apricot. You are paying for something your water erases.</p>

<p>This is not a small detail in the process. It is the biggest variable almost nobody checks.</p>

<h3>A concrete example from Vietnam</h3>

<p>Bottled mineral water in Vietnam usually carries very high bicarbonate — that is what mineral water is. Take La Vie, from its published product declaration: <strong>HCO₃⁻ 280–330 mg/L</strong>, TDS 310–590 mg/L, pH 8.0 ± 0.5.</p>

<p>Convert to coffee units:</p>

<div class="formula">
<span class="fx-label">HCO₃⁻ → alkalinity as CaCO₃</span>
Alkalinity = HCO₃⁻ × <b>50/61</b> ≈ HCO₃⁻ × <b>0.82</b><br>
305 mg/L × 0.82 ≈ <b>250 ppm as CaCO₃</b>
</div>

<p>Against a target of 40 ppm, that is <strong>more than six times too high</strong>. At that level you are no longer tasting the bean — you are tasting mineral water with coffee in it.</p>

<div class="callout warn">
<p class="callout-title">Do not generalise</p>
<p>That number applies to La Vie. Other brands differ — some considerably lower, some higher. Read the label on the bottle you actually use, and apply the conversion above. The next chapter covers reading labels, and measuring when the label does not say.</p>
</div>

<h3>Pure water is not the answer either</h3>

<p>If mineral water is too alkaline, the natural reaction is to switch to purified (RO) water. But RO water has alkalinity near zero — and at that level the acids are not buffered at all. The cup can taste sharply sour, edgy, without roundness. Uncontrolled sourness reads as thin and metallic rather than bright.</p>

<p>The perfect brewing water is not the cleanest water. It is water <strong>with exactly the right amount of mineral</strong> — enough to buffer acidity moderately, not enough to erase it.</p>

<p>The next three chapters are about getting there: measuring, diluting, and — if you want full control — building water from RO.</p>
`
    },

    "ch-do-nuoc": {
      title: "Measuring water without instruments",
      lede: "The TDS pen — the thing almost everyone buys first — does not measure what matters most. Here are three ways that do, ordered by cost.",
      minutes: 8,
      tags: ["water", "gear"],
      body: `
<p>There is a common and expensive misunderstanding: you buy a TDS pen, read "100 ppm, fine", and relax. The problem is that <strong>a TDS pen does not measure alkalinity</strong>.</p>

<h3>What a TDS pen measures</h3>

<p>A TDS (Total Dissolved Solids) pen does not actually count dissolved solids. It measures the water's <strong>electrical conductivity</strong> and multiplies by a factor to display a number in mg/L. Conductivity depends on total ions — calcium, magnesium, sodium, chloride, sulfate, bicarbonate, all of it added together.</p>

<p>Which means two samples can both read 100 ppm TDS and have completely different alkalinity.</p>

<div class="table-wrap">
<table>
<thead><tr><th>Sample</th><th>TDS</th><th>Alkalinity</th><th>What it brews</th></tr></thead>
<tbody>
<tr><td>Water with 100 ppm CaCO₃ as bicarbonate</td><td>~100</td><td><strong>~100</strong></td><td>Fruit disappears</td></tr>
<tr><td>Water with 100 ppm calcium chloride</td><td>~100</td><td><strong>~0</strong></td><td>Sharp sourness, no buffer</td></tr>
</tbody>
</table>
</div>

<p>Same number on the screen. Two completely different cups. That is why a TDS pen cannot answer the question you are asking.</p>

<div class="callout bad">
<p class="callout-title">Do not buy a TDS pen for this</p>
<p>It is useful for exactly one thing: checking whether your RO membrane is still good (output should be near 0). Beyond that it tells you nothing about brewing water.</p>
</div>

<h3>Method 1 — Read the bottle label (free, and do this first)</h3>

<p>Bottled water in Vietnam usually prints a full composition on the label — that is a free lab report. Look for the line <strong>Bicarbonate (HCO₃⁻)</strong>, in mg/L.</p>

<p>If it is there, convert:</p>

<div class="formula">
<span class="fx-label">Formula</span>
Alkalinity (ppm as CaCO₃) = HCO₃⁻ (mg/L) × 50/61<br>
≈ HCO₃⁻ × <b>0.82</b>
</div>

<p>Example: a label reading HCO₃⁻ 120 mg/L → alkalinity ≈ 98 ppm. Still a little high for light roasts, but usable for dark. A label reading 200 mg/L → 164 ppm, too high.</p>

<div class="callout warn">
<p class="callout-title">If the label only says “alkalinity” or “hardness”</p>
<p>Some labels state "alkalinity" directly in mg/L CaCO₃ — then you have your number and no conversion is needed. But careful: "hardness" is calcium plus magnesium, not alkalinity. They are two different things, and they are often printed side by side, which is where the confusion starts.</p>
</div>

<h3>Method 2 — An aquarium KH test kit (the only thing worth buying)</h3>

<p>This is a direct measurement, and it is surprisingly cheap. KH test kits for planted aquariums use <strong>drop titration</strong>: you add reagent drop by drop to a water sample and count drops until the colour changes. The drop count is the alkalinity.</p>

<p>It measures the right thing — buffering capacity — rather than conductivity. And it gives the result directly, with no conversion maths.</p>

<ul>
<li>Sold in aquarium shops, roughly 150,000–300,000 VND, good for hundreds of tests.</li>
<li>The unit is usually <strong>dKH</strong> (German carbonate hardness).</li>
<li>Conversion: <strong>1 dKH = 17.86 ppm as CaCO₃</strong>.</li>
</ul>

<div class="table-wrap">
<table>
<thead><tr><th>dKH</th><th>ppm as CaCO₃</th><th>Verdict for coffee</th></tr></thead>
<tbody>
<tr><td>1</td><td>~18</td><td>Very low — sharp, lacks roundness</td></tr>
<tr><td>2</td><td>~36</td><td><strong>Close to ideal</strong></td></tr>
<tr><td>3</td><td>~54</td><td><strong>Good</strong></td></tr>
<tr><td>4</td><td>~71</td><td>Acceptable</td></tr>
<tr><td>5</td><td>~89</td><td>Fruit starting to fade</td></tr>
<tr><td>8</td><td>~143</td><td>Too high</td></tr>
<tr><td>14</td><td>~250</td><td>Like strong mineral water</td></tr>
</tbody>
</table>
</div>

<div class="callout act">
<p class="callout-title">A trick for more resolution</p>
<p>The kits usually resolve 1 dKH ≈ 18 ppm — coarse if you want to hit 40 ppm precisely. The fix: <strong>use double the water sample</strong> (10 ml instead of 5 ml) and halve the result. Resolution drops to about 9 ppm, enough to adjust with.</p>
</div>

<h3>Method 3 — Build water from RO (full control)</h3>

<p>If you want to know exactly what you are drinking, the only way is to start from water with zero alkalinity and add known minerals. Many specialty cafés do this, and it is not as complicated as it sounds.</p>

<p>The principle: two concentrates, diluted into RO water.</p>

<div class="recipe">
<div class="recipe-head">Brewing water, made at home — base recipe<small>Makes 2 litres</small></div>
<div class="recipe-body">
<div class="recipe-params">
<span><b>Base:</b> 2 L RO water</span>
<span><b>Mg:</b> ~40 ppm</span>
<span><b>HCO₃:</b> ~40 ppm</span>
</div>
<p><strong>Solution A (minerals):</strong> dissolve 2.46 g magnesium sulfate (MgSO₄·7H₂O) in 100 ml RO water.</p>
<p><strong>Solution B (buffer):</strong> dissolve 1.68 g sodium bicarbonate (NaHCO₃ — baking soda) in 100 ml RO water.</p>
<p><strong>To make:</strong> add <strong>4 ml A</strong> and <strong>3.2 ml B</strong> to 2 litres of RO water.</p>
<p>Adjust to taste: more B to soften acidity (more buffer), less B for more brightness.</p>
</div>
</div>

<p>Note: this recipe uses sodium instead of calcium, and that is deliberate — sodium bicarbonate buffers acid without adding flavour, while calcium can scale equipment and affect your gear. If you want calcium, use calcium carbonate, but it has to be dissolved with CO₂, which is far more involved.</p>

<h3>Checking your tap water</h3>

<p>If you use tap water you have three options, in order of accuracy:</p>

<ol class="steps">
<li><strong>Ask the water utility</strong><p>In many Vietnamese provinces, water quality reports are published periodically on the utility's website. Look for "alkalinity" or "HCO₃". This is the fastest route, and it is free.</p></li>
<li><strong>Test with a KH kit</strong><p>Accurate for your sample at the time you test. Tap water changes with season and source, so retest every few months.</p></li>
<li><strong>Test indirectly by taste</strong><p>Brew two identical cups, one with tap water and one with tap diluted 50% with RO. If the diluted cup is clearly brighter, your tap has high alkalinity.</p></li>
</ol>

<div class="callout warn">
<p class="callout-title">Do not forget chlorine</p>
<p>Vietnamese tap water is usually chlorinated. Chlorine gives a chemical smell and destroys aroma. It evaporates if you leave the water in an open jug for a few hours, or it is removed by any carbon filter. This is the easiest problem of the lot to fix.</p>
</div>

<h3>What about pH?</h3>

<p>Do not buy litmus paper or a pH pen. The reason: the pH of brewing water is <em>governed by alkalinity</em>, and pH itself is barely a variable you can control independently. A sample at pH 7.0 with alkalinity 150 brews a flatter cup than a sample at pH 6.5 with alkalinity 30.</p>

<p>If you know the alkalinity, you know almost everything about the water that matters.</p>
`
    },

    "ch-xu-ly-nuoc": {
      title: "Treating water in Vietnam: what works and what does not",
      lede: "A water softener does not soften alkalinity. A Brita filter does not remove bicarbonate. Here are four approaches that actually work.",
      minutes: 9,
      tags: ["water", "practice"],
      body: `
<p>This section is the most practical in the book. If you read one chapter about water, read this one.</p>

<h3>First: two expensive misunderstandings</h3>

<div class="table-wrap">
<table>
<thead><tr><th>Method</th><th>Reduces alkalinity?</th><th>What it actually does</th></tr></thead>
<tbody>
<tr><td><strong>Carbon filter (Brita, household jug filters)</strong></td><td><strong>No</strong></td><td>Removes chlorine, some organic compounds, some heavy metals. Bicarbonate passes through intact.</td></tr>
<tr><td><strong>Water softener (Na ion exchange)</strong></td><td><strong>No</strong></td><td>Swaps Ca²⁺ and Mg²⁺ for Na⁺. Bicarbonate stays. The water is "soft" but still alkaline.</td></tr>
</tbody>
</table>
</div>

<p>These are the two most common confusions. <strong>Hardness and alkalinity are different things.</strong> A softener handles hardness. You can have perfectly softened water with alkalinity still at 250 ppm — and the cup still flat.</p>

<h3>Four approaches that actually work</h3>

<h4>1 — Dilute with RO water (start here)</h4>

<p>This is the cheapest, the most precise, and needs no equipment at all. The principle: alkalinity dilutes linearly with volume.</p>

<div class="formula">
<span class="fx-label">Dilution formula</span>
% mineral water needed = <b>target</b> ÷ <b>measured alkalinity</b><br><br>
Example: target 50 ppm, mineral water 250 ppm<br>
50 ÷ 250 = <b>20%</b> → 400 ml mineral + 1600 ml RO = 2 litres
</div>

<div class="table-wrap">
<table>
<thead><tr><th>Water you have</th><th>Alkalinity</th><th>% to reach ~50 ppm</th><th>For 2 litres</th></tr></thead>
<tbody>
<tr><td>La Vie (mineral)</td><td>~250</td><td><strong>20%</strong></td><td>400 ml + 1600 ml RO</td></tr>
<tr><td>Strong mineral water</td><td>~300</td><td>17%</td><td>340 ml + 1660 ml RO</td></tr>
<tr><td>Light mineral water</td><td>~120</td><td>42%</td><td>840 ml + 1160 ml RO</td></tr>
<tr><td>Tap water (if ~100)</td><td>~100</td><td>50%</td><td>1000 ml + 1000 ml RO</td></tr>
<tr><td>Tap water (if ~150)</td><td>~150</td><td>33%</td><td>660 ml + 1340 ml RO</td></tr>
</tbody>
</table>
</div>

<p>RO water from purified-water shops is very cheap — a few thousand dong a litre, or 10,000–20,000 VND for a 20-litre bottle. This is the best benefit-to-cost spend in all of home brewing.</p>

<div class="callout act">
<p class="callout-title">In practice: mix a jug, not a cup</p>
<p>Make 2 litres at a time, cap it, use within 2–3 days. Two reasons: (1) mixing each cup separately gives you a different error every time, so you never know which change came from the water and which from your hand; (2) RO water has no chlorine and so does not protect itself — but 2–3 days in a sealed jug is safe.</p>
</div>

<h4>2 — An RO system at home (best long-term investment)</h4>

<p>A household RO system (1.5–3 million VND) gives you a stable source at ~0 alkalinity. Combined with method 1 or method 3, you control the water completely, all the time.</p>

<p>What to check: whether the membrane is still good. This is where the TDS pen earns its place — output should be near 0. If it climbs to 30–50, the membrane is weak and you are drinking partially filtered tap water.</p>

<p>Note: RO removes <em>almost everything</em>, including beneficial minerals. So pure RO is not ideal brewing water — it is a <strong>base ingredient</strong>, and you have to add minerals back (method 3) or blend with mineral water (method 1).</p>

<h4>3 — Build water from RO (full control)</h4>

<p>The recipe is in the previous chapter. This is the only way to know exactly what you are drinking, and the only way to change alkalinity without changing hardness (or the reverse), because you control each component separately.</p>

<h4>4 — Boiling (it works, but you cannot control it)</h4>

<p>Boiling genuinely reduces alkalinity, because calcium bicarbonate decomposes:</p>

<div class="formula">
<span class="fx-label">Reaction on boiling</span>
Ca(HCO₃)₂ → CaCO₃↓ + CO₂↑ + H₂O
</div>

<p>Calcium carbonate precipitates (that is the white scale in the kettle) and bicarbonate leaves the solution. So alkalinity does drop — true.</p>

<p>But there are three problems:</p>

<ul>
<li><strong>You do not know by how much.</strong> It depends on the starting concentration, the boiling time, and how much CO₂ escapes. There is no target.</li>
<li><strong>It costs 15–20 minutes</strong> per batch, and you have to do it every time.</li>
<li><strong>Boiled water is deoxygenated</strong> — it tastes dead, slightly flat. That affects perception.</li>
</ul>

<p>Use it when you have no other option. It is not a primary method.</p>

<h3>Decision table</h3>

<div class="table-wrap">
<table>
<thead><tr><th>Your situation</th><th>What to do</th></tr></thead>
<tbody>
<tr><td>You do not know what your water is</td><td>Read the bottle label. If it is tap, brew one cup with 50% purified water and compare.</td></tr>
<tr><td>You use bottled mineral water</td><td>Check HCO₃⁻ on the label. If &gt; 120 mg/L, dilute 20–30% with purified water.</td></tr>
<tr><td>You use tap water</td><td>Leave it open a few hours for the chlorine to escape. Measure alkalinity with a KH kit, then dilute if needed.</td></tr>
<tr><td>You want long-term stability</td><td>Fit RO and build minerals yourself. This is the end of the water problem.</td></tr>
<tr><td>You already use a softener</td><td>It solves nothing. You still need dilution or RO.</td></tr>
</tbody>
</table>
</div>

<h3>A ten-minute experiment, at almost no cost</h3>

<p>Before buying anything, run this. It gives you an answer faster than any measurement.</p>

<ol class="steps">
<li><strong>Prepare three waters</strong><p>Your usual water (A). Purified/RO water (B). A mix of 25% A + 75% B (C).</p></li>
<li><strong>Brew three cups, everything else fixed</strong><p>Same 15 g of coffee, same grind, same temperature, same pour schedule. Only the water changes.</p></li>
<li><strong>Taste, and answer one question</strong><p>Which cup has the most fruit? Which is the most balanced?</p></li>
</ol>

<div class="table-wrap">
<table>
<thead><tr><th>Result</th><th>What it means</th></tr></thead>
<tbody>
<tr><td>Cup C clearly wins</td><td>Your water has high alkalinity. Use the C ratio from now on.</td></tr>
<tr><td>Cup B (RO) wins</td><td>Your water is very alkaline, or this coffee needs maximum brightness.</td></tr>
<tr><td>Cup A wins</td><td>Your water is fine. Change nothing. The problem is elsewhere.</td></tr>
<tr><td>B flat, and C flat too</td><td>Water is not the issue. Go back to grind size and technique.</td></tr>
</tbody>
</table>
</div>

<div class="callout ok">
<p class="callout-title">What this whole chapter costs</p>
<p>A 1.5 L bottle of purified water: about 10,000 VND. A KH test kit: 150,000–300,000 VND. An RO system: 1.5–3 million. You can start with the first item and stop there if it is enough.</p>
</div>
`
    },

    "ch-chiet-xuat": {
      title: "What extraction is: three numbers and one trap",
      lede: "You cannot taste “extraction”. You can only taste the cup. But these three numbers explain most of what you taste.",
      minutes: 9,
      tags: ["extraction", "measurement"],
      body: `
<p>Start with a question that looks simple: when you brew coffee, what actually travels from the bed into the cup?</p>

<p>The precise answer: <strong>roughly 18–22% of the dry coffee's mass</strong>. The rest — cellulose, some protein, insoluble minerals, compounds that never dissolved — stays in the bed and gets thrown away. Even a "strong" cup only takes about a fifth of what the bean contains.</p>

<p>That number, and everything it implies, is the foundation of every technique in this book.</p>

<h3>Three numbers</h3>

<div class="stat-grid">
<div class="stat"><b>18–22%</b><span>Extraction yield</span></div>
<div class="stat"><b>1.15–1.45%</b><span>TDS in the cup</span></div>
<div class="stat"><b>1:15–1:17</b><span>Brew ratio</span></div>
</div>

<h4>Extraction yield (EY)</h4>

<p>The percentage of the dry coffee's mass that made it into the cup. Measured by drying the spent bed, weighing it and comparing with the starting mass — or with a refractometer combined with weights.</p>

<p>Below 18%: <em>under-extracted</em>. A thin, sour cup with vegetal or raw-grain notes, and a short, sharp finish.</p>

<p>Above 22%: <em>over-extracted</em>. Bitter, drying, astringent, with a long heavy finish and the flavour notes collapsing into each other.</p>

<p>18–22%: <em>the good zone</em>. But it is a zone, not a point. Inside it, between 18 and 22, sit four quite different cups — and you will prefer one corner of that zone to the others. That is palate, not error.</p>

<h4>TDS (Total Dissolved Solids)</h4>

<p>The concentration of dissolved material in the cup, as a percentage. For pour over, 1.15–1.45% is the usual range. Espresso is 8–12%.</p>

<div class="callout warn">
<p class="callout-title">EY and TDS are two different things</p>
<p>This is where many people go wrong. <strong>EY</strong> tells you <em>how much</em> you took out of the bean. <strong>TDS</strong> tells you <em>how strong</em> the cup is. You can have high TDS with low EY (little water, shallow extraction — strong but incomplete) or low TDS with high EY (lots of water, deep extraction — weak but complete).</p>
<p>You adjust them with two different levers: <strong>TDS with ratio</strong>, <strong>EY with grind, time and temperature</strong>. Confusing the two is the source of most adjustments made in the wrong direction.</p>
</div>

<h4>Brew ratio</h4>

<p>Coffee mass against water mass. 1:16 means 1 g of coffee to 16 g of water. With 15 g of coffee, that is 240 g of water.</p>

<p>Ratio sets <strong>TDS almost linearly</strong> — it is the most predictable lever in the whole process. Change 1:16 to 1:15 and the cup comes out about 6–7% stronger, almost certainly. No other lever predicts that well.</p>

<h3>Why you cannot taste “extraction”</h3>

<p>This is the most important point in the chapter, and it explains why so many people adjust in the wrong direction for years.</p>

<p>Extraction is not a substance. It is a <em>collection</em> of hundreds of compounds, each dissolving at a different rate, each contributing differently to what you feel. When you say "this cup is over-extracted", you are inferring from a symptom — not reading a number.</p>

<p>And the inference can be wrong. At least four different causes produce the same "bitter" symptom:</p>

<div class="table-wrap">
<table>
<thead><tr><th>Cause</th><th>How to tell it apart</th></tr></thead>
<tbody>
<tr><td>Whole-brew over-extraction</td><td>Even bitterness, long finish, no aromatic peak</td></tr>
<tr><td>Channelling (uneven extraction)</td><td>Sour and bitter at once, bright then dark, a muddled cup</td></tr>
<tr><td>Local scorching in the bed</td><td>Bitterness at the end of the cup, a burnt finish, usually fines at the bottom</td></tr>
<tr><td>The bean itself</td><td>Bitter from start to finish, unchanged when you reduce extraction</td></tr>
</tbody>
</table>
</div>

<p>Four causes, four different responses — and if you treat cause two by grinding coarser (the fix for cause one), you make it worse.</p>

<h3>The trap of “even extraction”</h3>

<p>There is a concept the industry uses constantly and rarely defines: <strong>even extraction</strong>. It means every coffee particle meets water the same way, for the same time, at the same temperature.</p>

<p>In practice this is never fully true. The bed is a mass of particles of uneven size — from fines to boulders. Water takes the path of least resistance. Some particles extract to 25%, some to 12%. Your cup is the <em>average</em> of a wide distribution.</p>

<p>That is why technique matters: not because it creates flavour, but because it <strong>narrows that distribution</strong>. When the distribution is narrow the cup is clearer, cleaner, and the notes separate. When it is wide you get a cup that is "sour and bitter" with nothing standing out.</p>

<div class="pull">Technique does not create aroma.<br>Technique <em>narrows the distribution</em>.</div>

<h3>To measure, or not</h3>

<p>There is a practical question: do you need a refractometer and a scale?</p>

<p><strong>Scale: yes.</strong> It is the most important piece of gear in brewing, after the kettle. Without a scale you cannot repeat anything. A 0.1 g scale costs about 200,000–400,000 VND, and it turns brewing from an art into something learnable.</p>

<p><strong>Refractometer: no, unless you enjoy data.</strong> It gives you precise EY and TDS. But: (1) it is expensive (2–5 million); (2) it needs calibration and correct sampling technique — a small error and the number is meaningless; (3) it does not tell you whether the cup is good, only whether it sits inside the usual zone.</p>

<p>For most home drinkers, your palate plus a notebook beats a 3-million-dong instrument. A refractometer earns its place when you need to compare methods objectively — for instance while developing a recipe for a café.</p>

<div class="callout act">
<p class="callout-title">If you only buy one thing</p>
<p>Buy a scale. Skip everything else. A scale and a notebook are enough to learn 90% of what this book says.</p>
</div>
`
    },

    "ch-huyen-thoai-thu-tu": {
      title: "The “acids first, bitterness last” myth",
      lede: "It is the most repeated idea in modern coffee brewing. It is also the least tested.",
      minutes: 11,
      tags: ["extraction", "evidence", "critique"],
      body: `
<p>If you have watched any brewing video in the last ten years, you have heard this or a variation of it:</p>

<blockquote>
<p>Acids extract first. Sugars extract later. Bitterness extracts last. So if you want to keep the fruit, extract less — stop early, before the bitterness arrives.</p>
</blockquote>

<p>It sounds convincing. It matches experience: under-extracted cups are sour, over-extracted cups are bitter. It explains a lot. And it is repeated in most training material.</p>

<p>But when you ask <em>where is the evidence</em>, the answer is thin.</p>

<h3>Where this model came from</h3>

<p>It did not come from food science. It came from a 2019 post by Jonathan Gagné on the blog <em>Coffee ad Astra</em>, where he built a kinetic model of espresso extraction. That post is excellent, detailed, and hugely influential.</p>

<p>But Gagné states plainly in that same post that tying extraction rates to specific sensory attributes is <strong>speculation</strong>, and that the model <strong>has not been validated against real data</strong>.</p>

<p>Which means the person who built the model said it was a hypothesis. Ten years on, it is taught as a law.</p>

<div class="callout bad">
<p class="callout-title">Level of evidence</p>
<p>The claim that "acids extract first, bitterness last" has no food-science study directly comparing the extraction rate of citric or malic acid with caffeine and chlorogenic acid lactones inside a two-to-four-minute brew <span class="tier tier-c">Folklore</span>. It is a repeated hypothesis, not a finding.</p>
</div>

<h3>What the data actually shows</h3>

<p>When espresso is split into fractions and each one analysed, the result is clear — but not in the direction the model predicts <span class="tier tier-a">Evidence</span>:</p>

<ul>
<li><strong>Every compound is highest in the first fraction and falls from there.</strong> No compound "appears later".</li>
<li><strong>The rates of decline differ.</strong> Trigonelline and TDS fall fastest, then chlorogenic acid (5-CQA), then caffeine falls slowest.</li>
</ul>

<p>That is evidence for <strong>different extraction rates</strong> — which is true and well established. It is <em>not</em> evidence that acids go first and bitterness last. Caffeine, for instance, barely changes over the course of a shot — meaning it does not "arrive late". It is there from the start.</p>

<h3>A more counter-intuitive finding</h3>

<p>In a study on French press, researchers measured malic, acetic and lactic acid in the cup <span class="tier tier-a">Evidence</span>. Two results stand out:</p>

<ol>
<li><strong>All three acids sat below their individual detection thresholds.</strong> Chemically they were present — but at concentrations that, on their own, would not produce sourness.</li>
<li><strong>When the researchers added acids to coffee and brought in trained tasters, the tasters could not identify which acid.</strong> They noticed "more acid", but could not tell citric from malic from acetic.</li>
</ol>

<p>The consequence is large: <strong>the "sourness" you taste is not "acid X has just been extracted".</strong> It is a composite sensation, produced by the interaction of many compounds, pH, temperature, and your own expectation. Attributing it to one specific compound is an inference — and an inference that does not survive testing.</p>

<div class="callout ok">
<p class="callout-title">So what is right</p>
<p>What <em>is</em> right and useful: under-extracted cups are sour and thin; over-extracted cups are bitter and drying. The relationship between <strong>total extraction</strong> and <strong>balance</strong> is real. What is <em>not</em> right: that there is a sequence in time you can exploit to "keep the fruit and leave the bitterness".</p>
</div>

<h3>Why the myth is so appealing</h3>

<p>Because it hands you control. If acids come first and bitterness last, you only have to stop at the right moment — and you get everything good with nothing bad. That is a very seductive promise to someone trying to brew better.</p>

<p>The reality is less comfortable: you cannot separate them. Everything comes out together, only at different rates. Extract less to keep the acids and you also take less sugar, fewer aroma compounds, and the cup thins. Extract more for the sugars and you also take more bitter compounds. It is not a valve; it is a dial.</p>

<h3>How this changes the way you brew</h3>

<p>If you believe the sequence model, you will spend a great deal of time optimising <em>when to stop</em> — and you will obsess over small changes at the end of the brew.</p>

<p>If you understand that everything comes out together, you focus on the three things that do the large work:</p>

<ol>
<li><strong>Concentration</strong> — ratio. Linear, predictable, the biggest effect.</li>
<li><strong>Evenness</strong> — technique. Narrows the extraction distribution. Determines how clear the cup is.</li>
<li><strong>Total extraction</strong> — grind, temperature, time. A single dial.</li>
</ol>

<p>Those three. There is no fourth. And no technique "keeps" a particular flavour note — because a note is not a substance you can hold back; it is a sensation produced by a mixture.</p>

<div class="pull">You cannot choose the notes.<br>You can only choose <em>strength, evenness, and extraction level</em>.</div>

<h3>One real exception, and it is small</h3>

<p>There is one place where time genuinely matters, though not because of compound order: <strong>the last stage of the drawdown</strong>. As the bed approaches dry, the remaining water passes through a thin, compressed layer of grounds at a lower temperature, and it can carry compounds that taste dry and astringent. That is why some people discard the last few drops.</p>

<p>But this effect is much smaller than what it is credited with, and it gets confused with a larger one: as the cup cools, bitterness increases <em>without anything more being extracted</em>. That is physiology, not chemistry. Chapter 23 is about this.</p>
`
    },

    "ch-ba-thu-kiem-soat": {
      title: "The three things you actually control",
      lede: "Strip away the folklore and what remains is a compact model — and it is enough to do almost all of the work.",
      minutes: 8,
      tags: ["extraction", "model"],
      body: `
<p>The last chapter broke a myth. This one builds a replacement. It is smaller and less exciting, but it holds up.</p>

<h3>The model</h3>

<p>Every pour-over cup can be described along three dimensions:</p>

<div class="table-wrap">
<table>
<thead><tr><th>Dimension</th><th>The question it answers</th><th>The lever</th><th>Size of effect</th></tr></thead>
<tbody>
<tr><td><strong>Concentration</strong></td><td>Strong or weak?</td><td>Coffee-to-water ratio</td><td><strong>Very large, linear</strong></td></tr>
<tr><td><strong>Extraction level</strong></td><td>How much was taken out?</td><td>Grind, temperature, time</td><td><strong>Large</strong></td></tr>
<tr><td><strong>Evenness</strong></td><td>Does every part of the bed extract alike?</td><td>Pouring technique, channelling control</td><td>Moderate, but it decides how clear the cup is</td></tr>
</tbody>
</table>
</div>

<p>These three are close to independent. That is what makes them useful: you can change one without wrecking the other two.</p>

<h3>What happens when you change each one</h3>

<h4>Ratio — the cleanest lever</h4>

<p>Go from 1:16 to 1:15 and leave everything else alone: the cup is about 6% stronger. Extraction (EY) barely moves. Evenness barely moves. You changed exactly one variable.</p>

<p>That is why ratio has to be <strong>the first step</strong> whenever you adjust anything. It has no side effects.</p>

<h4>Grind — a strong lever with side effects</h4>

<p>Grind finer: extraction rises (more surface, water stays longer). But at the same time: more fines → paper clogs more easily → more channelling → less evenness.</p>

<p>That is why "grind finer" is dangerous advice for a weak cup. It raises extraction, but it also lowers evenness. The result can be a cup that is both stronger and muddier.</p>

<h4>Temperature — the subtle lever</h4>

<p>Hotter water: faster extraction and greater solubility for compounds that dissolve slowly. The effect is roughly 2–4% of extraction level per 5 °C between 88 and 96 °C.</p>

<p>But temperature also changes what you <em>perceive</em>: a hotter cup releases more aroma (good) and masks bitterness (also good). So temperature acts on two dimensions at once, which is why it is hard to evaluate.</p>

<h4>Pouring — the only lever against channelling</h4>

<p>This is where technique genuinely matters, and the only place it does.</p>

<p>Pour evenly, keep the water level steady, do not pour from too high, do not let the bed dry, rotate the dripper so water passes over the whole surface — none of this raises extraction much. It makes extraction <em>more uniform across the bed</em>.</p>

<p>And that is why technique matters: a cup extracted evenly to 20% tastes far better than a cup averaging 20% while ranging from 12% to 30%.</p>

<div class="callout ok">
<p class="callout-title">One sentence to remember</p>
<p><strong>Ratio decides strength. Grind decides extraction. Technique decides evenness.</strong> Three different questions, three different levers, none a substitute for another.</p>
</div>

<h3>The order of diagnosis</h3>

<p>When a cup is not good, do not start with "what should I change". Start with "which dimension is wrong".</p>

<ol class="steps">
<li><strong>Is the cup stronger or weaker than you want?</strong><p>If wrong → change the ratio. This is the easiest question and should be answered first. Do not adjust grind for a concentration problem.</p></li>
<li><strong>Sour-green, vegetal, woody — or bitter, drying, astringent?</strong><p>Sour-green → under-extracted. Bitter-dry → over-extracted. This is the second dimension.</p></li>
<li><strong>Is the cup clear, or muddled?</strong><p>If nothing stands out and it is sour and bitter at once → the problem is evenness, not extraction level. Change technique, not grind.</p></li>
</ol>

<div class="table-wrap">
<table>
<thead><tr><th>Symptom</th><th>Dimension off</th><th>Lever</th></tr></thead>
<tbody>
<tr><td>Thin, weak, "nothing there"</td><td>Concentration</td><td>Ratio</td></tr>
<tr><td>Sour-green, vegetal, short finish</td><td>Extraction (low)</td><td>Finer grind / hotter / longer</td></tr>
<tr><td>Bitter, drying, astringent, long finish</td><td>Extraction (high)</td><td>Coarser grind / cooler / shorter</td></tr>
<tr><td>Sour and bitter at once, no clear notes</td><td>Evenness</td><td>Pouring technique</td></tr>
<tr><td>Bitter only at the end of the cup</td><td>Evenness (fines)</td><td>Less agitation, more even grind, do not let the bed dry</td></tr>
</tbody>
</table>
</div>

<h3>What this model does not explain</h3>

<p>Honestly, some things sit outside the three dimensions:</p>

<ul>
<li><strong>Interaction between compounds.</strong> A cup can have enough sugar and enough acid and still not taste good, because the balance between them is wrong. The model does not capture that.</li>
<li><strong>The effect of expectation.</strong> As chapter 1 said, the information on the bag changes what you taste. That is not a variable in the model.</li>
<li><strong>Differences between beans in the same bag.</strong> Not every bean is identical — they differ in size, moisture, local roast level. The model assumes an average.</li>
</ul>

<p>But those three dimensions remain the best tool you have, because they are <strong>right most of the time</strong> and they <strong>tell you what to do next</strong>. A simple model you can use beats a complete model you cannot.</p>
`
    },

    "ch-cupping-la-gi": {
      title: "What cupping measures — and what it does not",
      lede: "Cupping was designed to remove variables, not to produce the best possible cup. Understanding that changes how you use it.",
      minutes: 9,
      tags: ["cupping", "method"],
      body: ``
    },

    "ch-quy-trinh-cupping": {
      title: "A cupping routine at home",
      lede: "You do not need twelve cups and a scoresheet. You need two cups, one kettle, and four minutes.",
      minutes: 7,
      tags: ["cupping", "practice"],
      body: ``
    },

    "ch-doc-cupping": {
      title: "Reading a cup: smell, taste, and three layers of time",
      lede: "Aroma is not one block. It changes over time, and each stage tells you something different.",
      minutes: 10,
      tags: ["cupping", "sensory"],
      body: ``
    },

    "ch-gioi-han-cupping": {
      title: "The limits of cupping: why it cannot predict pour-over",
      lede: "Cupping and pour-over differ in exactly one place — and that place is the hardest one.",
      minutes: 8,
      tags: ["cupping", "pour over"],
      body: ``
    },

    "ch-hai-co-che": {
      title: "Two mechanisms: immersion and percolation",
      lede: "Every brewer ever made uses one of these two mechanisms, or both. Understanding them is understanding why each dripper gives a different cup.",
      minutes: 9,
      tags: ["physics", "foundations"],
      body: ``
    },

    "ch-chon-dung-cu": {
      title: "Choosing gear: geometry beats brand",
      lede: "Every dripper can make good coffee. They differ in how much they forgive, and that is the only thing worth weighing.",
      minutes: 8,
      tags: ["gear"],
      body: ``
    },

    "ch-ky-thuat-rot": {
      title: "Pouring technique: four physical variables",
      lede: "Height, speed, shape, and rhythm. These four are the whole of pouring technique — everything else is a variation.",
      minutes: 11,
      tags: ["technique", "practice"],
      body: ``
    },

    "ch-giai-phau-cong-thuc": {
      title: "Anatomy of the famous recipes",
      lede: "Every famous recipe is an answer to a specific question. Know the question and you will know when to use it.",
      minutes: 10,
      tags: ["recipes", "analysis"],
      body: ``
    },

    "ch-doc-ba": {
      title: "Reading the bed: diagnosis by eye",
      lede: "Your palate will lie to you. The bed will not. It is the only part of the process that tells you the truth.",
      minutes: 8,
      tags: ["diagnosis", "practice"],
      body: ``
    },

    "ch-bang-chan-doan": {
      title: "The diagnostic table: from symptom to lever",
      lede: "A table to consult when you do not know what to do next. Print it and tape it next to your brewer.",
      minutes: 7,
      tags: ["diagnosis", "reference"],
      body: ``
    },

    "ch-quy-trinh-con-ca-moi": {
      title: "A twenty-minute routine for a new coffee",
      lede: "Not a study session. Just four steps, in order, each one answering a single question.",
      minutes: 10,
      tags: ["process", "practice"],
      body: ``
    },

    "ch-bon-luat": {
      title: "Four rules for a base recipe",
      lede: "A good recipe is not an answer. It is a ruler, plus a procedure for using that ruler.",
      minutes: 9,
      tags: ["method", "recipes"],
      body: ``
    },

    "ch-case-study": {
      title: "Case study: a medium-roast arabica",
      lede: "A complete example, from cupping to diagnosis, with real numbers — and one very common technical mistake.",
      minutes: 11,
      tags: ["case study", "diagnosis"],
      body: ``
    },

    "ch-giai-phau-ngum": {
      title: "Anatomy of a sip",
      lede: "Most of the aroma you perceive does not come from your nose. It comes from the back of your mouth. Understanding this is understanding why one cup gives two different experiences.",
      minutes: 9,
      tags: ["sensory", "physiology"],
      body: ``
    },

    "ch-ngon-ngu-not-huong": {
      title: "The language of flavour notes and its trap",
      lede: "A flavour wheel is a communication tool, not a tasting tool. Confusing the two is the source of a great deal of disappointment.",
      minutes: 8,
      tags: ["sensory", "critique"],
      body: ``
    },

    "ch-xay-khau-vi": {
      title: "Building your own palate",
      lede: "You do not need to know what you like before you start. You need three choices and a notebook.",
      minutes: 8,
      tags: ["palate", "method"],
      body: ``
    },

    "ch-nhat-ky": {
      title: "The brew log: a minimum template",
      lede: "You will forget. Not “might forget” — you will forget. Here is how to write it down so the data survives.",
      minutes: 6,
      tags: ["practice", "reference"],
      body: ``
    },

    "ch-bo-dung-cu": {
      title: "The minimum kit, and the order to buy it",
      lede: "You can brew an excellent cup with four things. Everything beyond that buys convenience, not a better cup.",
      minutes: 7,
      tags: ["gear", "reference"],
      body: ``
    },

    "ch-khi-that-bai": {
      title: "When everything fails: a checklist",
      lede: "A list to walk through when the cup is bad and you have no idea where to start. Go in order; do not jump.",
      minutes: 7,
      tags: ["diagnosis", "reference"],
      body: ``
    }
  }
};
