/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


window.JSONSchemaEditor = function (element, options) {
	if (!(element instanceof Element)) {
		throw new Error('element should be an instance of Element');
	}
	options = options || {};
	this.element = element;
	this.options = options;
	this.init();
};

JSONSchemaEditor.prototype = {
	// necessary since we remove the ctor property by doing a literal assignment. Without this
	// the $isplainobject function will think that this is a plain object.
	constructor: JSONSchemaEditor,
	init: function init() {
		var self = this;
		var data = this.options.startval || {};

		this.react = ReactDOM.render(React.createElement(SchemaObject, { onChange: this.onChange, data: data }), self.element);
		this.callbacks = {};
	},
	on: function on(event, callback) {
		this.react.on(event, callback);
	},
	onChange: function onChange() {},
	getValue: function getValue() {
		return {
			schema: this.getSchema(),
			form: this.getForm()
		};
	},
	getForm: function getForm() {
		return this.react.exportForm();
	},
	getSchema: function getSchema() {
		return this.react.export();
	},
	setSchema: function setSchema(data) {
		var self = this;
		this.react = ReactDOM.render(React.createElement(SchemaObject, { onChange: this.onChange, data: data }), self.element);
	}
};

var shortNumberStyle = {
	width: '50px'
};

var SchemaString = React.createClass({
	displayName: 'SchemaString',

	getInitialState: function getInitialState() {
		var state = this.props.data;
		state.hasEnum = !!state.enum;
		return state;
	},
	componentDidUpdate: function componentDidUpdate() {
		this.props.onChange();
	},
	export: function _export(title) {
		return {
			type: 'string',
			title: title,
			format: this.state.format,
			pattern: !!this.state.pattern ? this.state.pattern : undefined,
			enum: this.state.enum
		};
	},
	exportForm: function exportForm(title) {
		return {
			key: title,
			type: this.state.format
		};
	},
	change: function change(event) {
		this.state[event.target.name] = event.target.value;
		this.setState(this.state);
	},
	changeBool: function changeBool(event) {
		this.state[event.target.name] = event.target.checked;
		this.setState(this.state);
	},
	changeEnum: function changeEnum(event) {
		var arr = event.target.value.split('\n');
		if (arr.length == 1 && !arr[0]) {
			arr = undefined;
		}
		this.state[event.target.name] = arr;
		this.setState(this.state);
	},
	render: function render() {
		var inputId = Date.now();
		var settings = void 0;
		if (this.state.hasEnum) {
			settings = React.createElement(
				'div',
				{ className: 'from-group media-right' },
				React.createElement(
					'label',
					{ htmlFor: "enum-" + inputId },
					'Enum (one value per line):'
				),
				React.createElement('textarea', { rows: '3', className: 'form-control', id: "enum-" + inputId, onChange: this.changeEnum, name: 'enum', value: (this.state.enum || []).join('\n') })
			);
		} else {
			settings = React.createElement(
				'div',
				{ className: 'form-group media-right' },
				React.createElement(
					'label',
					{ htmlFor: "pattern-" + inputId },
					'Pattern:'
				),
				React.createElement('input', { name: 'pattern', type: 'text', className: 'form-control', id: "pattern-" + inputId, value: this.state.pattern, onChange: this.change })
			);
		}
		return React.createElement(
			'div',
			{ className: 'form-inline' },
			React.createElement(
				'div',
				{ className: 'form-group' },
				React.createElement(
					'label',
					{ htmlFor: "format-" + inputId },
					'Format:'
				),
				React.createElement(
					'select',
					{ name: 'format', className: 'form-control', id: "format-" + inputId, onChange: this.change, value: this.state.format },
					React.createElement('option', { value: '' }),
					React.createElement(
						'option',
						{ value: 'color' },
						'color'
					),
					React.createElement(
						'option',
						{ value: 'date' },
						'date'
					),
					React.createElement(
						'option',
						{ value: 'datetime' },
						'datetime'
					),
					React.createElement(
						'option',
						{ value: 'datetime-local' },
						'datetime-local'
					),
					React.createElement(
						'option',
						{ value: 'email' },
						'email'
					),
					React.createElement(
						'option',
						{ value: 'month' },
						'month'
					),
					React.createElement(
						'option',
						{ value: 'number' },
						'number'
					),
					React.createElement(
						'option',
						{ value: 'range' },
						'range'
					),
					React.createElement(
						'option',
						{ value: 'tel' },
						'tel'
					),
					React.createElement(
						'option',
						{ value: 'text' },
						'text'
					),
					React.createElement(
						'option',
						{ value: 'textarea' },
						'textarea'
					),
					React.createElement(
						'option',
						{ value: 'time' },
						'time'
					),
					React.createElement(
						'option',
						{ value: 'url' },
						'url'
					),
					React.createElement(
						'option',
						{ value: 'week' },
						'week'
					)
				)
			),
			React.createElement(
				'div',
				{ className: 'checkbox media-right' },
				React.createElement(
					'label',
					null,
					React.createElement('input', { name: 'hasEnum', type: 'checkbox', checked: this.state.hasEnum, onChange: this.changeBool }),
					' Enum'
				)
			),
			settings
		);
	}
});

