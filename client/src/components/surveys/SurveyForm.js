// Form for user input
import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import { Link } from 'react-router-dom'
import SurveyField from './SurveyField'
import validateEmails from '../utils/validateEmails'

const FIELDS = [
    { label: 'Survey Title', name: 'title'},
    { label: 'Subject Line', name: 'subject'},
    { label: 'Email Body', name: 'body'},
    { label: 'Recipient List', name: 'emails'}
]

class SurveyFrom extends Component {
    renderFields() {
        return FIELDS.map( ({ label, name })=> {
           return <Field key={name} component={SurveyField} type="text" label={label} name={name} />
        })
    }
    
    render() {
        return(
            <div className="container">
                <form onSubmit={this.props.handleSubmit(values => console.log(values))}>
                    {this.renderFields()}
                    <Link to="/surveys"  className="red btn-flat left white-text">
                        Cancel
                        <i className="material-icons right">cancel</i>
                    </Link>
                    <button type="submit" className="teal btn-flat right white-text" >
                        Next 
                        <i className="material-icons right">done</i>    
                    </button>
                </form>
            </div>
        )
    }
}

function validate(values) {
    const errors = {}
    
    errors.emails = validateEmails(values.emails || '')

    FIELDS.forEach(({ name }) => {
        if(!values[name]) {
            errors[name] = 'You must provide a value' 
        }
    })

    return errors
}

export default reduxForm({
    validate,
    form: 'surveyForm'
})(SurveyFrom)