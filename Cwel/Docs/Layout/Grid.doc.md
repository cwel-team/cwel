
Grids are common place in the world of web design and front-end development. A few examples are: [Twitter's Bootstrap](http://getbootstrap.com/css/#grid); [BBC's GEL](http://www.bbc.co.uk/gel/guidelines/grid); [Lonely Planet's Rizzo](http://rizzo.lonelyplanet.com/styleguide/css-utilities/proportional-grid). Each of these come with terms defining the space between columns and rows of the grid, spaces along the sides of the grid, etc. To talk about these concepts, some terms are outlined below.

Due to the advent of [CSS grid](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout/Basic_Concepts_of_Grid_Layout), the naming convention for CWEL's grid differs from [Bootstrap](http://getbootstrap.com/css/#grid) and [Lonely Planet's Rizzo](http://rizzo.lonelyplanet.com/styleguide/css-utilities/proportional-grid). Please read the [Terminology](#terminology) for a list of terms and their definition.

### Demo

For a full-page demo of the grid, without code, checkout the [sandbox grid page](/playground/sandbox/grid).

---

## Contents

- [Getting Started](#getting-started)
- [Recipes and Modifiers](#recipes-and-modifiers)
- [Container](#container)
- [Cells](#cells)
- [Margins and Gutters](#margins-and-gutters)
- [Terminology](#terminology)

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

## Container

Grids don't explicitly require a container to display correctly, but for the sake of consistency and structure, a matter of best practice, the CWEL grid comes with one. There are two types of container: one with a width [based on the current viewport width](#container-widths), another that always remains full-width, always matching the viewport width.

### Example

To use the container, give an element a class of `container`.

``` html
<div class="container">
	<!-- grid elements go here -->
</div>
```

### Container Widths

Containers are of fluid width from XS to M devices, changing to fixed width from L to XL.

| Device | Width  |
|--------|--------|
| XS - M | 100%   |
| L      | 1004px |
| XL     | 1280px |

---

## Cells

The grid is divided into 12 cells. Each with a width of the following fractions of their containing element: `1/12`; `2/12`; `3/12`; `4/12`; `5/12`; `6/12`; `7/12`; `8/12`; `9/12`; `10/12`; `11/12`; `12/12`.

For convenience, any of these can be referred to as their numerator; e.g. width `7/12` as width `7`, width `5/12` as width `5`, width `10/12` as width `10`, etc.

### Column Widths

Cells can be set to take up different column widths, using size modifiers. See the [demo](/playground/sandbox/grid) for a visual example of sizes. The modifier syntax consists of a number out of 12, and an optional device size.

``` plain
grid__cell--size-{width}-{device}
```

Where the `{device}` is lowercase t-shirt notation for a [device size](/page/layout/devicesize), and `{width}` is a number out of 12 for the column width.

e.g.

``` plain
grid__cell--size-4-m
```

sets a cell to be a third of the container width on medium devices.

### Example

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

---

## Margins and Gutters

Grids come with two types of spacing, margins and gutters. Margins are the vertical spacing on the outer edges of the grid. Gutters are the vertical spacing in-between the grid cells of the grid. Their size varies across different device sizes.

| Device Size | Grid Margins | Grid Gutters |
|-------------|--------------|--------------|
| XS - S      | 8px          | 8px          |
| M - L       | 12px         | 16px         |

---

## Recipes and Modifiers

For a list of grid modifiers and what the grid can do, including sample code, visit the [demo page](/playground/sandbox/grid).

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