var SchemaBoolean = React.createClass({
	displayName: 'SchemaBoolean',

	export: function _export(title) {
		return {
			type: 'boolean',
			title: title,
			format: 'checkbox'
		};
	},
	exportForm: function exportForm(title) {
		return {
			key: title
		};
	},
	render: function render() {
		return React.createElement('div', null);
	}
});

var SchemaNumber = React.createClass({
	displayName: 'SchemaNumber',

	getInitialState: function getInitialState() {
		return this.props.data;
	},
	componentDidUpdate: function componentDidUpdate() {
		this.props.onChange();
	},
	change: function change(event) {
		this.state[event.target.name] = event.target.value;
		this.setState(this.state);
	},
	export: function _export(title) {
		var o = JSON.parse(JSON.stringify(this.state));
		o.type = 'number';
		o.title = title;
		delete o.name;
		return o;
	},
	exportForm: function exportForm(title) {
		return {
			key: title
		};
	},
	render: function render() {
		var inputId = Date.now();
		return React.createElement(
			'div',
			{ className: 'form-inline' },
			React.createElement(
				'div',
				{ className: 'form-group' },
				React.createElement(
					'label',
					{ htmlFor: "minimum-" + inputId },
					'Min:'
				),
				React.createElement('input', { name: 'minimum', id: "minimum-" + inputId, className: 'form-control', type: 'number', value: this.state.minimum, onChange: this.change })
			),
			React.createElement(
				'div',
				{ className: 'form-group media-right' },
				React.createElement(
					'label',
					{ htmlFor: "maximum-" + inputId },
					'Max:'
				),
				React.createElement('input', { name: 'maximum', id: "maximum-" + inputId, className: 'form-control', type: 'number', value: this.state.maximum, onChange: this.change })
			)
		);
	}
});

var mapping = function mapping(name, data, changeHandler) {
	return {
		string: React.createElement(SchemaString, { onChange: changeHandler, ref: name, data: data }),
		number: React.createElement(SchemaNumber, { onChange: changeHandler, ref: name, data: data }),
		array: React.createElement(SchemaArray, { onChange: changeHandler, ref: name, data: data }),
		object: React.createElement(SchemaObject, { onChange: changeHandler, ref: name, data: data }),
		boolean: React.createElement(SchemaBoolean, { onChange: changeHandler, ref: name, data: data })
	}[data.type];
};

