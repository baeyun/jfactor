var highlight = jFactor.register('highlight', {
	hooks: {
		style: {
			backgroundColor: 'yellow',
			color: 'black',
			fontWeight: 'bold',
			display: 'inline',
			padding: '5px'
		}
	},
	behaviour: function() {}
});

var banner = jFactor.register('banner', {
	hooks: {
		style: {
			backgroundColor: 'rgb(185, 213, 255)',
			color: 'black',
			// fontWeight: 'bold',
			padding: '20px',
			minWidth: '100%'
		}
	},
	behaviour: function() {}
});