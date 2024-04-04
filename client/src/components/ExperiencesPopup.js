import React, {useState} from 'react';
import '../static/css/components/ExperiencesPopup.css';

class ExperiencesPopup extends React.Component {

    constructor(props) {
        super(props);
        console.log("if ur running im kmk")
        this.state = {
            country: props,
            visible: true
        };
    }

    update(props){
        console.log(props)
        if(props != null){
            this.setState({
                country: props,
                visible: true
            });
            console.log(this.state)
        }
        else{
            this.setState({
                country: props,
                visible: false
            });
        }
    }

    render() {
        console.log(this.state)
        console.log("rendering ^^")
        if(this.state.visible) {
            return(
                <div className="experiences_container">
                    <button>Button</button>
                </div>
            )
        }
        return
    }

}

export default ExperiencesPopup