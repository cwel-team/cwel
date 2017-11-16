
## How it works

Grids are common place in the world of web design and front-end development. A few examples are: [Twitter's Bootstrap](http://getbootstrap.com/css/#grid); [BBC's GEL](http://www.bbc.co.uk/gel/guidelines/grid); [Lonely Planet's Rizzo](http://rizzo.lonelyplanet.com/styleguide/css-utilities/proportional-grid). Each of these come with terms defining the space between columns and rows of the grid, spaces along the sides of the grid, etc. To talk about these concepts, some terms are outlined below. For a full-page demo of the grid, without code, checkout the [sandbox grid page](/playground/sandbox/grid).

Due to the advent of [CSS grid](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout/Basic_Concepts_of_Grid_Layout), the naming convention for CWEL's grid differs from [Bootstrap](http://getbootstrap.com/css/#grid) and [Lonely Planet's Rizzo](http://rizzo.lonelyplanet.com/styleguide/css-utilities/proportional-grid). Please read the [Glossary](#glossary) for a list of terms and their definition.


## Cells

The grid is divided into 12 cells. Each with a width of the following fractions of their containing element: `1/12`; `2/12`; `3/12`; `4/12`; `5/12`; `6/12`; `7/12`; `8/12`; `9/12`; `10/12`; `11/12`; `12/12`.

For convenience, any of these can be referred to as their numerator; e.g. width `7/12` as width `7`, width `5/12` as width `5`, width `10/12` as width `10`, etc.


## Margins and Gutters

Grids come with two types of spacing, margins and gutters. Margins are the vertical spacing on the outer edges of the grid. Gutters are the vertical spacing in-between the grid cells of the grid. Their size varies across different device sizes.

<table class="docs-table">
<thead>
	<tr>
		<th class="docs-table__column">Device Size</th>
		<th class="docs-table__column">Grid Margins</th>
		<th class="docs-table__column">Grid Gutters</th>
	</tr>
</thead>
<tbody>
	<tr>
		<td class="docs-table__column">XS - S</td>
		<td class="docs-table__column">8px</td>
		<td class="docs-table__column">8px</td>
	</tr>
	<tr>
		<td class="docs-table__column">M - L</td>
		<td class="docs-table__column">12px</td>
		<td class="docs-table__column">16px</td>
	</tr>
</tbody>
</table>


## Glossary

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
