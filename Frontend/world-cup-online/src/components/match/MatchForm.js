import React, { Component, useState } from 'react'
import DatePicker from 'react-datepicker'
//import MatchDataService from "../../services/matches.js"
import 'react-datepicker/dist/react-datepicker.css'
import './MatchForm.css'

class MatchForm extends Component {
    constructor(props) {
      super(props)
      
    
      this.state = {
         date: null,
         time: null,
         tournament: 'torneo1',
         fase: '',
         team1: 'example11',
         team2: 'example21',
         campus: ''
      }
    }
    handleTimeChange = (event) =>{
        this.setState({
            time: event.target.value
        })
    }
    handleDateChange = (event) =>{
        this.setState({
            date: event.target.value
        })
    }
    handleTournamentChange = (event) =>{
        this.setState({
            tournament: event.target.value
        })
    }
    handleFaseChange = (event) =>{
        this.setState({
            fase: event.target.value
        })
    }
    handleCampusChange = (event) =>{
        this.setState({
            campus: event.target.value
        })
    }
    handleTeam1Change = (event) =>{
        this.setState({
            team1: event.target.value
        })
    }
    handleTeam2Change = (event) =>{
        this.setState({
            team2: event.target.value
        })
    }
    handleSubmit = (event) =>{
        //MatchDataService.get()
        // alert(`${this.state.date} ${this.state.time} ${this.state.tournament} ${this.state.fase}
        //  ${this.state.team1} ${this.state.team2} ${this.state.campus}`)
        //  event.preventDefault()
    }
  render() {
    
    return (
        <div className='form-box'>
        <form onSubmit={this.handleSubmit }>
            <div>
                <h2>Create new match</h2>
                <label>Fecha: </label>
                <input type = 'text' value={this.state.date} onChange={this.handleDateChange} />
            </div>
            <div>
                <label>Hora: </ label>
                <input type = 'text' value={this.state.time} onChange={this.handleTimeChange} />
            </div>
            <div>
                <label>Torneo: </ label>
                <select value = {this.state.tournament} onChange={this.handleTournamentChange}>
                    <option value = "torneo1"> Torneo 1</option>
                    <option value = "torneo2"> Torneo 2</option>
                </select>
            </div>
            <div>
                <label>Fase: </label>
                <input type = 'text' value={this.state.fase} onChange={this.handleFaseChange} />
            </div>
            <div>
                <select value = {this.state.team1} onChange={this.handleTeam1Change}>
                    <option value = "example11"> Example1 1</option>
                    <option value = "example12"> Example1 2</option>
                </select>
                <label> vs </label>
                <select value = {this.state.team2} onChange={this.handleTeam2Change}>
                    <option value = "example21"> Example2 1</option>
                    <option value = "example22"> Example2 2</option>
                </select>
            </div>
            <div>
                <label>Sede: </ label>
                <input type = 'text' value={this.state.campus} onChange={this.handleCampusChange} />
            </div>
            <button type = "submit"> Crear partido</button>
        </form>
        </div>
    )
  }
}

export default MatchForm
