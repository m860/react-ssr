import React from 'react'
import Base from '../Base'
import PropTypes from 'prop-types'

export default class FormBase extends Base {
	static propTypes = {
		inputs: PropTypes.arrayOf(PropTypes.shape({
			component: PropTypes.string.isRequired,
			props: PropTypes.object
		}))
	};
	static defaultProps = {
		inputs: []
	};
}