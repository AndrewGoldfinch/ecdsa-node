import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
export default class Keys extends Component {

    constructor(props ) {
        super(props);
        this.state = {
            selectedValue: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.doChange = props.doChange;

        // public/private keys generated from server/scripts/generate.js - public keys copied to server/index.js
        this.options =  [
            {label: '03b19fc114baa5ad8487c58f67f1f0be72f393a539a6662210984cc275084294a8', 
             value: 'a68932b7a7bbc1d289718c93a698043fa7a6a224211efdef5de7375fc102717e'},
            {label: '03c31b8e5b7fa82777b7b6c8343a7e6716870bafcd99750afcd711b1c307f44b2f', 
             value: '001b6d071c4a94329bba06dc0de618e3594efe1807f87bbe2accb2c84c52b71c'},
            {label: '02b0180b42fbbebb2f7490b308b21ab1d61809053090fb07bccdeccf3e3d59aea9', 
             value: 'fd038f35611c6df4250ddd53c92592c678061d7843a086d52d58a14675c10333'},
          ];
    }

    componentDidMount() {
        this.setState({
            selectedValue: this.props.defaultValue,
        })
    }

    handleChange(event) {
        //const selectedValue = event.target.value;
        this.setState({selectedValue: event.value});
        this.doChange(event);
    }

    render() { 
        return (
            <Select
                value={this.options.filter(({value}) => value === this.state.selectedValue)}
                onChange={this.handleChange}
                options={this.options}
            />
        )
    }
}

Keys.propTypes = {
    defaultValue: PropTypes.string.isRequired
};