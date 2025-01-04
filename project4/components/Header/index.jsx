import React from "react";
import "./styles.css";
import Headertext from "./header_text";

class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pos:0,
        };
    }

    componentDidMount() {
        const elem = document.getElementById("animate");
        const container = document.getElementById("container");
        const ratio = 1000;

        const frame = () => {
            if (this.state.pos === ratio) {
                this.setState({ pos: 0 });
            } else {
                this.setState({pos:this.state.pos+1});
                elem.style.top = `${(this.state.pos / ratio) * (container.offsetHeight - elem.offsetHeight)}px`;
                elem.style.left = `${(this.state.pos / ratio) * (container.offsetWidth - elem.offsetWidth)}px`;
            }
        };

        this.id = setInterval(frame, 1);
        
        
    }

    componentWillUnmount() {
        clearInterval(this.id);
    }

    

    render() {
        return (
            <div id = "container">
                <div id = "animate">
                    I AM BOX!!!!!
                </div>
                <Headertext textContent={"THIS IS MY HEADER!"} />
            </div>
        );
    }
}

export default Header;