var SchemaArray = React.createClass({
	displayName: 'SchemaArray',

	getInitialState: function getInitialState() {
		return this.props.data;
	},
	change: function change(event) {
		console.log(this.state);
		if (event.target.type == 'checkbox') {
			this.state[event.target.name] = event.target.checked;
		} else if (event.target.name == 'itemtype') {
			this.state.items.type = event.target.value;
		} else {
			this.state[event.target.name] = event.target.value;
		}
		this.setState(this.state);
	},
	export: function _export(title) {
		//console.log(this.refs.items.state)
		return {
			items: this.refs['items'].export(),
			minItems: this.state.minItems,
			maxItems: this.state.maxItems,
			uniqueItems: this.state.uniqueItems ? true : undefined,
			format: this.state.format,
			title: title,
			type: 'array'
		};
	},
	exportForm: function exportForm(title) {
		return {
			key: title
		};
	},
	componentDidUpdate: function componentDidUpdate() {
		this.onChange();
	},
	onChange: function onChange() {
		this.props.onChange();
	},
	render: function render() {
		var self = this;
		var inputId = Date.now();
		this.state.items = this.state.items || { type: 'string' };
		var optionForm = mapping('items', this.state.items, this.onChange);
		return React.createElement(
			'div',
			{ className: 'row' },
			React.createElement(
				'div',
				{ className: 'col-sm-12 col-md-12 col-lg-12' },
				React.createElement(
					'div',
					{ className: 'form-inline' },
					React.createElement(
						'div',
						{ className: 'form-group' },
						React.createElement(
							'label',
							{ htmlFor: "itemtype-" + inputId },
							'Items Type:'
						),
						React.createElement(
							'select',
							{ name: 'itemtype', className: 'form-control', id: "itemtype-" + inputId, onChange: this.change, value: this.state.items.type },
							React.createElement(
								'option',
								{ value: 'string' },
								'string'
							),
							React.createElement(
								'option',
								{ value: 'number' },
								'number'
							),
							React.createElement(
								'option',
								{ value: 'array' },
								'array'
							),
							React.createElement(
								'option',
								{ value: 'object' },
								'object'
							),
							React.createElement(
								'option',
								{ value: 'boolean' },
								'boolean'
							)
						)
					),
					React.createElement(
						'div',
						{ className: 'form-group media-right' },
						React.createElement(
							'label',
							{ htmlFor: "minItems-" + inputId },
							'minItems:'
						),
						React.createElement('input', { name: 'minItems', className: 'form-control', id: "minItems-" + inputId, type: 'number', onChange: self.change, value: self.state.minItems })
					),
					React.createElement(
						'div',
						{ className: 'form-group media-right' },
						React.createElement(
							'label',
							{ htmlFor: "maxItems-" + inputId },
							'maxItems:'
						),
						React.createElement('input', { name: 'maxItems', className: 'form-control', id: "maxItems-" + inputId, type: 'number', onChange: self.change, value: self.state.maxItems })
					),
					React.createElement(
						'div',
						{ className: 'checkbox media-right' },
						React.createElement(
							'label',
							null,
							React.createElement('input', { name: 'uniqueItems', type: 'checkbox', onChange: self.change, checked: self.state.uniqueItems }),
							' uniqueItems'
						)
					),
					React.createElement(
						'div',
						{ className: 'form-group media-right' },
						React.createElement(
							'label',
							{ htmlFor: "format-" + inputId },
							'Format:'
						),
						React.createElement(
							'select',
							{ name: 'format', className: 'form-control', id: "format-" + inputId, onChange: this.change, value: this.state.format },
							React.createElement('option', { value: '' }),
							React.createElement(
								'option',
								{ value: 'table' },
								'table'
							),
							React.createElement(
								'option',
								{ value: 'checkbox' },
								'checkbox'
							),
							React.createElement(
								'option',
								{ value: 'select' },
								'select'
							),
							React.createElement(
								'option',
								{ value: 'tabs' },
								'tabs'
							)
						)
					)
				)
			),
			React.createElement(
				'div',
				{ className: 'col-sm-12 col-md-12 col-lg-12 h6' },
				optionForm
			)
		);
	}
});

