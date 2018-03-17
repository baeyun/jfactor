/**
 * jFactor - A lightweight jQuery extension for creating Web Components
 * 3/17/2018 - MIT License
 * https://www.github.com/bukharim96/jfactor
*/


(function($) {
	jFactor = {};
	jFactor.components = [];
	jFactor.register = function(label, componentConfig) {
		if (label && typeof label === 'string' && !!componentConfig && componentConfig.constructor == Object) {
				// Provide support for lower versions of Internet Explorer workarounds
				var ieSupportSnippet = "<!--[if lt IE 9]><script>document.createElement('" + label + "');</script><![endif]>";

				document.head.appendChild(document.createTextNode(ieSupportSnippet));

				var
					// All the attributes that will be defined on the component
					hooks = componentConfig.hooks || null,
					// { Object } component raw styles
					computedStyles = hooks.style || null,
					// Action
					behaviour = componentConfig.behaviour,
					_factor = $(label),
					// @todo Complete the named methods
					boundBehaviourObject = {
						e: _factor,
						text: _factor.text().trim() || null,
						html: _factor.html() || null,
						children: _factor.children() || null,
						getHook: function(hookName) {
							return _factor.attr(hookName);
						},
						setHook: function(hookName, newValue) {
							return _factor.attr(hookName, newValue);
						},
						substituteHTML: function(newHTML) {
							_factor.html(newHTML);
						}
					},
					// Before component loads 
					beforemount = componentConfig.beforemount || null,
					// After component loads 
					onmount = componentConfig.onmount || null,
					// Watch any hook changes
					onHookChange = componentConfig.onHookChange || null;

			// Set component computed styles
			if (computedStyles && computedStyles.constructor === Object && computedStyles !== null) {
				_factor.each(function() {
					this.style.display = 'block';
					this.style.margin = '0';
					this.style.padding = '0';
				});
				// @override
				_factor.css(computedStyles);
			}

			// Get individual components
			if (_factor && !!_factor.get(0))
				_factor.each(function() {
					// Set element constructor to behaviour
					this.constructor = behaviour.bind(boundBehaviourObject);
					// For each element, fire it's constructor function
					this.constructor();
				});

			var componentInterfaceObject = { '0': label, '1': boundBehaviourObject };

			// Expose components
			jFactor.components.push(componentInterfaceObject);

			// If you're into public interfaces for static methods, you could expose it
			return componentInterfaceObject;
		}
	}
})(jQuery);