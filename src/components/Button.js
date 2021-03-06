import React, {Component} from 'react';

import './Button.css';

/**
 * Class of d3.js wrapper
 */
class Button extends Component {
  /**
   * constructor
   * @arg {object} props attributes
   */
  constructor(props) {
    super(props);
    this.filter = {
      grayscale: 'rgba(221, 221, 221, 1)',
      red: 'rgba(255, 99, 71, 1)',
      green: 'rgba(50, 205, 50, 1)',
      blue: 'rgba(30, 144, 255, 1)',
    };
  }

  /**
   * React function to render
   * @return {JSX}
   */
  render() {
    const props = this.props;
    if (props.channel !== 'all') {
      return (
        <div className="ChannelButton">
          <div className="wheel"
               onClick={props.onClick}
               style={{background: this.color[props.filter]}}></div>
        </div>
      );
    }

    // conic-gradient
    return (
      <div className="ChannelButton">
        <ul className="umbrella">
          <li className="wheel clipped-color" onClick={props.onClick}></li>
          <li className="wheel clipped-color" onClick={props.onClick}></li>
          <li className="wheel clipped-color" onClick={props.onClick}></li>
          <li className="wheel clipped-color" onClick={props.onClick}></li>
          <li className="wheel clipped-color" onClick={props.onClick}></li>
        </ul>
      </div>
    );
  }
}

export default ChannelButton;
