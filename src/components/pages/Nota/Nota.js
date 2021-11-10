import React, { Component } from 'react';
import './Nota.css';
import PropTypes from 'prop-types';

class Nota extends Component {
	
	constructor(props) {
		super(props);
		this.noteContent = props.noteContent;
		this.noteId = props.noteId;
	}

	handleRemoveNote(id) {
		this.props.removeNote(id);
	}

	render(props) {
		return (
			<div className="Note">
                <p>foto persona</p>
                <p>nombre usuario</p>
				<span
					className="btn-close"
					onClick={() => this.handleRemoveNote(this.noteId)}
				>
				&times;	
				</span>
				<p>{this.noteContent}</p>
			</div>
		)
	}

}

Nota = {
	noteContent: PropTypes.String	
};

export default Nota;