var SchemaObject = React.createClass({
	displayName: 'SchemaObject',

	getInitialState: function getInitialState() {
		return this.propsToState(this.props);
	},
	propsToState: function propsToState(props) {
		var data = props;
		if (props.hasOwnProperty('data')) {
			data = props.data;
		}
		data.properties = data.properties || {};
		data.required = data.required || [];
		data.propertyNames = [];
		data.propertyDels = []; // 记录被删除的信息，页面不显示，不导出schema
		// convert from object to array
		data.properties = Object.keys(data.properties).map(function (name) {
			data.propertyNames.push(name);
			data.propertyDels.push[false]; // 初始化，默认都没有被删除
			var item = data.properties[name];
			return item;
		});
		return data;
	},
	componentWillReceiveProps: function componentWillReceiveProps(newProps) {
		this.setState(this.propsToState(newProps));
	},
	deleteItem: function deleteItem(event) {
		var i = event.target.parentElement.dataset.index;
		var requiredIndex = this.state.required.indexOf(this.state.propertyNames[i]);
		if (requiredIndex !== -1) {
			this.state.required.splice(requiredIndex, 1);
		}
		this.state.propertyDels[i] = true; // 标记被删除元素
		//this.state.properties.splice(i, 1);
		//this.state.propertyNames.splice(i, 1);
		this.state = this.propsToState(this.export());
		this.setState(this.state);
	},
	changeItem: function changeItem(event) {
		var i = event.target.parentElement.dataset.index;
		if (event.target.name == 'type') {
			this.state.properties[i].type = event.target.value;
		} else if (event.target.name == 'field') {
			this.state.propertyNames[i] = event.target.value;
		}
		this.setState(this.state);
	},
	changeRequired: function changeRequired(event) {
		if (event.target.checked) this.state.required.push(event.target.name);else {
			var i = this.state.required.indexOf(event.target.name);
			this.state.required.splice(i, 1);
		}
		this.setState(this.state);
	},
	change: function change(event) {
		this.state[event.target.name] = event.target.checked;
		this.setState(this.state);
	},
	changeText: function changeText(event) {
		this.state[event.target.name] = event.target.value;
		this.setState(this.state);
	},
	onChange: function onChange() {
		this.props.onChange();
		this.trigger('change');
	},
	componentDidUpdate: function componentDidUpdate() {
		this.onChange();
	},
	add: function add() {
		this.state = this.propsToState(this.export());
		this.state.properties.push({ name: '', type: 'string', title: '' });
		this.setState(this.state);
	},
	export: function _export() {
		var _this = this;

		var self = this;
		var properties = {};
		Object.keys(self.state.properties).forEach(function (index) {
			if (_this.state.propertyDels[index]) return;
			var name = self.state.propertyNames[index];
			if (typeof self.refs['item' + index] != 'undefined' && name.length > 0) {
				properties[name] = self.refs['item' + index].export(name);
				properties[name].title = name;
			}
		});
		return {
			type: 'object',
			additionalProperties: this.state.additionalProperties,
			format: this.state.format,
			properties: properties,
			required: this.state.required.length ? this.state.required : undefined
		};
	},
	exportForm: function exportForm() {
		var self = this;
		var schemaForm = [];
		Object.keys(self.state.properties).forEach(function (index) {
			var name = self.state.propertyNames[index];
			if (typeof self.refs['item' + index] != 'undefined' && name.length > 0) schemaForm.push(self.refs['item' + index].exportForm(name));
		});
		return schemaForm;
	},
	on: function on(event, callback) {
		this.callbacks = this.callbacks || {};
		this.callbacks[event] = this.callbacks[event] || [];
		this.callbacks[event].push(callback);

		return this;
	},
	trigger: function trigger(event) {
		if (this.callbacks && this.callbacks[event] && this.callbacks[event].length) {
			for (var i = 0; i < this.callbacks[event].length; i++) {
				this.callbacks[event][i]();
			}
		}

		return this;
	},
	render: function render() {
		var _this2 = this;

		var self = this;

		return React.createElement(
			'div',
			{ className: 'panel panel-default' },
			React.createElement(
				'div',
				{ className: 'panel-body' },
				this.state.properties.map(function (value, index) {
					if (_this2.state.propertyDels[index]) return;
					var name = self.state.propertyNames[index];
					var copiedState = JSON.parse(JSON.stringify(self.state.properties[index]));
					var optionForm = mapping('item' + index, copiedState, self.onChange);
					return React.createElement(
						'div',
						{ key: index },
						React.createElement(
							'div',
							{ className: 'row' },
							React.createElement(
								'div',
								{ className: 'col-sm-12 col-md-12 col-lg-12' },
								React.createElement(
									'div',
									{ className: 'form-inline', 'data-index': index },
									React.createElement(
										'div',
										{ className: 'form-group', 'data-index': index },
										React.createElement(
											'label',
											{ className: 'sr-only', htmlFor: "input_" + index },
											'input'
										),
										React.createElement('input', { name: 'field', className: 'form-control', id: "input_" + index, type: 'string', onChange: self.changeItem, value: name })
									),
									React.createElement(
										'div',
										{ className: 'form-group media-right', 'data-index': index },
										React.createElement(
											'label',
											{ className: 'sr-only', htmlFor: "select_" + index },
											'input'
										),
										React.createElement(
											'select',
											{ name: 'type', className: 'form-control', id: "select_" + index, onChange: self.changeItem, value: value.type },
											React.createElement(
												'option',
												{ value: 'string' },
												'string'
											),
											React.createElement(
												'option',
												{ value: 'number' },
												'number'
											),
											React.createElement(
												'option',
												{ value: 'array' },
												'array'
											),
											React.createElement(
												'option',
												{ value: 'object' },
												'object'
											),
											React.createElement(
												'option',
												{ value: 'boolean' },
												'boolean'
											)
										)
									),
									React.createElement(
										'div',
										{ className: 'checkbox media-right' },
										React.createElement(
											'label',
											null,
											React.createElement('input', { name: name, type: 'checkbox', onChange: self.changeRequired, checked: self.state.required.indexOf(name) != -1 }),
											' Required'
										)
									),
									React.createElement(
										'div',
										{ className: 'form-group media-right', 'data-index': index },
										React.createElement(
											'button',
											{ type: 'button', id: 'btn_' + index, className: 'btn btn-default', onClick: self.deleteItem, 'data-index': index },
											React.createElement('span', { className: 'glyphicon glyphicon-remove' })
										)
									)
								)
							)
						),
						React.createElement(
							'div',
							{ className: 'row h6' },
							React.createElement(
								'div',
								{ className: 'col-sm-12 col-md-12 col-lg-12' },
								optionForm
							)
						),
						React.createElement('hr', { className: 'col-md-10 col-lg-10 h6' })
					);
				}),
				React.createElement(
					'div',
					{ className: 'hide' },
					'Allow additional properties: ',
					React.createElement('input', { name: 'additionalProperties', type: 'checkbox', onChange: self.change, checked: self.state.additionalProperties }),
					'Format:',
					React.createElement(
						'select',
						{ name: 'format', onChange: this.changeText, value: this.state.format },
						React.createElement('option', { value: '' }),
						React.createElement(
							'option',
							{ value: 'grid' },
							'grid'
						),
						React.createElement(
							'option',
							{ value: 'schema' },
							'schema'
						)
					)
				),
				React.createElement(
					'button',
					{ className: 'btn btn-info navbar-text', onClick: self.add },
					'Add another field'
				)
			)
		);
	}
});

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') module.exports = window.JSONSchemaEditor;

/***/ })
/******/ ]);