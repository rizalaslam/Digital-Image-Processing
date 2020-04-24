import React, {Component} from 'react';
import Chart from './Chart';
import { Button, Spinner, CardBody } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartBar } from "@fortawesome/free-solid-svg-icons";
import './Histogram.css';


class Histogram extends Component {

  constructor(props) {
    super(props);
    this.primaryChannels = {};
    this.maxValue = 0;
    this.state = {
      imageSrc: null,
      isLoading: false,
      channel: null,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const props = this.props;

    const isImageChanged = this.state.imageSrc !== props.src;
    if (isImageChanged) {
      this.handleImageChanged(props.src, props.channel);
      return;
    }

    const isChannelChanged = this.state.channel !== props.channel;
    if (isChannelChanged) {
      this.handleChannelChanged(props.channel);
      return;
    }
  }

  getDataset() {
    let converToCoord = (data) => {

      return data.map((value, idx) => ({x: idx, y: value}));
    };
    let channelList = [];
    if (this.state.channel !== 'all') {
      channelList = [this.state.channel];
    } else {
      channelList = Object.keys(this.primaryChannels)
                          .filter((ch) => ch !== 'grayscale');
    }
    return channelList.map((ch) => {
      return {
        channel: ch,
        data: converToCoord(this.primaryChannels[ch]),
      };
    });
  }

  getDomain() {
      return {x: [0, 255], y: [0, this.maxValue]};
  }

  handleImageChanged(propSrc, propChannel) {
    this.setState({imageSrc: propSrc,
                   isLoading: true,
                   channel: propChannel});
    let img = document.getElementById('photo');
    const Enhance = img.src !== propSrc;
    if (Enhance) {
      setTimeout(() => {
        this.getRGBDataEnhance();
        this.setState({isLoading: false});
      }, 0);
    }
    else {
      setTimeout(() => {
        this.getRGBData();
        this.setState({isLoading: false});
      }, 0);
    }
    
  }
  

  handleChannelChanged(propChannel) {
    this.setState({channel: propChannel});
  }

  getRGBData() {
    this.primaryChannels = {
      'grayscale': new Array(256).fill(0),
      'red': new Array(256).fill(0),
      'green': new Array(256).fill(0),
      'blue': new Array(256).fill(0),
    };

    this.maxValue = 0;

    // read image
    let img = document.getElementById('photo');
    let canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    canvas.getContext('2d').drawImage(img, 0, 0, img.width, img.height);

    // read each pixel data
    for (let x = 0; x < canvas.width; ++x) {
      for (let y = 0; y < canvas.height; ++y) {
        const pixel = canvas.getContext('2d').getImageData(x, y, 1, 1).data;
        ++this.primaryChannels['red'][pixel[0]];
        ++this.primaryChannels['green'][pixel[1]];
        ++this.primaryChannels['blue'][pixel[2]];
        ++this.primaryChannels['grayscale'][Math.round(pixel.slice(0, 3).reduce((a, b) => a + b, 0) / 3)];
      }
    }

    for (let ch in this.primaryChannels) {
      if (this.primaryChannels.hasOwnProperty(ch)) {
        this.maxValue = Math.max(this.maxValue, Math.max(...this.primaryChannels[ch]));
      }
    }

    this.maxValue = Math.round(this.maxValue * 1.05);

  }
  getRGBDataEnhance() {
    this.primaryChannels = {
      'grayscale': new Array(256).fill(0),
      'red': new Array(256).fill(0),
      'green': new Array(256).fill(0),
      'blue': new Array(256).fill(0),
    };

    this.maxValue = 0;

    // read image
    let img = document.getElementById('enhance');
    let canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    canvas.getContext('2d').drawImage(img, 0, 0, img.width, img.height);

    // read each pixel data
    for (let x = 0; x < canvas.width; ++x) {
      for (let y = 0; y < canvas.height; ++y) {
        const pixel = canvas.getContext('2d').getImageData(x, y, 1, 1).data;
        ++this.primaryChannels['red'][pixel[0]];
        ++this.primaryChannels['green'][pixel[1]];
        ++this.primaryChannels['blue'][pixel[2]];
        ++this.primaryChannels['grayscale'][Math.round(pixel.slice(0, 3).reduce((a, b) => a + b, 0) / 3)];
      }
    }

    for (let ch in this.primaryChannels) {
      if (this.primaryChannels.hasOwnProperty(ch)) {
        this.maxValue = Math.max(this.maxValue, Math.max(...this.primaryChannels[ch]));
      }
    }

    this.maxValue = Math.round(this.maxValue * 1.05);

  }
  

  renderContent() {
    const props = this.props;
    if (props.src === null) {
      return (
        <FontAwesomeIcon id="histogram-chart" icon={faChartBar} style={{ color: 'blue' }} size="6x" />
      );
    }
    if (this.state.isLoading) {
      return (
        <Spinner color="warning" id="histogram-chart" animation="border" variant="primary"/>
      );
    }
    return (
      <Chart domain={this.getDomain()} dataset={this.getDataset()}>
      </Chart>
    );
  }

  render() {
    return (
        <CardBody style={{ height: '250px' }}>
        {this.renderContent()}
        </CardBody>
    );
  }
}

export default Histogram;
