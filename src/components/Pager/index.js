import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import utils from '../../utils';

const noop = () => {};

class Pager extends PureComponent {
	constructor(props) {
		super(props);
		this.onRef = this.onRef.bind(this);
	}
	componentDidUpdate() {
		this.onRef(this.modalRef);
	}
	onRef(ref) {
		if (!ref) {
			return;
		}

		if (!this.modalRef) {
			this.modalRef = ref;
		}

		window.ts.ui.get(ref, spirit => {
			spirit.pages = this.props.pages;
			spirit.page = this.props.page;
			if (!this.modalRef) {
				spirit.onselect = utils.debounce(page => {
					if (this.props.onSelect) {
						this.props.onSelect(page);
					}
				}, 200);
			}
		});
	}

	render() {
		return <menu data-ts="Pager" ref={this.onRef} />;
	}
}

Pager.propTypes = {
	// The total amount of pages.
	pages: PropTypes.number,
	// The current page index, zero based.
	page: PropTypes.number,
	// Called whenever a page is selected; and with the new index as argument.
	onSelect: PropTypes.func
};

Pager.defaultProps = {
	pages: 0,
	page: 0,
	onSelect: noop
};

export default Pager;
