
Grids are common place in the world of web design and front-end development. A few examples are: [Twitter's Bootstrap](http://getbootstrap.com/css/#grid); [BBC's GEL](http://www.bbc.co.uk/gel/guidelines/grid); [Lonely Planet's Rizzo](http://rizzo.lonelyplanet.com/styleguide/css-utilities/proportional-grid). Each of these come with terms defining the space between columns and rows of the grid, spaces along the sides of the grid, etc. To talk about these concepts, some terms are outlined below.

Due to the advent of [CSS grid](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout/Basic_Concepts_of_Grid_Layout), the naming convention for CWEL's grid differs from [Bootstrap](http://getbootstrap.com/css/#grid) and [Lonely Planet's Rizzo](http://rizzo.lonelyplanet.com/styleguide/css-utilities/proportional-grid). Please read the [Terminology](#terminology) for a list of terms and their definition.

### Demo

For a full-page demo of the grid, without code, checkout the [sandbox grid page](/playground/sandbox/grid).

### Overlay

To help with visualizing the grid on this page, see the grid overlay.

<button class="button" ng-click="showOverlay = true">Grid Overlay</button>

---

## Contents

- [Getting Started](#getting-started)
- [Terminology](#terminology)
- [Container](#container)
- [Cells](#cells)
- [Margins and Gutters](#margins-and-gutters)
- [Nesting](#nesting)
- [Equal Height](#equal-height)
- [Horizontal alignment](#horizontal-alignment)
- [Top alignment](#top-alignment)
- [Middle alignment](#middle-alignment)
- [Bottom alignment](#bottom-alignment)
- [Reversed](#reversed)
- [Flush](#flush)

---

## Getting Started

Copy the code in this example to get started with a grid

``` html
<div class="container">
	<div class="grid">
		<!-- default width of 12 -->
		<div class="grid__cell">
			<!-- content goes here -->
		</div>
		<!-- half width -->
		<div class="grid__cell grid__cell--size-6">
			<!-- content goes here -->
		</div>
		<!-- half width -->
		<div class="grid__cell grid__cell--size-6">
			<!-- content goes here -->
		</div>
	</div>
</div>
```

---

## Terminology

Terminology used in this documentation page.

### Cells

Each grid is divided into smaller rectangular shapes, each containing some content for the user to behold, interact with, or simply ogle at -- there is no specified notion of what the content should be.

### Margins

On either side of the grid (outside), left and right, it might be nice to have some spacing applied. This is referred to as a grid's channel.

### Gutters

Between each cell, it might be preferable to have some spacing. This is called the grid's gutter. Bare in mind it is different to the channel, as gutters appear on the inside of the grid, not the outside.

### Rows

A horizontal line of cells. These are not part of implementation, but conceptually useful for reference.

### Columns

A vertical line of cells. Like rows, these are not part of implementation, but conceptually useful for reference.

---

## Container

Grids don't explicitly require a container to display correctly, but for the sake of consistency and structure, a matter of best practice, the CWEL grid comes with one. There are two types of container: one with a width [based on the current viewport width](#container-widths), another that always remains full-width, always matching the viewport width.

### Container Widths

Containers are of fluid width from XS to M devices, changing to fixed width from L to XL.

| Device | Width  |
|--------|--------|
| XS - M | 100%   |
| L      | 1004px |
| XL     | 1280px |

### Code

To use the container, give an element a class of `container`.

``` html
<div class="container">
	<!-- grid elements go here -->
</div>
```

### Result

Checkout the grid overlay to see a representation of containerized content. Blue columns are the container's content, green strips are margins. Container widths include both the blue and green elements of the overlay.

<button class="button" ng-click="showOverlay = true">Grid Overlay</button>

---

## Cells

The grid is divided into 12 cells. Each with a width of the following fractions of their containing element: `1/12`; `2/12`; `3/12`; `4/12`; `5/12`; `6/12`; `7/12`; `8/12`; `9/12`; `10/12`; `11/12`; `12/12`.

For convenience, any of these can be referred to as their numerator; e.g. width `7/12` as width `7`, width `5/12` as width `5`, width `10/12` as width `10`, etc.

### Column Widths

Cells can be set to take up different column widths, using size modifiers. See the [demo](/playground/sandbox/grid) for a visual example of sizes. The modifier syntax consists of a number out of 12, and an optional device size.

``` plain
grid__cell--size-{width}-{device}
```

Where the `{device}` is lowercase t-shirt notation for a [device size](/page/layout/devicesize), and `{width}` is a number out of 12 for the column width. `-{device}` is optional at the end.

#### Example 1

``` plain
grid__cell--size-4-m
```

Sets a cell to be a third of its parent grid's width on medium devices or larger.

#### Example 2

``` plain
grid__cell--size-4
```

Sets a cell to be a third of its parent grid's width on extra small devices or larger.

### Code

``` html
<div class="grid">
	<!-- half width -->
	<div class="grid__cell grid__cell--size-6">
		<!-- content goes here -->
	</div>
	<!-- half width -->
	<div class="grid__cell grid__cell--size-6">
		<!-- content goes here -->
	</div>
	<!-- full width on xs, half width on large -->
	<div class="grid__cell grid__cell--size-12-xs grid__cell--size-6-l">
		<!-- content goes here -->
	</div>
	<!-- full width on xs, half width on large -->
	<div class="grid__cell grid__cell--size-12-xs grid__cell--size-6-l">
		<!-- content goes here -->
	</div>
</div>
```

### Result

<div class="grid">
	<!-- half width -->
	<div class="grid__cell grid__cell--size-6">
		<div class="block block--claustrophobic">always half</div>
	</div>
	<!-- half width -->
	<div class="grid__cell grid__cell--size-6">
		<div class="block block--claustrophobic">always half</div>
	</div>
	<!-- full width on xs, half width on large -->
	<div class="grid__cell grid__cell--size-12-xs grid__cell--size-6-l">
		<div class="block block--claustrophobic">extra small full, large half</div>
	</div>
	<!-- full width on xs, half width on large -->
	<div class="grid__cell grid__cell--size-12-xs grid__cell--size-6-l">
		<div class="block block--claustrophobic">extra small full, large half</div>
	</div>
</div>

### All sizes

<div class="grid">
    <div class="grid__cell"><div class="block block--claustrophobic">`grid__cell--size-12`</div></div>
</div>
<div class="grid">
    <div class="grid__cell grid__cell--size-6"><div class="block block--claustrophobic">`grid__cell--size-6`</div></div>
    <div class="grid__cell grid__cell--size-6"><div class="block block--claustrophobic">`grid__cell--size-6`</div></div>
</div>
<div class="grid">
    <div class="grid__cell grid__cell--size-4"><div class="block block--claustrophobic">`grid__cell--size-4`</div></div>
    <div class="grid__cell grid__cell--size-4"><div class="block block--claustrophobic">`grid__cell--size-4`</div></div>
    <div class="grid__cell grid__cell--size-4"><div class="block block--claustrophobic">`grid__cell--size-4`</div></div>
</div>
<div class="grid">
    <div class="grid__cell grid__cell--size-3"><div class="block block--claustrophobic">`3`</div></div>
    <div class="grid__cell grid__cell--size-3"><div class="block block--claustrophobic">`3`</div></div>
    <div class="grid__cell grid__cell--size-3"><div class="block block--claustrophobic">`3`</div></div>
    <div class="grid__cell grid__cell--size-3"><div class="block block--claustrophobic">`3`</div></div>
</div>
<div class="grid">
    <div class="grid__cell grid__cell--size-2"><div class="block block--claustrophobic">`6`</div></div>
    <div class="grid__cell grid__cell--size-2"><div class="block block--claustrophobic">`6`</div></div>
    <div class="grid__cell grid__cell--size-2"><div class="block block--claustrophobic">`6`</div></div>
    <div class="grid__cell grid__cell--size-2"><div class="block block--claustrophobic">`6`</div></div>
    <div class="grid__cell grid__cell--size-2"><div class="block block--claustrophobic">`6`</div></div>
    <div class="grid__cell grid__cell--size-2"><div class="block block--claustrophobic">`6`</div></div>
</div>
<div class="grid">
        <div class="grid__cell grid__cell--size-1"><div class="block">`1`</div></div>
        <div class="grid__cell grid__cell--size-1"><div class="block">`1`</div></div>
        <div class="grid__cell grid__cell--size-1"><div class="block">`1`</div></div>
        <div class="grid__cell grid__cell--size-1"><div class="block">`1`</div></div>
        <div class="grid__cell grid__cell--size-1"><div class="block">`1`</div></div>
        <div class="grid__cell grid__cell--size-1"><div class="block">`1`</div></div>
        <div class="grid__cell grid__cell--size-1"><div class="block">`1`</div></div>
        <div class="grid__cell grid__cell--size-1"><div class="block">`1`</div></div>
        <div class="grid__cell grid__cell--size-1"><div class="block">`1`</div></div>
        <div class="grid__cell grid__cell--size-1"><div class="block">`1`</div></div>
        <div class="grid__cell grid__cell--size-1"><div class="block">`1`</div></div>
        <div class="grid__cell grid__cell--size-1"><div class="block">`1`</div></div>
</div>


---

## Margins and Gutters

CWEL's grid system comes with two types of spacing, margins and gutters. Margins are the vertical spacing on the outer edges of the container. Gutters are the vertical spacing in-between grid cells. Their size varies across different device sizes. These can be visualized with the grid overlay.

<button class="button" ng-click="showOverlay = true">Grid Overlay</button>

### Measurements

| Device Size | Grid Margins | Grid Gutters |
|-------------|--------------|--------------|
| XS - S      | 8px          | 8px          |
| M - L       | 12px         | 16px         |

---

## Nesting

Grids can be nested within another. Simply place markup for a grid within a cell of another. There is no technical limit to the degree of nesting.

### Code

``` html
<div class="grid">
	<div class="grid__cell grid__cell--size-6"></div>
	<div class="grid__cell grid__cell--size-6">
		<!-- nested grid -->
		<div class="grid">
			<div class="grid__cell">
				<!-- nested grid -->
				<div class="grid">
					<div class="grid__cell grid__cell--size-4"></div>
					<div class="grid__cell grid__cell--size-8">
						<!-- nested grid -->
						<div class="grid">
							<div class="grid__cell grid__cell--size-6"></div>
							<div class="grid__cell grid__cell--size-6"></div>
							<div class="grid__cell grid__cell--size-4"></div>
							<div class="grid__cell grid__cell--size-4"></div>
							<div class="grid__cell grid__cell--size-4"></div>
						</div>
					</div>
				</div><!-- .grid -->
			</div>
		</div><!-- .grid -->
	</div>
</div><!-- .grid -->
```

### Result

<div class="grid">
	<div class="grid__cell grid__cell--size-6"><div class="block">half</div></div>
	<div class="grid__cell grid__cell--size-6">
		<div class="grid">
			<div class="grid__cell">
				<div class="block block--translucent block block--lean">
					<div class="grid">
						<div class="grid__cell grid__cell--size-4"><div class="block block--claustrophobic">third</div></div>
						<div class="grid__cell grid__cell--size-8">
							<div class="block block--translucent block block--lean">
								<div class="grid">
									<div class="grid__cell grid__cell--size-6"><div class="block block--claustrophobic">half</div></div>
									<div class="grid__cell grid__cell--size-6"><div class="block block--claustrophobic">half</div></div>
									<div class="grid__cell grid__cell--size-4"><div class="block">third</div></div>
									<div class="grid__cell grid__cell--size-4"><div class="block">third</div></div>
									<div class="grid__cell grid__cell--size-4"><div class="block">third</div></div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

---

## Equal Height

Grid cells all maintain equal height across the row they're in. There is no special code needed, just simple `.grid__cell` elements within a `.grid`.

### Code

``` html
<div class="grid">
    <div class="grid__cell grid__cell--size-6"></div>
    <div class="grid__cell grid__cell--size-6"></div>
</div>
```

### Result

<div class="grid">
    <div class="grid__cell grid__cell--size-6"><div class="block block--tall block">tall</div></div>
    <div class="grid__cell grid__cell--size-6"><div class="block block--fill block">fill</div></div>
</div>

---

## Horizontal alignment

Grid cells can be horizontally aligned using a modifier. All grid cells will be aligned within a grid with an alignment modifier.

### Code

``` html
<div class="grid grid--align-left">
    <div class="grid__cell grid__cell--size-6"></div>
</div>

<div class="grid grid--align-center">
    <div class="grid__cell grid__cell--size-6"></div>
</div>

<div class="grid grid--align-right">
    <div class="grid__cell grid__cell--size-6"></div>
</div>
```

### Result

<div class="grid grid--align-left">
    <div class="grid__cell grid__cell--size-6"><div class="block block--claustrophobic">left</div></div>
</div>

<div class="grid grid--align-center">
    <div class="grid__cell grid__cell--size-6"><div class="block block--claustrophobic">center</div></div>
</div>

<div class="grid grid--align-right">
    <div class="grid__cell grid__cell--size-6"><div class="block block">right</div></div>
</div>

---

## Top alignment

Grid cells can be vertically aligned to the top using a modifier. Applying this modifier on a grid element will align all its grid cells.

### Code

``` html
<div class="grid grid--align-top">
    <div class="grid__cell grid__cell--size-4"></div>
    <div class="grid__cell grid__cell--size-4"></div>
    <div class="grid__cell grid__cell--size-4"></div>
</div>
```

### Result

<div class="grid grid--align-top">
    <div class="grid__cell grid__cell--size-4"><div class="block">top</div></div>
    <div class="grid__cell grid__cell--size-4"><div class="block block--tall"></div></div>
    <div class="grid__cell grid__cell--size-4"><div class="block">top</div></div>
</div>

---

##  Middle alignment

Grid cells can be vertically aligned to the middle using a modifier. Applying this modifier on a grid element will align all its grid cells.

### Code

``` html
<div class="grid grid--align-middle">
    <div class="grid__cell grid__cell--size-4"></div>
    <div class="grid__cell grid__cell--size-4"></div>
    <div class="grid__cell grid__cell--size-4"></div>
</div>
```

### Result

<div class="grid grid--align-middle">
    <div class="grid__cell grid__cell--size-4"><div class="block">middle</div></div>
    <div class="grid__cell grid__cell--size-4"><div class="block block--tall"></div></div>
    <div class="grid__cell grid__cell--size-4"><div class="block">middle</div></div>
</div>

---

## Bottom alignment

Grid cells can be vertically aligned to the bottom using a modifier. Applying this modifier on a grid element will align all its grid cells.

### Code

``` html
<div class="grid grid--align-bottom">
	<div class="grid__cell grid__cell--size-4"></div>
	<div class="grid__cell grid__cell--size-4"></div>
	<div class="grid__cell grid__cell--size-4"></div>
</div>
```

### Result

<div class="grid grid--align-bottom">
    <div class="grid__cell grid__cell--size-4"><div class="block">bottom</div></div>
    <div class="grid__cell grid__cell--size-4"><div class="block block--tall"></div></div>
    <div class="grid__cell grid__cell--size-4"><div class="block">bottom</div></div>
</div>

---

## Independent alignment

Grid cells can be vertically aligned to the top, middle, or bottom independently, using a modifier. Applying this modifier on a grid cell element will align it relative to its parent grid.

### Code

``` html
<div class="grid">
    <div class="grid__cell grid__cell--size-3 grid__cell--align-top"></div>
    <div class="grid__cell grid__cell--size-3"></div>
    <div class="grid__cell grid__cell--size-3 grid__cell--align-middle"></div>
    <div class="grid__cell grid__cell--size-3 grid__cell--align-bottom"></div>
</div>
```

### Result

<div class="grid">
    <div class="grid__cell grid__cell--size-3 grid__cell--align-top"><div class="block">top</div></div>
    <div class="grid__cell grid__cell--size-3"><div class="block block--tall"></div></div>
    <div class="grid__cell grid__cell--size-3 grid__cell--align-middle"><div class="block">middle</div></div>
    <div class="grid__cell grid__cell--size-3 grid__cell--align-bottom"><div class="block">bottom</div></div>
</div>

---

## Reversed

Grid cells can be ordered in reverse by using a modifier on their parent grid element.

### Code

``` html
<div class="grid grid--reverse">
    <div class="grid__cell grid__cell--size-3"><!-- 1. --></div>
    <div class="grid__cell grid__cell--size-3"><!-- 2. --></div>
    <div class="grid__cell grid__cell--size-3"><!-- 3. --></div>
    <div class="grid__cell grid__cell--size-3"><!-- 4. --></div>
</div>
```

### Result

<div class="grid grid--reverse">
    <div class="grid__cell grid__cell--size-3"><div class="block">1</div></div>
    <div class="grid__cell grid__cell--size-3"><div class="block">2</div></div>
    <div class="grid__cell grid__cell--size-3"><div class="block">3</div></div>
    <div class="grid__cell grid__cell--size-3"><div class="block">4</div></div>
</div>

---

## Flush

Grid gutters can be nullified with a modifier on a grid element.

### Code

``` html
<div class="grid grid--flush">
    <div class="grid__cell grid__cell--size-3"></div>
    <div class="grid__cell grid__cell--size-3"></div>
    <div class="grid__cell grid__cell--size-3"></div>
    <div class="grid__cell grid__cell--size-3"></div>
</div>
```

### Result

<div class="grid grid--flush">
    <div class="grid__cell grid__cell--size-3"><div class="block">quarter</div></div>
    <div class="grid__cell grid__cell--size-3"><div class="block">quarter</div></div>
    <div class="grid__cell grid__cell--size-3"><div class="block">quarter</div></div>
    <div class="grid__cell grid__cell--size-3"><div class="block">quarter</div></div>
</div>
