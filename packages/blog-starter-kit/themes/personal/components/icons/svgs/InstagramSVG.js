import React from 'react';

export default class InstagramSVG extends React.Component {
	render() {
		return (
			<svg className={this.props.className} fill="none" viewBox="0 0 24 24">
				<path
					stroke="currentColor"
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="1.5"
					d="M12 16.5a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Z"
				/>
				<path
					stroke="currentColor"
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="1.5"
					d="M16.5 7.5h.007M8.25 21h7.5A4.5 4.5 0 0 0 20.25 16.5v-9A4.5 4.5 0 0 0 15.75 3h-7.5A4.5 4.5 0 0 0 3.75 7.5v9a4.5 4.5 0 0 0 4.5 4.5Z"
				/>
			</svg>
		);
	}
}

